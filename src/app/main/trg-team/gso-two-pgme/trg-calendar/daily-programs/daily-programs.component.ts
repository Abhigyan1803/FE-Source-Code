import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-daily-programs',
  templateUrl: './daily-programs.component.html',
  styleUrls: ['./daily-programs.component.scss']
})
export class DailyProgramsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number','date', 'time','seasonTerm','term','week','battalion','period','subject','status','action'];
  sortedData:any[];
  programsList: any[] = [];


  constructor(private router: Router, private spinner: NgxSpinnerService, private snackbar: MatSnackBar, private cdref: ChangeDetectorRef,
    private _trgBattalion:TrgBattalionService, private service: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAllPrograms();
  }

  getAllPrograms() {
    this.spinner.show();
    this.service.getAllTRGDailyPrograms().subscribe(
      res => {
        if (res.status == 'OK') {
          this.programsList = res.object;
          this.dataSource= new MatTableDataSource(res.object);
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
      })
  }

  changeStatus(e: any, p) {
    this.spinner.show()
    if (e.checked) {
      this.service.updateTRGProgramStatus(p.id, 1).subscribe(
        res => {
          // console.log(res);
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

      this.service.updateTRGProgramStatus(p.id, 0).subscribe(
        res => {
          // console.log(res);
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

  addProgram() {
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/daily-programs/add-program'])
  }

  viewProgram(p) {
    this.router.navigate(['main/trg-team/gso-2-pgme/trg-calendar/daily-programs/view-program'], { queryParams: { id: p.id } })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.programsList.slice();
    if (!sort.active || sort.direction === '') {
      this.programsList = datalist;
      return;
    }
    this.programsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'time': return this._trgBattalion.compare(a.startTime, b.startTime, isAsc);
        case 'term': return this._trgBattalion.compare(a.term, b.term, isAsc);
        case 'seasonTerm': return this._trgBattalion.compare(a?.sessionTerm, b?.sessionTerm, isAsc);
        case 'week': return this._trgBattalion.compare(a.week, b.week, isAsc);
        case 'battalion': return this._trgBattalion.compare(a.battalian, b.battalian, isAsc);
        case 'period': return this._trgBattalion.compare(a.period.toLowerCase(), b.period.toLowerCase(), isAsc);
        case 'subject': return this._trgBattalion.compare(a.subject.toLowerCase(), b.subject.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.programsList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
