import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ms-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name', 'term', 'description', 'status', 'document', 'action'];
  sortedData: any[];
  chartList: any[];

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private _trgBattalion: TrgBattalionService,
    private router: Router, private _trgTeam: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.getChart();
  }

  getChart() {
    this._trgTeam.getChart().subscribe(res => {
      if (res.status == "1") {
        this.chartList = res.List;
  
        this.chartList = this.chartList.map((res) => ({
          id: res.id, date: res.createdAt,
          description: res.description, document: res.document, year: res.year,
          seasonTerm: res.seasonTerm.name,
          name: res.name, status: res.status
        }))
        this.dataSource = new MatTableDataSource(this.chartList );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else {
      }
    })
  }

  changeStatus(e, l) {
    console.log(e, l);
    this.spinner.show();
    if (e.checked) {
      this._trgTeam.changeChartStatus(l.id, 1).subscribe(
        res => {
          if (res.status == '1') {
            this._trgBattalion.openSnackbar(res.msg)
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
      this._trgTeam.changeChartStatus(l.id, 0).subscribe(
        res => {
          if (res.status == '1') {
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this._trgBattalion.openSnackbar('Error Occured.')
        })
      this.spinner.hide();
    }
  }

  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: l.document
      }
    });
  }

  addChart() {
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team//adventure-cell/add/chart']);
    } else {
      this.router.navigate(['main/trg-team/adventure-cell/add/chart']);
    }
  }
  viewChart(id) {
    

    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/adventure-cell/view/chart/' + id]);
    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/view/chart/' + id])
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.chartList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.chartList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'term': return this._trgBattalion.compare(a.seasonTerm, b.seasonTerm, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.chartList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
