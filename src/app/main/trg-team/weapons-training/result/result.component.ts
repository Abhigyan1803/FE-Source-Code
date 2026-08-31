import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { count } from 'd3-array';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'ms-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  activeTab = 0;
  weaponList: any[];
  weaponMarksForm: FormGroup;
  tabIndex: number;
  finalresult: any;
  attrName: any;
  total: any = [];
  AddTotal: number = 0;
  tempObj: any = [];
  attrInput: any = [];
  arrayHeadTotal: any = [];
  tempObj1: any = [];
  totalHeadValue: number = 0;
  grandTotal: number;
  gPT: any;
  WTT: any[] = [];
  id;
  wttMark;
  spotTestMark;
  show: boolean = false;
  isError: boolean = false;
  serviceId: string;
  TotalMAxMarks: number;
  resultAlreadyExist: boolean;
  percent: number = 0;

  constructor(private service: TrgTeamService, private _router: Router, private dialog: MatDialog,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute,
    private _fb: FormBuilder, private snackbar: MatSnackBar,) {
    this.serviceId = this.route.snapshot.queryParamMap.get('id');

    this.weaponMarksForm = this._fb.group({

      'grandTotal': [''],
      'id': ['',],
      'remark': ['',],
      'serviceId': [this.serviceId],
      'spotTest': ['',],
      'termId': ['1',],
      'wtt': ['',],
      'maxGrandTotal': [''],
      'maxSpotTest': ['40'],
      'maxWtt': ['40'],

      cadetWTMainResultlist: this._fb.array([])
    })
  }

  gunsMarksInput(value) {
    console.log("Value======", value);
    this.TotalMAxMarks = value.totalMaxMarks;
    const gunsMarks = this._fb.group({
      'name': [value.name, [Validators.required]],
      'id': [value.id, [Validators.required]],
      'marks': [value.marks, [Validators.required]],
      'maxMarks': [value.totalMaxMarks],
      'maxGPoint': [value.gPointITerm],
      'std': [value.std, [Validators.required]],
      'gPoint': [value.gPoint, [Validators.required]],
      'remark': [value.remark123,],
      'serviceId': [this.serviceId],
      'status': ['1',],
      'weaponId': [value.id, Validators.required],
      'termId': [1, Validators.required],

      'cadetWTResultlist': this._fb.array([]),
    });
    // console.log("result control", gunsMarks);
    (<FormArray>this.weaponMarksForm.get('cadetWTMainResultlist')).push(gunsMarks);
    const userIndex = (<FormArray>this.weaponMarksForm.get('cadetWTMainResultlist')).length - 1;
    value.wa.forEach(element => {
      // console.log("loop count", element);
      if (element.termId == 1) {
        // this.totalHeadValue += element.maxMarks
        this.createInput(userIndex, element);
      }
    });

  }

  onFocusOutEvent(event, index, maximummarks,resultIndex) {
    console.log("onFocusOutEvent  tabIndex->" + this.activeTab + ", totalArr", this.total);
    if (event == NaN || event == '') {
      event = 0
    }

    if (event > maximummarks || event == NaN || event == '') {
      this.service.openSnackbar("Obtained marks is large then Total marks")
      console.log('rrrrrrr',resultIndex)
      // console.log('mmmmmmmmmm',this.cadetWTMainResultlist.value.at(index).cadetWTResultlist[resultIndex].marks)
      // this.cadetWTMainResultlist.value.at(index).cadetWTResultlist[resultIndex].marks = 0
      // console.log('mmmmmmmmmm',this.cadetWTMainResultlist.value.at(index).cadetWTResultlist[resultIndex].marks)
      let v = this.cadetWTMainResultlist.controls[index].get('cadetWTResultlist');
      console.log(v,"another test");
    //  console.log(this.cadetWTMainResultlist.value.at(index).cadetWTResultlist[resultIndex].marks.setValue(''),">>>>>>>>");
     
      return false;
    }

    console.log("onfocus out", event);
    this.total[this.activeTab] = this.total[this.activeTab] + parseInt(event);
    this.cadetWTMainResultlist.at(index).get('marks').patchValue(this.total[this.activeTab])


    console.log(this.total[this.activeTab], "obtained TOTAL")
    console.log(this.cadetWTMainResultlist, "this.cadetWTMainResultlist marks")
    console.log("this.activeTab===>>>", this.activeTab);
    //this.activeTab=0;
    this.percent = ((this.total[this.activeTab] / this.cadetWTMainResultlist.value[this.activeTab].maxMarks) * 100)
    // const gPT = ((this.weaponList[0].gPointITerm / 100) * percent)
    // console.log(this.weaponList[0].gPointITerm, "this.weaponList[0].gPointITerm")
    const gPT = ((this.cadetWTMainResultlist.value[this.activeTab].maxGPoint / 100) * this.percent)
    console.log(this.percent, "percent calculate")
    console.log(gPT, "gpt calculate")
    Math.round(this.percent); 
    this.cadetWTMainResultlist.at(index).get('gPoint').patchValue(Math.round(gPT))
    if (this.percent > 70) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Marksman')
    }
    else if (this.percent >= 60 && this.percent <= 69) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('First Class')
    }
    else if (this.percent >= 40 && this.percent <= 59) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Standard Shot')
    }
    else {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Fail')
    }
  }

  onFocusOutEventAdd(event, index, maximummarks) {
    // console.log("onFocusOutEvent  tabIndex->"+this.activeTab+", totalArr",this.total);
    if (event == NaN || event == '') {
      event = 0
    }


    if (event > maximummarks || event == NaN || event == '') {
      this.service.openSnackbar("Obtained marks is large then Total marks")
      this.cadetWTMainResultlist.at(index).get('marks').setValue('');

      return false;
    }

    // console.log("onfocus out", event);
    this.AddTotal = this.AddTotal + parseInt(event);
    this.cadetWTMainResultlist.at(index).get('marks').patchValue(this.AddTotal)
    // console.log(this.AddTotal, "obtained TOTAL")
    // console.log(this.cadetWTMainResultlist, "this.cadetWTMainResultlist marks")
    // console.log("this.activeTab===>>>",this.activeTab);
    this.percent = ((this.AddTotal / this.cadetWTMainResultlist.value[this.activeTab].maxMarks) * 100)
    const gPT = ((this.cadetWTMainResultlist.value[this.activeTab].maxGPoint / 100) * this.percent)
    console.log(this.percent, "this.percent calculate")
    console.log(gPT, "gpt calculate")
    Math.round(this.percent);
    this.cadetWTMainResultlist.at(index).get('gPoint').patchValue(Math.round(gPT))
    if (this.percent > 70) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Marksman')
    }
    else if (this.percent >= 60 && this.percent <= 69) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('First Class')
    }
    else if (this.percent >= 40 && this.percent <= 59) {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Standard Shot')
    }
    else {
      this.cadetWTMainResultlist.at(index).get('std').patchValue('Fail')
    }
  }

  onChange(value2, index, maximummarks) {
    console.log("onChange  tabIndex->" + this.activeTab + ", totalArr", this.total);
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = 0;
    }
    if (value2 > maximummarks) {
      this.service.openSnackbar("Obtained marks is large then Total marks")
     
      return false;
    }
    console.log("this.activeTab==>" + this.activeTab);
    console.log("Before total-->" + this.total[this.activeTab] + ", value-->" + value2);
    this.total[this.activeTab] -= parseInt(value2);
    console.log("after total-->" + this.total[this.activeTab] + ", value-->" + value2);
    if (this.total[this.activeTab] == NaN) {
      this.total[this.activeTab] = 0
    }
    console.log(this.total[this.activeTab], 'dj')
    this.cadetWTMainResultlist.at(index).get('marks').patchValue(this.total[this.activeTab])
  }

  onChangeAdd(value2, index, maximummarks) {
    // console.log("onChange  tabIndex->"+this.activeTab+", totalArr",this.total);
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = 0;
    }
    if (value2 > maximummarks) {
      this.service.openSnackbar("Obtained marks is large then Total marks")
      return false;
    }
    console.log("Before total-->" + this.AddTotal + ", value-->" + value2);
    this.AddTotal -= parseInt(value2);
    console.log("after total-->" + this.total[this.activeTab] + ", value-->" + value2);
    if (this.total[this.activeTab] == NaN) {
      this.AddTotal = 0
    }
    console.log(this.AddTotal, 'dj')
    this.cadetWTMainResultlist.at(index).get('marks').patchValue(this.AddTotal)
  }

  onFocusOutEvent1(event) {
    if (event == NaN || event == '') {
      event = 0
    }
    console.log("onfocus out", event);
    this.grandTotal = this.grandTotal + parseInt(event);
    this.weaponMarksForm.get('grandTotal').patchValue(this.grandTotal)
  }

  onChange1(value2) {
    if (value2 == NaN || value2 == '' || value2 == undefined) {
      value2 = 0;
    }
    this.grandTotal -= parseInt(value2);
    if (this.grandTotal == NaN) {
      this.grandTotal = 0
    }
    console.log(this.grandTotal, 'onchange1')
  }

  get cadetWTMainResultlist(): FormArray {
    return this.weaponMarksForm.get("cadetWTMainResultlist") as FormArray
  }

  marksInputControl(Index: number): FormArray {
    // console.log(this.result.at(Index).get("marks") as FormArray,"=================+++++");
    return this.cadetWTMainResultlist.at(Index).get("cadetWTResultlist") as FormArray
  }

  createInput(resultIndex, data?: any) {
    // console.log(data, 'lakhan bhai')
    console.log("resultIndex", resultIndex);
    this.attrInput = this._fb.group({
      'attributeId': [data.id],
      'attrName': [data.attrName, Validators.required],
      'maxMarks': [data.maxMarks, Validators.required],
      'marks': [data.marks, Validators.required],
      'id': [data.id, Validators.required],
      'termId': [data.termId, Validators.required],
      'serviceId': [this.serviceId],
      'weaponId': [data.id, Validators.required],
      'status': ['1',],

    });

    (<FormArray>(<FormGroup>(<FormArray>this.weaponMarksForm.controls['cadetWTMainResultlist'])
      .controls[resultIndex]).controls['cadetWTResultlist']).push(this.attrInput);
  }


  // getWeapons(id) {
  //   this.weaponList = [];
  //   this.service.getWeaponByTermResult(this.serviceId, id).subscribe(res => {
  //     if (res.status = "OK") {
  //       this.weaponList = res.object;
  //       console.log(this.weaponList, "==get weapon==")
  //       this.weaponList.forEach(weapon => {
  //         this.gunsMarksInput(weapon);
  //         console.log(weapon, 'vvvvvvvvv')
  //       })

  //     }
  //     else {
  //       this.weaponList = [];
  //     }
  //   })
  // }

  getWTT() {
    this.spinner.show();
    this.service.getWTT(1).subscribe(res => {
      console.log(res, "WTT");

      if (res.status == "OK") {
        this.WTT = res.object;
   

        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "=================");

      }
      else {
        this.spinner.hide()
        this.service.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.");
      }

    )
  }





  ngOnInit(): void {
    // this.getWeapons(1);
    // this.getSessionStorage();
    this.STd();
    this.getWTT();

    // this.serviceId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.serviceId);

    this.service.getWeaponByTermResult(this.serviceId, 1).subscribe(
      res => {
        console.log(res, "for update");

        if (res.status == 'OK') {
          this.show = true;
          if (res.message == 'update') {
            this.resultAlreadyExist = true;
            this.weaponMarksForm.patchValue({
              id: res.object.id,
              name: res.object.name,
              std: res.object.std,
              gPoint: res.object.gPoint,
              remark: res.object.remark,
              serviceId: res.object.serviceId,
              status: res.object.status,
              spotTest: res.object.spotTest,
              termId: res.object.termId,
              grandTotal: res.object.grandTotal,
              wtt: res.object.wtt,
            })
            //this.grandTotal=res.object.grandTotal+res.object.wtt+res.object.spotTest;
            // this.patchValues(res.object.cadetWTMainResultlist)
            //   console.log(res.object.cadetWTMainResultlist,'pathch value print');

            for (let i = 0; i < res.object.cadetWTMainResultlist.length; i++) {
              console.log('name',)
              let WA: any = [];
              for (let j = 0; j < res.object.cadetWTMainResultlist[i].cadetWTResultlist.length; j++) {
                let wa = {
                  id: res.object.cadetWTMainResultlist[i].cadetWTResultlist[j].id,
                  // attributeId: res.object.cadetWTMainResultlist[i].cadetWTResultlist.attributeId,
                  attrName: res.object.cadetWTMainResultlist[i].cadetWTResultlist[j].attributeName,
                  maxMarks: res.object.cadetWTMainResultlist[i].cadetWTResultlist[j].maxMarks,
                  marks: res.object.cadetWTMainResultlist[i].cadetWTResultlist[j].marks,

                  termId: 1,

                }
                //  console.log(wa,"{{{{{{{{}}}}}}")
                WA.push(wa);
              }
              let value = {
                id: res.object.cadetWTMainResultlist[i].id,
                createdAt: "2021-09-29T12:56:17.000+00:00",
                gPoint: res.object.cadetWTMainResultlist[i].gPoint,
                totalMaxMarks: res.object.cadetWTMainResultlist[i].maxMarks,
                gPointITerm: res.object.cadetWTMainResultlist[i].maxGPoint,
                // gPoint: res.object.cadetWTMainResultlist[i].gPoint,
                std: res.object.cadetWTMainResultlist[i].std,
                marks: res.object.cadetWTMainResultlist[i].marks,
                // maxMarks: res.object.cadetWTMainResultlist[i].maxMarks,
                remark123: res.object.cadetWTMainResultlist[i].remark,
                name: res.object.cadetWTMainResultlist[i].weaponName,
                status: 1,
                updatedAt: "2021-09-29T12:56:17.000+00:00",
                wa: WA
              }

              this.total[i] = res.object.cadetWTMainResultlist[i].marks;
              console.log("i-->" + i + ", total-->" + this.total[i]);
              this.TotalMAxMarks = res.object.cadetWTMainResultlist[i].maxMarks;
              // console.log(res.object.cadetWTMainResultlist[i].cadetWTResultlist, "]]]]]]]]]]]]]]]");
              console.log(value, "[[[[[[[[[[[[[[[[[[");

              this.gunsMarksInput(value);
            }
          } else {
            this.total = [];
            this.resultAlreadyExist = false;
            for (let i = 0; i < res.object.length; i++) {
              this.gunsMarksInput(res.object[i]);
              console.log(res.object[i], "new response");

            }

          }
          this.cdref.detectChanges();
          this.spinner.hide()
        } else {
          this.total = [];
          this.spinner.hide()
          this.service.openSnackbar(res.message)
        }
      }
    )
  }




  tabChanged(event) {
    this.tabIndex = event;

  }



  next() {
    this.activeTab = this.tabIndex + 1;
    this.AddTotal = 0;
    this.tempObj[this.tabIndex] = {
      total: this.cadetWTMainResultlist.at(this.tabIndex).get('gPoint').value
    };
    console.log(this.tempObj);

    let resultTotal = 0;
    this.tempObj.forEach(
      el => {
        resultTotal = resultTotal + el.total;
      }
    )
    this.grandTotal = resultTotal + this.weaponMarksForm.get('wtt').value + this.weaponMarksForm.get('spotTest').value;
    console.log(this.grandTotal, "sumsum");
    console.log(this.weaponMarksForm.value);


  }



  back() {
    this.activeTab = this.tabIndex - 1;
  }
  goBack() {
    this._router.navigate(['main/trg-team/' + Routings.weaponTrainingPath]);
  }

  aa;
  a;

  enterMarks() {
    console.log(this.weaponMarksForm.value, "beforeS delete");
    this.show = false;
    this.spinner.show();
    delete this.weaponMarksForm.value.id;
    for (let i = 0; i < this.weaponMarksForm.value.cadetWTMainResultlist.length; i++) {
      delete this.weaponMarksForm.value.cadetWTMainResultlist[i].id;
      for (let j = 0; j < this.weaponMarksForm.value.cadetWTMainResultlist[i].cadetWTResultlist.length; j++) {
        delete this.weaponMarksForm.value.cadetWTMainResultlist[i].cadetWTResultlist[j].id;

      }

    }

    console.log(this.weaponMarksForm.value, "after delete");

    this.service.addResult(this.weaponMarksForm.value).subscribe(
      res => {
        console.log(this.weaponMarksForm.value);
        if (res.status == 'OK') {
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this._router.navigate(['main/trg-team/weapon/training']);
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.service.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateProgram() {
    console.log(this.weaponMarksForm.value);
    if (this.weaponMarksForm.valid) {
      this.spinner.show()
      this.service.updateResult(this.weaponMarksForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res)
        },
        err => {
          console.log(JSON.stringify(err));
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
    } else {
      this.openSnackbar('Please Fill All Required Fields.')
      this.service.updateResult(this.weaponMarksForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res)
        },
        err => {
          console.log(JSON.stringify(err));
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
      this.isError = true;
    }
  }

  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide();
      this.openSnackbar(res.message);
      this.goBack()
    }
    else {

      this.spinner.hide();
      this.openSnackbar(res.message);
    }
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  STd() {
    console.log(this.percent, "this.gPTthis.gPTthis.gPTthis.gPT");
    if (this.percent > 70) {

    }
  }


}