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

@Component({
  selector: 'ms-general-instruction',
  templateUrl: './general-instruction.component.html',
  styleUrls: ['./general-instruction.component.scss']
})
export class GeneralInstructionComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','document','status','action'];  
  POC: any[] = [];
  term;
  
  
  constructor(private router: Router, private route:ActivatedRoute, private adminservice: AdminService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { 
      this.route.params.subscribe(
        (params)=>{
          this.term = params.term;
          if(this.term)
          console.log(this.term,"TERM ");
          // this.ngAfterViewInit();
        }
      )
    }
  
    ngOnInit(): void {
 
    }
    
    ngAfterViewInit() {
      this.getPOC('BMT2GeneralInstruction')
    }
    
    
    
    getPOC(GeneralInstruction){
      this.spinner.show();
    this.adminservice.getGeneralInstructionLIST(GeneralInstruction).subscribe(res =>{  
      console.log(res);
      
      if(res.status=="OK"){
        this.POC=res.object ;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.cdref.detectChanges();
    console.log(res,"=================");
    
      }
      else{
        this.spinner.hide()
        this.adminservice.openSnackbar(res.message)
       }
    },
    err=>{
      this.spinner.hide()
      this.adminservice.openSnackbar("Some Error Occured.");
    }
    
    )
    }
    
    addNominal() {
      this.router.navigate(['main/trg-team/gso-2-assessment/service-subjects/Bmt2/general-instruction/add-instruction']);
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
    
    viewinstruction(id) {
      this.router.navigate(['main/trg-team/gso-2-pgme/study-material/Bmt2/general-instruction/view-mark'],{queryParams:{id:id}})  
    
    }
    
    
    sortData(sort: Sort) {
      const datalist = this.POC.slice();
      if (!sort.active || sort.direction === '') {
        this.POC = datalist;
        return;
      }
      this.POC = datalist.sort((a: any, b: any) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
          case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
          default: return 0;
        }
      });
      this.dataSource = new MatTableDataSource(this.POC);
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
          this.adminservice.updateBMT1Status(d.id, 1).subscribe(
            res => {
              console.log(res);
              
              if (res.status == 'OK') {
                this.adminservice.openSnackbar(res.message)
                this.cdref.detectChanges();
                // this.ngAfterViewInit();
                this.spinner.hide()
    
              }
              else {
                this.spinner.hide()
                this.adminservice.openSnackbar(res.message)
              }
            },
            err => {
              this.spinner.hide();
              this.adminservice.openSnackbar('Error Occured.')
            }
          )
          this.spinner.hide();
        }
        else {
          this.adminservice.updateBMT1Status(d.id, 0).subscribe(
            res => {
              console.log(res);
                
              if (res.status == 'OK') {
                
                this.adminservice.openSnackbar(res.message)
                this.cdref.detectChanges();
                // this.ngAfterViewInit();
                this.spinner.hide()
              }
              else {
                this.spinner.hide()
                this.adminservice.openSnackbar(res.message)
              }
            },
            err => {
              this.spinner.hide()
              this.adminservice.openSnackbar('Error Occured.')
            }
          )
          this.spinner.hide();
        }
      }
    
    
    
    }
    