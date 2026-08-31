import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { Links } from 'app/links.module';

@Component({
  selector: 'ms-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  IP = Links.IP;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'image', 'rank', 'name', 'battalion', 'post','companyName', 'status', 'action'];
  trgBattalionMembers: any[] = [];

  constructor(private router: Router, private service: AdminService, private _trgBattalion: TrgBattalionService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.getMembers();
  }

  getMembers() {
    this.spinner.show();
    this.service.getTRGBattalionList(0,2).subscribe(
      res => {
        console.log(res);
        
        if (res.status == 'OK') {

          this.trgBattalionMembers = res.object;
          this.trgBattalionMembers = this.trgBattalionMembers.map((res) => ({

            id: res.id,
            date: res.createdAt, 
            rank: res.rank, 
            name: res.name,
            battalionType: res.battalionType?.shortName,
            battalionPost:  res.battalionPost?.shortName,
            battalionCompany: res.battalionCompany?.name,
            image: res.image, status: res.status

          }))

          this.dataSource = new MatTableDataSource(this.trgBattalionMembers);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();

        } else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.msg)
        }
      },
      err => {
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Some Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }


  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }
  
  changeMemberStatus(e:any,id){
    this.spinner.show()
    if(e.checked){
      this.service.changeTRGBattalionMemberStatus(id,1).subscribe(
        res =>{
          // console.log(res);
          if(res.status == 'OK'){
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide()
          // this.ngAfterViewInit()
          } else {
            this.service.openSnackbar(res.message)
            this.spinner.hide();
          }
        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured")
        }
      )
    } else {
      this.service.changeTRGBattalionMemberStatus(id,0).subscribe(
        res =>{
          // console.log(res); 
          if(res.status == 'OK'){
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide()
            // this.ngAfterViewInit()
            } else {
              this.service.openSnackbar(res.message)
              this.spinner.hide();
            }
        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured")

        }
      )
    }
  }

  addMember() {
    this.router.navigate(['/main/admin/trg-battalion/members/add-member']);
  }

  viewMember(m) {
    this.router.navigate(['/main/admin/trg-battalion/members/view-member'], { queryParams: { id: m.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.trgBattalionMembers.slice();
    if (!sort.active || sort.direction === '') {
      this.trgBattalionMembers = datalist;
      return;
    }
    this.trgBattalionMembers = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this._trgBattalion.compare(a.rank.toLowerCase(), b.rank.toLowerCase(), isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'company': return this._trgBattalion.compare(a.battalionCompany.toLowerCase(), b.battalionCompany.toLowerCase(), isAsc);
        case 'battalion': return this._trgBattalion.compare(a.battalionType.toLowerCase(), b.battalionType.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.trgBattalionMembers);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
