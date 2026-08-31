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
  selector: 'ms-ed-leadership',
  templateUrl: './ed-leadership.component.html',
  styleUrls: ['./ed-leadership.component.scss']
})
export class EdLeadershipComponent implements OnInit {

  id: string = '';
  termid: string = '';
  totalss: number = 0;
  drillForm: FormGroup = new FormGroup({});
  dRILLAttemptResult1: any;
  listHead;
  mainHead;
  serid;
  intTermId;
  terid: string = '';
  cmrks;
  cmrks1;
  cmrks2;
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute) {

    this.serid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("e");
    this.terid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("j");
    console.log(this.terid, "juned id");

    this.intTermId = parseInt(this.terid);

    this.drillForm = this.fb.group({
      serviceId: [this.serid, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      term: ['', Validators.required],
      leadershipSubjectResult: this.fb.array([]),
      leadershipSubjectResult2: this.fb.array([]),
      leadershipSubjectResult3: this.fb.array([]),



    })
  }

  public get getCSubjectRes() {
    return this.drillForm.get('leadershipSubjectResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.drillForm.get('leadershipSubjectResult') as FormArray;
  }
  public get getCSubjectRes2() {
    return this.drillForm.get('leadershipSubjectResult2') as FormArray;
  }
  public get getCSubjectRes3() {
    return this.drillForm.get('leadershipSubjectResult3') as FormArray;
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
  serId
  displayedColumns: string[] = ['id', 'subjectName', 'totalMarks', 'MarksObtained'];
  dataSource;
  Campmarks: any[] = [];
  Campmark1: any[] = [];
  routeTotal
  runbackTotal
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultType = "Route March"
  resultType1 = "Runback"
  sum
  TermFetch;
  TermFetch1;
  TermFetch2;
  ngOnInit(): void {

    (<HTMLInputElement>document.getElementById("LcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("LbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("LcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("LcadetName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("LcadetRank")).value = localStorage.getItem("rank");
    (<HTMLInputElement>document.getElementById("Lcadettermname")).value = localStorage.getItem("termName");




    this.spinner.show();
    if (this.router.url.includes('id'), ('termid')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      console.log(this.id, "termid dj")
      this.termid = this.route.snapshot.queryParamMap.get('termid');
      console.log(this.termid, "termid termid")

    }
    if (this.router.url.includes('LeadershipMatrix')) {
      this.spinner.show();
      serviceId = "D/50158"
      var temId = 1

      // this.adminservice.getRunback(serviceId, this.resultType, temId).subscribe(
      //   res => {
      //     if (res.message == "OK") {

      //       this.spinner.hide();
      //       this.routeTotal = res.object.totalMarks
      //       console.log(this.routeTotal, "routeTotal")
      //     } else {
      //       // this.adminservice.openSnackbar(res.message)
      //       this.spinner.hide();
      //     }
      //   }
      // )
      // this.adminservice.getRunback(serviceId, this.resultType1, temId).subscribe(
      //   res => {
      //     if (res.message == "OK") {

      //       this.spinner.hide();
      //       this.runbackTotal = res.object.totalMarks
      //       this.sum = this.routeTotal + this.runbackTotal
      //       console.log(this.sum, "runbackTotal")

      //     } else {
      //       // this.adminservice.openSnackbar(res.message)
      //       this.spinner.hide();
      //     }
      //   }
      // )


      var getForm = {
        id: this.id,
        termid: this.termid
      }
      var serviceId = this.serid;
      var termId = getForm.termid
      this.edossierservice.getEDossierLeadershipMatrix(serviceId).subscribe(
        res => {

          if (res.message == "Record found successfully") {
            this.mnc = "update"
            this.spinner.hide()
            this.Campmark1 = res.object;
            this.updatetotalmarks = res.object[0].totalMarks;
            if (res.object[0]) {
            this.totalmarkst = res.object[0].obtainedMarks;
            }
            if (res.object[1]) {
            //this.updatetotalmarks1 = res.object[1].totalMarks;
            this.totalmarkst1 = res.object[1].obtainedMarks;
            }
            // this.updatetotalmarks2 = res.object[2].totalMarks;
            if (res.object[2]) {
            this.totalmarkst2 = res.object[2].obtainedMarks;
            }
            // console.log(this.updatetotalmarks, "updatetotalmarks")
            // console.log(this.totalmarkst, "totalmarkst")

            // this.obtainedmarks = res.object.leadershipSubjectResult;
            this.drilleditid1 = res.object[0].id;

            //this.drilleditid2 = res.object[1].id;
            console.log(this.Campmark1, "<<<<<")

            if (res.object[0]) {
              this.TermFetch = res.object[0].termId;
              this.cmrks = res.object[0].leadershipSubjectResult;
              this.cmrks.forEach(e => {
                e.id = e.id;
                console.log("eeee===>>", e);
                this.getCSubjectRes.push(this.genSubRec())

              });
            }
            if (res.object[1]) {
              this.cmrks1 = res.object[1].leadershipSubjectResult;
              this.TermFetch1 = res.object[1].termId;
              this.cmrks1.forEach(e => {
                e.id = e.id;
                console.log("eeee===>>", e);
                this.getCSubjectRes2.push(this.genSubRec())
              });
            }
            if (res.object[2]) {
              this.cmrks2 = res.object[2].leadershipSubjectResult;
              this.TermFetch2 = res.object[2].termId;
              this.cmrks2.forEach(e => {
                e.id = e.id;
                console.log("eeee===>>", e);
                this.getCSubjectRes3.push(this.genSubRec())
              });
            }

            // const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")
            // console.log(cmrks, "<<<<<")
            console.log(this.cmrks, "<<<<<")





            this.drillForm.patchValue({
              leadershipSubjectResult: this.cmrks,
            })
            this.drillForm.patchValue({
              leadershipSubjectResult2: this.cmrks1,
            })
            this.drillForm.patchValue({
              leadershipSubjectResult3: this.cmrks2,
            })

            // console.log(this.obtainedmarks, "obtainedmarks")
            // this.dataSource = new MatTableDataSource(res.object.leadershipSubjectResult);
            this.drillForm.patchValue({
              remarks: res.object.remarks,
            })
            this.tempArr1 = [];
            this.cdref.detectChanges();
          }

          else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )
    }
  }

  // sortArrayOfObjects = <T>(
  //   data: T[],
  //   keyToSort: keyof T,
  //   direction: 'ascending' | 'descending' | 'none',
  // ) => {
  //   if (direction === 'none') {
  //     return data
  //   }
  //   const compare = (objectA: T, objectB: T) => {
  //     const valueA = objectA[keyToSort]
  //     const valueB = objectB[keyToSort]

  //     if (valueA === valueB) {
  //       return 0
  //     }

  //     if (valueA > valueB) {
  //       return direction === 'ascending' ? 1 : -1
  //     } else {
  //       return direction === 'ascending' ? -1 : 1
  //     }
  //   }

  //   return data.slice().sort(compare)
  // }

  serviceId
  termId
  Campmarks1
  updateobtainedmarks
  mnc = "add"
  obtainedmarks: any[] = []
  updatetotalmarks
  updatetotalmarks1
  updatetotalmarks2


  test1
  tempArr1: any = [];
  drilleditid1
  drilleditid2
  tempObj1: any = [];
  // Change to data add or edit case//

  ngAfterViewInit() {
  }

  getTotal() {
    return this.Campmarks.map(t => t.totalMarks).reduce((acc, value) => acc + value, 0);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  viewCamp(element) {
    if (this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/admin/trg-battalion/camp-marks/view-camp-marks'], { queryParams: { id: element.id } })
    if (this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/admin/trg-battalion/camp-marks/view-camp-marks'], { queryParams: { id: element.id } })
  }
  totalmarkst: number = 0;
  totalmarkst1: number = 0;
  totalmarkst2: number = 0;


  totalmarks1: number = 0;
  test
  onChange(value, totalMarks, index) {
    console.log(value, "value")
    console.log(totalMarks, "totalMarks")
    console.log(index, "index")
    if (value > totalMarks || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained marks is greater then Total marks")
      this.getCSubjectRes1.controls[index].get('obtainedMarks').setValue('');

      // console.log(value, "index=", +index);
      value = 0
      // this.totalmarkst = 0
    }
    this.totalmarkst += parseInt(value);
    this.test = value
  }

  onFocusEvent(value1) {
    if (value1 == NaN || value1 == '' || value1 == undefined) {
      value1 = 0;
    }
    this.totalmarkst -= parseInt(value1);
    if (this.totalmarkst == NaN) {
      this.totalmarkst = 0
    }
    console.log(this.totalmarkst)

  }


  onChange1(value, totalMarks1, index) {
    console.log(value, "value")
    console.log(totalMarks1, "totalMarks1")
    console.log(index, "index")
    if (value > totalMarks1 || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained marks is greater then Total marks")
      this.getCSubjectRes2.controls[index].get('obtainedMarks').setValue('');
      value = 0
    }
    this.totalmarkst1 += parseInt(value);
    this.test = value
  }

  onFocusEvent1(value1) {
    if (value1 == NaN || value1 == '' || value1 == undefined) {
      value1 = 0;
    }
    this.totalmarkst1 -= parseInt(value1);
    if (this.totalmarkst1 == NaN) {
      this.totalmarkst1 = 0
    }
    console.log(this.totalmarkst1)

  }

  total
  totalmarks22
  subId
  subTotalMarks
  SubResultArr: any[] = [];
  totalMarks
  acx
  aa
  subjectmark
  tempArr = [];
  getMarks(i, e) {
    if (this.tempArr[i] == undefined || this.tempArr[i] == '') {
      this.tempArr.push(e);
    } else {
      this.tempArr[i] = e;
    }
  }
  attemptvalue
  attemptChange(e) {
    this.attemptvalue = e
  }
  dRILLAttemptResult
  isError;



  totalMarks1
  tempCampArr: any[] = [];

  confirm(termid) {
    this.spinner.show();
    console.log(this.drilleditid1, "drilleditid")
    var indexT = 0;
    this.drillForm.value == this.totalMarks1
    var drilleditid;
    if (termid == 1) {
      drilleditid = this.drilleditid1;
    }
    if (termid == 2) {
      drilleditid = this.drilleditid2;
    }
    this.totalMarks1 = Object.assign({}, this.drillForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId: this.intTermId, id: drilleditid });
    var formdata = this.totalMarks1
    if (termid == 1) {
      delete formdata.leadershipSubjectResult2
      delete formdata.leadershipSubjectResult3
      formdata.leadershipSubjectResult = formdata.leadershipSubjectResult
    }
    if (termid == 2) {
      delete formdata.leadershipSubjectResult
      //delete formdata.leadershipSubjectResult2
      delete formdata.leadershipSubjectResult3
      formdata.leadershipSubjectResult = formdata.leadershipSubjectResult2
      delete formdata.leadershipSubjectResult2
    }
    if (termid == 3) {
      delete formdata.leadershipSubjectResult
      delete formdata.leadershipSubjectResult2
      formdata.leadershipSubjectResult = formdata.leadershipSubjectResult3
      delete formdata.leadershipSubjectResult3

    }
    delete formdata.battalian;
    delete formdata.cadetRank;
    delete formdata.company;
    delete formdata.course;
    delete formdata.subject;
    delete formdata.termSession;
    delete formdata.subject;
    delete formdata.term;
    delete formdata.username;
    delete formdata.subject1;
    delete formdata.grading;
    delete formdata.attempt;
    this.drillForm.value.leadershipSubjectResult = [];
    console.log(formdata, "all")
    this.edossierservice.updateLDMatrix(formdata).subscribe(
      res => {
        if (res.message == 'Record updated successfully') {
          this.spinner.hide()
          this.adminservice.openSnackbar("Leadership Development Matrix Updated Successfully");
        }
        else {
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }

        }
      }
    )

    //   if (this.router.url.includes('adjutant-branch'))
    //       this.router.navigate(['/main/adjutant-branch/general-instruction/drill-competition/drill-marks']);

  }

  goBack() {
    window.history.back()
  }
  
}
