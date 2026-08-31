import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,FormControl, Validators } from '@angular/forms';
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
  selector: 'ms-obsn',
  templateUrl: './obsn.component.html',
  styleUrls: ['./obsn.component.scss']
})
export class ObsnComponent implements OnInit {

   
  datePipe = new DatePipe('en-IN');
  // minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  obsnDetailsFormI: FormGroup = new FormGroup({});
  obsn:FormArray;
  Id;
  terms;
  isError;
  termId;
  constructor(private service: AdminService,private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
      
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.obsnDetailsFormI= this.fb.group({
        
        obsnForm: this.fb.array([]),
      })
     }


     getObsn() {
       console.log('obsn add');
      return this.fb.group({
        date: ['', Validators.required],
        termId: ['', Validators.required],
        obsn:['',Validators.required],
        remarks:[''],
        sigOfPiCdr:[''],
        serviceId: this.Id,
        status:['1']
      })
    }
    get getForm() {
      return this.obsnDetailsFormI.get('obsnForm') as FormArray;
    }
   
    addForm() {
      this.getForm.push(this.getObsn());
    }
   
    removeAForm(i) {
      this.getForm.removeAt(i)
    }









  ngOnInit(): void {
    console.log('coy name-->>',localStorage.getItem("companyName"));
    console.log('Bn name-->>',localStorage.getItem("battalionName"));
    (<HTMLInputElement>document.getElementById("companyName")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("battalionName")).value = localStorage.getItem("battalionName");
    (<HTMLInputElement>document.getElementById("cadetServiceId")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("cadetName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("cadetRank")).value = localStorage.getItem("rank");
    (<HTMLInputElement>document.getElementById("cadettermname")).value = localStorage.getItem("termName");

  }

  


  ngAfterViewInit() {
  
    this.getEdossierObsn()
    this.getTerms()
  }

  goBack() {
    window.history.back()
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


  getEdossierObsn(){
        this.EDossierService.getObsnDetails(this.Id).subscribe(
          res => {
            let values = res.object
            console.log("RESPONSE OF OBSN",res);
            


        if (res.status == 'OK') {
          if (res.object.length != 0) {
            console.log(this.getForm);
            for(let i=0; i<res.object.length; i++)  {
              const formVal = this.addResponseinForm(res.object[i]);
              this.getForm.push(formVal);
            }
            console.log(this.getForm);
          } else {
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
      obsn:  res.obsn,
      remarks:res.remarks,
      sigOfPiCdr:res.sigOfPiCdr,
      id:res.id,
      serviceId: res.serviceId,
      status: 1
    });
  }

  addObsnsubmit1() {
    let obsnFormvalid= this.obsnDetailsFormI.value;
      let id = obsnFormvalid.id;
      const validateFormstatus = this.validateForm(obsnFormvalid);
      if (validateFormstatus) {
      if(id == undefined || id == ''){
        for(let i=0;i<obsnFormvalid.obsnForm.length;i++){
          obsnFormvalid.obsnForm[i].obsn = obsnFormvalid.obsnForm[i].obsn.trim();
          obsnFormvalid.obsnForm[i].remarks = obsnFormvalid.obsnForm[i].remarks.trim();
          obsnFormvalid.obsnForm[i].sigOfPiCdr = obsnFormvalid.obsnForm[i].sigOfPiCdr.trim();
        }
        this.addObsnsubmit(obsnFormvalid);
      }
    }
    }


  validateForm(obsnFormvalid) {
    let flag = true;
    console.log("obsnForm.date==>",obsnFormvalid.obsnForm);
    console.log("obsnForm.obsn==>",obsnFormvalid.obsn);

    for(let i=0;i<obsnFormvalid.obsnForm.length;i++){
      let obsnData = obsnFormvalid.obsnForm[i];
      if (!obsnData.date || obsnData.date.trim()=='' || !obsnData.obsn || obsnData.obsn.trim()=='' || !obsnData.remarks || obsnData.remarks.trim()=='' || !obsnData.sigOfPiCdr || obsnData.sigOfPiCdr.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
    }
    return flag;
  }
  
  




  
  addObsnsubmit(formVal) {
   
    if (this.obsnDetailsFormI.invalid) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      // formVal.obsn = formVal.obsnForm.obsn.trim();
      // formVal.remarks = formVal.obsnForm.remarks.trim();
      // formVal.sigOfPiCdr = formVal.obsnForm.sigOfPiCdr.trim(); 
      
      this.EDossierService.addObsnDetails(formVal.obsnForm).subscribe(
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