import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import {  DeleteAssignmentsComponent} from 'app/Shared/delete-assignments/delete-assignments.component';

import { AdminService } from 'app/service/admin/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { AuthService } from 'app/service/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-academic-assignments',
  templateUrl: './academic-assignments.component.html',
  styleUrls: ['./academic-assignments.component.scss']
})
export class AcademicAssignmentsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList: any[] = [];
  dataSource: any;
  addassignmentForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['number', 'name', 'description','remark','createdAt','document','answer', 'view'];
  POC: any[] = [];
  Question: any[] = [];
  Id: any[] = [];

  Data: any[] = [];
  term: string;
  paper: string;
  termId:number;

  assignment: string
  assTitle:string;

  abc
  constructor(private adminservice: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private academicservice: AcademicDeptService, private authService: AuthService, public dialog: MatDialog) {
    this.route.params.subscribe((params) => {
      console.log(params);
      
      this.term = params.term;
      this.paper = params.paper;
      this.assignment = params.assignment;
      // console.log(this.term)
      // console.log(this.paper)
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

      this.getAcademicQuestion()



    });
    
    var tempTermId;
    if (this.term == "I Term") {
      tempTermId = 1;
    } else if (this.term == "II Term") {
      tempTermId = 2;
    } else if (this.term == "III Term") {
      tempTermId = 3;
    } else if (this.term == "IV Term") {
      tempTermId = 4;
    }
    else if (this.term == "V Term") {
      tempTermId = 5;
    } else if (this.term == "VI Term") {
      tempTermId = 6;
    } else if (this.term == "II Tech") {
      tempTermId = 7;
    }

    this.abc=tempTermId
    this.addassignmentForm = this.fb.group({
      assignment: [''],
      question: [''],
      assignmentType: [this.assignment],
      paper: [this.paper],
      status: ['1'],
      termId: [this.termId],
      // Id:['']
    })

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // this.getAssignments()
    this.getAcademicQuestion()
  }
  addnew(id) {
    console.log(id)
    this.getAssignments(id)
  }
  getAcademicQuestion() {
    console.log(this.termId);
    
    this.spinner.show();
    this.academicservice.getAnswerList(this.paper,this.assignment,this.termId, 1).subscribe(res => {
      console.log(res);

      if (res.status == "OK") {
        this.Data = res.object;
        // console.log(this.Id,"jjjjjjj")
        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "question Response");

      }
      else {
        this.spinner.hide()
        this.adminservice.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.");
      }

    )
  }

  getAssignments(id) {
    // this.addassignmentForm.value.acdAsnId= id;
    // this.spinner.show();
    this.academicservice.getAssigenment(id, 1).subscribe(res => {
      console.log(res);

      if (res.status == "OK") {
        this.POC = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        // this.spinner.hide();
        // this.cdref.detectChanges();
        console.log(res, "=================");

      }
      else {
        this.adminservice.openSnackbar(res.message)
      }
    },
      err => {
        this.adminservice.openSnackbar("Some Error Occured.");
      }

    )
  }



  public onChange(event: CKEditor4.EventInfo) {
    this.authService.resetTime()
    // console.log(event.editor.getData());
    console.log(event.editor)
  }

  mouseEvent(e, t) {
    // console.log(t)
    this.authService.resetTime()
  }

  addAssign() {
    this.router.navigate(['/main/academic-depart/assignments/' + this.term + '/' + this.paper + '/' + this.assignment + '/add-assignment']);
  }



  openDoc(e) {
    this.dialog.open(DialogComponent,
      {
        width: '900px', height: '350px',
        data: {
          type: 'text', title: "", url: e.answer, id: e.id,remark:e.remark,
          
        }
        
      }
      
    )
    
  

  }
  openDoc1(e) {
console.log(e);

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "ITPPP Document", url: e.file
        }
      }
    )
    
  }

  addAssignment() {
    // this.spinner.show();
    console.log(this.addassignmentForm.value)
    this.academicservice.addAssignment(this.addassignmentForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          // this.cdref.detectChanges();
          // this.spinner.hide();
          // this.router.navigate(['main/admin/GS-Branch/stats/stats/poc']);
        } else {
          // this.spinner.hide();
          this.adminservice.openSnackbar(res.message)
        }
      },
      err => {
        // this.spinner.hide();
        this.adminservice.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )

  }
  // delete(element) {
  //   this.academicservice.deleteAssignment(element, 3).subscribe(
  //     res => {
  //       console.log(res);
  //       if (res.status == 'OK') {
  //         this.adminservice.openSnackbar("Record Deleted")
  //         this.ngAfterViewInit();
  //         this.cdref.detectChanges();
  //         this.spinner.hide();
  //       } else {
  //         this.spinner.hide();
  //         this.adminservice.openSnackbar(res.message)
  //       }
  //     },
  //     err => {
  //       this.spinner.hide();
  //       this.adminservice.openSnackbar('Error Occured.')
  //       console.log(JSON.stringify(err));
  //     }
  //   )
  // }

  delete(element) {
    const dialogRef = this.dialog.open(DeleteAssignmentsComponent,{
      data:{
        message: 'Are you sure want to Delete Assignment ?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.academicservice.deleteAssignment(element, 3).subscribe(
              res => {
                console.log(res);
                if (res.status == 'OK') {
                  this.adminservice.openSnackbar("Record Deleted")
                  this.ngAfterViewInit();
                  this.cdref.detectChanges();
                  this.spinner.hide();
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
      
    })
  }
}