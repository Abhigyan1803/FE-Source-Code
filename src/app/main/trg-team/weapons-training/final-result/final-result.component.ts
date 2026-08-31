import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
import { json } from 'd3';

@Component({
  selector: 'ms-final-result',

  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {
 
	finalresult:any =[];
  activeTab = 0;
  weaponList: any[];
  weaponMarksForm: FormGroup;
  tabIndex: number;
  total: number = 0;
  constructor(private service: TrgTeamService, private _router: Router,
    private _fb: FormBuilder) {
    this.weaponMarksForm = this._fb.group({
      cadetWTMainResultlist: this._fb.array([])
    })
  }

  

  MainMarks(value) {
    console.log("Value", value);
    const mainmarks = this._fb.group({
      'name': [value.name, [Validators.required]],
      'total': ['0', [Validators.required]],
      'wtt': ['', [Validators.required]],
      'spot': ['', [Validators.required]],
      'gpt': ['', [Validators.required]],
      'remark': ['',],
      'marks': this._fb.array([]),
    });
    (<FormArray>this.weaponMarksForm.get('cadetWTMainResultlist')).push(mainmarks);
  }


  get cadetWTMainResultlist(): FormArray {
    return this.weaponMarksForm.get("cadetWTMainResultlist") as FormArray
  }


  getWeapons(id) {
    
    this.weaponList = [];
    this.service.getWeaponByTermResult(id,1).subscribe(res => {
      if (res.status = "OK") {
        this.weaponList = res.object;
        this.weaponList.forEach(weapon => {
          this.MainMarks(weapon);
        })
      }
      else {
        this.weaponList = [];
      }
    })
  }




  ngOnInit(): void {
    this.getWeapons(1);
    this.getSessionStorage();
  }

  sum
  public getSessionStorage(){
    this.finalresult = JSON.parse(sessionStorage.getItem('result'));
    // this.finalresult = sessionStorage.getItem('result');
    
    console.log(this.finalresult,"==============");
   
    let sum = 0;
    this.finalresult.forEach(
      el=>{
        sum = sum + el.total
      }
    )
this.sum=sum;
    console.log(this.sum);
  }

  



  tabChanged(event) {
    this.tabIndex = event;
  }

  submit() {
    this.activeTab = this.tabIndex + 1;
    this.total=0;

  }

  back() {
    this.activeTab = this.tabIndex - 1;
  }




  goBack() {
    this._router.navigate(['main/trg-team/' + Routings.trainingResultPath]);
  }

  enterMarks() {    
    this._router.navigate(['main/trg-team/' + Routings.finalResultPath]);
  }


}
