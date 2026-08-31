import { ChangeDetectorRef, Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart} from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { DatePipe } from '@angular/common';
import { Location, PopStateEvent } from "@angular/common";

import { formatDate } from '@angular/common';

@Component({
  selector: 'ms-interview-sheet',
  templateUrl: './interview-sheet.component.html',
  styleUrls: ['./interview-sheet.component.scss']
})
export class InterviewSheetComponent implements OnInit {

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



  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private location: Location,private EDossierService: EDossierService, private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route: ActivatedRoute) {


    this.Id = this.route.snapshot.queryParamMap.get('Id');
    this.termId = this.route.snapshot.queryParamMap.get('termId');

    this.interviewFormI = this.fb.group({
      appdate: ['', Validators.required],
      appearence: ['', Validators.required],
      appGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormII = this.fb.group({
      famDate: ['', Validators.required],
      familyback: ['', Validators.required],
      famiGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormIII = this.fb.group({
      workDate: ['', Validators.required],
      workExp: ['', Validators.required],
      workGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormIV = this.fb.group({
      iniDate: ['', Validators.required],
      initialAss: ['', Validators.required],
      iniGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormV = this.fb.group({
      misDate: ['', Validators.required],
      misc: ['', Validators.required],
      misGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormVI = this.fb.group({
      anyDate: ['', Validators.required],
      anyPts: ['', Validators.required],
      anyGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    this.interviewFormVII = this.fb.group({
      ihavDate: ['', Validators.required],
      iHaveExp: ['', Validators.required],
      ihavGcInitialsWithDate: ['', Validators.required],
      termId: [1],
      serviceId: this.Id,
      status: [1],
      id: [''],
      isViewByGc: false
    })
    // this.maxTodayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID);
    // this.minAppdate = formatDate(new Date().setFullYear(this.currentYear - 18), 'yyyy-MM-dd', this.localID);
    // this.maxAppdate = formatDate(new Date().setFullYear(this.currentYear - 28), 'yyyy-MM-dd', this.localID);

  }

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("IcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("IbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("IcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("IcadetName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("ItermName")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("IcadetRank")).value = localStorage.getItem("rank");

}



  ngAfterViewInit() {
    this.getEdossierInterview()
  }


  goBack() {
    window.history.back()
  }
  /*-------------------------GET----------------------*/
  getEdossierInterview() {
    
    this.EDossierService.getInterviewDetails(this.Id).subscribe(
      res => {
        if (res && res.object) {
          this.interviewFormI.patchValue({
            appdate: this.datePipe.transform(res.object.appdate, 'yyyy-MM-dd'),
            appearence: res.object.appearence,
            appGcInitialsWithDate: res.object.appGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormII.patchValue({
            famDate: this.datePipe.transform(res.object.famDate, 'yyyy-MM-dd'),
            familyback: res.object.familyback,
            famiGcInitialsWithDate: res.object.famiGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormIII.patchValue({
            workDate: this.datePipe.transform(res.object.workDate, 'yyyy-MM-dd'),
            workExp: res.object.workExp,
            workGcInitialsWithDate: res.object.workGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormIV.patchValue({
            iniDate: this.datePipe.transform(res.object.iniDate, 'yyyy-MM-dd'),
            initialAss: res.object.initialAss,
            iniGcInitialsWithDate: res.object.iniGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormV.patchValue({
            misDate: this.datePipe.transform(res.object.misDate, 'yyyy-MM-dd'),
            misc: res.object.misc,
            misGcInitialsWithDate: res.object.misGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormVI.patchValue({
            anyDate: this.datePipe.transform(res.object.anyDate, 'yyyy-MM-dd'),
            anyPts: res.object.anyPts,
            anyGcInitialsWithDate: res.object.anyGcInitialsWithDate,
            id: res.object.id,
          })
          this.interviewFormVII.patchValue({
            ihavDate: this.datePipe.transform(res.object.ihavDate, 'yyyy-MM-dd'),
            iHaveExp: res.object.iHaveExp,
            ihavGcInitialsWithDate: res.object.ihavGcInitialsWithDate,
            id: res.object.id,
          })
        }
      }
    )
  }



  addClubsubmitI(Type) {
    console.log("Type==>>", Type);
    let interviewForm;
    let validateFormstatus;
    if (Type == 'appearence') {
      interviewForm = this.interviewFormI.value;
      validateFormstatus = this.validateFormI(interviewForm);
    } else if (Type == 'familyback') {
      interviewForm = this.interviewFormII.value;
      validateFormstatus = this.validateFormII(interviewForm);
    } else if (Type == 'workExp') {
      interviewForm = this.interviewFormIII.value;
      validateFormstatus = this.validateFormIII(interviewForm);
    } else if (Type == 'initialAss') {
      interviewForm = this.interviewFormIV.value;
      validateFormstatus = this.validateFormIV(interviewForm);
    } else if (Type == 'misc') {
      interviewForm = this.interviewFormV.value;
      validateFormstatus = this.validateFormV(interviewForm);
    } else if (Type == 'anyPts') {
      interviewForm = this.interviewFormVI.value;
      validateFormstatus = this.validateFormVI(interviewForm);
    } else if (Type == 'iHaveExp') {
      interviewForm = this.interviewFormVII.value;
      validateFormstatus = this.validateFormVII(interviewForm);
    }

    let id = interviewForm.id;
    //const validateFormstatus = this.validateForm(interviewForm);
    if (validateFormstatus) {
      if (id == undefined || id == '') {
        this.addInterview(interviewForm);
      
      } else {
        this.updateInterview(interviewForm);
      }
    }
  }




  // validateForm(interviewForm) {
  //   let flag = true;
  //   if (!interviewForm.appdate || !interviewForm.appearence || !interviewForm.famDate || !interviewForm.familyback || !interviewForm.workDate || !interviewForm.workExp || !interviewForm.iniDate || !interviewForm.initialAss || !interviewForm.misDate || !interviewForm.misc || !interviewForm.anyDate || !interviewForm.anyPts || !interviewForm.ihavDate || !interviewForm.iHaveExp) {
  //     this.adminservice.openSnackbar('Please fill all fields');
  //     flag = false;
  //   }
  //   return flag;
  // }
  validateFormI(interviewForm) {
    let flag = true;
    if (!interviewForm.appdate || !interviewForm.appearence || interviewForm.appearence.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }

    var currentdateArr = interviewForm.appdate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }


  validateFormII(interviewForm) {
    let flag = true;
    if (!interviewForm.famDate || !interviewForm.familyback || interviewForm.familyback.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.famDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }


  validateFormIII(interviewForm) {
    let flag = true;
    if (!interviewForm.workDate || !interviewForm.workExp || interviewForm.workExp.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.workDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }


  validateFormIV(interviewForm) {
    let flag = true;
    if (!interviewForm.iniDate || !interviewForm.initialAss || interviewForm.initialAss.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.iniDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }


  validateFormV(interviewForm) {
    let flag = true;
    if (!interviewForm.misDate || !interviewForm.misc || interviewForm.misc.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.misDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }

  validateFormVI(interviewForm) {
    let flag = true;
    if (!interviewForm.anyDate || !interviewForm.anyPts || interviewForm.anyPts.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.anyDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }

  validateFormVII(interviewForm) {
    let flag = true;
    if (!interviewForm.ihavDate || !interviewForm.iHaveExp || interviewForm.iHaveExp.trim() == '') {
      this.adminservice.openSnackbar('Please fill all fields');
      flag = false;
    }
    var currentdateArr = interviewForm.ihavDate.split("-");
    let date = new Date();
    var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // (YYYY, MM, DD) 
    var newdate = new Date(currentdateArr[0], currentdateArr[1] - 1, currentdateArr[2]);
    if (currentdate.getTime() < newdate.getTime()) {
      this.adminservice.openSnackbar('Please enter valid date');
      flag = false;
    }
    return flag;
  }



  addInterview(formVal) {

  if(formVal.appearence != undefined){
    formVal.appearence = formVal.appearence.trim();
  }
   
  if(formVal.familyback != undefined){
    formVal.familyback = formVal.familyback.trim(); 

  }
  if(formVal.workExp != undefined){
    formVal.workExp = formVal.workExp.trim(); 

  }
  if(formVal.initialAss != undefined){
    formVal.initialAss = formVal.initialAss.trim(); 

  }
  if(formVal.misc != undefined){
    formVal.misc = formVal.misc.trim(); 

  }
  if(formVal.anyPts != undefined){
    formVal.anyPts = formVal.anyPts.trim(); 

  }
  if(formVal.iHaveExp != undefined){
    formVal.iHaveExp = formVal.iHaveExp.trim(); 
  }
    
    this.spinner.show();
    console.log(formVal);
    this.EDossierService.addInterviewDetails(formVal).subscribe(
      res => {
        
        console.log(res);
      
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)

          window.location.reload();
          this.cdref.detectChanges();
          this.spinner.hide();
          // this.router.navigate(['e-dossior/ed-content/Ed-index/Otherdetails/club']);
        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }




  /*-----------------UPDATE------------------*/
  updateInterview(formVal) {
    if(formVal.appearence != undefined){
      formVal.appearence = formVal.appearence.trim();
    }
     
    if(formVal.familyback != undefined){
      formVal.familyback = formVal.familyback.trim(); 
    }
    if(formVal.workExp != undefined){
      formVal.workExp = formVal.workExp.trim(); 
  
    }
    if(formVal.initialAss != undefined){
      formVal.initialAss = formVal.initialAss.trim(); 
  
    }
    if(formVal.misc != undefined){
      formVal.misc = formVal.misc.trim(); 
  
    }
    if(formVal.anyPts != undefined){
      formVal.anyPts = formVal.anyPts.trim(); 
  
    }
    if(formVal.iHaveExp != undefined){
      formVal.iHaveExp = formVal.iHaveExp.trim(); 
    }
      

    this.spinner.show();

    this.EDossierService.updateinterviewDetails(formVal).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.getEdossierInterview();
          this.spinner.hide();

          this.adminservice.openSnackbar(res.message);
        window.location.reload();

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
}


