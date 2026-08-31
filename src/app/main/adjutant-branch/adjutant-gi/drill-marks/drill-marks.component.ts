import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-drill-marks',
  templateUrl: './drill-marks.component.html',
  styleUrls: ['./drill-marks.component.scss']
})
export class DrillMarksComponent implements OnInit {
  drillMarkForm: FormGroup = new FormGroup({});
  pageTitle = "Add Campmark";
  id: string = '';


  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.drillMarkForm = this.fb.group({
      serialNo: ['', Validators.required],
      battalian: ['', Validators.required],
      company: ['', Validators.required],
      termSession: ['', Validators.required],
      year: ['', Validators.required],
      course: ['', Validators.required],
      // cadetRank: ['', Validators.required],
      username: ['', Validators.required],
      term: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  descLength
  value;
  value1;
  onChangesubmit(value) {
    this.value = value
  }

  servceId: number
  termid
  onSubmit() {
    console.log(this.value)

    this.servceId = this.value
    console.log(this.servceId)
    if (this.servceId == undefined) {
      this.adminservice.openSnackbar("Please Enter IMA.No")
    }
    else {
      this.adminservice.getCampMarks(this.servceId).subscribe(
        res => {
          console.log(res);

          if (res.message == 'OK') {
            this.spinner.hide()
            this.drillMarkForm.patchValue({
              serialNo: res.object.serialNo,
              battalian: res.object.battalian,
              company: res.object.company,
              termSession: res.object.termSession,
              year: res.object.year,
              course: res.object.course,
              cadetRank: res.object.cadetRank,
              username: res.object.name,
              term: res.object.term,

            })
            this.termid = res.object.term
            this.spinner.hide()
          }
          else if (res.message == 'Record not found') {
            this.adminservice.openSnackbar(res.message)
            this.drillMarkForm.reset();
            this.spinner.hide()
          }
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }
        }
      )
    }


  }
  next() {
    if (this.router.url.includes('adjutant-branch'))
      this.router.navigate(['/main/adjutant-branch/general-instruction/drill-competition/drill-marks/add-drill-marks'], { queryParams: { id: this.value, termid: this.termid } });
    if (this.router.url.includes('admin'))
      this.router.navigate(['/main/adjutant-branch/general-instruction/drill-competition/drill-marks/add-drill-marks'], { queryParams: { id: this.value, termid: this.termid } });

  }


}
