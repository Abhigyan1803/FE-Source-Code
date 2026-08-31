import { ChangeDetectorRef, Component, OnInit, ViewChild, HostListener, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { AdminService } from 'app/service/admin/admin.service';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-drill-marks',
  templateUrl: './drill-marks.component.html',
  styleUrls: ['./drill-marks.component.scss']
})
export class DrillMarksComponent implements OnInit {
 

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  serviceid: any;
  companyName: any;
  userDetails: any;
  showSpinner: boolean;
  statusMsg: string;
  subjArr;
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

  _static_mov: number = 20;
  _quick_march: number = 40;
  _reporting: number = 15;
  turn_out: number = 10;
  bearing: number = 15;
  mks_for_exellence: number = 10;
  _4mtrClimg_mm: number = 10 // for term 3

  Wpn_Drill: number = 20;
  Reporting_with_Rifle: number = 10;
  Slow_March: number = 25;
  WOC: number = 15;
  Cane_Drill: number = 15;
  Sword_Drill: number = 15;

  resultsLength: number;
  turn_Out: number=25;

  totalMM = this._static_mov + this._quick_march + this._reporting + this.turn_out + this.bearing + this.mks_for_exellence;

  localID;
  finalSubmissionDate: any;
  hasAccess: boolean = true;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: TrgTeamService, private Adjservice: AdjutantService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adminService: AdminService, private sharedService: SharedService,
    private delayDashboardService: DelayDashboardService, @Inject(LOCALE_ID) localID: string
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
          this.battalionId = null;
          this.companyList = [];
          this.companyName = null;
          this.serviceid = null;
          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Term') {
          this.termId = 2;
          this.battalionId = null;
          this.companyList = [];
          this.companyName = null;
          this.serviceid = null;
          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'III Term') {
          this.termId = 3;
          this.battalionId = null;
          this.companyList = [];
          this.companyName = null;
          this.serviceid = null;
          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Tech') {
          this.termId = 7;
          this.battalionId = null;
          this.companyList = [];
          this.companyName = null;
          this.serviceid = null;
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
        // this.getCadetsList()


        if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
          this.getCadetsList();
        }
        this.Adjservice.getBattalionList().subscribe(
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
      this.WOC = 15;
      this.Wpn_Drill = 10;
      this.Cane_Drill = 15;
      this.Sword_Drill = 15;
      this.Slow_March = 20;
      this.turn_out = 15;
      this.bearing = 10;

    }
    if (this.termId == 2) {
      this.Wpn_Drill = 20;
      this.Reporting_with_Rifle = 10;
      this._quick_march = 20;
      this.Slow_March = 15;
      this.turn_Out = 15;
      this.bearing = 10;
    }
    if (this.termId == 7) {
      this._static_mov = 20;
      this._quick_march = 40;
      this._reporting = 10;
      this.turn_out = 15;
      this.bearing = 10;
      this.mks_for_exellence = 5;
    }

    else {

      this._static_mov = 20;
      this._quick_march = 40;
      this._reporting = 10;
      this.turn_out = 15;
      this.bearing = 5;
      this.mks_for_exellence = 10;
    }
  }

  setTotalMarks() {
    if (this.termId != 3) {
      this.totalMM = this._static_mov + this._quick_march + this._reporting + this.turn_out + this.bearing + this.mks_for_exellence;
    } else if (this.termId == 3) {
      this.totalMM = this.WOC + this.Wpn_Drill + this.Cane_Drill + this.Sword_Drill + this.Slow_March + this.turn_out + this.bearing;
    }
    else if (this.termId == 2) {
      this.totalMM = this.Wpn_Drill + this.Reporting_with_Rifle + this._quick_march + this.turn_Out + this.Slow_March + this.bearing;
    }
    else if (this.termId == 7) {
      this.totalMM = this._static_mov + this._quick_march + this._reporting + this.turn_out + this.bearing + this.mks_for_exellence;
    }
  }

  public get getAllCadetRecords(): FormArray {
    return this.pptForm.get('cadetRecords') as FormArray
  }




  battalionName: string = '0';
  battalionSelected(e: any) {

    this.battalionName = e;
    this.companyName = null;

    if (this.battalionName == '0') {
      this.battalionId = null;
      this.companyName = null;
    }
    if (this.battalionName == 'CA') {
      this.battalionId = 1
    }
    else if (this.battalionName == "TH") {
      this.battalionId = 2
    }
    else if (this.battalionName == "MA") {
      this.battalionId = 3
    }
    else if (this.battalionName == "BH") {
      this.battalionId = 4
    }

    this.spinner.show();

    if (this.battalionId != null || this.battalionName != '0') {
      this.Adjservice.getCompanyList(this.battalionId).subscribe(
        res => {
          this.spinner.show();
          console.log(res);
          if (res.status == 'OK') {
            this.companyList = res.object;
            this.cdref.detectChanges();
            this.spinner.hide();
          } else {
            this.spinner.hide()
          }
        },
        err => {
          this.spinner.hide();
        }
      );
    }
    else {
      this.companyList = [];
      this.companyName = null;
    }
    this.companyList = [];
    this.getCadetsList();
  }

  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      console.log(this.companyName, 'e');
      this.getSpecialAllList();
      this.companyName = null;
      this.getCadetsList();
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getCadetsList();
      }
    }
    this.getCadetsList();

  }

  getSpecialAllList() {
    this.Adjservice.getRun_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.cadetList = res.object.drillFilterPayload;
      }
      else {
        this.cadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        // this.Adjservice.openSnackbar("Some Error Occured.");
      }
    )
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
      dRILLResult: this.fb.group({
        clearedIn: [''],
        dRILLSubjectResult: this.fb.array([]),
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
    return this.getAllCadetRecords.at(index).get('dRILLResult').get('dRILLSubjectResult') as FormArray;
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

  pageSize: any = 50;
  currentPage: any = 0;
  getCadetsList() {
    this.showSpinner = true;
    this.statusMsg = '';
    this.cadetList = []

    this.spinner.show();

    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.Adjservice.getDrill_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.Adjservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.cadetList = res.object.drillFilterPayload;
          if (res.object.drillFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.cadetList = res.object.drillFilterPayload;
          }
          else {
            this.cadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.cadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.Adjservice.openSnackbar("Some Error Occured.");
        }

      )
    }

    else {
      this.Adjservice.getDrillAllCadetlist(this.termId, this.currentPage, this.pageSize).subscribe(
        res => {
          console.log(res);


          // let i = 0; //was using this for formarray

          if (res.status == "OK") {
            if (res.object) {

              res.object.drillFilterPayload.forEach(
                el => {
                  // this.addCadetRecord(); //was using this for formarray


                  let static_mov = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName == "Static Mov") {

                        Object.assign(sub, this.getSubjectRecord(sub, this._static_mov));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let quick_march = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Quick March") {
                        Object.assign(sub, this.getSubjectRecord(sub, this._quick_march));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )



                  let rerporting = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Reporting") {
                        Object.assign(sub, this.getSubjectRecord(sub, this._reporting));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let turn_out = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Turn Out") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.turn_out));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let bearing = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Bearing") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.bearing));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let mks_for_excellence = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Mks for Excellence") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.mks_for_exellence));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let Wpn_Drill = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Wpn Drill") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.Wpn_Drill));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let Reporting_with_Rifle = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Reporting with Rifle") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.Reporting_with_Rifle));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let _quick_march = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Quick March") {
                        Object.assign(sub, this.getSubjectRecord(sub, this._quick_march));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  let Slow_March = el.dRILLResult.dRILLSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "Slow March") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.Slow_March));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )

                  // let subjArr = [static_mov, quick_march, rerporting, turn_out, bearing, mks_for_excellence, ];
                  if (this.termId == 1) {
                    this.subjArr = [static_mov, quick_march, rerporting, turn_out, bearing, mks_for_excellence,];
                  }
                  if (this.termId == 7) {
                    this.subjArr = [static_mov, quick_march, rerporting, turn_out, bearing, mks_for_excellence,];
                  }
                  if (this.termId == 2) {
                    this.subjArr = [Wpn_Drill, Reporting_with_Rifle, quick_march, Slow_March, turn_out, bearing,];
                  }
                  // if (this.termId == 3) {
                  //   subjArr.push(_4mtrClimg)
                  // }

                  let ptTotal = 0;
                  this.subjArr.forEach(
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

                    dRILLResult: {
                      clearedIn: el.dRILLResult.clearedIn,
                      dRILLSubjectResult: this.subjArr,
                      id: el.dRILLResult.id,
                      obtainedMarks: ptTotal,
                      remarks: el.dRILLResult.remarks,
                      serviceId: el.dRILLResult.serviceId,
                      status: el.dRILLResult.status,
                      subjectType: 'DRILL MARKS',
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
    }
    console.log(this.cadetList);

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
      subjectType: 'DRILL MARKS',
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

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getCadetsList()
    }

  }

  edSearch(event?: PageEvent) {
    
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.Adjservice.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      this.Adjservice.searchDRILL(this.termId,this.serviceid, this.currentPage, this.pageSize,).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.Adjservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.cadetList = res.object.drillFilterPayload;
          if (res.object.drillFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.cadetList = res.object.drillFilterPayload;
          }
          else {
            this.cadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.cadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.Adjservice.openSnackbar("Some Error Occured.");
        }

      )
    }
  }

  patchNumbers(event, obj, i, j, type) {

    let value = event.target.value;
    if (value > obj.maxMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
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
              obj.resultGrade = 'Failed';
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
              obj.resultGrade = 'Failed';
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
              obj.resultGrade = 'Failed';
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
              obj.resultGrade = 'Failed';

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
              obj.resultGrade = 'Failed';
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
              obj.resultGrade = 'Failed';
            }


          } if (obj.subjectName == '2nd CL Rope (4 Mtr Climb)') {

            if (value == 10) {
              obj.resultGrade = 'Pass';
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed';
            }


          }


        }

        this.calculateMarks(i);

      } else {
        this.cadetList[i].dRILLResult.dRILLSubjectResult[j].resultGrade = '';
        this.calculateMarks(i);
      }

    }
  }

  calculateMarks(i) {
    let ptTotal = 0;
    this.cadetList[i].dRILLResult.dRILLSubjectResult.forEach(el => {
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
    this.cadetList[i].dRILLResult.ptTotalMarks = ptTotal
    this.cadetList[i].dRILLResult.obtainedMarks = ptTotal

  }




  submitResult() {

    console.log(this.cadetList);

    this.spinner.show()
    this.Adjservice.updateDrillCadet(this.cadetList).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
        // console.log(res);
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }




}