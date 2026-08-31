import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';


@Component({
  selector: 'ms-ima-blogs',
  templateUrl: './ima-blogs.component.html',
  styleUrls: ['./ima-blogs.component.scss']
})
export class ImaBlogsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number', 'title', 'category', 'author', 'minutes', 'document', 'status', 'action'];
  imablogsList: any[] = [];
  userName: string;
  resultsLength: number;
  EDDetails;
  isLoggedIn: boolean;
  bid=0

  constructor(private router: Router, private service: AdminService, private sharedService: SharedService,
    private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private dialog: MatDialog) {
    this.userName = localStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.EDDetails = JSON.parse(localStorage.getItem('loginResponse')).object
    console.log("user details: ",this.EDDetails);
    this.bid=this.EDDetails.battalion.id
    console.log("user this.bid: ",this.bid);

  }


  noImg(e) {
    e.target.src = "assets/img/logo_red.png"
  }

  ngAfterViewInit() {
    this.getIMABlogList()
  }

  getIMABlogList() {


    merge(/* this.sort.sortChange,  */this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show()
          return this.service.getIMABlogList(2, this.paginator.pageIndex, this.paginator.pageSize,this.bid)
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
          this.imablogsList = data.object.blogList;
          if (data.object.blogList.length > 0) {
            this.imablogsList = data.object.blogList;
          } else {
            this.imablogsList = [];
          }
          this.cdref.detectChanges();
        }
        else {
          this.imablogsList = []
        }
        this.spinner.hide()

      });



    // this.spinner.show();
    // this.service.getIMABlogList(2,this.paginator.pageIndex,this.paginator.pageSize).subscribe(
    //   res => {
    //     console.log(res);

    //     if (res.status == "OK") {
    //       this.imablogsList = res.object
    //       this.dataSource = new MatTableDataSource(res.object);
    //       this.dataSource.sort = this.sort;
    //       this.dataSource.paginator = this.paginator;
    //       this.cdref.detectChanges();
    //       this.spinner.hide();
    //     } else {
    //       this.spinner.hide();
    //       this.service.openSnackbar(res.message);
    //     }

    //   },
    //   err => {
    //     this.service.openSnackbar('Error Occured.')
    //     this.spinner.hide();
    //   }
    // )
  }


  openDoc(element) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: element.docs
      }
    });
  }

  changeBlogStatus(e: any, id) {
    this.spinner.show();
    let status
    if (e.checked) {
      status = 1
    } else {
      status = 0
    }


    this.service.changeIMABlogStatus(id, status).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          // this.ngAfterViewInit();

          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message)

        }
      },
      err => {

        this.spinner.hide();
        this.service.openSnackbar('Error Occured.')

      }
    )

  }


  addBlog() {
    const url = this.router.url
    this.router.navigate([`${url}/add-blog`])
  }

  viewBlog(e) {
    const url = this.router.url
    this.router.navigate([`${url}/view-blog`], { queryParams: { id: e.id } })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sortData(sort: Sort) {
    const datalist = this.imablogsList.slice();
    if (!sort.active || sort.direction === '') {
      this.imablogsList = datalist;
      return;
    }
    this.imablogsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return this.sharedService.compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        case 'category': return this.sharedService.compare(a.category.toLowerCase(), b.category.toLowerCase(), isAsc);
        // case 'author': return this.sharedService.compare(a.author.toLowerCase(), b.author.toLowerCase(), isAsc);
        // case 'minutes': return this.sharedService.compare(a.minutesOfReading.toLowerCase(), b.minutesOfReading.toLowerCase(), isAsc);

        // case 'phone': return this.sharedService.compare(a.phoneNumber, b.phoneNumber, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.imablogsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
