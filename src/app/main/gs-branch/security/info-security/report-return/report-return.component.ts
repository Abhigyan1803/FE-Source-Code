import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-report-return',
  templateUrl: './report-return.component.html',
  styleUrls: ['./report-return.component.scss']
})
export class ReportReturnComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','description','document',];  
  Territorial: any[] = [];



  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService, 
    private cdref:ChangeDetectorRef ,public dialog: MatDialog, private sharedService:SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getRETURN()
  }

  

  getRETURN(){
    this.spinner.show();
  this.adminservice.getRETURN(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.Territorial = res.object ;
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
  
  addReturns() {
    this.router.navigate(['/main/admin/GS-Branch/security/info-security/return/add-return']);
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

  viewReturns(element) {
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/admin/GS-Branch/security/info-security/return/view-return'],{queryParams:{id:element.id}})
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/security/info-security/return/view-return'],{queryParams:{id:element.id}})  
  }

  openDoc(e){
  
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"REPORTS/RETURN Document", url: e.file
        }
      }
      )
    }

  sortData(sort: Sort){

    const datalist = this.Territorial.slice();
    if (!sort.active || sort.direction === '') {
      this.Territorial = datalist;
      return;
    }
    this.Territorial = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.Territorial);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeRETURNAdvisiorStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.adminservice.changeRETURNAdvisiorStatus(d.id, 1).subscribe(
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
      this.adminservice.changeRETURNAdvisiorStatus(d.id, 0).subscribe(
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
