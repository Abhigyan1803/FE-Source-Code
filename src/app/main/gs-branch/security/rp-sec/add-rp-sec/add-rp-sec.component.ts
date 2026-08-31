import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-rp-sec',
  templateUrl: './add-rp-sec.component.html',
  styleUrls: ['./add-rp-sec.component.scss']
})
export class AddRpSecComponent implements OnInit {


  unSelectedFile: any;
  pageTitle = "Add RP";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addRPForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addRPForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-rp')) {
      this.pageTitle = 'Add RP'
    }
    else if (this.router.url.includes('view-rp')) {
      this.spinner.show()
      this.pageTitle = 'View RP'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getRPByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addRPForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
            this.docUrl = res.object.file
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
    return this.addRPForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/security/rp']);
  }

  addRP() {
    if (this.addRPForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addRP(this.addRPForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/security/rp']);
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
      type: 'document', title:"Document",url: l.file
    }
  });
}

onSelectDoc(e) {
  var file = e.target.files[0]
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addRPForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateRP() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addRPForm.valid) {
    this.adminservice.updateRP(this.addRPForm.value,this.id).subscribe(
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
    
    if(this.router.url.includes('main/gs-branch'))
    this.router.navigate(['main/gs-branch/security/rp'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/security/rp'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

