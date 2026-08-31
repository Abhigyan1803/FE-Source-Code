import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-parade-state',
  templateUrl: './parade-state.component.html',
  styleUrls: ['./parade-state.component.scss']
})
export class ParadeStateComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  paredList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number','createdAt','name','document','status','action'];  
  trgBattalionMembers: any[] = [];

  constructor(private router: Router, private _trgBattalion: TrgBattalionService,  private sharedService:SharedService,
    private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog:MatDialog) { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getParadeState();
  }

  getParadeState(){
    this.spinner.show();
  this._trgBattalion.getParadeState().subscribe(
    res =>{
      if(res.status == "1"){
        this.paredList = res.List;
        this.dataSource= new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      console.log(res);
      this.spinner.hide()
    },
    err =>{
      this._trgBattalion.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}

openDoc(e) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Pared State of GCs", url: e.document
    }
  });
}


paradeStatus(e, d){
  this.spinner.show();
  if (e.checked) {
    this._trgBattalion.changeParadeStateStatus(d.id, 1).subscribe(
      res => {
        console.log(res);
        
        if (res.status == '1') {
          this._trgBattalion.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit();
        }
      },
      err => {
        this._trgBattalion.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }
  else {
    this._trgBattalion.changeParadeStateStatus(d.id, 0).subscribe(
      res => {
        console.log(res);
          
        if (res.status == '1') {
          
          this._trgBattalion.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit();
        }
      },
      err => {
        this._trgBattalion.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }
}

addParadeState() {
  if(this.router.url.includes('trg-battalion'))
  this.router.navigate(['/main/trg-battalion/parade-state/add-paradestate']);
  if(this.router.url.includes('admin'))
  this.router.navigate(['/main/admin/trg-battalion/parade-state/add-paradestate']);

}

viewDrill(ob) {
  if(this.router.url.includes('trg-battalion'))
  this.router.navigate(['/main/trg-battalion/parade-state/view-paradestate'],{queryParams:{id:ob.id}});
  if(this.router.url.includes('admin'))
  this.router.navigate(['/main/admin/trg-battalion/parade-state/view-paradestate'],{queryParams:{id:ob.id}});
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

sortData(sort: Sort) {
  const datalist = this.paredList.slice();
  if (!sort.active || sort.direction === '') {
    this.paredList = datalist;
    return;
  }
  this.paredList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'createdAt': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);   
      case 'name': return this.sharedService.compare(a.name, b.name, isAsc);    

      default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.paredList);
  this.dataSource.paginator = this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
