import { ChangeDetectorRef, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'ms-final-term',
  templateUrl: './final-term.component.html',
  styleUrls: ['./final-term.component.scss']
})
export class FinalTermComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize: any = 50;
  currentPage: any = 0;
  runbackForm: FormGroup = new FormGroup({});
  id: string = '';
  term: string;
  resultsLength: number;
  termId: number;
  midTermOQCadetList;
  displayStyle: any = "none";
  resultType = 'Runback';
  serviceid: any;
  companyName: any;
  companyid: number;
  runSubjects: any = [];
  battalionId: any;

  battalion: any;
  company: any;
  battalionList: [] = [];
  companyList: any[] = [];

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adjutantservice: AdjutantService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

    this.route.params.subscribe(
      (params) => {
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
          this.serviceid = null;
          this.companyName = null;
        } else if (this.term == "III Term") {
          this.termId = 3;
          this.battalionId = null;
          this.companyList = [];
          this.serviceid = null;
          this.companyName = null;
        } else if (this.term == "II Tech") {
          this.termId = 7;
          this.battalionId = null;
          this.companyList = [];
          this.serviceid = null;
          this.companyName = null;
        }
        console.log(this.term, "type route");

        if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
          this.getRunBackAllCadetlist();
        }

        this.adjutantservice.getBattalionList().subscribe(
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

    this.runbackForm = this.fb.group({
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
  descLength
  value;
  value1;
  onChangesubmit(value) {
    this.value = value
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");
    alert('data is lost if you not save');

    this.getRunBackAllCadetlist();
  }

  clearSearch() {
    if (this.battalionList.length || this.companyList.length) {
      this.companyList = [];
      this.battalion = '0';
      this.company = '0';
      this.allData();
    }
  }

  allData() {
    this.adjutantservice.getOQ_Final_DRILL_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
      console.log(res);
      if (res.message == 'Record not found') {
        this.spinner.hide();
        this.adjutantservice.openSnackbar(res.message);
      }
      if (res.message == 'OK') {
        this.midTermOQCadetList = res.object.oqDrillFilterPayload;
        if (res.object.oqDrillFilterPayload.length > 0) {
          this.resultsLength = res.object.totalRecords;
          this.midTermOQCadetList = res.object.oqDrillFilterPayload;
        }
        else {
          this.midTermOQCadetList = []
        }
        this.cdref.detectChanges();
      }
      else {
        this.midTermOQCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.adjutantservice.openSnackbar("Some Error Occured.");
      }

    )
  }

  getRunBackAllCadetlist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.adjutantservice.getOQ_Final_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.adjutantservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.midTermOQCadetList = res.object.oqDrillFilterPayload;
          if (res.object.oqDrillFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.midTermOQCadetList = res.object.oqDrillFilterPayload;
          }
          else {
            this.midTermOQCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.midTermOQCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adjutantservice.openSnackbar("Some Error Occured.");
        }

      )
    }
    else {
      this.adjutantservice.getOQ_Final_DRILL_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.adjutantservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.midTermOQCadetList = res.object.oqDrillFilterPayload;
          if (res.object.oqDrillFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.midTermOQCadetList = res.object.oqDrillFilterPayload;
          }
          else {
            this.midTermOQCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.midTermOQCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adjutantservice.openSnackbar("Some Error Occured.");
        }

      )
    }

  }

  TotalMarks :number =20;
  obtainedTotalMarks: number = 0;
  onChange(e: any, value, mainIndex,) {
    if (value > 20 || value == NaN) {
      this.adjutantservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    this.midTermOQCadetList[mainIndex].oqDrillResult.obtainedMarks = value;
    this.midTermOQCadetList[mainIndex].oqDrillResult.totalMarks = this.TotalMarks;
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.midTermOQCadetList);
    // this.intellectualCadetList
  }

  // onChange1(value, mainIndex,) {
  //   this.midTermOQCadetList[mainIndex].oqDrillResult.remark = value;
  //   console.log('%%%%remark%%%%%%%', this.midTermOQCadetList);
  //   // this.intellectualCadetList
  // }

  confirm() {
    this.spinner.show();

    var formdata = this.midTermOQCadetList

    console.log(formdata)
    this.adjutantservice.updateOQFinalDrill(formdata).subscribe(
      res => {
        if (res.message == "Record updated successfully") {
          this.spinner.hide()
          this.adjutantservice.openSnackbar("Updated Successfully");
          window.location.reload();
        }
        else {
          err => {
            this.spinner.hide()
            this.adjutantservice.openSnackbar("Some Error Occured.");
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

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getRunBackAllCadetlist()
    }

  }


  edSearch(event?: PageEvent) {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.adjutantservice.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      this.adjutantservice.getOQ_Final_DRILL_search(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.adjutantservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.midTermOQCadetList = res.object.oqDrillFilterPayload;

          this.cdref.detectChanges();
        }
        else {
          this.midTermOQCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adjutantservice.openSnackbar("Some Error Occured.");
        }

      )
    }
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
      this.adjutantservice.getCompanyList(this.battalionId).subscribe(
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
    this.getRunBackAllCadetlist();
  }

  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getRunBackAllCadetlist();
      }
    }
    this.getRunBackAllCadetlist();
  }


  getSpecialAllList() {
    this.adjutantservice.getCamp_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.midTermOQCadetList = res.object.oqMatrixFilterPayload;
      }
      else {
        this.midTermOQCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.adjutantservice.openSnackbar("Some Error Occured.");
      }
    )
  }

  status: any = 1;
  subjectSize;


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
