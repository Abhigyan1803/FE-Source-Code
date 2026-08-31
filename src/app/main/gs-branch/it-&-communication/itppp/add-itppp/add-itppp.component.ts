import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-itppp',
  templateUrl: './add-itppp.component.html',
  styleUrls: ['./add-itppp.component.scss']
})
export class AddItpppComponent implements OnInit {
  unSelectedFile: any;
  pageTitle = "Add ITPPP";
  battalions: any[] = [];
  descLength: number = 0;
  id: string = '';
  isAdmin: boolean = false;
  addItpppForm: FormGroup = new FormGroup({});
  battalionList: any[] = [];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) docFile;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addItpppForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-itppp')) {
      this.pageTitle = 'Add ITPPP'
    }
    else if (this.router.url.includes('view-itppp')) {
      this.spinner.show()
      this.pageTitle = 'View ITPPP'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getItpppByID(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addItpppForm.patchValue({
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
    return this.addItpppForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/itcommunication/itppp']);
  }

  addITPPP() {
    if (this.addItpppForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addItppp(this.addItpppForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/itcommunication/itppp']);
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

  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addItpppForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
  }

  updateITPPP() {
    this.spinner.show();
    // console.log("Bdo", this.addBdoForm.value);

    if (this.addItpppForm.valid) {
      this.adminservice.updateItppp(this.addItpppForm.value, this.id).subscribe(
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

      if (this.router.url.includes('main/gs-branch'))
        this.router.navigate(['main/gs-branch/itcommunication/itppp'])

      // if (this.router.url.includes('main/admin'))
      //   this.router.navigate(['main/admin/GS-Branch/itcommunication/itppp'])

    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }

}

