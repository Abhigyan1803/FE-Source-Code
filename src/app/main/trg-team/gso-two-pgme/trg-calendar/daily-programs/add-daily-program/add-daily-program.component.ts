import { ChangeDetectorRef, Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwIfEmpty } from 'rxjs/operators';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'ms-add-daily-program',
  templateUrl: './add-daily-program.component.html',
  styleUrls: ['./add-daily-program.component.scss']
})
export class AddDailyProgramComponent implements OnInit {
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  @ViewChild('startHours', { static: true }) startHours;
  @ViewChild('startMinutes', { static: true }) startMinutes;
  @ViewChild('endHours', { static: true }) endHours;
  @ViewChild('endMinutes', { static: true }) endMinutes;

  min_s_hrs = '00';
  min_s_mnts = '00';
  min_e_hrs = '00';
  min_e_mnts = '00';

  id;
  pageTitle;

  isError:boolean = false;
  isLessDate:boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addProgramForm: FormGroup;

  public localID: string;
  weeks: string[] = [/*'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI'*/];
  terms: string[] = [/*'I', 'II', 'III'*/]

  date = new Date();
  minDate;
  maxDate;


  seasonTerms: any[] = [];
  battalions: any[] = [];

  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private service: TrgTeamService, private snackbar: MatSnackBar, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef,
    @Inject(LOCALE_ID) localID: string
  ) {

    this.addProgramForm = this.fb.group({
      battalion: ['', Validators.required],
      week: ['', Validators.required],
      date: ['', [Validators.required, this.currentDateValidator.bind(this)]],
      seasonTerm: ['', Validators.required],

      year: [this.currentYear, [Validators.required, Validators.min(this.currentYear), Validators.max(this.currentYear+5)]],

      term: ['', Validators.required],

      startTime: ['', Validators.required],
      endTime: ['', Validators.required],

      period: [''],
      subject: [''],
      type: [''],
      lession: [''],
      instruction: [''],
      place: [''],
      status: ['1', Validators.required],
    })

    //get season terms
    this.service.getAllSeasonTerm().subscribe(
      res => {
        if (res.status == '1') {
          this.seasonTerms = res.List
          this.cdref.detectChanges();
        }
      }
    )
    //get battalions
    this.service.getBattalions().subscribe(
      res => {
        // console.log(res);
        if (res.status == 'OK') {
          this.battalions = res.object
          this.cdref.detectChanges();
        }
      }
    )
    //get terms
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if(res.status == '1'){
          this.terms = res.List
          this.cdref.detectChanges();
        }
        
      }
    )

    //weeks
    this.service.getAllWeeks().subscribe(
      res => {
        // console.log(res);
        if(res.status == 'OK'){
          this.weeks = res.object
          this.cdref.detectChanges();
        }
        
      }
    )

    this.localID = localID;

    this.minDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);
    this.maxDate  = formatDate(this.date.setFullYear(this.currentYear+5), 'yyyy-MM-dd', this.localID);
  }


  ngOnInit(): void {
    if (this.router.url.includes('view-program')) {
      this.spinner.show()
      this.pageTitle = 'View PGME'
      this.id = this.route.snapshot.queryParamMap.get('id');
      // console.log(this.id);
      this.service.getTRGProgramById(this.id).subscribe(
        res => {
          // console.log(res);

          if (res.status == 'OK') {
            this.addProgramForm.patchValue({

              battalion: res.object.battalian,
              week: res.object.week,
              date: formatDate(res.object.date, 'yyyy-MM-dd', this.localID),
              seasonTerm: res.object.sessionTerm,
              year: res.object.year,

              term: res.object.term,

              startTime: res.object.startTime,
              endTime: res.object.endTime,

              period: res.object.period,
              subject: res.object.subject,
              type: res.object.type,
              lession: res.object.lession,
              instruction: res.object.instruction,
              place: res.object.place,
              status: res.object.status,
            })


            this.startHours.nativeElement.value = res.object.startTime.substr(0,2)
            this.startMinutes.nativeElement.value = res.object.startTime.substr(2,4)
            this.endHours.nativeElement.value =  res.object.endTime.substr(0,2)
            this.endMinutes.nativeElement.value =  res.object.endTime.substr(2,4)

            this.spinner.hide()

          }

        }
      )


    } else {
      this.pageTitle = 'Add PGME'
    }


    // this.startHours.nativeElement.value = '00'
    // this.startMinutes.nativeElement.value = '00'
    // this.endHours.nativeElement.value = '00'
    // this.endMinutes.nativeElement.value = '00'




  }

  public get f() {
    return this.addProgramForm.controls;
  }



  onSelectDate(e: any) {

    let selectedDate = e.target.value;
    // console.log(e.target.value);
    let currDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);

    if (selectedDate == currDate) {

      this.startHours.nativeElement.value = formatDate(this.date, 'HH', this.localID);
      this.startMinutes.nativeElement.value = formatDate(this.date, 'mm', this.localID);

      this.min_s_hrs = formatDate(this.date, 'HH', this.localID);
      this.min_s_mnts = formatDate(this.date, 'mm', this.localID);
      this.min_e_hrs = formatDate(this.date, 'HH', this.localID);
      this.min_e_mnts = formatDate(this.date, 'mm', this.localID);

      this.addProgramForm.patchValue({
        startTime: this.startHours.nativeElement.value + this.startMinutes.nativeElement.value
      })

      // console.log(this.addProgramForm.value);

    } else {

      this.min_s_hrs = '00';
      this.min_s_mnts = '00';
      this.min_e_hrs = '00';
      this.min_e_mnts = '00';

    }

  }

  startHoursSelected(e: any) {

    this.min_e_hrs = e.target.value
    
    this.startHours.nativeElement.value = e.target.value;
    
    if(this.startMinutes.nativeElement.value){
      this.addProgramForm.patchValue({
        startTime:this.startHours.nativeElement.value+this.startMinutes.nativeElement.value
      })
    }

    this.endHours.nativeElement.value = '';
    
    this.endMinutes.nativeElement.value = '';




  }

  startMinutesSelected(e: any) {
   
    this.startMinutes.nativeElement.value = e.target.value;
    if(this.startHours.nativeElement.value){

      this.addProgramForm.patchValue({
        startTime: this.startHours.nativeElement.value + this.startMinutes.nativeElement.value
      })
    } else {

      // console.log('select hours');
      alert('Please Select Hours')
      
    }

    // console.log(this.addProgramForm.value);
  }

  endHoursSelected(e: any) {
    
    if(e.target.value == this.startHours.nativeElement.value){
      this.min_e_mnts = this.startMinutes.nativeElement.value;
    } else {
      this.min_e_mnts = '00'
    }
    
    if(this.endMinutes.nativeElement.value){
      this.addProgramForm.patchValue({
        endTime:this.endHours.nativeElement.value+this.endMinutes.nativeElement.value
      })
    }

    this.endHours.nativeElement.value = e.target.value;
  }

  endMinutesSelected(e: any) {
    
    this.endMinutes.nativeElement.value = e.target.value
    if(this.endHours.nativeElement.value){
      this.addProgramForm.patchValue({
        endTime: this.endHours.nativeElement.value + this.endMinutes.nativeElement.value
      })
      
    }
    else {
      // console.log('select hours');
      alert('Please Select Hours')
    }
    // console.log(this.addProgramForm.value);

  }


  goBack(){
    this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/daily-programs'])
  }
  addProgram() {

    if(this.addProgramForm.valid){

      this.spinner.show()
      this.service.addTRGDailyProgram(this.addProgramForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.openSnackbar(res.message)
            this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/daily-programs'])
          }
          else {
            this.spinner.hide()
            this.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
    } else {
      this.isError = true
    }

  }


  updateProgram() {
    if(this.addProgramForm.valid){
      this.spinner.show()
      this.service.updateTRGProgram(this.id, this.addProgramForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.openSnackbar(res.message)
            this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/daily-programs'])
          }
          else {
            this.spinner.hide()
            this.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
    } else {
      this.isError = true;
    }
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  currentDateValidator(control: FormControl): ValidationErrors | null{
    const currDt =  new Date().setHours(0o00,0o00,0o00,0o0000);
    const maxAcceptDate = new Date().setFullYear(this.currentYear + 5)
    
    const pDt = Date.parse(control.value.toString());

    if (pDt < currDt || pDt > maxAcceptDate) {
      this.isLessDate = true;
      return { 'invalidDate': true };
    } else {
      this.isLessDate = false;
      return null;
    }
  }

  
}

 

