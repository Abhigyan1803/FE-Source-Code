import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-sec-hospital',
  templateUrl: './add-sec-hospital.component.html',
  styleUrls: ['./add-sec-hospital.component.scss']
})
export class AddSecHospitalComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Hospital";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addHospitalForm: FormGroup = new FormGroup({});
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
    private activeRoute: ActivatedRoute) {
    this.addHospitalForm = this.fb.group({
      title: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

    
  }

  ngOnInit(): void {
    if (this.router.url.includes('add-sec-hospital')) {
      this.pageTitle = 'Add Hospital'
    }
    else if (this.router.url.includes('view-sec-hospital')) {
      this.spinner.show()
      this.pageTitle = 'View Hospital'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getSectionByID(this.id).subscribe(
        res => {
          console.log(res,"juedn");
          
          if (res.status == 'OK') {
            this.addHospitalForm.patchValue({
           
              title: res.object.title,
              status:  res.object.status,
            })
            console.log("juned",this.addHospitalForm);
            this.docUrl = res.object.document
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
    return this.addHospitalForm.controls;
  }

  goBack() {
    this.router.navigate(['/main/admin/home/section-hospital']);
  }

  addHospital() {
    if (this.addHospitalForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else {
      this.spinner.show();
      this.adminservice.addSection(this.addHospitalForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/section-hospital']);
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
    this.addHospitalForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
  // console.log("selected Doc", this.addBdoForm.value);
}


updateHospital() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addHospitalForm.valid) {
    this.adminservice.updateSection(this.addHospitalForm.value,this.id).subscribe(
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
    this.router.navigate(['main/admin/home/section-hospital'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/home/section-hospital'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}


}
