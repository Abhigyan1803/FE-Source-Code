import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { from } from 'rxjs';
import { filter, find } from 'rxjs/operators';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';
@Component({
  selector: 'ms-mid-term',
  templateUrl: './mid-term.component.html',
  styleUrls: ['./mid-term.component.scss']
})
export class MidTermComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize: any = 30;
  remark:any;
  currentPage: any = 0;
  runbackForm: FormGroup = new FormGroup({});
  id: string = '';
  type: string;
  resultsLength: number;
  termId: number;
  runBackCadetList;
  companyName: string;
  battalionId: any;
  displayStyle: any = "none";
  resultType = 'BMT1';
  subjectTYPE = 'Mid-term';
  serviceId: any;
  companyList: any[] = [];
  battleid: any;
  battalionList: any[] = [];
  txt_ima: any = '';
  noRecord: 'No Record Found';

  userDetails: any;
  localID;
  finalSubmissionDate: any;
  hasAccess: boolean = true;
  Grade: any;
  newNumber: number;

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private delayDashboardService: DelayDashboardService, @Inject(LOCALE_ID) localID: string,
    private activeRoute: ActivatedRoute, private TrgTeamService: TrgTeamService) {
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
    this.localID = localID

    this.route.params.subscribe(
      (params) => {
        this.type = params.term;
        //  alert(this.type)
        if (this.type == "I Term") {
          this.termId = 1;
          this.battalionId = null;
          this.companyList = [];
          this.txt_ima = null;

        } else if (this.type == "II Term") {
          this.termId = 2;
          this.battalionId = null;
          this.companyList = [];
          this.txt_ima = null;

        } else if (this.type == "II Tech") {
          this.termId = 7;
          this.battalionId = null;
          this.companyList = [];
          this.txt_ima = null;

        } else if (this.type == "III Term") {
          this.termId = 3;
          this.battalionId = null;
          this.companyList = [];
          this.txt_ima = null;

        }

        console.log(this.type, "type route");
      //  this.getbmt1AllCadetlist();
        if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
          this.getbmt1AllCadetlist();
        }
        this.adminservice.getBattalionList().subscribe(
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
   // this.getFinalSubmissionDates(this.termId)

      }
    )


    // this.runbackForm = this.fb.group({
    //   serialNo: ['', Validators.required],
    //   battalian: ['', Validators.required],
    //   company: ['', Validators.required],
    //   termSession: ['', Validators.required],
    //   year: ['', Validators.required],
    //   course: ['', Validators.required],
    //   // cadetRank: ['', Validators.required],
    //   username: ['', Validators.required],
    //   term: ['', Validators.required],
    // })
  }

  ngOnInit(): void {
  }

  clearSearch(e) {
    if (this.battalionId || this.companyName || this.serviceId) {
      this.TrgTeamService.openSnackbar("Data cleared, please wait")
      this.txt_ima = '';
      this.serviceId = '';
      e.preventDefault();
      this.companyList = [];
      this.battalionList = [];
      this.battalionId = '';
      this.companyName = '';
      this.battalionName = '';
      this.getbmt1AllCadetlist();

      this.adminservice.getBattalionList().subscribe(
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
  }



  // clearSearch() {
  //   if (this.battalionList.length || this.companyList.length || this.serviceId) {
  //     this.companyList = [];
  //     this.battalionList = [];
  //     this.battalionId = '';
  //     this.companyName = '';
  //     this.serviceId = '';
  //     this.battalionName = '';
  //     this.getbmt1AllCadetlist();
  //     this.adminservice.getBattalionList().subscribe(
  //       res => {
  //         this.spinner.show();
  //         if (res.status == 'OK') {
  //           this.battalionList = res.object
  //           this.cdref.detectChanges();
  //           this.spinner.hide()
  //         } else {
  //           this.spinner.hide();
  //         }
  //       }, err => {
  //         this.spinner.hide();
  //       }
  //     )
  //   }
  // }




  getFinalSubmissionDates(termId) {
    this.finalSubmissionDate = ''
    this.delayDashboardService.getStaffList(1, termId).subscribe(
      res => {
        // console.log(res);
        const source = from(res.object);
        const findOfficer = source.pipe(find((obj: any) => obj.loginId === parseInt(this.userDetails.loginId)));
        const subscribeOfficerRecord = findOfficer.subscribe(
          val => {
            if (val) {
              // console.log("USER RESPONSE: ", val);
              if (val.finalSubmissionDate) {
                this.finalSubmissionDate = formatDate(val.finalSubmissionDate, 'yyyy-MM-dd', this.localID)
                let todayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID)
                if (todayDate > this.finalSubmissionDate) {
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

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");
    alert('data is lost if you not save');

    this.getbmt1AllCadetlist();
  }

  keyPress(event: any) {
    let value = event.target.value;
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (value > 100 || value == NaN) {
      this.TrgTeamService.openSnackbar("Please Enter Correct Marks, Obtained marks is greater than total marks");
      event.target.value = '';
    }
  }



  battalionName: string;
  battalionSelected(e: any) {

    this.battalionName = e
    if (this.battalionName == '0') {
      this.battalionId = null;
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
    this.getbmt1AllCadetlist();

    if (this.battalionId != null || this.battalionName != '0') {
      this.adminservice.getCompanyList(this.battalionId).subscribe(
        res => {
          this.spinner.show();
          console.log(res)
          if (res.status == 'OK') {
            this.companyList = res.object
            this.cdref.detectChanges();
            this.spinner.hide();
          } else {
            this.spinner.hide()
          }
        },
        err => {
          this.spinner.hide();
        }
      )
    }
  }
  companySelected(e: any) {
    this.companyName = e;
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.getbmt1AllCadetlist()
    }
  }





  descLength
  value;
  value1;
  onChangesubmit(value) {
    this.value = value
  }

  getbmt1AllCadetlist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.TrgTeamService.getBmt1MidDetailsByBCName(this.resultType, this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.TrgTeamService.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.runBackCadetList = res.object.bmtFilterPayload;
          if (res.object.bmtFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.runBackCadetList = res.object.bmtFilterPayload;
          }
          else {
            this.runBackCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.runBackCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      )
    }
    else {
      this.TrgTeamService.getBmt1MidDetails(this.resultType, this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        this.resultsLength = res.object.totalRecords;
        if (res.status == 'OK') {
          this.runBackCadetList = res.object.bmtFilterPayload;
          if (res.object.bmtFilterPayload.length > 0) {
            this.runBackCadetList = res.object.bmtFilterPayload;
          }
          else {
            this.runBackCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.runBackCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.TrgTeamService.openSnackbar("Some Error Occured.");
        }

      )
    }

  }



  obtainedTotalMarks: number = 0;
  onChange(e: any, value, mainIndex,) {
    if (value > 100 || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;

    }
  
    this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.obtainedMarks = value;
    if(this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.obtainedMarks<40 && this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.obtainedMarks>=0){
      this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.remarks="Fail";
      console.log(this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.remarks,"Fail");
    }else{
      this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.remarks="Pass";
      console.log(this.runBackCadetList[mainIndex].gSO2ServiceSubjectBMTResult.remarks,"pass");
    }
    
    // this.intellectualCadetList
  }


  confirm() {
    this.spinner.show();

    var formdata = this.runBackCadetList

    console.log(formdata)
    this.TrgTeamService.updateBmt1Details(formdata).subscribe(
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

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  serviceSearch() {
    this.serviceId = this.txt_ima;

    if (this.serviceId == null || this.serviceId == undefined || this.serviceId == '') {
      this.getbmt1AllCadetlist()
    }
  }

  edSearch(event?: PageEvent) {
    console.log(this.paginator.pageIndex, "getLeadership_matrix_list paginator");
    console.log(this.paginator.pageSize, "getLeadership_matrix_list paginator1");
    if (this.serviceId == null || this.serviceId == undefined || this.serviceId == '') {
      this.TrgTeamService.openSnackbar("Search Bar is Empty. Please fill the details");

    } else {

      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show()
            return this.TrgTeamService.getBmt1search(this.termId, this.serviceId, this.paginator.pageIndex, this.paginator.pageSize)
          }), map(data => {
            if (data.message == 'Record not found') {
              this.spinner.hide();
              this.TrgTeamService.openSnackbar(data.message);
              // alert(data.message);
              // this.resultsLength ='';
              this.resultsLength = 0;
              return false;
            }
            //this.resultsLength = data.object;
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
          if (data.status == 'OK') {
            this.runBackCadetList = data.object.bmtFilterPayload;
            if (data.object.bmtFilterPayload.length > 0) {
              this.runBackCadetList = data.object.bmtFilterPayload;
            }
            else {
              this.runBackCadetList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.runBackCadetList = []
          }
          this.spinner.hide()
          // var scrollElem = document.querySelector('#orders');
          // scrollElem.scrollIntoView();
        });
    }
  }

}





