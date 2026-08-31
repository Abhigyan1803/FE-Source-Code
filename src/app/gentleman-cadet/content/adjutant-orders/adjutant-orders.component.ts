import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GcService } from 'app/service/gc/gc.service';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-adjutant-orders',
  templateUrl: './adjutant-orders.component.html',
  styleUrls: ['./adjutant-orders.component.scss']
})
export class AdjutantOrdersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'document', 'date'];
  aroRecords: any[] = [];

  constructor(private gcservice:GcService , private spinner: NgxSpinnerService,  private cdref: ChangeDetectorRef,
     private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
this.getAdjutantOrders()
  }

  getAdjutantOrders(){
    this.spinner.show()
    this.gcservice.getAdjutantOrders(1,true).subscribe(res => {
      if (res.status == "1") {
        this.aroRecords = res.List

        this.dataSource = new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
        this.spinner.hide();

      } else {
        this.spinner.hide()

      }
    },
      err => {
        this.spinner.hide();
      }

    )
  }

  
  openDoc(e) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'ARO Document', url: e.document
      }
    });
  }

  sortData(sort: Sort) {

    const datalist = this.aroRecords.slice();
    if (!sort.active || sort.direction === '') {
      this.aroRecords = datalist;
      return;
    }

    this.aroRecords = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'date': return this.sharedService.compare(a.createdAt.toLowerCase(), b.createdAt.toLowerCase(), isAsc);

        default: return 0;

      }

    });
    this.dataSource = new MatTableDataSource(this.aroRecords);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
