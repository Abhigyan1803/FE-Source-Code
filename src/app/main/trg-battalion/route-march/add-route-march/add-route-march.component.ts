import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// import { AmazingTimePickerService } from 'amazing-time-picker';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-route-march',
  templateUrl: './add-route-march.component.html',
  styleUrls: ['./add-route-march.component.scss']
})
export class AddRouteMarchComponent implements OnInit {

  id: string = '';
  resultType: string = '';
  temId: string = '';
  routemarchForm: FormGroup = new FormGroup({});
  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  // km =['10','20','30'];
  term
  propertime
  kms
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef
    , private activeRoute: ActivatedRoute) {

    this.routemarchForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      remark: ['',],
      termId: ['', Validators.required],
      resultType: ['Route March', Validators.required,],
      totalMarks: ['15', Validators.required,],
      obtainedMarks: ['', Validators.required,],
      hours: ['',],
      minutes: ['',],
      date: [''],
      distance: ['']
    })

  }


  Runbackupdate: any[] = [];
  Runbackadd: any[] = [];

  nn
  fruit

  //  match:any
  hou;
  mi
  kk:any
  kk1:any
  
  nnnnn
  ngOnInit(): void {
    this.spinner.show();
    if (this.router.url.includes('id'), ('resultType'), ('termId')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.resultType = this.route.snapshot.queryParamMap.get('resultType');
      this.resultType = this.route.snapshot.queryParamMap.get('resultType');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      
      console.log(this.resultType, "resulttype")
    }
    if (this.router.url.includes('add-route-march')) {
      this.spinner.show();
      this.adminservice.getDrillMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.term = res.object.term
            console.log(this.term,"res.object.termId")
            var km;
            if (this.term == "1") {
              km = 10;
            } else if (this.term == "2") {
              km = 20;
            } else if (this.term == "term-III") {
              km = 30;
            } else if (this.term == "term-IV") {
              km = 40;
            }
            else if (this.term == "term-V") {
              km = 50;
            } else if (this.term == "term-VI") {
              km = 60;
            } else if (this.term == "term-II-tech") {
              km = 70;
            }
            console.log(this.term, "term")
            console.log(km, "km")
            this.kms = km

            this.routemarchForm.patchValue({
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
        runbackid: this.resultType,

      }
      var serviceId = getForm.id
      var resulttypeId = getForm.runbackid
      this.termId
      console.log(this.termId)
      var temId=this.termId
      this.adminservice.getRunback(serviceId, resulttypeId,temId).subscribe(
        res => {

          if (res.message == "OK") {
            this.mnc = "update"
            this.spinner.hide()
            this.Runbackupdate = res.object;
            this.id = res.object.id
            this.nn = res.object.date

            var hhh = this.nn;
              var match = hhh.split(':');
              var hh = match[0];
              var mm = match[1];
              this.kk=hh
              this.kk1=mm
            this.routemarchForm.patchValue({
              totalMarks: res.object.totalMarks,
              obtainedMarks: res.object.obtainedMarks,
              remark: res.object.remark,
              hours: this.kk,
              minutes: this.kk1,


            })
            this.cdref.detectChanges();
          }
          else if (res.message == "Record not found") {
            this.spinner.hide()
            this.mnc = "add";
            this.Runbackadd = res.object;
          }

        }
      )
    }
  }
  serviceId
  termId
  Campmarks1
  mnc = "add"
  hour
  min
  totaltime
  ngAfterViewInit() {
  }
  hoursChanged(e) {
    console.log(e.target.value, "hours")
    this.hour = e.target.value
  }
  minChanged(e) {
    console.log(e.target.value, "min")
    this.min = e.target.value
    this.totaltime = this.hour + ':' + this.min
    console.log(this.totaltime, "totaltime")
  }
  // open() {
  //   const amazingTimePicker = this.atp.open();
  //   amazingTimePicker.afterClose().subscribe(time => {
  //     console.log(time,"hhhh");
  //   });
  // }

  change(e) {
    if (e > 15) {
      this.adminservice.openSnackbar("Obtained Marks is greater then Total Marks")
      this.routemarchForm.controls.obtainedMarks.setValue('')
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

  // submit() {
  //   if (this.routemarchForm.invalid || this.routemarchForm.controls.obtainedMarks.value > 15) {
  //     this.isError = true;
  //     this.adminservice.openSnackbar("Please Fill All Required Fields")
  //   }
  //   else {
  //     this.propertime = this.totaltime
  //     this.routemarchForm.value.date = this.propertime
  //     this.routemarchForm.value.distance = this.kms


  //     console.log(this.routemarchForm.value.distance, "uuuu")

  //     var formdata = this.routemarchForm.value
  //     delete formdata.battalian;
  //     delete formdata.cadetRank;
  //     delete formdata.company;
  //     delete formdata.course;
  //     delete formdata.subject;
  //     delete formdata.termSession;
  //     delete formdata.subject;
  //     delete formdata.username;
  //     delete formdata.hours;
  //     delete formdata.minutes;
  //     console.log(formdata, "jjjjj")
  //     this.adminservice.addRunback(formdata).subscribe(
  //       res => {
  //         if (res.message == "Record added succesfully") {
  //           this.adminservice.openSnackbar("RouteMarch Added Successfully");
  //           // this.spinner.hide()
  //         }
  //         err => {
  //           // this.spinner.hide()
  //           this.adminservice.openSnackbar("Some Error Occured.");
  //         }
  //       }
  //     )
  //     if (this.router.url.includes('trg-battalion'))
  //       this.router.navigate(['/main/trg-battalion/route-march']);
  //   }
  // }
  runbackResult
  confirm() {
    if (this.routemarchForm.invalid || this.routemarchForm.controls.obtainedMarks.value > 15) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else {
      this.routemarchForm.value.date=this.totaltime
      this.routemarchForm.value.distance=this.kms

      this.routemarchForm.value == this.runbackResult
      this.runbackResult = Object.assign({}, this.routemarchForm.value, { id: this.id });
      var formdata = this.runbackResult
      delete formdata.battalian;
      delete formdata.cadetRank;
      delete formdata.company;
      delete formdata.course;
      delete formdata.subject;
      delete formdata.termSession;
      delete formdata.subject;
      delete formdata.term;
      delete formdata.username;
      delete formdata.hours;
      delete formdata.minutes;
      console.log(formdata)
      this.adminservice.updateRunback(formdata).subscribe(
        res => {
          if (res.message == "Record updated successfully") {
            this.adminservice.openSnackbar("RouteMarch Updated Successfully");
          }
          else {
            err => {
              this.spinner.hide()
              this.adminservice.openSnackbar("Some Error Occured.");
            }

          }
        }
      )
      if (this.router.url.includes('trg-battalion'))
        this.router.navigate(['/main/trg-battalion/route-march']);

    }
  }
}
