
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
  selector: 'ms-reception-gc',
  templateUrl: './reception-gc.component.html',
  styleUrls: ['./reception-gc.component.scss']
})
export class ReceptionGcComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  Reception:any[]=[];
  dataSource :any;
  displayedColumns: string[] = ['number','letterNo','scheduleDate','subject','document','status','action'];  

  constructor(private service: AdjutantService, private sharedService:SharedService , private router: Router, private cdref: ChangeDetectorRef ,
    private spinner:NgxSpinnerService, private dialog:MatDialog){}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getReception()
  }

  getReception(){
    this.spinner.show();
  this.service.getReception(2).subscribe(
    res =>{
      if(res.status == "OK"){
        this.Reception = res.object;
        this.dataSource= new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      console.log(res);
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
      type: 'document',title:"Reception Document", url: e.document
    }
  }
  )
}

// changeAROStatus(e:any,id){}


changeReceptionStatus(e, d) {
  this.spinner.show();
  if (e.checked) {
    this.service.orderReceptionStatus(d.id, 1).subscribe(
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
  else {
    this.service.orderReceptionStatus(d.id, 0).subscribe(
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
        this.spinner.hide()
        this.service.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }
}


addSCHEDULE() {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/general-instruction/reception/add-reception']);
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['main/adjutant-branch/general-instruction/reception/add-reception']);
}
viewReception(ob) {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/general-instruction/reception/view-reception'],{queryParams:{id:ob.id}});
  if(this.router.url.includes('main/admin'))
  this.router.navigate(['main/adjutant-branch/general-instruction/reception/view-reception'],{queryParams:{id:ob.id}});
}

// getAdjutantobject(){
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
  const datalist = this.Reception.slice();
  if (!sort.active || sort.direction === '') {
    this.Reception = datalist;
    return;
  }
  this.Reception = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);  
      default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.Reception);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
