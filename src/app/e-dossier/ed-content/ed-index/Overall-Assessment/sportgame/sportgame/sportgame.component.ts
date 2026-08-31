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
  selector: 'ms-sportgame',
  templateUrl: './sportgame.component.html',
  styleUrls: ['./sportgame.component.scss']
})
export class SportgameComponent implements OnInit {


  id: string = '';
  termid:any;
  sportForm: FormGroup = new FormGroup({});
  serId: any;
  serviceId;
  totalss: number = 0;
  dRILLAttemptResult1: any;

  termId
  Campmarks1
  updateobtainedmarks
  mnc = "add  "
  obtainedmarks: any[] = []
  updatetotalmarks
  test1
  tempArr1: any = [];
  drilleditid;
  drilleditid1;
  tempObj1: any = [];

  totalmarkst: number = 0;
  totalmarks1: number = 0;
  totalmarkst1: number = 0;
  totalmarkst2: number = 0;
  updatetotalmarks1;
  updatetotalmarks2;
  drillResult;



  totalMarks: any;
  obtainedMarks: any;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private EDossierService: EDossierService) {

    this.sportForm = this.fb.group({
      serviceId: ['', Validators.required],
      battalian: [{ disabled: true }, Validators.required],
      company: [{ disabled: true }, Validators.required],
      // termSession: ['', Validators.required],
      course: [{ disabled: true }, Validators.required],
      cadetRank: [{ disabled: true }, Validators.required],
      username: [{ disabled: true }, Validators.required],
      remarks: ['', Validators.required],
      term: ['', Validators.required],
      sportsSubResult: this.fb.array([]),
      sportsSubResult2: this.fb.array([]),
      sportsSubResult3: this.fb.array([]),
      //   serviceId: ['', Validators.required],
      //   id: ['', Validators.required],
      //   termId: ['', Validators.required],
      //   totalMarks: ['', Validators.required],
      //   obtainedMarks: ['', Validators.required],
      //   remarks: ['', Validators.required],
      //   status: ['', Validators.required],
      //   trgEQTNSubResult: this.fb.array([]),
      // sportsSubResult2: this.fb.array([]),
      // sportsSubResult3: this.fb.array([]),
    })
  }

  termSession: any;

  public get getCSubjectRes() {
    return this.sportForm.get('sportsSubResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.sportForm.get('sportsSubResult') as FormArray;
  }
  public get getCSubjectRes2() {
    return this.sportForm.get('sportsSubResult2') as FormArray;
  }
  public get getCSubjectRes3() {
    return this.sportForm.get('sportsSubResult3') as FormArray;
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
      termSession: [''],
      totalMarks: [''],
      remarks: ['']
    })
  }

  displayedColumns: string[] = ['id', 'termSession', 'subjectName', 'totalMarks', 'MarksObtained'];
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
  serid: any;

 
  TermFetch:any;
  TermFetch1:any;
  TermFetch2:any;
  ngOnInit(): void {



    console.log(localStorage.getItem("e"), '1111');
    console.log(localStorage.getItem("i"), '2222');
    (<HTMLInputElement>document.getElementById("sportgameID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("sportgameName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("sportgameComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("sportgameBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("sportgameTermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("sportgameTermName")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("sportgameRk")).value = localStorage.getItem("rank");


    this.id = this.route.snapshot.queryParamMap.get('Id');
    this.termid = this.route.snapshot.queryParamMap.get('termId');
    // alert(this.termid);
    this.serid = this.id;
    console.log("service ID IN EQTN ", this.id);
    console.log("TERM ID IN EQTN", this.termid);


    this.EDossierService.getSportsEdossiermarksByServiceId(this.id).subscribe(
      res => {


        if (res.message == "Record found successfully") {
          this.mnc = "update"
          this.spinner.hide()
          this.Campmark1 = res.object;


          if (this.termid == 1 || this.termid == 2 || this.termid == 3) {
            this.drilleditid = res.object[0].id;
            this.TermFetch = res.object[0].termId;
            this.updatetotalmarks = res.object[0].totalMarks;
            this.totalmarkst = res.object[0].obtainedMarks;
            this.termSession = res.object[0].termSession;
            console.log(this.updatetotalmarks, "updatetotalmarks");
            console.log(this.totalmarkst, "totalmarkst");
            let cmrks = res.object[0].sportsSubResult;
            console.log("view for cmrks", cmrks);

            cmrks.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes.push(this.genSubRec());

            });
            this.sportForm.patchValue({
              sportsSubResult: cmrks,
            });
          }

          if (this.termid == 2 || this.termid == 3) {
            this.TermFetch1 = res.object[1].termId;
           this.updatetotalmarks1 = res.object[1].totalMarks;
           this.totalmarkst1 = res.object[1].obtainedMarks;
           this.termSession = res.object[1].termSession;
           let cmrks1 = res.object[1].sportsSubResult;
           cmrks1.forEach(e => {
            e.id = e.id;
            console.log("eeee===>>", e);
            this.getCSubjectRes2.push(this.genSubRec());
          });
          this.sportForm.patchValue({
            sportsSubResult2: cmrks1,
          });
          }

          if (this.termid == 3){
            this.TermFetch2 = res.object[2].termId;
            this.updatetotalmarks2 = res.object[2].totalMarks;
            this.totalmarkst2 = res.object[2].obtainedMarks;
            this.termSession = res.object[2].termSession;
            let cmrks2 = res.object[2].sportsSubResult;
            cmrks2.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes3.push(this.genSubRec());
            });
            
          this.sportForm.patchValue({
            sportsSubResult3: cmrks2,
          })

          }
         
         
         


         
         

        


         
          // console.log(this.obtainedmarks, "obtainedmarks")
          // this.dataSource = new MatTableDataSource(res.object.trgEQTNSubResult);
          this.sportForm.patchValue({
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
    // }
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


  goBack() {
    window.history.back();
  }




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

  total
  totalmarks22
  subId
  subTotalMarks
  SubResultArr: any[] = [];
  // totalMarks:any;
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
    // alert(this.sportForm.value.termSession)
    this.sportForm.value.termSession = "Spring";
    this.sportForm.value.serviceId = this.serviceId;
    var indexT = 0;
    this.sportForm.value == this.totalMarks1;
    this.totalMarks1 = Object.assign({}, this.sportForm.value, { obtainedMarks: this.totalmarkst, totalMarks: this.updatetotalmarks, status: 1, termId: termid, id: this.drilleditid });
    var formdata = this.totalMarks1;
    // if (termid == 1) {
    //   delete formdata.trgEQTNSubResult
    //   delete formdata.campSubjectResult3
    //   formdata.campSubjectResult=formdata.campSubjectResult
    // }
    // if (termid == 2) {
    //   delete formdata.campSubjectResult
    //   delete formdata.trgEQTNSubResult
    //   delete formdata.campSubjectResult3
    //   formdata.campSubjectResult=formdata.trgEQTNSubResult
    //   delete formdata.trgEQTNSubResult
    // }
    // if (termid == 3) {
    //   delete formdata.campSubjectResult
    //   delete formdata.trgEQTNSubResult
    //   formdata.campSubjectResult=formdata.campSubjectResult3
    //   delete formdata.campSubjectResult3

    // }
    delete formdata.battalian;
    delete formdata.cadetRank;
    delete formdata.company;
    delete formdata.course;
    delete formdata.subject;
    // delete formdata.termSession;
    delete formdata.subject;
    delete formdata.term;
    delete formdata.username;
    delete formdata.subject1;
    delete formdata.grading;
    delete formdata.attempt;
    this.sportForm.value.sportsSubResult = [];
    console.log(formdata, "all")
    this.EDossierService.updateSportsEdossiermarks(formdata).subscribe(
      res => {
        if (res.message == 'Record found successfully') {
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
