import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-recommened-book',
  templateUrl: './recommened-book.component.html',
  styleUrls: ['./recommened-book.component.scss']
})
export class RecommenedBookComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource :any;
  displayedColumns: string[] = ['number','bookName','bookGenre', 'description','authorName','status','action'];
  greybooksList:any[] = [];

  constructor(private router:Router, private service:AdminService,  private sharedService:SharedService,
    private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAllRecommendedBook()
  }

  getAllRecommendedBook(){
    this.spinner.show();
    this.service.getAllRecommendedBook(2).subscribe(
      res =>{
        console.log(res);
        
        if(res.status == "OK"){
          this.greybooksList = res.object
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        this.spinner.hide();   
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
       
      },
      err =>{
        this.service.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }



  changeRecommendedbookStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeRecommendedbookStatus(d.id, 1).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()

          }
          else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
    else {
      this.service.changeRecommendedbookStatus(d.id, 0).subscribe(
        res => {
          console.log(res);
            
          if (res.status == 'OK') {
            
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()
          }
          else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }

  
  
  addRecommendedbook(){
    this.router.navigate(['/main/admin/home/book-list/add-book-list'])
  }

  viewRecommendedbook(e){
    this.router.navigate(['/main/admin/home/book-list/view-book-list'], {queryParams:{id:e.id}})
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sortData(sort: Sort) {
    const datalist = this.greybooksList.slice();
    if (!sort.active || sort.direction === '') {
      this.greybooksList = datalist;
      return;
    }
    this.greybooksList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'bookName': return this.sharedService.compare(a.bookName.toLowerCase(), b.bookName.toLowerCase(), isAsc);
        case 'bookGenre': return this.sharedService.compare(a.bookGenre.toLowerCase(), b.bookGenre.toLowerCase(), isAsc);  
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        case 'authorName': return this.sharedService.compare(a.authorName.toLowerCase(), b.authorName.toLowerCase(), isAsc);
        
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.greybooksList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

