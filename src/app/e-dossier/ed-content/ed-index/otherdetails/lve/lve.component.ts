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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ms-lve',
  templateUrl: './lve.component.html',
  styleUrls: ['./lve.component.scss']
})
export class LveComponent implements OnInit {
  datePipe = new DatePipe('en-IN');

  result;
  Id;
  isError;
  isDoc;
  termId;
  lveDetailsFormI: FormGroup = new FormGroup({});
  lveDetailsFormII: FormGroup = new FormGroup({});
  lveDetailsFormIII: FormGroup = new FormGroup({});
  minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');
      
      this.lveDetailsFormI= this.fb.group({
        lveFrom: ['', Validators.required],
        lveTo: ['', Validators.required],
        reason:['',Validators.required],
        address:['',Validators.required],
        id:[''],
        termId:[1],
        serviceId: this.Id
      })
      this.lveDetailsFormII = this.fb.group({
        lveFrom: ['', Validators.required],
        lveTo: ['', Validators.required],
        reason:['',Validators.required],
        address:['',Validators.required],
        id:[''],
        termId:[2],
        serviceId: this.Id
      })
      this.lveDetailsFormIII = this.fb.group({
        lveFrom: ['', Validators.required],
        lveTo: ['', Validators.required],
        reason:['',Validators.required],
        address:['',Validators.required],
        id:[''],
        termId:[3],
        serviceId: this.Id
      })
      this.lveDetailsFormII = this.fb.group({
        lveFrom: ['', Validators.required],
        lveTo: ['', Validators.required],
        reason:['',Validators.required],
        address:['',Validators.required],
        id:[''],
        termId:[7],
        serviceId: this.Id
      })
      this.lveDetailsFormIII = this.fb.group({
        lveFrom: ['', Validators.required],
        lveTo: ['', Validators.required],
        reason:['',Validators.required],
        address:['',Validators.required],
        id:[''],
        termId:[8],
        serviceId: this.Id
      })
     }

     ngOnInit(): void {
      (<HTMLInputElement>document.getElementById("lveServiceID")).value = localStorage.getItem("e");
      (<HTMLInputElement>document.getElementById("lveName")).value = localStorage.getItem("i");
      (<HTMLInputElement>document.getElementById("lveComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("lveBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("lvetid")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("lvetName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("lverk")).value = localStorage.getItem("rank");
     
     }
     ngAfterViewInit() {
      // this.getAssignments()
      this.getEdossierLve()
    }

    goBack() {
      window.history.back()
    }


    getEdossierLve(){
          this.EDossierService.getLveDetails(this.Id).subscribe(
            res => {
              let values = res.object

          if (res.status == 'OK') {
            if (res.object && res.object.termId === 1) {
              console.log(res.object);
              this.lveDetailsFormI.patchValue({
                lveFrom: this.datePipe.transform(res.object.lveFrom, 'yyyy-MM-dd'),
                lveTo: this.datePipe.transform(res.object.lveTo, 'yyyy-MM-dd'),
                reason:  res.object.reason,
                address:  res.object.address,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 2) { 
              this.lveDetailsFormII.patchValue({
                lveFrom: this.datePipe.transform(res.object.lveFrom, 'yyyy-MM-dd'),
                lveTo: this.datePipe.transform(res.object.lveTo, 'yyyy-MM-dd'),
                reason:  res.object.reason,
                address:  res.object.address,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 3) { 
              this.lveDetailsFormIII.patchValue({
                lveFrom: this.datePipe.transform(res.object.lveFrom, 'yyyy-MM-dd'),
                lveTo: this.datePipe.transform(res.object.lveTo, 'yyyy-MM-dd'),
                reason:  res.object.reason,
                address:  res.object.address,
                id:res.object.id
              }) 
            }
            else if (res.object && res.object.termId === 7) { 
              this.lveDetailsFormII.patchValue({
                lveFrom: this.datePipe.transform(res.object.lveFrom, 'yyyy-MM-dd'),
                lveTo: this.datePipe.transform(res.object.lveTo, 'yyyy-MM-dd'),
                reason:  res.object.reason,
                address:  res.object.address,
                id:res.object.id
              }) 
            }
            else if (res.object && res.object.termId === 8) { 
              this.lveDetailsFormIII.patchValue({
                lveFrom: this.datePipe.transform(res.object.lveFrom, 'yyyy-MM-dd'),
                lveTo: this.datePipe.transform(res.object.lveTo, 'yyyy-MM-dd'),
                reason:  res.object.reason,
                address:  res.object.address,
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



    validateFormI (livForm) {
      let flag = true;
      if (!livForm.lveFrom || livForm.lveFrom.trim()=='' || !livForm.lveTo || livForm.lveTo.trim()=='' || !livForm.reason || livForm.reason.trim()=='' || !livForm.address || livForm.address.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }

    validateFormII (livForm) {
      let flag = true;
      if (!livForm.lveFrom || livForm.lveFrom.trim()=='' || !livForm.lveTo || livForm.lveTo.trim()=='' || !livForm.reason || livForm.reason.trim()=='' || !livForm.address || livForm.address.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }
    
    validateFormIII (livForm) {
      let flag = true;
      if (!livForm.lveFrom || livForm.lveFrom.trim()=='' || !livForm.lveTo || livForm.lveTo.trim()=='' || !livForm.reason || livForm.reason.trim()=='' || !livForm.address || livForm.address.trim()=='') {
        this.adminservice.openSnackbar('Please fill all fields');
        flag = false;
      }
      return flag;
    }
    

    addLvesubmit1() {
      if(new Date(this.lveDetailsFormI.get('lveFrom').value) > new Date(this.lveDetailsFormI.get('lveTo').value)) {
        this.adminservice.openSnackbar('To date should not greator than From date');
        return false;
      }
      let livForm= this.lveDetailsFormI.value;
      const validateFormstatus = this.validateFormI(livForm);
      const id = livForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addLvesubmit(livForm);
        } else {
          this.updateLve(livForm);
        }
    }
  }
    addLvesubmit2() {
      if(new Date(this.lveDetailsFormII.get('lveFrom').value) > new Date(this.lveDetailsFormII.get('lveTo').value)) {
        this.adminservice.openSnackbar('To date should not greator than From date');
        return false;
      }
      
      let livForm= this.lveDetailsFormII.value;
      const validateFormstatus = this.validateFormII(livForm);
      const id = livForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addLvesubmit(livForm);
        } else {
          this.updateLve(livForm);
        }
    }
  }
    addLvesubmit3() {
      if(new Date(this.lveDetailsFormIII.get('lveFrom').value) > new Date(this.lveDetailsFormIII.get('lveTo').value)) {
        this.adminservice.openSnackbar('To date should not greator than From date');
        return false;
      }
      
      let livForm= this.lveDetailsFormIII.value;
      const validateFormstatus = this.validateFormIII(livForm);
      const id = livForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addLvesubmit(livForm);
        } else {
          this.updateLve(livForm);
        }
    }
  }


    addLvesubmit(formVal) {
      console.log(formVal);
    
      formVal.reason = formVal.reason.trim();
      formVal.address = formVal.address.trim();

        this.EDossierService.addLveDetails(formVal).subscribe(
          res => {
            console.log(res);
            if (res.status == 'OK') {
              this.adminservice.openSnackbar(res.message)
              window.location.reload();
              this.cdref.detectChanges();
              this.spinner.hide();
              // this.router.navigate(['e-dossior/ed-content/Ed-index/Otherdetails/hike']);
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
 
      updateLve(formVal) {
        this.EDossierService.updateLveDetails(this.Id,formVal).subscribe(
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
