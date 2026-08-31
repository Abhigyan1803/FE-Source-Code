import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'ms-add-gc-msg',
  templateUrl: './add-gc-msg.component.html',
  styleUrls: ['./add-gc-msg.component.scss']
})
export class AddGcMsgComponent implements OnInit {

  unSelectedFile: any;
  docUrl: any;
  isDoc: boolean = true;

  // @ViewChild('scheduleDate', { static: true }) scheduleDate;
  @ViewChild('inputFile', { static: true }) docFile;  


  // @ViewChild('startHours', { static: true }) startHours;
  // @ViewChild('startMinutes', { static: true }) startMinutes;
  // @ViewChild('endHours', { static: true }) endHours;
  // @ViewChild('endMinutes', { static: true }) endMinutes;
  
  // dateSelected;

  // min_s_hrs = '00';
  // min_s_mnts = '00';
  // min_e_hrs = '00';
  // min_e_mnts = '00';

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

  // hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  // minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  localID;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private service: AdminService, private router: Router, private spinner: NgxSpinnerService, private dialog: MatDialog,
    private route: ActivatedRoute, private snackbar: MatSnackBar, private cdref: ChangeDetectorRef, @Inject(LOCALE_ID) localID: string) {
    this.addProgramForm = this.fb.group({
      doc: [''],
      
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
    })

    this.localID = localID
    // this.minDate = formatDate(Date.now(), 'yyyy-MM-dd', this.localID);
    // this.maxDate = formatDate(Date.now() + (48 * 60 * 60 * 1000), 'yyyy-MM-dd', this.localID);

  }

  ngOnInit(): void {
    console.log("=========================");    
    console.log(new Date());
    console.log("=========================");


    // console.log(this.scheduleDate);

    this.spinner.show();
    if (this.router.url.includes('view-gcMsg')) {
      this.pageName = "View GC MSG";
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getMESSAGEBOARDByID(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
console.log(res,"======GC MSG==");

            this.addProgramForm.patchValue({
             
              title: res.object.title,
              description: res.object.description,
              status: res.object.status,
              

            })
            this.docUrl = res.object.document
            this.isDoc = true;
console.log(this.addProgramForm,"addProgramForm===");

            // this.dateSelected = new Date(res.object.scheduledDate);
            
            // this.startHours.nativeElement.value = new Date(res.object.startTime).getHours()
            // this.endHours.nativeElement.value = new Date(res.object.endTime).getHours()
            // this.startMinutes.nativeElement.value = new Date(res.object.startTime).getMinutes()
            // this.endMinutes.nativeElement.value = new Date(res.object.endTime).getMinutes()

            // if(currDt == checkDt){
            //   // this.minHours = new Date().getHours();
            //   // this.minMinutes = new Date().getMinutes();
            // }


            this.titleLength = res.object.title.length;
            this.descLength = res.object.description.length;

            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.openSnackbar(res.message)
          }

        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Some Error Occured.')
        }
      )

    }
    else if (this.router.url.includes('add-gcMsg')) {
      this.pageName = "Add GC MSG"
      this.spinner.hide()
    }
  }

  public get f() {
    return this.addProgramForm.controls;
  }


  
  // onSelectDate(e: any) {

  //   let selectedDate = e.target.value;
  //   // console.log("Parsed date: ");
  //   // console.log(Date.parse(selectedDate));
    
  //   this.addProgramForm.patchValue({
  //     scheduledDate: Date.parse(selectedDate)
  //   })
  //   // console.log(e.target.value);
  //   // this.dateSelected = new Date(e.target.value);
  //   // console.log(this.dateSelected)
  //   let currDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);

  //   if (selectedDate == currDate) {

  //     // this.startHours.nativeElement.value = formatDate(this.date, 'HH', this.localID);
  //     // this.startMinutes.nativeElement.value = formatDate(this.date, 'mm', this.localID);

  //     // this.min_s_hrs = formatDate(this.date, 'HH', this.localID);
  //     // this.min_s_mnts = formatDate(this.date, 'mm', this.localID);
  //     // this.min_e_hrs = formatDate(this.date, 'HH', this.localID);
  //     // this.min_e_mnts = formatDate(this.date, 'mm', this.localID);

  //     // this.dateSelected.setHours(this.min_s_hrs,this.min_s_mnts)
      
  //     this.addProgramForm.patchValue({
  //       startTime: new Date(this.dateSelected)
  //       // startTime: formatDate(this.dateSelected, 'YYYY-MM-ddTHH:mm:ss.ss:sZ', this.localID)

  //     })

  //     console.log(new Date(this.dateSelected));
      
  //     console.log(this.addProgramForm.value);

  //   } else {

  //     this.min_s_hrs = '00';
  //     this.min_s_mnts = '00';
  //     this.min_e_hrs = '00';
  //     this.min_e_mnts = '00';

  //   }

  // }




  // startHoursSelected(e: any) {

  //   this.min_e_hrs = e.target.value
  //   console.log(this.min_e_hrs)
  //   this.startHours.nativeElement.value = e.target.value;
  //   this.dateSelected.setHours(this.startHours.nativeElement.value)
  //   console.log(this.startHours.nativeElement.value)
  //   // if (this.startMinutes.nativeElement.value) {
  //     this.addProgramForm.patchValue({
  //       // startTime: new Date(this.dateSelected.setHours(this.startHours.nativeElement.value))
  //       startTime: formatDate(this.dateSelected, "yyyy-MM-dd HH:mm:ss", this.localID)

  //     })
  //   // }

  //   console.log(this.addProgramForm.value);

  //   this.endHours.nativeElement.value = '';
  //   this.endMinutes.nativeElement.value = '';

  //   if(this.date.getHours() != this.dateSelected.getHours()){
  //     this.min_s_mnts = '00'
  //   } else {
  //     this.min_s_mnts = formatDate(this.date, 'mm', this.localID);

  //   }

  // }


  // startMinutesSelected(e: any) {

  //   if (this.startHours.nativeElement.value) {

  //   this.startMinutes.nativeElement.value = e.target.value;
  //   console.log(this.startMinutes.nativeElement.value)
  //   this.dateSelected.setMinutes(e.target.value)
  //     this.addProgramForm.patchValue({
  //       // startTime: new Date(this.dateSelected.setMinutes(e.target.value))
  //       startTime: formatDate(this.dateSelected, "yyyy-MM-dd HH:mm:ss", this.localID)

  //     })
  //     console.log(this.addProgramForm.value);
      
  //   } else {

  //     // console.log('select hours');
  //     alert('Please Select Hours');

  //   }



  //   // console.log(this.addProgramForm.value);
  // }

  // endHoursSelected(e: any) {
  //   if (e.target.value == this.startHours.nativeElement.value) {
  //     this.min_e_mnts = this.startMinutes.nativeElement.value;
  //   } else {
  //     this.min_e_mnts = '00'
  //   }
  //   this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value)
  //   // if (this.endMinutes.nativeElement.value) {
  //     this.addProgramForm.patchValue({
  //       // endTime: new Date(this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value))
  //       endTime: formatDate(this.dateSelected, "yyyy-MM-dd HH:mm:ss", this.localID)

  //     })
  //   // }

  //   console.log(this.addProgramForm.value);
    
  //   this.endHours.nativeElement.value = e.target.value;
  // }

  // endMinutesSelected(e: any) {

  //   this.endMinutes.nativeElement.value = e.target.value
  //   this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value)
  //   // if (this.endHours.nativeElement.value) {
  //     this.addProgramForm.patchValue({
  //       // endTime: new Date(this.dateSelected.setHours(this.endHours.nativeElement.value, this.endMinutes.nativeElement.value))
  //       endTime: formatDate(this.dateSelected, "yyyy-MM-dd HH:mm:ss", this.localID)

  //     })
  //     console.log(this.addProgramForm.value);

   
  // }


  goBack(){
    this.router.navigate(['/main/admin/home/gc-msg']);
  }

  /** ========= CHARACTERS COUNT ========= */
  titleLength = 0;
  descLength = 0;
  charCount(e: any, t) {
    if (t == 'title')
      this.titleLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }


  addProgram() {
    if (this.addProgramForm.invalid) {
      alert('Please Select All Required Fields')
    } else {
      this.spinner.show();
      this.service.addMESSAGEBOARD(this.addProgramForm.value).subscribe(
        res => {

          console.log(res);
          if (res.status == "OK") {
            this.openSnackbar(res.message);
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/gc-msg']);
          } else {
            this.openSnackbar(res.message);
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
      this.service.updateMESSAGEBOARD(this.id, this.addProgramForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == "OK") {
            this.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/gc-msg'])
          } else {
            this.spinner.hide();
            this.openSnackbar(res.message)
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


  openSnackbar(message) {
    this.snackbar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
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
      this.service.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addProgramForm.patchValue({
        doc: file
      });
      this.isDoc=true;
    }
    // console.log("selected Doc", this.addBdoForm.value);
  }


}
