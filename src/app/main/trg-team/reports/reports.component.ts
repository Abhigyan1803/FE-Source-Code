import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';


interface AllReports {
  term1?: any[]
  term2?: any[]
  term3?: any[]
  tech2?: any[]
}
@Component({
  selector: 'ms-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  terms: string[] = ['I Term', 'II Term', 'II Tech', 'III Term'];
  term: string;
  termId: number;
  allReports: AllReports;
  report: any[] = [];
  showSpinner: boolean = true;
  fileName:string;
  constructor(
    private router: Router, private route: ActivatedRoute, private service: TrgTeamService, private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef, private sharedService: SharedService,
  ) {

  }

  ngOnInit(): void {
  }

  getReports() {
    this.service.getGCReports().subscribe(
      res => {
        console.log(res);
        this.allReports = res.object;

        if (this.allReports) {
          this.showSpinner = false;
          this.route.params.subscribe(
            (params) => {
              this.term = params.term;
              this.cdref.detectChanges();
              if (!this.terms.includes(params.term)) {
                this.router.navigate(['/main/trg-team/dashboard'])
              } else {
                if (this.term == 'I Term') {
                  this.report = this.allReports.term1
                  this.cdref.detectChanges();

                } else if (this.term == 'II Term') {
                  this.report = this.allReports.term2
                  this.cdref.detectChanges();

                } else if (this.term == 'II Tech') {
                  this.report = this.allReports.tech2
                  this.cdref.detectChanges();

                } else if (this.term == 'III Term') {
                  this.report = this.allReports.term3
                  this.cdref.detectChanges();
                }
              }
              // console.log(this.report);
            }
          )

        }

        this.cdref.detectChanges();

      }
    )
  }

  returnResult(total,obtained){
    let result = '-';
    if(obtained){
    total = parseInt(total);
    obtained = parseInt(obtained)
    const passingMarks = total*40/100;
    if(obtained<passingMarks)
    result = 'FAIL' 
    else 
    result = '-' 
    } 
    return result;
  }

  failArr:string[] = ['fail','Fail','FAIL','failed','Failed','FAILED'];
  returnFail(remark){
    let res = '-';
    if(this.failArr.includes(remark)){
    res = 'Fail';
  }
    else{
    res = '-';
  }

    return res;
  }

  ngAfterViewInit() {
    this.getReports();

  }

  exportToExcel() {
    let tbl;
    if (this.term == 'I Term') {
      tbl = document.getElementById('table_I_Term')
      this.fileName = 'Reports_I_Term.xlsx'
    } else if (this.term == 'II Term') {
      tbl = document.getElementById('table_II_Term')
      this.fileName = 'Reports_II_Term.xlsx'
    } else if (this.term == 'II Tech') {
      tbl = document.getElementById('table_II_Tech')
      this.fileName = 'Reports_II_Tech.xlsx'
    } else if (this.term == 'III Term') {
      tbl = document.getElementById('table_III_Term')
      this.fileName = 'Reports_III_Term.xlsx'
    }



    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tbl);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);

  }


}
