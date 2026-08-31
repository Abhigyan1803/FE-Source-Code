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
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';

@Component({
  selector: 'ms-distribution-marks',
  templateUrl: './distribution-marks.component.html',
  styleUrls: ['./distribution-marks.component.scss']
})
export class DistributionMarksComponent implements OnInit {

  type:string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','uploadedDate','document','status','action'];  
  DistributionMarks: any[] = [];
  
  termId;
  constructor(private router: Router,private route:ActivatedRoute, private adminservice: AdminService, private adService:AcademicDeptService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) {
  
      this.route.params.subscribe(
        (params)=>{
          this.type = params.type;
               
      if(this.type == "I Term"){
        this.termId =1;
      }else if(this.type == "II Term"){
         this.termId =2;
      }else if(this.type == "III Term"){
         this.termId =3;
      }else if(this.type == "II Tech"){
         this.termId =7;
      } else {
        this.sharedService.openErrorSnackbarWithSeconds('Error!',5);
        this.router.navigate(['/main/academic-depart/dashboard'])
      }
          
          console.log(this.type,"type route");
          // this.ngAfterViewInit();
      this.getDistributionMarks('Academic Distribution of Marks')
        }
      )
    }
  
    ngOnInit(): void {
    }
    ngAfterViewInit() {
      // this.getDistributionMarks('Academic Distribution of Marks')
    }
    getDistributionMarks(DistributionMarks){
      this.spinner.show();
    this.adService.getDistributionOfMarksLIST(DistributionMarks,this.termId).subscribe(res =>{  
      // console.log(res);
      
      if(res.status=="OK"){
        this.DistributionMarks=res.object ;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
    
      }
      else{
        this.spinner.hide()
        this.sharedService.openSnackbar(res.message)
       }
    },
    err=>{
      this.spinner.hide();
      console.log(JSON.stringify(err));
      
      this.sharedService.openSnackbar("Some Error Occured.");
    }
    
    )
    }
    
    addDistributionMarks() {
      this.router.navigate(['main/academic-depart/examination/Distribution-of-Marks/'+this.type+'/add-distribution-marks']);
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
      this.router.navigate(['main/academic-depart/examination/Distribution-of-Marks/'+this.type+'/view-distribution-marks'],{queryParams:{id:id}})  
    }
    
    
    sortData(sort: Sort) {
      const datalist = this.DistributionMarks.slice();
      if (!sort.active || sort.direction === '') {
        this.DistributionMarks = datalist;
        return;
      }
      this.DistributionMarks = datalist.sort((a: any, b: any) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
          case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
          default: return 0;
        }
      });
      this.dataSource = new MatTableDataSource(this.DistributionMarks);
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
            type: 'document',title:"Document", url: e.url
          }
        }
        )
      }
    
      changeStatus(e, d) {
        this.spinner.show();
        let status;
        
        if(e.checked)
        status = 1;
        else 
        status = 0;

        this.adService.updateDistributionOfMarksStatis(d.id, status).subscribe(
          res => {
            // console.log(res);
            
            if (res.status == 'OK') {
              this.sharedService.openSnackbar('Status Changed.')
              this.cdref.detectChanges();
              // this.ngAfterViewInit();
              this.spinner.hide()
  
            }
            else {
              this.spinner.hide()
              this.sharedService.openSnackbar('Status Changed.')
            }
          },
          err => {
            this.spinner.hide();
            this.sharedService.openSnackbar('Error Occured.')
          }
        )
        this.spinner.hide();


      //   if (e.checked) {
      //     this.adService.updateDistributionOfMarks(d.id, 1).subscribe(
      //       res => {
      //         console.log(res);
              
      //         if (res.status == 'OK') {
      //           this.sharedService.openSnackbar(res.message)
      //           this.cdref.detectChanges();
      //           // this.ngAfterViewInit();
      //           this.spinner.hide()
    
      //         }
      //         else {
      //           this.spinner.hide()
      //           this.sharedService.openSnackbar(res.message)
      //         }
      //       },
      //       err => {
      //         this.spinner.hide();
      //         this.sharedService.openSnackbar('Error Occured.')
      //       }
      //     )
      //     this.spinner.hide();
      //   }
      //   else {
      //     this.adService.updateDistributionOfMarks(d.id, 0).subscribe(
      //       res => {
      //         console.log(res);
                
      //         if (res.status == 'OK') {
                
      //           this.sharedService.openSnackbar(res.message)
      //           this.cdref.detectChanges();
      //           // this.ngAfterViewInit();
      //           this.spinner.hide()
      //         }
      //         else {
      //           this.spinner.hide()
      //           this.sharedService.openSnackbar(res.message)
      //         }
      //       },
      //       err => {
      //         this.spinner.hide()
      //         this.sharedService.openSnackbar('Error Occured.')
      //       }
      //     )
      //     this.spinner.hide();
      //   }
      
    }
    
    
    
    }
    