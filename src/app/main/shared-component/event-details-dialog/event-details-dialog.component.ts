import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface HomepageDialogData{
  type?: string;
  title?:string;
  details?:any
  message?: any;
  url?:any
}

@Component({
  selector: 'ms-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.scss']
})
export class EventDetailsDialogComponent implements OnInit {
isHrs:boolean = false;
isMnts:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: HomepageDialogData) {
    console.log("details Data",data);

    let hrs:number = new Date(data.details.eventDate).getHours();
    let mnts:number = new Date(data.details.eventDate).getMinutes();
    console.log(hrs);
    console.log(mnts);
    
    if(hrs != 0){
      this.isHrs = true;
    }
    if(mnts != 0){
      this.isMnts = true;
    }
    

   }
   

  ngOnInit(): void {
  }

}
