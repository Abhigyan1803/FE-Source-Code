import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {GcDeleteComponent} from './gc-delete/gc-delete.component'
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

@Component({
  selector: 'ms-gc-database',
  templateUrl: './gc-database.component.html',
  styleUrls: ['./gc-database.component.scss']
})
export class GcDatabaseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  displayedColumns: string[] = ['number', 'name',
    //fatherName
    'academyNo', 'bnCoy', 'seasonTerm', 'term','date', 'status', 'action','delete'];
  resultsLength: number = 0;
  gcList: any[] = [];
  cadetList: any[] = [];
  termId='';

  battalionList: [] = [];
  companyList: any[] = [];
  terms: any[] = [];

  battalion: any;
  company: any;
  serviceId: any;

  battalionId: any = '';
  companyId: any = '';

  userDetails:any;
  bnDetails:any;
  coyDetails:any;


  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private sharedService: SharedService,
    private router: Router, private service: AdminService, private dialog: MatDialog) { 
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
      // console.log("USER DETAILS: ",this.userDetails);

      if(this.userDetails.battalion){
        this.bnDetails = this.userDetails.battalion
        this.battalion = this.userDetails.battalion.shortName
        this.battalionId = this.userDetails.battalion.id
        this.battalionSelected(this.userDetails.battalion.id)

      }

      if(this.userDetails.company){

        this.coyDetails = this.userDetails.company
        this.company = this.userDetails.company.name
        this.companyId = this.userDetails.company.id

      }



    }

  ngOnInit(): void {
    this.getBattalionList();
    this.getTerms();
    
  }

  ngAfterViewInit() {
    this.getCadetsList();
  }

  openDialog(cadet:any) {
    const dialogRef = this.dialog.open(GcDeleteComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        
          console.log("delete",cadet.id);
          this.service.changeCadetStatus(cadet.id, 2).subscribe(
           res => {
             if (res.status == 'OK') {
               this.service.openSnackbar("Cadet delete successfully")
               this.cdref.detectChanges();
               this.ngAfterViewInit();
             }
           },
           err => {
             this.service.openSnackbar('Error Occured.')
           }
         )
         this.spinner.hide();
       }
      
    })
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

  getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }
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
    this.service.getCompanyList(e).subscribe(
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
    // if(this.serviceId){
    //   this.getGCByImaNumber(this.serviceId)
    // } else if (this.battalion || this.company || this.termId) {

    //   this.paginator.pageIndex = 0;
    //   this.paginator.pageSize = 10;
    //   this.getCadetsList()
    // } else {
    //   this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.", 7)
    // }
  
    if (this.battalion || this.company || this.termId) {

      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 50;
      this.getCadetsList()
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("No Search Filters are Added.", 7)
    }
  
  }


  clearSearch() {
    if(this.router.url.includes('/main/admin/trg-battalion/gc-database')){

      if (this.battalion || this.company || this.termId) {
        this.companyList = [];
        this.company = '';
        this.battalion = '';
        this.serviceId = '';
        this.battalionId = '';
        this.companyId = '';
        this.termId='';
        this.getCadetsList();
      }
    } else if(this.router.url.includes('/main/trg-battalion/gc-database')) {
      if(this.bnDetails && !this.coyDetails){
        if ( this.company || this.termId) {
          this.company = '';
          this.serviceId = '';
          this.companyId = '';
          this.termId='';
          this.getCadetsList();
        }
      } else if(this.coyDetails){
        if (this.termId) {
          this.termId='';
          this.getCadetsList();
        }
      }
    }
  }






  getCadetsList() {

    merge(/* this.sort.sortChange,  */this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show()
          return this.service.getAllCadetsList("All", this.paginator.pageIndex, this.paginator.pageSize, this.battalion, this.company, this.termId)
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
        console.log("DATA RECIEVED: ", data)
        if (data.status == 'OK') {
          this.resultsLength = data.object.totalRecords;
          this.cadetList = data.object.cadetList;
          this.cadetList = data.object.cadetList.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          if (data.object.cadetList.length > 0) {
            this.cadetList = data.object.cadetList;
            //////
           for(let i=0;i<this.cadetList.length;i++){
             if(this.cadetList[i].term==7){
               this.cadetList[i].termName="Tech II";
             }
           }
            //////

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





    // this.spinner.show()
    // this.service.getAllCadetsList("All",this.paginator.pageIndex, this.paginator.pageSize).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.status == "OK") {
    //       this.gcList = res.object;
    //       this.dataSource = new MatTableDataSource(res.object);
    //       this.dataSource.sort = this.sort;
    //       this.dataSource.paginator = this.paginator;
    //       this.cdref.detectChanges();
    //       this.spinner.hide();

    //     } else {
    //       this.spinner.hide();
    //       this.service.openSnackbar(res.message)
    //     }
    //   },
    //   err => {
    //     this.spinner.hide()
    //     this.service.openSnackbar("Some Error Occured.");
    //   }
    // )

  }


  noImg(e: any) {
    e.target.src = "assets/img/default_cadet_img.jpg"
  }

  changeCadetStatus(e: any, c) {

    this.spinner.show();
    if (e.checked) {
      this.service.changeCadetStatus(c.id, 1).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.');
        }
      )
      this.spinner.hide();
    }
    else {

      this.service.changeCadetStatus(c.id, 0).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err => {
          this.service.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }

  }

  deleteCadet(cadet:any){
     console.log("delete",cadet.id);
     this.service.changeCadetStatus(cadet.id, 2).subscribe(
      res => {
        if (res.status == 'OK') {
          this.service.openSnackbar("Cadet delete successfully")
          this.cdref.detectChanges();
          this.ngAfterViewInit();
        }
      },
      err => {
        this.service.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }

  addCadet() {
    if(this.router.url.includes('/main/admin/trg-battalion/gc-database')){
      this.router.navigate(['/main/admin/trg-battalion/gc-database/add-cadet'])
    } else if(this.router.url.includes('/main/trg-battalion/gc-database')){
      this.router.navigate(['/main/trg-battalion/gc-database/add-cadet'])
    }
  }

  viewCadet(c) {
    if(this.router.url.includes('/main/admin/trg-battalion/gc-database')){
    this.router.navigate(['/main/admin/trg-battalion/gc-database/view-cadet'], { queryParams: { id: c.id } })
      
    } else if(this.router.url.includes('/main/trg-battalion/gc-database')){
      this.router.navigate(['/main/trg-battalion/gc-database/view-cadet'], { queryParams: { id: c.id } })

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

    // const datalist = this.gcList.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.gcList = datalist;
    //   return;
    // }

    // this.gcList = datalist.sort((a: any, b: any) => {
    //   const isAsc = this.sort.direction === 'asc';
    //   switch (this.sort.active) {

    //     case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
    //     case 'academyNo': return this.sharedService.compare(a.academyNo.toLowerCase(), b.academyNo.toLowerCase(), isAsc);
    //     case 'battalion': return this.sharedService.compare(a.battalian.toLowerCase(), b.battalian.toLowerCase(), isAsc);
    //     case 'company': return this.sharedService.compare(a.company.toLowerCase(), b.company.toLowerCase(), isAsc);
    //     case 'seasonTerm': return this.sharedService.compare(a.termSession.toLowerCase(), b.termSession.toLowerCase(), isAsc);
    //     case 'term': return this.sharedService.compare(a.term, b.term, isAsc);

    //     default: return 0;

    //   }

    // });
    // this.dataSource = new MatTableDataSource(this.gcList);
    // this.dataSource.paginator = this.paginator;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

  }

}
