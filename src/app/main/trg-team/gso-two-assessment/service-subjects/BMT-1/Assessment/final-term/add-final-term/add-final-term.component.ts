import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ms-add-final-term',
  templateUrl: './add-final-term.component.html',
  styleUrls: ['./add-final-term.component.scss']
})
export class AddFinalTermComponent implements OnInit {

  id: string = '';
  resultType: string = '';
  runbackForm: FormGroup = new FormGroup({});
  term: string;
  assesmentTermType: string;
  subjectType: string;
  totlmark
  termss
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
      this.route.params.subscribe((params) => {
        this.term = params.term;
        // this.assesmentTermType = params.assesmentTermType;
        // this.subjectType  = params.subjectType;
        console.log(this.term,"term")
        // console.log(this.assesmentTermType,"termtype")
        // console.log(this.subjectType,"subtype" )
        this.router.url
        console.log(this.router.url,"url")
        this.assesmentTermType=this.router.url.split('/')[6]
        this.subjectType=this.router.url.split('/')[8]
        console.log(this.assesmentTermType,"url")
        console.log(this.subjectType,"url")
      });
      var totalMarks;
      if (this.term == "I-Term") {
        totalMarks = 100;
      } else if (this.term == "II-Term") {
        totalMarks = 100;
      } else if (this.term == "III-Term") {
        totalMarks = 200;
      } else if (this.term == "II-Tech") {
        totalMarks = 100;
     

      }
      this.totlmark=totalMarks
      console.log(totalMarks,"total")
      console.log(this.totlmark,"total")

    this.runbackForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      status: ['1', ],
      termId: ['1', Validators.required],
      term: ['', Validators.required],
      assesmentTermType: ['FINAL-TERM', Validators.required],
      subjectType: ['BMT-1', Validators.required,],
      totalMarks: [totalMarks, Validators.required,],
      obtainedMarks: ['', Validators.required,],
    })
    
  }


  Runbackupdate: any[] = [];
  Runbackadd: any[] = [];



  ngOnInit(): void {
  
    this.spinner.show();
    if (this.router.url.includes('id'), ('resultType')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.resultType = this.route.snapshot.queryParamMap.get('resultType');
      console.log(this.resultType, "resulttype")
    }
    if (this.router.url.includes('add-final')) {
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
              term: res.object.term,

            })
          } else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )


      var getForm = {
        id: this.id,
        runbackid: this.resultType
      }
      var terms;
      if (this.term == "I-Term") {
        terms = 1;
      } else if (this.term == "II-Term") {
        terms = 2;
      } else if (this.term == "III-Term") {
        terms = 3;
      } else if (this.term == "II-Tech") {
        terms = 7;

      }
      this.termss=terms
      console.log(this.termss,"termss")
      var serviceId = getForm.id;
      var subjectType =  this.assesmentTermType
      var termId=this.termss;
      var assesmentTermType="FINAL-TERM"
      var status=1

      console.log(serviceId)

      this.adminservice.getBMT1Finalterm(serviceId, subjectType,termId,assesmentTermType,status).subscribe(
        res => {

          if (res.message == "Record found successfully") {
            this.mnc = "update"
            this.spinner.hide()
            this.Runbackupdate = res.object;
            this.id=res.object.id
            this.runbackForm.patchValue({
              // totalMarks: res.object.totalMarks,
              obtainedMarks: res.object.obtainedMarks,
              remark: res.object.remark,

              
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

  ngAfterViewInit() {
  }
  change(e) {
    if (e > this.totlmark) {
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

  submit() {
    // if (this.runbackForm.invalid ||this.runbackForm.controls.obtainedMarks.value > 100) {
    //   this.isError = true;
    //   this.adminservice.openSnackbar("Please Fill All Required Fields")
    // }
     {
      var formdata = this.runbackForm.value
      delete formdata.battalian;
      delete formdata.cadetRank;
      delete formdata.company;
      delete formdata.course;
      delete formdata.subject;
      delete formdata.termSession;
      delete formdata.subject;
      delete formdata.term;
      delete formdata.username;
      this.adminservice.addBMT1Finalterm(formdata).subscribe(
        res => {
          if (res.message == "Record added succesfully") {
            this.adminservice.openSnackbar("Record Added Successfully");
            // this.spinner.hide()
          }
          err => {
            // this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }
        }
      )
      if (this.router.url.includes('trg-team'))
      this.router.navigate(['/main/trg-team/gso-2-assessment/'+this.term+'/service-subjects/BMT-1/assesment/final-term']);

  }
  }
  runbackResult
  confirm() {
    // if (this.runbackForm.invalid ||this.runbackForm.controls.obtainedMarks.value > 55) {
    //   this.isError = true;
    //   this.adminservice.openSnackbar("Please Fill All Required Fields")
    // }
    // else
    {
    this.runbackForm.value == this.runbackResult
    this.runbackResult = Object.assign({}, this.runbackForm.value, { id: this.id});
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
    console.log(formdata)
    this.adminservice.updateBMT1Finalterm(formdata).subscribe(
      res => {
        if (res.message == "record updated") {
          this.adminservice.openSnackbar("Record Updated Successfully");
        }
        else {
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }

        }
      }
    )
    if (this.router.url.includes('trg-team'))
      this.router.navigate(['/main/trg-team/gso-2-assessment/'+this.term+'/service-subjects/BMT-1/assesment/final-term']);

  }
}
}

