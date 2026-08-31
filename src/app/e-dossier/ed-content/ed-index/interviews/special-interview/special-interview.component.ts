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
  selector: 'ms-special-interview',
  templateUrl: './special-interview.component.html',
  styleUrls: ['./special-interview.component.scss']
})
export class SpecialInterviewComponent implements OnInit {

  datePipe = new DatePipe('en-IN');
  Id;
  termId;
  interviewFormI: FormGroup = new FormGroup({});
  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  // interviewFormII: FormGroup = new FormGroup({});
  // interviewFormIII: FormGroup = new FormGroup({});

  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.interviewFormI= this.fb.group({
        date: ['', Validators.required],
        specialInterview: ['', Validators.required],
        termId:[1],
        serviceId: this.Id,
        gcInitialsWithDate:[''],
        status: [1],
        id:[''],
        isViewByGc: false
      })

      
    }
    
  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("spcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("spbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("spcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("spcadetName")).value = localStorage.getItem("i");
    // (<HTMLInputElement>document.getElementById("sptermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("sptermName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("spcadetRank")).value = localStorage.getItem("rank");
    // (<HTMLInputElement>document.getElementById("IncourseNo")).value = localStorage.getItem("courseNo");

  }



  ngAfterViewInit() {
    this.getEdossierInterview()
  }
  goBack() {
    window.history.back()
  }

  /*-------------------------GET----------------------*/
  getEdossierInterview(){
    this.EDossierService.getSpecialInterviewDetails(this.Id).subscribe(
      res => {
        if (res && res.object) {
          this.interviewFormI.patchValue({
            date: this.datePipe.transform(res.object.date, 'yyyy-MM-dd'),
            specialInterview: res.object.specialInterview,
            id:res.object.id,
            gcInitialsWithDate:res.object.gcInitialsWithDate
          })
      } 
}
)
}


// keyPress(e: any) {
//     if (e.keyCode === 32 && !e.target.value.length) {
//         e.preventDefault();
//     }
    // var inputValue = e.charCode;
    // if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)){
    //     event.preventDefault();
    // }
// }

/*------------------ADD------------------*/
addClubsubmitI() {
let interviewForm= this.interviewFormI.value;
  let id = interviewForm.id;
  const validateFormstatus = this.validateForm(interviewForm);
  if (validateFormstatus) {
  if(id == undefined || id == ''){
    this.addInitialsubmitI(interviewForm);
  }else{
    this.updateInterview(interviewForm);
  }
}
}


validateForm (interviewForm) {
  let flag = true;
  if (!interviewForm.date || interviewForm.date.trim()=='' || !interviewForm.specialInterview || interviewForm.specialInterview.trim()=='') {
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



addInitialsubmitI(formVal) {
  formVal.specialInterview = formVal.specialInterview.trim(); 

  this.spinner.show();

  this.EDossierService.addSpecialInterviewDetails(formVal).subscribe(
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
  formVal.specialInterview = formVal.specialInterview.trim(); 

  this.spinner.show();

  this.EDossierService.updateSpecialInterviewDetails(formVal).subscribe(
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