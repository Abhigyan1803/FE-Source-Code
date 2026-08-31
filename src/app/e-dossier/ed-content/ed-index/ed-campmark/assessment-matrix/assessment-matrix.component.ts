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
  selector: 'ms-assessment-matrix',
  templateUrl: './assessment-matrix.component.html',
  styleUrls: ['./assessment-matrix.component.scss']
})
export class AssessmentMatrixComponent implements OnInit {

  id: string = '';
  termid: string = '';
  totalss: number = 0;
  drillForm: FormGroup = new FormGroup({});
  dRILLAttemptResult1: any;
  terid;
  serid;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute) {

    this.terid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("j");
    this.serid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("e");


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
      campSubjectResult: this.fb.array([]),
      campSubjectResult2: this.fb.array([]),
      campSubjectResult3: this.fb.array([]),



    })
  }

  public get getCSubjectRes() {
    return this.drillForm.get('campSubjectResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.drillForm.get('campSubjectResult') as FormArray;
  }
  public get getCSubjectRes2() {
    return this.drillForm.get('campSubjectResult2') as FormArray;
  }
  public get getCSubjectRes3() {
    return this.drillForm.get('campSubjectResult3') as FormArray;
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
  ngOnInit(): void {

    (<HTMLInputElement>document.getElementById("matrixID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("matrixName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("matrixComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("matrixBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("matrixTermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("matrixTermName")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("matrixRk")).value = localStorage.getItem("rank");




    this.spinner.show();
    if (this.router.url.includes('id'), ('termid')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      console.log(this.id, "termid")
      this.termid = this.route.snapshot.queryParamMap.get('termid');
    }
    if (this.router.url.includes('assessment-matrix')) {
      this.spinner.show();
      serviceId = "D/50158"
      var temId = 1

      this.adminservice.getRunback(serviceId, this.resultType, this.terid).subscribe(
        res => {
          if (res.message == "OK") {

            this.spinner.hide();
            this.routeTotal = res.object.totalMarks
            console.log(this.routeTotal, "routeTotal")
          } else {
            // this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )
      this.adminservice.getRunback(serviceId, this.resultType1, this.terid).subscribe(
        res => {
          if (res.message == "OK") {

            this.spinner.hide();
            this.runbackTotal = res.object.totalMarks
            this.sum = this.routeTotal + this.runbackTotal
            console.log(this.sum, "runbackTotal")

          } else {
            // this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )


      var getForm = {
        id: this.id,
        termid: this.termid
      }
      var serviceId = "D/50158"
      var termId = getForm.termid
      this.edossierservice.getEDossierAssessmentMatrix(serviceId).subscribe(
        res => {

          if (res.message == "OK") {
            this.mnc = "update"
            this.spinner.hide()
            this.Campmark1 = res.object;
            this.updatetotalmarks = res.object[0].totalMarks;
            this.totalmarkst = res.object[0].obtainedMarks;
            this.updatetotalmarks1 = res.object[1].totalMarks;
            this.totalmarkst1 = res.object[1].obtainedMarks;
            this.updatetotalmarks2 = res.object[2].totalMarks;
            this.totalmarkst2 = res.object[2].obtainedMarks;
            console.log(this.updatetotalmarks, "updatetotalmarks")
            console.log(this.totalmarkst, "totalmarkst")

            // this.obtainedmarks = res.object.CampSubjectResult;
            this.drilleditid = res.object[0].id;
            // console.log(this.Campmark1, "<<<<<")
            let cmrks = res.object[0].campSubjectResult;
            let cmrks1 = res.object[1].campSubjectResult;
            let cmrks2 = res.object[2].campSubjectResult;


            // const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")
            // console.log(cmrks, "<<<<<")
            // console.log(cmrks1, "<<<<<")


            cmrks.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes.push(this.genSubRec())

            });
            cmrks1.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes2.push(this.genSubRec())
            });
            cmrks2.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes3.push(this.genSubRec())
            });

            this.drillForm.patchValue({
              campSubjectResult: cmrks,
            })
            this.drillForm.patchValue({
              campSubjectResult2: cmrks1,
            })
            this.drillForm.patchValue({
              campSubjectResult3: cmrks2,
            })

            // console.log(this.obtainedmarks, "obtainedmarks")
            // this.dataSource = new MatTableDataSource(res.object.campSubjectResult);
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
  drilleditid
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

  onChange2(value, totalMarks1, index) {
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

  onFocusEvent2(value1) {
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
    console.log(termid, "tttt")
    this.drillForm.value.serviceId = this.serviceId
    var indexT = 0;
    this.drillForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.drillForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId: this.terid, id: this.drilleditid });
    var formdata = this.totalMarks1
    if (termid == 1) {
      delete formdata.campSubjectResult2
      delete formdata.campSubjectResult3
      formdata.campSubjectResult = formdata.campSubjectResult
    }
    if (termid == 2) {
      delete formdata.campSubjectResult
      //delete formdata.campSubjectResult2
      delete formdata.campSubjectResult3
      formdata.campSubjectResult = formdata.campSubjectResult2
      delete formdata.campSubjectResult2
    }
    if (termid == 3) {
      delete formdata.campSubjectResult
      delete formdata.campSubjectResult2
      formdata.campSubjectResult = formdata.campSubjectResult3
      delete formdata.campSubjectResult3

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
    this.drillForm.value.campSubjectResult = [];
    console.log(formdata, "all")
    this.adminservice.updateDrilmarks(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Drill Marks Updated Successfully");
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
}
