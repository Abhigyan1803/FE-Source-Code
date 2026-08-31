import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GcService} from 'app/service/gc/gc.service'
import {SharedService} from 'app/service/shared.service'

import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DialogComponent } from 'app/Shared/dialog/dialog.component';


@Component({
  selector: 'ms-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  
  type: string="";
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['number', 'date', 'name', 'document'];
  syllabusList:any[]=[];
  dataSource:any;
  
  selectedIndexForBMT2
  // bmtDisplayedColumns: string[] = ['number', 'date', 'name','description', 'document'];
  // bmtSyllabusList:[]=[];
  // bmtDataSource:any;

  cadetDetails;


  constructor(private route:ActivatedRoute, private router:Router, private gcService:GcService,
    private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private dialog: MatDialog,
    public sharedService:SharedService
    ) { 

    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object

    this.route.params.subscribe((params) => {
      this.type = params.type;
    
    });

  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.getBMTSyllabusList('BMT-1');

  }


  mainTabChanged(e){

    if(e.tab.textLabel != "BMT-2"){
    if(e.tab.textLabel == "BMT-1"){
      
      this.getBMTSyllabusList("BMT-1");
    } else{
      this.getSyllabusList(e.tab.textLabel);
    }
    } else {
      this.getBMTSyllabusList('Map Reading')
      this.selectedIndexForBMT2 = 0;

    } 
  }

  bmt2TabChanged(e){
    this.getBMTSyllabusList(e.tab.textLabel);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSyllabusList(type){
    
    this.syllabusList = [];
    this.dataSource = null;

    this.gcService.getSyllabusList(type,this.cadetDetails.term,1).subscribe(
      res => {
        
        if (res.status == "OK") {
          this.syllabusList = res.object;
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



  getBMTSyllabusList(type){
    let sType;
    
    
    if(type == "O&A and I&S"){
      sType = "OnA and InS"
    } else {
      sType = type;
    }
    
    
    this.syllabusList = [];
    this.dataSource = null;


    this.gcService.getSyllabusList(sType,this.cadetDetails.term,1).subscribe(
      res => {
        
        if (res.status == "OK") {
          this.syllabusList = res.object;
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

  sortData(sort:Sort){
    const datalist = this.syllabusList.slice();
    if (!sort.active || sort.direction === '') {
      this.syllabusList = datalist;
      return;
    }
    this.syllabusList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {

        case 'date': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
      
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.syllabusList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openDoc(e,title){
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:title, url: e.doc
        }
      }
      )
    }
}
