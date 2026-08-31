import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-add-civ-staff',
  templateUrl: './add-civ-staff.component.html',
  styleUrls: ['./add-civ-staff.component.scss']
})
export class AddCivStaffComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Def/Civ Staff";
  battalions: any[] = [];
  descLength: number = 0;
  id: string = '';
  isAdmin: boolean = false;
  addBiometricForm: FormGroup = new FormGroup({});
  battalionList: any[] = [];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = false;
  @ViewChild('inputFile', { static: true }) docFile;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, private el: ElementRef,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addBiometricForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: ['', ]
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-civ')) {
      this.pageTitle = 'Add Def/Civ Staff'
    }
    else if (this.router.url.includes('view-civ')) {
      this.spinner.show()
      this.pageTitle = 'View Def/Civ Staff'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCIVByID(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addBiometricForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status: res.object.status,
            })
            this.descLength = res.object.description.length;
            this.docUrl = res.object.file
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addBiometricForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/civ']);
  }

  addCIV() {
    if (this.addBiometricForm.invalid || !this.isDoc) {
      this.isError = true;
      for (const key of Object.keys(this.addBiometricForm.controls)) {
        if (this.addBiometricForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      console.log(this.addBiometricForm.value)
      alert('hi')
      this.spinner.show();

      this.adminservice.addCIV(this.addBiometricForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/civ']);
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

  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: l
      }
    });
  }

  // onSelectDoc(e) {
  //   var file = e.target.files[0]
  //   if (file.size > 5242880) {
  //     this.docFile.nativeElement.files = this.unSelectedFile;
  //     this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
  //   } else {
  //     this.docUrl = ''
  //     this.addBiometricForm.patchValue({
  //       doc: file
  //     });
  //     this.isDoc=true;
  //   }
  // }


  onSelectDoc(e) {
    var file = e.target.files[0];

    console.log(file, "=====================================");
    if (file) {
      //change file from 50mb to 200mb 
    let fileSizeMatch = this.sharedService.checkFileSize(file);
      // if (file.size > 52428800) {
      if (!fileSizeMatch) {
        this.docFile.nativeElement.files = this.unSelectedFile;
        this.adminservice.openSnackbar('Document Should Be Maximum 200 MB in Size')
        file='';
      }
      else {
        this.docUrl = ''

        this.isDoc = true;
      }
    }
    else {
      this.isDoc = false;
    }
    this.addBiometricForm.patchValue({
      doc: file
    });

  }

  updateCIV() {
    // this.spinner.show();
    // console.log("Bdo", this.addBdoForm.value);

    // if (this.addBiometricForm.valid && this.isDoc) {
    //   this.spinner.show();
    //   this.adminservice.updateCIV(this.addBiometricForm.value, this.id).subscribe(
    //     res => {
    //       // console.log(res);
    //       this.apiRes(res);
    //       this.spinner.hide();
    //     },
    //     err => {
    //       this.spinner.hide()
    //       this.adminservice.openSnackbar("Some Error Occured.")
    //     }
    //   )
    // }
    // else {
    //   this.isError = true;
    // }


    if (this.addBiometricForm.invalid || !this.isDoc) {
      this.isError = true;
      for (const key of Object.keys(this.addBiometricForm.controls)) {
        if (this.addBiometricForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.updateCIV(this.addBiometricForm.value, this.id).subscribe(
      res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/civ']);
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

  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)

      if (this.router.url.includes('main/GS-Branch'))
        this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/civ'])

      if (this.router.url.includes('main/admin'))
        this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/civ'])

    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }

}

