import { GcService } from './../../../service/gc/gc.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'createdAt', 'document'];
  PCHT: any[] = [];
  type: string;

  constructor(
    private router: Router, private route: ActivatedRoute, private adminservice: AdminService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService,
    private GcService: GcService) {
    this.route.params.subscribe((params) => {
      this.type = params.type;
      console.log("this.type",this.type);
      this.ngAfterViewInit();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getClubss()
  }

  getClubss() {
    this.spinner.show();
    this.GcService.getClubs('ACDCLUBS', this.type, 1).subscribe(res => {
      console.log("CLUBS: ",res);

      if (res.status == "OK") {
        this.PCHT = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
        // console.log(res, "=================");

      }
      else {
        this.spinner.hide()
        this.adminservice.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.");
      }

    )
  }


  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  sortData(sort: Sort) {

    const datalist = this.PCHT.slice();
    if (!sort.active || sort.direction === '') {
      this.PCHT = datalist;
      return;
    }
    this.PCHT = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {

        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'createdAt': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);
        case 'type': return this.sharedService.compare(a.type.toLowerCase(), b.type.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.PCHT);
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




  openDoc(e) {

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "View Document", url: e.document
        }
      }
    )
  }



}
