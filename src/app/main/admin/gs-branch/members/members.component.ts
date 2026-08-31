import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
public IP = Links.IP;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'image', 'rank', 'name', 'post', 'status', 'action'];
  gsBranchMembers: any[];

  constructor(private router: Router, private service: AdminService, private _trgBattalion: TrgBattalionService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private sharedService:SharedService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getMembers();
  }

  getMembers() {
    this.spinner.show();
    this.service.getAllGSBranchMembers(2).subscribe(

      res => {
        console.log(res)
        if (res.status == "OK") {
          this.gsBranchMembers = res.object;
          // this.gsBranchMembers = this.gsBranchMembers.map((res) => ({ id: res.id, date: res.createdAt, rank: res.rank, name: res.name, post: res.position?.name, image: res.image, status: res.status }))
          this.dataSource = new MatTableDataSource(this.gsBranchMembers);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide()
        } else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Some Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }

  changeMemberStatus(e: any, id) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeGSBranchMemberStatus(id, 1).subscribe(
        res => {
          
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();

            this.spinner.hide();
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
        }
      )
    }
    else {
      this.service.changeGSBranchMemberStatus(id, 0).subscribe(
        res => {

          if (res.status == 'OK') {
            this.service.openSnackbar(res.message);
            this.cdref.detectChanges();
            // this.ngAfterViewInit();

            this.spinner.hide();
          }
        },
        err => {

          this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
        }
      )
    }
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png";
  }

  addMember() {
    this.router.navigate(['/main/admin/GS-Branch/members/add-member']);
  }

  viewMember(m) {
    this.router.navigate(['/main/admin/GS-Branch/members/view-member'], { queryParams: { id: m.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.gsBranchMembers.slice();
    if (!sort.active || sort.direction === '') {
      this.gsBranchMembers = datalist;
      return;
    }
    this.gsBranchMembers = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this.sharedService.compare(a.gsRank, b.gsRank, isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'post': return this.sharedService.compare(a.gsPosition.name.toLowerCase(), b.gsPosition.name.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.gsBranchMembers);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
