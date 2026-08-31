import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-casual-staff',
  templateUrl: './add-casual-staff.component.html',
  styleUrls: ['./add-casual-staff.component.scss']
})
export class AddCasualStaffComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add CASUAL";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addBiometricForm: FormGroup = new FormGroup({});
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
    this.addBiometricForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-casual')) {
      this.pageTitle = 'Add CASUAL'
    }
    else if (this.router.url.includes('view-casual')) {
      this.spinner.show()
      this.pageTitle = 'View CASUAL'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCASUALByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addBiometricForm.patchValue({
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
    return this.addBiometricForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/security/access-control/entry-passes/casual']);
  }

  addCASUAL() {
    if (this.addBiometricForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCASUAL(this.addBiometricForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/security/access-control/entry-passes/casual']);
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
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addBiometricForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateCASUAL() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addBiometricForm.valid) {
    this.adminservice.updateCASUAL(this.addBiometricForm.value,this.id).subscribe(
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
    this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/casual'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/casual'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

