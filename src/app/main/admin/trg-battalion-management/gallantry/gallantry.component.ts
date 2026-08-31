import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-gallantry',
  templateUrl: './gallantry.component.html',
  styleUrls: ['./gallantry.component.scss']
})
export class GallantryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'image', 'rank', 'name', 'award', 'battalion','company', 'status', 'action'];
  trgBattalionMembers: any[] = [];

  constructor(private router: Router, private service: AdminService, private _trgBattalion: TrgBattalionService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private sharedService:SharedService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getGallantryList()
  }

  getGallantryList(){
    this.spinner.show();
  this.service.getGallantryList(0,2).subscribe(
    res =>{
      console.log(res);
      if(res.status == "1"){
        this.awardeesList = res.List;
        this.dataSource= new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      this.spinner.hide()
    },
    err =>{
      this.service.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}



addGallantry() {
    this.router.navigate(['/main/admin/trg-battalion/gallantry/add-gallantry']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  viewGallantry(m) {
    this.router.navigate(['/main/admin/trg-battalion/gallantry/view-gallantry'], { queryParams: { id: m.id } });
  }

  changeAwardeeStatus(e:any,id){
    

  this.spinner.show()
  if(e.checked){
    this.service.changeGallantryAwardeeStatus(id,1).subscribe(
      res =>{
        // console.log(res);
        if(res.status == '1'){
        this.service.openSnackbar(res.msg);
        this.cdref.detectChanges();
        this.spinner.hide();
        // this.ngAfterViewInit()
        } else {
          this.service.openSnackbar(res.msg);
          this.spinner.hide();
        }
      },
      err =>{
        this.service.openSnackbar("Some Error Occured");
        this.spinner.hide()
      }

    )
  } else {
    this.service.changeGallantryAwardeeStatus(id,0).subscribe(
      res =>{
        // console.log(res);

        if(res.status == '1'){
          this.service.openSnackbar(res.msg);
          this.cdref.detectChanges();
          this.spinner.hide();
          // this.ngAfterViewInit()
        }
        else {
          this.service.openSnackbar(res.msg);
          this.spinner.hide();
        }

      },
      err =>{
        this.service.openSnackbar("Some Error Occured");
        this.spinner.hide()
      }
    )
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

  const datalist = this.awardeesList.slice();
  if (!sort.active || sort.direction === '') {
    this.awardeesList = datalist;
    return;
  }

  this.awardeesList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      //'rank', 'name', 'award', 'battalion',
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);      
      case 'rank': return this.sharedService.compare(a.rank.toLowerCase(), b.rank.toLowerCase(), isAsc);      
      case 'award': return this.sharedService.compare(a.award.toLowerCase(), b.award.toLowerCase(), isAsc);      
      // case 'battalion': return this.sharedService.compare(a.post.toLowerCase(), b.post.toLowerCase(), isAsc);      
      default: return 0;

    }
  });
  this.dataSource = new MatTableDataSource(this.awardeesList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}

}
