import { ChangeDetectorRef, Component, OnInit, ViewChild ,HostListener} from '@angular/core';
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
  selector: 'ms-runback',
  templateUrl: './runback.component.html',
  styleUrls: ['./runback.component.scss']
})
export class RunbackComponent implements OnInit {
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSize: any = 50;
  currentPage: any = 0;
  runbackForm: FormGroup = new FormGroup({});
  id: string = '';
  type:string;
  resultsLength: number;
  termId: number;
  runBackCadetList;
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
  
  constructor( private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _trgBattalion: TrgBattalionService,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

      this.route.params.subscribe(
        (params)=>{
          this.type = params.type;
               
          if (this.type == "I-Term") {
            this.termId = 1;
            this.battalionId = null;
            this.companyList = [];
            this.companyName = null;
            this.serviceid = null;
          } else if (this.type == "II-Term") {
            this.termId = 2;
            this.battalionId = null;
            this.companyList = [];
            this.companyName = null;
            this.serviceid = null;
          } else if (this.type == "III-Term") {
            this.termId = 3;
            this.battalionId = null;
            this.companyList = [];
            this.companyName = null;
            this.serviceid = null;
          } else if (this.type == "II-Tech") {
            this.termId = 7;
            this.battalionId = null;
            this.companyList = [];
            this.companyName = null;
            this.serviceid = null;
          }
      this.getCadetRunbackByData();
          console.log(this.type, "type route");
          if (this.resultsLength == 0) {
            this.runBackCadetList = null;
          }
          if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
            this.getRunBackAllCadetlist();
          }
      console.log(this.type, "type route");
     
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
        }
      )

    this.runbackForm = this.fb.group({
      serialNo: ['', Validators.required],
      battalian: ['', Validators.required],
      company: ['', Validators.required],
      termSession: ['', Validators.required],
      year: ['', Validators.required],
      course: ['', Validators.required],
      // cadetRank: ['', Validators.required],
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
    if (this.battalionList.length || this.companyList.length || this.serviceid ) {
      this.companyList = [];
      this.battalion = '0';
      this.company = '0';
      this.serviceid = '';
    
    }
  }



  getRunBackAllCadetlist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this._trgBattalion.getRun_All_ListByBCName(this.resultType, this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.runBackCadetList = res.object.routeRunMrFilterPayload;
          if (res.object.routeRunMrFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.runBackCadetList = res.object.routeRunMrFilterPayload;
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
      this._trgBattalion.getRunback_All_List(this.resultType, this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.runBackCadetList = res.object.routeRunMrFilterPayload;
          if (res.object.routeRunMrFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.runBackCadetList = res.object.routeRunMrFilterPayload;
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
          this._trgBattalion.openSnackbar("Some Error Occured.");
        }

      )
    }
  }
  

  obtainedTotalMarks: number = 0;
  onChange(e: any, value, mainIndex,) {
    if (value > 50 || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    this.runBackCadetList[mainIndex].runbackRouteMrResult.obtainedMarks = value;
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.runBackCadetList);
    // this.intellectualCadetList
  }

  onChange1(value, mainIndex,) {
    this.runBackCadetList[mainIndex].runbackRouteMrResult.remark = value;
    console.log('%%%%remark%%%%%%%', this.runBackCadetList);
    // this.intellectualCadetList
  }

  confirm() {
    this.spinner.show();

    var formdata = this.runBackCadetList

    console.log(formdata)
    this._trgBattalion.updateRunback(formdata).subscribe(
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

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getRunBackAllCadetlist()
    }

  }

  edSearch(event?: PageEvent) {
    console.log(this.paginator.pageIndex, "getLeadership_matrix_list paginator");
    console.log(this.paginator.pageSize, "getLeadership_matrix_list paginator1");
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this._trgBattalion.openSnackbar("Search Bar is Empty. Please fill the details");

    }
    else {
      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show()
            return this._trgBattalion.getRunback_search(this.termId, this.serviceid,this.resultType, this.paginator.pageIndex, this.paginator.pageSize)
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
            this.runBackCadetList = data.object.routeRunMrFilterPayload;
            if (data.object.routeRunMrFilterPayload.length > 0) {
              this.runBackCadetList = data.object.routeRunMrFilterPayload;
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
    this._trgBattalion.getRun_All_ListByBCNameComp(this.resultType,this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.runBackCadetList = res.object.oqMatrixFilterPayload;
      }
      else {
        this.runBackCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }
    )
  }

  status: any = 1;
  subjectSize;
  getCadetRunbackByData() {
    this.spinner.show();
    this._trgBattalion.getRunbackById(this.termId, this.status).subscribe(res => {
      console.log(res, "========eqtnSubject=========");

      if (res.status == "OK") {
        this.runSubjects = res.object;
        this.subjectSize = res.object.length;
        console.log(this.subjectSize, "this.subjectSizethis.subjectSize");

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "========eqtnSubject=========");

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
