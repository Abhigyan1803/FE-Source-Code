import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-schedule-of-central-lec',
  templateUrl: './schedule-of-central-lec.component.html',
  styleUrls: ['./schedule-of-central-lec.component.scss']
})
export class ScheduleOfCentralLecComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name','description', 'status', 'document', 'action'];
  sortedData: any[];
  sopList: any[];


  constructor(private router: Router, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private _trgBattalion: TrgBattalionService, private service: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getAllCentralLecture();
  }

  getAllCentralLecture() {
    this.spinner.show();
    this.service.getAllCentralLecture().subscribe(
      res => {
        if (res.status == '1') {
          this.sopList = res.List
          this.cdref.detectChanges();
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this._trgBattalion.openSnackbar(res.msg)
          this.spinner.hide()
        }
      },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar('Some Error Occured.')
      })
  }

  changeStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeGSOOneTrglCentralLectureStatus(d.id, 1).subscribe(
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
      this.service.changeGSOOneTrglCentralLectureStatus(d.id, 0).subscribe(
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
  }

  
  openDoc(doc) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'GSO One Training Schedule-of-central-lec',url: doc.document
      }
    });
  }


  addDocument() {
    this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-central-lec/add-schedule'])
  }

  viewTrgDoc(d) {
    if(this.router.url.includes('main/trg-team'))
    this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-central-lec/view-schedule'], { queryParams: { id: d.id } })
    if(this.router.url.includes('main/admin'))
  this.router.navigate(['/main/admin/trg-team/gso-1-training/schedule-of-central-lec/view-schedule'],{queryParams:{id:d.id}});
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.sopList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.sopList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sopList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
