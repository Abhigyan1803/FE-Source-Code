import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = [ 'number', 'name', 'roleName','username', 'battalion','company','status', 'action' ];
  PCHT: any[] = [];
  staffList: any[] = [];

  constructor(private router: Router, private adminservice: AdminService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { }


  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    // this.getRole()
    this.getStaffList();
  }

  // getRole() {
  //   this.spinner.show();
  //   this.adminservice.getRole().subscribe(res => {
  //     console.log(res);

  //     if (res.status == "OK") {
  //       this.PCHT = res.object;
  //       this.dataSource = new MatTableDataSource(res.object);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //       this.spinner.hide();
  //       this.cdref.detectChanges();
  //       console.log(res, "=================");

  //     }
  //     else {
  //       this.spinner.hide()
  //       this.adminservice.openSnackbar(res.message)
  //     }
  //   },
  //     err => {
  //       this.spinner.hide()
  //       this.adminservice.openSnackbar("Some Error Occured.");
  //     }

  //   )
  // }


  getStaffList() {
    this.spinner.show();
    this.adminservice.getStaffList(2).subscribe(
      res => {
        console.log(res);

        if (res.status == "OK") {
          this.staffList = res.object;
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
    this.router.navigate(['main/admin/user-access/manage-staff/add-staff']);
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

  viewRole(element) {
    this.adminservice.setStaffMember(element)
    this.router.navigate(['main/admin/user-access/manage-staff/view-staff'], { queryParams: { id: element.loginId } })
  }




  openDoc(e) {

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "View Document", url: e.document
        }
      }
    )
  }

  changeStaffStatus(e, d) {
    this.spinner.show();
    let status;
    if(e.checked)
    status = 1;
    else 
    status = 0;

    this.adminservice.changeStaffStatus(d.loginId, status).subscribe(
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





    // if (e.checked) {
    //   this.adminservice.changeStaffStatus(d.id, 1).subscribe(
    //     res => {
    //       console.log(res);

    //       if (res.status == 'OK') {
    //         this.adminservice.openSnackbar(res.message)
    //         this.cdref.detectChanges();
    //         // this.ngAfterViewInit();
    //         this.spinner.hide()

    //       }
    //       else {
    //         this.spinner.hide()
    //         this.adminservice.openSnackbar(res.message)
    //       }
    //     },
    //     err => {
    //       this.spinner.hide();
    //       this.adminservice.openSnackbar('Error Occured.')
    //     }
    //   )
    //   this.spinner.hide();
    // }
    // else {
    //   this.adminservice.updateClubsStatus(d.id, 0).subscribe(
    //     res => {
    //       console.log(res);

    //       if (res.status == 'OK') {

    //         this.adminservice.openSnackbar(res.message)
    //         this.cdref.detectChanges();
    //         // this.ngAfterViewInit();
    //         this.spinner.hide()
    //       }
    //       else {
    //         this.spinner.hide()
    //         this.adminservice.openSnackbar(res.message)
    //       }
    //     },
    //     err => {
    //       this.spinner.hide()
    //       this.adminservice.openSnackbar('Error Occured.')
    //     }
    //   )
    //   this.spinner.hide();
    // }
  }


  goBack() {
    this.router.navigate(['main/admin/dashboard']);
  }

  sortData(sort: Sort) {
    const datalist = this.staffList.slice();
    if (!sort.active || sort.direction === '') {
      this.staffList = datalist;
      return;
    }
    this.staffList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'roleName': return this.sharedService.compare(a.roleName.toLowerCase(), b.roleName.toLowerCase(), isAsc);
        case 'battalion': return this.sharedService.compare(a.battalionName.toLowerCase(), b.battalionName.toLowerCase(), isAsc);
        case 'company': return this.sharedService.compare(a.companyName.toLowerCase(), b.companyName.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.staffList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
