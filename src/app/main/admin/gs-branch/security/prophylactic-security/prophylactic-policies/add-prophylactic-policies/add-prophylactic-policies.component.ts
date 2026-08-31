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
  selector: 'ms-add-prophylactic-policies',
  templateUrl: './add-prophylactic-policies.component.html',
  styleUrls: ['./add-prophylactic-policies.component.scss']
})
export class AddProphylacticPoliciesComponent implements OnInit {


  unSelectedFile: any;
  pageTitle = "Add ProphylacticPolicies";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addPoliciesForm: FormGroup = new FormGroup({});
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
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addPoliciesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-prophylactic-policies')) {
      this.pageTitle = 'Add ProphylacticPolicies'
    }
    else if (this.router.url.includes('view-prophylactic-policies')) {
      this.spinner.show()
      this.pageTitle = 'View ProphylacticPolicies'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getProphylacticByIDPolicies(this.id).subscribe(
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
    this.router.navigate(['main/admin/GS-Branch/security/prophylactic/prophylactic-policies']);
  }

  addProphylactic() {
    if (this.addPoliciesForm.invalid|| !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addProphylacticPolicies(this.addPoliciesForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/security/prophylactic/prophylactic-policies']);
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
    this.adminservice.openSnackbar('Document Should Be Maximum 200 MB in Size')
  } else {
    this.docUrl = ''
    this.addPoliciesForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateProphylactic() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPoliciesForm.valid) {
    this.adminservice.updateProphylacticPolicies(this.addPoliciesForm.value,this.id).subscribe(
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
    this.router.navigate(['main/admin/GS-Branch/security/prophylactic/prophylactic-policies'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/security/prophylactic/prophylactic-policies'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

