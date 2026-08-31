import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss']
})
export class DashboardEditComponent implements OnInit {

  pageTitle = "Add ITPPP";
  battalions: any[] = [];
  descLength: number = 0;
  id: string = '';
  addItpppForm: FormGroup = new FormGroup({});
  battalionList: any[] = [];
  isError: boolean;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addItpppForm = this.fb.group({
      description: ['', Validators.required],
    })
  }


  ngOnInit(): void {
      this.spinner.show()
      this.pageTitle = 'View Dashboard'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getTRGBattalionPerformanceById(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addItpppForm.patchValue({
              description: res.object.description,
            })
            this.descLength = res.object.description.length;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
  }

  public get f() {
    return this.addItpppForm.controls;
  }
  goBack() {
    this.router.navigate(['main/trg-battalion/dashboard']);
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
  }

  updatePerformance() {
    if (this.addItpppForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.adminservice.updateTRGPerformance(this.id, this.addItpppForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/trg-battalion/dashboard'])
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
    }
  }

}

