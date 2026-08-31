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
  selector: 'ms-datesheet',
  templateUrl: './datesheet.component.html',
  styleUrls: ['./datesheet.component.scss']
})
export class DatesheetComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name', 
  //'description',
  'status', 'document', 'action'];
  sortedData: any[];
  datesheetList:any[]=[];
  type:string;
  term:string;
  termId:number;
  
  constructor( private spinner: NgxSpinnerService,  private dialog:MatDialog,private _trgBattalion: TrgBattalionService,
    public sharedService:SharedService,
     private router: Router, private route:ActivatedRoute, private service: TrgTeamService) { 
      
      this.route.params.subscribe(
        (params)=>{
  console.log("ROUTE PARAMETERS",params);
  
          this.term = params.term
            
          if(params.term == "I Term"){
            this.termId = 1
            console.log(this.term);
            
          } else if (params.term == "II Term"){
            this.termId = 2
            console.log(this.term);
  
          } else if( params.term == "II Tech"){
            this.termId = 7
            console.log(this.term);
            
          }else if(params.term == "III Term"){
            this.termId = 3
            console.log(this.term);
  
          }
    this.getDateSheets()
          

        })
      

  }

  ngOnInit(): void {}  

  ngAfterViewInit(){
  }

  getDateSheets(){
    this.spinner.show();
    this.service.getAllDatesheets(this.termId).subscribe(
      res => {        
        console.log(res);
        
        if(res.status == '1'){
          this.datesheetList = res.List
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.datesheetList = []
          this.dataSource = [];
          this.spinner.hide();
          this.sharedService.openSnackbar(res.msg)
        }     
      },
      err =>{
        this.spinner.hide()
        this.sharedService.openSnackbar('Error Occured.');
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

  addDatesheet(){
    this.router.navigate(['/main/trg-team/gso-2-assessment/'+this.term+'/service-subjects/datesheet/add-datesheet'])
  }

  viewDatesheet(d){
    this.router.navigate(['/main/trg-team/gso-2-assessment/'+this.term+'/service-subjects/datesheet/view-datesheet'],{queryParams:{id:d.id}})
  }

  changeStatus(e,d){
    this.spinner.show();

    let status;
    if(e.checked){
      status = 1
    } else if(!e.checked){
      status = 0
    }

    this.service.changeDatesheetStatus(d.id, status).subscribe(
      res => {
        if(res.status == '1'){
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
        
      }
    )



    // if(e.checked){
    //   this.service.changeDatesheetStatus(d.id, 1).subscribe(
    //     res => {
    //       if(res.status == '1'){
    //         this.spinner.hide();
    //         this.sharedService.openSnackbar(res.message)
    //       } else {
    //         this.spinner.hide();
    //         this.sharedService.openSnackbar(res.message)
    //       }
          
    //     }
    //   )

    // } else {
    //   this.service.changeDatesheetStatus(d.id, 0).subscribe(
    //     res => {
    //       if(res.status == '1'){
    //         this.spinner.hide();
    //         this.sharedService.openSnackbar(res.message)
    //       } else {
    //         this.spinner.hide();
    //         this.sharedService.openSnackbar(res.message)
    //       }
    //     }
    //   )

    // }
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.datesheetList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.datesheetList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.datesheetList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
