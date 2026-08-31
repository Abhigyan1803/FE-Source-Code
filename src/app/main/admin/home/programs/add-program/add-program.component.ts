import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  @ViewChild('scheduleDate', { static: true }) scheduleDate;


  @ViewChild('startHours', { static: true }) startHours;
  @ViewChild('startMinutes', { static: true }) startMinutes;
  @ViewChild('endHours', { static: true }) endHours;
  @ViewChild('endMinutes', { static: true }) endMinutes;
  
  dateSelected;

  min_s_hrs = '00';
  min_s_mnts = '00';
  min_e_hrs = '00';
  min_e_mnts = '00';

  // @ViewChild('scheduleHours', { static: true }) scheduleHours;
  // @ViewChild('scheduleMinutes', { static: true }) scheduleMinutes;

  // minHours;
  // minMinutes;

  addProgramForm: FormGroup;
  pageName: string;
  id;

  isError:boolean=false;

  date = new Date();
  minDate;
  maxDate;

  date_time;

  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  localID;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private service: AdminService, private router: Router, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private snackbar: MatSnackBar, private cdref: ChangeDetectorRef, @Inject(LOCALE_ID) localID: string) {
    this.addProgramForm = this.fb.group({
      scheduledDate: [''],
      startTime:[''],
      endTime:[''],
      title: ['', Validators.required],
      venue: ['', Validators.required]
    })

    this.localID = localID
    this.minDate = formatDate(Date.now(), 'yyyy-MM-dd', this.localID);
    this.maxDate = formatDate(Date.now() + (48 * 60 * 60 * 1000), 'yyyy-MM-dd', this.localID);

  }

  ngOnInit(): void {

    // console.log(this.scheduleDate);

    this.spinner.show();
    if (this.router.url.includes('view-program')) {
      this.pageName = "View PGME";
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getProgramDetailsById(this.id).subscribe(
        res => {
          if (res.status == '1') {

            let checkDt = formatDate(res.List.scheduledDate, 'yyyy-MM-dd', this.localID);
            let currDt = formatDate(Date.now(), 'yyyy-MM-dd', this.localID);

            this.scheduleDate.nativeElement.value = formatDate(res.List.scheduledDate, 'yyyy-MM-dd', this.localID);
            this.date_time = new Date(res.List.scheduledDate);

            // this.scheduleHours.nativeElement.value = formatDate(res.List.scheduledDate, "HH", this.localID);
            // this.scheduleMinutes.nativeElement.value = formatDate(res.List.scheduledDate, "mm", this.localID);

            this.addProgramForm.patchValue({
              scheduledDate: res.List.scheduledDate,
              startTime: res.List.startTime,
              endTime: res.List.endTime,
              title: res.List.title,
              venue: res.List.venue
            })

            this.dateSelected = new Date(res.List.scheduledDate);
            
            this.startHours.nativeElement.value = new Date(res.List.startTime).getHours()
            this.endHours.nativeElement.value = new Date(res.List.endTime).getHours()
            this.startMinutes.nativeElement.value = new Date(res.List.startTime).getMinutes()
            this.endMinutes.nativeElement.value = new Date(res.List.endTime).getMinutes()

            if(currDt == checkDt){
              // this.minHours = new Date().getHours();
              // this.minMinutes = new Date().getMinutes();
            }


            this.titleLength = res.List.title.length;
            this.venueLength = res.List.venue.length;

            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.openSnackbar(res.msg)
          }

        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Some Error Occured.')
        }
      )

    }
    else if (this.router.url.includes('add-program')) {
      this.pageName = "Add PGME"
      this.spinner.hide()
    }
  }

  public get f() {
    return this.addProgramForm.controls;
  }




  onSelectDate(e: any) {

    let selectedDate = e.target.value;
    console.log(selectedDate,"rr")
    // console.log("Parsed date: ");
    // console.log(Date.parse(selectedDate));
    
    this.addProgramForm.patchValue({
      scheduledDate: Date.parse(selectedDate)
    })
    // console.log(e.target.value);
    this.dateSelected = new Date(e.target.value);
    console.log(this.dateSelected)
    let currDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);

    if (selectedDate == currDate) {

      this.startHours.nativeElement.value = formatDate(this.date, 'HH', this.localID);
      this.startMinutes.nativeElement.value = formatDate(this.date, 'mm', this.localID);

      this.min_s_hrs = formatDate(this.date, 'HH', this.localID);
      this.min_s_mnts = formatDate(this.date, 'mm', this.localID);
      this.min_e_hrs = formatDate(this.date, 'HH', this.localID);
      this.min_e_mnts = formatDate(this.date, 'mm', this.localID);

      this.dateSelected.setHours(this.min_s_hrs,this.min_s_mnts)
      
      this.addProgramForm.patchValue({
        startTime: new Date(this.dateSelected)
      })

      console.log(new Date(this.dateSelected));
      
      console.log(this.addProgramForm.value);

    } else {

      this.min_s_hrs = '00';
      this.min_s_mnts = '00';
      this.min_e_hrs = '00';
      this.min_e_mnts = '00';

    }

  }




  
  startHoursSelected(e: any) {

    this.min_e_hrs = e.target.value
    console.log(this.min_e_hrs)
    this.startHours.nativeElement.value = e.target.value;
    console.log(this.startHours.nativeElement.value)

    // if (this.startMinutes.nativeElement.value) {
      this.addProgramForm.patchValue({
        startTime: new Date(this.dateSelected.setHours(this.startHours.nativeElement.value))
      })
    // }

    console.log(this.addProgramForm.value);

    this.endHours.nativeElement.value = '';
    this.endMinutes.nativeElement.value = '';

    if(this.date.getHours() != this.dateSelected.getHours()){
      this.min_s_mnts = '00'
    } else {
      this.min_s_mnts = formatDate(this.date, 'mm', this.localID);

    }

  }


  startMinutesSelected(e: any) {

    if (this.startHours.nativeElement.value) {

    this.startMinutes.nativeElement.value = e.target.value;
    console.log(this.startMinutes.nativeElement.value)
      this.addProgramForm.patchValue({
        startTime: new Date(this.dateSelected.setMinutes(e.target.value))
      })
      console.log(this.addProgramForm.value);
      
    } else {

      // console.log('select hours');
      alert('Please Select Hours');

    }



    // console.log(this.addProgramForm.value);
  }

  endHoursSelected(e: any) {
    if (e.target.value == this.startHours.nativeElement.value) {
      this.min_e_mnts = this.startMinutes.nativeElement.value;
    } else {
      this.min_e_mnts = '00'
    }

    // if (this.endMinutes.nativeElement.value) {
      this.addProgramForm.patchValue({
        endTime: new Date(this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value))
      })
    // }

    console.log(this.addProgramForm.value);
    
    this.endHours.nativeElement.value = e.target.value;
  }

  endMinutesSelected(e: any) {

    this.endMinutes.nativeElement.value = e.target.value
    // if (this.endHours.nativeElement.value) {
      this.addProgramForm.patchValue({
        endTime: new Date(this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value))
      })
      console.log(this.addProgramForm.value);

   
  }












