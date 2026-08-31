import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GcService } from 'app/service/gc/gc.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-punishments',
  templateUrl: './punishments.component.html',
  styleUrls: ['./punishments.component.scss']
})
export class PunishmentsComponent implements OnInit {
  punishmentsList:any[] = [];

  totalPoints:number=0;
  cadetDetails:any;

  constructor(private route:ActivatedRoute, private router:Router, private gcService:GcService,
    private spinner: NgxSpinnerService, public sharedService:SharedService, private cdref: ChangeDetectorRef){
    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
   }

  ngOnInit(): void {

    this.getTotalPoints();

  }
  ngAfterViewInit(){
    this.getPunishments()
  }

  getPunishments(){
    this.gcService.getPunishments(this.cadetDetails.serviceId).subscribe(
      res=>{
        console.log(res);
        
        if(res.status == "OK"){
          this.punishmentsList = res.object;
          this.getTotalPoints();    
          this.cdref.detectChanges();
          
        }
      }

    )

  }


  getTotalPoints(){
    this.punishmentsList.forEach(
      (el:any)=>{
          this.totalPoints = this.totalPoints+el.points;
      }
    )
  }


}
