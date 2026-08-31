import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
IP = Links.IP;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  imaActivities:any[] = [];
  constructor(private router:Router, private service:AdminService, private spinner:NgxSpinnerService, private dialog:MatDialog,
     private cdref: ChangeDetectorRef,  private snackbar:MatSnackBar ) { }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.spinner.show();
    this.getActivities();
  }

  getActivities(){
    this.service.getImaActivities().subscribe(
      res =>{
        console.log(res);
        if(res.status == '1'){
          this.imaActivities = res.List
          this.cdref.detectChanges();
        }
        this.spinner.hide()
      },
      err =>{
        console.log(JSON.stringify(err));
        this.spinner.hide();
        
      }
    )
  }

  changeActivityStatus(e:any,id){
    this.spinner.show()
    if(e.checked){
      this.service.changeImaActivityStatus(id,1).subscribe(
        res =>{
          if(res.status == '1'){
          this.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit()
          }
          this.spinner.hide()
        },
        err =>{
          this.spinner.hide()
        }

      )
    } else {
      this.service.changeImaActivityStatus(id,0).subscribe(
        res =>{
          if(res.status == '1'){
          this.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.ngAfterViewInit()
          }
          this.spinner.hide()
        },
        err =>{
          this.spinner.hide()
        }
      )
    }
  }

  addActivity(){
    this.router.navigate(['/main/admin/home/activity/add-activity'])
  }

  
  openImage($event,a){

    this.dialog.open(DialogComponent,{
      width: '1300px', height: '650px',
      data: {
        type: 'img',title:'IMA Activity', url: a.image
      }
    })
  }

  openSnackbar(msg){
    this.snackbar.open(msg,'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }


}
