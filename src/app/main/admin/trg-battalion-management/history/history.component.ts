import { MatDialog } from '@angular/material/dialog';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedService } from 'app/service/shared.service';
import { Links } from 'app/links.module';


@Component({
  selector: 'ms-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  IP = Links.IP;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  historyList:any[]=[];
  dataSource :any;
  displayedColumns: string[] = ['number', 'image','description','battalion','status','action'];  

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private sharedService:SharedService,
    private router: Router,private service:AdminService ,private dialog:MatDialog,  private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getHistoryList();
  }


  getHistoryList(){
    this.spinner.show();
  this.service.getHistoryList().subscribe(
    res =>{
      console.log(res);
      
      if(res.status == "OK"){
        this.historyList = res.object;
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


changeHistoryStatus(e:any,id){

  this.spinner.show()
  if(e.checked){
    this.service.updateHistoryStatus(id,1).subscribe(
      res =>{
        // console.log(res);
        
        if(res.status == 'OK'){
        this.service.openSnackbar(res.message);
        this.cdref.detectChanges();
        this.spinner.hide();
        // this.ngAfterViewInit()
        } else {
          this.service.openSnackbar(res.message);
          this.spinner.hide();
        }
      },
      err =>{
        this.service.openSnackbar("Some Error Occured");
        this.spinner.hide()
      }

    )
  } else {
    this.service.updateHistoryStatus(id,0).subscribe(
      res =>{
        // console.log(res);

        if(res.status == 'OK'){
          this.service.openSnackbar(res.message);
          this.cdref.detectChanges();
          this.spinner.hide();
          // this.ngAfterViewInit()
        }
        else {
          this.service.openSnackbar(res.message);
          this.spinner.hide();
        }

      },
      err =>{
        this.service.openSnackbar("Some Error Occured");
        this.spinner.hide()
      }
    )
  }
}


  addHistory() {
    this.router.navigate(['/main/admin/trg-battalion/history/add-history']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  viewHistory(m) {
    this.router.navigate(['/main/admin/trg-battalion/history/view-history'], { queryParams: { id: m.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
sortData(sort: Sort) {

  const datalist = this.historyList.slice();
  if (!sort.active || sort.direction === '') {
    this.historyList = datalist;
    return;
  }

  this.historyList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);      
      case 'battalion': return this.sharedService.compare(a.battalionType.shortName.toLowerCase(), b.battalionType.shortName.toLowerCase(), isAsc);      
     
      default: return 0;

    }
  });
  this.dataSource = new MatTableDataSource(this.historyList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}

  

  openSnackbar(msg){
    this.snackbar.open(msg,'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
  


}
