import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
// import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-e-book-list',
  templateUrl: './e-book-list.component.html',
  styleUrls: ['./e-book-list.component.scss']
})
export class EBookListComponent implements OnInit {
  eBookList:any[]=[];
  dataSource:any=[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['number','name','desc','visit'];

  constructor( private router:Router, private service:AdminService,  
    private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService,) { }

  ngOnInit(): void {
    console.log('e-book works');
    
  }
  ngAfterViewInit(){
    this.getEbookList();
  }

   //get e-book list
   getEbookList(): void{
    console.log('get fn called');
    
    this.service.getEbookList().subscribe(
      res=>{
        this.spinner.show();
        console.log(res);
        if(res.status == "OK"){
          this.eBookList = res.object;
          this.dataSource= new MatTableDataSource(res.object);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else{
          this.service.openSnackbar(res.message)
          this.spinner.hide();
        }
        
      },
      err=>{
        this.spinner.hide()
        this.service.openSnackbar('Error Occured.')
      }
    )
  }

  // visitURL(l){
  //   window.open(l.ebookUrl,'_blank')
  // }

}
