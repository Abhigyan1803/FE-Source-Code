import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-exam-shedule',
  templateUrl: './exam-shedule.component.html',
  styleUrls: ['./exam-shedule.component.scss']
})
export class ExamSheduleComponent implements OnInit {
  cadetDetails:any={}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  dataSource: any;
  dataSourceAcademicSubjects:any;
  displayedColumns: string[] = ['number', 'date', 'name', 'description','document'];

  bmt1SelectedIndex:number
  bmt2SelectedIndex:number

  sortedData: any[];
  examScheduleList:any[]=[];

  type:string;
  
  constructor( private spinner: NgxSpinnerService,  private dialog:MatDialog,private _trgBattalion: TrgBattalionService,
     private router: Router, private route:ActivatedRoute, private service: TrgTeamService, private cdref:ChangeDetectorRef, public sharedService:SharedService) { 
      this.cadetDetails = JSON.parse(localStorage.getItem("loginResponse")).object;
  
    this.route.params.subscribe((params) => {
      this.type = params.type;
      this.ngAfterViewInit();
    });
    }

  ngOnInit(): void {
  }  

  ngAfterViewInit(){
    this.getDateSheets()
  }

  getDateSheets(){
    this.examScheduleList = [];
    this.dataSource = null;
    // this.spinner.show();
    this.service.getAllDatesheets(this.cadetDetails.term).subscribe(
      res => {        
        if(res.status == '1'){
          this.examScheduleList = res.List
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          // this.spinner.hide()
        }     
      },
      err =>{
        this.spinner.hide()
        this._trgBattalion.openSnackbar('Error Occured.');
      }
    )
  }


  mainTabChanged(event){
    const label = event.tab.textLabel
    if(label == 'Exam Schedule'){
      this.getDateSheets()
    } else if(label == 'BMT-1') {
      this.bmt1SelectedIndex = 0;
      this.getBmtExamSchedule('BMT-1','General Instruction')
    
    } else if(label == 'BMT-2') {
      this.bmt2SelectedIndex = 0;
      this.getBmtExamSchedule('BMT-2','General Instruction')

    }
    
    
  }

  bmt1TabChanged(event){
    console.log('BMT-1: ',event);
    const subType = event.tab.textLabel;
    this.getBmtExamSchedule('BMT-1',subType)
  }
  
  bmt2TabChanged(event){
    console.log('BMT-2: ',event);
    const subType = event.tab.textLabel;
    this.getBmtExamSchedule('BMT-2',subType)

  }



  getBmtExamSchedule(type,subType){
    this.examScheduleList = [];
    this.dataSource = null;

    this.service.getExamScheduleList(this.cadetDetails.term, type, subType).subscribe(res => {
      // console.log(res);

      if (res.status == "1") {
        this.examScheduleList = res.List;
        this.dataSource = new MatTableDataSource(res.List);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();


      }
      else {
        this.spinner.hide()
        this.sharedService.openSnackbar(res.msg)
      }
    },
      err => {
        this.spinner.hide()
        this.sharedService.openSnackbar("Some Error Occured.");
      }

    )
  }


































  openDoc(d){
      this.dialog.open(DialogComponent, {
      width: '1300px',height:'650px',
      data: {
        type:'document',url:d.document
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
    const datalist = this.examScheduleList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.examScheduleList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this._trgBattalion.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.examScheduleList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
