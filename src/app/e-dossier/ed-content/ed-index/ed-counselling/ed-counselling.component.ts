import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ms-ed-counselling',
  templateUrl: './ed-counselling.component.html',
  styleUrls: ['./ed-counselling.component.scss']
})
export class EdCounsellingComponent implements OnInit {


  datePipe = new DatePipe('en-IN');
  // minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  counsellingForm: FormGroup = new FormGroup({});
  Id;
  terms;
  isError;
  termId;
  constructor(private service: AdminService, private EDossierService: EDossierService, private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route: ActivatedRoute) {

    this.Id = this.route.snapshot.queryParamMap.get('Id');
    this.termId = this.route.snapshot.queryParamMap.get('termId');

    this.counsellingForm = this.fb.group({
      counsArrayForm: this.fb.array([]),
    })
  }


  getCouns() {
    console.log('add');
    return this.fb.group({
      date: ['', Validators.required],
      termId: ['', Validators.required],
      details: ['', Validators.required],
      gcInitialsWithDate: [''],
      serviceId: this.Id,
      status: ['1']
    })
  }
  get getForm() {
    return this.counsellingForm.get('counsArrayForm') as FormArray;
  }

  addForm() {
    this.getForm.push(this.getCouns());
  }

  removeAForm(i) {
    this.getForm.removeAt(i)
  }

  goBack() {
    window.history.back()
  }

  ngOnInit(): void {
    console.log("CserviceId--->>", localStorage.getItem("e"));
    console.log("CName--->>", localStorage.getItem("i"));
    console.log("cCourseName--->>", localStorage.getItem("courseNo"));
    (<HTMLInputElement>document.getElementById("cCompName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("cServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("cName")).value = localStorage.getItem("i");
    // (<HTMLInputElement>document.getElementById("cCourseName")).value = localStorage.getItem("courseNo");
    (<HTMLInputElement>document.getElementById("ctermname")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("cRank")).value = localStorage.getItem("rank");
    (<HTMLInputElement>document.getElementById("cbattalionName")).value = localStorage.getItem("battalionName");


  }


  ngAfterViewInit() {
    this.getEdossiercouns()
    this.getTerms()
  }


  TID: any; UPDATETERM:any = [];
  getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        if (res.status == '1') {
          this.terms = res.List;
          console.log(this.terms);
          if (this.termId === "1") {
            const includesArr = [1];
            this.terms = this.terms.filter(function (e)
              {
                if (includesArr.includes(e.id)) {
                  return true;
                }
              }
            );
            console.log(this.terms);
          } else if (this.termId === "2") {
            const includesArr = [2];
            this.terms = this.terms.filter(function (e)
              {
                if (includesArr.includes(e.id)) {
                  return true;
                }
              }
            );
          } else if (this.termId === "3") {
            const includesArr = [3];
            this.terms = this.terms.filter(function (e)
              {
                if (includesArr.includes(e.id)) {
                  return true;
                }
              }
            );
          }
          else if (this.termId === "7") {
            const includesArr = [7];
            this.terms = this.terms.filter(function (e)
              {
                if (includesArr.includes(e.id)) {
                  return true;
                }
              }
            );
          }else if (this.termId === "8") {
            const includesArr = [8];
            this.terms = this.terms.filter(function (e)
              {
                if (includesArr.includes(e.id)) {
                  return true;
                }
              }
            );
          }
          this.cdref.detectChanges();
        }
      }
    )
  }

         


  getEdossiercouns() {
    this.EDossierService.getCounsDetails(this.Id).subscribe(
      res => {
        let values = res.object
        console.log("RESPONSE OF OBSN", res);
        if (res.status == 'OK') {
          if (res.object.length != 0) {
            for (let i = 0; i < res.object.length; i++) {
              const formVal = this.addResponseinForm(res.object[i]);
              this.getForm.push(formVal);
            }
          } else {
            console.log('addnew--');
            this.addForm();
          }
        } else {
          this.spinner.hide()
          this.adminservice.openSnackbar(res.message)
        }


      }
    )

  }

  addResponseinForm(res) {
    return this.fb.group({
      date: this.datePipe.transform(res.date, 'yyyy-MM-dd'),
      termId: res.termId,
      details: res.details,
      gcInitialsWithDate: res.gcInitialsWithDate,
      id: res.id,
      serviceId: res.serviceId,
      status: 1
    });
  }




 /* ==============Button===========*/
  // addCounssubmit() {

  //   this.addCounsellingsubmit(this.counsellingForm.value);
  // }

  
  addCounssubmit() {
    let counsellingFormvalid= this.counsellingForm.value;
      let id = counsellingFormvalid.id;
      const validateFormstatus = this.validateForm(counsellingFormvalid);
      if (validateFormstatus) {
      if(id == undefined || id == ''){
        for(let i=0;i<counsellingFormvalid.counsArrayForm.length;i++){
          counsellingFormvalid.counsArrayForm[i].details = counsellingFormvalid.counsArrayForm[i].details.trim();
          counsellingFormvalid.counsArrayForm[i].gcInitialsWithDate = counsellingFormvalid.counsArrayForm[i].gcInitialsWithDate.trim();
        }
        this.addCounsellingsubmit(counsellingFormvalid);
      }
    }
    }
    
    validateForm(counsellingFormvalid) {
      let flag = true;
      for(let i=0;i<counsellingFormvalid.counsArrayForm.length;i++){
        let counsellingData = counsellingFormvalid.counsArrayForm[i];
        if (!counsellingData.date || counsellingData.date.trim()=='' || !counsellingData.details || counsellingData.details.trim()=='' || !counsellingData.gcInitialsWithDate || counsellingData.gcInitialsWithDate.trim()=='') {
          this.adminservice.openSnackbar('Please fill all fields');
          flag = false;
        }
      }
      return flag;
    }



  
  addCounsellingsubmit(formVal) { 
    if (this.counsellingForm.invalid) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      // formVal.counsArrayForm.details = formVal.counsArrayForm.details.trim();
      // formVal.counsArrayForm.gcInitialsWithDate = formVal.counsArrayForm.gcInitialsWithDate.trim();

      this.EDossierService.addCounsDetails(formVal.counsArrayForm).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
             window.location.reload();

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
  }

}
