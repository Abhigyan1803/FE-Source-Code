import { ChangeDetectorRef, Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { from } from 'rxjs';
import { filter, find } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DelayDashboardService } from 'app/service/delay-dashboard/delay-dashboard.service';

@Component({
  selector: 'ms-sot',
  templateUrl: './sot.component.html',
  styleUrls: ['./sot.component.scss']
})
export class SotComponent implements OnInit {
  showSpinner:boolean;
  statusMsg:string;
  
  attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'SOT';

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;
  
  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;

  maxMarks:number = 30;

  userDetails:any;
  localID;
  finalSubmissionDate:any;
  hasAccess:boolean = true;


  constructor(private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adminService: AdminService, private sharedService: SharedService,
    private delayDashboardService:DelayDashboardService,  @Inject(LOCALE_ID) localID: string
  ) { 

    this.route.params.subscribe(
      res => {
        this.companyList = [];
        this.battalion = '';
        this.company = '';
        this.serviceId = '';
        this.battalionId = '';
        this.companyId = '';

        this.term = res.term;
        if (this.term == 'I Term') {
          this.termId = 1;

        }  else if (this.term == 'II Tech') {
          this.termId = 7;

        }

        this.getCadetsList()
        this.getFinalSubmissionDates(this.termId)


      }
    )
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
    this.localID = localID

  }

