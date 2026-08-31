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
  selector: 'ms-complaint-requirement',
  templateUrl: './complaint-requirement.component.html',
  styleUrls: ['./complaint-requirement.component.scss']
})
export class ComplaintRequirementComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number','title','requestType','requestNature','document','requestStatus','remarks','action'];  
  Complaints: any[] = [];


  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getComplaints();
  }

  

  getComplaints(){
    this.spinner.show();
  this.adminservice.getComplaints(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.Complaints=res.object ;
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
  
  addComplaints() {
    this.router.navigate(['/main/trg-team/it/add-complaints']);
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

  viewComplaints(element) {
    this.router.navigate(['/main/trg-team/it/view-complaints'],{queryParams:{id:element.id}})  

    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['/main/trg-team/it/view-complaints'],{queryParams:{id:element.id}})
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/trg-team/it/view-complaints'],{queryParams:{id:element.id}})  
  }


  sortData(sort: Sort) {
    const datalist = this.Complaints.slice();
    if (!sort.active || sort.direction === '') {
      this.Complaints = datalist;
      return;
    }
    this.Complaints = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'requestNature': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'requestType': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        case 'remarks': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.Complaints);
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
          type: 'document',title:"Complaints Document", url: e.file
        }
      }
      )
    }

    changeComplaintsStatus(e, d) {
      this.spinner.show();
      if (e.checked) {
        this.adminservice.changeComplaintsStatus(d.id, 1).subscribe(
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
        this.adminservice.changeComplaintsStatus(d.id, 0).subscribe(
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

