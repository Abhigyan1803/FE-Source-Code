import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GcService } from 'app/service/gc/gc.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-academic-exam-schedule',
  templateUrl: './academic-exam-schedule.component.html',
  styleUrls: ['./academic-exam-schedule.component.scss']
})
export class AcademicExamScheduleComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  academicExaminationSchedule
  dataSource: any;
  cadetDetails:any;
  displayedColumns: string[] = ['number', 'name', 'uploadedDate', 'document'];


  constructor(private router: Router, private service: GcService, private sharedService:SharedService
    , public dialog: MatDialog , private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService) { 
    this.cadetDetails = JSON.parse(localStorage.getItem("loginResponse")).object;

   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAcademicExamSchedule()
  }

  getAcademicExamSchedule(){
    this.spinner.show();
    this.service.getAcademicExaminationSchedule('Academic Exam Schedule', this.cadetDetails.term).subscribe(res => {
      // console.log(res);

      if (res.status == "OK") {
        this.academicExaminationSchedule = res.object;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();

      }
      else {
        this.spinner.hide()
        this.sharedService.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.sharedService.openSnackbar('Some Error Occured')
      }

    )
  }

  
  openDoc(e) {

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "Document", url: e.url
        }
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
    const datalist = this.academicExaminationSchedule.slice();
    if (!sort.active || sort.direction === '') {
      this.academicExaminationSchedule = datalist;
      return;
    }
    this.academicExaminationSchedule = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'uploadedDate': return this.sharedService.compare(a.uploadedDate, b.uploadedDate, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.academicExaminationSchedule);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
