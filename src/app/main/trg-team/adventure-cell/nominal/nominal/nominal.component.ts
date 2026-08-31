import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-nominal',
  templateUrl: './nominal.component.html',
  styleUrls: ['./nominal.component.scss']
})
export class NominalComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name', 'description','status', 'document', 'action'];
  norminalList: any[];

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private _trgBattalion: TrgBattalionService,
    private router: Router, private _trgTeam: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getNominal();
  }

  getNominal() {
    this._trgTeam.getNominal().subscribe(res => {
      if (res.status == "1") {
        this.norminalList = res.List;
        this.dataSource = new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else {

      }
    })
  }
  openDoc(e) {
    console.log(e.document, "document");
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "Letters Document", url:e.document
        }
      }
    )
  }
  changeStatus(e, l) {
    console.log(e, l);
    this.spinner.show();
    if (e.checked) {
      this._trgTeam.changeNominalStatus(l.id, 1).subscribe(
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

      this._trgTeam.changeNominalStatus(l.id, 0).subscribe(
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

  addNominal() {
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['main/admin/trg-team/adventure-cell/add/nominal']);
    } else {
      this.router.navigate(['main/trg-team/adventure-cell/add/nominal']);
    }
  }

  viewNominal(id) {
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['main/admin/trg-team/adventure-cell/view/nominal/' + id])
    } else {
    this.router.navigate(['main/trg-team/adventure-cell/view/nominal/' + id])
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
    const datalist = this.norminalList.slice();
    if (!sort.active || sort.direction === '') {
      this.norminalList = datalist;
      return;
    }
    this.norminalList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.norminalList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
