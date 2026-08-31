import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SharedService } from 'app/service/shared.service';




@Component({
  selector: 'ms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  displayedColumns : string[] = ["number", "rank", "name", "awards", "status", "action"]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource :any;
  messageList:any[] = [];


  constructor(public dialog: MatDialog, private router: Router, private service:AdminService, 
    private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService  ,
    private sharedService:SharedService
     ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAllMessages();
  }
  
  getAllMessages(){
    this.spinner.show();
    this.service.getCommandantMessages().subscribe(
      res =>{
        if(res.status == '1'){
          this.messageList = res.List;
          this.dataSource= new MatTableDataSource(res.List);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.cdref.detectChanges();
          this.spinner.hide();
        } else{
          this.messageList = []
          this.spinner.hide();
        }
      },
      err =>{
        this.spinner.hide();
        console.log(JSON.stringify(err));
        
      }
    )
  }

  
  noImg(e){
    e.target.src="assets/img/default_user.png"
      }

  addMessage() {
    this.router.navigate(['/main/admin/home/messages/add-message'])
  }

  msgStatusChanged(e:any,id){
    this.spinner.show();
    if(e.checked){
      this.service.changeCommandantMessageStatus(id,1).subscribe(
        res =>{
          if(res.status == '1'){
            this.service.openSnackbar(res.msg);
            this.cdref.detectChanges();
            this.spinner.hide()
            this.ngAfterViewInit();
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.msg)
          }
        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar('Error Occured.')
        }
      )
    }
    else{
      this.service.changeCommandantMessageStatus(id,0).subscribe(
        res =>{
          if(res.status == '1'){
            this.service.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide()
            this.ngAfterViewInit()
          }else {
            this.spinner.hide()
            this.service.openSnackbar(res.msg)
          }
        },
        err =>{
          this.spinner.hide()
          this.service.openSnackbar('Error Occured.')
        }
      )
    }
  }
  
  updateMessage(m){
    this.router.navigate(['/main/admin/home/messages/view-message'], {queryParams:{id:m.id}})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const datalist = this.messageList.slice();
    if (!sort.active || sort.direction === '') {
      this.messageList = datalist;
      return;
    }
    this.messageList = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rank': return this.sharedService.compare(a.designation.toLowerCase(), b.designation.toLowerCase(), isAsc);
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);      
        case 'awards': return this.sharedService.compare(a.award.toLowerCase(), b.award.toLowerCase(), isAsc);      
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.messageList);
    this.dataSource.paginator=this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
  