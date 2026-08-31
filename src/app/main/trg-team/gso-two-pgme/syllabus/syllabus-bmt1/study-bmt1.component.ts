import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'ms-study-bmt1',
  templateUrl: './study-bmt1.component.html',
  styleUrls: ['./study-bmt1.component.scss']
})
export class StudyBMT1Component implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','createdAt','description',/*'term',*/'document','status','action'];  
  Syllabus: any[] = [];
  term;
  termId;

  
  constructor(private router: Router, private route:ActivatedRoute ,private adminservice: AdminService, 
    private trgTeamService:TrgTeamService,
    private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { 
      this.route.params.subscribe(
        params=>{
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
                  this.ngAfterViewInit()
        }
      )
    }
  
    ngOnInit(): void {
 
    }
    
    ngAfterViewInit() {
      this.getSyllabus('BMT-1',this.termId,2)
    }
    
    
    getSyllabus(syllabusType,term,status){
      this.spinner.show();
    this.trgTeamService.getSyllabusList (syllabusType,term,status).subscribe(res =>{  
      console.log(res);
      
      if(res.status=="OK"){
        this.Syllabus=res.object ;
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
    
    addSyllabus() {
      if(this.router.url.includes('main/trg-team'))
      this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-1/add-mark']);
      if(this.router.url.includes('main/admin/trg-team'))
      this.router.navigate(['main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-1/add-mark']);
      
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
    
    viewSyllabus(id) {

      if(this.router.url.includes('main/trg-team'))
      this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-1/view-mark'],{queryParams:{id:id}})  

      if(this.router.url.includes('main/admin/trg-team'))
      this.router.navigate(['main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-1/view-mark'],{queryParams:{id:id}})  

      

    }
    
    
    sortData(sort: Sort) {
      const datalist = this.Syllabus.slice();
      if (!sort.active || sort.direction === '') {
        this.Syllabus = datalist;
        return;
      }
      this.Syllabus = datalist.sort((a: any, b: any) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
          case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
          default: return 0;
        }
      });
      this.dataSource = new MatTableDataSource(this.Syllabus);
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
          this.trgTeamService.updateSyllabusStatus(d.id, 1).subscribe(
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
              this.spinner.hide();
              this.sharedService.openSnackbar('Error Occured.')
            }
          )
          this.spinner.hide();
        }
        else {
          this.trgTeamService.updateSyllabusStatus(d.id, 0).subscribe(
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
    