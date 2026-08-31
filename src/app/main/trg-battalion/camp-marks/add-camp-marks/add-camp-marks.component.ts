import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'ms-add-camp-marks',
  templateUrl: './add-camp-marks.component.html',
  styleUrls: ['./add-camp-marks.component.scss']
})
export class AddCampMarksComponent implements OnInit {

  id: string = '';
  totalss: number = 0;
  cammarkForm: FormGroup = new FormGroup({});
  items: FormArray;
  pageTitle = "Add Camp Marks";
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

    this.cammarkForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      termId: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      subject: ['', Validators.required,],
      gcAppt: [{ disabled: true }, Validators.required],
      exerciseType: [{ disabled: true }, Validators.required],
      campSubjectResult: this.fb.array([]),
    })
  }

  public get getCSubjectRes() {
    return this.cammarkForm.get('campSubjectResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.cammarkForm.get('campSubjectResult') as FormArray;
  }

  genSubRec() {
    return this.fb.group({
      id: [''],
      campMarksSubId: [''],
      // obtainedMarks: [{value: '', disabled: true }, Validators.required,],
      obtainedMarks: [''],
      serviceId: [this.cammarkForm.value.serviceId],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [this.cammarkForm.value.termId],
      totalmarks: ['']
    })
  }
  genSubRec1() {
    return this.fb.group({
      //id: [''],
      // obtainedMarks: [{value: '', disabled: true }, Validators.required,],
      obtainedMarks: [''],
      serviceId: [this.serId],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [this.cammarkForm.value.termId],
      totalMarks: ['']
    })
  }
  displayedColumns: string[] = ['id', 'subjectName', 'totalMarks', 'MarksObtained'];
  dataSource;
  terms: any[] = [];
  exerciseType: any[] = [];
  gcappt: any[] = [];
  Campmarks: any[] = [];
  Campmark1: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  serId
  ngOnInit(): void {
    this.getAllGcappt()
    this.getExercisetype()
    if (this.router.url.includes('id')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
    }

    if (this.router.url.includes('add-campmark')) {
      this.spinner.show();
      this.pageTitle = 'Add Camp Marks'
      this.adminservice.getCampMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
           this.serId=res.object.serviceId
            this.spinner.hide();
            this.cammarkForm.patchValue({
              serviceId: res.object.serviceId,
              battalian: res.object.battalian,
              company: res.object.company,
              termSession: res.object.termSession,
              year: res.object.year,
              course: res.object.course,
              cadetRank: res.object.cadetRank,
              username: res.object.name,
              termId: res.object.term,
            })

          } else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )
    }
  }
  getExercisetype() {
    this.spinner.show();
    this.sharedservice.getAllExerciseType().subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide()
          this.exerciseType = res.object
          this.cdref.detectChanges();
        }
      }

    )
  }
  getAllGcappt() {
    this.spinner.show();
    this.sharedservice.getAllGcappt().subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.gcappt = res.object
          this.cdref.detectChanges();
        }
      }
    )
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
  campsubjid
  tempObj1: any = [];
  isShown: boolean = false;
  // Change to data add or edit case//
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
  changenew(e: any) {
    let frmArray = this.cammarkForm.get('campSubjectResult') as FormArray;
    frmArray.clear();
    this.serviceId = this.cammarkForm.value.serviceId
    this.termId = this.cammarkForm.value.termId
    this.spinner.show()
    this.adminservice.getSubjectMarks_List(this.serviceId, this.termId, e).subscribe(res => {
      if (res.message == "update") {
        this.mnc = "update"
        this.isShown = !this.isShown;
        this.spinner.hide()
        this.Campmark1 = res.object;
        this.updatetotalmarks = res.object.totalMarks;
        this.totalmarkst = res.object.totalObtainedMarks;
        this.obtainedmarks = res.object.CampSubjectResult;
        this.campsubjid = res.object.campMarksResultId;
        console.log(this.campsubjid, "campsubjid")
        let cmrks = res.object.CampSubjectResult;
        const campResult = this.sortArrayOfObjects(cmrks, "campMarksSubId", "ascending")
        cmrks.forEach(e => {
          e.id = e.campMarksSubId;
          console.log("eeee===>>", e);
          this.getCSubjectRes.push(this.genSubRec())
        });
        this.cammarkForm.patchValue({
          campSubjectResult: campResult
        })

        console.log(this.obtainedmarks, "obtainedmarks")
        this.dataSource = new MatTableDataSource(res.object.CampSubjectResult);
        this.cammarkForm.patchValue({
          remarks: res.object.remarks,
          gcAppt: res.object.gcAppt,
        })
        this.tempArr1 = [];
        this.cdref.detectChanges();
      }
      else if (res.message == "add") {

        this.spinner.hide()
        this.totalmarkst = 0;
        this.cammarkForm.value.campSubjectResult = []
        this.mnc = "add";
        this.isShown = true
        this.Campmarks = res.object;
        let cmrks = res.object;
        const campResult = this.sortArrayOfObjects(cmrks, "campMarksSubId", "ascending")
        cmrks.forEach(e => {
          e.subjectId=e.id;
          console.log("eeee===>>", e);
          this.getCSubjectRes1.push(this.genSubRec1())
        });
        this.cammarkForm.patchValue({
          campSubjectResult: campResult
        })
        this.cammarkForm.controls['subject'].setValue('');
        this.cammarkForm.controls['gcAppt'].setValue('');
        this.cammarkForm.controls['remarks'].setValue('');
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
  onChange(value, totalMarks, index) {
    console.log(value, "value")
    console.log(totalMarks, "totalMarks")
    console.log(index, "index")

    if (value > totalMarks || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained Marks is greater then TotalMarks");
      // this.cammarkForm[index]['subject'].setValue('');
    this.getCSubjectRes1.controls[index].get('obtainedMarks').setValue('');

      console.log(value, "index=", +index);
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
  isError
  submit() {
   {
      var indexT = 0;
      // this.Campmarks.forEach(weapon => {
      //   var test = {
      //     subjectId: weapon.id,
      //     serviceId: this.cammarkForm.value.serviceId,
      //     obtainedMarks: this.tempArr[indexT],
      //     termId: 1,
      //     totalMarks: weapon.totalMarks,
      //     status: 1
      //   }
      //   this.cammarkForm.value.campSubjectResult.push(test);
      //   indexT++;
      // })
      this.totalMarks = Object.assign({}, this.cammarkForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.getTotal(), status: 1, termId:this.cammarkForm.value.termId });
      // console.log(this.totalMarks, "final")
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
      for (let i = 0; i < formdata.campSubjectResult.length; i++) {
        delete formdata.campSubjectResult[i].subjectName
        }

      console.log(formdata, "finalresult");
      this.cammarkForm.value.campSubjectResult = [];
      this.tempArr = [];
      this.adminservice.addCammarks(formdata).subscribe(
        res => {
          if (res.message == 'OK') {
            this.adminservice.openSnackbar("Camp Marks Added Successfully");
          }
          err => {
            this.adminservice.openSnackbar("Some Error Occured.");
          }
        }
      )
      if (this.router.url.includes('trg-battalion'))
        if (this.router.url.includes('trg-battalion'))
          this.router.navigate(['/main/trg-battalion/camp-marks']);
      if (this.router.url.includes('admin'))
        this.router.navigate(['/main/admin/trg-battalion/camp-marks']);
     }
  }

  totalMarks1
  confirm() {
    var indexT = 0;
    this.cammarkForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.cammarkForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId:this.cammarkForm.value.termId, id: this.campsubjid });
    // this.totalMarks1.exerciseType = 2
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
    this.cammarkForm.value.campSubjectResult = [];
    // console.log(formdata)
    // console.log(this.cammarkForm.value.exerciseType, 'kkkkk')
    // this.cammarkForm.value.gcAppt = 2
    // this.cammarkForm.controls['gcAppt'].setValue('2');
    this.adminservice.updateCammarks(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Camp Marks Updated Successfully");
        }
        else {
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }

        }
      }
    )
    if (this.router.url.includes('trg-battalion'))
      if (this.router.url.includes('trg-battalion'))
        this.router.navigate(['/main/trg-battalion/camp-marks']);
    if (this.router.url.includes('admin'))
      this.router.navigate(['/main/admin/trg-battalion/camp-marks']);
  }
}
