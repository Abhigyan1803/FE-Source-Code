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
  selector: 'ms-hike',
  templateUrl: './hike.component.html',
  styleUrls: ['./hike.component.scss']
})
export class HikeComponent implements OnInit {

  datePipe = new DatePipe('en-IN');

  result;
  Id;
  isError;
  isDoc;
  termId;
  hikeDetailsFormI: FormGroup = new FormGroup({});
  hikeDetailsFormII: FormGroup = new FormGroup({});
  hikeDetailsFormIII: FormGroup = new FormGroup({});

  recordDetailsFormI: FormGroup = new FormGroup({});
  recordDetailsFormII: FormGroup = new FormGroup({});
  recordDetailsFormIII: FormGroup = new FormGroup({});

  minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  

  constructor(private EDossierService: EDossierService,private adminservice: AdminService,
    private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService, private route:ActivatedRoute) {
     
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.hikeDetailsFormI= this.fb.group({
        hike: ['', Validators.required],
        loc: ['', Validators.required],
        remarks:['',Validators.required],
        id:[''],
        termId:[1],
        serviceId: this.Id
      })
      this.hikeDetailsFormII = this.fb.group({
        hike: ['', Validators.required],
        loc: ['', Validators.required],
        remarks:['',Validators.required],
        id:[''],
        termId:[2],
        serviceId: this.Id
      })
      this.hikeDetailsFormIII = this.fb.group({
        hike: ['', Validators.required],
        loc: ['', Validators.required],
        remarks:['',Validators.required],
        id:[''],
        termId:[3],
        serviceId: this.Id
      })
      this.hikeDetailsFormII = this.fb.group({
        hike: ['', Validators.required],
        loc: ['', Validators.required],
        remarks:['',Validators.required],
        id:[''],
        termId:[7],
        serviceId: this.Id
      })
      this.hikeDetailsFormIII = this.fb.group({
        hike: ['', Validators.required],
        loc: ['', Validators.required],
        remarks:['',Validators.required],
        id:[''],
        termId:[8],
        serviceId: this.Id
      })
      this.recordDetailsFormI= this.fb.group({
        wef: ['', Validators.required],
        reason: ['', Validators.required],
        progress:['',Validators.required],
        id:[''],
        termId:[1],
        serviceId: this.Id
      })
      this.recordDetailsFormII = this.fb.group({
        wef: ['', Validators.required],
        reason: ['', Validators.required],
        progress:['',Validators.required],
        id:[''],
        termId:[2],
        serviceId: this.Id
      })
      this.recordDetailsFormIII = this.fb.group({
        wef: ['', Validators.required],
        reason: ['', Validators.required],
        progress:['',Validators.required],
        id:[''],
        termId:[3],
        serviceId: this.Id
      })
      this.recordDetailsFormII = this.fb.group({
        wef: ['', Validators.required],
        reason: ['', Validators.required],
        progress:['',Validators.required],
        id:[''],
        termId:[7],
        serviceId: this.Id
      })
      this.recordDetailsFormIII = this.fb.group({
        wef: ['', Validators.required],
        reason: ['', Validators.required],
        progress:['',Validators.required],
        id:[''],
        termId:[8],
        serviceId: this.Id
      })
     }

