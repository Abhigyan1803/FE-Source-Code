import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'ms-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList: any[] = [];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'username', 'status', 'action'];
  POC: any[] = [];
  displayStyle: any = "none";
  displayStyles: any = "none";

  addAdminForm: FormGroup = new FormGroup({});
  changePassForm: FormGroup = new FormGroup({});

  isError;
  isDoc;

  adminId
  constructor(private router: Router, private fb: FormBuilder, private adminservice: AdminService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {

    this.addAdminForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    })
    this.changePassForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      adminId: ['']
    })
  }


  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.getAdmin()
  }

  goBack() {
    this.router.navigate(['main/admin/dashboard']);
  }

  obj: any;
  /*-----------GET------------*/
  id = [];
  getAdmin() {
    this.spinner.show();
    this.adminservice.getManageAdmin().subscribe(res => {
      console.log(res);

      if (res.status == "OK") {
        this.obj = res.object;
        this.adminId = res.object.adminId;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
        console.log(res, "=================");
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


  /*--------ADD-------------*/
  addDetails() {
    // if (this.addAdminForm.invalid) {
    //   this.isError = true;
    //   this.adminservice.openSnackbar("Please Fill All Required Fields")
    // } else {
    let password = this.addAdminForm.value.password;
    let confirmpassword = this.addAdminForm.value.confirmpassword;
    if (password != confirmpassword) {
      this.adminservice.openSnackbar("Confirm password not matched")
      return;
    }
    console.log(this.addAdminForm.value, "=================");

    this.spinner.show();
    this.adminservice.addAdmin(this.addAdminForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['/main/admin/user-access/manage-admin']);
        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
    // }
  }


  // noImg(e) {
  //   e.target.src = "assets/img/default_user.png"
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  viewPOC(element) {
    this.router.navigate(['main/admin/user-access/manage-admin/view-user'], { queryParams: { id: element.id } })

    if (this.router.url.includes('main/admin'))
      this.router.navigate(['main/admin/user-access/manage-admin/view-user'], { queryParams: { id: element.id } })
    //   if(this.router.url.includes('main/admin'))
    //   this.router.navigate(['main/admin/GS-Branch/stats/stats/poc/view-poc'],{queryParams:{id:element.id}})  
  }


  sortData(sort: Sort) {
    const datalist = this.POC.slice();
    if (!sort.active || sort.direction === '') {
      this.POC = datalist;
      return;
    }
    this.POC = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.POC);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  changeManageAdminStatus(e, d) {
    console.log(e + '--' + d);
    this.spinner.show();
    if (e.checked) {
      this.adminservice.changeAdminStatus(d.adminId, 1).subscribe(
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
      this.adminservice.changeAdminStatus(d.adminId, 0).subscribe(
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


  // changePOCStatus(e, d) {
  //   this.spinner.show();
  //   if (e.checked) {
  //     this.adminservice.changePOCStatus(d.id, 1).subscribe(
  //       res => {
  //         console.log(res);
  //         if (res.status == 'OK') {
  //           this.adminservice.openSnackbar(res.message)
  //           this.cdref.detectChanges();
  //           this.spinner.hide()
  //         }
  //         else {
  //           this.spinner.hide()
  //           this.adminservice.openSnackbar(res.message)
  //         }
  //       },
  //       err => {
  //         this.spinner.hide();
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  //   else {
  //     this.adminservice.changeCourtCasesStatus(d.id, 0).subscribe(
  //       res => {
  //         console.log(res);

  //         if (res.status == 'OK') {

  //           this.adminservice.openSnackbar(res.message)
  //           this.cdref.detectChanges();

  //           this.spinner.hide()
  //         }
  //         else {
  //           this.spinner.hide()
  //           this.adminservice.openSnackbar(res.message)
  //         }
  //       },
  //       err => {
  //         this.spinner.hide()
  //         this.adminservice.openSnackbar('Error Occured.')
  //       }
  //     )
  //     this.spinner.hide();
  //   }
  // }


  /*------------------Update-------------------*/
  updateManageAdmin() {
    this.adminservice.updateAdminPass(this.changePassForm.value).subscribe(
      res => {
        console.log(res);

        if (res.status == 'OK') {
          this.spinner.hide();

          this.adminservice.openSnackbar(res.message);
        } else {
          this.spinner.hide();
          this.adminservice.openSnackbar(res.message);
        }

      },
      err => {
        this.spinner.hide();
        this.adminservice.openSnackbar("Error Occured.");
      }
    )
  }





  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  firstPopup(adminId, username) {
    this.changePassForm.reset();
    this.changePassForm.patchValue({
      adminId: adminId,
      username: username,
    });

    this.adminId = adminId;
    this.displayStyles = "block";
  }
  secondPopup() {
    this.displayStyles = "none";
  }

}

