import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';

@Component({
  selector: 'ms-season-terms',
  templateUrl: './season-terms.component.html',
  styleUrls: ['./season-terms.component.scss']
})
export class SeasonTermsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  displayedColumns: string[] = ['number',  'seasonTerm', 'seasonYear', 'startDate', 'endDate' /**, 'view'*/];
  seasonTermsList: any[] = []
  constructor(private router: Router, private service: TrgTeamService, private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService, private sharedService:SharedService
    ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getSeasonTermsList()
  }

  getSeasonTermsList() {
    this.spinner.show()
    this.service.getAllSeasonTerms(1).subscribe(
      res => {
        console.log(res);
        
        if (res.status == "OK") {
          this.seasonTermsList = res.object
          this.dataSource = new MatTableDataSource(res.object);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
        }
        // console.log(res);
        this.spinner.hide()
      },
      err => {
        this.sharedService.openSnackbar('Error Occured.')
        this.spinner.hide();
      }
    )
  }

  addSeasonTerm() {

    if(this.router.url.includes('main/trg-team'))
    this.router.navigate(['/main/trg-team/gso-2-pgme/season-terms/add-season-term'])

    if (this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/trg-team/gso-2-pgme/season-terms/add-season-term'])
  
  }


  applyFilter(event: Event) {
    // console.log(event);
    
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
     
  }


  sortData(sort: Sort) {
    const datalist = this.seasonTermsList.slice();
    if (!sort.active || sort.direction === '') {
      this.seasonTermsList = datalist;
      return;
    }
    this.seasonTermsList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'startDate': return this.sharedService.compare(a.startDate, b.startDate, isAsc);
        case 'endDate': return this.sharedService.compare(a.endDate, b.endDate, isAsc);
        case 'seasonTerm': return this.sharedService.compare(a.termSeason.name.toLowerCase(), b.termSeason.name.toLowerCase(), isAsc);
        case 'seasonYear': return this.sharedService.compare(a.sessionYear, b.sessionYear, isAsc);

        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.seasonTermsList);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
