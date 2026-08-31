import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-camp-exercise',
  templateUrl: './add-camp-exercise.component.html',
  styleUrls: ['./add-camp-exercise.component.scss']
})
export class AddCampExerciseComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Exercise Type";
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addExerciseTypeForm: FormGroup;
  isError;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addExerciseTypeForm = this.fb.group({
      type: ['', Validators.required],
      status: ['1', Validators.required],
    })
  }


  ngOnInit(): void {
    if (this.router.url.includes('add-exercise-type')) {
      this.pageTitle = 'Add Exercise Type'
    }
    else if (this.router.url.includes('view-exercise-type')) {
      // this.spinner.show()
      this.pageTitle = 'View Exercise Type'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getExerciseTypeByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addExerciseTypeForm.patchValue({
              type: res.object.type,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
            // this.spinner.hide()
          } else {
            // this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addExerciseTypeForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/trg-battalion/exercise-type']);
  }
  addedExerciseType
  addExerciseType() {
    console.log(this.addExerciseTypeForm.value)
    if (this.addExerciseTypeForm.invalid ) {
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
     this.addedExerciseType={
      type:this.addExerciseTypeForm.value.type,
      status:this.addExerciseTypeForm.value.status

     } 
    console.log(this.addedExerciseType)
      this.adminservice.addExerciseType(this.addedExerciseType).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/trg-battalion/exercise-type']);
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

  charCount(e: any) {
    this.descLength = e.target.value.length
}


updateExercisetype
updateExerciseType() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addExerciseTypeForm.valid) {
    this.updateExercisetype={
      type:this.addExerciseTypeForm.value.type,
      status:this.addExerciseTypeForm.value.status,
      id:this.id
     } 
    console.log(this.updateExercisetype)
    this.adminservice.updateExerciseType(this.updateExercisetype).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.")
      }
    )
  }
  else {
    this.isError = true;
  }
}

apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
    
    if(this.router.url.includes('main/exercise-type'))
    this.router.navigate(['main/admin/trg-battalion/exercise-type'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/trg-battalion/exercise-type'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

