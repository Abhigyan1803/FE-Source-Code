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
  selector: 'ms-add-academy-parade',
  templateUrl: './add-academy-parade.component.html',
  styleUrls: ['./add-academy-parade.component.scss']
})
export class AddAcademyParadeComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Parade State";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addAcademyParadeStateForm: FormGroup = new FormGroup({});
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
    this.addAcademyParadeStateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-academy-parade')) {
      this.pageTitle = 'Add Parade State'
    }
    else if (this.router.url.includes('view-academy-parade')) {
      this.spinner.show()
      this.pageTitle = 'View Parade State'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getAcademyParadeStateById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addAcademyParadeStateForm.patchValue({
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
    return this.addAcademyParadeStateForm.controls;
  }

  goBack() {
    this.router.navigate(['/main/admin/GS-Branch/stats/academy-parade-state']);
  }

  addParadeState() {
    if (this.addAcademyParadeStateForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }  else {
      this.spinner.show();
      this.adminservice.addParadeState(this.addAcademyParadeStateForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/GS-Branch/stats/academy-parade-state']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.msg)
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
    this.addAcademyParadeStateForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
  // console.log("selected Doc", this.addBdoForm.value);
}


updateParadeState() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addAcademyParadeStateForm.valid) {
    this.adminservice.updateParadeState(this.addAcademyParadeStateForm.value,this.id).subscribe(
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
    this.router.navigate(['/main/GS-Branch/stats/academy-parade-state'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/GS-Branch/stats/academy-parade-state'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}


}
