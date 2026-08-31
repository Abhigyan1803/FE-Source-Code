import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  @ViewChild('file', { static: true }) imgFile;
  unSelectedFile;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addActivityForm: FormGroup;


  imgUrl: string = '';
  activityImage;
  status;
  date = new Date();

  constructor(private service: AdminService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private cdref: ChangeDetectorRef
    , private spinner: NgxSpinnerService , public sharedService: SharedService
  ) {
    this.addActivityForm = this.fb.group({
      image: ['',Validators.required],
      status: ['1', Validators.required]
    })
  }



  ngOnInit(): void {
    this.unSelectedFile = this.imgFile.nativeElement.files
  }

  onSelectImage(e: any) {

    let file = e.target.files[0]
    //change file from 50mb to 200mb 
   let fileSizeMatch = this.sharedService.checkFileSize(file);
    // if (file.size > 52428800) {
     if (!fileSizeMatch) {
      this.imgFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar(`Image Should Be Maximum ${this.sharedService.fileSize} MB in Size`)
    } else {
      this.addActivityForm.patchValue({
        image: file
      });

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      }
    }  
  }

  addActivity() {
    this.spinner.show();
    console.log(this.addActivityForm.value);


    this.service.addActivity(this.addActivityForm.value, this.date.getTime()).subscribe(
      res => {
        console.log(res);

        if (res.status == "1") {
          this.openSnackbar(res.msg)
          this.router.navigate(['/main/admin/home/activity'])
          this.cdref.detectChanges();
        } else {
          this.openSnackbar(res.msg)
        }
        this.spinner.hide()
      },
      err => {
        console.log(JSON.stringify(err));
        this.openSnackbar('Some error occured.')
        this.spinner.hide();
      }
    )
  }

  public get f(){
    return this.addActivityForm.controls;
  }

  goBack() {
    this.router.navigate(['main/admin/home/activity']);
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

}
