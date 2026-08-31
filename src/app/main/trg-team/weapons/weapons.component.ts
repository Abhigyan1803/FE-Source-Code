import { ChangeDetectorRef,Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';

import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { Routings } from 'app/Shared/constant';
@Component({
  selector: 'ms-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'weapon', 'status', 'action'];
  weaponList: any[];
  id: number;
  pTitle: string;
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private service: TrgTeamService,private spinner:NgxSpinnerService, private cdref: ChangeDetectorRef,
    private _trgBattalion: TrgBattalionService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (this.id == 1) {
        this.pTitle = "Term I Weapon";
        this.getWeapons(1)
      }
      else if (this.id == 2) {
        this.pTitle = "Term II Weapon";
        this.getWeapons(2)
      }
      else if (this.id == 3) {
        this.pTitle = "Term III Weapon";
        this.getWeapons(3)
      }
    });
  }


  getWeapons(id) {
    console.log("id", id);
    this.weaponList = [];
    this.dataSource = [];
    this.service.getWeaponByTerm(id,2).subscribe(res => {
      if (res.status = "OK") {
        this.weaponList = res.object;
        this.dataSource = new MatTableDataSource(this.weaponList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.dataSource = [];
      }
    })
  }

  addWeapons() {
    if (this.id == 1) {
      this.router.navigate(['main/admin/trg-team/' + Routings.addWeaponsPath], { queryParams: { term: 1 } });
    }
    else if (this.id == 2) {

      this.router.navigate(['main/admin/trg-team/' + Routings.addWeaponsPath], { queryParams: { term: 2 } });
    }
    else if (this.id == 3) {

      this.router.navigate(['main/admin/trg-team/' + Routings.addWeaponsPath], { queryParams: { term: 3 } });
    }
  }

  viewWeapon(id) {
    if(this.router.url.includes('main/trg-team/weapon/weapons')){

      if (this.id == 1) {
        this.router.navigate(['main/trg-team/weapon/weapons/edit/' + id], { queryParams: { term: 1 } });
      }
      else if (this.id == 2) {
  
        this.router.navigate(['main/trg-team/weapon/weapons/edit/' + id], { queryParams: { term: 2 } });
      }
      else if (this.id == 3) {
  
        this.router.navigate(['main/trg-team/weapon/weapons/edit/' + id], { queryParams: { term: 3 } });
      }
    }
    
    if(this.router.url.includes('main/admin/trg-team')){

    if (this.id == 1) {
      this.router.navigate(['main/admin/trg-team/weapons/edit/' + id], { queryParams: { term: 1 } });
    }
    else if (this.id == 2) {

      this.router.navigate(['main/admin/trg-team/weapons/edit/' + id], { queryParams: { term: 2 } });
    }
    else if (this.id == 3) {

      this.router.navigate(['main/admin/trg-team/weapons/edit/' + id], { queryParams: { term: 3 } });
    }

    }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.weaponList.slice();
    if (!sort.active || sort.direction === '') {
      this.weaponList = datalist;
      return;
    }
    this.weaponList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'weapon': return this._trgBattalion.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.weaponList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeStatus(e, d) {
    let s;
    if(e.checked){
      s=1;
    } else{
      s=0
    }
    this.spinner.show();

    this.service.changeWeaponStatus(d.id, s).subscribe(
      res => {
        console.log(res);
        
        if (res.status == 'OK') {
          this.service.openSnackbar(res.message)
          this.cdref.detectChanges();
          // this.ngAfterViewInit();
          this.spinner.hide()

        }
        else {
          this.spinner.hide()
          this.service.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.service.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }

 

}
