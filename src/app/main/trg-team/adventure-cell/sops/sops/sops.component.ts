import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-sops',
  templateUrl: './sops.component.html',
  styleUrls: ['./sops.component.scss']
})
export class SopsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name', 'acType', 'description', 'status', 'document', 'action'];
  sortedData: any[];
  sopsList: any[];


  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private _trgBattalion: TrgBattalionService,
    private router: Router, private _trgTeam: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.getSops();
  }

  getSops() {
    this._trgTeam.getSops().subscribe(res => {
      console.log(res);
      if (res.status == "1") {
        this.sopsList = res.List;
        this.sopsList = this.sopsList.map((res) => ({
          id: res.id, date: res.createdAt, acType: res.acType.type,
          description: res.description, document: res.document, year: res.year,
          seasonTerm: res.seasonTerm.name,
          docName: res.docName, status: res.status
        }))
        this.dataSource = new MatTableDataSource( this.sopsList);
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
      this._trgTeam.changeSopsStatus(l.id, 1).subscribe(
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

      this._trgTeam.changeSopsStatus(l.id, 0).subscribe(
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
  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url:l.document
      }
    });
  }

  addSops() {
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['main/admin/trg-team/adventure-cell/add/sops']);
      } else {
    this.router.navigate(['main/trg-team/adventure-cell/add/sops']);
      }
  }
  viewSops(id) {
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['main/admin/trg-team/adventure-cell/view/sops/' + id])
        } else {
    this.router.navigate(['main/trg-team/adventure-cell/view/sops/' + id]) 
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
    const datalist = this.sopsList.slice();
    if (!sort.active || sort.direction === '') {
      this.sopsList = datalist;
      return;
    }
    this.sopsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.docName.toLowerCase(), b.docName.toLowerCase(), isAsc);
        case 'acType': return this._trgBattalion.compare(a.acType, b.acType, isAsc);
        case 'seasonTerm': return this._trgBattalion.compare(a.seasonTerm.toLowerCase(), b.seasonTerm.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sopsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
