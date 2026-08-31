import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'ms-ed-dashboard',
  templateUrl: './ed-dashboard.component.html',
  styleUrls: ['./ed-dashboard.component.scss']
})
export class EdDashboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  EDForm: FormGroup;
  battalionPosts: any[] = [];
  battalionList: any[] = [];
  companyList: any[] = [];
  id;
  pageTitle;
  edCadetList;
  isTerm: boolean;
  terms: any[];
  termid: any;
  battleid: any;
  companyid:any;
  pageEvent: PageEvent;
  resultsLength: number;
  serviceid: any;

  
  constructor(private EDossierService: EDossierService,private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private service: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) {

    this.EDForm = this.fb.group({
      rank: ['', Validators.required],
      name: ['', Validators.required],
      awards: [''],
      post: ['', Validators.required],
      battalion: ['', Validators.required],
      company: ['0'],
      image: [],
      status: ['1', Validators.required]
    });

    


  }

 

  ngOnInit(): void {
   
    

    this.getTerms();
    this.service.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.battalionList = res.object
          this.cdref.detectChanges();
          this.spinner.hide()
        } else {
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
      }
    )
  }

  ngAfterViewInit() {
    this.EdAllList();    
    // this.edSearch();
  }

  termChange(e:any){
    this.termid=e;
  }

  EdAllList(event?:PageEvent){
    // this.EDossierService.getEDossierAllList(this.paginator.pageIndex,100).subscribe(
    //   res => {
    //     this.spinner.show();
    //     if (res.status == 'OK') {
    //       this.edCadetList = res.object
    //       this.cdref.detectChanges();
    //       this.spinner.hide()
    //     } else {
    //       this.spinner.hide();
    //     }
    //   }, err => {
    //     this.spinner.hide();
    //   }
    // )


    merge(/* this.sort.sortChange,  */this.paginator.page)
  .pipe(
    startWith({}),
    switchMap(() => {
      this.spinner.show()
      return this.EDossierService.getEDossierAllList(this.paginator.pageIndex, this.paginator.pageSize)
    }), map(data => {
      // this.getTotalRecords();
      this.resultsLength = data.object.totalRecords;
      return data;
    }),
    catchError(() => {
      console.log('Error here')
      this.spinner.hide()
      return observableOf([]);
      // return null;
    })
  ).subscribe(data => {
    if (data.status == 'OK') {
      this.edCadetList = data.object.cadetFilterPayload;
      if (data.object.cadetFilterPayload.length > 0){
        this.edCadetList = data.object.cadetFilterPayload;
      }
      else{
        this.edCadetList = []}
      this.cdref.detectChanges();
    }
    else {
      this.edCadetList = []
    }
    this.spinner.hide()
    // var scrollElem = document.querySelector('#orders');
    // scrollElem.scrollIntoView();
  });

  }

  battalionSelected(e: any) {
this.battleid=e;
    this.spinner.show();
    this.service.getCompanyList(e).subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.companyList = res.object
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide()
        }
      },
      err => {
        this.spinner.hide();
      }
    )
  }

  companySelected(e: any) {
    this.companyid=e;
        
      }
      
shortname;
  edSearch(event?:PageEvent) {
    // if(this.battleid == 0){
    //   this.shortname = '';
    // }
    if(this.battleid == 1){
      this.shortname = 'CA';
    }
    if(this.battleid == 2){
      this.shortname = 'TH';
    }
    if(this.battleid == 3){
      this.shortname = 'MA';
    }
    if(this.battleid == 4){
      this.shortname = 'BH';
    }
    this.spinner.show();
    
    // this.EDossierService.getEDossierList(this.termid,this.shortname,this.paginator.pageIndex,this.paginator.pageSize).subscribe(

    //   res => {
    //     if (res.status == "OK") {
    //       this.edCadetList = res.object;
    //       // this.edCadetList = this.edCadetList.map((res) => ({ id: res.id, date: res.createdAt, rank: res.rank, name: res.name, post: res.position?.name, image: res.image, status: res.status }))
    //       this.spinner.hide()
    //     } else {
    //       this.spinner.hide();
    //       this.service.openSnackbar(res.message)
    //     }
    //   },
    //   err => {
    //     this.spinner.hide();
    //     console.log(JSON.stringify(err));
    //   }
    // )


    
  merge(/* this.sort.sortChange,  */this.paginator.page)
  .pipe(
    startWith({}),
    switchMap(() => {
      this.spinner.show()
      return this.EDossierService.getEDossierList(this.termid,this.shortname,this.companyid,this.paginator.pageIndex, this.paginator.pageSize)

    }), map(data => {
      // this.getTotalRecords();
      this.resultsLength = data.object.totalRecords;
      
      return data;
    }),
    catchError(() => {
      console.log('Error here')
      this.spinner.hide()
      return observableOf([]);
      // return null;
    })
  ).subscribe(data => {
    if (data.status == 'OK') {
      this.edCadetList = data.object.cadetFilterPayload;

      // if (data.object.length > 0){
      //   this.edCadetList = data.object;
      // console.log(this.edCadetList,"call")
      // }
      // else{
      //   this.spinner.hide();
      //         this.service.openSnackbar(data.message) 
      // }
      this.cdref.detectChanges();
    }
    else {
      this.spinner.hide();
      this.service.openSnackbar(data.message) 
      this.edCadetList = []
    }
    this.spinner.hide()
    // var scrollElem = document.querySelector('#orders');
    // scrollElem.scrollIntoView();
  });

  }
 getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        if (res.status == '1') {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }
  
  OnclickSubmenuLink(e:any) {
    // this.router.navigate(['/e-dossior/ed-content/Ed-index/ED-Campmarks/assessment-matrix'],{queryParams:{termid:e.termId}});
  }

  sID(e:any,i:any,j:any,companyName,battalionName,nationality,courseNo,termId,termName, obj){
    console.log(courseNo,"==>>>courseNo");
    localStorage.setItem('e', e); // setting
    localStorage.setItem('i', i); // setting
    localStorage.setItem('j', j); // setting
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('battalionName', battalionName);
    localStorage.setItem('rank', (nationality=='India'?'GC':'FGC'));
    localStorage.setItem('courseNo', courseNo);
    localStorage.setItem('termId', termId);
    localStorage.setItem('termName', termName);
  

    this.EDossierService.setCadetObj(JSON.stringify(obj))
   
    // localStorage.setItem('cadet',JSON.stringify(obj))

  }

}
