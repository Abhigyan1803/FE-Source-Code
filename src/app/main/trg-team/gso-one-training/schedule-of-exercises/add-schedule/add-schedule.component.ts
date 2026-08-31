import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { HomePageService } from 'app/service/home/home-page.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isError: boolean;
  resp: any[] = [];
  terms: string[];
  unSelectedFile;
  seasonTerms: any[] = [];

  addScheduleForm: FormGroup;
  pTitle;
  //for update
  id;
  docUrl: any;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;
  currYear = new Date().getFullYear();

  exeLength = 0;
  recceLength = 0;
  bbeLength = 0;
  verbalLength = 0;
  smdLength = 0;
  durationLength = 0;
  dsBriefingLength = 0;
  url: any;
  constructor(private fb: FormBuilder, private service: TrgTeamService, private snackbar: MatSnackBar, public dialog: MatDialog,
    private academicservice: AcademicDeptService, private Trgservice: TrgBattalionService, private spinner: NgxSpinnerService, private el: ElementRef, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef) {
    this.addScheduleForm = this.fb.group({
      seasonTermId: ['', Validators.required],
      year: [this.currYear, [Validators.required, Validators.min(this.currYear), Validators.max(this.currYear + 5)]],
      exercise: ['', Validators.required],
      termId: ['', Validators.required],
      respId: [, Validators.required],
      dsBriefing: [''],
      recceTewt: [''],
      bbe: [''],
      verbalOrders: [''],
      smd: [''],
      duration: [''],
      status: ['1', Validators.required],
      url: [''],
      id: []
    })

    this.service.getRESP().subscribe(
      res => {
        console.log(res);
        if (res.status == '1') {

          this.resp = res.List;
          this.cdref.detectChanges();
        }
      }
    )
    this.service.getAllTerms().subscribe(
      res => {
        this.terms = res.List


      }
    )

    this.service.getAllSeasonTerm().subscribe(
      res => {
        console.log(res);
        if (res.status == '1') {
          this.seasonTerms = res.List;
          this.cdref.detectChanges();
        }
      }
    )

  }


  get f() {
    return this.addScheduleForm.controls;
  }
  upload1(event: any, index: number): void {
    this.spinner.show();
    let fileName = event.target.files[0].name;
    var file = event.target.files[0];
    this.Trgservice.FileAboutUs(file).subscribe(
      res => {
        console.log(res.object.url);
        if (res.status == 'OK') {
          this.academicservice.openSnackbar(res.message)
          this.addScheduleForm.patchValue({
            url: res.object.url,
          })
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.academicservice.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.academicservice.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }
  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: l
      }
    });
  }
  charCount(e: any, t) {
    if (t == 'exercise')
      this.exeLength = e.target.value.length
    if (t == 'dsBriefing')
      this.dsBriefingLength = e.target.value.length
    if (t == 'recceTewt')
      this.recceLength = e.target.value.length
    if (t == 'bbe')
      this.bbeLength = e.target.value.length
    if (t == 'verbalOrders')
      this.verbalLength = e.target.value.length
    if (t == 'smd')
      this.smdLength = e.target.value.length
    if (t == 'duration')
      this.durationLength = e.target.value.length
  }

  ngOnInit(): void {
    if (this.router.url.includes('view-schedule')) {
      this.pTitle = 'View Schedule of Exercise'
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.service.getScheduleOfExerciseById(this.id).subscribe(
        res => {

          console.log(res);

          if (res.status == '1') {
            this.addScheduleForm.patchValue({
              seasonTermId: res.Object.termSeason.id,
              year: res.Object.year,
              exercise: res.Object.exercise,
              termId: res.Object.term.id,
              respId: res.Object.respDetails.id,
              dsBriefing: res.Object.dsBriefing,
              recceTewt: res.Object.recceTewt,
              bbe: res.Object.bbe,
              verbalOrders: res.Object.verbalOrders,
              smd: res.Object.smd,
              duration: res.Object.duration,
              status: res.Object.status,
              url: res.Object.url,
              id: res.Object.id
            })
            this.docUrl = res.object.file
            this.isDoc = true;
            this.exeLength = res.Object.exercise.length;
            this.recceLength = res.Object.recceTewt.length;
            this.bbeLength = res.Object.bbe.length;
            this.verbalLength = res.Object.verbalOrders.length;
            this.smdLength = res.Object.smd.length;
            this.durationLength = res.Object.duration.length;
            this.dsBriefingLength = res.Object.dsBriefing.length;
            this.cdref.detectChanges();
          }
        },
        err => { }
      )
    } else {
      this.pTitle = "Add Schedule of Exercise"
    }




  }

  goBack() {
    this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-exercises']);
  }



  addSchedule() {
    if (this.addScheduleForm.invalid) {
      this.isError = true;
      this.openSnackbar("Please Fill All Required Fields")
      this.spinner.hide();
    }
    else {
      console.log(this.addScheduleForm.value, "new");

      this.service.addScheduleOfExercise(this.addScheduleForm.value).subscribe(
        res => {
          console.log(res);

          if (res.status == '1') {

            this.spinner.hide();
            this.openSnackbar(res.msg)
            this.cdref.detectChanges()
            this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-exercises']);

          }
          else {
            this.spinner.hide();
            this.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide()
          this.openSnackbar('Some Error Occured.');
        }
      )


    }

  }


  updateSchedule() {
    if (this.addScheduleForm.invalid) {
      this.isError = true;
      for (const key of Object.keys(this.addScheduleForm.controls)) {
        if (this.addScheduleForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.openSnackbar("Please Fill All Required Fields")
    }
    else {
      this.service.updateScheduleOfExercise(this.addScheduleForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.spinner.hide();
            this.openSnackbar(res.msg)
            this.cdref.detectChanges()
            this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-exercises'])
          }
          else {
            this.spinner.hide();
            this.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide()
          this.openSnackbar('Some Error Occured.');
        }
      )
    }

  }




  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }


}
