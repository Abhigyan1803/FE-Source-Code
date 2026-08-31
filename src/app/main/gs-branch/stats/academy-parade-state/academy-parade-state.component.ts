import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'ms-academy-parade-state',
  templateUrl: './academy-parade-state.component.html',
  styleUrls: ['./academy-parade-state.component.scss']
})
export class AcademyParadeStateComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList: any[] = [];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'description', 'document','action'];
  academyParadeState: any[] = [];



  constructor(private router: Router, private adminservice: AdminService, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, public dialog: MatDialog) { }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getAcademyParadeState()
  }



  getAcademyParadeState() {
    this.spinner.show();
    this.adminservice.getAcademyParadeState(2).subscribe(res => {
      console.log(res);

      if (res.status == "OK") {
        this.academyParadeState = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "=================");

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

  addAcademyParadeState() {
    this.router.navigate(['/main/gs-branch/stats/academy-parade-state/add-academy-parade']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  viewHistory(m) {
    this.router.navigate(['/main/gs-branch/stats/academy-parade-state/view-academy-parade'], { queryParams: { id: m.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAcademyParade(element) {
    if (this.router.url.includes('main/gs-branch'))
      this.router.navigate(['/main/gs-branch/stats/academy-parade-state/view-academy-parade'], { queryParams: { id: element.id } })
    if (this.router.url.includes('main/admin'))
      this.router.navigate(['/main/gs-branch/stats/academy-parade-state/view-academy-parade'], { queryParams: { id: element.id } })
  }

  openDoc(e) {
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "Academy Parade State Document", url: e.doc
        }
      }
    )
  }

  sortData($event){}


  // changeParadeStatus(e, d) {
  //   this.spinner.show();
  //   if (e.checked) {
  //     this.adminservice.changeParadeStatus(d.id, 1).subscribe(
  //       res => {
  //         console.log(res);

  //         if (res.status == '1') {
  //           this.adminservice.openSnackbar(res.msg)
  //           this.cdref.detectChanges();
  //           this.ngAfterViewInit();
  //         }
  //       },
  //       err => {
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  //   else {
  //     this.adminservice.changeParadeStatus(d.id, 0).subscribe(
  //       res => {
  //         console.log(res);

  //         if (res.status == '1') {

  //           this.adminservice.openSnackbar(res.msg)
  //           this.cdref.detectChanges();
  //           this.ngAfterViewInit();
  //         }
  //       },
  //       err => {
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  // }


}
