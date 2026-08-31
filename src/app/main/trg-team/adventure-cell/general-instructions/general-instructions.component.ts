import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-general-instructions',
  templateUrl: './general-instructions.component.html',
  styleUrls: ['./general-instructions.component.scss']
})
export class GeneralInstructionsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  displayedColumns: string[] = ['number','date', 'name','acType','seasonTerm','status','document','action'];
  
  generalInstructions:any[]=[];

  constructor( private router:Router,private spinner:NgxSpinnerService,private cdref:ChangeDetectorRef, private dialog:MatDialog,
    private _trgBattalion:TrgBattalionService, private service:TrgTeamService ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAllGeneralInstructions()
  }
  
  getAllGeneralInstructions(){
    this.spinner.show();
    this.service.getAllGeneralInstructions().subscribe(
      res =>{
        if(res.status == '1'){
          this.spinner.hide()
    
      
          this.generalInstructions = res.List
          this.generalInstructions = this.generalInstructions.map((res) => ({
            id: res.id, createdAt: res.createdAt, acType: res.acType.type, year:res.year,seasonTerm:res.seasonTerm.name,
            description: res.description, document: res.document, docName: res.docName, status: res.status
          }))
          this.cdref.detectChanges();
          this.dataSource= new MatTableDataSource(this.generalInstructions);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else{
          this.spinner.hide();
          this._trgBattalion.openSnackbar(res.msg)
        }
      },
      err =>{
        this.spinner.hide()
        this._trgBattalion.openSnackbar('Some Error Occured')
      }
    )
  }
  

  openDoc(e) {
    console.log(e.document, "document");
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "Letters Document", url:e.document
        }
      }
    )
  }

  changeInstructionStatus(e:any,id){
    this.spinner.show();
    if(e.checked){
      this.service.changeInstructionStatus(id,1).subscribe(
        res =>{
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.')
          
        }
      )
      this.spinner.hide();
    }
    else {
      this.service.changeInstructionStatus(id,0).subscribe(
        res =>{
          if(res.status == '1'){
            this._trgBattalion.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.ngAfterViewInit();
          }
        },
        err =>{
          this._trgBattalion.openSnackbar('Error Occured.')
        }
      )
      this.spinner.hide();
    }
  }

  updateGeneralInstruction(i){  
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/adventure-cell/general-instruction/view-instruction'],{queryParams:{id:i}})
    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/general-instruction/view-instruction'],{queryParams:{id:i}})
    }
  }

  addInstruction(){
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/adventure-cell/general-instruction/add-instruction'])
    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/general-instruction/add-instruction'])
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.generalInstructions.slice();
    if (!sort.active || sort.direction === '') {
      this.generalInstructions = datalist;
      return;
    }
    this.generalInstructions = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return this._trgBattalion.compare(a.createdAt, b.createdAt, isAsc);
        case 'name': return this._trgBattalion.compare(a.docName.toLowerCase(), b.docName.toLowerCase(), isAsc);
        case 'acType': return this._trgBattalion.compare(a.acType, b.acType, isAsc);
        case 'seasonTerm': return this._trgBattalion.compare(a.seasonTerm, b.seasonTerm, isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.generalInstructions);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
