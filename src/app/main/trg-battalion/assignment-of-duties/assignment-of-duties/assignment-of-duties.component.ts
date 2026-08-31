import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ms-assignment-of-duties',
  templateUrl: './assignment-of-duties.component.html',
  styleUrls: ['./assignment-of-duties.component.scss']
})
export class AssignmentOfDutiesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'status', 'document', 'action', 'delete'];
  assignmentList: any[];
  isAdmin: boolean = false;
  battalionDetails: any = {};

  constructor(private router: Router, private _trgBattalion: TrgBattalionService, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes('main/trg-battalion')) {
      this.isAdmin = false;
      this.battalionDetails = JSON.parse(localStorage.getItem('loginResponse')).object.battalion;

    } else if (this.router.url.includes('main/admin')) {
      this.isAdmin = true;
      this.displayedColumns.splice(2, 0, 'battalion');
    }
  }


  ngAfterViewInit() {
    if (this.isAdmin)
      this.getAssignment(0, 2);
    else if (!this.isAdmin)
      this.getAssignment(this.battalionDetails.id, 2);
  }

  getAssignment(battalionId, status) {
    this.spinner.show();
    this._trgBattalion.getAssigment(battalionId, status).subscribe(res => {
      if (res.status == "1") {

        this.assignmentList = res.List;
        this.assignmentList = this.assignmentList.map((res) => ({
          id: res.id, date: res.createdAt,
          document: res.document,
          battalion: res.battalionType.shortName,
          status: res.status
        }))

        this.dataSource = new MatTableDataSource(this.assignmentList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
      }
      else {

        this.dataSource = [];
        this.spinner.hide()
        this._trgBattalion.openSnackbar(res.msg)
      }
    },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.")
      }

    )
  }

  openDoc(doc) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Assignment of Duties", url: doc
      }
    });
  }


  addAssignment() {
    if (this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/assignment-of-duties/add-aod']);

    if (this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/assignment-of-duties/add-aod']);
  }

  viewAssignment(id) {
    if (this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/assignment-of-duties/view-aod'], { queryParams: { id: id } });

    if (this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/assignment-of-duties/view-aod'], { queryParams: { id: id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.assignmentList.slice();
    if (!sort.active || sort.direction === '') {
      this.assignmentList = datalist;
      return;
    }
    this.assignmentList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.assignmentList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(element) {
    this._trgBattalion.deleteAssignmentofDuties(element.id, 3).subscribe(
      res => {
        console.log(res);
        if (res.status == '1') {
          this._trgBattalion.openSnackbar("Record Deleted")
          this.ngAfterViewInit();
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/trg-battalion/assignment-of-duties']);
        } else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }
}
