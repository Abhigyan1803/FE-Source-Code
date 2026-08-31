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
  selector: 'ms-bpet',
  templateUrl: './bpet.component.html',
  styleUrls: ['./bpet.component.scss']
})
export class BpetComponent implements OnInit {

  showSpinner:boolean = true;
  statusMsg:string = '';
  public attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'BPET';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';


  cadetList: any[] = [];
  dataSource: any;

  _5km_mm: number = 25;
  _60mtr_mm: number = 15;
  _4mtrClimb_mm: number = 15;
  _9mtr_mm: number = 10;
  _9inchDitches_mm: number = 10;

  totalMM:number = 75;

  userDetails:any;
  localID;
  finalSubmissionDate:any;
  hasAccess:boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adminService: AdminService, private sharedService: SharedService,
    private delayDashboardService:DelayDashboardService,  @Inject(LOCALE_ID) localID: string
    ) {

    this.route.params.subscribe(
      res => {
        this.companyList = [];
        this.battalion = '';
        this.company = '';
        this.serviceId = '';
        this.battalionId = '';
        this.companyId = '';
        
        this.term = res.term

        if (this.term == 'III Term') {
          this.termId = 3;
          this.getCadetsList();
      this.getFinalSubmissionDates(this.termId)

        } else {
          this.router.navigate(['/main/trg-team/dashboard'])
        }


      }
    )
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
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
    this.companyList = [];
    this.company = '';
    
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
      this.company = '';
      this.battalion = '';
      this.serviceId = '';
      this.battalionId = '';
      this.companyId = '';
      this.getCadetsList();
    }
  }



  getSubjectRecord(sub, maxMarks) {
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
      subjectType: 'BPET',
      termId: sub.termId,
      totalMarks: maxMarks
    }

    return subject;
  }


  getCadetsList() {
    this.showSpinner = true;
    this.statusMsg = '';
    this.cadetList = []

    this.spinner.show();

    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company, this.serviceId).subscribe(
      res => {
        console.log(res);

        // let i = 0; //was using this for formarray
        if(res.status == "OK"){
          if(res.object){

            res.object.edossierPtResultFilterPayload.forEach(
              el => {
                let subjArr;
    
    
                let _5km = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim() === "5 KM") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._5km_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                let _60mtr = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim() === "60 MTR") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._60mtr_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                let _4mtrClimb = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim() === "V/ROPE 4 MTR CLIMB") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._4mtrClimb_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                let _9mtr = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim() === "H/ROPE 9 MTR") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._9mtr_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                let _9inchDitches = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim() === "9' DITCH") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._9inchDitches_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
    
    
    
    
                subjArr = [_5km, _60mtr, _4mtrClimb, _9mtr, _9inchDitches];
    
    
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
                    subjectType: 'BPET',
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

        // this.pptForm.patchValue({
        //   cadetRecords: this.cadetList
        // })     //was using this for formarray


        // console.log('Cadets list: ',this.cadetList);


      },
      error => {
        this.spinner.hide()
        this.showSpinner = false;

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

        if (obj.subjectName == '5 KM') {

          if (value >= 10) {

            if (value == 25) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 24) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 23) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 22) {
              obj.resultGrade = 'EX-1';
            } else if (value == 21) {
              obj.resultGrade = 'EX-2';
            } else if (value == 20) {
              obj.resultGrade = 'EX-3';
            } else if (value == 19) {
              obj.resultGrade = 'GOOD-1';
            } else if (value < 19 && value >= 17) {
              obj.resultGrade = 'GOOD-2';
            } else if (value < 17 && value >= 15) {
              obj.resultGrade = 'GOOD-3';
            } else if (value == 14) {
              obj.resultGrade = 'SAT-1';
            } else if (value < 14 && value >= 12) {
              obj.resultGrade = 'SAT-2';
            } else if (value < 12 && value >= 10) {
              obj.resultGrade = 'SAT-3';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == '60 MTR') {

          if (value >= 6) {

            if (value == 15) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 14) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 13) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 12) {
              obj.resultGrade = 'EX';
            } else if (value < 12 && value >= 9) {
              obj.resultGrade = 'GOOD';
            } else if (value < 9 && value >= 6) {
              obj.resultGrade = 'SAT';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == "V/ROPE 4 MTR CLIMB") {

          if (value >= 12) {

            if (value == 15) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 14) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 13) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 12) {
              obj.resultGrade = 'PASS';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == 'H/ROPE 9 MTR') {

          if (value >= 6) {

            if (value == 10) {
              obj.resultGrade = 'EX';
            } else if (value < 10 && value >= 8) {
              obj.resultGrade = 'GOOD';
            } else if (value < 8 && value >= 6) {
              obj.resultGrade = 'SAT';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == "9' DITCH") {

          if (value == 10) {
            obj.resultGrade = 'PASS';
            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }
        }

        this.calculateMarks(i)
      } else {
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
