import { GcService } from './../../../service/gc/gc.service';
import { ChangeDetectorRef, Component, LOCALE_ID, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Location, PopStateEvent } from "@angular/common";
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
@Component({
  selector: 'ms-interview-gc',
  templateUrl: './interview-gc.component.html',
  styleUrls: ['./interview-gc.component.scss']
})
export class InterviewGcComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  // displayedColumns: string[] = ['number', 'name', 'createdAt', 'document'];
  PCHT: any[] = [];
  type: any;
  isShow: boolean = false;
  isShowSheet: boolean = false;
  isInstructions: boolean = false;
  isInitial: boolean = false;
  isBegining: boolean = false;
  isMid: boolean = false;
  isSpecial: boolean = false;
  serviceId: any;
  cadetDetails;
  localID: string;


  datePipe = new DatePipe('en-IN');
  Id;
  termId;
  interviewFormI: FormGroup = new FormGroup({});
  interviewFormII: FormGroup = new FormGroup({});
  interviewFormIII: FormGroup = new FormGroup({});
  interviewFormIV: FormGroup = new FormGroup({});
  interviewFormV: FormGroup = new FormGroup({});
  interviewFormVI: FormGroup = new FormGroup({});
  interviewFormVII: FormGroup = new FormGroup({});
  initialInterviewFormI: FormGroup = new FormGroup({});
  initialInterviewFormII: FormGroup = new FormGroup({});
  begInterviewFormI: FormGroup = new FormGroup({});
  begInterviewFormII: FormGroup = new FormGroup({});
  begInterviewFormIII: FormGroup = new FormGroup({});
  MidInterviewFormI: FormGroup = new FormGroup({});
  MidInterviewFormII: FormGroup = new FormGroup({});
  MidInterviewFormIII: FormGroup = new FormGroup({});
  specialInterviewFormI: FormGroup = new FormGroup({});
  appGcInitialsWithDate: string;
  CurrentDate: string;

  
  constructor(
    private router: Router, private route: ActivatedRoute, private adminservice: AdminService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService,
    private GcService: GcService, private location: Location, private fb: FormBuilder, private EDossierService: EDossierService, @Inject(LOCALE_ID) localID: string) {

    this.localID = localID;
    var today = new Date();
    var DATE = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.CurrentDate =   this.datePipe.transform(DATE, 'dd/MM/yyyy');




    /**************INTERVIEW SHEET***************/
    this.interviewFormI = this.fb.group({
      appdate: ['', Validators.required],
      appearence: ['', Validators.required],
      appGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormII = this.fb.group({
      famDate: ['', Validators.required],
      familyback: ['', Validators.required],
      famiGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormIII = this.fb.group({
      workDate: ['', Validators.required],
      workExp: ['', Validators.required],
      workGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormIV = this.fb.group({
      iniDate: ['', Validators.required],
      initialAss: ['', Validators.required],
      iniGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormV = this.fb.group({
      misDate: ['', Validators.required],
      misc: ['', Validators.required],
      misGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormVI = this.fb.group({
      anyDate: ['', Validators.required],
      anyPts: ['', Validators.required],
      anyGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })
    this.interviewFormVII = this.fb.group({
      ihavDate: ['', Validators.required],
      iHaveExp: ['', Validators.required],
      ihavGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })



    /**************INITIAL INTERVIEW***************/

    this.initialInterviewFormI = this.fb.group({
      date: ['', Validators.required],
      initialInterview: ['', Validators.required],
      majCol: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true
    })

    this.initialInterviewFormII = this.fb.group({
      date: ['', Validators.required],
      initialInterview: ['', Validators.required],
      majCol: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true
    })



    /**************BEGINING INTERVIEW***************/

    this.begInterviewFormI = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })

    this.begInterviewFormII = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })

    this.begInterviewFormIII = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })




    /**************MID INTERVIEW***************/

    this.MidInterviewFormI = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })

    this.MidInterviewFormII = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })

    this.MidInterviewFormIII = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      capt: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })




    /**************SPECIAL INTERVIEW***************/

    this.specialInterviewFormI = this.fb.group({
      date: ['', Validators.required],
      specialInterview: ['', Validators.required],
      termId: [1],
      serviceId: [''],
      gcInitialsWithDate: [''],
      status: [1],
      id: [''],
      isViewByGc: true

    })

  }//constructor

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  ngOnInit(): void {
    if (!localStorage.length) {
      this.router.navigate(['/pages'])
    }
    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object

    this.route.params.subscribe((params) => {
      this.type = params.type;

      this.isShowSheet = false;
      this.isInstructions = false;
      this.isInitial = false;
      this.isBegining = false;
      this.isMid = false;
      this.isSpecial = false;


      console.log("this.type==>", this.type);

      if (this.type == "Interview Sheet") {
        this.isShowSheet = true;
        this.getEdossierInterview();

      }
      else if (this.type == "Instructions for Interviews and Counselling") {
        this.isInstructions = true;
      }

      if (this.type == "Initial Interview") {
        this.isInitial = true;
        this.getInitialInterview();

      } if (this.type == "Begining Term Interview") {
        this.isBegining = true;
        this.getBegningInterview();


      } if (this.type == "Mid Term Interview") {
        this.isMid = true;
        this.getMidInterview();


      } if (this.type == "Special Interview") {
        this.isSpecial = true;
        this.getSpecialInterview();

      }
    });
  }


  // ngAfterViewInit() {
  //   this.getEdossierInterview();
  //   this.getInitialInterview();
  //   this.getBegningInterview();
  //   this.getMidInterview();
  //   this.getSpecialInterview();
  // }


  goBack() {
    window.history.back()
  }


  
  /*-------------------------INTERVIEW SHEET GET----------------------*/
  appearence:any;appdate:any;famDate:any;familyback:any;famiGcInitialsWithDate:any;workDate:any;workExp:any;workGcInitialsWithDate:any;iniDate:any;initialAss:any;iniGcInitialsWithDate:any;misDate:any;misc:any;
  misGcInitialsWithDate:any;anyPts:any;anyGcInitialsWithDate:any;anyDate:any;iHaveExp:any;ihavGcInitialsWithDate:any;ihavDate:any;

  getEdossierInterview() {
    this.serviceId = this.cadetDetails.serviceId;
    let name = this.cadetDetails.name;
    var nameArr = name.split(" ");
    var gcInitials = "";
    for(let i=0;i<nameArr.length;i++){
      gcInitials = gcInitials+nameArr[i].charAt(0).toUpperCase();
    }
    this.CurrentDate = gcInitials+"-"+this.CurrentDate;
    console.log('name-->>',name);
    console.log('CurrentDate==>>',this.CurrentDate);
    
    
    this.EDossierService.getInterviewDetails(this.serviceId).subscribe(
      res => {
        if (res && res.object) {
          this.interviewFormI.patchValue({
            appdate: this.datePipe.transform(res.object.appdate, 'yyyy-MM-dd'),
            appearence: res.object.appearence,
            appGcInitialsWithDate: res.object.appGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,            
          })
          this.appdate=this.datePipe.transform(res.object.appdate, 'yyyy-MM-dd');
          this.appearence= res.object.appearence;
          this.appGcInitialsWithDate=res.object.appGcInitialsWithDate;
          
          this.updateInterviewSheet(this.interviewFormI);

          this.interviewFormII.patchValue({
            famDate: this.datePipe.transform(res.object.famDate, 'yyyy-MM-dd'),
            familyback: res.object.familyback,
            famiGcInitialsWithDate: res.object.famiGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.famDate=this.datePipe.transform(res.object.famDate, 'yyyy-MM-dd'),
            this.familyback= res.object.familyback,
            this.famiGcInitialsWithDate= res.object.famiGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormII);

          this.interviewFormIII.patchValue({
            workDate: this.datePipe.transform(res.object.workDate, 'yyyy-MM-dd'),
            workExp: res.object.workExp,
            workGcInitialsWithDate: res.object.workGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.workDate= this.datePipe.transform(res.object.workDate, 'yyyy-MM-dd'),
          this.workExp= res.object.workExp,
          this.workGcInitialsWithDate= res.object.workGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormIII);


          this.interviewFormIV.patchValue({
            iniDate: this.datePipe.transform(res.object.iniDate, 'yyyy-MM-dd'),
            initialAss: res.object.initialAss,
            iniGcInitialsWithDate: res.object.iniGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.iniDate= this.datePipe.transform(res.object.iniDate, 'yyyy-MM-dd'),
          this.initialAss= res.object.initialAss,
          this.iniGcInitialsWithDate= res.object.iniGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormIV);


          this.interviewFormV.patchValue({
            misDate: this.datePipe.transform(res.object.misDate, 'yyyy-MM-dd'),
            misc: res.object.misc,
            misGcInitialsWithDate: res.object.misGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.misDate= this.datePipe.transform(res.object.misDate, 'yyyy-MM-dd'),
          this.misc= res.object.misc,
          this.misGcInitialsWithDate= res.object.misGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormV);


          this.interviewFormVI.patchValue({
            anyDate: this.datePipe.transform(res.object.anyDate, 'yyyy-MM-dd'),
            anyPts: res.object.anyPts,
            anyGcInitialsWithDate: res.object.anyGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.anyDate= this.datePipe.transform(res.object.anyDate, 'yyyy-MM-dd'),
          this.anyPts= res.object.anyPts,
          this.anyGcInitialsWithDate= res.object.anyGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormVI);


          this.interviewFormVII.patchValue({
            ihavDate: this.datePipe.transform(res.object.ihavDate, 'yyyy-MM-dd'),
            iHaveExp: res.object.iHaveExp,
            ihavGcInitialsWithDate: res.object.ihavGcInitialsWithDate,
            id: res.object.id,
            serviceId: res.object.serviceId,
          })
          this.ihavDate= this.datePipe.transform(res.object.ihavDate, 'yyyy-MM-dd'),
          this.iHaveExp= res.object.iHaveExp,
          this.ihavGcInitialsWithDate= res.object.ihavGcInitialsWithDate,
          this.updateInterviewSheet(this.interviewFormVII);

        }
      }
    )
  }


  updateInterviewSheet(form) {
    const formVal = form.value;
    this.serviceId = this.cadetDetails.serviceId;
    

    this.spinner.show();

    this.EDossierService.updateinterviewDetailsGc(formVal).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          // this.getEdossierInterview();
          this.spinner.hide();

          // this.adminservice.openSnackbar(res.message);
          // window.location.reload();

        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }

      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }




  /*-------------------------INITIAL INTERVIEW GET----------------------*/
  date:any;initialInterview:any;majCol:any;gcInitialsWithDate:any;
  getInitialInterview() {
    this.serviceId = this.cadetDetails.serviceId;
    let name = this.cadetDetails.name;
    var nameArr = name.split(" ");
    var gcInitials = "";
    for(let i=0;i<nameArr.length;i++){
      gcInitials = gcInitials+nameArr[i].charAt(0).toUpperCase();
    }
    this.CurrentDate = gcInitials+"-"+this.CurrentDate;
    console.log('name-->>',name);
    console.log('CurrentDate==>>',this.CurrentDate);
    
    this.EDossierService.getInitialInterviewDetails(this.serviceId).subscribe(
      res => {
        if (res && res.object) {
          let Id = res.object.id
          let coyObj = res.object.find(obj => obj.submittedBy == 'COY_CDR');
          let coyData = coyObj;
          let bnObj = res.object.find(obj => obj.submittedBy == 'BN_CDR');
          let bnData = bnObj;

          if (coyData != undefined) {
            this.initialInterviewFormI.patchValue({
              date: this.datePipe.transform(coyData.date, 'yyyy-MM-dd'),
              initialInterview: coyData.initialInterview,
              majCol: coyData.majCol,
              id: coyData.id,
              serviceId: coyData.serviceId,
              gcInitialsWithDate: coyData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(coyData.date, 'yyyy-MM-dd');
            this.initialInterview= coyData.initialInterview;
            this.majCol= coyData.majCol;
            this.gcInitialsWithDate= coyData.gcInitialsWithDate;
            this.updateInitialInterview(this.initialInterviewFormI);
          }
          if (bnData != undefined) {
            this.initialInterviewFormII.patchValue({
              date: this.datePipe.transform(bnData.date, 'yyyy-MM-dd'),
              initialInterview: bnData.initialInterview,
              majCol: bnData.majCol,
              id: bnData.id,
              serviceId: bnData.serviceId,
              gcInitialsWithDate: bnData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(bnData.date, 'yyyy-MM-dd');
            this.initialInterview= bnData.initialInterview;
            this.majCol= bnData.majCol;
            this.gcInitialsWithDate= bnData.gcInitialsWithDate;
            this.updateInitialInterview(this.initialInterviewFormII);
            this.spinner.hide();
          }
        }
      }
    )
  }

  updateInitialInterview(form) {
    const formVal = form.value;
    this.serviceId = this.cadetDetails.serviceId;

    this.EDossierService.updateInitialInterviewDetailsGc(formVal).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.spinner.hide();

          // this.adminservice.openSnackbar(res.message);
          // window.location.reload();

        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }

  /*-------------------------BEGINING INTERVIEW GET----------------------*/
  details:any;capt:any;
  getBegningInterview() {
    this.serviceId = this.cadetDetails.serviceId;
    let name = this.cadetDetails.name;
    var nameArr = name.split(" ");
    var gcInitials = "";
    for(let i=0;i<nameArr.length;i++){
      gcInitials = gcInitials+nameArr[i].charAt(0).toUpperCase();
    }
    this.CurrentDate = gcInitials+"-"+this.CurrentDate;
    console.log('name-->>',name);
    console.log('CurrentDate==>>',this.CurrentDate);

    this.EDossierService.getBegInterviewDetails(this.serviceId).subscribe(
      res => {
        if (res && res.object) {

          let PLObj = res.object.find(obj => obj.submittedBy == 'PL_CDR');
          let PLData = PLObj;
          let coyObj = res.object.find(obj => obj.submittedBy == 'COY_CDR');
          let coyData = coyObj;
          let bnObj = res.object.find(obj => obj.submittedBy == 'BN_CDR');
          let bnData = bnObj;

          if (PLData != undefined) {
            this.begInterviewFormI.patchValue({
              date: this.datePipe.transform(PLData.date, 'yyyy-MM-dd'),
              details: PLData.details,
              capt: PLData.capt,
              id: PLData.id,
              serviceId: PLData.serviceId,
              gcInitialsWithDate: PLData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(PLData.date, 'yyyy-MM-dd');
            this.details= PLData.details;
            this.capt= PLData.capt;
            this.gcInitialsWithDate= PLData.gcInitialsWithDate;

            this.updateBegningInterview(this.begInterviewFormI);

          }
          if (coyData != undefined) {
            this.begInterviewFormII.patchValue({
              date: this.datePipe.transform(coyData.date, 'yyyy-MM-dd'),
              details: coyData.details,
              capt: coyData.capt,
              id: coyData.id,
              serviceId: coyData.serviceId,
              gcInitialsWithDate: coyData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(coyData.date, 'yyyy-MM-dd');
            this.details= coyData.details;
            this.capt= coyData.capt;
            this.gcInitialsWithDate= coyData.gcInitialsWithDate;
            this.updateBegningInterview(this.begInterviewFormII);

          }

          if (bnData != undefined) {
            this.begInterviewFormIII.patchValue({
              date: this.datePipe.transform(bnData.date, 'yyyy-MM-dd'),
              details: bnData.details,
              capt: bnData.capt,
              id: bnData.id,
              serviceId: bnData.serviceId,
              gcInitialsWithDate: bnData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(bnData.date, 'yyyy-MM-dd');
            this.details= bnData.details;
            this.capt= bnData.capt;
            this.gcInitialsWithDate= bnData.gcInitialsWithDate;
            this.updateBegningInterview(this.begInterviewFormIII);

          }
        }
      }
    )
  }

  updateBegningInterview(form) {
    const formVal = form.value;
    this.serviceId = this.cadetDetails.serviceId;
    this.EDossierService.updateBegInterviewDetailsGc(formVal).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.spinner.hide();

          // this.adminservice.openSnackbar(res.message);
          // window.location.reload();

        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }

      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }


  /*------------------------------------MID INTERVIEW GET---------------------------*/
  getMidInterview() {
    this.serviceId = this.cadetDetails.serviceId;
    let name = this.cadetDetails.name;
    var nameArr = name.split(" ");
    var gcInitials = "";
    for(let i=0;i<nameArr.length;i++){
      gcInitials = gcInitials+nameArr[i].charAt(0).toUpperCase();
    }
    this.CurrentDate = gcInitials+"-"+this.CurrentDate;
    console.log('name-->>',name);
    console.log('CurrentDate==>>',this.CurrentDate);

    this.EDossierService.getMidInterviewDetails(this.serviceId).subscribe(
      res => {
        if (res && res.object) {

          let PLObj = res.object.find(obj => obj.submittedBy == 'PL_CDR');
          let PLData = PLObj;
          let coyObj = res.object.find(obj => obj.submittedBy == 'COY_CDR');
          let coyData = coyObj;
          let bnObj = res.object.find(obj => obj.submittedBy == 'BN_CDR');
          let bnData = bnObj;

          if (PLData != undefined) {
            this.MidInterviewFormI.patchValue({
              date: this.datePipe.transform(PLData.date, 'yyyy-MM-dd'),
              details: PLData.details,
              capt: PLData.capt,
              id: PLData.id,
              serviceId: PLData.serviceId,
              gcInitialsWithDate: PLData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(PLData.date, 'yyyy-MM-dd');
            this.details= PLData.details;
            this.capt= PLData.capt;
            this.gcInitialsWithDate= PLData.gcInitialsWithDate;

            this.updateMidInterview(this.MidInterviewFormI);

          }
          if (coyData != undefined) {
            this.MidInterviewFormII.patchValue({
              date: this.datePipe.transform(coyData.date, 'yyyy-MM-dd'),
              details: coyData.details,
              capt: coyData.capt,
              id: coyData.id,
              serviceId: coyData.serviceId,
              gcInitialsWithDate: coyData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(coyData.date, 'yyyy-MM-dd');
            this.details= coyData.details;
            this.capt= coyData.capt;
            this.gcInitialsWithDate= coyData.gcInitialsWithDate;
            this.updateMidInterview(this.MidInterviewFormII);

          }

          if (bnData != undefined) {
            this.MidInterviewFormIII.patchValue({
              date: this.datePipe.transform(bnData.date, 'yyyy-MM-dd'),
              details: bnData.details,
              capt: bnData.capt,
              id: bnData.id,
              serviceId: coyData.serviceId,
              gcInitialsWithDate: coyData.gcInitialsWithDate
            })
            this.date= this.datePipe.transform(bnData.date, 'yyyy-MM-dd');
            this.details= bnData.details;
            this.capt= bnData.capt;
            this.gcInitialsWithDate= bnData.gcInitialsWithDate;
            this.updateMidInterview(this.MidInterviewFormIII);

          }
        }
      }
    )
  }
  updateMidInterview(form) {
    const formVal = form.value;
    this.serviceId = this.cadetDetails.serviceId;
    this.EDossierService.updateMidInterviewDetailsGc(formVal).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.spinner.hide();

          // this.adminservice.openSnackbar(res.message);
          // window.location.reload();

        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }

      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }

  /*-------------------------SPECIAL INTERVIEW GET----------------------*/
  specialInterview:any;
  getSpecialInterview() {
    this.serviceId = this.cadetDetails.serviceId;
    let name = this.cadetDetails.name;
    var nameArr = name.split(" ");
    var gcInitials = "";
    for(let i=0;i<nameArr.length;i++){
      gcInitials = gcInitials+nameArr[i].charAt(0).toUpperCase();
    }
    this.CurrentDate = gcInitials+"-"+this.CurrentDate;
    console.log('name-->>',name);
    console.log('CurrentDate==>>',this.CurrentDate);
    
    this.EDossierService.getSpecialInterviewDetails(this.serviceId).subscribe(
      res => {
        if (res && res.object) {
          this.specialInterviewFormI.patchValue({
            date: this.datePipe.transform(res.object.date, 'yyyy-MM-dd'),
            specialInterview: res.object.specialInterview,
            id: res.object.id,
            serviceId: res.object.serviceId,
            gcInitialsWithDate: res.object.gcInitialsWithDate
          })
          this.date= this.datePipe.transform(res.object.date, 'yyyy-MM-dd');
          this.specialInterview= res.object.specialInterview;
          this.gcInitialsWithDate= res.object.gcInitialsWithDate;

          this.updateSpecialInterview(this.specialInterviewFormI);

        }
      }
    )
  }
  updateSpecialInterview(form) {
    const formVal = form.value;
    this.serviceId = this.cadetDetails.serviceId;
    this.spinner.show();
    this.EDossierService.updateSpecialInterviewDetailsGc(formVal).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.spinner.hide();
          // this.adminservice.openSnackbar(res.message);
          // window.location.reload();

        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }

  //  End
}

