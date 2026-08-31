import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-greybook',
  templateUrl: './greybook.component.html',
  styleUrls: ['./greybook.component.scss']
})
export class GreybookComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource :any;
  displayedColumns: string[] = ['number','rank', 'name','email','address','phoneNumber','department','post','status','action'];
  greybooksList:any[] = [];

  constructor(private router:Router, private service:AdminService,  private sharedService:SharedService,
    private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getGreyBooksList()
  }

  getGreyBooksList(){
    this.spinner.show();
    this.service.getGreybooksList().subscribe(
      res =>{
        console.log(res);
        
        if(res.status == "OK"){
          this.greybooksList = res.object
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        this.spinner.hide();   
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
       
      },
      err =>{
        this.service.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }



  
  changeGreybookStatus(e:any,id){
    this.spinner.show();

    if(e.checked){
      this.service.changeGreybookStatus(id,1).subscribe(
        res =>{
          console.log(res);
          
          if(res.status == 'OK'){
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
            
          }
        },
        err =>{
          this.service.openSnackbar('Error Occured.')
          
        }
      )
      this.spinner.hide();
    }
    else {

      this.service.changeGreybookStatus(id,0).subscribe(
        res =>{
          console.log(res);
          
          if(res.status == 'OK'){
            this.spinner.hide()
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
          }
        },
        err =>{
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }

  
  addGreybook(){
    this.router.navigate(['/main/admin/home/greybook/add-greybook'])
  }

  viewGreybook(e){
    this.router.navigate(['/main/admin/home/greybook/view-greybook'], {queryParams:{id:e.id}})
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  sortData(sort: Sort) {
    const datalist = this.greybooksList.slice();
    if (!sort.active || sort.direction === '') {
      this.greybooksList = datalist;
      return;
    }
    this.greybooksList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this.sharedService.compare(a.userRank.toLowerCase(), b.userRank.toLowerCase(), isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);  
        case 'department': return this.sharedService.compare(a.department.toLowerCase(), b.department.toLowerCase(), isAsc);
        case 'post': return this.sharedService.compare(a.post.toLowerCase(), b.post.toLowerCase(), isAsc);
        case 'email': return this.sharedService.compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
        case 'phone': return this.sharedService.compare(a.phoneNumber, b.phoneNumber, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.greybooksList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
