import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-drill',
  templateUrl: './drill.component.html',
  styleUrls: ['./drill.component.scss']
})
export class DrillComponent implements OnInit {
  menu: any;
  serviceId;
  termId;
  status;

  drillForm: FormGroup = new FormGroup({});


  id: any;
  termid: any;
  serId: any;
  // serviceId;
  totalss: number = 0;
  dRILLAttemptResult1: any;

  // termId
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
  remarks: any;

  
  TermFetch:any;
  TermFetch1:any;
  TermFetch2:any;

  DRILLDATFORM: FormGroup = new FormGroup({});
  serviceID: string;

  constructor(private fb: FormBuilder, private EDossierService: EDossierService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute,) {
    // this.serviceId = localStorage.getItem('e');
    // alert(this.serviceId);

    this.drillForm = this.fb.group({
      general: ['', Validators.required],
      date: ['', Validators.required],
      remarks: ['', Validators.required],
      specialAchivement: ['', Validators.required],
      strength: ['', Validators.required],
      weakness: ['', Validators.required],
      id: ['',],
      isDeclared: [false],
      status: [1],
      // termId:[1],
      serviceId: ['D/5016'],
      dRILLSubjectResult: this.fb.array([]),
      dRILLSubjectResult2: this.fb.array([]),
      dRILLSubjectResult3: this.fb.array([]),
    });




    this.DRILLDATFORM = this.fb.group({
      id: [''],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      e: ['', Validators.required],
      status: [1],
    });


    this.serviceID = this.route.snapshot.queryParamMap.get('serviceId');
    this.termid = this.route.snapshot.queryParamMap.get('termId');
    // alert(this.serviceID);
    // this.serid = this.id;
    var x = this.id;
    console.log("service ID IN EQTN ", this.serviceID);
    console.log("TERM ID IN EQTN", this.termid);
    this.getDrillMarksByServiceId();
    this.getDrillDatByServiceIdAndStatus();
  }


  public get getCSubjectRes() {
    return this.drillForm.get('dRILLSubjectResult') as FormArray;
  }
  public get getCSubjectRes1() {
    return this.drillForm.get('dRILLSubjectResult') as FormArray;
  }
  public get getCSubjectRes2() {
    return this.drillForm.get('dRILLSubjectResult2') as FormArray;
  }
  public get getCSubjectRes3() {
    return this.drillForm.get('dRILLSubjectResult3') as FormArray;
  }



