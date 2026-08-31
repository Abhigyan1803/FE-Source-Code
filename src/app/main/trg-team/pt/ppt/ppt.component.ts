import { ChangeDetectorRef, Component, OnInit, ViewChild,  LOCALE_ID, Inject } from '@angular/core';
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
import * as jQuery from 'jquery';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.scss']
})
export class PptComponent implements OnInit {

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild('tableCard', { static: true }) tableCard

  userDetails:any;
  showSpinner: boolean;
  statusMsg: string;

  searchForm = new FormGroup({});
  pptForm = new FormGroup({});

  public attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'PPT';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;

  _2400m_mm: number = 20;
  cup_mm: number = 20;
  toeTouch_mm: number = 20;
  _5mtr_mm: number = 15;
  _100mtr_mm: number = 10;
  sitUp_mm: number = 15;
  _4mtrClimg_mm: number = 10 // for term 3

  totalMM = this._2400m_mm + this.cup_mm + this.toeTouch_mm + this._5mtr_mm + this._100mtr_mm + this.sitUp_mm;

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

        this.term = res.term;
        if (this.term == 'I Term') {
          this.termId = 1;

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Term') {
          this.termId = 2;

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'III Term') {
          this.termId = 3;

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Tech') {
          this.termId = 7;

          this.setAllMaxMarks()
          this.setTotalMarks()

        }


        // this.pptForm = this.fb.group({
        //   cadetRecords: this.fb.array([]),
        // })

