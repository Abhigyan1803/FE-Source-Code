import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'ms-gentlemanly',
  templateUrl: './gentlemanly.component.html',
  styleUrls: ['./gentlemanly.component.scss']
})
export class GentlemanlyComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'date', 'name','description',
  //'term',
   'status', 'document', 'action'];
  sortedData: any[];
  syllabusList: any[];
  term:string;
  termId:number;

  constructor(private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private dialog: MatDialog, private _trgBattalion: TrgBattalionService,
    private router: Router, private route: ActivatedRoute, private service: TrgTeamService) {

      this.route.params.subscribe(
        params=>{
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
          this.ngAfterViewInit();
                  
        }
      )


  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getSyllabusList();
  }

  getSyllabusList() {
    this.spinner.show()
    this.service.getSyllabusList('Gentlemanly',this.termId,1).subscribe(
      res => {
        console.log(res);
        
        if (res.status == "OK") {
          this.syllabusList = res.object;
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        this.spinner.hide();
      },(err)=>{
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Some Error Occurred')
      })
  }

  addSyllabus() {
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/gentlemanly/add-syllabus'])
    } else {
      this.router.navigate(['/main/trg-team/gso-2-pgme/'+this.term+'/syllabus/gentlemanly/add-syllabus'])
    }
  }

  viewSyllabus(s) {
    
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/gentlemanly/view-syllabus'], { queryParams: { id: s.id } })
      
    } else {
      this.router.navigate(['/main/trg-team/gso-2-pgme/'+this.term+'/syllabus/gentlemanly/view-syllabus'], { queryParams: { id: s.id } })
    }
  }

  openDoc(d) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'Syllabus Gentlemanly', url: d
      }
    });
  }

  changeStatus(e,l){
    this.spinner.show();
    if(e.checked){
      this.service.updateSyllabusStatus(l.id,1).subscribe(
        res =>{    
          if(res.status == 'OK'){
            this._trgBattalion.openSnackbar("Status updated successfully")
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');       
        })
      this.spinner.hide();
    }
    else {    
      this.service.updateSyllabusStatus(l.id,0).subscribe(
        res =>{       
          if(res.status == 'OK'){
            this._trgBattalion.openSnackbar("Status updated successfully")
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.');
        })
      this.spinner.hide();
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
    const datalist = this.syllabusList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.syllabusList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
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
