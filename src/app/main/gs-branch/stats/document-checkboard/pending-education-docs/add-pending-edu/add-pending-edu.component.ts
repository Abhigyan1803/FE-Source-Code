import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-pending-edu',
  templateUrl: './add-pending-edu.component.html',
  styleUrls: ['./add-pending-edu.component.scss']
})
export class AddPendingEduComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Education";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addEducationForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isDoc;
  isError;
  @ViewChild('inputFile', { static: true }) docFile;  

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addEducationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-pending-education')) {
      this.pageTitle = 'Add Education'
    }
    else if (this.router.url.includes('view-pending-education')) {
      this.spinner.show()
      this.pageTitle = 'View Education'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getEducationByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addEducationForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
            this.docUrl = res.object.doc
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
    return this.addEducationForm.controls;
  }

  goBack() {
    this.router.navigate(['/main/gs-branch/stats/document-checkboard/pending-education-docs']);
  }

  addEducation() {
    if (this.addEducationForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }  else {
      this.spinner.show();
      this.adminservice.addEducation(this.addEducationForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/gs-branch/stats/document-checkboard/pending-education-docs']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.msg)
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
      type: 'document', title:"Document",url: l
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
    this.addEducationForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
  // console.log("selected Doc", this.addBdoForm.value);
}


updateEducation() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addEducationForm.valid) {
    this.adminservice.updateEducation(this.addEducationForm.value,this.id).subscribe(
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
    
    if(this.router.url.includes('main/gs-branch'))
    this.router.navigate(['/main/gs-branch/stats/document-checkboard/pending-education-docs'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['/main/admin/GS-Branch/stats/document-checkboard/pending-education-docs'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}


}
