
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { merge, from } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';
import { filter, find } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: "ms-sports",
  templateUrl: "./sports.component.html",
  styleUrls: ["./sports.component.scss"],
})

export class SportsComponent implements OnInit {
  // drillMarkForm: FormGroup = new FormGroup({});
  // pageTitle = "Add Campmark";
  // id: string = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  LDMatrixForm: FormGroup = new FormGroup({});
  pageTitle = "Add SPORTS & GAMES";
  id: string = '';
  battalionList: any[] = [];
  companyList: any[] = [];
  sportsSubject: any[] = [];
  attrInput: any = [];
  sportsList;
  resultsLength: number;
  battalionId: any;
  isError: boolean = false;
  totalmarks: number = 0;
  term: string;
  termId: number;
  displayStyle: any = "none";
  serviceid: any;
  pageSize: any = 30;
  currentPage: any = 0;
  type: string;
  termSession: string;
  x: any;
  finalSubmissionDate: any;
  localID: any;
  userDetails: any;
  hasAccess:boolean = true;

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder, private delayDashboardService:DelayDashboardService,
    private router: Router, private academicservice: AcademicDeptService,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    });
    this.route.params.subscribe((params) => {
      this.term = params.term;
      this.type = params.type;

      console.log(this.battalionList)

      if (this.term == "I Term" && this.type == "SPRING TERM") {
        this.termId = 1;
        this.termSession = "Spring";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      } else if (this.term == "II Term" && this.type == "SPRING TERM") {
        this.termId = 2;
        this.termSession = "Spring";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      } else if (this.term == "III Term" && this.type == "SPRING TERM") {
        this.termId = 3;
        this.termSession = "Spring";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      } else if (this.term == "II Tech" && this.type == "SPRING TERM") {
        this.termId = 7;
        this.termSession = "Spring";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      }
      else if (this.term == "I Term" && this.type != "SPRING TERM") {
        this.termId = 1;
        this.termSession = "Autumn";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      }
      else if (this.term == "II Term" && this.type != "SPRING TERM") {
        this.termId = 2;
        this.termSession = "Autumn";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      }
      else if (this.term == "III Term" && this.type != "SPRING TERM") {
        this.termId = 3;
        this.termSession = "Autumn";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      }
      else if (this.term == "II Tech" && this.type != "SPRING TERM") {
        this.termId = 7;;
        this.termSession = "Autumn";
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
        this.getsportsSubjectMatrix();
        this.getSportsAlllist();
        this.getBattalionList();

      }


    });


    this.LDMatrixForm = this.fb.group({
      serviceId: ['', Validators.required],
      termId: [this.termId, Validators.required],
      obtainedMarks: ['', Validators.required],
      totalMarks: ['', Validators.required],
      sportsSubjectResult: this.fb.array([]),
    });

    this.getFinalSubmissionDates(this.termId)
  }
  ngOnInit(): void {


  }

  getBattalionList() {
    // this.battalionList = null;
    console.log(this.battalionList + "[==============================]")
    this.adminservice.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.message == 'OK') {
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
  descLength
  value;
  value1;



  serviceSearch(e: any) {
    this.x = e.target.value;
    this.serviceid = this.x;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {

      this.getSportsAlllist();
    }
  }

  edSearch(event?: PageEvent) {
    console.log(this.paginator.pageIndex, "getSports_matrix_list paginator");
    console.log(this.paginator.pageSize, "getSports_matrix_list paginator1");
    this.searchEqtnData();
  }

  searchEqtnData() {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.academicservice.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      this.battalionId = null; this.companyList = []; this.battalionList = []; this.companyName = null;
      this.getBattalionList();
      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show();
            return this.academicservice.getGames_Sports_search(this.termId, this.termSession, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize);
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
            this.sportsList = data.object.sportsFilterPayload;
            if (data.object.sportsFilterPayload.length > 0) {
              this.sportsList = data.object.sportsFilterPayload;
            }
            else {
              this.sportsList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.sportsList = []
          }
          this.spinner.hide()
          // var scrollElem = document.querySelector('#orders');
          // scrollElem.scrollIntoView();
        });
    }

  }

  battalionName: string;
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

    this.getSportsAlllist();

    this.spinner.show();
    if (this.battalionId != null || this.battalionName != '0') {
      this.adminservice.getCompanyList(this.battalionId).subscribe(
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
    // this.adminservice.getCompanyList(this.battalionId).subscribe(
    //   res => {
    //     this.spinner.show();
    //     console.log(res)
    //     if (res.status == "OK") {
    //       this.companyList = res.object;

    //       this.cdref.detectChanges();
    //       this.spinner.hide();
    //     } else {
    //       this.spinner.hide()
    //     }
    //   },
    //   err => {
    //     this.spinner.hide();
    //   }
    // );


  }
  companyName: any;
  companySelected(e: any) {
    this.companyName = e;
    this.serviceid = null;
    if (this.companyName == 0) {
      this.companyName = null;
      this.getSportsAlllist();

    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getSportsAlllist();
      }
    }

  }






  status = 1;
  subjectSize;
  getsportsSubjectMatrix() {
    this.spinner.show();
    this.academicservice.getGames_Sports(this.termId, this.status, this.termSession).subscribe(res => {
      console.log(res, "========Games_Sports=========");

      if (res.message == "Record found successfully") {
        this.sportsSubject = res.object;
        this.subjectSize = res.object.length;
        console.log(this.subjectSize, "this.subjectSizethis.subjectSize");

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "========Games_Sports=========");

      }
      else {
        this.spinner.hide()
        this.academicservice.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.academicservice.openSnackbar("Some Error Occured.");
      }

    )
  }

  onChangesubmit(value) {
    this.value = value
  }

  servceId: number
  termid




  totalMarks1
  confirm() {
    this.spinner.show();
    this.LDMatrixForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.LDMatrixForm.value, { obtainedMarks: this.obtainedTotalMarks });
    var formdata = this.sportsList;

    console.log(formdata)
    this.academicservice.updateGames_Sports(formdata).subscribe(
      res => {
        if (res.message == "Record updated successfully") {
          this.spinner.hide()
          this.adminservice.openSnackbar("Updated Successfully");
          window.location.reload();
        }
        else {
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }

        }
      }
    )

  }



  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");

    this.getSportsAlllist();
  }


  getTotal(marks) {
    return marks.reduce((acc, { obtainedMarks }) => acc += +(obtainedMarks || 0), 0);
  }

  obtainedTotalMarks: any;
  onChange(e: any, value, totalMarks, sub_id, mainIndex, subIndex) {
    if (value > totalMarks || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      e.target.value = null;
      value = '';
    }
    else if (value == "") {
      this.sportsList[mainIndex].sportsResult.sportsSubResult[subIndex].obtainedMarks = value;
      return false;
    }
    else {
      var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
      if (total) {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
        this.sportsList[mainIndex].sportsResult.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
      } else {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
        this.sportsList[mainIndex].sportsResult.obtainedMarks = (value == '' ? 0 : parseInt(value));
      }
      this.sportsList[mainIndex].sportsResult.sportsSubResult[subIndex].obtainedMarks = value;
    }

    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.sportsList);
    // this.sportsList
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
      this.sportsList[mainIndex].sportsResult.obtainedMarks = temp == 0 ? null : temp;
    }
    else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.sportsList[mainIndex].sportsResult.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
    }
  }

  getSportsAlllist() {
    this.sportsList = null;
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.academicservice.getGames_Sports_listByBCName(this.termId, this.termSession, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        this.resultsLength = res.object.totalRecords;

        if (res.message == "Record not found") {
          // alert("hi")
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }

        if (res.message == 'OK') {
          this.sportsList = res.object.sportsFilterPayload;
          if (res.object.sportsFilterPayload.length > 0) {
            this.sportsList = res.object.sportsFilterPayload;
          }
          else {
            this.sportsList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.sportsList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      );
    }

    else {
      this.spinner.show();
      this.academicservice.getGames_Sports_list(this.termId, this.termSession, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        this.resultsLength = res.object.totalRecords;

        if (res.message == "Record not found") {
          this.spinner.hide();
          this.sportsList = []
          this.adminservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.sportsList = res.object.sportsFilterPayload;
          if (res.object.sportsFilterPayload.length > 0) {
            this.sportsList = res.object.sportsFilterPayload;
          }
          else {
            this.sportsList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.sportsList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      );
    }

  }
  onChange1(e:any,value, mainIndex,) {
    this.sportsList[mainIndex].sportsResult.remarks = value;
    console.log('%%%%remark%%%%%%%', this.sportsList);
    // this.intellectualCadetList
  }



  termSessionSelected(e: any) {

  }
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }











  next() {
    if (this.router.url.includes('main/academic-depart'))
      this.router.navigate(['/main/academic-depart/sports/I-Term/games/add-sports'], { queryParams: { id: this.value, termid: this.termid } });
    if (this.router.url.includes('main/admin/academic-depart'))
      this.router.navigate(['/main/admin/academic-depart/sports/I-Term/games/add-sports'], { queryParams: { id: this.value, termid: this.termid } });

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

