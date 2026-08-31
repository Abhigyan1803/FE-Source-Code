import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDialogComponent } from 'app/main/admin/admin-dialog/admin-dialog.component';
import { AdminService } from 'app/service/admin/admin.service';
import {SharedService} from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-cyber-policy',
  templateUrl: './add-cyber-policy.component.html',
  styleUrls: ['./add-cyber-policy.component.scss']
})
export class AddCyberPolicyComponent implements OnInit {


  id;
  pTitle = "Add Cyber Policy";
  
  @ViewChild('file', { static: true }) docFile;
  unSelectedFile;
  docUrl

  isError: boolean = false;
  isFile:boolean=false;

  addCyberPolicyForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private cdref: ChangeDetectorRef, private service: AdminService, private dialog:MatDialog, private sharedService: SharedService) {

    this.addCyberPolicyForm = this.fb.group({
      name:['',Validators.required],
      file: [''],
      status: ['1', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.router.url.includes('view-cyber-policy')) {
      this.pTitle = 'View Cyber Policy'
      this.id = this.route.snapshot.queryParamMap.get('id')
      // console.log(this.id);
      this.service.getCyberPolicyById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addCyberPolicyForm.patchValue({
              name:res.object.tabName,
              status: res.object.status
            })
            this.docUrl = res.object.link;
            this.isFile=true;
          }
        }
      )

    }
  }

  onSelectDoc(e) {
    let file = e.target.files[0]
    //change file from 50mb to 200mb 
    let fileSizeMatch = this.sharedService.checkFileSize(file);
    // if (file.size > 52428800) {
      if (!fileSizeMatch) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 200 MB in Size')
    } else {
      this.docUrl = ''
      this.addCyberPolicyForm.patchValue({
        file: file
      });
      this.isFile = true;
    }

  }
  
  public get f() {
    return this.addCyberPolicyForm.controls;
  }


  addCyberPolicy() {
    if (this.addCyberPolicyForm.invalid || !this.isFile ) {
      this.isError = true;
    }
    else {
        this.spinner.show()
        this.service.addCyberPolicy(this.addCyberPolicyForm.value).subscribe(
          res => {
            console.log(res);
            if (res.status == 'OK') {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
              this.router.navigate(['/main/admin/home/cyber-policy']);
            } else {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
            }
          },
          err => {
            this.spinner.hide();
            this.service.openSnackbar('Error Occured.');
          }
        )

      


    }
  }

  openDoc() {
    this.dialog.open(AdminDialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: this.docUrl
      }
    });
  }

  updateCyberPolicy() {
    if (this.addCyberPolicyForm.invalid || !this.isFile) {
      this.isError = true;
    }
    else {
        this.spinner.show()
        this.service.updateCyberPolicy(this.id, this.addCyberPolicyForm.value).subscribe(
          res => {
            console.log(res);
            if (res.status == 'OK') {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
              this.router.navigate(['/main/admin/home/cyber-policy'])
            } else {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
            }
          },
          err => {
            this.spinner.hide();
            this.service.openSnackbar('Error Occured.');
          }
        )

    }

  }

  goBack() {
    this.router.navigate(['/main/admin/home/cyber-policy'])
  }

}
