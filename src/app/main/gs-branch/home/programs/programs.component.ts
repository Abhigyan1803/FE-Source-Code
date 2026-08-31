import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
@Component({
  selector: 'ms-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number','date', 'time', 'programme','venue','action'];
  programsArr:any[]=[]


  constructor(private router:Router,  private _trgBattalion:TrgBattalionService,
     private service:AdminService,  private cdref:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAllPrograms();
  }

  getAllPrograms(){
    this.service.getAllPrograms().subscribe(
      res =>{
        console.log(res);
        
        if(res.status == "1"){
          this.programsArr = res.List;
          this.dataSource= new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        } else{
          this.programsArr = [];
        }
      },
      err =>{
        console.log(JSON.stringify(err));
        this.programsArr = []
        this._trgBattalion.openSnackbar('Error Occured.')
        
      }
    )
  }

  addProgram(){
this.router.navigate(['/main/admin/home/programes/add-program'])
  }

  viewProgram(p){
    this.router.navigate(['/main/admin/home/programes/view-program'], { queryParams: { id: p.id } })
  }


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.programsArr.slice();
    if (!sort.active || sort.direction === '') {
      this.programsArr = datalist;
      return;
    }
    this.programsArr = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.scheduledDate, b.scheduledDate, isAsc);
        case 'programme': return this._trgBattalion.compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);      
        case 'venue': return this._trgBattalion.compare(a.venue.toLowerCase(), b.venue.toLowerCase(), isAsc);      
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.programsArr);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
