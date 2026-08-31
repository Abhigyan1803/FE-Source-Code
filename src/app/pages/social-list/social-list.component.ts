
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomePageService } from 'app/service/home/home-page.service';

@Component({
  selector: 'ms-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss']
})
export class SocialListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  currYear = new Date().getFullYear();

  dataSource: any;
  displayedColumns: string[] = ['number', 'rank', 'name', 'depatment', 'spouse', 'relation', 'dob', 'sdob', 'dom', ];

  specialOccasionsList: any[] = [];
  currentYear = new Date().getFullYear();
  specialOccasions: any[] = [];

  constructor(private router: Router, private service: HomePageService, private sharedService: SharedService,
    private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getSpecialOccasionsList();

  }

  // getSpecialOccasionsList() {
  //   this.spinner.show();
  //   this.service.getAllSpecialOccasionsList(1).subscribe(
  //     res => {
  //       console.log(res);

  //       if (res.status == "OK") {
  //         this.specialOccasionsList = res.object
  //         this.dataSource = new MatTableDataSource(res.object);
  //         this.dataSource.sort = this.sort;
  //         this.dataSource.paginator = this.paginator;
  //         this.cdref.detectChanges();
  //         this.spinner.hide();
  //         const currDate = Date.now();
  //         let oc = res.object;
  //         const diff: number = 604800000;
       
  //         oc.forEach(element => {

  //           console.log(element);
  //           let dobOfc;
  //           let dobSps;
  //           let wedd;

  //           if (element.officerDOB != null) {

  //             dobOfc = new Date(element.officerDOB).setFullYear(this.currentYear);
          
  //             let oc = dobOfc - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   type: 'oBday',
  //                   date: element.officerDOB,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges()
  //             }

  //           }
  //           if (element.spouseDOB != null) {
  //             dobSps = new Date(element.spouseDOB).setFullYear(this.currentYear);
         
  //             let oc = dobSps - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   relation: element.relation,
  //                   sName: element.spouseName,
  //                   type: 'sBday',
  //                   date: element.spouseDOB,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges()

  //             }

  //           }
  //           if (element.marriageAnniversary != null) {
  //             wedd = new Date(element.marriageAnniversary).setFullYear(this.currentYear);
     

  //             let oc = wedd - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   relation: element.relation,
  //                   sName: element.spouseName,
  //                   type: 'wedd',
  //                   date: element.marriageAnniversary,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges();

  //             }
  //           }
  //         });






  //       } else {
  //         this.spinner.hide();
  //         // this.service.openSnackbar(res.message);
  //       }

  //     },
  //     err => {
  //       // this.service.openSnackbar('Error Occured.')
  //       this.spinner.hide();
  //     }
  //   )
  // }


  getSpecialOccasionsList() {
    //getSpecialOccasions
    this.specialOccasions=[];
    this.service.getSpecialOccasions().subscribe(
      res => {
        if (res.status == 'OK') {
          console.log("==========SPECIAL OCCASIONS=========");
          console.log(res);
          console.log("==========TO HERE=========");
          this.dataSource = new MatTableDataSource(res.object);
          const currDate = Date.now();
          let oc = res.object;
          const diff: number = 604800000;
       
          oc.forEach(element => {

            console.log(element);
            let dobOfc;
            let dobSps;
            let wedd;

            if (element.officerDOB != null) {

              dobOfc = new Date(element.officerDOB).setFullYear(this.currentYear);
          
              let oc = dobOfc - currDate
              if (oc < diff) {
                this.specialOccasions.push(
                  {
                    oName: element.officerRank + ' ' + element.officerName,
                    type: 'oBday',
                    date: element.officerDOB,
                    department: element.postedBranch,
                    priority: new Date(element.officerDOB).getMonth() + new Date(element.officerDOB).getDate() ,
                  }
                )
                this.cdref.detectChanges()
              }

            }
            if (element.spouseDOB != null) {
              dobSps = new Date(element.spouseDOB).setFullYear(this.currentYear);
         
              let oc = dobSps - currDate
              if (oc < diff) {
                this.specialOccasions.push(
                  {
                    oName: element.officerRank + ' ' + element.officerName,
                    relation: element.relation,
                    sName: element.spouseName,
                    type: 'sBday',
                    date: element.spouseDOB,
                    department: element.postedBranch,
                    priority: new Date(element.spouseDOB).getMonth() + new Date(element.spouseDOB).getDate() ,

                  }
                )
                this.cdref.detectChanges()

              }

            }
            if (element.marriageAnniversary != null) {
              wedd = new Date(element.marriageAnniversary).setFullYear(this.currentYear);
     

              let oc = wedd - currDate
              if (oc < diff) {
                this.specialOccasions.push(
                  {
                    oName: element.officerRank + ' ' + element.officerName,
                    relation: element.relation,
                    sName: element.spouseName,
                    type: 'wedd',
                    date: element.marriageAnniversary,
                    department: element.postedBranch,
                    priority: new Date(element.marriageAnniversary).getMonth() + new Date(element.marriageAnniversary).getDate() ,

                  }
                )
                this.cdref.detectChanges();

              }
            }


          });

          this.specialOccasions.sort(function (a, b) { return a.priority - b.priority });
          console.log("=============Filtered occasions============");
          console.log(this.specialOccasions);
          console.log("=============To Here============");

        }
      }
    )
  }
  

 



  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


  // sortData(sort: Sort) {
  //   const datalist = this.specialOccasionsList.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.specialOccasionsList = datalist;
  //     return;
  //   }
  //   this.specialOccasionsList = datalist.sort((a: any, b: any) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'rank': return this.sharedService.compare(a.userRank.toLowerCase(), b.userRank.toLowerCase(), isAsc);
  //       case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
  //       case 'department': return this.sharedService.compare(a.department.toLowerCase(), b.department.toLowerCase(), isAsc);
  //       case 'post': return this.sharedService.compare(a.post.toLowerCase(), b.post.toLowerCase(), isAsc);
  //       case 'email': return this.sharedService.compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
  //       case 'phone': return this.sharedService.compare(a.phoneNumber, b.phoneNumber, isAsc);
  //       default: return 0;
  //     }
  //   });
  //   this.dataSource = new MatTableDataSource(this.specialOccasionsList);
  //   this.dataSource.paginator = this.paginator;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


}