     ngOnInit(): void {
      (<HTMLInputElement>document.getElementById("hikeServiceID")).value = localStorage.getItem("e");
      (<HTMLInputElement>document.getElementById("hikeName")).value = localStorage.getItem("i");
      (<HTMLInputElement>document.getElementById("hikeComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("hikeBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("hiketid")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("hiketName")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("hikerk")).value = localStorage.getItem("rank");
     }
     
     
     ngAfterViewInit() {
      // this.getAssignments()
      this.getEdossierHike()
      this.getEdossierRecord()
    }

    goBack() {
      window.history.back()
    }


    getEdossierHike(){
          this.EDossierService.getHikeDetails(this.Id).subscribe(
            res => {
              let values = res.object

          if (res.status == 'OK') {
            if (res.object && res.object.termId === 1) {
              this.hikeDetailsFormI.patchValue({
                hike: res.object.hike,
                loc: res.object.loc,
                remarks:  res.object.remarks,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 2) { 
              this.hikeDetailsFormII.patchValue({
                hike: res.object.hike,
                loc: res.object.loc,
                remarks:  res.object.remarks,
                id:res.object.id
              }) 
            } else if (res.object && res.object.termId === 3) { 
              this.hikeDetailsFormIII.patchValue({
                hike: res.object.hike,
                loc: res.object.loc,
                remarks:  res.object.remarks,
                id:res.object.id
              }) 
            }
            else if (res.object && res.object.termId === 7) { 
              this.hikeDetailsFormII.patchValue({
                hike: res.object.hike,
                loc: res.object.loc,
                remarks:  res.object.remarks,
                id:res.object.id
              }) 
            }
            else if (res.object && res.object.termId === 8) { 
              this.hikeDetailsFormIII.patchValue({
                hike: res.object.hike,
                loc: res.object.loc,
                remarks:  res.object.remarks,
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


    getEdossierRecord(){
      this.EDossierService.getRecordsDetails(this.Id).subscribe(
        res => {
          let values = res.object

      if (res.status == 'OK') {
        if (res.object && res.object.termId === 1) {
          this.recordDetailsFormI.patchValue({
            wef: this.datePipe.transform(res.object.wef, 'yyyy-MM-dd'),
            reason: res.object.reason,
            progress:  res.object.progress,
            id:res.object.id
          }) 
        } else if (res.object && res.object.termId === 2) { 
          this.recordDetailsFormII.patchValue({
            wef: this.datePipe.transform(res.object.wef, 'yyyy-MM-dd'),
            reason: res.object.reason,
            progress:  res.object.progress,
            id:res.object.id
          }) 
        } else if (res.object && res.object.termId === 3) { 
          this.recordDetailsFormIII.patchValue({
            wef: this.datePipe.transform(res.object.wef, 'yyyy-MM-dd'),
            reason: res.object.reason,
            progress:  res.object.progress,
            id:res.object.id
          }) 
        }
        else if (res.object && res.object.termId === 7) { 
          this.recordDetailsFormII.patchValue({
            wef: this.datePipe.transform(res.object.wef, 'yyyy-MM-dd'),
            reason: res.object.reason,
            progress:  res.object.progress,
            id:res.object.id
          }) 
        }
        else if (res.object && res.object.termId === 8) { 
          this.recordDetailsFormIII.patchValue({
            wef: this.datePipe.transform(res.object.wef, 'yyyy-MM-dd'),
            reason: res.object.reason,
            progress:  res.object.progress,
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


validateFormI (hikeForm) {
  let flag = true;
  if (!hikeForm.hike || hikeForm.hike.trim()=='' || !hikeForm.loc || hikeForm.loc.trim()=='' || !hikeForm.remarks || hikeForm.remarks.trim()=='') {
    this.adminservice.openSnackbar('Please fill all fields');
    flag = false;
  }
  return flag;
}

validateFormII (hikeForm) {
  let flag = true;
  if (!hikeForm.hike || hikeForm.hike.trim()=='' || !hikeForm.loc || hikeForm.loc.trim()=='' || !hikeForm.remarks || hikeForm.remarks.trim()=='') {
    this.adminservice.openSnackbar('Please fill all fields');
    flag = false;
  }
  return flag;
}

validateFormIII (hikeForm) {
  let flag = true;
  if (!hikeForm.hike || hikeForm.hike.trim()=='' || !hikeForm.loc || hikeForm.loc.trim()=='' || !hikeForm.remarks || hikeForm.remarks.trim()=='') {
    this.adminservice.openSnackbar('Please fill all fields');
    flag = false;
  }
  return flag;
}



    addHikesubmit1() {
      // if(newDate(this.hikeDetailsFormI.get('startDate').value) > newDate(this.hikeDetailsFormI.get('endDate').value)) {
      //   error show
      //   return false;
      // }
      let hikeForm= this.hikeDetailsFormI.value;
      const validateFormstatus = this.validateFormI(hikeForm);
     
    const id = hikeForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addHikesubmit(hikeForm);
        } else {
          this.updatehike(hikeForm);
        }
    }
  }
    addHikesubmit2() {
      let hikeForm= this.hikeDetailsFormII.value;
      const validateFormstatus = this.validateFormI(hikeForm);
      const id = hikeForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addHikesubmit(hikeForm);
        } else {
          this.updatehike(hikeForm);
        }
    }
  }
    addHikesubmit3() {
      let hikeForm= this.hikeDetailsFormIII.value;
      const validateFormstatus = this.validateFormI(hikeForm);
      const id = hikeForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addHikesubmit(hikeForm);
        } else {
          this.updatehike(hikeForm);
        }
    }
  }




  addHikesubmit(formVal) {
      
      formVal.hike = formVal.hike.trim();
      formVal.loc = formVal.loc.trim();
      formVal.remarks = formVal.remarks.trim(); 

        this.EDossierService.addHikeDetails(formVal).subscribe(
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
      updatehike(formVal) {
        this.EDossierService.updateHikeDetails(this.Id,formVal).subscribe(
          res => {
            console.log(res);
  
            if(res.status == 'OK'){
              this.spinner.hide();
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


      validateForm1 (recordForm) {
        let flag = true;
        if (!recordForm.wef || recordForm.wef.trim()=='' || !recordForm.reason || recordForm.reason.trim()=='' || !recordForm.progress || recordForm.progress.trim()=='') {
          this.adminservice.openSnackbar('Please fill all fields');
          flag = false;
        }
        return flag;
      }
      
      validateForm2 (recordForm) {
        let flag = true;
        if (!recordForm.wef || recordForm.wef.trim()=='' || !recordForm.reason || recordForm.reason.trim()=='' || !recordForm.progress || recordForm.progress.trim()=='') {
          this.adminservice.openSnackbar('Please fill all fields');
          flag = false;
        }
        return flag;
      }
      
      validateForm3 (recordForm) {
        let flag = true;
        if (!recordForm.wef || recordForm.wef.trim()=='' || !recordForm.reason || recordForm.reason.trim()=='' || !recordForm.progress || recordForm.progress.trim()=='') {
          this.adminservice.openSnackbar('Please fill all fields');
          flag = false;
        }
        return flag;
      }


      
      addRecordsubmit1() {
        // if(newDate(this.hikeDetailsFormI.get('startDate').value) > newDate(this.hikeDetailsFormI.get('endDate').value)) {
        //   error show
        //   return false;
        // }
        let recordForm= this.recordDetailsFormI.value;
      const validateFormstatus = this.validateForm1(recordForm);
      
      const id = recordForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addRecordsubmit(recordForm);
        } else {
          this.updateRecord(recordForm);
        }
    }
    }
      addRecordsubmit2() {
        let recordForm= this.recordDetailsFormII.value;
      const validateFormstatus = this.validateForm2(recordForm);
      const id = recordForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addRecordsubmit(recordForm);
        } else {
          this.updateRecord(recordForm);
        }
    }
    }
      addRecordsubmit3() {
        let recordForm= this.recordDetailsFormIII.value;
      const validateFormstatus = this.validateForm3(recordForm);
      const id = recordForm.id;
      if (validateFormstatus) {
        if (id === '' || id === undefined) {
          this.addRecordsubmit(recordForm);
        } else {
          this.updateRecord(recordForm);
        }
    }
    }


      addRecordsubmit(formVal) {
      formVal.reason = formVal.reason.trim();
      formVal.progress = formVal.progress.trim(); 

          this.EDossierService.addRecordsDetails(formVal).subscribe(
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
   
        
 
      updateRecord(formVal) {
        this.EDossierService.updateRecordDetails(this.Id,formVal).subscribe(
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
