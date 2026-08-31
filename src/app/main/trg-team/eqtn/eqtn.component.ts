import { ChangeDetectorRef, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge,from } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';
import { filter, find } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ms-eqtn',
  templateUrl: './eqtn.component.html',
  styleUrls: ['./eqtn.component.scss']
})
export class EqtnComponent implements OnInit {
  userId: any = 1;
  finalSubmissionDate: string;
  userDetails: any;
  localID: any;
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  eqtnForm: FormGroup = new FormGroup({});
  pageTitle = "Add Campmark";
  eqtnSubjects: any = [];
  displayStyle: any = "none";
  eqtnList: any = [];
  TOTAL: number = 100;
  id: string = '';
  term: string;
  termId: number;
  pageSize: any = 30;
  currentPage: any = 0;
  battalionList: any = [];
  companyList: any = [];
  battalionId: any;
  resultsLength: number = 0;
  serviceid: any;
  buttonDisabled: boolean = false;

  hasAccess:boolean = true;

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, private delayDashboardService:DelayDashboardService,
    private trg_team_services: TrgTeamService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

      this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    });
    this.route.params.subscribe((params) => {
      this.term = params.term;

      if (this.term == "I Term") {
        this.termId = 1;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.term == "II Term") {
        this.termId = 2;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.term == "III Term") {
        this.termId = 3;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.term == "II Tech") {
        this.termId = 7;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      }
      console.log(this.termid, "termid");
      this.getCadetEqtnByData();
      if (this.resultsLength == 0) {
        this.eqtnList = null;

      }
      if (this.companyName == undefined || this.companyName == null || this.companyName == '' || this.companyName == 0) {
        this.getEqtnAlllist();

      }
      else {
        this.getEqtnAlllist();
      }

      this.getBattalion();


    });
    this.eqtnForm = this.fb.group({
      serviceId: ['', Validators.required],
      termId: [this.termId, Validators.required],
      obtainedMarks: ['', Validators.required],
      totalMarks: ['', Validators.required],
      trgEQTNResult: this.fb.array([]),
    });

    this.getFinalSubmissionDates(this.termId)


  }
  ngOnInit(): void {
  }




  getBattalion() {

    this.trg_team_services.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.message == 'OK') {
          this.battalionList = res.object;
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

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {

      this.getEqtnAlllist();
    }


  }

  edSearch(event?: PageEvent) {
    console.log(this.paginator.pageIndex, "getSports_matrix_list paginator");
    console.log(this.paginator.pageSize, "getSports_matrix_list paginator1");
   
    this.searchEqtnData();
  }

  searchEqtnData() {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.trg_team_services.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      this.battalionId = null; this.companyList = []; this.battalionList = []; this.companyName = null;
      this.getBattalion();
      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show();
            return this.trg_team_services.getEqtn_Search(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)

          }), map(data => {
            // this.getTotalRecords();
            this.resultsLength = data.object.totalRecords;
            return data;
          }),
          catchError(() => {
            console.log('Error here')
            this.spinner.hide()
            return observableOf([]);
            // return null;
          })
        ).subscribe(data => {
          if (data.message == 'OK') {
            this.eqtnList = data.object.eqtnFilterPayload;
            if (data.object.eqtnFilterPayload.length > 0) {
              this.eqtnList = data.object.eqtnFilterPayload;
            }
            else {
              this.eqtnList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.eqtnList = []
          }
          this.spinner.hide()
          // var scrollElem = document.querySelector('#orders');
          // scrollElem.scrollIntoView();
        });
    }




  }

  battalionName: string = '0';
  battalionSelected(e: any) {

    this.battalionName = e;
    this.companyName = null;
    this.serviceid = null;
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
      this.trg_team_services.getCompanyList(this.battalionId).subscribe(
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

    this.getEqtnAlllist();



  }
  // companyid:number; 
  companyName: any;
  companySelected(e: any) {
    this.companyName = e;
    this.serviceid = null;
    if (this.companyName == 0) {
      this.companyName = null;
      this.getEqtnAlllist();  
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getEqtnAlllist();
      }

    }



  }

  // getSpecialAllList() {
  //   this.trg_team_services.getEqtn_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
  //     console.log(res);

  //     if (res.message == 'OK') {
  //       this.resultsLength = res.object.totalRecords;

  //       this.eqtnList = res.object.eqtnFilterPayload;

  //     }
  //     else {
  //       this.eqtnList = []
  //     }
  //     this.spinner.hide()
  //   },
  //     err => {
  //       this.spinner.hide()
  //       this.trg_team_services.openSnackbar("Some Error Occured.");
  //     }

  //   )
  // }

  descLength
  value;
  value1;
  onChangesubmit(value) {
    this.value = value
  }


  getTotal(marks) {
    return marks.reduce((acc, { obtainedMarks }) => acc += +(obtainedMarks || 0), 0);
  }
  servceId: number
  termid: any
  onSubmit() {
    console.log(this.value)

    this.servceId = this.value
    console.log(this.servceId)
    if (this.servceId == undefined) {
      this.trg_team_services.openSnackbar("Please Enter IMA.No")
    }
    else {
      this.trg_team_services.getCampMarks(this.servceId).subscribe(
        res => {
          console.log(res);

          if (res.message == 'OK') {
            this.spinner.hide()
            this.eqtnForm.patchValue({
              serialNo: res.object.serialNo,
              battalian: res.object.battalian,
              company: res.object.company,
              termSession: res.object.termSession,
              year: res.object.year,
              course: res.object.course,
              cadetRank: res.object.cadetRank,
              username: res.object.name,
              term: res.object.term,
              userId: res.object.userId,
            });
            this.userId = res.object.userId,
              this.termid = res.object.term
            this.spinner.hide()
          }
          else if (res.message == 'Record not found') {
            this.trg_team_services.openSnackbar(res.message)
            this.eqtnForm.reset();
            this.spinner.hide()
          }
          err => {
            this.spinner.hide()
            this.trg_team_services.openSnackbar("Some Error Occured.");
          }
        }
      )
    }


  }


  status: any = 1;


  subjectSize;
  getCadetEqtnByData() {
    this.spinner.show();
    this.trg_team_services.getEqtnById(this.termId, this.status).subscribe(res => {
      console.log(res, "========eqtnSubject=========");

      if (res.message == "Record found successfully") {
        this.eqtnSubjects = res.object;
        this.subjectSize = res.object.length;
        console.log(this.subjectSize, "this.subjectSizethis.subjectSize");

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "========eqtnSubject=========");

      }
      else {
        this.spinner.hide()
        this.trg_team_services.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.trg_team_services.openSnackbar("Some Error Occured.");
      }

    )
  }





  totalMarks1
  confirm() {
    this.spinner.show();
    this.eqtnForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.eqtnForm.value, { obtainedMarks: this.obtainedTotalMarks });
    var formdata = this.eqtnList;
    // this.eqtnList[0].trgEQTNResult['userId'] = 1;
    var formdata1 = this.eqtnList;

    console.log(formdata1)

    this.trg_team_services.update_Eqtn(formdata1).subscribe(
      res => {
        if (res.message == "Record updated successfully") {
          this.spinner.hide()
          this.trg_team_services.openSnackbar(res.message);
          window.location.reload();
        }
        else {
          err => {
            this.spinner.hide()
            this.trg_team_services.openSnackbar("Some Error Occured.");
          }

        }
      }
    )

  }


  getEqtnAlllist() {
    // this.spinner.show();
    this.eqtnList = null;
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.trg_team_services.getEqtn_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.trg_team_services.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.resultsLength = res.object.totalRecords;

          this.eqtnList = res.object.eqtnFilterPayload;

        }
        else {
          this.eqtnList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.trg_team_services.openSnackbar("Some Error Occured.");
        }

      )


    }
    else {
      this.trg_team_services.getEqtn_All_List(this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);

        this.resultsLength = res.object.totalRecords;
        if (res.message == "Record not found") {
          this.spinner.hide();
          this.trg_team_services.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.eqtnList = res.object.eqtnFilterPayload;
          if (res.object.eqtnFilterPayload.length > 0) {
            this.eqtnList = res.object.eqtnFilterPayload;
          }
          else {
            this.eqtnList = [];
          }
        }
        this.cdref.detectChanges();
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.trg_team_services.openSnackbar("Some Error Occured.");
        }

      )
    }

  }




  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");

    this.getEqtnAlllist();
  }


  obtainedTotalMarks: any;
  onChange(e: any, value, totalMarks, sub_id, mainIndex, subIndex) {

    if (value > totalMarks || value == NaN) {
      this.trg_team_services.openSnackbar("Obtained marks is greater than total marks");
      e.target.value = null;
      value = '';

    }
    else if (value == "") {
      this.eqtnList[mainIndex].trgEQTNResult.trgEQTNSubResult[subIndex].obtainedMarks = '';
      return false;
    }
    else {
      var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
      if (total) {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
        this.eqtnList[mainIndex].trgEQTNResult.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
      } else {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
        this.eqtnList[mainIndex].trgEQTNResult.obtainedMarks = (value == '' ? 0 : parseInt(value));
      }
      this.eqtnList[mainIndex].trgEQTNResult.trgEQTNSubResult[subIndex].obtainedMarks = value;
    }




    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.eqtnList);
    // this.leaderShipList
  }




  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onFocusEvent(value, mainIndex) {
    if (value == NaN || value == '' || value == undefined) {
      return false;
      value = 0;
    }

    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      var temp = parseInt(total) - parseInt(value);
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + parseInt(value) + "";
      this.eqtnList[mainIndex].trgEQTNResult.obtainedMarks = temp == 0 ? null : temp;
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.eqtnList[mainIndex].trgEQTNResult.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if (this.obtainedTotalMarks == 0) {
        this.obtainedTotalMarks = ''
      }
    }
  }



  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }


  next() {

    this.router.navigate(['/main/trg-team/eqtn1/add-eqtn'], { queryParams: { id: this.value, termid: this.termid } });

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


}
