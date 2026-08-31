import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { from, merge } from 'rxjs';
import { catchError, find, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { SharedService } from 'app/service/shared.service';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-bmt2final',
  templateUrl: './bmt2final.component.html',
  styleUrls: ['./bmt2final.component.scss']
})
export class Bmt2finalComponent implements OnInit {

  intellectualFinalMarkForm: FormGroup = new FormGroup({});
  pageTitle = "Add Campmark";
  id: string = '';
  battalionList: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  Bmt2SubjectList: any[] = [];
  companyList: any[] = [];
  termId: number;
  displayStyle: any = "none";
  resultsLength: number;
  intellectualCadetList;
  type: string;
  companyName: any;
  battleid: any;
  totalmarks: number = 0;
  serviceid: any;
  battalionId: any;
  pageSize: any = 30;
  currentPage: any = 0;
  resultType = 'BMT2';
  txt_ima: any = '';
  companyid: number;

  userDetails: any;
  localID;
  finalSubmissionDate: any;
  hasAccess: boolean = true;
  remark: string;

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private academicservice: AcademicDeptService,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private TrgTeamService: TrgTeamService,
    private delayDashboardService: DelayDashboardService, @Inject(LOCALE_ID) localID: string,

    private sharedService: SharedService) {
      this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
      this.localID = localID
  


    this.route.params.subscribe((params) => {
      this.type = params.term;
      if (this.type == "I Term") {
        this.termId = 1;
        this.battalionId = null;
        this.companyList = [];
        this.companyid = null;
        this.txt_ima = null;

      } else if (this.type == "II Term") {
        this.termId = 2;
        this.battalionId = null;
        this.companyList = [];
        this.companyid = null;
        this.txt_ima = null;

      } else if (this.type == "III Term") {
        this.termId = 3;
        this.battalionId = null;
        this.companyList = [];
        this.companyid = null;
        this.txt_ima = null;

      } else if (this.type == "II Tech") {
        this.termId = 7;
        this.battalionId = null;
        this.companyList = [];
        this.companyid = null;
        this.txt_ima = null;

      }


      this.getBMT2SubjectList();
      this.getBMT2AllCadetlist();

      if (this.resultsLength == 0) {
        this.intellectualCadetList = null;

      }

      if (this.companyName == undefined || this.companyName == null || this.companyName == '' || this.companyName == 0) {
        this.getBMT2AllCadetlist();
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
    });

    this.intellectualFinalMarkForm = this.fb.group({
      serialNo: ['', Validators.required],
      battalian: ['', Validators.required],
      company: ['', Validators.required],
      termSession: ['', Validators.required],
      year: ['', Validators.required],
      course: ['', Validators.required],
      username: ['', Validators.required],
      term: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }

  clearSearch(e) {
    if (this.battalionId || this.companyName || this.serviceid) {
      this.academicservice.openSnackbar("Data cleared, please wait")
      this.txt_ima = '';
      this.serviceid = '';
      e.preventDefault();
      this.companyList = [];
      this.battalionList = [];
      this.battalionId = '';
      this.companyName = '';
      this.battalionName = '';
      this.getBMT2AllCadetlist();

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

  getFinalSubmissionDates(termId) {
    this.finalSubmissionDate = ''

    this.delayDashboardService.getStaffList(1, termId).subscribe(
      res => {
        const source = from(res.object);
        const findOfficer = source.pipe(find((obj: any) => obj.loginId === parseInt(this.userDetails.loginId)));
        const subscribeOfficerRecord = findOfficer.subscribe(
          val => {
            if (val) {
              if (val.finalSubmissionDate) {
                this.finalSubmissionDate = formatDate(val.finalSubmissionDate, 'yyyy-MM-dd', this.localID)
                let todayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID)
                if (todayDate > this.finalSubmissionDate) {
                  this.hasAccess = false;
                } else {
                  this.hasAccess = true;
                }
              } else {
                this.hasAccess = true;
              }
            }
          }
        );
      }
    )
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;

    this.currentPage = event.pageIndex;
    alert('data is lost if you not save');

    this.getBMT2AllCadetlist();
  }

  /*==================KEYPRESSS=======================*/

  keyPress(event: any, totalMarks) {
    let value = event.target.value;
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (value > totalMarks || value == NaN) {
      this.TrgTeamService.openSnackbar("Please Enter Correct Marks, Obtained marks is greater than total marks");
      event.target.value = '';
    }
  }
  /*===================KEYPRESSS======================*/


  /*======================Company-list===================*/
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
      this.adminservice.getCompanyList(this.battalionId).subscribe(
        res => {
          this.spinner.show();
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
    this.getBMT2AllCadetlist();
  }
  /*======================Company-list===================*/



  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getBMT2AllCadetlist();
      }
    }
    this.getBMT2AllCadetlist();
  }

  getSpecialAllList() {
    this.TrgTeamService.getBmt2_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.intellectualCadetList = res.object.oqMatrixFilterPayload;
      }
      else {
        this.intellectualCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.TrgTeamService.openSnackbar("Some Error Occured.");
      }
    )
  }

  getTotal(marks) {
    return marks.reduce((acc, { obtainedMarks }) => acc += +(obtainedMarks || 0), 0);
  }



  academicCreditForExcellenceResult;
  obtainedTotalMarks: any;


  onChange(e: any, value, totalMarks, sub_id, mainIndex, subIndex) {
    if (value > totalMarks || value == NaN) {
      value = '';
      e.target.value = null;
      this.TrgTeamService.openSnackbar("Obtained marks is greater than total marks");
    


    } else if (value == "") {
      this.intellectualCadetList[mainIndex].serviceBmt2Result.serviceBmt2SubjectResult[subIndex].obtainedMarks = '';

      return false;
    }
    else {
      var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
      
        if (total) {
          (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
        this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
       if(this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks>0 && this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks<60){
        this.intellectualCadetList[mainIndex].serviceBmt2Result.remarks ="Fail";
       }
       else{
       this.intellectualCadetList[mainIndex].serviceBmt2Result.remarks ="Pass";
      }
       
        } else {
          (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
          this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = (value == '' ? 0 : parseInt(value));
          if(this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks<=25){
            this.intellectualCadetList[mainIndex].serviceBmt2Result.remarks ="Fail"
       
          }
        }
        
      this.intellectualCadetList[mainIndex].serviceBmt2Result.serviceBmt2SubjectResult[subIndex].obtainedMarks = value;
   
    }




  }

  onFocusEvent(value, mainIndex, subIndex) {

    if (value == NaN || value == '' || value == undefined) {
      return false;
      value = 0;
    }
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      var temObtainedMarks = parseInt(total) - parseInt(value);

      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) - parseInt(value) + "";
      this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = temObtainedMarks == 0 ? null : temObtainedMarks;

      this.intellectualCadetList[mainIndex].serviceBmt2Result.serviceBmt2SubjectResult[subIndex].obtainedMarks = value;
      
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
    }
  }


  // onFocusEvent(value, mainIndex) {
  //   if (value == 0 || value == undefined) {

  //     value = 0;

  //   }
  //   var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
  //   if (total) {
  //     (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + parseInt(value) + "";
  //     this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = parseInt(total) - parseInt(value);
  //   } else {
  //     (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
  //     this.intellectualCadetList[mainIndex].serviceBmt2Result.obtainedMarks = value;
  //   }

  //   // this.obtainedTotalMarks -= parseInt(val);
  //   if (this.obtainedTotalMarks == NaN) {
  //     this.obtainedTotalMarks;
  //   }
  //   else{
  //     this.obtainedTotalMarks;
  //   }
  // }

  subjectSize;
  getBMT2SubjectList() {
    this.spinner.show();
    this.TrgTeamService.getBmt2Subject(1, this.termId).subscribe(res => {
      if (res.status == "OK") {
        this.Bmt2SubjectList = res.object;
        this.subjectSize = res.object.length;

        this.spinner.hide();
        this.cdref.detectChanges();

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

  // getBMT2AllCadetlist() {
  //   this.spinner.show();

  //   this.TrgTeamService.getBmt2_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
  //     this.resultsLength = res.object.totalRecords;
  //     if (res.status == 'OK') {
  //       this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
  //       if (res.object.serviceBmt2FilterPayload.length > 0) {
  //         this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
  //       }
  //       else {
  //         this.intellectualCadetList = []
  //       }
  //       this.cdref.detectChanges();
  //     }
  //     else {
  //       this.intellectualCadetList = []
  //     }
  //     this.spinner.hide()
  //   },
  //     err => {
  //       this.spinner.hide()
  //       this.adminservice.openSnackbar("Some Error Occured.");
  //     }

  //   )
  // }

  getBMT2AllCadetlist() {
    this.intellectualCadetList = null;
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.TrgTeamService.getBmt2_listByBCName(this.resultType, this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.TrgTeamService.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
          if (res.object.serviceBmt2FilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
          }
          else {
            this.intellectualCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.intellectualCadetList = []
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
      this.TrgTeamService.getBmt2_list(this.resultType, this.termId, this.currentPage, this.pageSize).subscribe(res => {
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.TrgTeamService.openSnackbar(res.message);
        }
        if (res.status == 'OK') {
          this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
          if (res.object.serviceBmt2FilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.intellectualCadetList = res.object.serviceBmt2FilterPayload;
          }
          else {
            this.intellectualCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.intellectualCadetList = []
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









  totalMarks1
  confirm() {
    this.spinner.show();
    this.intellectualFinalMarkForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.intellectualFinalMarkForm.value, { obtainedMarks: this.obtainedTotalMarks });
    var formdata = this.intellectualCadetList

    this.TrgTeamService.updateBmt2Details(formdata).subscribe(
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
    this.serviceid = this.txt_ima;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getBMT2AllCadetlist()
    }
  }

  edSearch(event?: PageEvent) {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.TrgTeamService.openSnackbar("Search Bar is Empty. Please fill the details");
      return false;
    }
    // }else{
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show()
          return this.TrgTeamService.getBmt2search(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)
        }), map(data => {
          // this.getTotalRecords();
          if (data.message == 'Record not found') {
            this.spinner.hide();
            this.TrgTeamService.openSnackbar(data.message);
            // alert(data.message);
            // this.resultsLength ='';
            this.resultsLength = 0;
            return false;
          }
          this.resultsLength = data.object.totalRecords;
          return data;
        }),
        catchError(() => {
          this.spinner.hide()
          return observableOf([]);
          // return null;
        })
      ).subscribe(data => {
        if (data.status == 'OK') {
          this.intellectualCadetList = data.object.serviceBmt2FilterPayload;
          if (data.object.serviceBmt2FilterPayload.length > 0) {
            this.intellectualCadetList = data.object.serviceBmt2FilterPayload;
          }
          else {
            this.intellectualCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.intellectualCadetList = []
        }
        this.spinner.hide()
        // var scrollElem = document.querySelector('#orders');
        // scrollElem.scrollIntoView();
      });
    // }
  }

}
