import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
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
  selector: 'ms-ssbreport',
  templateUrl: './ssbreport.component.html',
  styleUrls: ['./ssbreport.component.scss']
})
export class SsbreportComponent implements OnInit {
  termId: any;
  serviceId: any;
  id: any;
  datePipe = new DatePipe('en-IN');
  ssbreportForm: FormGroup = new FormGroup({});
  date: string;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private trg_team_services:TrgTeamService,
    private el: ElementRef) {
      var today = new Date();
      var DATE = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var x =   this.datePipe.transform(DATE, 'yyyy-MM-dd')
     this.ssbreportForm = this.fb.group({
      id: [''],
      positiveTraits: ['', Validators.required],
      negativeTraits: ['', Validators.required],
      avgResult: ['', Validators.required],
      location: ['', Validators.required],
      date: ['',],
      result: ['', Validators.required],
      achivements: ['', Validators.required],
      weakness: ['', Validators.required],
      status: [1],
    });
    this.ssbreportForm.get('date').patchValue(x);
    this.serviceId = this.route.snapshot.queryParamMap.get('Id');
    this.termId = this.route.snapshot.queryParamMap.get('termId');

    this.getssbreportbyserviceid();
  }

  
  ngOnInit(): void {
  

    // (<HTMLInputElement>document.getElementById("currentDate")).value = this.date;
    console.log(localStorage.getItem("e"), '1111');
    console.log(localStorage.getItem("i"), '2222');
    (<HTMLInputElement>document.getElementById("ssbID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("ssbName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("ssbComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("ssbBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("ssbTermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("ssbTermName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("ssbRk")).value = localStorage.getItem("rank");
  }
  ngAfterViewInit(): void {
  }


  onChange(e) {
    // alert(e.target.value)
  }

  status: any;
  positiveTraits: any;
  negativeTraits: any; obj: any;
  getssbreportbyserviceid() {
    this.edossierservice.getssbreportservicebyid(this.serviceId).subscribe(res => {
      this.spinner.show();
      if (res.message == "Record found successfully") {
        this.spinner.hide()
        this.obj = res.object;
      
        this.ssbreportForm.patchValue({
          id: this.obj.id,
          positiveTraits: this.obj.positiveTraits,
          negativeTraits: this.obj.negativeTraits,
          location: this.obj.location,
          achivements: this.obj.achivements,
          result: this.obj.result,
          date: this.datePipe.transform(this.obj.date, 'yyyy-MM-dd'),
          weakness: this.obj.weakness,
          avgResult: this.obj.avgResult,


        });
        this.trg_team_services.openSnackbar(res.message);
        console.log(this.ssbreportForm.value);
       
       this.id = this.obj.id;

    
       err => {
        this.spinner.hide()
        this.trg_team_services.openSnackbar("Some Error Occured.");
      }
      }
   
      else{
        this.spinner.hide()
        this.trg_team_services.openSnackbar(res.message);
      }


    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.ssbreportForm.controls;
  }

  submitted:boolean=false;
  data: any; isError:boolean=false;
  onSubmit() {
     if(this.ssbreportForm.invalid){
    // this.submitted = true;  
    this.isError = true;
    for (const key of Object.keys(this.ssbreportForm.controls)) {
      if (this.ssbreportForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
     }
}
  } else
  {
    console.log(this.ssbreportForm.value)
    this.data = this.ssbreportForm.value;
    this.data['termId'] = this.termId;
    this.data['serviceId'] = this.serviceId;
    console.log(this.data);
    if (this.id == undefined || this.id == null || this.id == '') {
      this.edossierservice.addssbreport(this.data).subscribe(res => {
        this.spinner.show();
        console.log(res);
        if (res.status == 'OK') {
          this.spinner.hide()
          this.trg_team_services.openSnackbar(res.message);
          window.history.back();
  
        }
        err => {
          this.spinner.hide()
          this.trg_team_services.openSnackbar("Some Error Occured.");
        }
      }
      );
    }
    else
    {
      this.data = this.ssbreportForm.value;
      this.edossierservice.updatessbreport(this.data).subscribe(res => {
        this.spinner.show();
        console.log(res);
        if (res.status == 'OK') {
          this.spinner.hide()
          this.trg_team_services.openSnackbar(res.message);
          window.history.back();
  
        }
        err => {
          this.spinner.hide()
          this.trg_team_services.openSnackbar("Some Error Occured.");
        }
      }
      )
    }
    
    window.history.back();
  }
  



  }

  
  goBack() {
    window.history.back();
  }

  onUpdate() {
   
  }

}
