import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings, StringText } from 'app/Shared/constant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-weapons',
  templateUrl: './add-weapons.component.html',
  styleUrls: ['./add-weapons.component.scss']
})
export class AddWeaponsComponent implements OnInit {
  id: number;
  weaponsForm: FormGroup;
  Weapons: FormArray;
  isError: Boolean;
  terms: any[];
  pTitle: string;
  mainTitle:string;
  isDuplicate: boolean;
  pattern: string = "^[a-zA-Z0-9 ]*$";
  term: number;
  isTerm: boolean;

  constructor(private _fb: FormBuilder, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private service: TrgTeamService, private router: Router,
    private _trgBattalion: TrgBattalionService, private cdref: ChangeDetectorRef,) {
      this.term = +this.activeRoute.snapshot.queryParamMap.get('term');
    this.weaponsForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern(this.pattern)]],
      gPointIIITerm:['', Validators.required],
      gPointIITerm:['', Validators.required],
      gPointITerm:['', Validators.required],
      gPointIITech:['', Validators.required],

      wa: this._fb.array([this.createWeapon()]),
      status: ['1', Validators.required],
      id: [],
    });
  }

  ngOnInit(): void {
    this.getTerms();
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    if (this.term > 0 && !this.id ) {      
      this.isTerm = false;
    }
    else {
      this.isTerm = true;
    }
    if (this.id > 0) {
      this.pTitle = "View Weapon";
      if (this.term == 1) {
        this.mainTitle="Term I Weapon";
      }
      else if (this.term == 2) {
        this.mainTitle="Term II Weapon";
        
      }
      else if (this.term == 3) {
        this.mainTitle="Term III Weapon";
      }
      this.getWeponById();
      }
      else {
      if (this.term == 1) {
        this.mainTitle="Term I Weapon";
      }
      else if (this.term == 2) {
        this.mainTitle="Term II Weapon"; 
      }
      else if (this.term == 3) {
        this.mainTitle="Term III Weapon";
      }
        this.pTitle = "Add Weapon";
    }
  }

  getWeponById() {
    this.service.getByIdWeapon(this.id).subscribe(res => {
      this.patchValueForm(res.object);
      this.patchWa(res.object);
    })
  }

  patchValueForm(formData) {
    this.weaponsForm.patchValue({
      name: formData.name,
      status: formData.status,
      gPointIITech:formData.gPointIITech,
      gPointIIITerm: formData.gPointIIITerm,
      gPointIITerm: formData.gPointIITerm,
      gPointITerm: formData.gPointITerm,
      id: formData.id
    });
  }

  patchWa(formData) {
    for (var i = 0; i < formData.wa.length; i++) {
      if (formData.wa.length != i && this.weaponsForm.value.wa.length != formData.wa.length) {
        this.addItem();
      }
    }
    if (formData.wa.length != 0) {
      this.weaponsForm.patchValue({ wa: formData.wa });
    }
  }


  getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }

  get f() {
    return this.weaponsForm.controls;
  }
  get wa() {
    return this.weaponsForm.controls["wa"] as FormArray;
  }

  createWeapon() {    
    if (this.term == 1) {
      return this._fb.group({
        attrName: ['', [Validators.required, Validators.pattern(this.pattern)]],
        termId: ['1', Validators.required],
        maxMarks: ['', [Validators.required, Validators.pattern(this.pattern)]],
        id: [],
      })
    }
    else if (this.term == 2) {
      return this._fb.group({
        attrName: ['', [Validators.required, Validators.pattern(this.pattern)]],
        termId: ['2', Validators.required],
        maxMarks: ['', [Validators.required, Validators.pattern(this.pattern)]],
        id: [],
      })
    }
    else if (this.term == 3) {
      return this._fb.group({
        attrName: ['', [Validators.required, Validators.pattern(this.pattern)]],
        termId: ['3', Validators.required],
        maxMarks: ['', [Validators.required, Validators.pattern(this.pattern)]],
        id: [],
      })
    }
    else if (this.term == 7) {
      return this._fb.group({
        attrName: ['', [Validators.required, Validators.pattern(this.pattern)]],
        termId: ['7', Validators.required],
        maxMarks: ['', [Validators.required, Validators.pattern(this.pattern)]],
        id: [],
      })
    }
    else {
      return this._fb.group({
        attrName: ['', [Validators.required, Validators.pattern(this.pattern)]],
        termId: ['', Validators.required],
        maxMarks: ['', [Validators.required, Validators.pattern(this.pattern)]],
        id: [],
      })
    }

  }

  addItem(): void {
    this.wa.push(this.createWeapon());
  }

  deleteWeapon(i: number) {
    this.wa.removeAt(i);
  }














  
  addWeapons() {
    if (this.weaponsForm.valid) {
      this.isError = false;
      this.count_duplicate();
      if (this.isDuplicate) {
        this._trgBattalion.openSnackbar(StringText.duplicate);
      }
      else {
        this.service.addWeapon(this.weaponsForm.value).subscribe(res => {
          this.service.openSnackbar(res.object.message);
          console.log(this.weaponsForm.value)
          if (this.term > 0) {   
            this.apiRes(res);
          }
          else{
            this.weaponsForm.reset();
            // this.weaponsForm.value.wa.clear();
            this._trgBattalion.openSnackbar(StringText.weapon);
          }
        })
      }
    } else {
      this.isError = true;
    }
  }

  updateWeapons() {
    if (this.weaponsForm.valid) {
      this.isError = false;
      this.count_duplicate();
      if (this.isDuplicate) {
        this._trgBattalion.openSnackbar(StringText.duplicate);
      }
      else {
        this.service.updateWeapon(this.weaponsForm.value).subscribe(res => {
          this.apiRes(res);
        })
      }
    } else {
      this.isError = true;
    }
  }

  count_duplicate() {
    this.isDuplicate = false;
    let counts = {};
    const result = []
    console.log("this.weaponsForm.value.wa-->>",this.weaponsForm.value);
    
    for (let i = 0; i < this.weaponsForm.value.wa.length; i++) {
      console.log("counts11==>>",counts[this.weaponsForm.value.wa[i].attrName]);
      if (counts[this.weaponsForm.value.wa[i].attrName]) {
        counts[this.weaponsForm.value.wa[i].attrName] += 1;
        console.log("counts22==>>",counts[this.weaponsForm.value.wa[i].attrName]);
      } else {
        counts[this.weaponsForm.value.wa[i].attrName] = 1;
      }
    }
    console.log("counts===>>>",counts);
    

    for (let prop in counts) {
      console.log("prop---->>>",prop);
      console.log("counts[prop]==>>",counts[prop]);
      
      if (counts[prop] >= 2) {
        result.push(prop)
      }
    }

    console.log("result-->>>",result);
    
    if (result.length) {
      // var filter = this.weaponsForm.value.wa.filter((element) => {
      //   console.log(result[0],">>>>>>>>>>----");
        
      //   return element.attrName == result[0];
      // });
      var filterTest = [];
      var filter;
      for(let i=0;i<result.length;i++){
        filter = this.weaponsForm.value.wa.filter((element) => {
          console.log(result[i],">>>>>>>>>>----");
          
          return element.attrName == result[i];
        });
        for(let j=0;j<filter.length;j++){
          filterTest.push(filter[j]);
        }
      }
      console.log("filter---->>>",filter);
      console.log("filterTest---->>>",filterTest);
      
      for (let index = 0; index < filterTest.length - 1; index++) {
        if (filterTest[index].termId == filterTest[index + 1].termId) {
          this.isDuplicate = true;
          console.log("is", this.isDuplicate);
        }
        else {
         // this.isDuplicate = false;
          console.log("is", this.isDuplicate);
        }
      }
    }
    else {
      this.isDuplicate = false;
      console.log("outside result", this.isDuplicate);
    }
  }

  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide();
      this._trgBattalion.openSnackbar(res.message)
      this.routeNavigate();
    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message)
    }
  }
  routeNavigate(){
    if (this.term == 1) {
      this.router.navigate(['main/admin/trg-team/weapons/1']);
    }
    else if (this.term == 2) {
      this.router.navigate(['main/admin/trg-team/weapons/2']);
    }
    else if (this.term == 3) {
      this.router.navigate(['main/admin/trg-team/weapons/3']);
    }
  }

  goBack() {
   this.routeNavigate();
  }

}