import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { AdminService } from 'app/service/admin/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { AuthService } from 'app/service/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-acad-syllabus',
  templateUrl: './add-acad-syllabus.component.html',
  styleUrls: ['./add-acad-syllabus.component.scss']
})
export class AddAcadSyllabusComponent implements OnInit {

  addAcadSyllabus: FormGroup = new FormGroup({});
  term: string;

  termId:number;
  paper: string;
  subject:string;

  url: any;
  pageTitle = "Add";
  id: string = '';
  docUrl: any;
  unSelectedFile: any;
  @ViewChild('inputFile', { static: true }) docFile;
  sTitle:string;

  // assignment: string;
  isError:boolean = false;
  isDoc:boolean = false;

  constructor(private adminservice: AdminService, private router: Router,
    private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private route: ActivatedRoute, 
    private fb: FormBuilder, private academicservice: AcademicDeptService, private authService: AuthService, public dialog: MatDialog, public sharedService: SharedService) {
    this.route.params.subscribe((params) => {
      console.log(params);
      
      this.term = params.term;
      this.paper = params.paper;
      this.subject = params.subject;
      
      if(this.subject == "Science and Warfare"){
        this.sTitle = "Science & Warfare";
      } else {
        this.sTitle = params.subject;
      }
     
    });
  
    if (this.term == "I Term") {
      this.termId = 1;
    } else if (this.term == "II Term") {
      this.termId = 2;
    } else if (this.term == "III Term") {
      this.termId = 3;
    } else if (this.term == "II Tech") {
      this.termId = 7;
    }
    
    this.addAcadSyllabus = this.fb.group({
      name: ['', Validators.required],
      url: [this.url],
      paper: [this.paper],
      status: ['1'],
      termId: [this.termId],
      subject:[this.subject],
      doc:['']

    /**
     
     */
    })
  }

  ngOnInit(): void {
    this.unSelectedFile = this.docFile.nativeElement.files;
   
    if (this.router.url.includes('add-syllabus')) {
      this.pageTitle = 'Add Syllabus'
    }
    else if (this.router.url.includes('view-syllabus')) {
      this.spinner.show()
      this.pageTitle = 'View Syllabus'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.academicservice.getAcademicSyllabusById(this.id).subscribe(
        res => {
          
          if (res.status == 'OK') {
            this.addAcadSyllabus.patchValue({
              name: res.object.name,
              termId:res.object.termId,
              status:  res.object.status,
              paper: res.object.paper,
            })
            this.url = res.object.doc
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
    return this.addAcadSyllabus.controls;
  }

  goBack() {
    this.router.navigate([ `/main/academic-depart/syllabus/${this.term}/${this.paper}/${this.subject}`]);
  }

  openDoc(fileUrl) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: fileUrl
      }
    });
  }

  onSelectDoc(e) {
    var file = e.target.files[0];
    // console.log(file, "file juned");
   
     //file work change from 50 mb to 200 mb
     let fileSizeMatch = this.sharedService.checkFileSize(file);
    // if (file.size > 52428800) {
      if (!fileSizeMatch) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.adminservice.openSnackbar('Document Should Be Maximum 200 MB in Size')
     } else {
      this.docUrl = ''
      this.addAcadSyllabus.patchValue({
        doc: file
      });
      this.isDoc = true;
      
      // this.adminservice.addDoc(file).subscribe(
      //   res => {
      //     console.log(res, "url dj");
      //     if (res.status == 'OK') {
      //       this.adminservice.openSnackbar(res.message)
      //       this.url = res.object.url
      //       console.log(this.url, "my url");

      //     } else {
      //       this.spinner.hide();
      //       this.adminservice.openSnackbar(res.message)
      //     }
      //   },
      //   err => {
      //     this.spinner.hide();
      //     this.adminservice.openSnackbar('Error Occured.')
      //     console.log(JSON.stringify(err));
      //   }
      // )
    }
  }

  addSyllabus() {
    this.addAcadSyllabus.value.url = this.url;
    // console.log(this.addAcadSyllabus.value.termId," url ka console");

    if (this.addAcadSyllabus.invalid) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else {
      this.spinner.show();
      console.log(this.addAcadSyllabus.value)
      this.academicservice.addSyllabus(this.addAcadSyllabus.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
           this.goBack()
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

  update() {
    this.spinner.show();
    // console.log("Bdo", this.addBdoForm.value);
    this.addAcadSyllabus.value.url = this.url;
    if (this.addAcadSyllabus.valid) {
      this.academicservice.updateSyllabus(this.id, this.addAcadSyllabus.value).subscribe(
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
  this.goBack();
    } else {
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
    }
  }

}

