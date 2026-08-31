import { MatDialog } from '@angular/material/dialog';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  performanceList:any[]=[];
  dataSource :any;
  displayedColumns: string[] = ['number','battalion', 'company','description','status','action'];  

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private router: Router,
    private service:AdminService, private sharedService:SharedService ,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getPerformanceList();
  }


  getPerformanceList(){
    this.spinner.show();
  this.service.getPerformanceList(0,2).subscribe(
    res =>{
      console.log(res);
      
      if(res.status == "OK"){
        this.performanceList = res.object;
        this.dataSource= new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      this.spinner.hide()
    },
    err =>{
      this.service.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  addPerformance() {
    this.router.navigate(['/main/admin/trg-battalion/performance/add-performance']);
  }

  viewPerformance(m) {
    this.router.navigate(['/main/admin/trg-battalion/performance/view-performance'], { queryParams: { id: m.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
sortData(sort: Sort) {

  const datalist = this.performanceList.slice();
  if (!sort.active || sort.direction === '') {
    this.performanceList = datalist;
    return;
  }

  this.performanceList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      //'name','rank','battalion'
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);      
      case 'rank': return this.sharedService.compare(a.performanceRank.toLowerCase(), b.performanceRank.toLowerCase(), isAsc);      
      case 'battalion': return this.sharedService.compare(a.battalian.shortName.toLowerCase(), b.battalian.shortName.toLowerCase(), isAsc);      
      default: return 0;

    }
  });
  this.dataSource = new MatTableDataSource(this.performanceList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}


changePerformanceStatus(e:any,id){
    this.spinner.show()
    if(e.checked){
      this.service.changePerformanceStatus(id,1).subscribe(
        res =>{
          // console.log(res);
          
          if(res.status == 'OK'){
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide()
          // this.ngAfterViewInit()
          } else {
            this.service.openSnackbar(res.message)
            this.spinner.hide();
          }
        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured")

        }
  
      )
    } else {
      this.service.changePerformanceStatus(id,0).subscribe(
        res =>{
          // console.log(res);
          
          if(res.status == 'OK'){
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide()
            // this.ngAfterViewInit()
            } else {
              this.service.openSnackbar(res.message)
              this.spinner.hide();
            }

        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured")

        }
      )
    }
  }


}
