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
import { PostmanService } from 'app/Shared/postman-service';

@Component({
  selector: 'ms-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  tableSource: any = [];
  dataSource: any;
  displayedColumns: string[] = ['number', 'roleName','department','appt', 'status', 'action'];

  constructor(
    private router: Router,
    private adminservice: AdminService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog,
    private sharedService: SharedService,    
    public postmanService: PostmanService) { }


  ngOnInit() {}

  ngAfterViewInit() {
    this.getRole();
  }

  getRole() {
    this.spinner.show();
    this.adminservice.getRole().subscribe(res => {
      if (res.status == "OK") {
        this.tableSource = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
      }
      else {
        this.spinner.hide()
        this.adminservice.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.");
      }

    )
  }

  addRole() {
    this.router.navigate(['main/admin/user-access/manage-role/add-role']);
  }

  editRow(row: any) {
    this.postmanService.setRowData(row);
    this.router.navigate(['main/admin/user-access/manage-role/add-role']);
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
  
  sortData(sort: Sort) {
    const datalist = this.tableSource.slice();
    if (!sort.active || sort.direction === '') {
      this.tableSource = datalist;
      return;
    }
    this.tableSource = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'roleName': return this.sharedService.compare(a.roleName.toLowerCase(), b.roleName.toLowerCase(), isAsc);
        case 'department': return this.sharedService.compare(a.department.toLowerCase(), b.department.toLowerCase(), isAsc);
        case 'appt': return this.sharedService.compare(a.appointment.toLowerCase(), b.appointment.toLowerCase(), isAsc);
        
        // case 'status': return this.sharedService.compare(a.status.toLowerCase(), b.status.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.tableSource);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack() {
    this.router.navigate(['main/admin/dashboard']);
  }
}
