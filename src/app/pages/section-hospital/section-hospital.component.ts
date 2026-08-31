import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-section-hospital',
  templateUrl: './section-hospital.component.html',
  styleUrls: ['./section-hospital.component.scss']
})
export class SectionHospitalComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource :any;
  displayedColumns: string[] = ['number','title','date','document'];
  HospitalList:any[] = [];

  constructor(private router:Router, private service:AdminService,  private sharedService:SharedService,
    private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    document.getElementById('foot-id').style.position='absolute';
  }

  ngAfterViewInit(){
    this.getSection()
  }

  getSection(){
    this.spinner.show();
    this.service.getSection(1).subscribe(
      res =>{
        console.log(res);
        
        if(res.status == "OK"){
          this.HospitalList = res.object
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        this.spinner.hide();   
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
       
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
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"SECTION HOSPITAL ", url: e.document
        }
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
    const datalist = this.HospitalList.slice();
    if (!sort.active || sort.direction === '') {
      this.HospitalList = datalist;
      return;
    }
    this.HospitalList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return this.sharedService.compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        case 'document': return this.sharedService.compare(a.document.toLowerCase(), b.document.toLowerCase(), isAsc);
        
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.HospitalList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

