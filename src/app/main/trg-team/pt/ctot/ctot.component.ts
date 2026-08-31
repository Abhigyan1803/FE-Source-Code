import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { from } from 'rxjs';
import { filter, find } from 'rxjs/operators';

import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router'

import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { AdminService } from 'app/service/admin/admin.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-ctot',
  templateUrl: './ctot.component.html',
  styleUrls: ['./ctot.component.scss']
})
export class CtotComponent implements OnInit {

  showSpinner: boolean;
  statusMsg: string;

  public attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'CTOT';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;

  maxMarks = 5;
  passingMarks = 2;
  totalMM = 30;

  userDetails:any;
  localID;
  finalSubmissionDate:any;
  hasAccess:boolean = true;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adminService: AdminService, private sharedService: SharedService,
    private delayDashboardService:DelayDashboardService,  @Inject(LOCALE_ID) localID: string
    ) {
      this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

    this.route.params.subscribe(
      res => {
        this.companyList = [];
        this.battalion = '';
        this.company = '';
        this.serviceId = '';
        this.battalionId = '';
        this.companyId = '';

        this.term = res.term

       if (this.term == 'II Term') {
          this.termId = 2;
        this.getCadetsList();
        this.getFinalSubmissionDates(this.termId)
        } else {
          this.router.navigate(['/main/trg-team/dashboard'])
        }


      }
    )
    this.localID = localID


  }


  ngOnInit(): void {
    this.getBattalionList();
  }

  
  getBattalionList() {
    this.sharedService.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.battalionList = res.object
          this.cdref.detectChanges();
          this.spinner.hide()
        } else {
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      }
    )
  }

  battalionSelected(e: any) {

    this.battalionList.find(
      (el: any) => {
        if (el.id == e) {
          this.battalion = el.shortName;

        }
      }
    )
    // this.battalion = battalion.shortName;


    // console.log(this.battalion);

    this.spinner.show();
    this.adminService.getCompanyList(e).subscribe(
      res => {
        console.log(res)
        if (res.status == 'OK') {
          this.companyList = res.object;
          this.cdref.detectChanges();
          this.spinner.hide();

        } else {
          this.sharedService.openSnackbar(res.message)
          this.spinner.hide();
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }

  companySelected(e: any) {
    this.companyList.find(
      (el: any) => {
        if (el.id == e) {
          this.company = el.name
          // return;
        }
      }
    )
    console.log(this.company);

  }

  search(){
    if (this.battalion || this.company || this.serviceId) {
      this.getCadetsList()
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.",7)
    }
  }

  clearSearch() {
    if (this.battalion || this.company || this.serviceId) {
      this.companyList = [];
      this.battalion = '';
      this.company = '';
      this.serviceId = '';
      this.battalionId = '';
      this.companyId = '';
      this.getCadetsList();
    }
  }
  getCadetsList() {
    this.showSpinner = true;
    this.statusMsg = '';
    this.cadetList = []
    this.spinner.show();
  
    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company, this.serviceId).subscribe(
      res => {
        console.log(res);

        if(res.status == "OK"){
          if(res.object){
            res.object.edossierPtResultFilterPayload.forEach(
              el => {
                let subjArr;
    
    
                  let handsNfootBridge = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "HAND & FOOT BRIDGE") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  let highLadder = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "HIGH LADDER") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  
                  let circus = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "CIRCUS") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
                                
                  let tarzanHandwalk = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "TARZAN HANDWALK") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
                     
                  let scrambleNet = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "SCRAMBLE NET") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                      
                  let imaLadder = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "IMA LADDER") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks, this.passingMarks));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  subjArr = [handsNfootBridge, highLadder, circus, tarzanHandwalk, scrambleNet, imaLadder];
                
                let ptTotal = 0;
                subjArr.forEach(
                  (el:any) => {
                  // console.log(el);
                  let currentMarks=0;
                  if (el.lastAttemptType == 'M1') {
                    if(el.m1ObtainedMarks)
                    currentMarks = parseInt(el.m1ObtainedMarks);
                    else 
                    currentMarks = 0;
            
                  } else if (el.lastAttemptType == 'M2') {
                    if(el.m2ObtainedMarks)
                    currentMarks = parseInt(el.m2ObtainedMarks);
                    else 
                    currentMarks = 0;
            
                  } else if (el.lastAttemptType == 'C1') {
                    if(el.c1ObtainedMarks)
                    currentMarks = parseInt(el.c1ObtainedMarks);
                    else 
                    currentMarks=0;
            
                  } else if (el.lastAttemptType == 'C2') {
                    if(el.c2ObtainedMarks)
                    currentMarks = parseInt(el.c2ObtainedMarks);
                    else 
                    currentMarks = 0;
            
                  }  else {
                    currentMarks = 0;
                  }
    
                  ptTotal = ptTotal + currentMarks;
    
                })
    
    
                // subjArr.forEach(
                //   el => {
                //     this.addSubject(i)
                //   }
                // )   //was using this for formarray
    
                let cadetRecord = {
                  id: el.id,
                  serviceId: el.serviceId,
                  name: el.name,
                  battalian: el.battalian,
                  company: el.company,
                  rank: el.rank,
                  termId: el.termId,
                  termName: el.termName,
                  course: el.course,
                  courseSerNo: el.courseSerNo,
                  nationality: el.nationality,
    
                  edossierPtResult: {
                    clearedIn: el.edossierPtResult.clearedIn,
                    edossierPtSubjectResult: subjArr,
                    id: el.edossierPtResult.id,
                    obtainedMarks: ptTotal,
                    remarks: el.edossierPtResult.remarks,
                    serviceId: el.edossierPtResult.serviceId,
                    status: el.edossierPtResult.status,
                    subjectType: 'CTOT',
                    termId: this.termId,
                    totalMarks: this.totalMM,
                    //
                    ptTotalMarks: ptTotal
                  }
                }
    
                
                this.cadetList.push(cadetRecord)
    
    
                // i++; //was using this for formarray
              }
    
            )
            this.spinner.hide()
            this.showSpinner = false;

          } else {
            this.spinner.hide()
            this.showSpinner = false;
            this.sharedService.openSnackbar(res.message)
            this.statusMsg = res.message
          }
        }
     
      },
      error => {
        this.spinner.hide()
        this.sharedService.openSnackbar('No Records Available.')
      }
    )

  
  }

  getFinalSubmissionDates(termId){
    this.delayDashboardService.getStaffList(1,termId).subscribe(
      res=>{
          console.log(res);
             const source = from(res.object);
    const findOfficer = source.pipe(find((obj: any) => obj.loginId === parseInt(this.userDetails.loginId)));
    const subscribeOfficerRecord = findOfficer.subscribe(
      val => {
        if (val) {
          console.log("USER RESPONSE: ",val);
          if(val.finalSubmissionDate){
            this.finalSubmissionDate = formatDate(val.finalSubmissionDate,'yyyy-MM-dd',this.localID)
            let todayDate = formatDate(new Date(),'yyyy-MM-dd',this.localID)
            if(todayDate > this.finalSubmissionDate){
              this.hasAccess = false;
            } else {
              this.hasAccess = true;
            }
            // console.log("Date is setted and Access: ",this.hasAccess);
          } else {
            this.hasAccess = true;
            // console.log("Date is not set and has Access: ",this.hasAccess);
            }
        }
      }
    );
      }
    )
  }


  
  getSubjectRecord(sub, maxMarks, passingMarks) {
    let subject = {
      c1ObtainedMarks: sub.c1ObtainedMarks,
      c2ObtainedMarks: sub.c2ObtainedMarks,
      clearedIn: sub.clearedIn,
      id: sub.id,
      lastAttemptType: sub.lastAttemptType,
      m1ObtainedMarks: sub.m1ObtainedMarks,
      m2ObtainedMarks: sub.m2ObtainedMarks,
      maxMarks: maxMarks,
      resultGrade: sub.resultGrade,
      resultSubGrade: sub.resultSubGrade,
      serviceId: sub.serviceId,
      status: sub.status,
      subjectCategory: sub.subjectCategory,
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      subjectType: 'CTOT',
      termId: sub.termId,
      totalMarks: maxMarks,
      passingMarks: passingMarks
    }

    return subject;
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  

  patchNumbers(event, obj, i, j, type) {

    let value = event.target.value;
    if (value > obj.maxMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
      obj.resultGrade = '';

      if(type == 'M1'){
        obj.m1ObtainedMarks = ''
      } else if(type == 'M2'){
        obj.m2ObtainedMarks = ''
      } else if(type == 'C1'){
        obj.c1ObtainedMarks = ''
      } else if(type == 'C2'){
        obj.c2ObtainedMarks = ''
      }

      event.preventDefault();
      return false;
    } else {

      if (value) {
        // if(type == 'M1'){
        //   obj.m1ObtainedMarks = value;
        // } else if(type == 'M2'){
        //    obj.m2ObtainedMarks = value;
        // } else if(type == 'C1'){
        //   obj.c1ObtainedMarks = value;
        // } else if(type == 'C2'){
        //   obj.c2ObtainedMarks = value;
        // }

        if(value >= obj.passingMarks){
          obj.resultGrade = 'Pass'
          obj.clearedIn = type;
        } else {
          obj.resultGrade = 'Failed'
        }
        this.calculateMarks(i);

      }else {
        this.cadetList[i].edossierPtResult.edossierPtSubjectResult[j].resultGrade = '';
        this.calculateMarks(i);
      }

    }
  
  
  }


  calculateMarks(i){
    let ptTotal = 0;
    this.cadetList[i].edossierPtResult.edossierPtSubjectResult.forEach(el=>{
        let currentMarks=0;
      if (el.lastAttemptType == 'M1') {
        if(el.m1ObtainedMarks)
        currentMarks = parseInt(el.m1ObtainedMarks);
        else 
        currentMarks = 0;

      } else if (el.lastAttemptType == 'M2') {
        if(el.m2ObtainedMarks)
        currentMarks = parseInt(el.m2ObtainedMarks);
        else 
        currentMarks = 0;

      } else if (el.lastAttemptType == 'C1') {
        if(el.c1ObtainedMarks)
        currentMarks = parseInt(el.c1ObtainedMarks);
        else 
        currentMarks=0;

      } else if (el.lastAttemptType == 'C2') {
        if(el.c2ObtainedMarks)
        currentMarks = parseInt(el.c2ObtainedMarks);
        else 
        currentMarks = 0;

      }  else {
        currentMarks = 0;
      }
      ptTotal = ptTotal + currentMarks
      })
      // return ptTotal;
      this.cadetList[i].edossierPtResult.ptTotalMarks = ptTotal
      this.cadetList[i].edossierPtResult.obtainedMarks = ptTotal

  }




  submitResult() {

    console.log(this.cadetList);

    this.spinner.show()
    this.service.savePTResults(this.cadetList).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
        // console.log(res);
      },
      err=>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }




}
