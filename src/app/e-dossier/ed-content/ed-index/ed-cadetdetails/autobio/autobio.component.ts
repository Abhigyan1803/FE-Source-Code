import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { es } from 'date-fns/locale';
import { escapeSelector } from 'jquery';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';

@Component({
  selector: 'ms-autobio',
  templateUrl: './autobio.component.html',
  styleUrls: ['./autobio.component.scss']
})
export class AutobioComponent implements OnInit {

  id: any;
  serviceId: any;
  termId: any;

  datePipe = new DatePipe('en-IN');
  autobioForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private EDossierService: EDossierService, private el: ElementRef,
    private trg_team_services:TrgTeamService) {
      var today = new Date();
      var d = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var x =   this.datePipe.transform(d, 'yyyy-MM-dd')
    this.autobioForm = this.fb.group({
      id: [''],
      general: ['', Validators.required],
      date: ['',],
      specialAchivement: ['', Validators.required],
      strength: ['', Validators.required],
      weakness: ['', Validators.required],
      isDeclared: [false, Validators.requiredTrue],
      status: [1],
      // termId:[],
      // serviceId:['D/5016']

    });
    this.autobioForm.get('date').patchValue(x);
    this.serviceId = this.route.snapshot.queryParamMap.get('Id');
    this.termId = this.route.snapshot.queryParamMap.get('termId');
    this.getautobiobyserviceid();
  }
  isDeclared: boolean;
  checkBoxValue: any;
  onChange(e) {
    this.checkBoxValue = e;
    if ( e.target.checked ) {
      this.isDeclared = true;
 }
    else{
      this.isDeclared = false;
    }

  }

  ngOnInit(): void {
    console.log(localStorage.getItem("e"), '1111');
    console.log(localStorage.getItem("i"), '2222');
    (<HTMLInputElement>document.getElementById("autobiographyID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("autobiographyName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("autobiographyComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("autobiographyBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("autobiographyTermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("autobiographyTermName")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("autobiographyRk")).value = localStorage.getItem("rank");
  }
  ngAfterViewInit(): void {
    // this.getautobio(),
    // this.getautobiobyserviceid(),
    // this.updateautobiography(),
    // this.addAutobio()


  }

  get f(): { [key: string]: AbstractControl } {
    return this.autobioForm.controls;
  }

  obj: any;
  getautobiobyserviceid() {
    this.edossierservice.getautobiographybyserviceid(this.serviceId).subscribe(res => {
      this.spinner.show();
      if (res.status == "OK") {
        this.spinner.hide();
        this.obj = res.object;


        this.autobioForm.patchValue({
          id: this.obj.id,
          general: this.obj.general,
          date: this.datePipe.transform(this.obj.date, 'yyyy-MM-dd'),
          specialAchivement: this.obj.specialAchivement,
          strength: this.obj.strength,
          weakness: this.obj.weakness,
          isDeclared: this.obj.isDeclared
        });
        this.trg_team_services.openSnackbar(res.message);
        console.log(this.autobioForm.value);
       
       this.id = this.obj.id;

    
       err => {
        this.spinner.hide()
        this.trg_team_services.openSnackbar("Some Error Occured.");
      }
       

      }
    });

  }



  data: any;isError:boolean=false;
  onSubmit() {

    if(this.autobioForm.invalid){
      // this.submitted = true;  
      this.isError = true;
      for (const key of Object.keys(this.autobioForm.controls)) {
        if (this.autobioForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  } 
    } 
    else{
      console.log(this.autobioForm.value)
      this.data = this.autobioForm.value;
      this.data['termId'] = this.termId;
      this.data['serviceId'] = this.serviceId;
      console.log(this.data);
      if (this.id == undefined || this.id == null || this.id == '') {
        this.edossierservice.addAutography(this.data).subscribe(res => {
          console.log(res);
          if (res.status == 'OK') {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message);
            window.history.back();
  
          }
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }
        }
        );
      }
      else {
        this.data = this.autobioForm.value;
        this.edossierservice.updateautobiography(this.data).subscribe(res => {
          console.log(res);
          if (res.status == 'OK') {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message);
            window.history.back()
  
          }
          err => {
            this.spinner.hide()
            this.adminservice.openSnackbar("Some Error Occured.");
          }
        }
        );
      }
  
      window.history.back();
  
    }

    

  }

    
  goBack() {
    window.history.back();
  }


}
