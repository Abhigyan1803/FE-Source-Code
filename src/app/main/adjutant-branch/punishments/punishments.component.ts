import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { GcDeleteComponent } from 'app/main/admin/trg-battalion-management/gc-database/gc-delete/gc-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'ms-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss']
})
export class PunishmentsComponent implements OnInit {

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  term: string = '';
  termId: any = '';
  terms: any[] = []
  battalionList: any[] = [];
  companyList: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  cadetList: any[] = [];
  dataSource: any;
  resultsLength: number;
  displayedColumns = ['sNo', 'serviceId', 'rank', 'name', 'term', 'course', 'battalion', 'pointers', 'edit'];
  constructor(private EDossierService: EDossierService, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private adjutantService: AdjutantService, private adminService: AdminService,
    private sharedService: SharedService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTerms();
    this.getBattalionList();
  }

  ngAfterViewInit() {
    this.getCadetsList();
  }

  getTerms() {
    this.adminService.getTerms().subscribe(
      res => {
        console.log("TERM: ", res);
        if (res.status == "1") {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }

  getBattalionList() {
    this.sharedService.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.battalionList = res.object
          this.cdref.detectChanges();
          this.spinner.hide()
        } else {
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      }
    )
  }
  // deletePunishment(datasend: any) {
  //   const dialogRef = this.dialog.open(GcDeleteComponent, {
  //     data: {
  //       message: 'Are you sure want to delete?',
  //       buttonText: {
  //         ok: 'Save',
  //         cancel: 'No'
  //       }
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       console.log("delete", datasend);
  //       let data1 = {
  //         id: datasend.id,
  //         status: 2
  //       }
  //       console.log(data1)
  //       this.adjutantService.editGC_Punishment(data1).subscribe(
  //         res => {
  //           if (res.status == 'OK') {
  //             this.sharedService.openSnackbar(res.message)
  //             this.cdref.detectChanges();
  //             this.ngAfterViewInit();
  //           }
  //         },
  //         err => {
  //           this.sharedService.openSnackbar('Error Occured.')
  //         }
  //       )
  //       this.spinner.hide();
  //     }

  //   })
  // }

  battalionSelected(e: any) {
    this.companyList = [];
    this.company = '';
    this.companyId = '';


    this.battalionList.find(
      (el: any) => {
        if (el.id == e) {
          this.battalion = el.shortName;
        }
      }
    )
    // this.battalion = battalion.shortName;


    // console.log(this.battalion);

    this.spinner.show();
    this.adminService.getCompanyList(e).subscribe(
      res => {
        console.log(res)
        if (res.status == 'OK') {
          this.companyList = res.object;
          this.cdref.detectChanges();
          this.spinner.hide();

        } else {
          this.sharedService.openSnackbar(res.message)
          this.spinner.hide();
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }

  companySelected(e: any) {
    this.companyList.find(
      (el: any) => {
        if (el.id == e) {
          this.company = el.name
          // return;
        }
      }
    )
    console.log(this.company);

  }

  search() {
    if (this.serviceId) {
      this.getGCByImaNumber(this.serviceId)
    } else if (this.battalion || this.company || this.termId) {

      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
      this.getCadetsList()
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.", 7)
    }
  }


  clearSearch() {
    if (this.battalion || this.company || this.serviceId || this.termId) {
      this.companyList = [];
      this.company = '';
      this.battalion = '';
      this.serviceId = '';
      this.battalionId = '';
      this.companyId = '';
      this.termId = '';
      this.getCadetsList();
    }
  }





  getCadetsList() {

    merge(/* this.sort.sortChange,  */this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show()
          return this.adjutantService.getGC_PunishmentList(this.paginator.pageIndex, this.paginator.pageSize, this.termId, this.battalion, this.company, this.serviceId)
        })
        , map(data => {
          this.resultsLength = data.object.totalRecords;
          console.log("DATA: ", data);
          return data;
        }),
        catchError(() => {
          console.log('===========Error here============')
          this.spinner.hide()
          return observableOf([]);
          // return null;
        })
      ).subscribe(data => {
        // console.log("DATA RECIEVED: ", data)
        if (data.status == 'OK') {
          this.resultsLength = data.object.totalRecords;
          this.cadetList = data.object.cadetFilterPayload;
          if (data.object.cadetFilterPayload.length > 0) {
            this.cadetList = data.object.cadetFilterPayload;
          } else {
            this.cadetList = [];
          }
          this.cdref.detectChanges();
        }
        else {
          this.cadetList = []
        }
        this.spinner.hide()
        // var scrollElem = document.querySelector('#orders');
        // scrollElem.scrollIntoView();
      });


  }

  getGCByImaNumber(serviceId) {

    merge(/* this.sort.sortChange,  */this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show()
          return this.adjutantService.getCadetByIMA_No(serviceId)
        })
        , map(data => {
          this.resultsLength = data.object.totalRecords;
          // console.log("DATA: ",data);
          return data;
        }),
        catchError(() => {
          console.log('===========Error here============')
          this.spinner.hide()
          return observableOf([]);
          // return null;
        })
      ).subscribe(data => {
        // console.log("DATA RECIEVED: ", data)
        if (data.status == 'OK') {
          this.resultsLength = data.object.totalRecords;
          this.cadetList = data.object.cadetFilterPayload;
          if (data.object.cadetFilterPayload.length > 0) {
            this.cadetList = data.object.cadetFilterPayload;
          } else {
            this.cadetList = [];
          }
          this.cdref.detectChanges();
        }
        else {
          this.cadetList = []
        }
        this.spinner.hide()
        // var scrollElem = document.querySelector('#orders');
        // scrollElem.scrollIntoView();
      });

  }

  getRank(n) {
    let rank
    if (n == "India") {
      rank = "GC";
    } else {
      rank = "FGC";
    }
    return rank;
  }


  viewPunishments(element) {
    this.EDossierService.setCadetObj(element)
    this.router.navigate(['/main/adjutant-branch/punishments/view-gc-punishments'])
  }

}
