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
  selector: 'ms-add-combat',
  templateUrl: './add-combat.component.html',
  styleUrls: ['./add-combat.component.scss']
})
export class AddCombatComponent implements OnInit {


  unSelectedFile: any;
  pageTitle = "Add Combat";
  battalions: any[] = [];
  descLength: number = 0;
  id: string = '';
  isAdmin: boolean = false;
  addAcademyParadeStateForm: FormGroup = new FormGroup({});
  battalionList: any[] = [];
  docUrl: any;
  isError:boolean;
  isDoc : boolean = false;;
  @ViewChild('inputFile', { static: true }) docFile;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, private el: ElementRef,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addAcademyParadeStateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: ['']
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-combat')) {
      this.pageTitle = 'Add Combat'
    }
    else if (this.router.url.includes('view-combat')) {
      this.spinner.show()
      this.pageTitle = 'View Combat'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCOMBATByID(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addAcademyParadeStateForm.patchValue({
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
    return this.addAcademyParadeStateForm.controls;
  }

  goBack() {
    this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/combat']);
  }

  addCOMBAT() {
    if (this.addAcademyParadeStateForm.invalid || !this.isDoc) {
      this.isError = true;
      for (const key of Object.keys(this.addAcademyParadeStateForm.controls)) {
        if (this.addAcademyParadeStateForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addCOMBAT(this.addAcademyParadeStateForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/GS-Branch/security/access-control/entry-passes/combat']);
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
  //     this.addAcademyParadeStateForm.patchValue({
  //       doc: file
  //     });
  //     this.isDoc = true;
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
    this.addAcademyParadeStateForm.patchValue({
      doc: file
    });

  }

  updateCOMBAT() {

    // console.log("Bdo", this.addBdoForm.value);

    // if (this.addAcademyParadeStateForm.valid) {
    //   this.adminservice.updateDemoCoy(this.addAcademyParadeStateForm.value,this.id).subscribe(
    //     res => {
    //       // console.log(res);
    //       this.apiRes(res);
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

    if (this.addAcademyParadeStateForm.invalid || !this.isDoc) {
      this.isError = true;
      for (const key of Object.keys(this.addAcademyParadeStateForm.controls)) {
        if (this.addAcademyParadeStateForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addCOMBAT(this.addAcademyParadeStateForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/GS-Branch/security/access-control/entry-passes/combat']);
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
        this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/combat'])

      if (this.router.url.includes('main/admin'))
        this.router.navigate(['main/admin/GS-Branch/security/access-control/entry-passes/combat'])

    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }


}
