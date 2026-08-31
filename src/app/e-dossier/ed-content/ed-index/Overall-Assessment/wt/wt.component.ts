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
  selector: 'ms-wt',
  templateUrl: './wt.component.html',
  styleUrls: ['./wt.component.scss']
})
export class WtComponent implements OnInit {

  id: string = '';
  termid: string = '';
  Id;
  motivationFormI: FormGroup = new FormGroup({});
  motivationFormII: FormGroup = new FormGroup({});
  motivationFormIII: FormGroup = new FormGroup({});

  serId: any;

  resultsLength: number;
  WTCadetList: any;
  term: string;
  pageSize: any = 30;
  currentPage: any = 0;

  serid;
  intTermId;
  terid: string = '';
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private EDossierService: EDossierService) {

    this.serid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("e");
    this.terid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("j");
    this.Id = this.route.snapshot.queryParamMap.get('Id');
    console.log(this.terid, "juned id");

    this.intTermId = parseInt(this.terid);

    this.motivationFormI = this.fb.group({
      badge1: ['', Validators.required],
      badge2: ['', Validators.required],
      badge3: ['', Validators.required],
      badge4: ['', Validators.required],
      status: ['1', Validators.required],
      termId: [1],
      serviceId: this.serid
    })

    this.motivationFormII = this.fb.group({
      badge1: ['', Validators.required],
      badge2: ['', Validators.required],
      badge3: ['', Validators.required],
      badge4: ['', Validators.required],
      status: ['1', Validators.required],
      termId: [2],
      serviceId: this.serid
    })

    this.motivationFormIII = this.fb.group({
      badge1: ['', Validators.required],
      badge2: ['', Validators.required],
      badge3: ['', Validators.required],
      badge4: ['', Validators.required],
      status: ['1', Validators.required],
      termId: [3],
      serviceId: this.serid
    })


  }




  ngOnInit(): void {

    (<HTMLInputElement>document.getElementById("WTcompanyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("WTbattalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("WTcadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("WTcadetName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("WTcadetRank")).value = localStorage.getItem("rank");
    (<HTMLInputElement>document.getElementById("WTcadettermname")).value = localStorage.getItem("termName");


    this.getWTAllCadetlist();
  }


  ngAfterViewInit() {
    this.getmotivationClub()
  }

  getmotivationClub() {
    this.EDossierService.getMotivationBadgeDetails(this.serid).subscribe(
      res => {
        let values = res.object

        if (res.status == 'OK') {
          if (res.object && res.object.termId === 1) {
            this.motivationFormI.patchValue({
              badge1: res.object.badge1,
              badge2: res.object.badge2,
              badge3: res.object.badge3,
              badge4: res.object.badge4,
              id: res.object.id
            })
          } else if (res.object && res.object.termId === 2) {
            this.motivationFormII.patchValue({
              badge1: res.object.badge1,
              badge2: res.object.badge2,
              badge3: res.object.badge3,
              badge4: res.object.badge4,
              id: res.object.id
            })
          } else if (res.object && res.object.termId === 3) {
            this.motivationFormIII.patchValue({
              badge1: res.object.badge1,
              badge2: res.object.badge2,
              badge3: res.object.badge3,
              badge4: res.object.badge4,
              id: res.object.id
            })
          }
        } else {
          this.spinner.hide()
          this.adminservice.openSnackbar(res.message)
        }
      }
    )

  }

  subjectSize;
  totalSubjectmarks = 0;
  obtainedSubjectmarks = 0;

  a;

  getWTAllCadetlist() {
    this.spinner.show();
    this.edossierservice.getWTAllCadetlist(this.serid).subscribe(res => {
      console.log(res);
      this.resultsLength = res.object.totalRecords;
      if (res.message == "Record found successfully") {
        this.WTCadetList = res.object;
        this.subjectSize = res.object.length;
        for (let i = 0; i < this.subjectSize; i += 1) {
          for (let j = 0; j < res.object[i].cadetWTMainResultlist.length; j += 1) {
            this.totalSubjectmarks += res.object[i].cadetWTMainResultlist[j].maxMarks;
            this.obtainedSubjectmarks += res.object[i].cadetWTMainResultlist[j].marks;
          }
          console.log('this.totalSubjectmarks==>>', this.totalSubjectmarks);
          console.log('this.obtainedSubjectmarks==>>', this.obtainedSubjectmarks);
          this.a = this.totalSubjectmarks;
        }
        console.log("totalSubjectmarks==>a", this.a);
      }
      else {
        this.WTCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        // this.service.openSnackbar("Some Error Occured.");
      }

    )
  }

  romanize(num) {
    if (isNaN(num))
      return NaN;
    var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  addMotivationsubmit1() {
    this.EDossierService.addMotivationBadgeDetails(this.motivationFormI.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }


  updateClub() {
    this.EDossierService.updateMotivationBadgeDetails(this.Id, this.motivationFormI.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.spinner.hide();
          this.router.navigate(['e-dossior/ed-content/Ed-index/Otherdetails/club']);
          this.adminservice.openSnackbar(res.message);
        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }

}
