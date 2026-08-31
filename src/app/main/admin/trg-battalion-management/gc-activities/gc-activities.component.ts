import { MatDialog } from '@angular/material/dialog';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-gc-activities',
  templateUrl: './gc-activities.component.html',
  styleUrls: ['./gc-activities.component.scss']
})
export class GcActivitiesComponent implements OnInit {

  gcActivities:any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private router: Router,private service:AdminService ,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getActivities()
  }

  getActivities(){
    this.service.getGcActivities(0,2).subscribe(
      res =>{
        console.log(res);
        if(res.status == 'OK'){
          this.gcActivities = res.object
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

  openImage(e:any,a){
    this.dialog.open(DialogComponent,{
      width: '1300px', height: '650px',
      data: {
        type: 'img',title:'IMA Activity', url: a.image
      }
    })
  }

  addGc() {
    this.router.navigate(['/main/admin/trg-battalion/gc-activities/add-activities']);
  }

  noImg(e) {
    e.target.src = "assets/img/default_user.png"
  }

  viewGc(m) {
    this.router.navigate(['/main/admin/trg-battalion/gc-activities/view-activities'], { queryParams: { id: m.id } });
  }

  

}
