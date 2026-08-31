import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-counsellors-keren',
  templateUrl: './counsellors-keren.component.html',
  styleUrls: ['./counsellors-keren.component.scss']
})
export class CounsellorsKerenComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'rankName','name','mobileNumber','action'];  
  Keren: any[] = [];

  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService, 
    private cdref:ChangeDetectorRef , private sharedService:SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getKeren()
  }

  

  battalionId
  companyId
  status
  getKeren(){
    this.spinner.show();
    this.battalionId =4
    this.companyId =15
    this.status =2
    this.adminservice.getCounsellor(this.battalionId,this.companyId,this.status).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.Keren = res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
      this.cdref.detectChanges();
console.log(res,"=================");

    }
    else{
      this.spinner.hide()
      this.adminservice.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    this.adminservice.openSnackbar("Some Error Occured.");
  }
  
  )
  }
  
  addKEREN() {
    this.router.navigate(['/main/academic-depart/counsellors/bhbn/counsellors-keren/add-keren']);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewKEREN(element) {
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['/main/academic-depart/counsellors/bhbn/counsellors-keren/view-keren'],{queryParams:{id:element.id}})
    // if(this.router.url.includes('main/academic-depart'))
    // this.router.navigate(['/main/academic-depart/counsellors/cabn/counsellors-hajipir/view-hajipir'],{queryParams:{id:element.id}})  
  }



  sortData(sort: Sort){
    const datalist = this.Keren.slice();
    if (!sort.active || sort.direction === '') {
      this.Keren = datalist;
      return;
    }
    this.Keren = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.Keren);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // changeITSECStatus(e, d) {
  //   this.spinner.show();
  //   if (e.checked) {
  //     this.adminservice.changeItSecStatus(d.id, 1).subscribe(
  //       res => {
  //         console.log(res);
          
  //         if (res.status == 'OK') {
  //           this.adminservice.openSnackbar(res.message)
  //           this.cdref.detectChanges();
  //           // this.ngAfterViewInit();
  //           this.spinner.hide()

  //         }
  //         else {
  //           this.spinner.hide()
  //           this.adminservice.openSnackbar(res.message)
  //         }
  //       },
  //       err => {
  //         this.spinner.hide();
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  //   else {
  //     this.adminservice.changeItSecStatus(d.id, 0).subscribe(
  //       res => {
  //         console.log(res);
            
  //         if (res.status == 'OK') {
            
  //           this.adminservice.openSnackbar(res.message)
  //           this.cdref.detectChanges();
  //           // this.ngAfterViewInit();
  //           this.spinner.hide()
  //         }
  //         else {
  //           this.spinner.hide()
  //           this.adminservice.openSnackbar(res.message)
  //         }
  //       },
  //       err => {
  //         this.spinner.hide()
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  // }


 

}
