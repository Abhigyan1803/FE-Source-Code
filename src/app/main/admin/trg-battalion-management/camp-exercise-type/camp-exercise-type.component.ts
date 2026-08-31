import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-camp-exercise-type',
  templateUrl: './camp-exercise-type.component.html',
  styleUrls: ['./camp-exercise-type.component.scss']
})
export class CampExerciseTypeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'type','status','action'];  
  ExerciseType: any[] = [];

  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService, 
    private cdref:ChangeDetectorRef ,public dialog: MatDialog, private sharedService:SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getExerciseType()
  }

  

  getExerciseType(){
    this.spinner.show();
  this.adminservice.getExerciseType(2).subscribe(res =>{  
    console.log(res);
    if(res.status=="OK"){
      this.ExerciseType = res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
      this.cdref.detectChanges();
    console.log(res,"=================");

    }
    else{
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    this.adminservice.openSnackbar("Some Error Occured.");
  }
  
  )
  }
  
  addSRE() {
    this.router.navigate(['main/admin/trg-battalion/exercise-type/add-exercise-type']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewSRE(element) {
    if(this.router.url.includes('main/exercise-type'))
    this.router.navigate(['main/admin/trg-battalion/exercise-type/view-exercise-type'],{queryParams:{id:element.id}})
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/trg-battalion/exercise-type/view-exercise-type'],{queryParams:{id:element.id}})  
  }

 

  sortData(sort: Sort){

    const datalist = this.ExerciseType.slice();
    if (!sort.active || sort.direction === '') {
      this.ExerciseType = datalist;
      return;
    }
    this.ExerciseType = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.ExerciseType);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeExercisetypeStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.adminservice.changeExerciseTypeStatus(d.id, 1).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()

          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
    else {
      this.adminservice.changeExerciseTypeStatus(d.id, 0).subscribe(
        res => {
          console.log(res);
            
          if (res.status == 'OK') {
            
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()
          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }


 

}
