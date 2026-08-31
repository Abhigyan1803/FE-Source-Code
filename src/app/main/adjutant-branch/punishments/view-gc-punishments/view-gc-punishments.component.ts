import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditPunishmentComponent } from '../edit-punishment/edit-punishment.component';

@Component({
  selector: 'ms-view-gc-punishments',
  templateUrl: './view-gc-punishments.component.html',
  styleUrls: ['./view-gc-punishments.component.scss']
})
export class ViewGcPunishmentsComponent implements OnInit {
  punishmentsList: any[] = [];
  totalPoints: number = 0;
  addPunishmentForm: FormGroup;
  cadetDetails: any;
  isError: boolean;
  constructor(private router: Router, private fb: FormBuilder, private EDossierService: EDossierService, private adjutantService: AdjutantService,
    private sharedService: SharedService, private spinner: NgxSpinnerService, private dialog: MatDialog, private cdref: ChangeDetectorRef
  ) {
    this.EDossierService.objOfCadet.subscribe(
      res => {
        // console.log(res);
        if (!res) {
          this.goBack()
        } else {
          this.cadetDetails = res;
          this.cadetDetails.rank = (this.cadetDetails.nationality == 'India') ? 'GC' : 'FGC';

        }

      }
    )

    this.addPunishmentForm = this.fb.group({
      awardedBy: ['', [Validators.required]],
      date: ['', [Validators.required]],
      offence: ['', [Validators.required]],
      points: ['', [Validators.required]],
      punshmentAwarded: ['', [Validators.required]],
      serviceId: [this.cadetDetails.serviceId],
      status: ['1'],
      termId: [this.cadetDetails.termId],
    })
  }
  rank;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getTotalPunishments()
  }

  getTotalPunishments() {
    this.adjutantService.getGCAllPunishments(this.cadetDetails.serviceId).subscribe(
      res => {
        console.log(res);
        if (res.status == "OK") {
          this.punishmentsList = res.object;
          this.getTotalPoints();
          this.cdref.detectChanges();

        }
      }
    )
  }


  getTotalPoints() {
    this.totalPoints = 0;

    this.punishmentsList.forEach(
      (el: any) => {
        this.totalPoints = this.totalPoints + el.points;
      }
    )
  }

  public get f() {
    return this.addPunishmentForm.controls;
  }




  addPunishment() {
    if (this.addPunishmentForm.valid) {
      this.isError = false;
      this.spinner.show();
      this.adjutantService.addGC_Punishment(this.addPunishmentForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide();
            this.sharedService.openSnackbar('Punishment Added Successfully.')

            this.addPunishmentForm.patchValue({
              awardedBy: '',
              date: '',
              offence: '',
              points: '',
              punshmentAwarded: '',

            })
            this.getTotalPunishments()
          }

        }
      )
    } else {
      this.isError = true;
      this.adjutantService.openSnackbar('Please Fill All Required Fields.')
    }
  }

  delete(data) {
    let alldata={
      id:data.id,
      status:2,
    }
    this.spinner.show();
    console.log(alldata);
    this.adjutantService.editGC_Punishment(alldata).subscribe(
      res => {
        this.adjutantService.openSnackbar("Record Successfully deleted")
        this.getTotalPunishments()
        this.spinner.hide();
        this.cdref.detectChanges();
      }
    )
  }

  openDialog(p) {
    const dialogRef = this.dialog.open(EditPunishmentComponent, {
      width: "800px",
      height: "450px",
      data: {
        type: 'edit-punishment',
        title: 'Edit Punishment',
        message: '',
        form: p
      }
    })

    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
        if (res.dialogResult.status == "OK") {
          this.getTotalPunishments();
        }
      })

  }

  goBack() {
    this.router.navigate(['/main/adjutant-branch/punishments'])
  }


}
