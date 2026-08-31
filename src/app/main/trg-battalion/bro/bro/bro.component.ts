import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-bro',
  templateUrl: './bro.component.html',
  styleUrls: ['./bro.component.scss']
})
export class BroComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  isAdmin: boolean = false;
  battalionDetails: any = {};
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'broNumber', 'document', 'status', 'action'];
  broList: any[];
  userDetails: any;
  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private router: Router, private _trgBattalion: TrgBattalionService, private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

    if (this.router.url.includes('main/trg-battalion')) {
      this.isAdmin = false;
      this.battalionDetails = this.userDetails.battalion;

    }

    else if (this.router.url.includes('main/admin')) {
      this.isAdmin = true;
      this.displayedColumns.splice(3, 0, 'battalion')
    }
  }

  ngAfterViewInit() {
    if (this.isAdmin) {
      this.getBro("All");
    } else {
      this.getBro(this.battalionDetails.id);

    }

  }

  getBro(type) {
    this.spinner.show();
    this._trgBattalion.getBro(type).subscribe(res => {
      console.log(res);

      if (res.status == "OK") {

        this.broList = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.spinner.hide();
        this.cdref.detectChanges();

      }
      else {
        this.spinner.hide()
        this._trgBattalion.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }

    )
  }

  openDoc(doc) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'BRO Document', url: doc[0].broDocument
      }
    });
  }

  changeStatus(e, l) {
    console.log(e, l);
    this.spinner.show();
    if (e.checked) {
      this._trgBattalion.changeBroStatus(l.id, 1).subscribe(
        res => {

          if (res.status == 'OK') {
            this._trgBattalion.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this._trgBattalion.openSnackbar('Error Occured.')

        }
      )
      this.spinner.hide();
    }
    else {

      this._trgBattalion.changeBroStatus(l.id, 0).subscribe(
        res => {

          if (res.status == 'OK') {
            this._trgBattalion.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this._trgBattalion.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }


  addBro() {
    // if(this.router.url.includes('main/trg-battalion'))
    // this.router.navigate(['/main/trg-battalion/bro/add-bro']);

    // if(this.router.url.includes('main/admin'))
    this.router.navigate([`${this.router.url}/add-bro`]);
  }

  editBro(id) {
    this.router.navigate([`${this.router.url}/view-bro`], { queryParams: { id: id } })
  }





  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  sortData(sort: Sort) {
    const datalist = this.broList.slice();
    if (!sort.active || sort.direction === '') {
      this.broList = datalist;
      return;
    }
    this.broList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this.sharedService.compare(a.date, b.date, isAsc);
        case 'battalion': return this.sharedService.compare(a.battalian.shortName.toLowerCase(), b.battalian.shortName.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.broList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
