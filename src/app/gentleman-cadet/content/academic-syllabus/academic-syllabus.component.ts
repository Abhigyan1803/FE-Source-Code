import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GcService } from 'app/service/gc/gc.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-academic-syllabus',
  templateUrl: './academic-syllabus.component.html',
  styleUrls: ['./academic-syllabus.component.scss']
})
export class AcademicSyllabusComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['number', 'name','date','document',];  
selectedIndex = 0;

paper:string;
userDetails:any;
syllabusList:any[];
dataSource:any;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private service:GcService, private sharedService:SharedService,
   private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService, private dialog:MatDialog
    ) {
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object
   }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.getSyllabus('Paper 1','Military History')
  }

  syllabusTabChanged(e:any){
   
    let paper = e.tab.textLabel
    let subject:string;
    if(paper == 'Paper 1'){
      this.selectedIndex = 0;
      subject='Military History'
    } else if(paper == 'Paper 2'){
      this.selectedIndex = 0;
      subject='CAIR'
    } else if(paper == 'Paper 3'){
      subject='Science and Warfare'
    } else if(paper == 'Paper 4'){
      subject='SWT'
    } else if(paper == 'Paper 5'){
      subject='ECS'
    } else if(paper == 'Paper 6'){
      subject='IT'
    } 

    this.getSyllabus(paper,subject)
  }

  suubjectChanged(paper,e:any){
    this.selectedIndex = 0;
    let subject = e.tab.textLabel
    this.getSyllabus(paper,subject)
  }

  getSyllabus(paper,subject){
    this.service.getAcademicSyllabusList(this.userDetails.term,paper,subject,1).subscribe(
      res=>{
        if (res.status == "OK") {
          this.syllabusList = res.object
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar("Some Error Occured.")
        }
        
      },
      err =>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Some Error Occured.")
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


    
    
  sortData(sort: Sort){
    const datalist = this.syllabusList.slice();
    if (!sort.active || sort.direction === '') {
      this.syllabusList = datalist;
      return;
    }
    this.syllabusList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'date': return this.sharedService.compare(a.createdAt, b.createdAt, isAsc);
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
