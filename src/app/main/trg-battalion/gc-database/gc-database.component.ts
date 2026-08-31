import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { SharedService } from 'app/service/shared.service';
import {  Sort } from '@angular/material/sort';


@Component({
  selector: 'ms-gc-database',
  templateUrl: './gc-database.component.html',
  styleUrls: ['./gc-database.component.scss']
})
export class GcDatabaseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  gcdatabase:any;
  displayedColumns: string[] = ['number', 'name', /*'fatherName',*/ 'academyNo', 'battalion', 'company', 'seasonTerm', 'term', 'status','view' ];
  userDetails
  bnId


  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private router: Router,private _trgBattalion:TrgBattalionService ,private dialog:MatDialog,  private sharedService:SharedService) {

      this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
 

     }

  ngOnInit(): void {
  }

  
  ngAfterViewInit() {
    this.getCadetsList();
  }
  getCadetsList() {
    this.spinner.show()
    // var battalions:any[]=[];
		const name = JSON.parse(localStorage.getItem('battalionDetails')).shortName;
    this.bnId = this.userDetails.battalionId;
   
 		console.log('trg battalion gc database',name);
		
     this._trgBattalion.getAllCadetsList(name).subscribe(
      res => {
        console.log(res);
        if (res.status == "OK") {

          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();

        } else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide()
        this._trgBattalion.openSnackbar("Some Error Occured.");
      }
    )
  }
  noImg(e: any) {
    e.target.src = "assets/img/default_cadet_img.jpg"
  }

  viewCadet(id) {
    this.router.navigate(['/main/trg-battalion/gc-database/view-cadet'], { queryParams: { id: id } })
  }


  sortData(sort: Sort) {
    const datalist = this.gcdatabase.slice();
    if (!sort.active || sort.direction === '') {
      this.gcdatabase = datalist;
      return;
    }
    this.gcdatabase = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'createdAt': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);
        case 'academyNo': return this.sharedService.compare(a.academyNo, b.academyNo, isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.gcdatabase);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
