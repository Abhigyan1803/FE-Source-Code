import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';

@Component({
  selector: 'ms-bmt2',
  templateUrl: './bmt2.component.html',
  styleUrls: ['./bmt2.component.scss']
})
export class Bmt2Component implements OnInit {
type:string;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
dataSource: any;
displayedColumns: string[] = ['number', 'name','createdAt','description','document',
//'term',
'status','action'];  
bmt2: any[] = [];
sName;
term:string;
termId:number;

  
constructor(private router: Router,private route:ActivatedRoute, private service:TrgTeamService, private adminservice: AdminService, private spinner:NgxSpinnerService,
  private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {

    this.route.params.subscribe(
      (params)=>{
console.log("ROUTE PARAMETERS",params);

        this.type = params.type;

        if(this.type == "OnA and InS"){
          this.sName = "O&A and I&S"
        } else {
          this.sName = this.type;
        }

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
        console.log(this.type,"type route");
        this.ngAfterViewInit();
      }
    )

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getbmt2(this.type)
  }
  getbmt2(BMT2){
    this.spinner.show();
  this.service.getSyllabusList(BMT2,this.termId,2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.bmt2=res.object ;
      this.dataSource = new MatTableDataSource(res.object);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
      this.cdref.detectChanges();
  console.log(res,"=================");
  
    }
    else{
      this.spinner.hide()
      this.sharedService.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    this.sharedService.openSnackbar("Some Error Occured.");
  }
  
  )
  }
  
  addBMT2() {
    if(this.router.url.includes('main/trg-team'))
    this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-2/'+this.type+'/add-bmt2']);
    if(this.router.url.includes('main/admin/trg-team'))
    this.router.navigate(['main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-2/'+this.type+'/add-bmt2']);
    
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
  
  viewMark(id) {

    if(this.router.url.includes('main/trg-team'))
    this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-2/'+this.type+'/view-bmt2'],{queryParams:{id:id}})  
    if(this.router.url.includes('main/admin/trg-team'))
    this.router.navigate(['main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-2/'+this.type+'/view-bmt2'],{queryParams:{id:id}})  
  



    }
  
  
  sortData(sort: Sort) {
    const datalist = this.bmt2.slice();
    if (!sort.active || sort.direction === '') {
      this.bmt2 = datalist;
      return;
    }
    this.bmt2 = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.bmt2);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  
    changeStatus(e, d) {
      this.spinner.show();
      if (e.checked) {
        this.service.updateSyllabusStatus(d.id, 1).subscribe(
          res => {
            console.log(res);
            
            if (res.status == 'OK') {
              this.sharedService.openSnackbar(res.message)
              this.cdref.detectChanges();
              // this.ngAfterViewInit();
              this.spinner.hide();
  
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
      else {
        this.service.updateSyllabusStatus(d.id, 0).subscribe(
          res => {
            console.log(res);
              
            if (res.status == 'OK') {
              
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
            this.spinner.hide()
            this.sharedService.openSnackbar('Error Occured.')
          }
        )
        this.spinner.hide();
      }
    }
  
  
  
  }
  