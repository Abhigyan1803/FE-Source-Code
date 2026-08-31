import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number','date', 'name','description','status','document','action'];
  sortedData:any[];
  transportList:any[];

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,private _trgBattalion:TrgBattalionService,
    private router: Router,private _trgTeam:TrgTeamService,  public dialog: MatDialog) { }

  ngOnInit(): void {
  
  }
  ngAfterViewInit(){
    this.getTransport();
  }


  getTransport(){   
  this._trgTeam.getTransport().subscribe(res =>{
    if(res.status=="1"){
      this.transportList=res.List ;
      this.dataSource= new MatTableDataSource(res.List);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    else{

    }
    
  } ,err =>{
    this.spinner.hide()
    this._trgBattalion.openSnackbar('Error Occured.');
  })
  }
  
  openDoc(l){  
   this.dialog.open(DialogComponent, {
      width: '1200px',height:'600px',
      data: {
        type:'document',url:l.document
      }
    });
  }

  changeStatus(e,l){
    console.log(e,l); 
    this.spinner.show();
    if(e.checked){
      this._trgTeam.changeTransportStatus(l.id,1).subscribe(
        res =>{
          
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.')
          
        }
      )
      this.spinner.hide();
    }
    else {
      
      this._trgTeam.changeTransportStatus(l.id,0).subscribe(
        res =>{
          
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }
  
  addTransport(){
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['main/admin/trg-team/adventure-cell/add/transport']);
        } else {
    this.router.navigate(['main/trg-team/adventure-cell/add/transport']);
        }
  }

  viewTransport(id){
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['main/admin/trg-team/adventure-cell/view/transport/'+id]);
          } else {
    this.router.navigate(['main/trg-team/adventure-cell/view/transport/'+id]);
          }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    
  sortData(sort: Sort) {
    const datalist = this.transportList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.transportList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.transportList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


