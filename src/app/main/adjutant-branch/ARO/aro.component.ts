import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'adj-aro',
  templateUrl: './aro.component.html',
  styleUrls: ['./aro.component.scss']
})

export class AroComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  aroList:any[]=[];
  dataSource :any;
  displayedColumns: string[] = ['number','name','document','status','action'];  

  constructor(private service: AdjutantService, private sharedService:SharedService , private router: Router, private cdref: ChangeDetectorRef ,
    private spinner:NgxSpinnerService, private dialog:MatDialog){}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getAdjutantaro()
  }

  getAdjutantaro(){
    this.spinner.show();
  this.service.getAdjutantaro(2,2).subscribe(
    res =>{
      if(res.status == "1"){
        this.aroList = res.List;
        this.dataSource= new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      // console.log(res);
      this.spinner.hide()
    },
    err =>{
      this.service.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}

openDoc(e){
  
this.dialog.open(DialogComponent,
  {
    width: '1300px', height: '650px',
    data: {
      type: 'document',title:"ARO Document", url: e.document
    }
  }
  )
}

// changeAROStatus(e:any,id){}

changeAROStatus(e, d) {
  this.spinner.show();
  if (e.checked) {
    this.service.aroStatus(d.id, 1).subscribe(
      res => {
        console.log(res);
        
        if (res.status == '1') {
          this.service.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit();
        }
      },
      err => {
        this.service.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }
  else {
    this.service.aroStatus(d.id, 0).subscribe(
      res => {
        console.log(res);
          
        if (res.status == '1') {
          
          this.service.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit();
        }
      },
      err => {
        this.service.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }
}

addAro() {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/aro/add-aro']);
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/aro/add-aro']);
}
viewAro(ob) {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/aro/view-aro'],{queryParams:{id:ob.id}});
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/aro/view-aro'],{queryParams:{id:ob.id}});
}

// getAdjutantList(){
//   this.service.getAdjutantList().subscribe(res => {
//     console.log(res);
//     if(res.status=="OK"){
//      this.adjutantlist = res.object
//     }

//   })   
// }


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


sortData(sort: Sort) {
  const datalist = this.aroList.slice();
  if (!sort.active || sort.direction === '') {
    this.aroList = datalist;
    return;
  }
  this.aroList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);  
      default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.aroList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
