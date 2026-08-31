import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-exam-param',
  templateUrl: './add-exam-param.component.html',
  styleUrls: ['./add-exam-param.component.scss']
})
export class AddExamParamComponent implements OnInit {

 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number','termName', 'spotTestMark','wttMark','status','action'];  
  WTT: any[] = [];
  
  
  constructor(private router: Router, private adminservice: TrgTeamService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { }
  
 
  ngOnInit(): void {
    // this.getWeapons(1);
    // this.enterMarks();
  }

  addParameter() {
    if(this.router.url.includes('/main/admin/trg-team/add-exam-param'))
    this.router.navigate(['/main/admin/trg-team/add-exam-param/add-param']);
  
    if(this.router.url.includes('/main/trg-team/weapon/add-exam-param'))
    this.router.navigate(['/main/trg-team/weapon/add-exam-param/add-param']);
  
  }

  ngAfterViewInit() {
    this.getWTT()
  }

  

  getWTT(){
    this.spinner.show();
  this.adminservice.getExamParam(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.WTT=res.object ;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.WTT.slice();
    if (!sort.active || sort.direction === '') {
      this.WTT = datalist;
      return;
    }
    this.WTT = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.WTT);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

}
