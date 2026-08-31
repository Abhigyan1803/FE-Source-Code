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
import { AdjutantService } from 'app/service/adjutant/adjutant.service';


@Component({
  selector: 'ms-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss']
})
export class SheduleComponent implements OnInit {

   
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'title','document','status','action'];  
  Schedule: any[] = [];



  constructor(private router: Router, private service: AdjutantService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getSCHEDULE()
  }

  

  getSCHEDULE(){
    this.spinner.show();
  this.service.getSCHEDULE(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.Schedule=res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
      this.cdref.detectChanges();
console.log(res,"=================");

    }
    else{
      this.spinner.hide()
      this.service.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    this.service.openSnackbar("Some Error Occured.");
  }
  
  )
  }
  
  addSCHEDULE() {
    this.router.navigate(['/main/adjutant-branch/general-instruction/drill-competition/schedule/add-schedule']);
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

  viewSCHEDULE(element) {
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule/view-schedule'],{queryParams:{id:element.id}})  

    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule/view-schedule'],{queryParams:{id:element.id}})
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule/view-schedule'],{queryParams:{id:element.id}})  
  }


  sortData(sort: Sort) {
    const datalist = this.Schedule.slice();
    if (!sort.active || sort.direction === '') {
      this.Schedule = datalist;
      return;
    }
    this.Schedule = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.Schedule);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDoc(e){
  
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"Schedule Document", url: e.document
        }
      }
      )
    }

    
    changeSCHEDULEStatus(e, d) {
      this.spinner.show();
      if (e.checked) {
        this.service.orderSCHEDULEStatus(d.id, 1).subscribe(
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
        this.service.orderSCHEDULEStatus(d.id, 0).subscribe(
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
  
  


}