  ngOnInit(): void {
    this.getBattalionList();
  }

  
  getBattalionList() {
    this.sharedService.getBattalionList().subscribe(
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

  
  battalionSelected(e: any) {
    this.companyList = [];
    this.company = '';
    this.battalionList.find(
      (el: any) => {
        if (el.id == e) {
          this.battalion = el.shortName;
 
        }
      }
    )
    // this.battalion = battalion.shortName;


    // console.log(this.battalion);

    this.spinner.show();
    this.adminService.getCompanyList(e).subscribe(
      res => {
        console.log(res)
        if (res.status == 'OK') {
          this.companyList = res.object;
          this.cdref.detectChanges();
          this.spinner.hide();

        } else {
          this.sharedService.openSnackbar(res.message)
          this.spinner.hide();
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }

  companySelected(e: any) {
    this.companyList.find(
      (el: any) => {
        if (el.id == e) {
          this.company = el.name
          // return;
        }
      }
    )
    console.log(this.company);

  }

  
  search(){
    if (this.battalion || this.company || this.serviceId) {
      this.getCadetsList()
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.",7)
    }
  }
  
  clearSearch() {
    if (this.battalion || this.company || this.serviceId) {
      this.companyList = [];
      this.company = '';
      this.battalion = '';
      this.serviceId = '';
      this.battalionId = '';
      this.companyId = '';
      this.getCadetsList();
    }
  }


  
  getCadetsList() {
    this.showSpinner = true;
    this.statusMsg = '';
    this.cadetList = []
    this.spinner.show();
    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company,this.serviceId).subscribe(
      res => {
        console.log(res);

        // let i = 0; //was using this for formarray

        if(res.status == "OK"){
          if(res.object){
            res.object.edossierPtResultFilterPayload.forEach(
              el => {
                // this.addCadetRecord(); //was using this for formarray
    
                let sot = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "SOT") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.maxMarks));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
              
    
    
                let subjArr = [sot];
                let sotTotal = 0;
                subjArr.forEach(el => {
                  let currentMarks;
                  if (el.lastAttemptType == 'M1') {
                    currentMarks = el.m1ObtainedMarks;
                  } else if (el.lastAttemptType == 'M2') {
                    currentMarks = el.m2ObtainedMarks;
                  } else if (el.lastAttemptType == 'C1') {
                    currentMarks = el.c1ObtainedMarks;
                  } else if (el.lastAttemptType == 'C2') {
                    currentMarks = el.c2ObtainedMarks;
                  }
                  sotTotal = currentMarks;
                })
    
    
    
                
                // subjArr.forEach(
                //   el => {
                //     this.addSubject(i)
                //   }
                // )   //was using this for formarray
    
    
                let cadetRecord = {
                  id: el.id,
                  serviceId: el.serviceId,
                  name: el.name,
                  battalian: el.battalian,
                  company: el.company,
                  rank: el.rank,
                  termId: el.termId,
                  termName: el.termName,
                  course: el.course,
                  courseSerNo: el.courseSerNo,
                  nationality: el.nationality,
    
                  edossierPtResult: {
                    clearedIn: el.edossierPtResult.clearedIn,
                    edossierPtSubjectResult: subjArr,
                    id: el.edossierPtResult.id,
                    obtainedMarks: el.edossierPtResult.obtainedMarks,
                    remarks: el.edossierPtResult.remarks,
                    serviceId: el.edossierPtResult.serviceId,
                    status: el.edossierPtResult.status,
                    subjectType: 'SOT',
                    termId: el.edossierPtResult.termId,
                    totalMarks: this.maxMarks,
                    //
                    sotTotal: sotTotal
                  }
                }
    
                this.cadetList.push(cadetRecord)
    
                // i++; //was using this for formarray
              }
    
            )
            this.spinner.hide();
            this.showSpinner = false;
    
          } else {
            this.spinner.hide();
            this.showSpinner = false;
            this.statusMsg = res.message;
            this.sharedService.openSnackbar(res.message);
          }

        }
      
    

      },
      error => {
        this.spinner.hide()
        this.sharedService.openSnackbar('Error')
      }
    )
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

  
  getSubjectRecord(sub, maxMarks) {
    let subject = {
      c1ObtainedMarks: sub.c1ObtainedMarks,
      c2ObtainedMarks: sub.c2ObtainedMarks,
      clearedIn: sub.clearedIn,
      id: sub.id,
      lastAttemptType: sub.lastAttemptType,
      m1ObtainedMarks: sub.m1ObtainedMarks,
      m2ObtainedMarks: sub.m2ObtainedMarks,
      resultGrade: sub.resultGrade,
      resultSubGrade: sub.resultSubGrade,
      serviceId: sub.serviceId,
      status: sub.status,
      subjectCategory: sub.subjectCategory,
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      subjectType: 'SOT',
      termId: sub.termId,
      totalMarks: maxMarks,
    }

    return subject;
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  patchNumbers(event, obj, i, j, type) {

    let value = event.target.value;
    if (value > obj.totalMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
      obj.resultGrade = '';
      if(type == 'M1'){
        obj.m1ObtainedMarks = ''
      } else if(type == 'M2'){
        obj.m2ObtainedMarks = ''
      } else if(type == 'C1'){
        obj.c1ObtainedMarks = ''
      } else if(type == 'C2'){
        obj.c2ObtainedMarks = ''
      }
      event.preventDefault();
      return false;
    } else {

      if (value) {

            if (value >= 12) {
              if (value == 30) {
                obj.resultGrade = 'S/EX-1';
              } else if (value < 30 && value >=28) {
                obj.resultGrade = 'S/EX-2';
              } else if (value < 28 && value >= 26) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 26 && value >= 24) {
                obj.resultGrade = 'EX';
              } else if (value < 24 && value >= 18) {
                obj.resultGrade = 'GOOD';
              } else if (value < 18 && value >= 12) {
                obj.resultGrade = 'SAT';
              }

              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }


            this.cadetList[i].edossierPtResult.sotTotal = value
            this.cadetList[i].edossierPtResult.obtainedMarks = value
           
        // if (type == 'M1') {
        //   console.log(this.cadetList[i])

        // } else if (type == 'M2') {
        //   console.log(this.cadetList[i])

        // } else if (type == 'C1') {
        //   console.log(this.cadetList[i])

        // } else if (type == 'C2') {
        //   console.log(this.cadetList[i])

        // }


      } else {
        this.cadetList[i].edossierPtResult.edossierPtSubjectResult[j].resultGrade = '';
        
        this.cadetList[i].edossierPtResult.sotTotal = value
        this.cadetList[i].edossierPtResult.obtainedMarks = value
      }


    }
  }

  
  submitResult() {
    // console.log(this.cadetList);
    this.spinner.show()
    this.service.savePTResults(this.cadetList).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
        console.log(res);
      },
      err=>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }



}
