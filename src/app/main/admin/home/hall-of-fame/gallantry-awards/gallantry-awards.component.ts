import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-gallantry-awards',
  templateUrl: './gallantry-awards.component.html',
  styleUrls: ['./gallantry-awards.component.scss']
})
export class GallantryAwardsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'image', 'name', 'regiment', 'battalion', 'awards', 'status', 'view'];
  fameList: any[] = []
  localID
  constructor(private router: Router, private service: AdminService, private cdref: ChangeDetectorRef,
    private sharedService:SharedService,
    private spinner: NgxSpinnerService,@Inject(LOCALE_ID) localID: string) {  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getHallOfFameGallantryAwardees()
  }

  getHallOfFameGallantryAwardees() {
    this.spinner.show()
    this.service.getHallOfFameGallantryAwardeesList(2).subscribe(
      res => {
        // console.log(res);
        
        if (res.status == "OK") {
          this.fameList = res.object
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
      },
      err => {
        this.service.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }

  changeHallOfFameGallantrytatus(e: any, id) {
    this.spinner.show();
    let status;
    if(e.checked){
      status = 1
    } else {
      status = 0
    }

      this.service.changeGallantryHallOfFameStatus(id, status).subscribe(
        res => {
          if (res.status == 'OK') {
            this.sharedService.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide();
          } else {
            this.sharedService.openSnackbar(res.message);
            this.spinner.hide();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.')
          this.spinner.hide();
        }
      )
    
  }



  noImg(e) {
    e.target.src = "assets/img/id.png"
  }

  addHallOfFame() {
    this.router.navigate(['/main/admin/home/hall-of-fame/gallantry-awardees/add-gallantry-awardee'])
  }

  viewHallOfFame(e) {
    this.router.navigate(['/main/admin/home/hall-of-fame/gallantry-awardees/view-gallantry-awardee'], { queryParams: { id: e.id } })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.fameList.slice();
    if (!sort.active || sort.direction === '') {
      this.fameList = datalist;
      return;
    }
    this.fameList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        // case 'date': return this.sharedService.compare(a.eventDate, b.eventDate, isAsc);
      
        case 'name': return this.sharedService.compare(a.officerRank.toLowerCase() + a.officerName.toLowerCase(), b.officerRank.toLowerCase()+b.officerName.toLowerCase(), isAsc);
        case 'regiment': return this.sharedService.compare(a.officerRegiment.toLowerCase(), b.officerRegiment.toLowerCase(), isAsc);
        case 'battalion': return this.sharedService.compare(a.officerBattalion.toLowerCase(), b.officerBattalion.toLowerCase(), isAsc);
        case 'awards': return this.sharedService.compare(a.awardMedal.toLowerCase() + a.yearAwarded, b.awardMedal.toLowerCase() + b.yearAwarded, isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.fameList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
