import { ChangeDetectorRef, Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ms-weapons-training',
  templateUrl: './weapons-training.component.html',
  styleUrls: ['./weapons-training.component.scss']
})
export class WeaponsTrainingComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cadetForm: FormGroup = new FormGroup({});
  activeTab = 0;
  weaponList: any[];
  weaponMarksForm: FormGroup;
  tabIndex: number;
  resultsLength: number;
  total: number = 0;
  WTCadetList: any;
  type: string;
  termId: number;
  displayStyle: any = "none";
  pageSize: any = 50;
  currentPage: any = 0;
  percent: number = 0;
  maxPercent: number = 0;
  companyName: any;
  serviceid: any;
  battalionList: [] = [];
  companyList: any[] = [];
  battalion: any;
  company: any;
  battalionId: any = '';
  companyId: any = '';

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }


  constructor(private service: TrgTeamService, private _router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private _fb: FormBuilder, private serv: AdminService,
    private cdref: ChangeDetectorRef,
    private adminservice: AdminService,
  ) {

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    });

    this.route.params.subscribe((params) => {
      this.type = params.type;
      if (this.type == "I Term") {
        this.termId = 1;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.type == "II Term") {
        this.termId = 2;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.type == "III Term") {
        this.termId = 3;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      } else if (this.type == "II Tech") {
        this.termId = 7;
        this.battalionId = null;
        this.companyList = [];
        this.companyName = null;
        this.serviceid = null;
      }
      if (this.resultsLength == 0) {
        this.weaponList = null;
      }
      if (this.companyName == undefined || this.companyName == null || this.companyName == '') {
        this.getWTAllCadetlist();
      }

      this.getWeapons();
      this.service.getBattalionList().subscribe(
        res => {
          this.spinner.show();
          if (res.status == 'OK') {
            this.battalionList = res.object
            this.cdref.detectChanges();
            this.spinner.hide()
          } else {
            this.spinner.hide();
          }

        }, err => {
          this.spinner.hide();
        }
      )
    });
  }


  battalionName: string = '0';
  battalionSelected(e: any) {

    this.battalionName = e;
    this.companyName = null;

    if (this.battalionName == '0') {
      this.battalionId = null;
      this.companyName = null;
    }
    if (this.battalionName == 'CA') {
      this.battalionId = 1
    }
    else if (this.battalionName == "TH") {
      this.battalionId = 2
    }
    else if (this.battalionName == "MA") {
      this.battalionId = 3
    }
    else if (this.battalionName == "BH") {
      this.battalionId = 4
    }

    this.spinner.show();

    if (this.battalionId != null || this.battalionName != '0') {
      this.service.getCompanyList(this.battalionId).subscribe(
        res => {
          this.spinner.show();
          console.log(res);
          if (res.status == 'OK') {
            this.companyList = res.object;
            this.cdref.detectChanges();
            this.spinner.hide();
          } else {
            this.spinner.hide()
          }
        },
        err => {
          this.spinner.hide();
        }
      );
    }
    else {
      this.companyList = [];
      this.companyName = null;
    }
    this.companyList = [];
    this.getWTAllCadetlist();
  }

  companySelected(e: any) {
    this.companyName = e;
    if (this.companyName == 0) {
      this.getSpecialAllList();
      this.companyName = null;
    }
    else {
      if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
        this.getWTAllCadetlist();
      }
    }
    this.getWTAllCadetlist();
  }

  getSpecialAllList() {
    this.service.getWT_All_ListByBCNameComp(this.termId, this.currentPage, this.pageSize, this.battalionName).subscribe(res => {
      console.log(res);
      if (res.message == 'OK') {
        this.resultsLength = res.object.totalRecords;
        this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
      }
      else {
        this.WTCadetList = []
      }
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.");
      }
    )
  }

  ngOnInit(): void {
    // this.getWeapons(1);
  }

  weaponSubList;
  getWeapons() {
    this.service.getWeaponByTerm(this.termId, 2).subscribe(res => {
      if (res.status = "OK") {
        this.weaponList = res.object;
        console.log(this.weaponList.length, "-----");

      } else {

      }
    })
  }

  serviceSearch(e: any) {
    this.serviceid = e;
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.getWTAllCadetlist()
    }

  }



  getWTAllCadetlist() {
    this.spinner.show();
    if (this.battalionId == 1 || this.battalionId == 2 || this.battalionId == 3 || this.battalionId == 4) {
      this.service.getWt_All_ListByBCName(this.termId, this.currentPage, this.pageSize, this.battalionName, this.companyName).subscribe(res => {
        console.log(res);
        if (res.message == 'Record not found') {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
        if (res.message == 'OK') {
          this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          if (res.object.weaponTrainingResultFilterPayload.length > 0) {
            this.resultsLength = res.object.totalRecords;
            this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          }
          else {
            this.WTCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.WTCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar("Some Error Occured.");
        }

      )
    }
    else {
      this.service.getWTAllCadetlist(this.termId, this.currentPage, this.pageSize).subscribe(res => {
        console.log(res);
        this.resultsLength = res.object.totalRecords;
        if (res.status == 'OK') {
          this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          if (res.object.weaponTrainingResultFilterPayload.length > 0) {
            this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          }
          else {
            this.WTCadetList = []
          }
          this.cdref.detectChanges();
        }
        else {
          this.WTCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }

      )
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
  newTotal: number;
  obtainedTotalMarks: any;

  onChange(e: any, value, totalMarks, sub_id, mainIndex, subIndex, subSubIndex) {
    if (value > totalMarks || value == NaN) {
      this.adminservice.openSnackbar("Obtained marks is greater than total marks");
      value = '';
      e.target.value = null;
    }
    else if (value == "") {
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].cadetWTResultlist[subSubIndex].marks = '';
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].std = '';
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].gPoint = '';
      return false;
    }
    else {
      var total = (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex)).value;
      let __value: any;
      if (total) {
        __value = parseInt(total) + (value == '' ? 0 : parseInt(value)) + "";
        this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks = parseInt(total) + (value == '' ? 0 : parseInt(value));
      } else {
        __value = value;
        this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks = (value == '' ? 0 : parseInt(value));
      }

      (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex)).value = __value;

      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].cadetWTResultlist[subSubIndex].marks = value;
      console.log(this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].cadetWTResultlist[subSubIndex].marks, "juned test subsubINdex");

      this.percent = ((this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks / this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].maxMarks) * 100)
      this.maxPercent = Math.round(this.percent);
      const gPT = ((this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].maxGPoint / 100) * this.maxPercent)
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].gPoint = Math.round(gPT);

      (<HTMLInputElement>document.getElementById("gpoint" + mainIndex + "" + subIndex)).value = Math.round(gPT).toString();
      (<HTMLInputElement>document.getElementById("_gp" + mainIndex + "" + subIndex)).value = Math.round(gPT).toString();



      let std: any;
      if (this.maxPercent > 70) {
        std = 'Marksman'
      }
      else if (this.maxPercent >= 60 && this.maxPercent <= 69) {
        std = 'First Class'
      }
      else if (this.maxPercent >= 40 && this.maxPercent <= 59) {
        std = 'Standard Shot'
      }
      else {
        std = 'Fail'
      }

      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].std = std;
      (<HTMLInputElement>document.getElementById("std" + mainIndex + "" + subIndex)).value = std;


      console.log((<HTMLInputElement>document.getElementById("std" + mainIndex + "" + subIndex)).value, "std test subsubINdex");
      this.newTotal = 0;
      for (let index = 0; index < this.weaponList.length; index++) {
        this.newTotal += parseFloat((<HTMLInputElement>document.getElementById("_gp" + mainIndex + index + "")).value)

      }
      this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.newTotal;
      var val1 = this.WTCadetList[mainIndex].weaponTrainingResult.wtt;
      var val2 = this.WTCadetList[mainIndex].weaponTrainingResult.spotTest;

      this.setWtttotal(val1, val2, mainIndex);
    }
  }
  setWtttotal(val1, val2, mainIndex) {

    this.onChange1(val1, mainIndex);
    this.onChange2(val2, mainIndex)

  }
  onFocusEvent(e: any, value, totalMarks, sub_id, mainIndex, subIndex, subSubIndex) {
    if (value == NaN || value == '' || value == undefined) {
      return false;
    }
    // var total = (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex+""+subSubIndex)).value;
    // if (total) {
    //   (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex+""+subSubIndex)).value = parseInt(total) - parseInt(value) + "";
    //   this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist.marks = parseInt(total) - parseInt(value);
    // } else {
    //   (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex+""+subSubIndex)).value = value;
    //   this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist.marks = value;
    // }
    // // this.obtainedTotalMarks -= parseInt(val);
    // if (this.obtainedTotalMarks == NaN) {
    //   this.obtainedTotalMarks = 0;
    // }
    var total = (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex)).value;
    let __value: any;
    if (total) {
      var temp = parseInt(total) - (value == '' ? 0 : parseInt(value));
      // __value = parseInt(total) - (value == '' ? 0 : parseInt(value)) + "";
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks = temp == 0 ? null : temp;
    } else {
      __value = value;
      this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks = (value == '' ? 0 : parseInt(value));
    }

    (<HTMLInputElement>document.getElementById(mainIndex + "" + subIndex)).value = __value;

    this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].cadetWTResultlist[subSubIndex].marks = value;

    this.percent = ((this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].marks / this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].maxMarks) * 100)
    this.maxPercent = Math.round(this.percent);
    const gPT = ((this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].maxGPoint / 100) * this.maxPercent)
    this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].gPoint = Math.round(gPT);

    (<HTMLInputElement>document.getElementById("gpoint" + mainIndex + "" + subIndex)).value = Math.round(gPT).toString();
    (<HTMLInputElement>document.getElementById("_gp" + mainIndex + "" + subIndex)).value = Math.round(gPT).toString();



    let std: any;
    if (this.maxPercent > 70) {
      std = 'Marksman'
    }
    else if (this.maxPercent >= 60 && this.maxPercent <= 69) {
      std = 'First Class'
    }
    else if (this.maxPercent >= 40 && this.maxPercent <= 59) {
      std = 'Standard Shot'
    }
    else {
    }

    this.WTCadetList[mainIndex].weaponTrainingResult.cadetWTMainResultlist[subIndex].std = std;
    (<HTMLInputElement>document.getElementById("std" + mainIndex + "" + subIndex)).value = std;


    this.newTotal = 0;
    for (let index = 0; index < this.weaponList.length; index++) {
      this.newTotal += parseFloat((<HTMLInputElement>document.getElementById("_gp" + mainIndex + index + "")).value)

    }
    this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.newTotal;

  }
  tempnewTotal = 0;

  onChange1(value2, mainIndex) {
    console.log(value2,'wtt value');
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = null;
    }
    else if (value2 == "") {
      this.WTCadetList[mainIndex].weaponTrainingResult.wtt = '';
      return false;
    }
    else {
      this.tempnewTotal = parseInt(this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal);
      this.tempnewTotal = this.tempnewTotal + parseInt(value2);
      this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.tempnewTotal;
      this.WTCadetList[mainIndex].weaponTrainingResult.wtt = value2;
    }
    console.log(this.tempnewTotal,'tempnewtotal')

  }

  onChange2(value2, mainIndex) {
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = '';
    }
    else if (value2 == "") {
      this.WTCadetList[mainIndex].weaponTrainingResult.spotTest = '';
      return false;
    }
    else {
      console.log(this.newTotal);
      this.tempnewTotal = parseFloat(this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal);
      this.tempnewTotal = this.tempnewTotal + parseInt(value2);
      this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.tempnewTotal;
      this.WTCadetList[mainIndex].weaponTrainingResult.spotTest = value2;
    }
    console.log(this.tempnewTotal)
  }

  onFocusEvent1(value2, mainIndex) {
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = 0;
    }
    this.tempnewTotal = parseFloat(this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal);
    this.tempnewTotal = this.tempnewTotal - parseInt(value2);
    this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.tempnewTotal;
    console.log(this.tempnewTotal)

  }

  onFocusEvent2(value2, mainIndex) {
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = 0;
    }
    console.log(this.newTotal);
    this.tempnewTotal = parseFloat(this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal);
    this.tempnewTotal = this.tempnewTotal - parseInt(value2);
    this.WTCadetList[mainIndex].weaponTrainingResult.grandTotal = this.tempnewTotal;
    console.log(this.tempnewTotal)
  }


  onChangeRemark(value2, mainIndex) {
    this.WTCadetList[mainIndex].weaponTrainingResult.remark = value2;
    console.log(this.tempnewTotal)
  }

  confirm() {
    this.spinner.show();
    var formdata = this.WTCadetList

    console.log(formdata)
    this.service.updateWTCadet(formdata).subscribe(
      res => {
        if (res.message == "Record updated successfully") {
          this.spinner.hide()
          this.service.openSnackbar("Updated Successfully");
          window.location.reload();
        }
        else {
          err => {
            this.spinner.hide()
            this.service.openSnackbar("Some Error Occured.");
          }

        }
      }
    )

  }

  edSearch(event?: PageEvent) {
    if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
      this.service.openSnackbar("Search Bar is Empty. Please fill the details");
    }
    else {
      this.service.searchWT(this.termId, this.serviceid, 0, 100).subscribe(res => {
        console.log(res);
        // this.resultsLength = res.object.totalRecords;
        if (res.message == 'OK') {
          this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          if (res.object.weaponTrainingResultFilterPayload.length > 0) {
            this.WTCadetList = res.object.weaponTrainingResultFilterPayload;
          }
          else {
            this.WTCadetList = []
          }
          this.cdref.detectChanges();
        }
        else if (res.message == 'Record not found') { 
          this.WTCadetList = []
        }
        else{
          this.WTCadetList = []
        }
        this.spinner.hide()
      },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }

      )
    }

  }

  // edSearch(event?: PageEvent) {
  
  //   if (this.serviceid == null || this.serviceid == undefined || this.serviceid == '') {
  //     this.service.openSnackbar("Search Bar is Empty. Please fill the details");

  //   }
  //   else {
  //     merge(/* this.sort.sortChange,  */this.paginator.page)
  //       .pipe(
  //         startWith({}),
  //         switchMap(() => {
  //           this.spinner.show()
  //           return this.service.searchWT(this.termId, this.serviceid, this.paginator.pageIndex, this.paginator.pageSize)
  //         }), map(data => {
  //           // this.getTotalRecords();
  //           this.resultsLength = data.object.totalRecords;
  //           return data;
  //         }),
  //         catchError(() => {
  //           console.log('Error here')
  //           this.spinner.hide()
  //           return observableOf([]);
  //           // return null;
  //         })
  //       ).subscribe(data => {
  //         if (data.status == 'OK') {
  //           this.WTCadetList = data.object.weaponTrainingResultFilterPayload;
  //           if (data.object.weaponTrainingResultFilterPayload.length > 0) {
  //             this.WTCadetList = data.object.weaponTrainingResultFilterPayload;
  //           }
  //           else {
  //             this.WTCadetList = []
  //           }
  //           this.cdref.detectChanges();
  //         }
  //         else {
  //           this.WTCadetList = []
  //         }
  //         this.spinner.hide()
  //         // var scrollElem = document.querySelector('#orders');
  //         // scrollElem.scrollIntoView();
  //       });
  //   }
  // }

}

