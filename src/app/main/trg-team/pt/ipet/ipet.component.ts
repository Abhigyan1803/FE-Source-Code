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
  selector: 'ms-ipet',
  templateUrl: './ipet.component.html',
  styleUrls: ['./ipet.component.scss']
})
export class IpetComponent implements OnInit {

  showSpinner:boolean; 
  statusMsg:string;

  attemtTypes: string[] = ['M1', 'M2', 'C1', 'C2'];

  term: string;
  termId: number;
  subject: string = 'IPET';

  cadetList: any[] = [];

  battalionList: [] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  //for Term I/II Tech
  _3rdClRope_mm: number;
  backRoll_mm: number;
  diveRoll_mm: number;
  beam2Rep_mm: number;
  aVaultIIIcl_mm: number;
  cwfRoll_mm: number;

  //for Term II (also includes 3rd cl rope and a vault)
  beam4Rep_mm: number;
  IIndClRope_mm: number;
  tVaultIIIcl_mm: number;

  //total marks
  totalMM;

  userDetails:any;
  localID;
  finalSubmissionDate:any;
  hasAccess:boolean = true;




  constructor(private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adminService: AdminService, private sharedService: SharedService,
    private delayDashboardService:DelayDashboardService,  @Inject(LOCALE_ID) localID: string
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

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

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Term') {
          this.termId = 2;

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else if (this.term == 'II Tech') {
          this.termId = 7;

          this.setAllMaxMarks()
          this.setTotalMarks()

        } else {
          this.sharedService.openSnackbar('Error')
          this.router.navigate(['/main/trg-team/dashboard'])
        }
        this.getCadetsList()
        this.getFinalSubmissionDates(this.termId)
      }
    )
    this.localID = localID

  }



  ngOnInit(): void {
    this.getBattalionList();
  }

  setAllMaxMarks() {
    if (this.termId == 1 || this.termId == 7) {

      this._3rdClRope_mm = 10;
      this.backRoll_mm = 5;
      this.diveRoll_mm = 5;
      this.beam2Rep_mm = 10;
      this.aVaultIIIcl_mm = 10;
      this.cwfRoll_mm = 10;

    } else if (this.termId == 2) {

      this._3rdClRope_mm = 10;
      this.beam4Rep_mm = 10;
      this.IIndClRope_mm = 10;
      this.tVaultIIIcl_mm = 10;
      this.aVaultIIIcl_mm = 10;

    }
  }

  setTotalMarks() {
    if (this.termId == 1 || this.termId == 7) {
      this.totalMM = this._3rdClRope_mm + this.backRoll_mm + this.diveRoll_mm + this.beam2Rep_mm + this.aVaultIIIcl_mm + this.cwfRoll_mm;
    } else if (this.termId == 2) {
      this.totalMM =  this._3rdClRope_mm + this.beam4Rep_mm + this.IIndClRope_mm + this.tVaultIIIcl_mm + this.aVaultIIIcl_mm;
    }
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
    this.service.getCadetsListForPTMarks(this.termId, this.subject, this.battalion, this.company, this.serviceId).subscribe(
      res => {
        console.log(res);

        // let i = 0; //was using this for formarray
        if(res.status == "OK"){
          if(res.object){
            res.object.edossierPtResultFilterPayload.forEach(
              el => {
    
                // this.addCadetRecord(); //was using this for formarray
               
                let subjArr:any[]=[];
    
                if (this.termId != 2) {
    
                  let _3rdClRope = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "3rd CL ROPE(3 MTR CLIMB)") {
                        Object.assign(sub, this.getSubjectRecord(sub, this._3rdClRope_mm, 4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  let backRoll = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "BACK ROLL") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.backRoll_mm,2));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
    
    
                  let diveRoll = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "DIVE ROLL") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.diveRoll_mm,4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  let beam2Repr = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "BEAM (2 REP)") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.beam2Rep_mm,4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                let aVault = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "A/VAULT (III CL)") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.aVaultIIIcl_mm,4));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
    
                let cwfRoll = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "CW/F/ROLL") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.cwfRoll_mm,4));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                
                subjArr = [_3rdClRope, backRoll, diveRoll, beam2Repr, aVault, cwfRoll];
    
    
                } else if(this.termId == 2){
    
                  
    
    
                  let _3rdClRope = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "III CL ROPE") {
                        Object.assign(sub, this.getSubjectRecord(sub, this._3rdClRope_mm,4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                  let beam4Rep = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "BEAM(4 REP)") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.beam4Rep_mm,4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                let aVault = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "A/VAULT (III CL)") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.aVaultIIIcl_mm,4));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
    
                  let IIndClRope = el.edossierPtResult.edossierPtSubjectResult.find(
                    sub => {
                      if (sub.subjectName === "II CL ROPE") {
                        Object.assign(sub, this.getSubjectRecord(sub, this.IIndClRope_mm,4));
                        delete sub.createdAt;
                        delete sub.updatedAt;
                        return sub;
                      }
                    }
                  )
    
                let tVaultIIIcl = el.edossierPtResult.edossierPtSubjectResult.find(
                  sub => {
                    if (sub.subjectName === "T/VAULT (III CL)") {
                      Object.assign(sub, this.getSubjectRecord(sub, this.tVaultIIIcl_mm,4));
                      delete sub.createdAt;
                      delete sub.updatedAt;
                      return sub;
                    }
                  }
                )
    
                
                subjArr = [_3rdClRope, beam4Rep, aVault, IIndClRope, tVaultIIIcl];
    
    
                }
    
    
    
    
    
    
    
    
                let ptTotal = 0;
                subjArr.forEach(
                  (el:any) => {
                    // console.log(el);
                    let currentMarks=0;
                    if (el.lastAttemptType == 'M1') {
                      if(el.m1ObtainedMarks)
                      currentMarks = parseInt(el.m1ObtainedMarks);
                      else 
                      currentMarks = 0;
              
                    } else if (el.lastAttemptType == 'M2') {
                      if(el.m2ObtainedMarks)
                      currentMarks = parseInt(el.m2ObtainedMarks);
                      else 
                      currentMarks = 0;
              
                    } else if (el.lastAttemptType == 'C1') {
                      if(el.c1ObtainedMarks)
                      currentMarks = parseInt(el.c1ObtainedMarks);
                      else 
                      currentMarks=0;
              
                    } else if (el.lastAttemptType == 'C2') {
                      if(el.c2ObtainedMarks)
                      currentMarks = parseInt(el.c2ObtainedMarks);
                      else 
                      currentMarks = 0;
              
                    }  else {
                      currentMarks = 0;
                    }
      
                    ptTotal = ptTotal + currentMarks;
      
                  }
                )
    
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
                    obtainedMarks: ptTotal,
                    remarks: el.edossierPtResult.remarks,
                    serviceId: el.edossierPtResult.serviceId,
                    status: el.edossierPtResult.status,
                    subjectType: 'IPET',
                    termId: el.edossierPtResult.termId,
                    totalMarks: this.totalMM,
                    //
                    ptTotalMarks: ptTotal
                  }
                }
    
                this.cadetList.push(cadetRecord)
    
                // i++; //was using this for formarray
              }
    
            )
        this.spinner.hide();
        this.showSpinner = false;

          
          } else {
            this.spinner.hide()
            this.showSpinner = false;
            this.sharedService.openSnackbar(res.message)
            this.statusMsg = res.message
          }
        }
        

      

      },
      error => {
        this.spinner.hide()
        this.sharedService.openSnackbar('No Records Available.')
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





  getSubjectRecord(sub, maxMarks, passingMarks) {
    let subject = {
      c1ObtainedMarks: sub.c1ObtainedMarks,
      c2ObtainedMarks: sub.c2ObtainedMarks,
      clearedIn: sub.clearedIn,
      id: sub.id,
      lastAttemptType: sub.lastAttemptType,
      m1ObtainedMarks: sub.m1ObtainedMarks,
      m2ObtainedMarks: sub.m2ObtainedMarks,
      maxMarks: maxMarks,
      resultGrade: sub.resultGrade,
      resultSubGrade: sub.resultSubGrade,
      serviceId: sub.serviceId,
      status: sub.status,
      subjectCategory: sub.subjectCategory,
      subjectId: sub.subjectId,
      subjectName: sub.subjectName,
      subjectType: 'IPET',
      termId: sub.termId,
      totalMarks: maxMarks,
      passingMarks:passingMarks
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
    if (value > obj.maxMarks || value < 0) {
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
        // if(type == 'M1'){
        //   obj.m1ObtainedMarks = value;
        // } else if(type == 'M2'){
        //    obj.m2ObtainedMarks = value;
        // } else if(type == 'C1'){
        //   obj.c1ObtainedMarks = value;
        // } else if(type == 'C2'){
        //   obj.c2ObtainedMarks = value;
        // }

        if(value >= obj.passingMarks){
          obj.resultGrade = 'Pass'
          obj.clearedIn = type;
        } else {
          obj.resultGrade = 'Fail'
        }

        this.calculateMarks(i);

      }else {
        this.cadetList[i].edossierPtResult.edossierPtSubjectResult[j].resultGrade = '';
        this.calculateMarks(i);
      }

    }
  
  
  }


  calculateMarks(i){
    
    let ptTotal = 0;
    this.cadetList[i].edossierPtResult.edossierPtSubjectResult.forEach(el=>{
        let currentMarks=0;
      if (el.lastAttemptType == 'M1') {
        if(el.m1ObtainedMarks)
        currentMarks = parseInt(el.m1ObtainedMarks);
        else 
        currentMarks = 0;

      } else if (el.lastAttemptType == 'M2') {
        if(el.m2ObtainedMarks)
        currentMarks = parseInt(el.m2ObtainedMarks);
        else 
        currentMarks = 0;

      } else if (el.lastAttemptType == 'C1') {
        if(el.c1ObtainedMarks)
        currentMarks = parseInt(el.c1ObtainedMarks);
        else 
        currentMarks=0;

      } else if (el.lastAttemptType == 'C2') {
        if(el.c2ObtainedMarks)
        currentMarks = parseInt(el.c2ObtainedMarks);
        else 
        currentMarks = 0;

      }  else {
        currentMarks = 0;
      }
      ptTotal = ptTotal + currentMarks
      })
      
      this.cadetList[i].edossierPtResult.ptTotalMarks = ptTotal
      this.cadetList[i].edossierPtResult.obtainedMarks = ptTotal

  }


  submitResult() { 
    
    console.log(this.cadetList);

    this.spinner.show()
    this.service.savePTResults(this.cadetList).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
        // console.log(res);
      },
      err=>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured!")
      }
    )

  }


}
