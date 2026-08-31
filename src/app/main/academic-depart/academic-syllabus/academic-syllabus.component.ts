import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';


@Component({
  selector: 'ms-academic-syllabus',
  templateUrl: './academic-syllabus.component.html',
  styleUrls: ['./academic-syllabus.component.scss']
})
export class AcademicSyllabusComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
term:string;
paper:string;
subject:string;

termId:number;
dataSource:any;
syllabusList:any[]=[];
sTitle
displayedColumns: string[] = ['number', 'name','document','status','view'];  

constructor(private router:Router, private route:ActivatedRoute, private adminservice: AdminService,
  private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private dialog: MatDialog,
  public sharedService:SharedService, private service:AcademicDeptService,) {
   
  this.route.params.subscribe((params) => {
    this.term = params.term;
    this.paper = params.paper;
    this.subject = params.subject
    if(this.subject == "Science and Warfare"){
      this.sTitle = "Science & Warfare";
    } else {
      this.sTitle = params.subject;
    }
       
    if (this.term == "I Term") {
      this.termId=1;
    } else if (this.term == "II Term") {
      this.termId=2;
    } else if (this.term == "III Term") {
      this.termId=3;
    } else if (this.term == "II Tech") {
      this.termId=7;
    }

    this.getSyllabusList();

  });
 }

  ngOnInit(): void {
  } 

  getSyllabusList(){
    this.spinner.show();
    this.service.getSyllabusList(this.termId,this.paper,this.subject,2).subscribe(
      res=>{
        console.log(res);

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  addSubject(){
    this.router.navigate([`/main/academic-depart/syllabus/${this.term}/${this.paper}/${this.subject}/add-syllabus`])
    // this.router.navigate(['/main/academic-depart/syllabus/'+this.term+'/'+this.paper+'/add-syllabus'])
  }

  viewsyllabus(id){
    console.log(id);
    
    this.router.navigate([`/main/academic-depart/syllabus/${this.term}/${this.paper}/${this.subject}/view-syllabus`],
     { queryParams: { id:id } })
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

  changeSyllabusStatus(e, d) {
    this.spinner.show();
    if (e.checked) {
      this.service.updateSyllabusStatus(d.id, 1).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()

          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
    else {
      this.service.updateSyllabusStatus(d.id, 0).subscribe(
        res => {
          console.log(res);
            
          if (res.status == 'OK') {
            
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            // this.ngAfterViewInit();
            this.spinner.hide()
          }
          else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }

  

}
