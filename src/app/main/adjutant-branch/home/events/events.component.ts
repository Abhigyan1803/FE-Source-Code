import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'image', 'date', 'name', 'gcEvent','status', 'action'];
  eventsList: any[] = []
  localID
  constructor(private router: Router, private service: AdminService, private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private _trgBattalion: TrgBattalionService, @Inject(LOCALE_ID) localID: string) {
    this.localID = localID

    }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getEvents()
  }

  getEvents() {
    this.spinner.show()
    this.service.getAllEvents(false).subscribe(
      res => {
        if (res.status == "1") {
          this.eventsList = res.List
          this.dataSource = new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        }
        // console.log(res);
        this.spinner.hide()
      },
      err => {
        this.service.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }

  changeEventStatus(e: any, id) {
    this.spinner.show();
    if (e.checked) {
      this.service.updateEventStatus(id, 1).subscribe(
        res => {
          if (res.status == '1') {
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.')

        }
      )
      this.spinner.hide();
    }
    else {

      this.service.updateEventStatus(id, 0).subscribe(
        res => {
          if (res.status == '1') {
            this.service.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }



  getEveTime(e) {
    const dt = new Date(e)
    let hrs = formatDate(dt, "HH", this.localID);
    let mnts = formatDate(dt, "mm", this.localID);
    if (hrs == '00' && mnts == '00') {
      return '';
    } else {
      return hrs + mnts;
    }
  }

  noImg(e) {
    e.target.src = "assets/img/logo_red.png"
  }

  addEvent() {
    this.router.navigate(['/main/home/events/add-event'])
  }

  viewEvent(e) {
    this.router.navigate(['/main/admin/home/events/view-event'], { queryParams: { id: e.id } })
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.eventsList.slice();
    if (!sort.active || sort.direction === '') {
      this.eventsList = datalist;
      return;
    }
    this.eventsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.eventDate, b.eventDate, isAsc);
        case 'name': return this._trgBattalion.compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        case 'gcEvent': return this._trgBattalion.compare(a.isGcEvent, b.isGcEvent, isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.eventsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
