import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name', 'acType', 'description', 'status', 'document', 'action'];
  lettersList: any[] = [];
  sortedData: any[];

  constructor(private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private _trgBattalion: TrgBattalionService,
    private router: Router, private service: TrgTeamService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getLetters()
  }

  getLetters() {
    this.spinner.show()
    this.service.getAllLetters().subscribe(
      res => {
        console.log(res, "letters");

        if (res.status == '1') {
          this.lettersList = res.List;
          this.lettersList = this.lettersList.map((res) => ({
            id: res.id, date: res.date, acType: res.acType.type,
            description: res.description, document: res.document, name: res.name, status: res.status
          }))
          this.cdref.detectChanges();
          this.spinner.hide()
          this.dataSource = new MatTableDataSource(this.lettersList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this._trgBattalion.openSnackbar(res.msg)
          this.spinner.hide();
        }

      },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar('Error Occured.')
      }
    )
  }

  // openDoc(l) {
  //   this.dialog.open(DialogComponent, {
  //     width: '1200px', height: '600px',
  //     data: {
  //       type: 'document', url: l.document
  //     }
  //   });
  // }
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

  addLetter() {
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/adventure-cell/letters/add-letter'])
    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/letters/add-letter'])
    }
  }

  viewLetter(l) {
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['/main/admin/trg-team/adventure-cell/letters/view-letter'], { queryParams: { id: l.id } })
    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/letters/view-letter'], { queryParams: { id: l.id } })
    }
  }

  changeLetterStatus(e, l) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeLetterStatus(l.id, 1).subscribe(
        res => {

          if (res.status == '1') {
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

      this.service.changeLetterStatus(l.id, 0).subscribe(
        res => {

          if (res.status == '1') {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.lettersList.slice();
    if (!sort.active || sort.direction === '') {
      this.lettersList = datalist;
      return;
    }
    this.lettersList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'acType': return this._trgBattalion.compare(a.acType, b.acType, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.lettersList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
