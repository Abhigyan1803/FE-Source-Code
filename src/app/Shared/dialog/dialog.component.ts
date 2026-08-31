import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Links } from 'app/links.module';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

interface DialogData {
  type?: string;
  title?: string;
  details?: any;
  message?: any;
  url?: any;
  id?: any;
  remark?: any;
  object?: any;
  lenghths?: any;
}

@Component({
  selector: 'ms-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  IP = Links.IP;
  ext: string;

  confirm: boolean = false;
  addassignmentForm: FormGroup = new FormGroup({});
  loadedContent: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private sharedService: SharedService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private router: Router, private fb: FormBuilder, private academicservice: AcademicDeptService,
    public dialogRef: MatDialogRef<DialogComponent>,
    public sanitizer: DomSanitizer
  ) {
console.log(data);

    this.addassignmentForm = this.fb.group({
      remark: [''],
      // instructorMark: [''],
      id: [this.data.id],
    })

    this.addassignmentForm.patchValue({
      remark: this.data.remark
    })

  }

  ngOnInit(): void {
    
    if (this.data.url) {
      const URL = this.data.url
      console.log(URL);
      
      const index = URL.lastIndexOf('.')
      this.ext = URL.substr(index)
    }
 
    this.data.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.IP + this.data.url);
    this.cdref.detectChanges();
    if (this.data.type == 'document') {
      if (this.ext != '.pdf') {
        this.openInNewTab(this.data.url.changingThisBreaksApplicationSecurity)
      }
    }
  

  }

  openInNewTab(url){
    window.open(url, '_blank')
    this.cdref.detectChanges();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.spinner.show();
    console.log(this.addassignmentForm.value)
    this.academicservice.updateAssignment(this.addassignmentForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.sharedService.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          // this.router.navigate(['main/admin/GS-Branch/stats/stats/poc']);
          // this.router.navigate(['/main/academic-depart/assignments']);
          
          this.dialogRef.close();
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )

  }

  contentLoaded() {
    this.loadedContent = true;
    // console.log('CONTENT LOADED...');

  }


}
