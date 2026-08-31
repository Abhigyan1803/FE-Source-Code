import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {


  result;
  Id;
  isError;
  isDoc;
  termId;
  clubDetailsFormI: FormGroup = new FormGroup({});
  clubDetailsFormII: FormGroup = new FormGroup({});
  clubDetailsFormIII: FormGroup = new FormGroup({});
  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.clubDetailsFormI= this.fb.group({
        details: ['', Validators.required],
        loc: ['', Validators.required],
        performance:['',Validators.required],
        id:[''],
        termId:[1],
        serviceId: this.Id
      })
      this.clubDetailsFormII = this.fb.group({
        details: ['', Validators.required],
        loc: ['', Validators.required],
        performance:['',Validators.required],
        id:[''],
        termId:[2],
        serviceId: this.Id
      })
      this.clubDetailsFormIII = this.fb.group({
        details: ['', Validators.required],
        loc: ['', Validators.required],
        performance:['',Validators.required],
        id:[''],
        termId:[3],
        serviceId: this.Id
      })
      this.clubDetailsFormII = this.fb.group({
        details: ['', Validators.required],
        loc: ['', Validators.required],
        performance:['',Validators.required],
        id:[''],
        termId:[7],
        serviceId: this.Id
      })
      this.clubDetailsFormIII= this.fb.group({
        details: ['', Validators.required],
        loc: ['', Validators.required],
        performance:['',Validators.required],
        id:[''],
        termId:[8],
        serviceId: this.Id
      })
     }

     ngOnInit(): void {
       
       (<HTMLInputElement>document.getElementById("clubServiceID")).value = localStorage.getItem("e");
      (<HTMLInputElement>document.getElementById("clubName")).value = localStorage.getItem("i");
      (<HTMLInputElement>document.getElementById("clubComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("clubBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("clubtid")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("clubtname")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("clubrk")).value = localStorage.getItem("rank");
     }

     ngAfterViewInit() {
     
      this.getEdossierClub()
    }
    goBack() {
      window.history.back()
    }


    getEdossierClub(){
          this.EDossierService.getClubDetails(this.Id).subscribe(
            res => {
              this.spinner.show();
              let values = res.object

          if (res.status == 'OK') {
            this.spinner.hide();

            if (res.object && res.object.termId === 1) {
              this.clubDetailsFormI.patchValue({
                details: res.object.details,
                loc: res.object.loc,
                performance:  res.object.performance,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 2) { 
              this.clubDetailsFormII.patchValue({
                details: res.object.details,
                loc: res.object.loc,
                performance:  res.object.performance,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 3) { 
              this.clubDetailsFormIII.patchValue({
                details: res.object.details,
                loc: res.object.loc,
                performance:  res.object.performance,
                id:res.object.id
              }) 
             } else if (res.object && res.object.termId === 7) { 
                this.clubDetailsFormII.patchValue({
                  details: res.object.details,
                  loc: res.object.loc,
                  performance:  res.object.performance,
                  id:res.object.id
                }) 
              }else if (res.object && res.object.termId === 8) { 
                  this.clubDetailsFormIII.patchValue({
                    details: res.object.details,
                    loc: res.object.loc,
                    performance:  res.object.performance,
                    id:res.object.id
                  }) 
                
            }
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    
    }



    validateFormI (clubForm) {
      let flag = true;
      if (!clubForm.details || clubForm.details.trim()=='' || !clubForm.loc || clubForm.loc.trim()=='' || !clubForm.performance || clubForm.performance.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }

    validateFormII (clubForm) {
      let flag = true;
      if (!clubForm.details || clubForm.details.trim()=='' || !clubForm.loc || clubForm.loc.trim()=='' || !clubForm.performance || clubForm.performance.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }

    validateFormIII (clubForm) {
      let flag = true;
      if (!clubForm.details || clubForm.details.trim()=='' || !clubForm.loc || clubForm.loc.trim()=='' || !clubForm.performance || clubForm.performance.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }



    addClubsubmit1() {
      // if(newDate(this.clubDetailsFormI.get('startDate').value) > newDate(this.clubDetailsFormI.get('endDate').value)) {
      //   error show
      //   return false;
      // }
      let clubForm= this.clubDetailsFormI.value;
      const validateFormstatus = this.validateFormI(clubForm);
      const id = clubForm.id;

      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addClubsubmit(clubForm);
        } else {
          this.updateClub(clubForm);
        }
    }
  }
    addClubsubmit2() {
      let clubForm= this.clubDetailsFormII.value;
      const validateFormstatus = this.validateFormII(clubForm);
      const id = clubForm.id;

      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addClubsubmit(clubForm);
        } else {
          this.updateClub(clubForm);
        }
    }
  }
    addClubsubmit3() {
      let clubForm= this.clubDetailsFormIII.value;
      const validateFormstatus = this.validateFormIII(clubForm);
      const id = clubForm.id;

      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addClubsubmit(clubForm);
        } else {
          this.updateClub(clubForm);
        }
    }
  }


    addClubsubmit(formVal) {
      formVal.details = formVal.details.trim();
      formVal.loc = formVal.loc.trim();
      formVal.performance = formVal.performance.trim(); 
        this.EDossierService.addClubDetails(formVal).subscribe(
          res => {
            console.log(res);
            this.spinner.hide();
            if (res.status == 'OK') {
              this.spinner.hide();
              this.adminservice.openSnackbar(res.message)
              window.location.reload();
              // this.router.navigate(['e-dossior/ed-content/Ed-index/Otherdetails/club']);
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
        );
        this.getEdossierClub();
      }
 
        updateClub(formVal) {
            this.EDossierService.updateClubDetails(this.Id,formVal).subscribe(
              res => {
                console.log(res);
      
                if(res.status == 'OK'){
                  this.spinner.hide();
                  //  this.router.navigate(['e-dossior/ed-content/Ed-index/Otherdetails/club']);
                  this.adminservice.openSnackbar(res.message);
              window.location.reload();
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
