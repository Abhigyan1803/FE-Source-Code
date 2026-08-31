import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventDetailsDialogComponent } from 'app/main/shared-component/event-details-dialog/event-details-dialog.component';
import { AuthService } from 'app/service/auth-service/auth.service';

import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-aro',
  templateUrl: './aro.component.html',
  styleUrls: ['./aro.component.scss']
})
export class AroComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'document', 'date'];
  aroRecords: any[] = [];

  constructor(private service: HomePageService, private cdref: ChangeDetectorRef, private dialog: MatDialog, private authService:AuthService,
   private router:Router, private spinner: NgxSpinnerService, private sharedService: SharedService) { }

    @HostListener('window:popstate') popstate():any{
    this.router.navigate(['/pages'])
  }

  ngOnInit(): void {
    console.log("aroRecords",this.aroRecords);

    this.authService.getAROLogin.subscribe(
      res=>{
     
        if(!res){
          this.router.navigate(['/pages'])
        }else{
          this.getARO();

        }
      }
    )

  }
  // ngAfterViewInit() {
  //   this.getARO();
  // }


  getARO() {
    this.spinner.show()
    this.service.getARO(false).subscribe(res => {
      if (res.status == "1") {
        this.aroRecords = res.List
        console.log("aroRecords",this.aroRecords);
        this.dataSource = new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
        this.spinner.hide();

      } else {
        this.spinner.hide()

      }
    },
      err => {
        this.spinner.hide();
      }

    )
  }


  openDoc(e) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'ARO Document', url: e.document
      }
    });
  }

  sortData(sort: Sort) {

    const datalist = this.aroRecords.slice();
    if (!sort.active || sort.direction === '') {
      this.aroRecords = datalist;
      return;
    }

    this.aroRecords = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'date': return this.sharedService.compare(a.createdAt.toLowerCase(), b.createdAt.toLowerCase(), isAsc);

        default: return 0;

      }

    });
    this.dataSource = new MatTableDataSource(this.aroRecords);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
