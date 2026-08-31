import { ChangeDetectorRef, Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';


@Component({
  selector: 'ms-camp-marks',
  templateUrl: './camp-marks.component.html',
  styleUrls: ['./camp-marks.component.scss']
})
export class CampMarksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  LDMatrixForm: FormGroup = new FormGroup({});
  pageTitle = "Add Leadership Development Matrix";
  id: string = '';
  battalionList: any[] = [];
  companyList: any[] = [];
  leaderShipSubject: any[] = [];
  attrInput: any = [];
  leaderShipList;
  resultsLength: number;
  isError: boolean = false;
  totalmarks: number = 0;
  term: string;
  termId: number;
  displayStyle: any = "none";
  serviceid: any;
  pageSize: any = 50;
  currentPage: any = 0;
  battleid: any;
  companyName: any;
  battalionId: any;

  constructor(private dialog: MatDialog,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
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

      this.getCampMarksSubject();
      if (this.resultsLength == 0) {
        this.leaderShipList = null;
      }
      if (this.companyName == undefined || this.companyName == null || this.companyName == '' || this.companyName == 0) {
        this.getCampMarksAlllist();
      }
      else {
        this.OQName();
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

    this.LDMatrixForm = this.fb.group({
      serviceId: ['', Validators.required],
      termId: [this.termId, Validators.required],
      obtainedMarks: ['', Validators.required],
      totalMarks: ['', Validators.required],
      campSubjectResult: this.fb.array([]),
    })
  }

  public get campSubjectResult(): FormArray {
    return this.LDMatrixForm.get("campSubjectResult") as FormArray
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  OQName() { }

  obtainedTotalMarks: any;
  onChange(e: any, value, totalMarks, sub_id, mainIndex, subIndex) {
    if (value > totalMarks || value == NaN) {
      this._trgBattalion.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    else if (value == "") {
      this.leaderShipList[mainIndex].campMarksResult.campSubjectResult[subIndex].obtainedMarks = '';
      return false;
    }
    else {
      var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
      if (total) {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
        this.leaderShipList[mainIndex].campMarksResult.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
      } else {
        (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
        this.leaderShipList[mainIndex].campMarksResult.obtainedMarks = (value == '' ? 0 : parseInt(value));
      }
      this.leaderShipList[mainIndex].campMarksResult.campSubjectResult[subIndex].obtainedMarks = value;
    }
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.leaderShipList);
    // this.leaderShipList
  }

  onFocusEvent(value, mainIndex) {
    if (value == NaN || value == '' || value == undefined) {
      return false;
    }
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      var temp = parseInt(total) - parseInt(value);
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + parseInt(value) + "";
      this.leaderShipList[mainIndex].campMarksResult.obtainedMarks =  temp == 0?null:temp ;
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.leaderShipList[mainIndex].campMarksResult.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if (this.obtainedTotalMarks == 0) {
        this.obtainedTotalMarks = ''
      }
    }
  }

  totalMarks1
  confirm() {
    this.spinner.show();
    this.LDMatrixForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.LDMatrixForm.value, { obtainedMarks: this.obtainedTotalMarks });
    var formdata = this.leaderShipList

    console.log(formdata)
    this._trgBattalion.updateCamp_Marks_list(formdata).subscribe(
      res => {
        if (res.message == "Record updated successfully") {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Updated Successfully");
          window.location.reload();
        }
        else {
          err => {
            this.spinner.hide()
            this._trgBattalion.openSnackbar("Some Error Occured.");
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
    this.getCampMarksAlllist();
  }

  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getCampMarksAlllist();
      }
    }
    this.getCampMarksAlllist();
  }

  getSpecialAllList() {
    this._trgBattalion.getCamp_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.leaderShipList = res.object.oqMatrixFilterPayload;
      }
      else {
        this.leaderShipList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }
    )
  }

  getTotal(marks) {
    return marks.reduce((acc, { obtainedMarks }) => acc += +(obtainedMarks || 0), 0);
  }

  subjectSize;
  getCampMarksSubject() {
    this.spinner.show();
    this._trgBattalion.getCamp_Marks_Subject(1).subscribe(res => {
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
      this.getCampMarksAlllist()
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
            return this._trgBattalion.getCamp_Marks_list_search(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)
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
            this.leaderShipList = data.object.campMarksFilterPayload;
            if (data.object.campMarksFilterPayload.length > 0) {
              this.leaderShipList = data.object.campMarksFilterPayload;
            }
            else {
              this.leaderShipList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.leaderShipList = []
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

    this.getCampMarksAlllist();
  }

  getCampMarksAlllist() {
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this._trgBattalion.getCamp_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.leaderShipList = res.object.campMarksFilterPayload;
          if (res.object.campMarksFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.leaderShipList = res.object.campMarksFilterPayload;
          }
          else {
            this.leaderShipList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.leaderShipList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.");
        }

      )
    }
    else {
      this._trgBattalion.getCamp_Marks_list(this.termId, this.currentPage, 1, this.pageSize).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.leaderShipList = res.object.campMarksFilterPayload;
          if (res.object.campMarksFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.leaderShipList = res.object.campMarksFilterPayload;
          }
          else {
            this.leaderShipList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.leaderShipList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.");
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




