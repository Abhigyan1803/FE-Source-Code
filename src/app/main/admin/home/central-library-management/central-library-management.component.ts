import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-central-library-management',
  templateUrl: './central-library-management.component.html',
  styleUrls: ['./central-library-management.component.scss']
})
export class CentralLibraryManagementComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['number','name',/*'url',*/'visit','status','action'];
  centralLibraryList:any[]=[];
  dataSource;
  
  constructor(private router:Router, private service:AdminService,  private sharedService:SharedService,
     private cdref: ChangeDetectorRef, private spinner:NgxSpinnerService){}

  ngOnInit(): void {  
  }

  ngAfterViewInit(){
    this.getCentralLbraryList();
  }

  getCentralLbraryList(){
    this.service.getCentralLibraryList().subscribe(
      res=>{
        this.spinner.show();
        console.log(res);
        if(res.status == "OK"){
          this.centralLibraryList = res.object;
          this.dataSource= new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else{
          this.service.openSnackbar(res.message)
          this.spinner.hide();
        }
        
      },
      err=>{
        this.spinner.hide()
        this.service.openSnackbar('Error Occured.')
      }
    )
  }


  addLink(){
    this.router.navigate(['/main/admin/home/central-library-management/add-link'])
  }

  viewLink(a){
    this.router.navigate(['/main/admin/home/central-library-management/view-link'],{queryParams:{id:a.id}})
  }

  
  changeCentralLibraryStatus(e:any,a){

    this.spinner.show();
    if(e.checked){
      this.service.changeCentralLibraryStatus(a.id,1).subscribe(
        res =>{
          console.log("Central Library Status Changed:");
          
          console.log(res);
          if(res.status == 'OK'){
            this.service.openSnackbar("Recore Updated Successfully")
            this.cdref.detectChanges();
            // this.ngAfterViewInit();

            this.spinner.hide();
          }
          else{
            
      this.spinner.hide();
      this.service.openSnackbar(res.message)
          }
        },
        err =>{
          
      this.spinner.hide();
          this.service.openSnackbar('Error Occured.');
          
        }
      )
    }
    else {

      this.service.changeCentralLibraryStatus(a.id,0).subscribe(
        res =>{
          console.log("Central Library Status Changed:");
          console.log(res);

          if(res.status == 'OK'){
            this.service.openSnackbar("Recore Updated Successfully")
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            
      this.spinner.hide();
          }
          else{
           
      this.spinner.hide();
      this.service.openSnackbar(res.message) 
          }
        },
        err =>{
          
      this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
        }
      )
    }
  }

  visitURL(l){
    window.open(l.linkUrl,'_blank')
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  sortData(sort: Sort) {
    const datalist = this.centralLibraryList.slice();
    if (!sort.active || sort.direction === '') {
      this.centralLibraryList = datalist;
      return;
    }
    this.centralLibraryList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.tabName.toLowerCase(), b.tabName.toLowerCase(), isAsc);  
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.centralLibraryList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
