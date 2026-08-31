import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GcService } from 'app/service/gc/gc.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-distribution-of-marks',
  templateUrl: './distribution-of-marks.component.html',
  styleUrls: ['./distribution-of-marks.component.scss']
})
export class DistributionOfMarksComponent implements OnInit {
  type:string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','uploadedDate','document'];  
  distributionOfMarksList: any[] = [];
  cadetDetails:any;
  
  constructor(private router: Router,private route:ActivatedRoute,  private spinner:NgxSpinnerService, private service:GcService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {
      this.cadetDetails = JSON.parse(localStorage.getItem("loginResponse")).object;

    }
  
    ngOnInit(): void {
  }

  ngAfterViewInit() {
  this.getDistributionOfMarksList()
  }

  getDistributionOfMarksList(){
    this.spinner.show();

  this.service.getDistributionOfMarksLIST('Academic Distribution of Marks',this.cadetDetails.term).subscribe(res =>{  
    // console.log(res);
    if(res.status=="OK"){
      this.distributionOfMarksList=res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
      this.cdref.detectChanges();
    }
    else{
      this.spinner.hide()
      this.sharedService.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide();
    console.log(JSON.stringify(err));
    this.sharedService.openSnackbar("Some Error Occured.");
  }
  )

  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   
  sortData(sort: Sort) {
    const datalist = this.distributionOfMarksList.slice();
    if (!sort.active || sort.direction === '') {
      this.distributionOfMarksList = datalist;
      return;
    }
    this.distributionOfMarksList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.distributionOfMarksList);
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
          type: 'document',title:"Document", url: e.url
        }
      }
      )
    }


}
