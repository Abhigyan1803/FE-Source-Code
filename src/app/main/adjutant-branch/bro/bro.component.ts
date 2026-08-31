import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-bro',
  templateUrl: './bro.component.html',
  styleUrls: ['./bro.component.scss']
})
export class BroComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  broList: any[] = [];
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'broNumber', 'battalion', 'document'];
  battalionsList:any[]=[];

  constructor(
    private service: AdjutantService, private _trgBattalion: TrgBattalionService, private sharedService: SharedService, private router: Router,
    private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBattalions()
  }

  ngAfterViewInit() {
    this.getBro("All");

  }

  getAllBattalions(){
    this._trgBattalion.getBattalionList().subscribe(
      res=>{
        if(res.status == "OK"){
          this.battalionsList = res.object;
          this.cdref.detectChanges();
        }
      }
    )
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

  bnSelected(e:any){
    const bn = e.target.value;
    this.getBro(bn)
  }

  openDoc(doc) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'BRO Document', url: doc[0].broDocument
      }
    });
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
