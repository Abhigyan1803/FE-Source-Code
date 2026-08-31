import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomePageService } from 'app/service/home/home-page.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../service/shared.service'

@Component({
  selector: 'ms-greybook',
  templateUrl: './greybook.component.html',
  styleUrls: ['./greybook.component.scss']
})
export class GreybookComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'rank', 'name', 'department', 'post', 'email', 'address', 'phone'];
  greybookrec: any[] = [];

  constructor(private service: HomePageService, private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService, private sharedService: SharedService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getGreybookrec()
  }

  getGreybookrec() {
    this.spinner.show();
    this.service.getGreybookrec().subscribe(res => {
      console.log(res);
      if (res.status == "OK") {

        this.greybookrec = res.object
        
        this.dataSource = new MatTableDataSource(res.object);
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

  sortData(sort: Sort) {

    const datalist = this.greybookrec.slice();
    if (!sort.active || sort.direction === '') {
      this.greybookrec = datalist;
      return;
    }

    this.greybookrec = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'rank': return this.sharedService.compare(a.userRank.toLowerCase(), b.userRank.toLowerCase(), isAsc);
        case 'department': return this.sharedService.compare(a.department.toLowerCase(), b.department.toLowerCase(), isAsc);
        case 'post': return this.sharedService.compare(a.post.toLowerCase(), b.post.toLowerCase(), isAsc);
        case 'email': return this.sharedService.compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
        case 'phone': return this.sharedService.compare(a.phoneNumber, b.phoneNumber, isAsc);
        default: return 0;

      }
    });
    this.dataSource = new MatTableDataSource(this.greybookrec);
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
