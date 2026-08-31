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
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { SharedService } from 'app/service/shared.service';
@Component({
  selector: 'ms-add-academic-assignments',
  templateUrl: './add-academic-assignments.component.html',
  styleUrls: ['./add-academic-assignments.component.scss']
})
export class AddAcademicAssignmentsComponent implements OnInit {
  addassignmentForm: FormGroup = new FormGroup({});
  term: string;
  paper: string;
  assignment: string;
  termId:number;
  assTitle:string;
  unSelectedFile: any;

  isError
  docUrl: any;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  

  constructor(private adminservice: AdminService, private router: Router,private Trgservice: TrgBattalionService, public sharedService: SharedService,
    private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private route: ActivatedRoute, private fb: FormBuilder, private academicservice: AcademicDeptService, private authService: AuthService, public dialog: MatDialog) {
    this.route.params.subscribe((params) => {
      this.term = params.term;
      this.paper = params.paper;
      this.assignment = params.assignment;
      console.log(this.term)
      console.log(this.paper)
      console.log(this.assignment)

      
      if (this.term == "I Term") {
        this.termId = 1;
      } else if (this.term == "II Term") {
        this.termId = 2;
      } else if (this.term == "III Term") {
        this.termId = 3;
      }  else if (this.term == "II Tech") {
        this.termId = 7;
      }

      
      if(this.assignment == "Science and Warfare"){
        this.assTitle = "Science & Warfare"
      } else {
        this.assTitle = this.assignment;
      }


      this.addassignmentForm = this.fb.group({
        assignment: ['', Validators.required],
        question: ['', Validators.required],
        assignmentType: [this.assignment],
        paper: [this.paper],
        status: ['1'],
        termId: [this.termId],
        // topic:['']
      file: [],
      lastSubmissionDate: ['', Validators.required],
      })

    });
 
    
 
  }

  ngOnInit(): void {
  }

  // upload1(event: any, index: number): void {
  //   this.spinner.show();
  //   let fileName = event.target.files[0].name;
  //   var file = event.target.files[0];
  //   this.Trgservice.FileAboutUs(file).subscribe(
  //     res => {
  //       console.log(res.object.url);
  //       if (res.status == 'OK') {
  //         this.academicservice.openSnackbar(res.message)
  //         this.addassignmentForm.patchValue({
  //           file: res.object.url,
  //         })
  //         this.spinner.hide();
  //       } else {
  //         this.spinner.hide();
  //         this.academicservice.openSnackbar(res.message)
  //       }
  //     },
  //     err => {
  //       this.spinner.hide();
  //       this.academicservice.openSnackbar('Error Occured.')
  //       console.log(JSON.stringify(err));
  //     }
  //   )
  // }
  //add validation on 200mb file
  upload1(event: any, index: number): void {
    var file = event.target.files[0];
    if (file.size > 202428800) { 
      this.sharedService.openSnackbar('Document Should Be Maximum 200 MB in Size')
    }else{
      // console.log('less file');
      this.spinner.show();
      let fileName = event.target.files[0].name;
      // var file = event.target.files[0];
      this.Trgservice.FileAboutUs(file).subscribe(
        res => {
          console.log(res.object.url);
          if (res.status == 'OK') {
            this.academicservice.openSnackbar(res.message)
            this.addassignmentForm.patchValue({
              file: res.object.url,
            })
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.academicservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.academicservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
    return;
   
  }
  
  public onChange(event: CKEditor4.EventInfo) {
    this.authService.resetTime()
    // console.log(event.editor.getData());
    console.log(event.editor)
  }
  public get f() {
    return this.addassignmentForm.controls;
  }
  mouseEvent(e, t) {
    // console.log(t)
    this.authService.resetTime()
  }
  goBack() {
    this.router.navigate(['/main/academic-depart/assignments/' + this.term + '/' + this.paper + '/' + this.assignment]);
  }
  addAssignment() {
    if (this.addassignmentForm.invalid) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    }
    else{
    this.spinner.show();
    console.log(this.addassignmentForm.value)
    this.academicservice.addAssignment(this.addassignmentForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          // window.location.reload();
          this.router.navigate(['/main/academic-depart/assignments/' + this.term + '/' + this.paper + '/' + this.assignment]);
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
}
