import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Links } from 'app/links.module';
@Component({
  selector: 'ms-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  IP = Links.IP
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number','image','rank', 'name','post','status','action'];
  trgTeamMembers: any[];

  constructor(private router: Router, private service: AdminService, private _trgBattalion:TrgBattalionService, 
     private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void { }


  ngAfterViewInit() {
    this.getMembers();
  }

  getMembers() {
    this.spinner.show();
    this.service.getAllTrgTeam().subscribe(
      res => {
        if (res.status == 1) {
          this.trgTeamMembers = res.List;
          this.trgTeamMembers=  this.trgTeamMembers.map((res)=>({id:res.id,date:res.createdAt,rank:res.rank,name:res.name,post:res.position?.name,image:res.image,status:res.status}))       
          this.dataSource= new MatTableDataSource( this.trgTeamMembers);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide()
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

  changeMemberStatus(e: any, id) {
    this.spinner.show();
    if(e.checked){
      this.service.changeMemberStatus(id,1).subscribe(
        res =>{
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');
        }
      )
      this.spinner.hide();
    }
    else {
      this.service.changeMemberStatus(id,0).subscribe(
        res =>{
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg);
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');
        }
      )
      this.spinner.hide();
    }
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png";
  }

  addMember() {
    this.router.navigate(['/main/admin/trg-team/members/add-member']);
  }

  viewMember(m) {
    this.router.navigate(['/main/admin/trg-team/members/view-member'], { queryParams: { id: m.id } });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.trgTeamMembers.slice();
    if (!sort.active || sort.direction === '') {
      this.trgTeamMembers = datalist;
      return;
    }
    this.trgTeamMembers = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this._trgBattalion.compare(a.rank, b.rank, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);      
        case 'post': return this._trgBattalion.compare(a.post.toLowerCase(), b.post.toLowerCase(), isAsc);      
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.trgTeamMembers);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
