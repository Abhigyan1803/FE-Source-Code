import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdjutantDialogComponent } from '../../adjutant-branch/adjutant-dialog/adjutant-dialog.component';
import { SharedService } from 'app/service/shared.service';



@Component({
  selector: 'ms-location-state',
  templateUrl: './location-state.component.html',
  styleUrls: ['./location-state.component.scss']
})
export class LocationStateComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'createdAt', 'name', 'document', 'status', 'action'];
  broList: any[];
  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private sharedService:SharedService,
    private router: Router, private _trgBattalion: TrgBattalionService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getLocationState();
  }


  getLocationState() {
    this.spinner.show();
    this._trgBattalion.getLocationState().subscribe(
      res => {
        console.log(res,"loaction state");

        if (res.status == "1") {
          this.dataSource = new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        }
        this.spinner.hide()
      },
      err => {
        this._trgBattalion.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }

  openDoc(e) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'Location State of Officers', url: e.document
      }
    });
  }

  changeStatus(e, l) {
    this.spinner.show();

    if (e.checked) {
      this._trgBattalion.changeLocationStateStatus(l.id, 1).subscribe(
        res => {

          if (res.status == '1') {
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            // this.ngAfterViewInit();
          } else {

            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg)
          }
        },
        err => {

          this.spinner.hide();
          this._trgBattalion.openSnackbar('Error Occured.')

        }
      )
      this.spinner.hide();
    }
    else {
      this._trgBattalion.changeLocationStateStatus(l.id, 0).subscribe(
        res => {
          if (res.status == '1') {
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            // this.ngAfterViewInit();
          }
          else {
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar('Error Occured.')
        }
      )
    }
  }


  addLocationState() {
    if (this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/location-state/add-locationstate']);
    if (this.router.url.includes('main/adjutant-branch'))
      this.router.navigate(['/main/adjutant-branch/officer-parade/add-locationstate']);
  }


  editLocationState(ob) {
    if (this.router.url.includes('trg-battalion'))
      this.router.navigate(['/main/trg-battalion/location-state/view-locationstate'], { queryParams: { id: ob.id } });
    if (this.router.url.includes('main/adjutant-branch'))
      this.router.navigate(['/main/adjutant-branch/Officer-Parade/view-locationstate'], { queryParams: { id: ob.id } });
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
        case 'createdAt': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this.sharedService.compare(a.name, b.name, isAsc);

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
