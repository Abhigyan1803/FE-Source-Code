import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'ms-vehicle-stickers-acs',
  templateUrl: './vehicle-stickers-acs.component.html',
  styleUrls: ['./vehicle-stickers-acs.component.scss']
})
export class VehicleStickersAcsComponent implements OnInit {
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any[]=[];
  dataSource: any;
  displayedColumns: string[] = ['number', 'name','description','document','action'];  
  BiometricRfid: any[] = [];



  constructor(private router: Router, private adminservice: AdminService, private spinner:NgxSpinnerService,
    private cdref: ChangeDetectorRef, public dialog: MatDialog, private sharedService: SharedService) { }


  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.getVEHICLE()
  }

  

  getVEHICLE(){
    this.spinner.show();
  this.adminservice.getVEHICLE(2).subscribe(res =>{  
    console.log(res);
    
    if(res.status=="OK"){
      this.BiometricRfid=res.object ;
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
  
  addVehicle() {
    this.router.navigate(['main/gs-branch/security/access-control/vehicle-sticker/add-vehicle']);
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

  viewVehicle(element) {
    this.router.navigate(['main/gs-branch/security/access-control/vehicle-sticker/view-vehicle'],{queryParams:{id:element.id}})  

    if(this.router.url.includes('main/gs-branch'))
    this.router.navigate(['main/gs-branch/security/access-control/vehicle-sticker/view-vehicle'],{queryParams:{id:element.id}})
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/security/access-control/vehicle-sticker/view-vehicle'],{queryParams:{id:element.id}})  
  }


  sortData(sort: Sort) {
    const datalist = this.BiometricRfid.slice();
    if (!sort.active || sort.direction === '') {
      this.BiometricRfid = datalist;
      return;
    }
    this.BiometricRfid = datalist.sort((a: any, b: any) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return this.sharedService.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'description': return this.sharedService.compare(a.description.toLowerCase(), b.description.toLowerCase(), isAsc);
        default: return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.BiometricRfid);
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
          type: 'document',title:"Biometric Document", url: e.file
        }
      }
      )
    }

    changeVehicleStatus(e, d) {
      this.spinner.show();
      if (e.checked) {
        this.adminservice.changeVEHICLEStatus(d.id, 1).subscribe(
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
        this.adminservice.changeVEHICLEStatus(d.id, 0).subscribe(
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









