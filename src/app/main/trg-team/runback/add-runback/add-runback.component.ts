import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-runback',
  templateUrl: './add-runback.component.html',
  styleUrls: ['./add-runback.component.scss']
})
export class AddRunbackComponent implements OnInit {
  id: string = '';
  resultType: string = '';
  termid: string = '';
  runbackForm: FormGroup = new FormGroup({});
  Runbackupdate: any[] = [];
  mnc
  termId

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

    this.runbackForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      remark: ['',],
      termId: ['', Validators.required],
      resultType: ['Runback', Validators.required,],
      totalMarks: ['50', Validators.required,],
      obtainedMarks: ['', Validators.required,],
    })
  }

  ngOnInit(): void {
    this.spinner.show();
    if (this.router.url.includes('id'), ('resultType'),('termId')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.resultType = this.route.snapshot.queryParamMap.get('resultType');
      this.termId = this.route.snapshot.queryParamMap.get('termId');
      console.log(this.termId,"termid")
    }
    if (this.router.url.includes('add-runback')) {
      this.spinner.show();

      this.adminservice.getDrillMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.runbackForm.patchValue({
              serviceId: res.object.serviceId,
              battalian: res.object.battalian,
              company: res.object.company,
              course: res.object.course,
              username: res.object.name,
              termId: res.object.term,
            })
          } else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )
      var getForm = {
        id: this.id,
        resulttyId: this.resultType
      }
      var serviceId = getForm.id
      var resulttypeId = getForm.resulttyId
      console.log(serviceId)
      console.log(resulttypeId)
      this.termId
      console.log(this.termId)
      var temId=this.termId
      this.adminservice.getRunback(serviceId, resulttypeId,temId).subscribe(
        res => {

          if (res.message == "OK") {
            this.mnc = "update"
            this.spinner.hide()
            this.Runbackupdate = res.object;
            console.log(this.Runbackupdate, "this.Runbackupdate")
            this.id = res.object.id
            this.runbackForm.patchValue({
              totalMarks: res.object.totalMarks,
              obtainedMarks: res.object.obtainedMarks,
              remark: res.object.remark,


            })
            this.cdref.detectChanges();
          }
          // else if (res.message == "Record not found") {
          //   this.spinner.hide()
          //   this.mnc = "add";
          //   this.Runbackadd = res.object;
          // }
          else {
            this.adminservice.openSnackbar(res.message)
            this.mnc = "add";
            this.spinner.hide();
          }
        }
      )
    }
  }

  ngAfterViewInit() {
  }
  change(e) {
    if (e > 50) {
      this.adminservice.openSnackbar("Obtained Marks is greater then Total Marks")
      this.runbackForm.controls.obtainedMarks.setValue('')
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isError;
  runbackResult
  confirm() {
    if (this.runbackForm.invalid ||this.runbackForm.controls.obtainedMarks.value > 50) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else {
      this.runbackForm.value == this.runbackResult
      this.runbackResult = Object.assign({}, this.runbackForm.value, { id: this.id });
      var formdata = this.runbackResult
      var formdata
      delete formdata.battalian;
      delete formdata.cadetRank;
      delete formdata.company;
      delete formdata.course;
      delete formdata.subject;
      delete formdata.termSession;
      delete formdata.subject;
      delete formdata.term;
      delete formdata.username;
      delete formdata.subject1;
      delete formdata.grading;
      delete formdata.attempt;
      console.log(formdata)
      this.adminservice.updateRunback(formdata).subscribe(
        res => {
          if (res.message == "Record updated successfully") {
            this.adminservice.openSnackbar("Runback Updated Successfully");
          }
          else {
            err => {
              this.spinner.hide()
              this.adminservice.openSnackbar("Some Error Occured.");
            }

          }
        }
      )
    }
    if (this.router.url.includes('trg-team'))
      this.router.navigate(['/main/trg-team/runback']);

  }
}
