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
  selector: 'ms-add-leadership-development-matrix',
  templateUrl: './add-leadership-development-matrix.component.html',
  styleUrls: ['./add-leadership-development-matrix.component.scss']
})
export class AddLDMatrixComponent implements OnInit {

  id: string = '';
  LDMatrixForm: FormGroup = new FormGroup({});
  pageTitle = "Add Leadership Development Matrix";

  actionType = 'add';

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private academicservice: AcademicDeptService,
    private cdref: ChangeDetectorRef) {

    this.LDMatrixForm = this.fb.group({
      serviceId: [{ disabled: true }, Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      term: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      leadershipSubjectResult: this.fb.array([]),
    })
  }

  public get fetchLDMatrixSubjectsResult() {
    return this.LDMatrixForm.get('leadershipSubjectResult') as FormArray;
  }

  generateSubjects() {
    return this.fb.group({
      subjectId: [''],
      subjectName: [''],
      status: [''],
      totalMarks: [''],
      obtainedMarks: [''],
      serviceId: [this.LDMatrixForm.value.serviceId],
      termId: [this.LDMatrixForm.value.term],
    })
  }

  generateUpdatedSubjects() {
    return this.fb.group({
      id: [''],
      subjectId: [''],
      subjectName: [''],
      status: [''],
      totalMarks: [''],
      obtainedMarks: [''],
      serviceId: [this.LDMatrixForm.value.serviceId],
      termId: [this.LDMatrixForm.value.term],
    })
  }

  dataSource;
  LDMatrixMarks: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.router.url.includes('id')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
    }

    if (this.router.url.includes('add-leadership-development-matrix')) {
      this.spinner.show();
      this.pageTitle = 'Add Leadership Development Matrix'
      this.adminservice.getCampMarks(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.LDMatrixForm.patchValue({
              serviceId: res.object.serviceId,
              battalian: res.object.battalian,
              company: res.object.company,
              termSession: res.object.termSession,
              year: res.object.year,
              course: res.object.course,
              cadetRank: res.object.cadetRank,
              username: res.object.name,
              term: 3,
            })
            this.getLDMatrixSubjects();
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
  obtainedmarks: any[] = []
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
  getLDMatrixSubjects() {
    let frmArray = this.LDMatrixForm.get('leadershipSubjectResult') as FormArray;
    frmArray.clear();

    this.serviceId = this.LDMatrixForm.value.serviceId;
    this.termId = this.LDMatrixForm.value.term;
    this.spinner.show();

    this.academicservice.getSubjectLDMatrix_List(this.serviceId, this.termId).subscribe(res => {
      if (res.message == "update") {
        this.isShown = !this.isShown;
        this.spinner.hide();
        this.mnc = "update"
        this.actionType = res.message;
        this.LDMatrixMarks = res.object.leadershipSubjectResult;
        this.obtainedTotalMarks = res.object.obtainedMarks;
        this.updateTotalMarks = res.object.totalMarks;
        this.rowID = res.object.id;

        let ldm_mrks = res.object.leadershipSubjectResult;
        const ldm_Result = this.sortArrayOfObjects(ldm_mrks, "subjectId", "ascending");

        ldm_mrks.forEach(e => {
          e.subjectId = e.id;
          this.fetchLDMatrixSubjectsResult.push(this.generateUpdatedSubjects())
        });

        this.LDMatrixForm.patchValue({
          leadershipSubjectResult: ldm_Result,
          remarks: res.object.remarks
        })

        this.dataSource = new MatTableDataSource(res.object.CampSubjectResult);
        this.cdref.detectChanges();

      } else if (res.message == "add") {
        this.spinner.hide();
        this.actionType = res.message;
        this.mnc = "add"
        this.obtainedTotalMarks = 0;
        this.LDMatrixForm.value.leadershipSubjectResult = [];

        this.isShown = true;
        this.LDMatrixMarks = res.object;

        let ldm_mrks = res.object;
        const ldmResult = this.sortArrayOfObjects(ldm_mrks, "id", "ascending");

        ldm_mrks.forEach(e => {
          e.subjectId = e.id;
          this.fetchLDMatrixSubjectsResult.push(this.generateSubjects());
        });

        this.LDMatrixForm.patchValue({
          leadershipSubjectResult: ldmResult
        });

        this.LDMatrixForm.controls['subject'].setValue('');
        this.LDMatrixForm.controls['remarks'].setValue('');
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
    return this.LDMatrixMarks.map(t => t.totalMarks).reduce((acc, value) => acc + value, 0);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  viewLDMatrix(element) {
    if (this.router.url.includes('main/academic-depart/examination/assessment'))
      this.router.navigate(['/main/admin/academic-depart/examination/assessment/leadership-development-matrix/view-leadership-development-matrix'], { queryParams: { id: element.id } })
  }

  obtainedTotalMarks: number = 0;
  totalmarks1: number = 0;
  onChange(value, totalMarks, index) {
    if (value > totalMarks || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained Marks is greater then TotalMarks");
      this.fetchLDMatrixSubjectsResult.controls[index].get('obtainedMarks').setValue('');
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
      this.obtainedTotalMarks = 0
    }
  }

  totalMarks
  submit() {
    this.totalMarks = Object.assign({}, this.LDMatrixForm.value, { obtainedMarks: this.obtainedTotalMarks, totalMarks: this.getTotal(), status: 1, termId: 3 });
    var formdata = this.totalMarks;

    this.academicservice.addLDMatrix(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Leadership Development Matrix added successfully");

          delete formdata.battalian;
          delete formdata.cadetRank;
          delete formdata.company;
          delete formdata.course;
          delete formdata.subject;
          delete formdata.termSession;
          delete formdata.subject;
          delete formdata.term;
          delete formdata.username;
          for (let i = 0; i < formdata.leadershipSubjectResult.length; i++) {
            delete formdata.leadershipSubjectResult[i].subjectName
          }

          this.LDMatrixForm.value.leadershipSubjectResult = [];
        }
        err => {
          this.adminservice.openSnackbar("Some Error Occured.");
        }
      }
    )

    if (this.router.url.includes('academic-depart'))
      this.router.navigate(['/main/academic-depart/examination/Assessment/leadership-development-matrix']);
    if (this.router.url.includes('admin'))
      this.router.navigate(['/main/admin/academic-depart/examination/Assessment/leadership-development-matrix']);
  }

  totalMarks1
  confirm() {
    this.LDMatrixForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.LDMatrixForm.value, { obtainedMarks: this.obtainedTotalMarks, totalMarks: this.updateTotalMarks, status: 1, termId: 3, id: this.rowID });
    var formdata = this.totalMarks1;

    this.academicservice.updateLDMatrix(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Leadership Development Matrix Updated Successfully");

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
          this.LDMatrixForm.value.leadershipSubjectResult = [];
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
      this.router.navigate(['/main/academic-depart/examination/Assessment/leadership-development-matrix']);
    // if (this.router.url.includes('admin'))
    //   this.router.navigate(['/main/admin/academic-depart/examination/Assessment/leadership-development-matrix']);
  }
}
