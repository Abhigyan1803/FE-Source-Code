import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'ms-special-occasions',
  templateUrl: './special-occasions.component.html',
  styleUrls: ['./special-occasions.component.scss']
})

export class SpecialOccasionsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
 
  dataSource: any;
  displayedColumns: string[] = ['number', 'rank', 'name','ic_number', 'department', 'spouse', 'relation', 'dob', 'sdob', 'dom', 'status', 'view'];

  specialOccasionsList: any[] = [];

  constructor(private router: Router, private service: AdminService, private sharedService: SharedService,
    private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getSpecialOccasionsList();
  }

  getSpecialOccasionsList() {
    this.spinner.show();
    this.service.getAllSpecialOccasionsList(2).subscribe(
      res => {
        console.log(res);

        if (res.status == "OK") {
          this.specialOccasionsList = res.object
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }

      },
      err => {
        this.service.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }

  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'SocialList.xlsx');  
  }  


  changeSpecialOccasionStatus(e: any, id) {
    let status
    if(e.checked){
      status=1
    } else {
      status=0
    }

    this.spinner.show();
    this.service.changeSpecialOccasionStatus(id, status).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.spinner.hide();
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          // this.ngAfterViewInit();
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.service.openSnackbar('Error Occured.')
      }
    )

 
  
  }


  addSpecialOccasion() {
    // this.router.navigate(['/main/admin/home/special-occasions/add'])
        this.router.navigate(['/main/adjutant-branch/social-list/add'])
  }

  viewSpecialOccasion(e) {
    // this.router.navigate(['/main/admin/home/special-occasions/view'], { queryParams: { id: e.id } })
        this.router.navigate(['/main/adjutant-branch/social-list/view'], { queryParams: { id: e.id } })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sortData(sort: Sort) {
    const datalist = this.specialOccasionsList.slice();
    if (!sort.active || sort.direction === '') {
      this.specialOccasionsList = datalist;
      return;
    }
    this.specialOccasionsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this.sharedService.compare(a.officerRank.toLowerCase(), b.officerRank.toLowerCase(), isAsc);
        case 'name': return this.sharedService.compare(a.officerName.toLowerCase(), b.officerName.toLowerCase(), isAsc);
        case 'department': return this.sharedService.compare(a.postedBranch.toLowerCase(), b.postedBranch.toLowerCase(), isAsc);
       
        case 'spouse': return this.sharedService.compare(a.spouseName.toLowerCase(), b.spouseName.toLowerCase(), isAsc);
        case 'relation': return this.sharedService.compare(a.relation.toLowerCase(), b.relation.toLowerCase(), isAsc);
        case 'dob': return this.sharedService.compare(a.officerDOB, b.officerDOB, isAsc);
        case 'sdob': return this.sharedService.compare(a.spouseDOB, b.spouseDOB, isAsc);
        case 'dom': return this.sharedService.compare(a.marriageAnniversary, b.marriageAnniversary, isAsc);

       // case 'phone': return this.sharedService.compare(a.phoneNumber, b.phoneNumber, isAsc);
       
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.specialOccasionsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
