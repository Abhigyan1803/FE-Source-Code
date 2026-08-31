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
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','createdAt','description',
  //'term',
  'document','status','action','delete'];  
  studyMaterialList: any[] = [];
  type:string;
  term:string;
  termId:number;


  
  constructor(private router: Router, private route:ActivatedRoute, private adminservice: AdminService,
    private trgTeamService:TrgTeamService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {
      
    this.route.params.subscribe(
      (params)=>{
        this.type = params.type;
        this.term = params.term
          console.log(params);
          
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
       
        this.ngAfterViewInit();




      }
    )
     }
  
    ngOnInit(): void {
 
    }
    
    ngAfterViewInit() {
      this.getStudyMaterial()
    }
    
    
    
    getStudyMaterial(){
      this.spinner.show();
    this.trgTeamService.getStudyMaterialList(this.type,this.termId).subscribe(res =>{  
      console.log(res);
      
      if(res.status=="OK"){
        this.studyMaterialList=res.object ;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
    // console.log(res,"=================");
    
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
    delete(element) {
      this.trgTeamService.updateStudyMaterialDelete(element.id, 3).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar("Record Deleted")
            this.ngAfterViewInit();
            this.cdref.detectChanges();
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
    
    addStudyMaterial() {
      this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/study-material/material/'+this.type+'/add-study-material']);
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
    
    viewStudyMaterial(id) {
      this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/study-material/material/'+this.type+'/view-study-material'],{queryParams:{id:id}})  
    }
    
    
    sortData(sort: Sort) {
      const datalist = this.studyMaterialList.slice();
      if (!sort.active || sort.direction === '') {
        this.studyMaterialList = datalist;
        return;
      }
      this.studyMaterialList = datalist.sort((a: any, b: any) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
          case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
          default: return 0;
        }
      });
      this.dataSource = new MatTableDataSource(this.studyMaterialList);
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
        let status;
        if(e.checked){
          status = 1;
        } else {
          status = 0;
        }

        this.spinner.show();
        this.trgTeamService.changeStudyMaterialStatus(d.id, status).subscribe(
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
        
        // if (e.checked) {
        //   this.adminservice.updateBMT1Status(d.id, 1).subscribe(
        //     res => {
        //       console.log(res);
              
        //       if (res.status == 'OK') {
        //         this.sharedService.openSnackbar(res.message)
        //         this.cdref.detectChanges();
        //         // this.ngAfterViewInit();
        //         this.spinner.hide()
    
        //       }
        //       else {
        //         this.spinner.hide()
        //         this.sharedService.openSnackbar(res.message)
        //       }
        //     },
        //     err => {
        //       this.spinner.hide();
        //       this.sharedService.openSnackbar('Error Occured.')
        //     }
        //   )
        //   this.spinner.hide();
        // }
        // else {
        //   this.adminservice.updateBMT1Status(d.id, 0).subscribe(
        //     res => {
        //       console.log(res);
                
        //       if (res.status == 'OK') {
                
        //         this.sharedService.openSnackbar(res.message)
        //         this.cdref.detectChanges();
        //         // this.ngAfterViewInit();
        //         this.spinner.hide()
        //       }
        //       else {
        //         this.spinner.hide()
        //         this.sharedService.openSnackbar(res.message)
        //       }
        //     },
        //     err => {
        //       this.spinner.hide()
        //       this.sharedService.openSnackbar('Error Occured.')
        //     }
        //   )
        //   this.spinner.hide();
        // }
      }
    
    
    
    }
    