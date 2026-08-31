import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-training-team',
  templateUrl: './training-team.component.html',
  styleUrls: ['./training-team.component.scss','../common-style/common-style.scss']
})
export class TrainingTeamComponent implements OnInit {

  term:string;
  termId:number;
  staffList:any[];
  localID
  showSpinner:boolean; 
  statusMsg:string;

  constructor( private router:Router, private activatedRoute:ActivatedRoute, private spinner:NgxSpinnerService,
      private delayDashboardService:DelayDashboardService, private sharedService:SharedService, @Inject(LOCALE_ID) localID: string) { 

        this.activatedRoute.params.subscribe(
          params=>{
            // console.log("Params: ",params);
            this.term = params.term;
            if (this.term == 'I Term') {
              this.termId = 1;
            } else if (this.term == 'II Term') {
              this.termId = 2;
            } else if (this.term == 'III Term') {
              this.termId = 3;
            } else if (this.term == 'II Tech') {
              this.termId = 7;
            } else{
              this.sharedService.openErrorSnackbarWithSeconds('Error!',5);
              this.router.navigate(['/main/delay-dashboard/not-found'])
            }
    
            this.getStaffList()

          }
        )
        this.localID = localID

  }

  ngOnInit(): void {
  }
  
  getStaffList(){
    this.staffList = [];
    this.spinner.show();
    this.showSpinner = true;
    this.statusMsg = '';

    this.delayDashboardService.getStaffList(1,this.termId).subscribe(
      res=>{
        // console.log(res);
          if(res.status == "OK"){
            if(res.object){
              
              // this.staffList = res.object;
              res.object.forEach(
                (element)=>{
                  this.staffList.push(
                    Object.assign(element,{dateGiven:element.finalSubmissionDate?true:false})
                  )
                }
              )
              // console.log(this.staffList);
              


              this.spinner.hide();
              this.showSpinner = false;

            } else {
            this.spinner.hide();
            this.showSpinner = false;
            this.statusMsg = res.message;
            this.sharedService.openSnackbar(res.message);
          }
          }
      },
      err=>{
        this.spinner.hide();
        this.showSpinner = false;
        this.statusMsg = "Error";
      }
    )
  }

  getStatus(staff){
    let status:string;
    if(!staff.dateOfSubmission){

      if(staff.finalSubmissionDate){
        let finalDate = formatDate(staff.finalSubmissionDate,'yyyy-MM-dd',this.localID)
        let todayDate = formatDate(new Date(),'yyyy-MM-dd',this.localID)
        if(todayDate > finalDate){
          status = 'Delayed'
        } else if(finalDate > todayDate){
          status = 'In Progress'
        }
      } else {
        status = '-'
      }
    } else {
      status = 'Submitted'
    }
    staff.status = status;
    return status;
  }

  submit(obj){
    // console.log(obj);
    this.spinner.show();
    this.delayDashboardService.setFinalSubmitDate(obj).subscribe(
      res=>{
        // console.log(res);
        if(res.status == "OK"){
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message);
          this.getStaffList();
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message);
        }

      },
      err=>{
        this.spinner.hide();
        this.sharedService.openErrorSnackbarWithSeconds('Error Occured!',3)
      }
    )
  }

  update(obj){
    // console.log(obj);
    this.spinner.show();
    this.delayDashboardService.updateFinalSubmitDate(obj).subscribe(
      res=>{
        // console.log(res);
        if(res.status == "OK"){
          this.spinner.hide();
          this.getStaffList();

          this.sharedService.openSnackbar(res.message);
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message);
        }

      },
      err=>{
        this.spinner.hide();
        this.sharedService.openErrorSnackbarWithSeconds('Error Occured!',3)
      }
    )
  }



}
