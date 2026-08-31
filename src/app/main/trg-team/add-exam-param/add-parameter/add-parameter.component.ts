import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-parameter',
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.scss']
})
export class AddParameterComponent implements OnInit {

  addParamForm: FormGroup;
  terms: any[];
  isTerm: boolean;
 
  constructor(private service: TrgTeamService, private router: Router,private cdref: ChangeDetectorRef,
    private _fb: FormBuilder,  private spinner: NgxSpinnerService, private el: ElementRef) {
      
      this.addParamForm = this._fb.group({
        status: ['1', Validators.required],
        spotTestMark: ['', Validators.required],
        termId: ['', Validators.required],
        wttMark: ['', Validators.required],

      })
  
  }

  ngOnInit(): void {
    this.getTerms();
   
  }
  goBack() {
    // this.router.navigate(['/main/admin/trg-team/add-exam-param']);
    window.history.back();
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
 
  get f(): { [key: string]: AbstractControl } {
    return this.addParamForm.controls;
  }
  isError:boolean;
  addSUBJECT() {
    this.spinner.show();
    if(this.addParamForm.invalid){
      // this.submitted = true;  
      this.spinner.hide();
      this.isError = true;
      for (const key of Object.keys(this.addParamForm.controls)) {
        if (this.addParamForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  }
    }
    else{
      this.service.addWtt(this.addParamForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/trg-team/add-exam-param']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
 
}

// updateSUBJECT() {
//   this.spinner.show();
//   console.log("Bdo", this.addParamForm.value);

//   if (this.addParamForm.valid) {
//     this.service.updateSUBJECT(this.id,this.addParamForm.value).subscribe(
//       res => {
//         // console.log(res);
//         this.apiRes(res);
//       },
//       err => {
//         this.spinner.hide()
//         this.service.openSnackbar("Some Error Occured.")
//       }
//     )
//   }
//   else {
//     this.isError = true;
//   }
// }

// apiRes(res) {
//   if (res.status == 'OK') {
//     this.spinner.hide()
//     this.service.openSnackbar(res.message)
    
//     if(this.router.url.includes('main/GS-Branch'))
//     this.router.navigate(['main/admin/trg-battalion/oq-subject'])
  
//     if(this.router.url.includes('main/admin'))
//     this.router.navigate(['main/admin/trg-battalion/oq-subject'])  
 
//   } else {
//     this.spinner.hide()
//     this.service.openSnackbar(res.message)
//   }
// }


}
