import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-other-security',
  templateUrl: './add-other-security.component.html',
  styleUrls: ['./add-other-security.component.scss']
})
export class AddOtherSecurityComponent implements OnInit {

 
  unSelectedFile: any;
  pageTitle = "Add Other Security";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addOtherSecurityForm: FormGroup = new FormGroup({});
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
    this.addOtherSecurityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-other-security')) {
      this.pageTitle = 'Add Other Security'
    }
    else if (this.router.url.includes('view-other-security')) {
      this.spinner.show()
      this.pageTitle = 'View Other Security'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getOtherSecurityByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addOtherSecurityForm.patchValue({
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
    return this.addOtherSecurityForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/other-security']);
  }

  addOtherSecurity() {
    if (this.addOtherSecurityForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addOtherSecurity(this.addOtherSecurityForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/security/apparatus/other-security']);
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
    this.addOtherSecurityForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateOtherSecurity() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addOtherSecurityForm.valid) {
    this.adminservice.updateOtherSecurity(this.addOtherSecurityForm.value,this.id).subscribe(
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
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/other-security'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/other-security'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

