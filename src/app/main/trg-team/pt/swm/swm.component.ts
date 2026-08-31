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
  selector: 'ms-swm',
  templateUrl: './swm.component.html',
  styleUrls: ['./swm.component.scss']
})
export class SwmComponent implements OnInit {

  showSpinner: boolean;
  statusMsg: string;

  public attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'SWM';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;

  I_Term_MM = {
    _25Mtr: 15,
    _5MtrJump: 10,
    _50Mtr: 5,
    _100Mtr: 5,
    _150Mtr: 5,
    _6_5MtrJump: 5
  }

  I_Term_PassingMarks = {
    _25Mtr: 6,
    _5MtrJump: 4,
    _50Mtr: 2,
    _100Mtr: 2,
    _150Mtr: 2,
    _6_5MtrJump: 2
  }


  II_Term_MM = {
    _35Mtr: 15,
    _6_5MtrJump: 10,
    _100Mtr: 5,
    _150Mtr: 5,
    _200Mtr: 5,
    _10MtrJump: 5
  }

  II_Term_PassingMarks = {
    _35Mtr: 6,
    _6_5MtrJump: 4,
    _100Mtr: 2,
    _150Mtr: 2,
    _200Mtr: 2,
    _10MtrJump: 2
  }

  III_Term_MM = {
    _50Mtr: 15,
    _10MtrJump: 10,
    _100Mtr: 5,
    _150Mtr: 5,
    _200Mtr: 5,
    _250Mtr: 5
  }

  III_Term_PassingMarks = {
    _50Mtr: 6,
    _10MtrJump: 4,
    _100Mtr: 2,
    _150Mtr: 2,
    _200Mtr: 2,
    _250Mtr: 2
  }

  totalMM = 45;

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

        this.term = res.term;
        if (this.term == 'I Term') {
          this.termId = 1;
        } else if (this.term == 'II Term') {
          this.termId = 2;
        } else if (this.term == 'III Term') {
          this.termId = 3;
        } else if (this.term == 'II Tech') {
          this.termId = 7;
        }

