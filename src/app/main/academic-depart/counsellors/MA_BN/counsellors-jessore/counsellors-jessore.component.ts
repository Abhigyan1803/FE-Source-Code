import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-counsellors-jessore',
  templateUrl: './counsellors-jessore.component.html',
  styleUrls: ['./counsellors-jessore.component.scss']
})
export class CounsellorsJessoreComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number','rankName', 'name','mobile','action'];  
  Jessore: any[] = [];

  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService, 
    private cdref:ChangeDetectorRef , private sharedService:SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getJessore()
  }

  

  battalionId
  companyId
  status
  getJessore(){
    this.spinner.show();
    this.battalionId =1
    this.companyId =11
    this.status =2
    this.adminservice.getCounsellor(this.battalionId,this.companyId,this.status).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.Jessore = res.object ;
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
  
  addJESSORE() {
    this.router.navigate(['/main/academic-depart/counsellors/mabn/counsellors-jessore/add-jessore']);
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewJESSORE(element) {
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['/main/academic-depart/counsellors/mabn/counsellors-jessore/view-jessore'],{queryParams:{id:element.id}})
  //   if(this.router.url.includes('main/admin'))
  //   this.router.navigate(['/main/admin/GS-Branch/itcommunication/charter/it-sec/view-it-sec'],{queryParams:{id:element.id}})  
   }



  sortData(sort: Sort){

    const datalist = this.Jessore.slice();
    if (!sort.active || sort.direction === '') {
      this.Jessore = datalist;
      return;
    }
    this.Jessore = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.Jessore);
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