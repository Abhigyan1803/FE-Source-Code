import { ChangeDetectorRef, Component, OnInit, LOCALE_ID, ViewChild, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';
import { HomePageService } from 'app/service/home/home-page.service';

@Component({
  selector: 'ms-add-weekly-program',
  templateUrl: './add-weekly-program.component.html',
  styleUrls: ['./add-weekly-program.component.scss']
})
export class AddWeeklyProgramComponent implements OnInit {

  id;
  pageTitle = "Add Weekly PGME";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  show: boolean = false;

  addProgramForm: FormGroup = new FormGroup({});

  weeks: any[] = [/*'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI'*/];
  terms: string[] = [/*'I', 'II', 'III'*/]

  seasonTerms: any[] = [];
  battalions: any[] = [];

  date = new Date();

  currentYear = this.date.getFullYear();

  public localID: string;

  isError: boolean = false;
  isLessDate: boolean = false;
  isInvalidProgramDate: boolean = false;

  addPgme: boolean = true;


  constructor(private fb: FormBuilder, private service: TrgTeamService, private snackbar: MatSnackBar, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef, @Inject(LOCALE_ID) localID: string,
    public sharedService: SharedService, private homepageService: HomePageService
  ) {
    this.addProgramForm = this.fb.group({

      seasonTerm: ['', Validators.required],
      year: [this.currentYear, Validators.min(this.currentYear)],
      week: ['', Validators.required],

      weekStartDate: [''],
      weekEndDate: [''],

      battalion: ['', Validators.required],
      term: ['', Validators.required],

      weeklyScheduleDate: this.fb.array([]),

      status: ['1', Validators.required]

    });

    //get season terms
    this.service.getAllSeasonTerm().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.seasonTerms = res.List
          this.cdref.detectChanges();
        }
      }
    )

    //get battalions
    this.service.getBattalions().subscribe(
      res => {
        if (res.status == 'OK') {
          this.battalions = res.object
          this.cdref.detectChanges();
        }
      }
    )

    //get weeks
    this.service.getAllWeeks().subscribe(
      res => {
        // console.log(res);
        if (res.status == 'OK') {
          this.weeks = res.object
          this.cdref.detectChanges()
        }
      }
    )

    //get terms
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.terms = res.List
          this.cdref.detectChanges();
        }
      }
    )

    this.localID = localID;

  }


  ngOnInit(): void {

    this.formValueChanges();

    if (this.router.url.includes('view-program')) {
      this.getPgmeById();
    }

  }

  //find value changes
  formValueChanges() {
    let seasonTerm;
    let year = this.f.year.value;
    let week;
    let battalion;
    let term;
    this.addProgramForm.get('seasonTerm').valueChanges.subscribe(
      res => {
        // console.log(res);
        seasonTerm = res;
        this.checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term)
      }
    )
    this.addProgramForm.get('year').valueChanges.subscribe(
      res => {
        // console.log(res);
        year = res;
        this.checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term)
      }
    )
    this.addProgramForm.get('week').valueChanges.subscribe(
      res => {
        // console.log(res);
        week = res;
        this.checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term)
      }
    )
    this.addProgramForm.get('battalion').valueChanges.subscribe(
      res => {
        // console.log(res);
        battalion = res;
        this.checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term)
      }
    )
    this.addProgramForm.get('term').valueChanges.subscribe(
      res => {
        // console.log(res);
        term = res;
        this.checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term)
      }
    )

  }

  //check either program is already added.
  checkIfProgramAlreadyAdded(seasonTerm, year, week, battalion, term) {

    if (seasonTerm && year && week && battalion && term) {
      const data = {
        termSeasonId: seasonTerm,
        year: year,
        weekId: week,
        battalianId: battalion,
        termId: term
      }
      
      this.homepageService.getWeeklyPrograms(data).subscribe(
        res => {
          // console.log(res);
          if (res.status == "OK") {
            if (res.object.length) {

              if(this.addPgme){
           alert('Programs Already Added. Redirecting to Program Details.')
              }
              const id = res.object['0'].id
              this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/weekly-programs/view-program'], { queryParams: { id: id } })
            }
          }
        }
      )
    }
  }


  getPgmeById() {
    this.addPgme = false;

    this.spinner.show();
    this.pageTitle = 'View Weekly PGME Details';
    this.id = this.route.snapshot.queryParamMap.get('id')
    // console.log(this.id);
    this.service.getWeeklyProgramById(this.id).subscribe(
      res => {
        console.log('View Programs: ', res);
        if (res.status == 'OK') {
          let values = res.object
          this.show = true;
          this.addProgramForm.patchValue({
            seasonTerm: values.sessionTerm.id,
            year: values.year,
            week: values.week.id,

            weekStartDate: formatDate(values.weekStartDate, "dd MM yyyy, EEEE", this.localID),
            weekEndDate: formatDate(values.weekEndDate, "dd MM yyyy, EEEE", this.localID),

            battalion: values.battalian.id,
            term: values.term.id,


            status: values.status

          })


          this.patchValues(values.weeklyScheduleDate)
          // console.log(this.addProgramForm.value);
          // console.log(values.weeklyScheduleDate);

          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide()
          this.sharedService.openSnackbar(res.message);
        }
      },

      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar('Some Error Occured.');
      }
    )

  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateTime(event: any) {
    // console.log(event.target.value);
    if (event.target.value > 2359) {
      event.target.value = '';
      event.preventDefault();
      this.sharedService.openAlertSnackbarWithSeconds('Please Enter Correct Time.', 3);
      return false;
    }

  }

  getAllDatesOfWeek() {
    if (this.addPgme) {
      this.show = false;
      this.weeklyScheduleDates.clear()

      if (this.f.seasonTerm.value && this.f.week.value) {
        this.spinner.show();
        this.service.getAllDatesOfWeek(this.f.seasonTerm.value, this.f.year.value, 'Week ' + this.f.week.value)
          .subscribe(
            res => {
              // console.log(res);

              if (res.status == 'OK') {

                const ob = res.object

                if (ob) {
                  let today =  formatDate(Date.now(), 'yyyy-MM-dd', this.localID)
                  let wEnd =  formatDate(ob.weekEndDate, 'yyyy-MM-dd', this.localID)
// console.log(today);
// console.log(wEnd);


                  if(today > wEnd){
                    this.sharedService.openAlertSnackbarWithSeconds('Week has been Passed!',5)

                  } else {
                    console.log(ob.weekStartDate);

                    let startDate = Date.parse(ob.weekStartDate)
                    let endDate = Date.parse(ob.weekEndDate)
                    console.log(startDate);

                    this.addProgramForm.patchValue({
                      weekStartDate: formatDate(ob.weekStartDate, 'dd MMM yyyy, EEEE', this.localID),
                      weekEndDate: formatDate(ob.weekEndDate, 'dd MMM yyyy, EEEE', this.localID),
                    })
  
                    for (let i = startDate; i <= endDate; i = i + 86400000) {
  
                      this.generateDates(i)
  
                    }
  
                    this.show = true;
  
                    console.log(this.addProgramForm.value);
                    
                  }


                }

                else {
                  this.sharedService.openSnackbar("No Records Found")
                }

                this.spinner.hide();

              } else {
                this.spinner.hide();
                this.sharedService.openSnackbar(res.message)
              }

            },
            err => {
              this.spinner.show();
              this.sharedService.openSnackbar('Some Error Occured')
            }
          )
      }

    }

  }


  get weeklyScheduleDates() {
    return this.addProgramForm.get('weeklyScheduleDate') as FormArray
  }

  getPGMEs(index): FormArray {
    return this.weeklyScheduleDates.at(index).get('dailySchedule') as FormArray;
  }

  getASchedule() {
    return {
      id: [''],
      period: [''],
      startTime: [''],
      endTime: [''],
      subject: [''],
      type: [''],
      lession: [''],
      instructor: [''],
      place: ['']
    };
  }

  addPGME(index) {
    this.getPGMEs(index).push(this.fb.group(this.getASchedule())
    )
  }

  removePGME(i1, i2) {
    this.getPGMEs(i1).removeAt(i2);
  }

  generateDates(date) {
    this.weeklyScheduleDates.push(this.fb.group({
      id: [''],
      // displayDate: formatDate(date, 'dd MMM yyyy, EEEE', this.localID),
      date: new Date(date),
      dailySchedule: this.fb.array([
        this.fb.group(this.getASchedule())
      ])
    })
    )
  }


  public get f() {
    return this.addProgramForm.controls;
  }

  goBack() {
    if (this.router.url.includes('main/trg-team'))
      this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/weekly-programs'])

    if (this.router.url.includes('main/admin/trg-team'))
      this.router.navigate(['/main/admin/trg-team/gso-2-pgme/trg-calendar/weekly-programs'])
  }

  patchValues(arr: any[]) {

    for (let i = 0; i < arr.length; i++) {
      this.generateDates(arr[i].date)
      // console.log(arr[i]);
      if (arr[i].dailySchedule.length) {
        // console.log(arr[i].dailySchedule);
        for (let j = 0; j < arr[i].dailySchedule.length - 1; j++) {
          this.addPGME(i)
        }
      }

    }

    this.addProgramForm.patchValue({
      weeklyScheduleDate: arr
    })

  }


  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message);
      this.goBack()
    }
    else {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message);
    }
  }


  addProgram() {
    // console.log(this.addProgramForm.value);

    if (this.addProgramForm.valid) {
      this.spinner.show()
      this.service.addWeeklyProgram(this.addProgramForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res)
        },
        err => {
          console.log(JSON.stringify(err));
          this.spinner.hide();
          this.sharedService.openSnackbar('Error Occured.')
        }
      )
    } else {
      this.sharedService.openSnackbar('Please Fill All Required Fields.')
      this.isError = true;
    }

  }

  updateProgram() {
    console.log(this.addProgramForm.value);

    // if (this.addProgramForm.valid) {
    //   this.spinner.show()
    //   this.service.updateWeeklyProgram(this.id, this.addProgramForm.value).subscribe(
    //     res => {
    //       // console.log(res);
    //       this.apiRes(res)
    //     },
    //     err => {
    //       console.log(JSON.stringify(err));
    //       this.spinner.hide();
    //       this.sharedService.openSnackbar('Error Occured.')
    //     }
    //   )
    // } else {
    //   this.sharedService.openSnackbar('Please Fill All Required Fields.')
    //   this.isError = true;
    // }
  }

}