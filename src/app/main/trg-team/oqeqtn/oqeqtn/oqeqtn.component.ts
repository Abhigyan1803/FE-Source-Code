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
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';

@Component({
  selector: 'ms-oqeqtn',
  templateUrl: './oqeqtn.component.html',
  styleUrls: ['./oqeqtn.component.scss']
})
export class OqeqtnComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    pageSize: any = 50;
    currentPage: any = 0;
    runbackForm: FormGroup = new FormGroup({});
    id: string = '';
    termType: string;
    term:string;
    resultsLength: number;
    termId: number;
    oqEqtnList;
    displayStyle: any = "none";
    resultType = 'Runback';
    serviceid: any;
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
      private router: Router, private trg_team_services: TrgTeamService,
      private adminservice: AdminService, private cdref: ChangeDetectorRef,
      private activeRoute: ActivatedRoute) {
  
      this.route.params.subscribe(
        (params) => {
          this.term = params.term;
          // alert(this.term);
          this.termType = params.type;
          // alert(this.termType);
          console.log(params+'-------------------------')


          if (this.term == "I TERM" && this.termType == "MID TERM") {
            this.termId = 1;
            // alert(this.termId);
            this.termType = "MID TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
          
          } else if (this.term == "II TERM"  && this.termType == "MID TERM") {
            this.termId = 2;
            this.termType = "MID TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
           // this.getBattalionList();
          
          } else if (this.term == "III TERM"  && this.termType == "MID TERM") {
            this.termId = 3;
            this.termType = "MID TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
          
          } else if (this.term == "II TECH"  && this.termType == "MID TERM") {
            this.termId = 7;
            this.termType = "MID TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
          
          }
          else if (this.term == "I TERM" && this.termType == "FINAL TERM") {
            this.termId = 1;
            this.termType = "FINAL TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
         
          }
          else if (this.term == "II TERM"  && this.termType == "FINAL TERM") {
            this.termId = 2;
            this.termType = "FINAL TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
           
          }
          else if (this.term == "III TERM"  && this.termType == "FINAL TERM") {
            this.termId = 3;
            this.termType = "FINAL TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
            
          }
          else if (this.term == "II TECH"  && this.termType == "FINAL TERM") {
            this.termId = 7;;
            this.termType = "FINAL TERM";
            this.battalionId=null;
            this.companyList=[];
            this.companyName=null;
            this.serviceid=null;
            this.getOqEqtnAllList();
             // this.getBattalionList();
           
          }
         
          console.log(this.termType, "type route");
          // this.getCadetRunbackByData();
          if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
            this.getOqEqtnAllList();
          }
  
          this.getBattalion();
        });
  
      this.runbackForm = this.fb.group({
        serialNo: ['', Validators.required],
        battalian: ['', Validators.required],
        company: ['', Validators.required],
        termName: ['', Validators.required],
        year: ['', Validators.required],
        course: ['', Validators.required],
        // cadetRank: ['', Validators.required],
        username: ['', Validators.required],
        term: ['', Validators.required],
      })
    }
  
    ngOnInit(): void {
    }

    getBattalion(){
         
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
    descLength;
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
      // alert('data is lost if you not save');
  
      this.getOqEqtnAllList();
    }
  
    // clearSearch() {
    //   if (this.battalionList.length || this.companyList.length ) {
    //     this.companyList = [];
    //     this.battalion = '0';
    //     this.company = '0';
        
    //   }
    // }
  
    allData(){
      // this.trg_team_services.getOqEqtn_All_List(this.termType, this.termId, this.currentPage, this.pageSize).subscribe(res => {
      //   console.log(res);
      //   if (res.message == 'Record not found') {
      //     this.spinner.hide();
      //     this.trg_team_services.openSnackbar(res.message);
      //   }
      //   if (res.message == 'OK') {
      //     this.oqEqtnList = res.object.oqEqtnFilterPayload;
      //     if (res.object.oqEqtnFilterPayload.length > 0) {
      //       this.resultsLength = res.object.totalRecords;
      //       this.oqEqtnList = res.object.oqEqtnFilterPayload;
      //     }
      //     else {
      //       this.oqEqtnList = []
      //     }
      //     this.cdref.detectChanges();
      //   }
      //   else {
      //     this.oqEqtnList = []
      //   }
      //   this.spinner.hide()
      // },
      //   err => {
      //     this.spinner.hide()
      //     this.trg_team_services.openSnackbar("Some Error Occured.");
      //   }
  
      // )
    }
  
    getOqEqtnAllList() {
      this.spinner.show();
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.trg_team_services.getOqEqtn_All_ListByBCName(this.termType, this.termId, this.currentPage, this.pageSize,this.battalionName,this.companyName).subscribe(res => {
          console.log(res);
          if (res.message == 'Record not found') {
            this.spinner.hide();
            this.trg_team_services.openSnackbar(res.message);
          }
          if (res.message == 'OK') {
            this.oqEqtnList = res.object.oqEqtnFilterPayload;
            if (res.object.oqEqtnFilterPayload.length > 0) {
              this.resultsLength = res.object.totalRecords;
              this.oqEqtnList = res.object.oqEqtnFilterPayload;
            }
            else {
              this.oqEqtnList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.oqEqtnList = []
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
      //  alert('hi')
        this.trg_team_services.getOqEqtn_All_List(this.termType, this.termId, this.currentPage, this.pageSize).subscribe(res => {
          console.log(res);
          if (res.message == 'Record not found') {
            this.spinner.hide();
            this.trg_team_services.openSnackbar(res.message);
          }
          if (res.message == 'OK') {
            this.oqEqtnList = res.object.oqEqtnFilterPayload;
            if (res.object.oqEqtnFilterPayload.length > 0) {
              this.resultsLength = res.object.totalRecords;
              this.oqEqtnList = res.object.oqEqtnFilterPayload;
              // this.oqEqtnList.oqEqtnResult.totalMarks = 10;
            }
            else {
              this.oqEqtnList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.oqEqtnList = []
          }
          this.spinner.hide()
        },
          err => {
            this.spinner.hide()
            this.trg_team_services.openSnackbar("Some Error Occured.");
          }
  
        )
      }
  
    }
    
  
    obtainedTotalMarks: number = 0;
    totalMarks:number = 10;
    onChange(e: any, value, mainIndex,) {
      if (value > 10 || value == NaN) {
        this.adminservice.openSnackbar("Obtained marks is greater than total marks");
        value = '';
        e.target.value = null;
      }
      this.oqEqtnList[mainIndex].oqEqtnResult.obtainedMarks = value;
      this.oqEqtnList[mainIndex].oqEqtnResult.totalMarks = this.totalMarks;
      console.log('%%%%%%%%%%%%%%%%%%%%%%===========================', this.oqEqtnList);
      // this.intellectualCadetList
    }
  
    onChange1(value, mainIndex,) {
      this.oqEqtnList[mainIndex].oqEqtnResult.remark = value;
      console.log('%%%%remark%%%%%%%', this.oqEqtnList);
      // this.intellectualCadetList
    }
  
    confirm() {
      this.spinner.show();

      var formdata = this.oqEqtnList;
  
      console.log(formdata)
      this.trg_team_services.updateOqEqtn(formdata).subscribe(
        res => {
          if (res.message == "Record updated successfully") {
            this.spinner.hide()
            this.adminservice.openSnackbar("Updated Successfully");
            // window.location.reload();
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
        this.getOqEqtnAllList();
      }
  
    }
  
    edSearch(event?: PageEvent) {
      console.log(this.paginator.pageIndex, "getLeadership_matrix_list paginator");
      console.log(this.paginator.pageSize, "getLeadership_matrix_list paginator1");
      this.searchOQEqtnData();
    }
  

    searchOQEqtnData(){
      if( this.serviceid==null||this.serviceid==undefined||this.serviceid=='')
      {
        this.trg_team_services.openSnackbar("Search Bar is Empty. Please fill the details");

      }
      else{
        this.battalionId=null; this.companyList=[];this.battalionList=[];this.companyName=null;
        this.getBattalion();
        merge(/* this.sort.sortChange,  */this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.spinner.show()
            return this.trg_team_services.getOqEqtn_search(this.termId, this.serviceid,this.termType, this.paginator.pageIndex, this.paginator.pageSize)
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
            this.oqEqtnList = data.object.oqEqtnFilterPayload;
            if (data.object.oqEqtnFilterPayload.length > 0) {
              this.oqEqtnList = data.object.oqEqtnFilterPayload;
            }
            else {
              this.oqEqtnList = []
            }
            this.cdref.detectChanges();
          }
          else {
            this.oqEqtnList = []
          }
          this.spinner.hide()
          // var scrollElem = document.querySelector('#orders');
          // scrollElem.scrollIntoView();
        });
      }
    
    }

   

    
  battalionName:string='0';
  battalionSelected(e: any) {
    
    this.battalionName = e;
    this.companyName=null; 
    this.serviceid=null;
    if(this.battalionName == '0'){
      this.battalionId = null;
      this.companyName = null;
    }
    if(this.battalionName == 'CA'){
      this.battalionId = 1
    }
    else if(this.battalionName == "TH"){
      this.battalionId = 2
    }
    else if(this.battalionName == "MA"){
      this.battalionId = 3
    }
    else if(this.battalionName == "BH"){
      this.battalionId = 4
    }
  
    this.spinner.show();

    if(this.battalionId!=null || this.battalionName!='0'){
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
    else{
     this.companyList=[];
     this.companyName=null;
    }
   
    this.companyList=[];
    
    this.getOqEqtnAllList();


    
  }
  // companyid:number; 
  companyName:any;
  companySelected(e:any){
    this.companyName = e;
    this.serviceid=null;
    if(this.companyName == 0){
      this.companyName = null;
      this.getOqEqtnAllList();
      
    }
    else{
      if(this.battalionId == 1 ||  this.battalionId == 2 ||  this.battalionId == 3 ||  this.battalionId == 4 ){   
        this.getOqEqtnAllList();
      }
    
    }


    
  }
    status: any = 1;
    subjectSize;
    getCadetRunbackByData() {
      // this.spinner.show();
      // this.trg_team_services.getRunbackById(this.termId, this.status).subscribe(res => {
      //   console.log(res, "========eqtnSubject=========");
  
      //   if (res.status == "OK") {
      //     this.runSubjects = res.object;
      //     this.subjectSize = res.object.length;
      //     console.log(this.subjectSize, "this.subjectSizethis.subjectSize");
  
      //     this.spinner.hide();
      //     this.cdref.detectChanges();
      //     console.log(res, "========eqtnSubject=========");
  
      //   }
      //   else {
      //     this.spinner.hide()
      //     this.trg_team_services.openSnackbar(res.message)
      //   }
      // },
      //   err => {
      //     this.spinner.hide()
      //     this.trg_team_services.openSnackbar("Some Error Occured.");
      //   }
  
      // )
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
  
