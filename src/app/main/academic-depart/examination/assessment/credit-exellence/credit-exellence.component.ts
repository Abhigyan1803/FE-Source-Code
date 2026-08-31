import { ChangeDetectorRef, Component, OnInit, ViewChild, HostListener } from '@angular/core';
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

@Component({
  selector: 'ms-credit-exellence',
  templateUrl: './credit-exellence.component.html',
  styleUrls: ['./credit-exellence.component.scss']
})
export class CreditExellenceComponent implements OnInit {

  creditForm: FormGroup = new FormGroup({});
  pageTitle = "Add Campmark";
  id: string = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  creditSubjectList: any[] = [];
  termId: number;
  displayStyle: any = "none";
  resultsLength: number;
  creditCadetList;
  term: string;
  battleid: any;
  totalmarks: number = 0;
  serviceid: any;
  companyName: any;
  battalionId: any;
  pageSize: any = 50;
  currentPage: any = 0;
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
    private academicservice: AcademicDeptService,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      document.addEventListener("keydown", function (event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }   
    });
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
      this.getCreditSubjectList();
      if (this.resultsLength == 0) {
        this.creditCadetList = null;
      }
      if (this.companyName == undefined || this.companyName == null || this.companyName == '' || this.companyName == 0) {
        this.getCreditAllCadetlist();
      }
      else {
        this.getLeaderShipBCName();
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
    this.creditForm = this.fb.group({
      serialNo: ['', Validators.required],
      battalian: ['', Validators.required],
      company: ['', Validators.required],
      termSession: ['', Validators.required],
      year: ['', Validators.required],
      course: ['', Validators.required],
      cadetRank: ['', Validators.required],
      username: ['', Validators.required],
      term: ['', Validators.required],
    })
  }
  ngOnInit(): void {

  }

  clearSearch() {
    if (this.battalionList.length || this.companyList.length || this.serviceid ) {
      this.companyList = [];
      this.battalion = '0';
      this.company = '0';
      this.serviceid = '';
      this.allData();
    }
  }

  getLeaderShipBCName(){
  }

  allData() {
    this.academicservice.getCREDIT_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
      console.log(res);
      if (res.message == 'Record not found') {
        this.spinner.hide();
        this.academicservice.openSnackbar(res.message);
      }
      if (res.message == 'OK') {
        this.creditCadetList = res.object.creditExcellenceFilterPayload;
        if (res.object.creditExcellenceFilterPayload.length > 0) {
          this.resultsLength = res.object.totalRecords;
          this.creditCadetList = res.object.creditExcellenceFilterPayload;
        }
        else {
          this.creditCadetList = []
        }
        this.cdref.detectChanges();
      }
      else {
        this.creditCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.academicservice.openSnackbar("Some Error Occured.");
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
      this.academicservice.getCompanyList(this.battalionId).subscribe(
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
    this.getCreditAllCadetlist();
  }

  companySelected(e: any) {
    this.companyName = e;

    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getCreditAllCadetlist();
      }
    }
    this.getCreditAllCadetlist();
  }

  getSpecialAllList() {
    this.academicservice.getCredit_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.creditCadetList = res.object.eqtnFilterPayload;
      }
      else {
        this.creditCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.academicservice.openSnackbar("Some Error Occured.");
      }
    )
  }

  ngAfterViewInit() {
    // this.getCreditAllCadetlist();
  }

  obtainedTotalMarks: any ;
  onChange(e: any,value, totalMarks, sub_id, mainIndex, subIndex) {
    if (value > totalMarks || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    else if(value == ""){
      this.creditCadetList[mainIndex].academicCreditForExcellenceResult.creditExcellenceSubResult[subIndex].obtainedMarks = '';
      return false;
    }
    else{
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
      this.creditCadetList[mainIndex].academicCreditForExcellenceResult.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.creditCadetList[mainIndex].academicCreditForExcellenceResult.obtainedMarks = (value == '' ? 0 : parseInt(value));
    }
    this.creditCadetList[mainIndex].academicCreditForExcellenceResult.creditExcellenceSubResult[subIndex].obtainedMarks = value;
  }
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.creditCadetList);
    // this.creditCadetList
  }

  onFocusEvent(value, mainIndex) {
    if (value == NaN || value == '' || value == undefined) {
      return false;
    }
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      var temp = parseInt(total) - parseInt(value);
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + parseInt(value) + "";
      this.creditCadetList[mainIndex].academicCreditForExcellenceResult.obtainedMarks = temp == 0?null:temp ;
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.creditCadetList[mainIndex].academicCreditForExcellenceResult.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
      if( this.obtainedTotalMarks == 0){
        this.obtainedTotalMarks=''
      }
    }
  }

  totalMarks1
  confirm() {
    this.spinner.show();
    this.creditForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.creditForm.value, { obtainedMarks: this.obtainedTotalMarks });
    var formdata = this.creditCadetList

    console.log(formdata)
    this.academicservice.updateCREDIT(formdata).subscribe(
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

  subjectSize;
  getCreditSubjectList() {
    this.spinner.show();
    this.academicservice.getCREDIT_Subject(1).subscribe(res => {
      console.log(res, "========getCREDIT_Subject=========");

      if (res.status == "OK") {
        this.creditSubjectList = res.object;
        this.subjectSize = res.object.length;
        console.log(this.subjectSize, "this.subjectSizethis.subjectSize");

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "========getCREDIT_Subject=========");

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

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getCreditAllCadetlist()
    }

  }

  edSearch(event?: PageEvent) {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.academicservice.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show()
            return this.academicservice.searchCREDIT(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)
          }), map(data => {
            this.resultsLength = data.object.totalRecords;
            return data;
          }),
          catchError(() => {
            console.log('Error here')
            this.spinner.hide()
            return observableOf([]);
          })
        ).subscribe(data => {
          if (data.status == 'OK') {
            this.creditCadetList = data.object.creditExcellenceFilterPayload;
            if (data.object.creditExcellenceFilterPayload.length > 0) {
              this.creditCadetList = data.object.creditExcellenceFilterPayload;
            }
            else {
              this.creditCadetList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.creditCadetList = []
          }
          this.spinner.hide()
        });
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    console.log(this.pageSize, "page size");

    this.currentPage = event.pageIndex;
    console.log(this.currentPage, "currentPage");

    this.getCreditAllCadetlist();
  }

  getCreditAllCadetlist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.academicservice.getCredit_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.academicservice.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.creditCadetList = res.object.creditExcellenceFilterPayload;
          if (res.object.creditExcellenceFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.creditCadetList = res.object.creditExcellenceFilterPayload;
          }
          else {
            this.creditCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.creditCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      )
    }
    else{
    this.academicservice.getCREDIT_list(this.termId, this.currentPage, this.pageSize).subscribe(res => {
      console.log(res);
      if (res.message == 'Record not found') {
        this.spinner.hide();
        this.academicservice.openSnackbar(res.message);
      }
      if (res.message == 'OK') {
        this.creditCadetList = res.object.creditExcellenceFilterPayload;
        if (res.object.creditExcellenceFilterPayload.length > 0) {
          this.resultsLength = res.object.totalRecords;
          this.creditCadetList = res.object.creditExcellenceFilterPayload;
        }
        else {
          this.creditCadetList = []
        }
        this.cdref.detectChanges();
      }
      else {
        this.creditCadetList = []
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
