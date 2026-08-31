import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { AdminService } from 'app/service/admin/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ms-battle-history',
  templateUrl: './battle-history.component.html',
  styleUrls: ['./battle-history.component.scss']
})
export class BattleHistoryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  addassignmentForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['number', 'name','description','answer','view'];  
  POC: any[] = [];
  constructor(private adminservice: AdminService, private fb: FormBuilder,private academicservice:AcademicDeptService,public dialog: MatDialog) {
    this.addassignmentForm = this.fb.group({
      assignment: [''],
      assignmentType: ['battle-history'],
      paper: ['paper-1'],
      status: ['1'],
      termId: ['1'],

    })
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAssignments()
  }
  
  
  
  getAssignments(){
    // this.spinner.show();
  this.academicservice.getAssigenment(1).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.POC=res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.spinner.hide();
      // this.cdref.detectChanges();
  console.log(res,"=================");
  
    }
    else{
      this.adminservice.openSnackbar(res.message)
     }
  },
  err=>{
    this.adminservice.openSnackbar("Some Error Occured.");
  }
  
  )
  }
  openDoc(e){
console.log(e,"jj")
    this.dialog.open(DialogComponent,
      {
        width: '600px', height: '450px',
        data: {
          type: 'text',title:"", url:e.answer,id:e.id
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
}
