import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AdjutantDialogComponent } from '../adjutant-dialog/adjutant-dialog.component';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'adj-aro',
  templateUrl: './drill-comp-component.html',
  styleUrls: ['./drill-comp.component.scss']
})
export class drillCompetitionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  DrillList:any[]=[];
  dataSource;
  displayedColumns: string[] = ['number','subjectName','totalMark','termName','subjectType','status','action'];  

  constructor(private service: AdjutantService,private router: Router, private cdref: ChangeDetectorRef ,
    private sharedService:SharedService, private spinner:NgxSpinnerService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.getAdjutantdrill()
  }

  ngAfterViewInit() {
  }
  

  getAdjutantdrill(){
    this.spinner.show();
  this.service.getAdjutantdrill().subscribe(
    res =>{
      if(res.status == "OK"){
        this.DrillList = res.object;
        const allResult = this.sortArrayOfObjects(this.DrillList, "id", "ascending")
        this.dataSource= new MatTableDataSource(allResult);
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

//////// Order By /////////////
sortArrayOfObjects = <T>(
  data: T[],
  keyToSort: keyof T,
  direction: 'ascending' | 'descending' | 'none',
) => {
  if (direction === 'none') {
    return data
  }
  const compare = (objectA: T, objectB: T) => {
    const valueA = objectA[keyToSort]
    const valueB = objectB[keyToSort]

    if (valueA === valueB) {
      return 0
    }

    if (valueA > valueB) {
      return direction === 'ascending' ? 1 : -1
    } else {
      return direction === 'ascending' ? -1 : 1
    }
  }

  return data.slice().sort(compare)
}


drillStatus(e, d){
  this.spinner.show();
  if (e.checked) {
    this.service.drillStatus(d.id, 1).subscribe(
      res => {
        console.log(res);
        
        if (res.message == 'drill subject updated') {
          this.service.openSnackbar(res.message)
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
    this.service.drillStatus(d.id, 0).subscribe(
      res => {
        console.log(res);
          
        if (res.message == 'drill subject updated') {
          
          this.service.openSnackbar(res.message)
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

addDrill() {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/drill-competition/add-drill']);
  if(this.router.url.includes('main/admin/Adjutant-Branch-Management'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/drill-competition/add-drill']);
}

viewDrill(ob) {
  if(this.router.url.includes('main/adjutant-branch'))
  this.router.navigate(['/main/adjutant-branch/drill-competition/view-drill'],{queryParams:{id:ob.id}});
  if(this.router.url.includes('main/admin/Adjutant-Branch-Management'))
  this.router.navigate(['/main/admin/Adjutant-Branch-Management/drill-competition/view-drill'],{queryParams:{id:ob.id}});
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


sortData(sort: Sort) {
  const datalist = this.DrillList.slice();
  if (!sort.active || sort.direction === '') {
    this.DrillList = datalist;
    return;
  }
  this.DrillList = datalist.sort((a: any, b: any) => {
    const isAsc = this.sort.direction === 'asc';
    switch (this.sort.active) {
      case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);  
      default: return 0;
    }
  });
  this.dataSource = new MatTableDataSource(this.DrillList);
  this.dataSource.paginator=this.paginator;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
