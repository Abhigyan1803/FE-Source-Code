import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-camp-subject',
  templateUrl: './add-camp-subject.component.html',
  styleUrls: ['./add-camp-subject.component.scss']
})
export class AddCampSubjectComponent implements OnInit {

 
  pageTitle = "Add CAMP SUBJECT";
  isError;
  id: string = '';
  addCAMPSUBJECTForm: FormGroup = new FormGroup({});

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: TrgBattalionService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addCAMPSUBJECTForm = this.fb.group({
      subjectName: ['', Validators.required],
      totalMarks: ['', Validators.required],
      status: ['1', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.router.url.includes('add-camp-subject')) {
      this.pageTitle = 'Add CAMP SUBJECT'
    }
    else if (this.router.url.includes('view-camp-subject')) {
      this.spinner.show()
      this.pageTitle = 'View CAMP SUBJECT'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCAMPSUBJByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addCAMPSUBJECTForm.patchValue({
              subjectName: res.object.subjectName,
              totalMarks: res.object.totalMarks,
              status:  res.object.status,
            })
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
    return this.addCAMPSUBJECTForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/trg-battalion/camp-subject/']);
  }

  addCAMPSUBJECT() {
      this.spinner.show();
      this.adminservice.addCampSubject(this.addCAMPSUBJECTForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/trg-battalion/camp-subject/']);
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

  updateCAMPSUBJECT() {
    this.spinner.show();
    console.log("Bdo", this.addCAMPSUBJECTForm.value);
  
    if (this.addCAMPSUBJECTForm.valid) {
      this.adminservice.updateCAMPSUBJECT(this.id,this.addCAMPSUBJECTForm.value).subscribe(
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
      this.router.navigate(['main/admin/trg-battalion/camp-subject'])
    
      if(this.router.url.includes('main/admin'))
      this.router.navigate(['main/admin/trg-battalion/camp-subject'])  
   
    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }


}
