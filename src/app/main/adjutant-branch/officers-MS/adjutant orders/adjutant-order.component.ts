import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'adj-aro',
  templateUrl: './adjutant-order.component.html',
  styleUrls: ['./adjutant-order.component.scss']
})
export class AdjutantOrderComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  aoList:any[]=[];
  dataSource :any;
  displayedColumns: string[] = ['number','name','description','createdAt','for gc','document','status','action'];  

  constructor(private service: AdjutantService,private router: Router, private cdref: ChangeDetectorRef , private sharedService:SharedService, 
    private spinner:NgxSpinnerService, private dialog:MatDialog){}

  ngOnInit(): void {
    // this.getAdjutantList()
    this.getAdjutantOrder()
  }

  ngAfterViewInit() {
    // this.getAllTrgDocs();
  }

  getAdjutantOrder(){
    this.spinner.show();
  this.service.getAdjutantOrder(1,2).subscribe(
    res =>{
      if(res.status == "1"){
        this.aoList = res.List;
        this.dataSource= new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      console.log(res);
      this.spinner.hide()
    },
    err =>{
      this.service.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}

openDoc(e){
this.dialog.open(DialogComponent,
  {
    width: '1250px', height: '650px',
    data: {
      type: 'document',title:"Adjutant Order Document", url: e.document
    }
  }
  )
}

// changeorderStatus(e:any,id){}

orderStatus(e, d) {
  this.spinner.show();
  
  if (e.checked) {
    this.service.orderStatus(d.id, 1).subscribe(
      res => {
        console.log(res);
        
        if (res.status == '1') {
          this.service.openSnackbar(res.msg)
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
  else {
    this.service.orderStatus(d.id, 0).subscribe(
      res => {
        console.log(res);
          
        if (res.status == '1') {
          
          this.service.openSnackbar(res.msg)
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
  
addOrder() {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/adjutant-orders/add-order']);
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/adjutant-order/add-order']);
}

viewOrder(ob) {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/adjutant-orders/view-order'],{queryParams:{id:ob.id}});
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/adjutant-order/view-order'],{queryParams:{id:ob.id}});
}




applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


sortData(sort: Sort) {
  const datalist = this.aoList.slice();
  if (!sort.active || sort.direction === '') {
    this.aoList = datalist;
    return;
  }
  this.aoList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);  
      default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.aoList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}