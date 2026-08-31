import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-service-record',
  templateUrl: './service-record.component.html',
  styleUrls: ['./service-record.component.scss']
})
export class ServiceRecordComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  recordsOfServiceList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'rankName' ,'name', 'personalNumber', 'idCardNo','status', 'view'];

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, public sharedService:SharedService,
    private router: Router, private service: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getRecordsOfServiceList();
  }

  getRecordsOfServiceList() {
    this.spinner.show()
    this.service.getRecordOfServiceList(2).subscribe(
      res => {
        // console.log(res);
        if (res.status == "OK") {
          this.recordsOfServiceList = res.object;
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();

        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.");
      }
    )
  }
  noImg(e: any) {
    e.target.src = "assets/img/default_cadet_img.jpg"
  }

  changeOfficerStatus(e: any, c) {

    this.spinner.show();
    let s;
    if(e.checked){
      s=1
    } else {
      s=0
    }

    this.service.changeOfficerStats(c.id, s).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();

            this.spinner.hide();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.');
        }
      )
 

  }



  addRecordOfService() {
    // if(this.router.url.includes('/main/admin/record')){
    //   this.router.navigate(['/main/admin/record/add-record'])
    // } else if(this.router.url.includes('/main/adjutant-branch/record')) {
    //   this.router.navigate(['/main/adjutant-branch/record/add-record'])
    // }
    this.router.navigate([`${this.router.url}/add-record`])

  }

  viewRecordOfService(c) {
    // if(this.router.url.includes('/main/admin/record')){
    //   this.router.navigate(['/main/admin/record/view-record'], { queryParams: { id: c.id } })
    // } else if(this.router.url.includes('/main/adjutant-branch/record')) {
    //   this.router.navigate(['/main/adjutant-branch/view-record'], { queryParams: { id: c.id } })
    // }
    this.router.navigate([`${this.router.url}/view-record`], { queryParams: { id: c.id } })

  }


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.recordsOfServiceList.slice();
    if (!sort.active || sort.direction === '') {
      this.recordsOfServiceList = datalist;
      return;
    }
    this.recordsOfServiceList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {

        case 'rankName': return this.sharedService.compare(a.rankName.toLowerCase(), b.rankName.toLowerCase(), isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'personalNumber': return this.sharedService.compare(a.personalNumber.toLowerCase(), b.personalNumber.toLowerCase(), isAsc);
        case 'idCardNo': return this.sharedService.compare(a.idCardNo.toLowerCase(), b.idCardNo.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.recordsOfServiceList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