  //GENERIC METHOD
  genSubRec() {
    return this.fb.group({
      id: [''],
      obtainedMarks: [''],
      c1ObtainedMarks: [''],
      c2ObtainedMarks: [''],
      m1ObtainedMarks: [''],
      m2ObtainedMarks: [''],
      // c1ObtainedMarks:[''],
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


  displayedColumns: string[] = ['id', 'termSession', 'subjectName', 'totalMarks', 'MarksObtained', 'Remarks'];
  dataSource;
  Campmarks: any[] = [];
  Campmark1: any[] = [];
  routeTotal
  runbackTotal
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultType = "Route March";
  resultType1 = "Runback";
  sum
  serid: any;

  



  totalObtainedm1marks: any; totalObtainedm2marks: any; totalObtainedc1marks: any; totalObtainedc2marks: any;
  totalObtainedm1marks1: any; totalObtainedm2marks1: any; totalObtainedc1marks1: any; totalObtainedc2marks1: any;
  ngOnInit(): void {

    (<HTMLInputElement>document.getElementById("drillcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("drillbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("drillcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("drillcadetName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("drillcadetRank")).value = localStorage.getItem("rank");
    (<HTMLInputElement>document.getElementById("drillcadettermname")).value = localStorage.getItem("termName");

  }

  getDrillMarksByServiceId() {
    this.EDossierService.getDrillEdossiermarksByServiceId(this.serviceID).subscribe(
      res => {


        if (res.message == "Record found successfully") {
          this.mnc = "update"
          this.spinner.hide()
          this.Campmark1 = res.object;
          // this.TERMID = res.object[0].termId;
          // alert(this.TERMID)
          // this.TERMID1 = res.object[1].termId;
          // this.TERMID2 = res.object[2].termId;

          if (this.termid == 1 || this.termid == 2 || this.termid == 3) {
            this.TermFetch = res.object[0].termId;
            this.updatetotalmarks = res.object[0].totalMarks;
            this.totalObtainedm1marks = res.object[0].m1ObtainedMarks;
            this.totalObtainedm2marks = res.object[0].m2ObtainedMarks;
            this.totalObtainedc1marks = res.object[0].c1ObtainedMarks;
            this.totalObtainedc2marks = res.object[0].c2ObtainedMarks;
            this.totalmarkst = res.object[0].obtainedMarks;
            console.log(this.updatetotalmarks, "updatetotalmarks")
            console.log(this.totalmarkst, "totalmarkst")
            this.drilleditid = res.object[0].id;
            let cmrks = res.object[0].dRILLSubjectResult;
            console.log("view for cmrks", cmrks);
            cmrks.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes.push(this.genSubRec());
            });
            this.drillForm.patchValue({
              dRILLSubjectResult: cmrks,
            });
          }

          if (this.termid == 2 || this.termid == 3) {
            this.TermFetch1 = res.object[1].termId;
            this.updatetotalmarks1 = res.object[1].totalMarks;
            this.totalObtainedm1marks1 = res.object[1].m1ObtainedMarks;
            this.totalObtainedm2marks1 = res.object[1].m2ObtainedMarks;
            this.totalObtainedc1marks1 = res.object[1].c1ObtainedMarks;
            this.totalObtainedc2marks1 = res.object[1].c2ObtainedMarks;
            this.totalmarkst1 = res.object[1].obtainedMarks;


            let cmrks1 = res.object[1].dRILLSubjectResult;
            cmrks1.forEach(e => {
              e.id = e.id;
              console.log("eeee===>>", e);
              this.getCSubjectRes2.push(this.genSubRec())
            });
            
          this.drillForm.patchValue({
            dRILLSubjectResult2: cmrks1,
          });
           
          }

          // this.updatetotalmarks2 = res.object[2].totalMarks;
          // this.totalmarkst2 = res.object[2].obtainedMarks;


          // let cmrks2 = res.object[2].dRILLSubjectResult;

          // cmrks2.forEach(e => {
          //   e.id = e.id;
          //   console.log("eeee===>>", e);
          //   this.getCSubjectRes3.push(this.genSubRec())
          // });


          // this.drillForm.patchValue({
          //   dRILLSubjectResult3: cmrks2,
          // })

          // console.log(this.obtainedmarks, "obtainedmarks")
          // this.dataSource = new MatTableDataSource(res.object.trgEQTNSubResult);
          this.drillForm.patchValue({
            remarks: res.object.remarks,
          });
          // alert( res.object.remarks)
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
      this.getCSubjectRes1.controls[index].get('c1ObtainedMarks').setValue('');
      this.getCSubjectRes1.controls[index].get('c2ObtainedMarks').setValue('');
      this.getCSubjectRes1.controls[index].get('m1ObtainedMarks').setValue('');
      this.getCSubjectRes1.controls[index].get('m2ObtainedMarks').setValue('');
      // console.log(value, "index=", +index);
      value = 0
      // this.totalmarkst = 0
    }
    this.totalmarkst += parseInt(value);
    this.test = value;
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



  STATUS: any; obj: any;
  getDrillDatByServiceIdAndStatus() {
    this.STATUS = 1;
    this.edossierservice.getDillDatById(this.serviceID, this.STATUS).subscribe(res => {

      if (res.status == "OK") {

        this.obj = res.object;
        this.DRILLDATFORM.patchValue({
          id: this.obj.id,
          a: this.obj.a,
          b: this.obj.b,
          c: this.obj.c,
          d: this.obj.d,
          e: this.obj.e,
          status: this.obj.status,

        });
        this.adminservice.openSnackbar(res.message);
        console.log(this.DRILLDATFORM.value)

        this.id = this.obj.id;
        //  alert(this.id)
      }



    });
  }

  data: any;
  onSubmit() {
    console.log(this.DRILLDATFORM.value)
    this.data = this.DRILLDATFORM.value;
    // this.data['termId'] = this.termId;
    this.data['serviceId'] = this.serviceID;
    console.log(this.data);
    if (this.id == undefined || this.id == null || this.id == '') {
      this.edossierservice.addDrillDat(this.data).subscribe(res => {
        console.log(res);
        if (res.message == 'OK') {
          this.spinner.hide()
          this.adminservice.openSnackbar(res.message);

        }
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }
      }
      );
    }
    else {
      this.data = this.DRILLDATFORM.value;
      this.edossierservice.updateDrillDat(this.data).subscribe(res => {
        console.log(res);
        if (res.message == 'OK') {
          this.spinner.hide()
          this.adminservice.openSnackbar(res.message);

        }
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }
      }
      )
    }

    window.history.back();

  }


}