import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-weekly-programs',
  templateUrl: './weekly-programs.component.html',
  styleUrls: ['./weekly-programs.component.scss']
})
export class WeeklyProgramsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number', 'battalion', 'week', 'weekStart', 'weekEnd','seasonTerm','term','status',];
  sortedData:any[];
  programsList:any[]=[];


  constructor(private router:Router, private spinner:NgxSpinnerService,private cdref:ChangeDetectorRef, 
    private sharedService:SharedService,  private service:TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.getAllPrograms();
  }

  getAllPrograms(){
    this.spinner.show();
    this.service.getWeeklyPrograms().subscribe(
      res => {
        // console.log(res);
        
        if(res.status=='OK'){
      
          this.programsList = res.object;          
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
          this.cdref.detectChanges();
        }
        else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar('Error Occured.');
      }
    )
    }


    changeStatus(e:any,p){
      this.spinner.show()
      if(e.checked){
     this.service.changeWeeklyProgramStatus(p.id,1).subscribe(
    res => {
      // console.log(res);
      if(res.status == 'OK'){
        this.cdref.detectChanges();
        this.spinner.hide();
        this.sharedService.openSnackbar("Status Changed Successfully.")
      } else {
        this.cdref.detectChanges();
        this.spinner.hide();
        this.sharedService.openSnackbar(res.message)
      }
      
    },
    err => {
      this.spinner.hide();
      this.sharedService.openSnackbar("Error Occured.")
    }
  )
      } else {
  
        this.service.changeWeeklyProgramStatus(p.id,0).subscribe(
          res => {
            // console.log(res);
            if(res.status == 'OK'){
              this.cdref.detectChanges();
              this.spinner.hide();
              this.sharedService.openSnackbar("Status Changed Successfully.")
            } else {
              this.cdref.detectChanges();
              this.spinner.hide();
              this.sharedService.openSnackbar(res.message)
            }
            
          },
          err => {
            this.spinner.hide();
            this.sharedService.openSnackbar("Error Occured.")
          }
        )
      }
  
    }
    
    

  addProgram(){
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/weekly-programs/add-program'])
  }

  viewProgram(p){
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/weekly-programs/view-program'],{queryParams:{id:p.id}})
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.programsList.slice();
    if (!sort.active || sort.direction === '') {
      this.programsList = datalist;
      return;
    }
    this.programsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this.sharedService.compare(a.date, b.date, isAsc);
        case 'term': return this.sharedService.compare(a?.term, b?.term, isAsc);
        case 'seasonTerm': return this.sharedService.compare(a.sessionTerm.toLowerCase(), b.sessionTerm.toLowerCase(), isAsc);
        case 'week': return this.sharedService.compare(a.week, b.week, isAsc);
        case 'battalion': return this.sharedService.compare(a.battalian, b.battalian, isAsc);
        case 'period': return this.sharedService.compare(a.period.toLowerCase(), b.period.toLowerCase(), isAsc);
        case 'subject': return this.sharedService.compare(a.subject.toLowerCase(), b.subject.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.programsList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
 