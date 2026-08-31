import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-add-resignation',
  templateUrl: './add-resignation.component.html',
  styleUrls: ['./add-resignation.component.scss']
})
export class AddResignationComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add RESIGNATION";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addRelegationForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute, public sharedService: SharedService) {
    this.addRelegationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-resignation')) {
      this.pageTitle = 'Add RESIGNATION'
    }
    else if (this.router.url.includes('view-resignation')) {
      this.spinner.show()
      this.pageTitle = 'View RESIGNATION'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getResignationByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addRelegationForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
            this.docUrl = res.object.doc
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addRelegationForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/GS-Branch/stats/current-cases/resignation']);
  }

  addRESIGNATION() {
    if (this.addRelegationForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addResignation(this.addRelegationForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/stats/current-cases/resignation']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
}

openDoc(l) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l
    }
  });
}

onSelectDoc(e) {
  var file = e.target.files[0]
  //change file from 50mb to 200mb
 let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar(`Document Should Be Maximum ${this.sharedService.fileSize} MB in Size`)
  } else {
    this.docUrl = ''
    this.addRelegationForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateRESIGNATION() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addRelegationForm.valid) {
    this.adminservice.updateResignation(this.addRelegationForm.value,this.id).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.")
      }
    )
  }
  else {
    this.isError = true;
  }
}

apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
    
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/GS-Branch/stats/current-cases/resignation'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/stats/current-cases/resignation'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}
