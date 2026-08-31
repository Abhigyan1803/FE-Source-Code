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
import { Subject } from 'rxjs';

@Component({
  selector: 'ms-add-oq-matrix',
  templateUrl: './add-oq-matrix.component.html',
  styleUrls: ['./add-oq-matrix.component.scss']
})
export class AddOQMatrixComponent implements OnInit {

  id: string = '';
  oqmatrixForm: FormGroup = new FormGroup({});
  pageTitle = "Add OQ Matrix";

  actionType = 'add';

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private academicservice: AcademicDeptService,
    private cdref: ChangeDetectorRef) {

    this.oqmatrixForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      term: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      academicOqMatrixSubjectResult: this.fb.array([]),
    })
  }

  public get fetchOQMatrixSubjectsResult() {
    return this.oqmatrixForm.get('academicOqMatrixSubjectResult') as FormArray;
  }

  generateSubjects() {
    return this.fb.group({
      // id: [''],
      subjectCategory: [''],
      subjectName: [''],
      status: [''],
      subjectId: [''],
      totalMarks: [''],
      obtainedMarks: [''],
      serviceId: [this.oqmatrixForm.value.serviceId],
      termId: [this.oqmatrixForm.value.term],
    })
  }

  generateUpdateSubjects() {
    return this.fb.group({
      id: [''],
      subjectCategory: [''],
      subjectName: [''],
      status: [''],
      subjectId: [''],
      totalMarks: [''],
      obtainedMarks: [''],
      serviceId: [this.oqmatrixForm.value.serviceId],
      termId: [this.oqmatrixForm.value.term],
    })
  }

  dataSource;
  OQMatrixMarks: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.router.url.includes('id')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
    }

    if (this.router.url.includes('add-oq-matrix')) {
      this.spinner.show();
      this.pageTitle = 'Add OQ Matrix'
      this.adminservice.getCampMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.oqmatrixForm.patchValue({
              serviceId: res.object.serviceId,
              battalian: res.object.battalian,
              company: res.object.company,
              termSession: res.object.termSession,
              year: res.object.year,
              course: res.object.course,
              subject: res.object.subject,
              cadetRank: res.object.cadetRank,
              username: res.object.name,
              term: res.object.term,
            })
            this.getOQMatrixSubjects();
          } else {
            this.adminservice.openSnackbar(res.message)
            this.spinner.hide();
          }
        }
      )
    }
  }

  serviceId
  termId
  obtainedMarks: any[] = []
  updateTotalMarks
  isShown: boolean = false;

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

  rowID;
  mnc = "add"
  getOQMatrixSubjects() {
    let frmArray = this.oqmatrixForm.get('academicOqMatrixSubjectResult') as FormArray;
    frmArray.clear();

    this.serviceId = this.oqmatrixForm.value.serviceId;
    this.termId = this.oqmatrixForm.value.term;
    this.spinner.show();

    this.academicservice.getSubjectOQMatrix_List(this.serviceId, this.termId).subscribe(res => {
      if (res.message == "update") {
        this.mnc = "update"
        this.isShown = !this.isShown;
        this.spinner.hide();

        this.actionType = res.message;
        this.OQMatrixMarks = res.object.academicOqMatrixSubjectResult;
        this.obtainedTotalMarks = res.object.obtainedMarks;
        this.updateTotalMarks = res.object.totalMarks;
        this.rowID = res.object.id;

        let oqm_mrks = res.object.academicOqMatrixSubjectResult;
        const oqm_Result = this.sortArrayOfObjects(oqm_mrks, "subjectId", "ascending");

        oqm_mrks.forEach(e => {
          e.subjectId = e.id;
          this.fetchOQMatrixSubjectsResult.push(this.generateUpdateSubjects());
        });

        this.oqmatrixForm.patchValue({
          academicOqMatrixSubjectResult: oqm_Result,
          remarks: res.object.remarks
        });

        this.dataSource = new MatTableDataSource(res.object.academicOqMatrixSubjectResult);
        this.cdref.detectChanges();

      } else if (res.message == "add") {
        this.spinner.hide();
        this.mnc = "add";
        this.actionType = res.message;
        this.obtainedTotalMarks = 0;
        this.oqmatrixForm.value.academicOqMatrixSubjectResult = [];
        this.isShown = true;
        this.OQMatrixMarks = res.object;

        let oqm_mrks = res.object;
        const oqmResult = this.sortArrayOfObjects(oqm_mrks, "id", "ascending");

        oqm_mrks.forEach(e => {
          e.subjectId = e.id;
          this.fetchOQMatrixSubjectsResult.push(this.generateSubjects());
        });

        this.oqmatrixForm.patchValue({
          academicOqMatrixSubjectResult: oqmResult
        });

        this.oqmatrixForm.controls['subject'].setValue('');
        this.oqmatrixForm.controls['remarks'].setValue('');
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
    return this.OQMatrixMarks.map(t => t.totalMarks).reduce((acc, value) => acc + value, 0);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  viewOQMatrix(element) {
    if (this.router.url.includes('main/academic-depart/examination/assessment'))
      this.router.navigate(['/main/admin/academic-depart/examination/assessment/oq-matrix/view-oq-matrix'], { queryParams: { id: element.id } })
  }

  obtainedTotalMarks: number = 0;
  onChange(value, totalMarks, index) {
    if (value > totalMarks || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      this.fetchOQMatrixSubjectsResult.controls[index].get('obtainedMarks').setValue('');
      value = 0;
    }

    this.obtainedTotalMarks += parseInt(value);
  }

  onFocusEvent(val) {
    if (val == NaN || val == '' || val == undefined) {
      val = 0;
    }
    this.obtainedTotalMarks -= parseInt(val);
    if (this.obtainedTotalMarks == NaN) {
      this.obtainedTotalMarks = 0;
    }
  }

  totalMarks
  submit() {
    this.totalMarks = Object.assign({}, this.oqmatrixForm.value, { obtainedMarks: this.obtainedTotalMarks, totalMarks: this.getTotal(), status: 1, termId: 1 });
    var formdata = this.totalMarks;

    this.academicservice.addOQMatrix(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("OQ Matrix added successfully");

          delete formdata.battalian;
          delete formdata.cadetRank;
          delete formdata.company;
          delete formdata.course;
          delete formdata.termSession;
          delete formdata.subject;
          delete formdata.term;
          delete formdata.username;
          for (let i = 0; i < formdata.academicOqMatrixSubjectResult.length; i++) {
            delete formdata.academicOqMatrixSubjectResult[i].subjectName
          }

          this.oqmatrixForm.value.academicOqMatrixSubjectResult = [];
        }
      },
      err => {
        this.adminservice.openSnackbar("Some Error Occured.");
      }
    )
    if (this.router.url.includes('academic-depart'))
      this.router.navigate(['/main/academic-depart/examination/Assessment/oq-matrix']);
    // if (this.router.url.includes('admin'))
    //   this.router.navigate(['/main/admin/academic-depart/examination/assessment/oq-matrix']);
  }

  totalMarks1
  confirm() {
    this.oqmatrixForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.oqmatrixForm.value, { obtainedMarks: this.obtainedTotalMarks, totalMarks: this.updateTotalMarks, status: 1, termId: 1, id: this.rowID });
    var formdata = this.totalMarks1;

    this.academicservice.updateOQMatrix(formdata).subscribe(
      res => {
        if (res.message == "Record updated successfull") {
          this.adminservice.openSnackbar("OQ Matrix updated successfully");

          delete formdata.battalian;
          delete formdata.cadetRank;
          delete formdata.company;
          delete formdata.course;
          delete formdata.termSession;
          delete formdata.subject;
          delete formdata.term;
          delete formdata.username;
          this.oqmatrixForm.value.academicOqMatrixSubjectResult = [];
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
      this.router.navigate(['/main/academic-depart/examination/Assessment/oq-matrix']);
    // if (this.router.url.includes('admin'))
    //   this.router.navigate(['/main/admin/academic-depart/examination/assessment/oq-matrix']);
  }
}
