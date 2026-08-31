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
  selector: 'ms-add-acs-fp',
  templateUrl: './add-acs-fp.component.html',
  styleUrls: ['./add-acs-fp.component.scss']
})
export class AddAcsFpComponent implements OnInit {


  unSelectedFile: any;
  pageTitle = "Add Acs";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addPoliciesForm: FormGroup = new FormGroup({});
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
    private activeRoute: ActivatedRoute, public sharedService: SharedService) {
    this.addPoliciesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-acs')) {
      this.pageTitle = 'Add Acs'
    }
    else if (this.router.url.includes('view-acs')) {
      this.spinner.show()
      this.pageTitle = 'View Acs'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getACSFPByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addPoliciesForm.patchValue({
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
    return this.addPoliciesForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/acs']);
  }

  addAcs() {
    if (this.addPoliciesForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addACSFP(this.addPoliciesForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/security/apparatus/acs']);
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
    this.addPoliciesForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateAcs() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPoliciesForm.valid) {
    this.adminservice.updateACSFP(this.addPoliciesForm.value,this.id).subscribe(
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
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/acs'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/security/apparatus/acs'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

