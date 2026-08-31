import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-other-security',
  templateUrl: './other-security.component.html',
  styleUrls: ['./other-security.component.scss']
})
export class OtherSecurityComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','description','document','action'];  
  OtherSecurity: any[] = [];

  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService, 
    private cdref:ChangeDetectorRef ,public dialog: MatDialog, private sharedService:SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getOtherSecurity()
  }

  

  getOtherSecurity(){
    this.spinner.show();
  this.adminservice.getOtherSecurity(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.OtherSecurity = res.object ;
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
  
  addOtherSecurity() {
    this.router.navigate(['/main/gs-branch/security/apparatus/other-security/add-other-security']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewOtherSecurity(element) {
    if(this.router.url.includes('main/gs-branch'))
    this.router.navigate(['/main/gs-branch/security/apparatus/other-security/view-other-security'],{queryParams:{id:element.id}})
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/gs-branch/security/apparatus/other-security/view-other-security'],{queryParams:{id:element.id}})  
  }

  openDoc(e){
  
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"Other Security Document", url: e.file
        }
      }
      )
    }

  sortData(sort: Sort){

    const datalist = this.OtherSecurity.slice();
    if (!sort.active || sort.direction === '') {
      this.OtherSecurity = datalist;
      return;
    }
    this.OtherSecurity = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.OtherSecurity);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeOtherSecurityStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.adminservice.changeOtherSecurityStatus(d.id, 1).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()

          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
    else {
      this.adminservice.changeOtherSecurityStatus(d.id, 0).subscribe(
        res => {
          console.log(res);
            
          if (res.status == 'OK') {
            
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()
          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }


 

}
