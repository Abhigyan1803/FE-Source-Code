import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {GcService} from 'app/service/gc/gc.service'
import {SharedService} from 'app/service/shared.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
 
  type: string="";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['number', 'date', 'name','description', 'document'];
  subjectsList:any[]=[];
  dataSource:any;
  cadetDetails;
  bmtDisplayedColumns: string[] = ['number', 'date', 'name','description', 'document'];
  bmtSyllabusList:[]=[];
  bmtDataSource:any;

  selectedIndexForBMT2;

  constructor(private route:ActivatedRoute, private router:Router, private gcService:GcService,
    private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private dialog: MatDialog,
    public sharedService:SharedService
    ) { 

    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object

    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getSubjectsList('BMT-1');
  }

  
  mainTabChanged(e){
    // console.log("MAIN TAB CHANGED: ",e)
    // console.log(e.tab.textLabel);

    if(e.tab.textLabel != "BMT-2"){
    if(e.tab.textLabel == "BMT-1"){
      
      this.getBMTSubjectsList("BMT-1");
    } else{
      this.getSubjectsList(e.tab.textLabel);
    }
    } else {
      this.getBMTSubjectsList('Map Reading')
      this.selectedIndexForBMT2 = 0;
    } 
  }

  bmt2TabChanged(e){
    // console.log("BMT 2 TAB CHANGED: ",e)
    console.log(e.tab.textLabel);
    let sType:string = e.tab.textLabel;

    if( e.tab.textLabel == "O&A and I&S"){
      sType =  "OnA and InS"
    } else {
      sType = e.tab.textLabel
    }


    this.getBMTSubjectsList(sType);

  }
  
  getSubjectsList(BMT1){
    console.log(BMT1);
    this.subjectsList = [];
    this.dataSource = null

    this.gcService.getSubjectsLists(BMT1,this.cadetDetails.term).subscribe(
      res => {
        console.log("subjects",res);
        
        if (res.status == "OK") {
          this.subjectsList = res.object;
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        this.spinner.hide();
      },(err)=>{
        this.spinner.hide();
        this.sharedService.openSnackbar('Some Error Occurred')
      }
    )
  }
  openDoc(e){
  
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"Document", url: e.doc
        }
      }
      )
    }
    
  getBMTSubjectsList(type){
    console.log(type);
    this.subjectsList = [];
    this.dataSource = null;
  
  
  this.gcService.getSubjectsLists(type,this.cadetDetails.term).subscribe(
    res => {
      console.log(res);
      
      if (res.status == "OK") {
        this.subjectsList = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      this.spinner.hide();
    },(err)=>{
      this.spinner.hide();
      this.sharedService.openSnackbar('Some Error Occurred')
    }
  )
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.subjectsList.slice();
    if (!sort.active || sort.direction === '') {
      this.subjectsList = datalist;
      return;
    }
    this.subjectsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.subjectsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




