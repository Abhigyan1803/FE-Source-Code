import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-forecast-of-trg-events',
  templateUrl: './forecast-of-trg-events.component.html',
  styleUrls: ['./forecast-of-trg-events.component.scss']
})
export class ForecastOfTrgEventsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date',  'seasonTerm', 'week','description','document', 'status', 'action'];
  sortedData: any[];

  forecastsList: any[] = [];
  constructor(private router: Router, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private _trgBattalion: TrgBattalionService, private service: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAllForecasts();
  }

  getAllForecasts() {
    this.spinner.show();
    this.service.getAllForecast(2).subscribe(
      res => {
        if (res.status == 'OK') {
          console.log(res);
          this.forecastsList = res.object;
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
          this.cdref.detectChanges();
        }
        else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Error Occured.');
      }
    )
  }


  addForecast() {
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/forecast/add-forecast'])
  }

  viewForecast(p) {
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/forecast/view-forecast'], { queryParams: { id: p.id } })
  }

  changeStatus(e, f) {
    this.spinner.show()
    if (e.checked) {
      this.service.changeForecastStatus(f.id, 1).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.cdref.detectChanges();
            this.spinner.hide();
            this._trgBattalion.openSnackbar("Status Changed Successfully.")
          } else {
            this.cdref.detectChanges();
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.message)
          }

        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar("Error Occured.")
        }
      )
    } else {

      this.service.changeForecastStatus(f.id, 0).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.cdref.detectChanges();
            this.spinner.hide();
            this._trgBattalion.openSnackbar("Status Changed Successfully.")
          } else {
            this.cdref.detectChanges();
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.message)
          }

        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar("Error Occured.")
        }
      )
    }

  }

  openDoc(e){
  
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"Forcast-Event Document", url: e.locationImage
        }
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
    const datalist = this.forecastsList.slice();
    if (!sort.active || sort.direction === '') {
      this.forecastsList = datalist;
      return;
    }
    this.forecastsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'seasonTerm': return this._trgBattalion.compare(a.sessionTerm, b.sessionTerm, isAsc);
        case 'week': return this._trgBattalion.compare(a.week, b.week, isAsc);  
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.forecastsList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
