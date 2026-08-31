import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

 
  pageTitle = "Add SUBJECT";
  isError;
  id: string = '';
  addSUBJECTForm: FormGroup = new FormGroup({});

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: TrgBattalionService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addSUBJECTForm = this.fb.group({
      subjectName: ['', Validators.required],
      totalMarksPlCdr: ['', Validators.required],
      totalMarksCoyCdr: ['', Validators.required],
      totalMarksBnCdr: ['', Validators.required],
      status: ['1', Validators.required],
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-subject')) {
      this.pageTitle = 'Add SUBJECT'
    }
    else if (this.router.url.includes('view-subject')) {
      this.spinner.show()
      this.pageTitle = 'View SUBJECT'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getSUBJECTByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addSUBJECTForm.patchValue({
              subjectName: res.object.subjectName,
              plTotalMarks: res.object.plTotalMarks,
              totalMarksCoyCdr: res.object.totalMarksCoyCdr,
              totalMarksBnCdr: res.object.totalMarksBnCdr,
              totalMarksPlCdr:res.object.totalMarksPlCdr,
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
    return this.addSUBJECTForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/trg-battalion/oq-subject/']);
  }

  addSUBJECT() {
      this.spinner.show();
      this.adminservice.addSubject(this.addSUBJECTForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/trg-battalion/oq-subject/']);
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

  updateSUBJECT() {
    this.spinner.show();
    console.log("Bdo", this.addSUBJECTForm.value);
  
    if (this.addSUBJECTForm.valid) {
      this.adminservice.updateSUBJECT(this.id,this.addSUBJECTForm.value).subscribe(
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
      this.router.navigate(['main/admin/trg-battalion/oq-subject'])
    
      if(this.router.url.includes('main/admin'))
      this.router.navigate(['main/admin/trg-battalion/oq-subject'])  
   
    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }


}
