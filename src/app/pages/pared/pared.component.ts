import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSort, Sort } from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import { TrgBattalionService } from "app/service/trg-battalion/trg-battalion.service";
import { MatPaginator } from "@angular/material/paginator";
import { SharedService } from "app/service/shared.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "app/Shared/dialog/dialog.component";
import { AdjutantService } from "app/service/adjutant/adjutant.service";

@Component({
  selector: "ms-pared",
  templateUrl: "./pared.component.html",
  styleUrls: ["./pared.component.scss"],
})
export class ParedComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList: any[] = [];
  dataSource:any;
  displayedColumns: string[] = [
    "number",
    "name",
    "description",
    "document",
    "status",
    // "action",


  ];
  academyParadeState: any[] = [];

  constructor(
    private router: Router,
    private service: AdjutantService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAcademyParadeState();
  }

  getAcademyParadeState() {
    this.spinner.show();
    this.service.getAcademyParadeUnauth(2).subscribe(
      (res) => {
        if (res.status == "OK") {
          this.academyParadeState = res.object;
          console.log("response",res.object);
          this.dataSource = new MatTableDataSource(res.object);
          console.log("Datasource",this.dataSource);
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
          this.cdref.detectChanges();
          console.log(res, "=================");
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
      },
      (err) => {
        this.spinner.hide();
        this.service.openSnackbar("Some Error Occured.");
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // viewAcademyParade(element) {
  //   this.router.navigate([`${this.router.url}/view-academy-parade`], {
  //     queryParams: { id: element.id },
  //   });
  // }

  openDoc(e) {
    this.dialog.open(DialogComponent, {
      width: "1300px",
      height: "650px",
      data: {
        type: "document",
        title: "Academy Parade State Document",
        url: e.doc,
      },
    });
  }

  sortData($event) {}

  changeParadeStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeParadeStatus(d.id, 1).subscribe(
        (res) => {
          console.log(res);

          if (res.status == "OK") {
            this.service.openSnackbar(res.message);
            this.cdref.detectChanges();
          }
        },
        (err) => {
          this.service.openSnackbar("Error Occured.");
        }
      );
      this.spinner.hide();
    } else {
      this.service.changeParadeStatus(d.id, 0).subscribe(
        (res) => {
          console.log(res);

          if (res.status == "OK") {
            this.service.openSnackbar(res.message);
            this.cdref.detectChanges();
          }
        },
        (err) => {
          this.service.openSnackbar("Error Occured.");
        }
      );
      this.spinner.hide();
    }
  }
}