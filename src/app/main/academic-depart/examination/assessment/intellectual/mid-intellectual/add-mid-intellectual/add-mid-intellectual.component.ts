import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { AdminService } from 'app/service/admin/admin.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { AuthService } from 'app/service/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-mid-intellectual',
  templateUrl: './add-mid-intellectual.component.html',
  styleUrls: ['./add-mid-intellectual.component.scss']
})
export class AddMidIntellectualComponent implements OnInit {

  term: string;
  type: string;
  serviceid: string = '';
  termid: string = '';
  totalss: number = 0;
  intellectualMidMarkForm: FormGroup = new FormGroup({});
  dRILLAttemptResult1: any;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService,private academicservice:AcademicDeptService, private cdref: ChangeDetectorRef,private edossierservice:EDossierService
    ,private activeRoute: ActivatedRoute) {
      this.route.params.subscribe((params) => {
        console.log(params);
        this.term = params.term;
        this.type = params.type;
        console.log(this.type,"juend");
      });
    this.intellectualMidMarkForm = this.fb.group({
      serviceId: ['', Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      termSession: [{ disabled: true }, Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      term: ['', Validators.required],
      intellectualSkillsSubResult: this.fb.array([]),

    })
  }

  public get getCSubjectRes() {
    return this.intellectualMidMarkForm.get('intellectualSkillsSubResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.intellectualMidMarkForm.get('intellectualSkillsSubResult') as FormArray;
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
      this.serviceid = this.route.snapshot.queryParamMap.get('id');
      this.termid = this.route.snapshot.queryParamMap.get('termid');
      console.log(this.serviceid,"iddddd")
      
    }
    if (this.router.url.includes('Mid-Term/add-mid-intellectual')) {
      this.spinner.show();
      var getForm = {
        id: this.serviceid,
        termid: this.termid
      }
      var serviceId = this.serviceid
      var termId = this.termid
      this.academicservice.getIntellectualskills(serviceId, termId).subscribe(
        res => {

          if (res.message == "update") {
            this.mnc = "update"
            this.spinner.hide()
            this.Campmark1 = res.object;
            this.updatetotalmarks = res.object.midTotalMarks;
            this.totalmarkst = res.object.midObtainedMarks;
            this.drilleditid = res.object.id;
            console.log(this.Campmark1, "<<<<<")
            let cmrks = res.object.intellectualSkillsSubResult;
            // const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")
            console.log(cmrks, "cmrks")

            cmrks.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes.push(this.genSubRec())
            });
            this.intellectualMidMarkForm.patchValue({
              intellectualSkillsSubResult: cmrks,
            })
            this.intellectualMidMarkForm.patchValue({
              remarks: res.object.remarks,
            })
            this.tempArr1 = [];
            this.cdref.detectChanges();
          }
          else if (res.message == "add") {
            this.spinner.hide()
            this.totalmarkst = 0;
            this.mnc = "add";
            this.Campmarks = res.object;
            this.intellectualMidMarkForm.value.intellectualSkillsSubResult = []
            this.mnc = "add";
            this.Campmarks = res.object;
            let cmrks = res.object;
            console.log("drill===>>", cmrks);
            const drillResult = this.sortArrayOfObjects(cmrks, "id", "ascending")

            cmrks.forEach(e => {
              e.subjectId=e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes1.push(this.genSubRec1())
            });
            this.intellectualMidMarkForm.patchValue({
              intellectualSkillsSubResult: drillResult
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
  genSubRec() {
    return this.fb.group({
      id: [''],
      serviceId: [this.serviceid],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [this.termid],
      midObtainedMarks:[''],
      midTotalMarks:['']
    })
  }
 
  genSubRec1() {
    return this.fb.group({
      serviceId: [this.serviceid],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [this.termid],
      midObtainedMarks:[''],
      midTotalMarks:['']
    })
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
  updatefinalObtainedMarks
  mnc = "add"
  finalObtainedMarks: any[] = []
  updatetotalmarks
  test1
  tempArr1: any = [];
  drilleditid
  tempObj1: any = [];
 
  ngAfterViewInit() {
  }

  getTotal() {
    return this.Campmarks.map(t => t.midTotalMarks).reduce((acc, value) => acc + value, 0);
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
  onChange(value, midTotalMarks,index) {
    console.log(value, "value")
    console.log(midTotalMarks, "totalMarks")
    console.log(index, "index")
    if (value > midTotalMarks || value == NaN || value == '') {
      this.adminservice.openSnackbar("Obtained marks is greater then Total marks")
      this.getCSubjectRes1.controls[index].get('midObtainedMarks').setValue('');
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
    this.intellectualMidMarkForm.value.serviceId=this.serviceid
    var indexT = 0;
    this.totalMarks = Object.assign({}, this.intellectualMidMarkForm.value, { midObtainedMarks: this.totalmarkst, midTotalMarks: this.getTotal(), status: 1, termId:this.termid });
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
    this.intellectualMidMarkForm.value.intellectualSkillsSubResult = [];
    this.tempArr = [];
    for (let i = 0; i < formdata.intellectualSkillsSubResult.length; i++) {
      delete formdata.intellectualSkillsSubResult[i].subjectName
      }

    console.log(formdata, "finalresult");
    this.academicservice.addIntellectualSkills(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Intellectual Marks Added Successfully");
          // this.spinner.hide()
        }
        err => {
          // this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }
      }
    )
     if (this.router.url.includes('academic-depart'))
     this.router.navigate(['/main/academic-depart/examination/Assessment/II-Term/intellectual/Mid-Term'])
  
}

  totalMarks1
  confirm() {
    var indexT = 0;
    this.intellectualMidMarkForm.value.serviceId=this.serviceid
    this.intellectualMidMarkForm.value == this.totalMarks1
    this.totalMarks1 = Object.assign({}, this.intellectualMidMarkForm.value, { midObtainedMarks: this.totalmarkst, midTotalMarks: this.updatetotalmarks, status: 1, termId:this.termid, id: this.drilleditid });
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
    this.intellectualMidMarkForm.value.intellectualSkillsSubResult = [];
    console.log(formdata)
    this.academicservice.updateIntellectual(formdata).subscribe(
      res => {
        if (res.message == 'OK') {
          this.adminservice.openSnackbar("Intellectual Marks Updated Successfully");
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
    this.router.navigate(['/main/academic-depart/examination/Assessment/II-Term/intellectual/Mid-Term'])
  
  }
}
