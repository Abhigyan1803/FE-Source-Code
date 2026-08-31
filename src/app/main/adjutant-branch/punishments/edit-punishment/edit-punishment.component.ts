import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';

export interface DialogData {
  type?: string;
  title?:string;
  message?: any;
  form?:{};
}

@Component({
  selector: 'ms-edit-punishment',
  templateUrl: './edit-punishment.component.html',
  styleUrls: ['./edit-punishment.component.scss']
})
export class EditPunishmentComponent implements OnInit {
  
  datePipe = new DatePipe('en-IN');
  editPunishmentForm:FormGroup;
  isError:boolean = false;
  constructor(private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData, private adjutantService:AdjutantService, public sharedService:SharedService,
  public dialogRef: MatDialogRef<EditPunishmentComponent>
  ) { 
    this.editPunishmentForm = this.fb.group({
      id:[''],
      awardedBy: ['',[Validators.required]],
      date: ['',[Validators.required]],
      offence: ['',[Validators.required]],
      points: ['',[Validators.required]],
      punshmentAwarded: ['',[Validators.required]],
      serviceId: [''],
      status: ['1'],
      termId: [''],
    })
  }

  ngOnInit(): void {
    console.log(this.data);
    const formValues:any = this.data.form;
    this.editPunishmentForm.patchValue(
      {
        id:formValues.id,
        awardedBy: formValues.awardedBy,
        date: this.datePipe.transform(formValues.date,'yyyy-MM-dd') ,
        offence: formValues.offence,
        points: formValues.points,
        punshmentAwarded: formValues.punshmentAwarded,
        serviceId: formValues.serviceId,
        status: 1,
        termId: formValues.termId,
      }
      )
   
    
  }

  public get f() {
    return this.editPunishmentForm.controls;
  }


  updatePunishment(){
    if (this.editPunishmentForm.valid) {
      this.isError = false;
      // this.spinner.show();
      this.adjutantService.editGC_Punishment(this.editPunishmentForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            // this.spinner.hide();
            // this.sharedService.openSnackbar('Punishment Updated Successfully.')
            this.editPunishmentForm.reset()
            this.dialogRef.close({dialogResult:res})
          } else {
            this.sharedService.openErrorSnackbarWithSeconds('Error',3)
          }

        }
      )
    } else {
      this.isError = true;
    }
  }

}