        this.getCadetsList();
      this.getFinalSubmissionDates(this.termId)


      }
    )
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
    this.localID = localID

  }




  ngOnInit(): void {
    this.getBattalionList()
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


  search() {
    if (this.battalion || this.company || this.serviceId) {
      this.getCadetsList()
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.", 7)
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



  getCadetsList() {
    this.showSpinner = true;
    this.statusMsg = '';
    this.cadetList = []
    this.spinner.show();
    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company, this.serviceId).subscribe(
      res => {
        console.log(res);

        // let i = 0; //was using this for formarray
        if (res.status == "OK") {
          if (res.object) {
            res.object.edossierPtResultFilterPayload.forEach(
              el => {
                let subjArr;

                //FOR TERM Ist AND IInd TECH
                if (this.termId == 1 || this.termId == 7) {

                  let _25MtrSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "25 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._25Mtr, this.I_Term_PassingMarks._25Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _5MtrJump = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "5 MTR JUMP") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._5MtrJump, this.I_Term_PassingMarks._5MtrJump));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _50MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "50 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._50Mtr, this.I_Term_PassingMarks._50Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _100MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "100 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._100Mtr, this.I_Term_PassingMarks._100Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _150MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "150 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._150Mtr, this.I_Term_PassingMarks._150Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _6_5MtrsJump = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "6.5 MTR JUMP") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.I_Term_MM._6_5MtrJump, this.I_Term_PassingMarks._6_5MtrJump));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  subjArr = [_25MtrSwm, _5MtrJump, _50MtrsSwm, _100MtrsSwm, _150MtrsSwm, _6_5MtrsJump];
                }

                //FOR TERM - IInd
                if (this.termId == 2) {

                  let _35MtrSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "35 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._35Mtr, this.II_Term_PassingMarks._35Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _6_5MtrJump = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "6.5 MTR JUMP") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._6_5MtrJump, this.II_Term_PassingMarks._6_5MtrJump));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _100MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "100 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._100Mtr, this.II_Term_PassingMarks._100Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )



                  let _150MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "150 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._150Mtr, this.II_Term_PassingMarks._150Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )


                  let _200MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "200 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._200Mtr, this.II_Term_PassingMarks._200Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )



                  let _10MtrsJump = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "10 MTR JUMP") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.II_Term_MM._10MtrJump, this.II_Term_PassingMarks._10MtrJump));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  subjArr = [_35MtrSwm, _6_5MtrJump, _100MtrsSwm, _150MtrsSwm, _200MtrsSwm, _10MtrsJump];
                }


                //FOR TERM IIIrd
                if (this.termId == 3) {

                  let _50MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "50 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._50Mtr, this.III_Term_PassingMarks._50Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )


                  let _10MtrJump = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "10 MTR JUMP") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._10MtrJump, this.III_Term_PassingMarks._10MtrJump));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _100MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "100 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._100Mtr, this.III_Term_PassingMarks._100Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _150MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "150 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._150Mtr, this.III_Term_PassingMarks._150Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )


                  let _200MtrsSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "200 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._200Mtr, this.III_Term_PassingMarks._200Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _250MtrSwm = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName.trim() === "250 MTR SWM") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.III_Term_MM._200Mtr, this.III_Term_PassingMarks._200Mtr));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )




                  subjArr = [_50MtrsSwm, _10MtrJump, _100MtrsSwm, _150MtrsSwm, _200MtrsSwm, _250MtrSwm];
                }





                let ptTotal = 0;
                subjArr.forEach(
                  (el: any) => {
                    // console.log(el);
                    let currentMarks = 0;
                    if (el.lastAttemptType == 'M1') {
                      if (el.m1ObtainedMarks)
                        currentMarks = parseInt(el.m1ObtainedMarks);
                      else
                        currentMarks = 0;

                    } else if (el.lastAttemptType == 'M2') {
                      if (el.m2ObtainedMarks)
                        currentMarks = parseInt(el.m2ObtainedMarks);
                      else
                        currentMarks = 0;

                    } else if (el.lastAttemptType == 'C1') {
                      if (el.c1ObtainedMarks)
                        currentMarks = parseInt(el.c1ObtainedMarks);
                      else
                        currentMarks = 0;

                    } else if (el.lastAttemptType == 'C2') {
                      if (el.c2ObtainedMarks)
                        currentMarks = parseInt(el.c2ObtainedMarks);
                      else
                        currentMarks = 0;

                    } else {
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
                    subjectType: 'SWM',
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
            this.spinner.hide();
            this.showSpinner = false;

          } else {
            this.spinner.hide();
            this.showSpinner = false;
            this.statusMsg = res.message;
            this.sharedService.openSnackbar(res.message);
          }
          this.spinner.hide();

        }


        // this.pptForm.patchValue({
        //   cadetRecords: this.cadetList
        // })     //was using this for formarray


        // console.log('Cadets list: ',this.cadetList);


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
      subjectType: 'SWM',
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
      obj.resultGrade = '';
      if (type == 'M1') {
        obj.m1ObtainedMarks = ''
      } else if (type == 'M2') {
        obj.m2ObtainedMarks = ''
      } else if (type == 'C1') {
        obj.c1ObtainedMarks = ''
      } else if (type == 'C2') {
        obj.c2ObtainedMarks = ''
      }
      event.preventDefault();
      return false;
    } else {

      if (value) {
        // if (type == 'M1') {
        //   obj.m1ObtainedMarks = value;
        // } else if (type == 'M2') {
        //   obj.m2ObtainedMarks = value;
        // } else if (type == 'C1') {
        //   obj.c1ObtainedMarks = value;
        // } else if (type == 'C2') {
        //   obj.c2ObtainedMarks = value;
        // }

        if (value >= obj.passingMarks) {
          obj.resultGrade = 'Pass'
          obj.clearedIn = type;
        } else {
          obj.resultGrade = 'Failed'
        }
        this.calculateMarks(i)
      } else {
        this.cadetList[i].edossierPtResult.edossierPtSubjectResult[j].resultGrade = '';
        this.calculateMarks(i);
      }

    }


  }



  calculateMarks(i) {

    let ptTotal = 0;
    this.cadetList[i].edossierPtResult.edossierPtSubjectResult.forEach(el => {
      let currentMarks = 0;
      if (el.lastAttemptType == 'M1') {
        if (el.m1ObtainedMarks)
          currentMarks = parseInt(el.m1ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'M2') {
        if (el.m2ObtainedMarks)
          currentMarks = parseInt(el.m2ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'C1') {
        if (el.c1ObtainedMarks)
          currentMarks = parseInt(el.c1ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'C2') {
        if (el.c2ObtainedMarks)
          currentMarks = parseInt(el.c2ObtainedMarks);
        else
          currentMarks = 0;

      } else {
        currentMarks = 0;
      }
      ptTotal = ptTotal + currentMarks
    })


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
        console.log(res);
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }

}
