import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventDetailsDialogComponent } from 'app/main/shared-component/event-details-dialog/event-details-dialog.component';
import { HomePageService } from 'app/service/home/home-page.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-cyberpolicy',
  templateUrl: './cyberpolicy.component.html',
  styleUrls: ['./cyberpolicy.component.scss']
})
export class CyberpolicyComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource :any;
  displayedColumns: string[] = ['number', 'name', 'document','date'];
  
  cyberPolicies:any[]=[];

  constructor(private router: Router, private service: HomePageService, private dialog: MatDialog, 
    private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService, private sharedService:SharedService ) { }

  ngOnInit(): void {
		// document.getElementById('foot-id').style.position='relative';

  }

  ngAfterViewInit(){

    this.getCyberPolicies();   
    // setInterval(()=>{
    // this.getCyberPolicies();
    // },60000)
  }




  getCyberPolicies(){
    this.spinner.show();

   this.service.getCyberPolicies().subscribe(
     res=>{

      console.log(res);
       if(res.status=="OK"){

        this.cyberPolicies = res.object
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
        this.spinner.hide();

      } else {
        this.spinner.hide();
        this.sharedService.openSnackbar(res.message)
      }

     },
     err=>{
       this.spinner.hide()
       this.sharedService.openSnackbar("Error Occured");
     },
     
   ) 
  }


  openCyberPolicy(c){
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'Cyber Policy' ,url: c.link
      }
    });
  }


   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  sortData(sort: Sort) {
    const datalist = this.cyberPolicies.slice();
    if (!sort.active || sort.direction === '') {
      this.cyberPolicies = datalist;
      return;
    }
    this.cyberPolicies = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.tabName.toLowerCase(), b.tabName.toLowerCase(), isAsc);  
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.cyberPolicies);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

