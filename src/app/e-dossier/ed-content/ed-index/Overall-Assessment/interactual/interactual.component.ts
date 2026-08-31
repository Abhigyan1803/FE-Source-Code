import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-interactual',
  templateUrl: './interactual.component.html',
  styleUrls: ['./interactual.component.scss']
})
export class InteractualComponent implements OnInit {
  leaderShipList;
  id: string = '';
  termid: string = '';
  interactualForm: FormGroup = new FormGroup({});
  serId: any;
  serviceId;
  totalss: number = 0;
  dRILLAttemptResult1: any;
  intTermId
  termId
  Campmarks1
  updateobtainedmarks
  mnc = ""
  obtainedmarks: any[] = []
  updatetotalmarks
  test1
  tempArr1: any = [];
  drilleditid
  tempObj1: any = [];
  isEnabled: boolean = true;
  isShow: boolean = false;
  totalmarkst: number = 0;
  totalmarks1: number = 0;
  totalmarkst1: number = 0;
  totalmarkst2: number = 0;
  updatetotalmarks1;
  updatetotalmarks2;
  drillResult;
  totalMarks;
  obj;
  obtainedMarks;
  subjectId;
  status;

  intellectualSkillsSubResult: any[] = [];
  Id;
  midObtainedMarks;
  midTotalMarks;
  intellectualCadetList;
  drilleditid1;
  drilleditid2;
  intellectualSkillsSubResult1: any;
  finalTotalMarks1: any;
  finalObtainedMarks1: any;
  midObtainedMarks1: any;
  midTotalMarks1: any;
  finalTotalMarks2: any;
  finalObtainedMarks2: any;
  midObtainedMarks2: any;
  midTotalMarks2: any;
  intellectualSkillsSubResult2: any;
  midTotalMarks7: any;
  midObtainedMarks7: any;
  intellectualSkillsSubResult7: any;
  finalObtainedMarks7: any;
  finalTotalMarks7: any;
  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private EDossierService: EDossierService) {



    this.Id = this.route.snapshot.queryParamMap.get('Id');
    this.termId = this.route.snapshot.queryParamMap.get('termId');

    this.interactualForm = this.fb.group({
      finalObtainedMarks: ['', Validators.required],
      finalTotalMarks: ['', Validators.required],
      id: ['', Validators.required],
      midObtainedMarks: ['', Validators.required],
      midTotalMarks: ['', Validators.required],
      serviceId: ['',],
      subjectId: [''],
      status: [''],
      termId: [''],
      intellectualSkillsSubResult: [''],
    })
  }
  public get getCSubjectRes() {
    return this.interactualForm.get('intellectualSkillsSubResult') as FormArray;
  }

  genSubRec() {
    return this.fb.group({
      id: [''],
      obtainedMarks: [''],
      serviceId: [''],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [''],
      totalMarks: [''],

    })
  }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("interactualServiceID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("interactualName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("interactualComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("interactualBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("lvetid")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("interactualtName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("interactualrank")).value = localStorage.getItem("rank");

  }


  ngAfterViewInit() {
    // this.getAssignments()
    this.getEdossier()
  }

  goBack() {
    window.history.back()
  }


 
  finalTotalMarks;
  finalObtainedMarks;
  getEdossier() {
    // this.spinner.show();

    this.EDossierService.getEDossierInteractualMarks(this.Id).subscribe(res => {
      console.log(res);
     
      if (res.message == "Record not found") {
        this.adminservice.openSnackbar("Record not found");
        this.isShow = true;
        this.isEnabled = false;
      } else if (res.status == "OK") {
          this.obj = res.object;

        if(this.termId==1 || this.termId == 2 || this.termId == 3){
          this.finalTotalMarks = res.object[0].finalTotalMarks,
            this.finalObtainedMarks = res.object[0].finalObtainedMarks,
            this.drilleditid1 = res.object[0].id;
          let cmrks = res.object[0].intellectualSkillsSubResult;

          this.intellectualSkillsSubResult = res.object[0].intellectualSkillsSubResult;
          console.log(this.intellectualSkillsSubResult, '-->intellectualSkillsSubResult');

          this.interactualForm.patchValue({
            finalTotalMarks: res.object[0].finalTotalMarks,
            id: this.obj[0].id,
            midObtainedMarks: this.obj[0].midObtainedMarks,
            midTotalMarks: this.obj[0].midTotalMarks,
            serviceId: this.obj[0].serviceId,
            subjectId: this.obj[0].subjectId,
            status: this.obj[0].status,
            termId: this.obj[0].termId,
            intellectualSkillsSubResult: this.obj[0].intellectualSkillsSubResult
          })
          this.midObtainedMarks = this.obj[0].midObtainedMarks;
          console.log(this.midObtainedMarks, 'this.obj[0].midObtainedMarks');

          this.midTotalMarks = this.obj[0].midTotalMarks;
          console.log(this.midTotalMarks, 'this.obj[0].midObtainedMarks');
        }

        if(this.termId == 2 || this.termId == 3){
          this.finalTotalMarks1 = res.object[1].finalTotalMarks,
            this.finalObtainedMarks1 = res.object[1].finalObtainedMarks,
            this.drilleditid1 = res.object[1].id;
          let cmrks = res.object[1].intellectualSkillsSubResult;

          this.intellectualSkillsSubResult1 = res.object[1].intellectualSkillsSubResult;
          console.log(this.intellectualSkillsSubResult, '-->intellectualSkillsSubResult');

          this.interactualForm.patchValue({
            finalTotalMarks1: res.object[1].finalTotalMarks,
            id: this.obj[1].id,
            midObtainedMarks1: this.obj[1].midObtainedMarks,
            midTotalMarks1: this.obj[1].midTotalMarks,
            serviceId: this.obj[1].serviceId,
            subjectId: this.obj[1].subjectId,
            status: this.obj[1].status,
            termId: this.obj[1].termId,
            intellectualSkillsSubResult1: this.obj[1].intellectualSkillsSubResult
          })
          this.midObtainedMarks1 = this.obj[1].midObtainedMarks;
          console.log(this.midObtainedMarks, 'this.obj[1].midObtainedMarks');

          this.midTotalMarks1 = this.obj[1].midTotalMarks;
          console.log(this.midTotalMarks, 'this.obj[0].midObtainedMarks');
        }

        if(this.termId == 7 || this.termId == 3){
          this.finalTotalMarks7 = res.object[1].finalTotalMarks,
            this.finalObtainedMarks7 = res.object[1].finalObtainedMarks,
            this.drilleditid1 = res.object[1].id;
          let cmrks = res.object[1].intellectualSkillsSubResult;

          this.intellectualSkillsSubResult7 = res.object[1].intellectualSkillsSubResult;
          console.log(this.intellectualSkillsSubResult, '-->intellectualSkillsSubResult');

          this.interactualForm.patchValue({
            finalTotalMarks7: res.object[1].finalTotalMarks,
            id: this.obj[1].id,
            midObtainedMarks7: this.obj[1].midObtainedMarks,
            midTotalMarks7: this.obj[1].midTotalMarks,
            serviceId: this.obj[1].serviceId,
            subjectId: this.obj[1].subjectId,
            status: this.obj[1].status,
            termId: this.obj[1].termId,
            intellectualSkillsSubResult7: this.obj[1].intellectualSkillsSubResult
          })
          this.midObtainedMarks7 = this.obj[1].midObtainedMarks;
          console.log(this.midObtainedMarks, 'this.obj[1].midObtainedMarks');

          this.midTotalMarks7 = this.obj[1].midTotalMarks;
          console.log(this.midTotalMarks, 'this.obj[1].midObtainedMarks');
        }

        if(this.termId == 3){
          this.finalTotalMarks2 = res.object[2].finalTotalMarks,
            this.finalObtainedMarks2 = res.object[2].finalObtainedMarks,
            this.drilleditid1 = res.object[2].id;
          let cmrks = res.object[2].intellectualSkillsSubResult;

          this.intellectualSkillsSubResult2 = res.object[2].intellectualSkillsSubResult;
          console.log(this.intellectualSkillsSubResult2, '-->intellectualSkillsSubResult');

          this.interactualForm.patchValue({
            finalTotalMarks2: res.object[2].finalTotalMarks,
            id: this.obj[2].id,
            midObtainedMarks2: this.obj[2].midObtainedMarks,
            midTotalMarks2: this.obj[2].midTotalMarks,
            serviceId: this.obj[2].serviceId,
            subjectId: this.obj[2].subjectId,
            status: this.obj[2].status,
            termId: this.obj[2].termId,
            intellectualSkillsSubResult2: this.obj[2].intellectualSkillsSubResult
          })
          this.midObtainedMarks2 = this.obj[2].midObtainedMarks;
          console.log(this.midObtainedMarks2, 'this.obj[2].midObtainedMarks');

          this.midTotalMarks2 = this.obj[2].midTotalMarks;
          console.log(this.midTotalMarks2, 'this.obj[2].midObtainedMarks');
        }
      }

    })
  }






  obtainedTotalMarks: number = 0;
  totalMarks1;
  onChange(value, totalMarks, sub_id, mainIndex, subIndex) {
    if (value > totalMarks || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
    }
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
      this.leaderShipList[mainIndex].academicLeadershipMatrixResult.obtainedMarks = parseInt(total) + (value == '' ? 0 : parseInt(value));
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.leaderShipList[mainIndex].academicLeadershipMatrixResult.obtainedMarks = (value == '' ? 0 : parseInt(value));
    }
    this.leaderShipList[mainIndex].academicLeadershipMatrixResult.leadershipSubjectResult[subIndex].obtainedMarks = value;
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.leaderShipList);
    this.leaderShipList
  }



  onFocusEvent(value, mainIndex) {
    console.log(value + '==' + mainIndex);
    if (value == NaN || value == '' || value == undefined) {
      value = 0;
    }
    var total = (<HTMLInputElement>document.getElementById(mainIndex)).value;
    if (total) {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = parseInt(total) + parseInt(value) + "";
      this.leaderShipList[mainIndex].academicLeadershipMatrixResult.obtainedMarks = parseInt(total) - parseInt(value);
    } else {
      (<HTMLInputElement>document.getElementById(mainIndex)).value = value;
      this.leaderShipList[mainIndex].academicLeadershipMatrixResult.obtainedMarks = value;
    }
    // this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
    }
  }


  // confirm(termid) {
  //   // this.spinner.show();
  //   console.log(this.interactualForm);
  //   // return false;
  //   console.log(this.drilleditid1, "drilleditid")
  //   var indexT = 0;
  //   this.interactualForm.value == this.totalMarks1
  //   var drilleditid;
  //   if(termid==1){
  //     drilleditid=this.drilleditid1;
  //   }
  //   if(termid==2){
  //     drilleditid=this.drilleditid2;
  //   }
  //   this.totalMarks1 = Object.assign({}, this.interactualForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId: this.intTermId, id: drilleditid });
  //   var formdata = this.totalMarks1
  //   if (termid == 1) {
  //     delete formdata.leadershipSubjectResult2
  //     delete formdata.leadershipSubjectResult3
  //     formdata.leadershipSubjectResult = formdata.leadershipSubjectResult
  //   }
  //   if (termid == 2) {
  //     delete formdata.leadershipSubjectResult
  //     //delete formdata.leadershipSubjectResult2
  //     delete formdata.leadershipSubjectResult3
  //     formdata.leadershipSubjectResult = formdata.leadershipSubjectResult2
  //     delete formdata.leadershipSubjectResult2
  //   }
  //   if (termid == 3) {
  //     delete formdata.leadershipSubjectResult
  //     delete formdata.leadershipSubjectResult2
  //     formdata.leadershipSubjectResult = formdata.leadershipSubjectResult3
  //     delete formdata.leadershipSubjectResult3

  //   }
  //   delete formdata.battalian;
  //   delete formdata.cadetRank;
  //   delete formdata.company;
  //   delete formdata.course;
  //   delete formdata.subject;
  //   delete formdata.termSession;
  //   delete formdata.subject;
  //   delete formdata.term;
  //   delete formdata.username;
  //   delete formdata.subject1;
  //   delete formdata.grading;
  //   delete formdata.attempt;
  //   this.interactualForm.value.leadershipSubjectResult = [];
  //   console.log(formdata, "all")
  //   this.edossierservice.updateLDMatrix(this.interactualForm.value).subscribe(
  //     res => {
  //       if (res.message == 'Record updated successfully') {
  //         this.spinner.hide()
  //         this.adminservice.openSnackbar("Leadership Development Matrix Updated Successfully");
  //       }
  //       else {
  //         err => {
  //           this.spinner.hide()
  //           this.adminservice.openSnackbar("Some Error Occured.");
  //         }

  //       }
  //     }
  //   )

  //   if (this.router.url.includes('adjutant-branch'))
  //       this.router.navigate(['/main/adjutant-branch/general-instruction/drill-competition/drill-marks']);

}

