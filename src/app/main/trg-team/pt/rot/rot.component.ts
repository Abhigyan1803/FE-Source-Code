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
import { isThisSecond } from 'date-fns';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-rot',
  templateUrl: './rot.component.html',
  styleUrls: ['./rot.component.scss']
})
export class RotComponent implements OnInit {

  showSpinner:boolean = true;
  statusMsg:string = '';

  public attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'ROT';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;

  maxMarks = 30;
  minMarks = 12;

  
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
      subjectType: 'ROT',
      termId: sub.termId,
      totalMarks: maxMarks
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


  getCadetsList() {
    
    this.showSpinner = true;
    this.statusMsg = ''
    this.cadetList = []
    this.spinner.show();
    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company, this.serviceId).subscribe(
      res => {

        console.log(res);
        if (res.status == 'OK') {
          if (res.object) {
            // let i = 0; //was using this for formarray
            res.object.edossierPtResultFilterPayload.forEach(
              el => {
                // this.addCadetRecord(); //was using this for formarray

                let rot = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "ROT") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )




                let subjArr = [rot];
                let rotTotal = 0;
                subjArr.forEach(el => {
                  let currentMarks;
                  if (el.lastAttemptType == 'M1') {
                    currentMarks = el.m1ObtainedMarks;
                  } else if (el.lastAttemptType == 'M2') {
                    currentMarks = el.m2ObtainedMarks;
                  } else if (el.lastAttemptType == 'C1') {
                    currentMarks = el.c1ObtainedMarks;
                  } else if (el.lastAttemptType == 'C2') {
                    currentMarks = el.c2ObtainedMarks;
                  }
                  rotTotal = currentMarks;
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
                    obtainedMarks: 0,
                    remarks: el.edossierPtResult.remarks,
                    serviceId: el.edossierPtResult.serviceId,
                    status: el.edossierPtResult.status,
                    subjectType: 'ROT',
                    termId: el.edossierPtResult.termId,
                    totalMarks: this.maxMarks,
                    //
                    rotTotal: rotTotal
                  }
                }

                this.cadetList.push(cadetRecord)

                // i++; //was using this for formarray
              }

            )

            // this.pptForm.patchValue({
            //   cadetRecords: this.cadetList
            // })     //was using this for formarray

              this.spinner.hide();
              this.showSpinner = false;
            // console.log('Cadets list: ',this.cadetList);

          } else {
            this.spinner.hide()
            this.showSpinner = false;
            this.statusMsg = res.message
            this.sharedService.openSnackbar(res.message)
          }
        }





      },
      error => {
        this.spinner.hide()
        this.sharedService.openSnackbar('Error Occured.')
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



  patchNumbers(event, obj, i, j, type) {

    let value = event.target.value;
    if (value > obj.totalMarks || value < 0) {
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

        if (value >= 12) {
          if (value == 30) {
            obj.resultGrade = 'S/EX-1';
          } else if (value < 30 && value >= 28) {
            obj.resultGrade = 'S/EX-2';
          } else if (value == 27) {
            obj.resultGrade = 'S/EX-3';
          } else if (value == 26) {
            obj.resultGrade = 'EX-1';
          } else if (value == 25) {
            obj.resultGrade = 'EX-2';
          } else if (value == 24) {
            obj.resultGrade = 'EX-3';
          } else if (value < 24 && value >= 22) {
            obj.resultGrade = 'GD-1';
          } else if (value < 22 && value >= 20) {
            obj.resultGrade = 'GD-2';
          } else if (value < 20 && value >= 18) {
            obj.resultGrade = 'GD-3';
          } else if (value < 18 && value >= 16) {
            obj.resultGrade = 'SAT-1';
          } else if (value < 16 && value >= 14) {
            obj.resultGrade = 'SAT-2';
          } else if (value < 14 && value >= 12) {
            obj.resultGrade = 'SAT-3';
          }

          obj.clearedIn = type;

        } else {
          obj.resultGrade = 'Failed';
        }
        this.cadetList[i].edossierPtResult.rotTotal = value
        
    this.cadetList[i].edossierPtResult.obtainedMarks = value

      } else {
        this.cadetList[i].edossierPtResult.edossierPtSubjectResult[j].resultGrade = '';
        this.cadetList[i].edossierPtResult.rotTotal = value        
        this.cadetList[i].edossierPtResult.obtainedMarks = value
    
      }


    }
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
        console.log(res);
      },
      err=>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }








}