//   dateChanged(e: any) {
//     this.date_time = new Date(e.target.value);
//     let currDt = new Date();
//     let checkDt = formatDate(currDt, 'yyyy-MM-dd', this.localID);
//     if (e.target.value == checkDt) {
//       this.minHours = currDt.getHours();
//       this.minMinutes = currDt.getMinutes();
//       this.scheduleHours.nativeElement.value =  formatDate(currDt, 'HH', this.localID);
//       this.scheduleMinutes.nativeElement.value =  formatDate(currDt, 'mm', this.localID);;
//       this.date_time.setHours(currDt.getHours());
//       this.date_time.setMinutes(currDt.getMinutes());
//     } else {
//       this.date_time.setHours("00");
//       this.date_time.setMinutes("00");
//       this.minHours = '00';
//       this.minMinutes = '00';
//       this.scheduleHours.nativeElement.value = '00';
//       this.scheduleMinutes.nativeElement.value = '00';
//     }
//     this.addProgramForm.patchValue({
//       dateTime: Date.parse(this.date_time)
//     })
//  }

//   hoursSelected(e: any) {
//     let currDt = new Date();
//     let checkDt = formatDate(currDt, 'yyyy-MM-dd', this.localID);
//     if (this.scheduleDate.nativeElement.value == checkDt) {
//       let currHrs = currDt.getHours();
//       if (e.target.value > currHrs) {
//         this.minMinutes = '00';
//         this.scheduleMinutes.nativeElement.value = '00';
//       }
//     }
//     this.date_time.setHours(e.target.value)
//     this.addProgramForm.patchValue({
//       dateTime: Date.parse(this.date_time)
//     })
//     console.log(this.date_time);
//   }

//   minutesSelected(e: any) {
//     this.date_time.setMinutes(e.target.value);
//     this.addProgramForm.patchValue({
//       dateTime: Date.parse(this.date_time)
//     })
//     console.log(this.date_time);
//   }

  goBack(){
    this.router.navigate(['/main/admin/home/programes']);
  }

  /** ========= CHARACTERS COUNT ========= */
  titleLength = 0;
  venueLength = 0;
  charCount(e: any, t) {
    if (t == 'title')
      this.titleLength = e.target.value.length
    if (t == 'venue')
      this.venueLength = e.target.value.length
  }


  addProgram() {
    if (this.addProgramForm.invalid) {
      alert('Please Select All Required Fields')
    } else {
      this.spinner.show();
      this.service.addProgram(this.addProgramForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == "1") {
            this.openSnackbar(res.msg);
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/programes']);
          } else {
            this.openSnackbar(res.msg);
          }
        },
        err => {
          console.log(JSON.stringify(err));
          this.spinner.hide();
          this.openSnackbar('Some error occured.')
        }
      )

    }




  }

  updateProgram() {

    if (this.addProgramForm.invalid) {
      alert('Please Select All Required Fields')
    }
    else {

      this.spinner.show();
      this.service.updateProgram(this.id, this.addProgramForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == "1") {
            this.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/programes'])
          } else {
            this.spinner.hide();
            this.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide();
          console.log(JSON.stringify(err));
          this.openSnackbar('Some error occured.')
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
