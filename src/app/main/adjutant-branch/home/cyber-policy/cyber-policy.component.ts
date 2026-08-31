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
  selector: 'ms-cyber-policy',
  templateUrl: './cyber-policy.component.html',
  styleUrls: ['./cyber-policy.component.scss']
})
export class CyberPolicyComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['number', 'name', 'document', 'status', 'action'];
  cyberPolicyList:any[]=[];
  dataSource;

  constructor(private router: Router, private service: AdminService, private cdref: ChangeDetectorRef, private sharedService:SharedService,
    private spinner: NgxSpinnerService, private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getCyberPolicyList();
  }

  getCyberPolicyList() {

    this.service.getCyberPolicyList().subscribe(
      res => {
        this.spinner.show();
        console.log(res);
        if (res.status == "OK") {
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.service.openSnackbar(res.message)
          this.spinner.hide();
        }

      },
      err => {
        this.spinner.hide();
        this.service.openSnackbar('Error Occured.')
      }
    )
  }

  addCyberPolicy() {
    this.router.navigate(['/main/admin/home/cyber-policy/add-cyber-policy'])
  }

  viewCyberPolicy(c) {
    this.router.navigate(['/main/admin/home/cyber-policy/view-cyber-policy'], { queryParams: { id: c.id } })
  }

  changeCyberPolicyStatus(e: any, c) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeCyberPolicyStatus(c.id, 1).subscribe(
        res => {
          console.log(res);
          if (res.status == '1') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
        }
      )
    }
    else {
      this.service.changeCyberPolicyStatus(c.id, 0).subscribe(
        res => {
          console.log(res);
          if (res.status == '1') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
            this.spinner.hide();
          }
          else {
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
  }


  openDoc(c) {
    this.dialog.open(DialogComponent , {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'Cyber Policy' , url: c.link
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
    const datalist = this.cyberPolicyList.slice();
    if (!sort.active || sort.direction === '') {
      this.cyberPolicyList = datalist;
      return;
    }
    this.cyberPolicyList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.tabName.toLowerCase(), b.tabName.toLowerCase(), isAsc);  
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.cyberPolicyList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  
}
