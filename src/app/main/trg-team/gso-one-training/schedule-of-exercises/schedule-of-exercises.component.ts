import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-schedule-of-exercises',
  templateUrl: './schedule-of-exercises.component.html',
  styleUrls: ['./schedule-of-exercises.component.scss']
})
export class ScheduleOfExercisesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'exercise', 'season_term', 'term','resp','ds', 'recce', 'bbe', 'verbal', 'smd','duration','status','document', 'action'];
  sortedData: any[];
  scheduleList: any[] = [];


  constructor(private router: Router,private _trgBattalion:TrgBattalionService,
     private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private service: TrgTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.paginator);

  }

  ngAfterViewInit() {
    this.getScheduleOfExerciseList()
  }

  getScheduleOfExerciseList() {
    this.spinner.show();
    this.service.getScheduleOfExercisesList().subscribe(
      res => {
        this.spinner.hide();
        if (res.status == '1') {
          this.scheduleList = res.List;
         
          
          this.scheduleList=  this.scheduleList.map((res)=>({id:res.id,createdDate:res.createdDate,bbe:res.bbe,
            dsBriefing:res.dsBriefing,duration:res.duration,exercise:res.exercise,recceTewt:res.recceTewt,
            respDetails:res.respDetails.respType,smd:res.smd,
            term:res.term.name,termSeason:res.termSeason.name,
            verbalOrders:res.verbalOrders,year:res.year,
            status:res.status,url:res.url}))
          this.dataSource = new MatTableDataSource(this.scheduleList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
         
        }
        else {
          this.spinner.hide()
          this._trgBattalion.openSnackbar(res.msg)
        }
      },
      err => {
        this.spinner.hide();
        this._trgBattalion.openSnackbar('Some Error Occured.')
      }
    )
  }

  changeStatus(e: any, s) {
    this.spinner.show();
    if (e.checked) {
      this.service.changeSchduleOfExerciseStatus(s.id, 1).subscribe(
        res => {
          if (res.status == '1') {
            this.cdref.detectChanges();
            this._trgBattalion.openSnackbar(res.msg);
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar('Some Error Occured');
        })
    } else {
      this.service.changeSchduleOfExerciseStatus(s.id, 0).subscribe(
        res => {
          if (res.status == '1') {
            this.cdref.detectChanges()
            this._trgBattalion.openSnackbar(res.msg)
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar('Some Error Occured')
        })
    }
  }

  addSchedule() {
    this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-exercises/add-schedule'])
  }

  viewSchedule(s) {
    this.router.navigate(['/main/trg-team/gso-1-training/schedule-of-exercises/view-schedule'], { queryParams: { id: s.id } })
  }

  openDoc(doc) {
    console.log(doc);
    
    this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: doc.url
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
    const datalist = this.scheduleList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = datalist;
      return;
    }
    this.scheduleList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'exercise': return this._trgBattalion.compare(a.exercise.toLowerCase(), b.exercise.toLowerCase(), isAsc);
        case 'season_term': return this._trgBattalion.compare(a.termSeason, b.termSeason, isAsc);
        case 'term': return this._trgBattalion.compare(a.term, b.term, isAsc);
        case 'resp': return this._trgBattalion.compare(a.respDetails, b.respDetails, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.scheduleList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
