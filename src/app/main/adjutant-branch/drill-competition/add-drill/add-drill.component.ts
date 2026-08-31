import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'ms-add-drill',
  templateUrl: './add-drill.component.html',
  styleUrls: ['./add-drill.component.scss']
})
export class AddDrillComponent implements OnInit {
  isError;
  id;
  pTitle = "Add Drill Competition";
  terms: any[] = [];
  updateDril
  addDrillForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService,
    private service: AdjutantService, private dialog: MatDialog) {

    this.addDrillForm = this.fb.group({
      subjectName: ['', Validators.required],
      totalMarks: ['', Validators.required],
      status: ['1', Validators.required],
      termId: ['', Validators.required],
      // subjectType: ['', Validators.required],


    })
  }

  ngOnInit(): void {
    this.getTerms()
    if (this.router.url.includes('view-drill')) {
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.pTitle = "View Drill Competition";
      console.log(this.id)
      this.service.getDrillyId(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addDrillForm.patchValue({
              subjectName: res.object.subjectName,
              termId: res.object.termId,
              status: res.object.status,
              totalMarks: res.object.totalMarks,
            })
          }
        }
      )
    }
  }
  termChange(e) {
    console.log(e)
    if (e = 1) {
      this.terms[0]
      console.log(this.terms[0])
    }
  }
  getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }

  public get f() {
    return this.addDrillForm.controls;
  }

  addDrill() {
    if (this.addDrillForm.invalid) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addDRILL(this.addDrillForm.value).subscribe(
        res => {
          console.log(res);
          if (res.message == 'drill subject added') {
            this.spinner.hide();
            this.service.openSnackbar(res.message);

            if (this.router.url.includes('adjutant-branch'))
              this.router.navigate(['/main/adjutant-branch/drill']);
            if (this.router.url.includes('admin/Adjutant-Branch-Management'))
              this.router.navigate(['/main/admin/Adjutant-Branch-Management/drill-competition']);

          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");

        }
      )
    }
  }


  updateDrill() {
    if (this.addDrillForm.invalid) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.updateDril = {
        subjectName: this.addDrillForm.value.subjectName,
        termId: this.addDrillForm.value.termId,
        totalMarks: this.addDrillForm.value.totalMarks,
        status: this.addDrillForm.value.status,
        id: this.id
      }
      this.service.updateDrill(this.updateDril).subscribe(
        res => {
          console.log(res);
          if (res.message == 'drill subject updated') {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
            if (this.router.url.includes('adjutant-branch'))
              this.router.navigate(['/main/adjutant-branch/drill']);
            if (this.router.url.includes('admin/Adjutant-Branch-Management'))
              this.router.navigate(['/main/admin/Adjutant-Branch-Management/drill-competition']);

          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");

        }
      )
    }
  }



  goBack() {
    if (this.router.url.includes('adjutant-branch'))
      this.router.navigate(['/main/adjutant-branch/drill']);
    if (this.router.url.includes('admin/Adjutant-Branch-Management'))
      this.router.navigate(['/main/admin/Adjutant-Branch-Management/drill-competition']);

  }


}
