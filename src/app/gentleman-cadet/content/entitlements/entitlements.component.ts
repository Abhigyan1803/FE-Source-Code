import { MatTableDataSource } from "@angular/material/table";
import { SharedService } from "./../../../service/shared.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { GcService } from "app/service/gc/gc.service";

@Component({
  selector: "ms-entitlements",
  templateUrl: "./entitlements.component.html",
  styleUrls: ["./entitlements.component.scss"],
})
export class EntitlementsComponent implements OnInit {
  type: string = "";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  entitlements: string[] = ['MES', 'Personal Kit Items', 'IT', 'Additional Items'];

  dataSource: any;
  displayedColumns: string[] = [
    "number",
    "title",
    "address",
    "details",
    // "status",
    // "action",
  ];
  entitlementsList: any[] = [];
  cadetDetails;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: GcService,
    private sharedService: SharedService,
    private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object
    this.route.params.subscribe((params) => {
      this.type = params.type;
      if (!this.entitlements.includes(this.type)) {

        this.router.navigate(['/gc/content/dashboard'])
        this.sharedService.openErrorSnackbarWithSeconds('Error!', 5)
      } else {
        this.getEntitlementsList();

      }


    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getEntitlementsList();
  }

  getEntitlementsList() {
  console.log(this.type,"this.type");

    this.spinner.show();
    this.service.getEntitlementList(this.cadetDetails.id, this.type).subscribe(
      res => {
        
        if (res.status == "OK") {
          if (res.object) {

            console.log(res.message,"ggg");
            this.entitlementsList = res.object
            
            this.dataSource = new MatTableDataSource(this.entitlementsList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.cdref.detectChanges();
            this.spinner.hide();
          }
          else if(res.object==null){
            this.dataSource = new MatTableDataSource();
            this.spinner.hide();

          }
           else {
            this.spinner.hide();
            this.sharedService.openSnackbar(res.message);
          }
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message);
        }

      },
      err => {
        this.sharedService.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )

  }

  addEntitlement() {
    this.router.navigate(["/gc/content/entitlements/" + this.type + "/add-entitlement"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.entitlementsList.slice();
    if (!sort.active || sort.direction === "") {
      this.entitlementsList = datalist;
      return;
    }
    this.entitlementsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {

        case "title":
          return this.sharedService.compare(
            a.title.toLowerCase(),
            b.title.toLowerCase(),
            isAsc
          );

        case "address":
          return this.sharedService.compare(
            a.address.toLowerCase(),
            b.address.toLowerCase(),
            isAsc
          );

        case "details":
          return this.sharedService.compare(
            a.details.toLowerCase(),
            b.details.toLowerCase(),
            isAsc
          );

        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.entitlementsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
