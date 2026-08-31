import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-oq-final',
  templateUrl: './oq-final.component.html',
  styleUrls: ['./oq-final.component.scss']
})
export class OqFinalComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageTitle = "OQ Marks";
  id: string = '';
  battalionList: any[] = [];
  companyList: any[] = [];
  leaderShipSubject: any[] = [];
  attrInput: any = [];
  oqMarksList;
  resultsLength: number;
  battleid: any;
  isError: boolean = false;
  totalmarks: number = 0;
  term: string;
  termId: number;
  displayStyle: any = "none";
  serviceid: any;
  pageSize: any = 50;
  currentPage: any = 0;
  LDMatrixForm: FormGroup = new FormGroup({});

  companyName: any;
  companyid: number;
  runSubjects: any = [];
  battalionId: any;

  constructor(private dialog: MatDialog,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

    this.LDMatrixForm = this.fb.group({})

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
      this.getOQMarksSubject();
      if (this.resultsLength == 0) {
        this.oqMarksList = null;
      }
      if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
        this.getOQMarksAlllist();
      }
      this._trgBattalion.getBattalionList().subscribe(
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


  }



  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  obtainedTotalMarks: any;
  onChange1(e: any, value, totalMarksPlCdr, sub_id, mainIndex, subIndex1) {
    if (value > totalMarksPlCdr || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    else if (value == "") {
      this.oqMarksList[mainIndex].oqMarksResult.oqSubjectResult[subIndex1].obtainedMarksPlCdr = '';
      return false;
    }
    else {
      var total1 = (<HTMLInputElement>document.getElementById(mainIndex)).value;
      if (total1) {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total1) + (value == '' ? 0 : parseInt(value)) + "";
        this.oqMarksList[mainIndex].oqMarksResult.obtainedMarksPlCdr = parseInt(total1) + (value == '' ? 0 : parseInt(value));
      } else {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
        this.oqMarksList[mainIndex].oqMarksResult.obtainedMarksPlCdr = (value == '' ? 0 : parseInt(value));
      }
      this.oqMarksList[mainIndex].oqMarksResult.oqSubjectResult[subIndex1].obtainedMarksPlCdr = value;
      this.oqMarksList[mainIndex].oqMarksResult.entryTypeId = '2';
    }

  }

  onFocusEvent1(value, mainIndex) {
    if (value == NaN || value == '' || value == undefined) {
      return false;
    }
    var total1 = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total1) {
      var temp = parseInt(total1) - parseInt(value);
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total1) + parseInt(value) + "";
      this.oqMarksList[mainIndex].oqMarksResult.obtainedMarksPlCdr =temp == 0?null:temp ;
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.oqMarksList[mainIndex].oqMarksResult.obtainedMarksPlCdr = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if (this.obtainedTotalMarks == 0) {
        this.obtainedTotalMarks = ''
      }
    }
  }


  onChange2(e: any, value2, totalMarksCoyCdr, sub_id, mainIndex2, subIndex2) {
    if (value2 > totalMarksCoyCdr || value2 == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value2 = '';
      e.target.value = null;
    }
    else if (value2 == "") {
      this.oqMarksList[mainIndex2].oqMarksResult.oqSubjectResult[subIndex2].obtainedMarksCoyCdr = '';
      return false;
    }
    else {
      var total2 = (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value;
      if (total2) {
        (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value = parseInt(total2) + (value2 == '' ? 0 : parseInt(value2)) + "";
        this.oqMarksList[mainIndex2].oqMarksResult.obtainedMarksCoyCdr = parseInt(total2) + (value2 == '' ? 0 : parseInt(value2));
      } else {
        (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value = value2;
        this.oqMarksList[mainIndex2].oqMarksResult.obtainedMarksCoyCdr = (value2 == '' ? 0 : parseInt(value2));
      }
      this.oqMarksList[mainIndex2].oqMarksResult.oqSubjectResult[subIndex2].obtainedMarksCoyCdr = value2;
      this.oqMarksList[mainIndex2].oqMarksResult.entryTypeId = '2';

    }
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.oqMarksList);
    // this.oqMarksList
  }

  onFocusEvent2(value2, mainIndex2) {
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      return false;
    }
    var total2 = (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value;
    if (total2) {
      var temp = parseInt(total2) - parseInt(value2);
      (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value = parseInt(total2) + parseInt(value2) + "";
      this.oqMarksList[mainIndex2].oqMarksResult.obtainedMarksCoyCdr = temp == 0?null:temp ;
    } else {
      (<HTMLInputElement>document.getElementById('obtotal_' + mainIndex2)).value = value2;
      this.oqMarksList[mainIndex2].oqMarksResult.obtainedMarksCoyCdr = value2;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if (this.obtainedTotalMarks == 0) {
        this.obtainedTotalMarks = ''
      }
    }
  }

  onChange3(e: any, value3, totalMarksBnCdr, sub_id, mainIndex3, subIndex) {
    if (value3 > totalMarksBnCdr || value3 == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value3 = '';
      e.target.value = null;
    }
    else if (value3 == "") {
      this.oqMarksList[mainIndex3].oqMarksResult.oqSubjectResult[subIndex].obtainedMarksBnCdr = '';
      return false;
    }
    else {
      var total3 = (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value;
      if (total3) {
        (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value = parseInt(total3) + (value3 == '' ? 0 : parseInt(value3)) + "";
        this.oqMarksList[mainIndex3].oqMarksResult.obtainedMarksBnCdr = parseInt(total3) + (value3 == '' ? 0 : parseInt(value3));
      } else {
        (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value = value3;
        this.oqMarksList[mainIndex3].oqMarksResult.obtainedMarksBnCdr = (value3 == '' ? 0 : parseInt(value3));
      }
      this.oqMarksList[mainIndex3].oqMarksResult.oqSubjectResult[subIndex].obtainedMarksBnCdr = value3;
      this.oqMarksList[mainIndex3].oqMarksResult.entryTypeId = '2';

    }
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.oqMarksList);
    // this.oqMarksList
  }

  onFocusEvent3(value3, mainIndex3) {
    if (value3 == NaN || value3 == '' || value3 == undefined) {
      return false;
    }
    var total3 = (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value;
    if (total3) {
      var temp = parseInt(total3) - parseInt(value3);
      (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value = parseInt(total3) + parseInt(value3) + "";
      this.oqMarksList[mainIndex3].oqMarksResult.obtainedMarksBnCdr = temp == 0?null:temp ;
    } else {
      (<HTMLInputElement>document.getElementById('Bntotal_' + mainIndex3)).value = value3;
      this.oqMarksList[mainIndex3].oqMarksResult.obtainedMarksBnCdr = value3;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if (this.obtainedTotalMarks == 0) {
        this.obtainedTotalMarks = ''
      }
    }
  }


  confirm() {
    this.spinner.show();

    var formdata = this.oqMarksList

    console.log(formdata)
    this._trgBattalion.updateOQ_Marks_list(formdata).subscribe(
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
      this._trgBattalion.getCompanyList(this.battalionId).subscribe(
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
    this.getOQMarksAlllist();
  }

  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getOQMarksAlllist();
      }
    }
    this.getOQMarksAlllist();
  }

  getSpecialAllList() {
    this._trgBattalion.getOQ_Final_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.oqMarksList = res.object.oqMatrixFilterPayload;
      }
      else {
        this.oqMarksList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }
    )
  }

  descLength
  value;
  value1;
  onChangesubmit(value) {
    this.value = value
  }



  getTotal(marks) {
    return marks.reduce((acc, { obtainedMarksPlCdr }) => acc += +(obtainedMarksPlCdr || 0), 0);
  }

  subjectSize;
  getOQMarksSubject() {
    this.spinner.show();
    this._trgBattalion.getOQ_Marks_Subject(1).subscribe(res => {
      console.log(res, "========leaderShipSubject=========");

      if (res.status == "OK") {
        this.leaderShipSubject = res.object;
        this.subjectSize = res.object.length;
        console.log(this.subjectSize, "this.subjectSizethis.subjectSize");

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "========leaderShipSubject=========");

      }
      else {
        this.spinner.hide()
        this._trgBattalion.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }

    )
  }


  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getOQMarksAlllist()
    }
  }

  edSearch(event?: PageEvent) {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this._trgBattalion.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show()
            return this._trgBattalion.getOQ_Final_Marks_list_search(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)
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
          if (data.status == 'OK') {
            this.oqMarksList = data.object.oqMarksFilterPayload;
            if (data.object.oqMarksFilterPayload.length > 0) {
              this.oqMarksList = data.object.oqMarksFilterPayload;
            }
            else {
              this.oqMarksList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.oqMarksList = []
          }
          this.spinner.hide()
          // var scrollElem = document.querySelector('#orders');
          // scrollElem.scrollIntoView();
        });
    }
  }



  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");

    this.getOQMarksAlllist();
  }

  getOQMarksAlllist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this._trgBattalion.getOQ_Final_Marks_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.oqMarksList = res.object.oqMarksFilterPayload;
          if (res.object.oqMarksFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.oqMarksList = res.object.oqMarksFilterPayload;
          }
          else {
            this.oqMarksList = []
          }
          this.cdref.detectChanges();

        }
        else {
          this.oqMarksList = []
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
      this._trgBattalion.getOQ_final_Marks_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.oqMarksList = res.object.oqMarksFilterPayload;
          if (res.object.oqMarksFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.oqMarksList = res.object.oqMarksFilterPayload;
          }
          else {
            this.oqMarksList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.oqMarksList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      )
    }

  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
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

}




