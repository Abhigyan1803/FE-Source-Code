import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ms-begining-interview',
  templateUrl: './begining-interview.component.html',
  styleUrls: ['./begining-interview.component.scss']
})
export class BeginingInterviewComponent implements OnInit {

  datePipe = new DatePipe('en-IN');
  Id;
  termId;
  interviewFormI: FormGroup = new FormGroup({});
  interviewFormII: FormGroup = new FormGroup({});
  interviewFormIII: FormGroup = new FormGroup({});
  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.interviewFormI= this.fb.group({
        date: ['', Validators.required],
        details: ['', Validators.required],
        capt: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
      isViewByGc: false

      })

      this.interviewFormII= this.fb.group({
        date: ['', Validators.required],
        details: ['', Validators.required],
        capt: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
        isViewByGc: false
      })
  
      this.interviewFormIII= this.fb.group({
        date: ['', Validators.required],
        details: ['', Validators.required],
        capt: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
        isViewByGc: false
      })
  
    }
    
  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("bgcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("bgbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("bgcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("bgcadetName")).value = localStorage.getItem("i");
    // (<HTMLInputElement>document.getElementById("bgtermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("bgtermName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("bgcadetRank")).value = localStorage.getItem("rank");
    // (<HTMLInputElement>document.getElementById("bgcourseNo")).value = localStorage.getItem("courseNo");

  }
  ngAfterViewInit() {
    
    this.getEdossierInterview()
  }
  goBack() {
    window.history.back()
  }



  /*-------------------------GET----------------------*/
  getEdossierInterview(){
    this.EDossierService.getBegInterviewDetails(this.Id).subscribe(
      res => {
        if (res && res.object) {

          let PLObj = res.object.find(obj => obj.submittedBy == 'PL_CDR');
          let PLData = PLObj;
          let coyObj = res.object.find(obj => obj.submittedBy == 'COY_CDR');
        let coyData = coyObj;
        let bnObj = res.object.find(obj => obj.submittedBy == 'BN_CDR');
        let bnData = bnObj;
        //   let PLData = res.object[0];
        // let coyData = res.object[1];
        // let bnData = res.object[2];

        // if(coyData && coyData.submittedBy !='COY_CDR'){
        //   let temp=coyData;
        //   coyData=bnData;
        //   bnData=temp;
        // }
        
      
        if(PLData != undefined){
          this.interviewFormI.patchValue({
            date: this.datePipe.transform(PLData.date, 'yyyy-MM-dd'),
            details: PLData.details,
            capt: PLData.capt,
            id:PLData,
            gcInitialsWithDate:PLData.gcInitialsWithDate
          })
        }
        if(coyData != undefined){
          this.interviewFormII.patchValue({
            date: this.datePipe.transform(coyData.date, 'yyyy-MM-dd'),
            details: coyData.details,
            capt: coyData.capt,
            id:coyData.id,
            gcInitialsWithDate:coyData.gcInitialsWithDate

          })
        }

        if(bnData != undefined){
          this.interviewFormIII.patchValue({
            date: this.datePipe.transform(bnData.date, 'yyyy-MM-dd'),
            details: bnData.details,
            capt: bnData.capt,
            id:bnData.id,
            gcInitialsWithDate:bnData.gcInitialsWithDate

          })
        }
        } 
}
)
}



/*------------------ADD------------------*/
addClubsubmitI(cdrType) {
  let interviewForm;
  if(cdrType == 'PL_CDR'){
    interviewForm=this.interviewFormI.value;
  }else if(cdrType == 'COY_CDR'){
    interviewForm=this.interviewFormII.value;
  }else{
    interviewForm=this.interviewFormIII.value;
  }
  let id = interviewForm.id;
  const validateFormstatus = this.validateForm(interviewForm);
  if (validateFormstatus) {
  if(id == undefined || id == ''){
    this.addInitialsubmitI(interviewForm,cdrType);
  }else{
    this.updateInterview(interviewForm,cdrType);
  }
}
}



validateForm (interviewForm) {
  let flag = true;
  if (!interviewForm.date || interviewForm.date.trim()=='' || !interviewForm.details || interviewForm.details.trim()=='' || !interviewForm.capt || interviewForm.capt.trim()=='') {
    this.adminservice.openSnackbar('Please fill all fields');
    flag = false;
  }
  var currentdateArr = interviewForm.date.split("-");  
let date = new Date();  
var currentdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
// (YYYY, MM, DD) 
var newdate = new Date(currentdateArr[0], currentdateArr[1]-1, currentdateArr[2]);
if (currentdate.getTime() < newdate.getTime()){
this.adminservice.openSnackbar('Please enter valid date');
flag = false;
}
 
  return flag;
}

// addClubsubmitII() {
//   this.updateClubsubmitII(this.interviewFormII.value);
// }
addInitialsubmitI(formVal,cdrType) {
  formVal.details = formVal.details.trim(); 
  formVal.capt = formVal.capt.trim(); 

  if(cdrType == 'PL_CDR'){
    formVal.submittedBy=cdrType;
  }else if(cdrType == 'COY_CDR'){
    formVal.submittedBy=cdrType;
  }else{
    formVal.submittedBy=cdrType;
  }
  
  this.EDossierService.addBegInterviewDetails(formVal).subscribe(
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
updateInterview(formVal,cdrType) {
  formVal.details = formVal.details.trim(); 
  formVal.capt = formVal.capt.trim(); 
  if(cdrType == 'PL_CDR'){
    formVal.submittedBy=cdrType;
  }else if(cdrType == 'COY_CDR'){
    formVal.submittedBy=cdrType;
  }else{
    formVal.submittedBy=cdrType;
  }
  this.EDossierService.updateBegInterviewDetails(formVal).subscribe(
    res => {
      console.log(res);

      if(res.status == 'OK'){
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