        // this.ngAfterViewInit();
        this.companyList = [];
        this.battalion = '';
        this.company = '';
        this.serviceId = '';
        this.battalionId = '';
        this.companyId = '';
        this.getCadetsList()
        this.getFinalSubmissionDates(this.termId)

      }
    )

    this.localID = localID


  }

  ngOnInit(): void {
    this.getBattalionList();
  }


  ngAfterViewInit() {
    // this.getCadetsList(s)
  }

  setAllMaxMarks() {
    if (this.termId == 3) {
      this._2400m_mm = 12;
      this.cup_mm = 12;
      this.toeTouch_mm = 12;
      this._5mtr_mm = 11;
      this._100mtr_mm = 9;
      this.sitUp_mm = 9;
      this._4mtrClimg_mm = 10

    } else {

      this._2400m_mm = 20;
      this.cup_mm = 20;
      this.toeTouch_mm = 20;
      this._5mtr_mm = 15;
      this._100mtr_mm = 10;
      this.sitUp_mm = 15;
    }
  }

  setTotalMarks() {
    if (this.termId != 3) {
      this.totalMM = this._2400m_mm + this.cup_mm + this.toeTouch_mm + this._5mtr_mm + this._100mtr_mm + this.sitUp_mm;
    } else if (this.termId == 3) {
      this.totalMM = this._2400m_mm + this.cup_mm + this.toeTouch_mm + this._5mtr_mm + this._100mtr_mm + this.sitUp_mm + this._4mtrClimg_mm;
    }

  }

  public get getAllCadetRecords(): FormArray {
    return this.pptForm.get('cadetRecords') as FormArray
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

  private getACadetRecord(): FormGroup {
    return this.fb.group({
      id: [''],
      serviceId: [''],
      name: [''],
      battalian: [''],
      company: [''],
      rank: [''],
      termId: [''],
      termName: [''],
      course: [''],
      courseSerNo: [''],
      nationality: [''],
      edossierPtResult: this.fb.group({
        clearedIn: [''],
        edossierPtSubjectResult: this.fb.array([]),
        id: [''],
        obtainedMarks: [''],
        remarks: [''],
        serviceId: [''],
        status: [''],
        subjectType: [''],
        termId: [''],
        totalMarks: [''],
      }),
    })
  }

  addCadetRecord(): void {
    this.getAllCadetRecords.push(this.getACadetRecord())
  }

  getASubject() {
    return this.fb.group({
      attemtType: [''],
      c1ObtainedMarks: [''],
      c2ObtainedMarks: [''],
      clearedIn: [''],
      id: [''],
      m1ObtainedMarks: [''],
      m2ObtainedMarks: [''],
      resultGrade: [''],
      resultSubGrade: [''],
      serviceId: [''],
      status: [''],
      subjectCategory: [''],
      subjectId: [''],
      subjectName: [''],
      subjectType: [''],
      termId: [''],
      totalMarks: [''],
    })
  }
  getAllSubjects(index): FormArray {
    return this.getAllCadetRecords.at(index).get('edossierPtResult').get('edossierPtSubjectResult') as FormArray;
  }

  addSubject(i) {
    this.getAllSubjects(i).push(this.getASubject())
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
                // this.addCadetRecord(); //was using this for formarray

                let _2400m = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName.trim().replace(" ", "") === "2.4KM") {

                      Object.assign(sub, this.getSubjectRecord(sub, this._2400m_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let cup = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "C/UP") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.cup_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let toeTouch = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "TOE TOUCH") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.toeTouch_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }

                  }
                )

                let _5mtr = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "5/MTR") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._5mtr_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let _100mtr = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "100 MTR") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._100mtr_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let sitUp = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "SIT/UP") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.sitUp_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let _4mtrClimg = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "2nd CL Rope (4 Mtr Climb)") {
                      Object.assign(sub, this.getSubjectRecord(sub, this._4mtrClimg_mm));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )

                let subjArr = [_2400m, cup, toeTouch, _5mtr, _100mtr, sitUp];

                if (this.termId == 3) {
                  subjArr.push(_4mtrClimg)
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
                    subjectType: 'PPT',
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
        }




        // this.pptForm.patchValue({
        //   cadetRecords: this.cadetList
        // })     //was using this for formarray


        // console.log('Cadets list: ',this.cadetList);


      },
      error => {
        this.spinner.hide()
        this.sharedService.openSnackbar('Error Occured.')
      }
    )

    console.log(this.cadetList);

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
      subjectType: 'PPT',
      termId: sub.termId,
      totalMarks: maxMarks,
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

        if (this.termId != 3) {

          if (obj.subjectName == '2.4KM' || obj.subjectName == 'C/UP' || obj.subjectName == 'TOE TOUCH') {

            if (value >= 9) {
              if (value == 20) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 19) {
                obj.resultGrade = 'S/EX-2';
              } else if (value >= 17 && value <= 18) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 17 && value >= 15) {
                obj.resultGrade = 'EX';
              } else if (value < 15 && value >= 12) {
                obj.resultGrade = 'GOOD';
              } else if (value < 12 && value >= 9) {
                obj.resultGrade = 'SAT';
              }

              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Fail/NA';
            }


          } else if (obj.subjectName == '5/MTR' || obj.subjectName == 'SIT/UP') {

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
              obj.resultGrade = 'Fail/NA';
            }



          } else if (obj.subjectName == '100 MTR') {

            if (value >= 5) {
              if (value == 10) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 9) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 8) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 7) {
                obj.resultGrade = 'EX';
              } else if (value == 6) {
                obj.resultGrade = 'GOOD';
              } else if (value == 5) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Fail/NA';
            }


          }




        } else if (this.termId == 3) {

          if (obj.subjectName == '2.4KM' || obj.subjectName == 'C/UP' || obj.subjectName == 'TOE TOUCH') {

            if (value >= 4) {

              if (value == 12) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 11) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 10) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 10 && value >= 8) {
                obj.resultGrade = 'EX';
              } else if (value < 8 && value >= 6) {
                obj.resultGrade = 'GOOD';
              } else if (value < 6 && value >= 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;


            } else {
              obj.resultGrade = 'Fail/NA';

            }



          } else if (obj.subjectName == '5/MTR') {

            if (value >= 4) {

              if (value == 11) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 10) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 9) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 8) {
                obj.resultGrade = 'EX';
              } else if (value < 8 && value >= 6) {
                obj.resultGrade = 'GOOD';
              } else if (value < 6 && value >= 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Fail/NA';
            }


          } if (obj.subjectName == 'SIT/UP' || obj.subjectName == '100 MTR') {

            if (value >= 4) {

              if (value == 9) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 8) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 7) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 6) {
                obj.resultGrade = 'EX';
              } else if (value == 5) {
                obj.resultGrade = 'GOOD';
              } else if (value == 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Fail/NA';
            }


          } if (obj.subjectName == '2nd CL Rope (4 Mtr Climb)') {

            if (value == 10) {
                obj.resultGrade = 'Pass';
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Fail/NA';
            }


          }


        }

        this.calculateMarks(i);

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