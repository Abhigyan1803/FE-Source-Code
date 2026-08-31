import { Component, OnInit } from '@angular/core';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public IP = Links.IP;
  bgs: any={}
  colgs: any={}
  oicit: any={}
  securityOfficer: any={}
  pro: any={}
  gso1coord: any={}
  gso1sd: any={}
  gso1int: any={}
  gso2stats: any={}


  constructor(private service:AdminService,private spinner:NgxSpinnerService, public sharedService:SharedService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getAllMembers()
  }

  getAllMembers() {
    this.service.getAllGSBranchMembers(1).subscribe(
      res=>{
        console.log(res);
        if(res.status == "OK"){

          let ob = res.object

          ob.find(
            el=>{

              if (el.gsPosition.id==1){
                this.bgs = el;
              }
              if (el.gsPosition.id==2){
                this.colgs = el
              }
              if (el.gsPosition.id==3){
                this.gso1coord = el
              }
              if (el.gsPosition.id==4){
                this.gso1int=el
              }

              if (el.gsPosition.id == 5) {
                this.gso1sd = el
              }

              if (el.gsPosition.id == 6) {
                this.gso2stats = el
              }
              if (el.gsPosition.id == 7) {
                this.oicit = el
              }
              if (el.gsPosition.id == 8) {
                this.pro = el
              }
              if (el.gsPosition.id == 9) {
                this.securityOfficer = el
              }




            }
          )






        }
        
      }
    )
  }

  noImg(e: any) {
    e.target.src = "assets/img/id.png"
  }


}
