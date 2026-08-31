import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-credit-exellence',
  templateUrl: './add-credit-exellence.component.html',
  styleUrls: ['./add-credit-exellence.component.scss']
})
export class AddCreditExellenceComponent implements OnInit {

  id: string = '';
  termid: string = '';
  totalss: number = 0;
  creditForm: FormGroup = new FormGroup({});
  dRILLAttemptResult1: any;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef,private academicservice:AcademicDeptService,
    private activeRoute: ActivatedRoute) {

    this.creditForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      term: ['', Validators.required],
      creditExcellenceSubResult: this.fb.array([]),

    })
  }

  public get getCSubjectRes() {
    return this.creditForm.get('creditExcellenceSubResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.creditForm.get('creditExcellenceSubResult') as FormArray;
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
      totalMarks: ['']
    })
  }
  serId
  genSubRec1() {
    return this.fb.group({
      // id: [''],
      // drillType:[''],
      // obtainedMarks: [{value: '', disabled: true }, Validators.required,],
      obtainedMarks: [''],
      serviceId: [this.serId],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: ['1'],
      totalMarks: ['']
    })
  }


  displayedColumns: string[] = ['id', 'subjectName', 'totalMarks', 'MarksObtained'];
  dataSource;
  Campmarks: any[] = [];
  Campmark1: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.spinner.show();
    if (this.router.url.includes('id'), ('termid')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.termid = this.route.snapshot.queryParamMap.get('termid');
    }
    if (this.router.url.includes('add-credit')) {
      this.spinner.show();
      this.adminservice.getDrillMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.serId=res.object.serviceId
            console.log(this.serId,"id")
            this.spinner.hide();
            this.creditForm.patchValue({
              serviceId: res.object.serviceId,
              battalian: res.object.battalian,
              company: res.object.company,
              course: res.object.course,
              username: res.object.name,
              term: res.object.term,
            })
          } else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )


      var getForm = {
        id: this.id,
        termid: this.termid
      }
      var serviceId = getForm.id
      var termId = getForm.termid
      this.academicservice.getCreditExcellence(serviceId, termId).subscribe(
        res => {

          if (res.message == "update") {
            this.mnc = "update"
            this.spinner.hide()
            this.Campmark1 = res.object;
            this.updatetotalmarks = res.object.totalMarks;
            this.totalmarkst = res.object.obtainedMarks;
            // this.obtainedmarks = res.object.CampSubjectResult;
            this.drilleditid = res.object.id;
            console.log(this.Campmark1, "<<<<<")
            let cmrks = res.object.creditExcellenceSubResult;
            const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")

            cmrks.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes.push(this.genSubRec())
            });
            this.creditForm.patchValue({
              creditExcellenceSubResult: drillResult,
            })

            // console.log(this.obtainedmarks, "obtainedmarks")
            // this.dataSource = new MatTableDataSource(res.object.creditExcellenceSubResult);
            this.creditForm.patchValue({
              remarks: res.object.remarks,
            })
            this.tempArr1 = [];
            this.cdref.detectChanges();
          }
          else if (res.message == "add") {
            this.spinner.hide()
            this.totalmarkst = 0;
            // this.cammarkForm.value.campSubjectResult = []
            this.mnc = "add";
            this.Campmarks = res.object;
            this.creditForm.value.creditExcellenceSubResult = []
            this.mnc = "add";
            // this.isShown = true
            this.Campmarks = res.object;
            let cmrks = res.object;
            console.log("drill===>>", cmrks);
            const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")
            cmrks.forEach(e => {
              e.subjectId=e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes1.push(this.genSubRec1())
            });
            this.creditForm.patchValue({
              creditExcellenceSubResult: drillResult
            })
            this.dataSource = new MatTableDataSource(res.object);
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

  sortArrayOfObjects = <T>(
    data: T[],
    keyToSort: keyof T,
    direction: 'ascending' | 'descending' | 'none',
  ) => {
    if (direction === 'none') {
      return data
    }
    const compare = (objectA: T, objectB: T) => {
      const valueA = objectA[keyToSort]
      const valueB = objectB[keyToSort]

      if (valueA === valueB) {
        return 0
      }

      if (valueA > valueB) {
        return direction === 'ascending' ? 1 : -1
      } else {
        return direction === 'ascending' ? -1 : 1
      }
    }

    return data.slice().sort(compare)
  }

  serviceId
  termId
  Campmarks1
  updateobtainedmarks
  mnc = "add"
  obtainedmarks: any[] = []
  updatetotalmarks
  test1
  tempArr1: any = [];
  drilleditid
  tempObj1: any = [];
  // Change to data add or edit case//
  changenew(e: any) {
    let frmArray = this.creditForm.get('creditExcellenceSubResult') as FormArray;
    frmArray.clear();
    this.serviceId = this.creditForm.value.serviceId
    this.termId = this.creditForm.value.term
    this.spinner.show()
    this.adminservice.getSubjectMarks_List(this.serviceId, this.termId, e).subscribe(res => {
      if (res.message == "update") {
        this.mnc = "update"
        this.spinner.hide()
        this.Campmark1 = res.object;
        this.updatetotalmarks = res.object.totalMarks;
        this.totalmarkst = res.object.totalObtainedMarks;
        this.obtainedmarks = res.object.creditExcellenceSubResult;
        this.drilleditid = res.object.campMarksResultId;
        console.log(this.drilleditid, "drilleditid")
        let cmrks = res.object.creditExcellenceSubResult;
        cmrks.forEach(e => {
          e.id = e.campMarksSubId;
          console.log("eeee===>>", e);
          this.getCSubjectRes.push(this.genSubRec())
        });
        this.creditForm.patchValue({
          creditExcellenceSubResult: cmrks
        })

        console.log(this.obtainedmarks, "obtainedmarks")
        this.dataSource = new MatTableDataSource(res.object.creditExcellenceSubResult);
        this.creditForm.patchValue({
          remarks: res.object.remarks,
          gcAppt: res.object.gcAppt,
        })
        this.tempArr1 = [];
        this.cdref.detectChanges();
      }
      else if (res.message == "add") {
        this.spinner.hide()
        this.totalmarkst = 0;
        this.creditForm.value.creditExcellenceSubResult = []
        this.mnc = "add";
        this.Campmarks = res.object;
        this.creditForm.controls['subject'].setValue('');
        this.creditForm.controls['gcAppt'].setValue('');
        this.creditForm.controls['remarks'].setValue('');
        this.dataSource = new MatTableDataSource(res.object);
        this.cdref.detectChanges();
      }
    },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.");
      }
    )
  }
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
  totalmarks1: number = 0;
  test
  onChange(value, totalMarks,index) {
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

  submit() {
    if (this.creditForm.invalid) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else{

    var indexT = 0;
    // this.Campmarks.forEach(weapon => {
    //   var marksData = {
    //     subjectId: weapon.id,
    //     serviceId: this.creditForm.value.serviceId,
    //     obtainedMarks: this.tempArr[indexT],
    //     termId: 1,
    //     totalMarks: weapon.totalMark,
    //     status: 1,
    //   }
    //   this.creditForm.value.creditExcellenceSubResult.push(marksData);
    //   indexT++;
    //})
   console.log(this.creditForm.value,"hyyy")
    this.totalMarks = Object.assign({}, this.creditForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.getTotal(), status: 1, termId: 1 });
    var formdata = this.totalMarks
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
    this.creditForm.value.creditExcellenceSubResult = [];
    this.tempArr = [];
    // console.log(formdata,"final");
    for (let i = 0; i < formdata.creditExcellenceSubResult.length; i++) {
      delete formdata.creditExcellenceSubResult[i].subjectName
      }

    console.log(formdata, "finalresult");
    this.academicservice.addCreditExcellence(formdata).subscribe(
      res => {
        if (res.message == 'Record added succesfully') {
          this.adminservice.openSnackbar("Credit Of Exellence Added Successfully");
          // this.spinner.hide()
        }
        err => {
          // this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }
      }
    )
     if (this.router.url.includes('academic-depart'))
       this.router.navigate(['/main/academic-depart/examination/Assessment/Credit-for-Excellence']);
  }
}

  totalMarks1
  confirm() {
    var indexT = 0;
    this.creditForm.value == this.totalMarks1
    // var attemptGrading = {
    //   serviceId: this.creditForm.value.serviceId,
    //   attempt: this.creditForm.value.attempt,
    //   grading: this.creditForm.value.grading,
    //   termId: 1,
    //   status: 1,
    // }
    this.totalMarks1 = Object.assign({}, this.creditForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId: 1, id: this.drilleditid });
    
    // this.totalMarks1 = Object.assign({}, this.creditForm.value, { dRILLAttemptResult: attemptGrading });
    var formdata = this.totalMarks1
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
    this.creditForm.value.creditExcellenceSubResult = [];
    console.log(formdata)
    this.academicservice.updateCreditExcellence(formdata).subscribe(
      res => {
        if (res.message == 'Record updated successfully') {
          this.adminservice.openSnackbar("Credit Of Exellence Updated Successfully");
        }
        else {
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }

        }
      }
    )
    if (this.router.url.includes('academic-depart'))
        this.router.navigate(['/main/academic-depart/examination/Assessment/Credit-for-Excellence']);
  
  }
}
