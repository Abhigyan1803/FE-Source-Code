import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'createdAt', 'document', 'status', 'action'];
  examScheduleList: any[] = [];
  term;
  subTypes: string[] = ['General Instruction', 'Resp of Eval','Resp of Invigilation', 'Confirmation of Marks', 'Retest'];
  type = 'BMT-2';
  subType: string;
  termId: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: TrgTeamService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {
    this.route.params.subscribe(
      (params) => {
        this.dataSource = null;
        this.examScheduleList = [];

        // console.log(params);

        this.subType = params.subType;
        this.term = params.term;

        if (this.term == 'I Term') {
          this.termId = 1;
        } else if (this.term == 'II Term') {
          this.termId = 2;
        } else if (this.term == 'III Term') {
          this.termId = 3;
        } else if (this.term == 'II Tech') {
          this.termId = 7;
        } else {
          this.router.navigate(['/main/trg-team/dashboard'])
          this.sharedService.openErrorSnackbarWithSeconds('Error!', 3)
        }

        if (!this.subTypes.includes(this.subType)) {
          this.router.navigate(['/main/trg-team/dashboard'])
          this.sharedService.openErrorSnackbarWithSeconds('Error!', 3)
        }

        this.getExamSchedule(this.termId, this.type, this.subType);

      }
    )
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }




  getExamSchedule(termId, type, subType) {


    this.spinner.show();
    this.service.getExamScheduleList(termId, type, subType).subscribe(res => {
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

  addExamSchedule() {
    this.router.navigate([`/main/trg-team/gso-2-assessment/${this.term}/service-subjects/${this.type}/${this.subType}/add-exam-schedule`]);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(element) {
    this.router.navigate([`/main/trg-team/gso-2-assessment/${this.term}/service-subjects/${this.type}/${this.subType}/view-exam-schedule`], { queryParams: { id: element.id } })
  }


  sortData(sort: Sort) {
    const datalist = this.examScheduleList.slice();
    if (!sort.active || sort.direction === '') {
      this.examScheduleList = datalist;
      return;
    }
    this.examScheduleList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.examScheduleList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDoc(e) {
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "Document", url: e.document
        }
      }
    )
  }


  

  changeStatus(e, d) {
    let status: number;
    if (e.checked)
      status = 1;
    else
      status = 0;
    this.spinner.show();
    this.service.changeExamScheduleStatus(d.id, status).subscribe(
      res => {
        if (res.status == '1') {
          this.sharedService.openSnackbar(res.message)
          this.cdref.detectChanges();
          // this.ngAfterViewInit();
          this.spinner.hide()
        }
        else {
          this.spinner.hide()
          this.sharedService.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar('Error Occured.')
      }
    )
    this.spinner.hide();
  }

}
