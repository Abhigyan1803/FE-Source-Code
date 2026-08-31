import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';

@Component({
  selector: 'ms-academic-subjects',
  templateUrl: './academic-subjects.component.html',
  styleUrls: ['./academic-subjects.component.scss']
})
export class AcademicSubjectsComponent implements OnInit {

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


term:string;
paper:string;
subject:string;
termId:number;

dataSource:any;
subjectList:any[]=[];
displayedColumns: string[] = ['number', 'date',/*'status',*/'topics','view'];

sTitle;
papers:string[]=['Paper 1','Paper 2','Paper 3','Paper 4','Paper 5','Paper 6'];

  constructor(private router:Router, private route:ActivatedRoute, 
    private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private dialog: MatDialog,
    public sharedService:SharedService, private service:AcademicDeptService) {
     
    this.route.params.subscribe((params) => {
      this.term = params.term;
      this.paper = params.paper;
      this.subject = params.subject;

      if(this.subject == "Science and Warfare"){
        this.sTitle = "Science & Warfare";
      } else {
        this.sTitle =params.subject;
      }


     
      
      if (this.term == "I Term") {
        this.termId=1;
      } else if (this.term == "II Term") {
        this.termId=2;
      } else if (this.term == "III Term") {
        this.termId=3;
      } else if (this.term == "II Tech") {
        this.termId=7;
      } else {
        this.sharedService.openErrorSnackbarWithSeconds('Error!',5);
        this.router.navigate(['/main/academic-depart/dashboard'])
      }
      if(!this.papers.includes(this.paper)){
        
        this.sharedService.openErrorSnackbarWithSeconds('Error!',5);
        this.router.navigate(['/main/academic-depart/dashboard'])
        
      }

      this.getSubjectsList();

    });
   }

  ngOnInit(): void {

  }


  getSubjectsList(){
    this.spinner.show();
    this.service.getSubjectsList(this.termId,this.paper,this.subject).subscribe(
      res=>{
        console.log(res);

        if (res.status == "OK") {
          this.subjectList = res.object

          // this.dataSource = new MatTableDataSource(res.object);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;

          
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
  
  // sortData(sort: Sort){
  //   const datalist = this.subjectList.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.subjectList = datalist;
  //     return;
  //   }
  //   this.subjectList = datalist.sort((a: any, b: any) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
  //       case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
  //       default: return 0;
  //     }
  //   });
  //   this.dataSource = new MatTableDataSource(this.subjectList);
  //   this.dataSource.paginator = this.paginator;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

//change in route add term last
  addSubject(){
    // this.router.navigate(['/main/academic-depart/subjects/'+this.term+'/'+this.paper+'/'+this.subject+'/add-subject'])
    this.router.navigate(['/main/academic-depart/subjects/'+this.paper+'/'+this.subject+'/'+this.term+'/add-subject'])
  }

  viewSubject(element){
    console.log(element);
    
    // this.router.navigate(['/main/academic-depart/subjects/'+this.term+'/'+this.paper+'/'+this.subject+'/view-subject'],
    this.router.navigate(['/main/academic-depart/subjects/'+this.paper+'/'+this.subject+'/'+this.term+'/view-subject'],
     { queryParams: { id: element.academicTermId } })
  }
  //delete subject
  deleteSubject(topic:any){
    console.log(topic);
    const dialogRef = this.dialog.open( DeleteSubjectComponent, {
      width: '400px',
      height: '150px',
      data: {topic:topic},
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('add modal close works');
      this.getSubjectsList();
    });
    
  }
}
