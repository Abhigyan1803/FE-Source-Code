import { Component, LOCALE_ID, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth-service/auth.service';
import { GcService } from 'app/service/gc/gc.service';
import { EventDetailsDialogComponent } from 'app/main/shared-component/event-details-dialog/event-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';


@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  isCollapsed4: boolean = true;

  myDate = new Date();


  cadetDetails;
  cadetName;

  userDetails: any;

  CLec: [] = [];
  counsellor:any={};
  UpcomingEvent: [] = [];
  Weeklyschedule: [] = [];
  localID: string;
  assignments:any[]=[];
  battalionId:number;
  companyId:number;
  termId:number;


  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog, 
    private service: GcService, private homePageService: HomePageService, private sharedService:SharedService
    , @Inject(LOCALE_ID) localID: string, private cdref:ChangeDetectorRef,) {
    this.localID = localID

    this.userDetails = JSON.parse(localStorage.getItem("loginResponse")).object;
    // console.log("USER DETAILS: S",this.userDetails);
    this.battalionId = this.userDetails.battalian.id;
    this.companyId = this.userDetails.company.id;
    this.termId = this.userDetails.term;
  }



  ngOnInit(): void {
    if (!localStorage.length) {
      this.router.navigate(['/pages'])
    }
    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getAllCLec();
    this.getUpcomingEvent();
    this.getDailySchedule();
    this.getAssignmentTasks();
    this.getAllCounsellor();
  }
  
  getAllCLec() {
    this.service.getAllCLec(2, true).subscribe(
      (res) => {
        // console.log("===============C LEC===================");
        // console.log(res)
        // console.log("=======================================");

        if (res.status == "OK") {
          this.CLec = res.object;
          this.cdref.detectChanges();
        } else { }
      }
    )
  }

  getAllCounsellor() {
    this.service.getAllCounsellor(this.battalionId, this.companyId, 1).subscribe(
      (res) => {
        if (res.status == "OK") {
          if(res.object){
            this.counsellor = res.object[0];
            this.cdref.detectChanges();
          }
        } else { }
      },
      err=>{

      }
    )
  }

  getUpcomingEvent() {
    this.service.getUpcomingEvent(true).subscribe(
      (res) => {
        // console.log("Upcoming Events for GC: ", res)
        // console.log("===============UPCOMING EVENTS===================");
        // console.log(res)
        // console.log("=======================================");

        if (res.status == "1") {
          this.UpcomingEvent = res.List;
          this.cdref.detectChanges();
        } else { 
          // this.sharedService.openSnackbar(res.msg)
        }
      },
      err=>{
        this.sharedService.openSnackbar("Some Error Occured.")
      }
    )
  }


  getEveTime(e) {
    const dt = new Date(e)
    let hrs = formatDate(dt, "HH", this.localID);
    let mnts = formatDate(dt, "mm", this.localID);
    if (hrs == '00' && mnts == '00') {
      return '';
    } else {
      return hrs + mnts;
    }
  }

  openEventDetails(details) {
    this.dialog.open(EventDetailsDialogComponent, {
      width: '600px', height: '400px',
      data: { type: 'event', title: "Event Details", details: details },
      disableClose: true
    })
  }

  getDailySchedule() {
    const data = {
      'battalianId': this.battalionId,
      'dt': new Date().toISOString(),
      'termId': this.termId
    }
    this.homePageService.getDailyPgme(data).subscribe(
      (res) => {
        // console.log("today program: ", res)

        if (res.status = "OK") {
          if(res.object){
            this.Weeklyschedule = res.object.dailySchedule;
            this.cdref.detectChanges();
          }
          else {
            this.sharedService.openSnackbar('No Schedules for Today.')

          }
        } else {
          // this.sharedService.openSnackbar(res.message)
         }
      }, 
      error=>{
        this.sharedService.openErrorSnackbarWithSeconds("Some Error Occured", 5)
      }
    )
  }

  // getMyTask(){
  //   this.service.getAllCLec(2,true).subscribe(
  //     (res)=>{
  //       console.log(res)

  //       if(res.status="OK"){
  //         this.CLec=res.object;
  //       }else{}
  //     }
  //   )
  // }

  getAssignmentTasks(){

    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 1', 'Military History').subscribe(
      res=>{ 
        if(res.status == "OK"){
          if(res.object){

            // console.log(res);

            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
          
        } 
      }
    )

    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 1', 'Military Geography').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

    
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 2', 'CAIR').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

      
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 2', 'BS').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

      
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 3', 'Science and Warfare').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

      
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 4', 'SWT').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

      
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 5', 'ECS').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )

    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, 'Paper 6', 'IT').subscribe(
      res=>{
        if(res.status == "OK"){
          if(res.object){
            
            this.assignments.push(...res.object);
            this.cdref.detectChanges();
          }
        } 
      }
    )



  }


  openDoc(l){
    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"forcast Document", url: l.locationImage
        }})
    }







}
