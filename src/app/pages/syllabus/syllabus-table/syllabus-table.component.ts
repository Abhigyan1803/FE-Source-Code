import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { HomePageService } from 'app/service/home/home-page.service';
import { MatSort, Sort } from '@angular/material/sort';
import { SharedService } from 'app/service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ms-syllabus-table',
  templateUrl: './syllabus-table.component.html',
  styleUrls: ['./syllabus-table.component.scss']
})

export class SyllabusTableComponent implements OnInit {

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

displayedColumns: string[]= ['number', 'name', 'date', 'description', 'document',];
syllabusList
syllabusType
dataSource
dataSubscribe:Subscription


constructor( private cdref: ChangeDetectorRef, private dialog: MatDialog, public homepageService:HomePageService,
    public sharedService:SharedService){}
  ngOnInit(): void {
  this.dataSubscribe = this.homepageService.getHomePageSyllabus.subscribe(res=>{
      // console.log("RESPONSE: ",res);
      
      this.setSyllabusTable(res)
    })
  }
 
 

  setSyllabusTable(data){ 

     if(data.type == 'service'){
        this.displayedColumns = ['number', 'name', 'date', 'description', 'document',]
      } else if(data.type == 'academic'){
        this.displayedColumns =  ['number', 'name','document']
      }

    this.syllabusType = data.type;
   
    this.syllabusList = data.data
    this.dataSource = new MatTableDataSource(data.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
      this.cdref.detectChanges();
  }


  openDoc(s) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: s.name, url: s.doc
      }
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.syllabusList.slice();
    if (!sort.active || sort.direction === '') {
      this.syllabusList = datalist;
      return;
    }
    this.syllabusList = datalist.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return this.sharedService.compare(a.date, b.date, isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.syllabusList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

ngOnDestroy(){
  this.dataSubscribe.unsubscribe()
}

}
