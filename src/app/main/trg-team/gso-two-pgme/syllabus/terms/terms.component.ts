import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name','term','description', 'status', 'document', 'action'];
  sortedData: any[];

  syllabusList:any[]=[];
  
  constructor( private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog:MatDialog,
    private _trgBattalion: TrgBattalionService,private router: Router,  private service: TrgTeamService) { 
     }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.getTermSyllabuses();
  }
  

  getTermSyllabuses(){
    this.spinner.show();
    this.service.getTermSyllabus().subscribe(
      res => {
        console.log(res);
        if(res.status == 'OK'){
          this.syllabusList = res.object;
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
          this.cdref.detectChanges();
        }
        else {
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.message)
        }
        
      },
      err => {

        this.spinner.hide()
        this._trgBattalion.openSnackbar('Error Occured.')

      }
    )
  }

  changeStatus(e,l){
    this.spinner.show();
    if(e.checked){
      this.service.updateTermSyllabusStatus(l.id,1).subscribe(
        res =>{    
          if(res.status == 'OK'){
            this._trgBattalion.openSnackbar("Status updated successfully")
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');       
        }
        )
      this.spinner.hide();
    }
    else {    
      this.service.updateTermSyllabusStatus(l.id,0).subscribe(
        res =>{       
          if(res.status == 'OK'){
            this._trgBattalion.openSnackbar("Status updated successfully")
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');
        }
        )
      this.spinner.hide();
    }
  }

  addSyllabus(){
    this.router.navigate(['/main/trg-team/gso-2-pgme/syllabus/terms/add-syllabus'])
  }
  
  viewSyllabus(s){
    this.router.navigate(['/main/trg-team/gso-2-pgme/syllabus/terms/view-syllabus'],{queryParams:{id:s.id}})
  }




  openDoc(s){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',height:'600px',
      data: {
        type:'document',url:s.doc
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
      this.sortedData = datalist;
      return;
    }
    this.syllabusList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.date, b.date, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'term': return this._trgBattalion.compare(a.term, b.term, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.syllabusList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  


}
