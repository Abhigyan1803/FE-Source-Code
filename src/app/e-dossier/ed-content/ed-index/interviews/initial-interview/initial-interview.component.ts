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
  selector: 'ms-initial-interview',
  templateUrl: './initial-interview.component.html',
  styleUrls: ['./initial-interview.component.scss']
})
export class InitialInterviewComponent implements OnInit {

  datePipe = new DatePipe('en-IN');
  Id;
  termId;
  interviewFormI: FormGroup = new FormGroup({});
  interviewFormII: FormGroup = new FormGroup({});
  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.interviewFormI= this.fb.group({
        date: ['', Validators.required],
        initialInterview: ['', Validators.required],
        majCol: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
        isViewByGc: false
      })

      this.interviewFormII= this.fb.group({
        date: ['', Validators.required],
        initialInterview: ['', Validators.required],
        majCol: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
        isViewByGc: false
      })
  
    }
    
  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("IncompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("InbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("IncadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("IncadetName")).value = localStorage.getItem("i");
    // (<HTMLInputElement>document.getElementById("IntermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("IntermName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("IncadetRank")).value = localStorage.getItem("rank");
    console.log(this.maxDate + '--');
  }
  ngAfterViewInit() {
    
    this.getEdossierInterview()
  }
  goBack() {
    window.history.back()
  }



  /*-------------------------GET----------------------*/
  getEdossierInterview(){
    this.EDossierService.getInitialInterviewDetails(this.Id).subscribe(
      res => {
        if (res && res.object) {

        let coyObj = res.object.find(obj => obj.submittedBy == 'COY_CDR');
        let coyData = coyObj;
        let bnObj = res.object.find(obj => obj.submittedBy == 'BN_CDR');
        let bnData = bnObj;

        // if(coyData.submittedBy !='COY_CDR'){
        //   let temp=coyData;
        //   coyData=bnData;
        //   bnData=temp;
        // }
        
        if(coyData != undefined){
          this.interviewFormI.patchValue({
            date: this.datePipe.transform(coyData.date, 'yyyy-MM-dd'),
            initialInterview: coyData.initialInterview,
            majCol: coyData.majCol,
            id:coyData.id,
            gcInitialsWithDate:coyData.gcInitialsWithDate
          })
        }

        if(bnData != undefined){
          this.interviewFormII.patchValue({
            date: this.datePipe.transform(bnData.date, 'yyyy-MM-dd'),
            initialInterview: bnData.initialInterview,
            majCol: bnData.majCol,
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
  console.log(this.interviewFormI.value);
  if(cdrType == 'COY_CDR'){
    interviewForm=this.interviewFormI.value;
  }else{
    interviewForm=this.interviewFormII.value;
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
/////////////////////////////////////////
validateForm (interviewForm) {
  let flag = true;
  if (!interviewForm.date || interviewForm.date.trim()=='' || !interviewForm.majCol || interviewForm.majCol.trim()=='' || !interviewForm.initialInterview || interviewForm.initialInterview.trim()=='') {
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




addInitialsubmitI(formVal,cdrType) {
  formVal.majCol = formVal.majCol.trim(); 
  formVal.initialInterview = formVal.initialInterview.trim(); 
  if(cdrType == 'COY_CDR'){
    formVal.submittedBy=cdrType;
  }else{
    formVal.submittedBy=cdrType;
  }
  this.EDossierService.addInitialInterviewDetails(formVal).subscribe(
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
  formVal.majCol = formVal.majCol.trim(); 
  formVal.initialInterview = formVal.initialInterview.trim(); 
  if(cdrType == 'COY_CDR'){
    formVal.submittedBy=cdrType;
  }else{
    formVal.submittedBy=cdrType;
  }
  console.log(formVal);
  this.EDossierService.updateInitialInterviewDetails(formVal).subscribe(
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