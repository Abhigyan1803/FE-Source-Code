import { ChangeDetectorRef, Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventDetailsDialogComponent } from 'app/main/shared-component/event-details-dialog/event-details-dialog.component';
import { ReadMoreDialogComponent } from 'app/main/shared-component/read-more-dialog/read-more-dialog.component';
import { HomePageService } from 'app/service/home/home-page.service';
import { AuthService } from 'app/service/auth-service/auth.service';

import { EventModel } from './event.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {Links} from 'app/links.module'
import { SharedService } from 'app/service/shared.service';



 
export interface CommandantMessage {
  rank: string;
  name: string;
  awards: string;
  organisation: string;
  message: string;
  imageUrl: string;
}

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 3000, "arrows": true, };
  dailyPrograms: any[] = [];
  events: EventModel[] = [];
  activities: any[] = [];
  specialOccasions: any[] = [];
  announcement: any[] = [];
  gcboard: any[] = [];
  DemoCoy: any[] = [];
  dataSource: any;
 
  IP = Links.IP;
      
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  localID
  commandantMsg;
  date = new Date().setHours(0, 0, 0, 0);
  currentYear = new Date().getFullYear();

  isReadMore: boolean;
  pcht: any;
  constructor(private router: Router ,private service: HomePageService, private dialog: MatDialog, public sharedService:SharedService,
     private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private authService:AuthService,
    @Inject(LOCALE_ID) localID: string) {
    this.localID = localID
  }

  index = 0;
  readLess: string;

  ngOnInit(): void {
    document.getElementById('foot-id').style.position = 'relative';
  }

  ngAfterViewInit() {
    this.getEvents();
    this.getDailyPrograms();
    this.getActivities();
    this.getCommandantMessage();
    // this.getSpecialOccasions();
    this.getAnnouncementList();
this.getMESSAGEBOARD();
this.getpcht();
    // setInterval(() => {
    //   this.getEvents();
    //   this.getDailyPrograms();
    //   this.getActivities();
    //   this.getCommandantMessage();
    //   this.getSpecialOccasions()
    // }, 60000)
  }

  goToLogin(ac) {
    this.router.navigate(['/session/loginV2'], { queryParams: { ac: ac } })
  }

  sendToLogin(type){
    console.log('login fn work');
    
    if(!localStorage.length){
      this.authService.setLoginType(type);
      this.router.navigate(['/session/loginV2'])
    }
  }

  sentToAROLogin(type){
    this.authService.getAROLogin.subscribe(res=>{
      console.log(res);
      if(res){
        this.router.navigate(['/pages/aro'])
        
      } else{
        this.authService.setLoginType(type);
        this.router.navigate(['/session/loginV2'])

      }
      
    })

    }

  loginForEdossier(){
    if(!localStorage.length){
      this.authService.setLoginType('e-dossier');
      this.router.navigate(['/session/loginV2'])
    } else {
      let access;
      
      const userDetails = this.authService.getLocalStorageUser().object
  
      if(this.authService.checkEDossierAccess(userDetails)){
        this.router.navigate(['/e-dossior/ed-content']);
       } else{
        this.sharedService.openErrorSnackbarWithSeconds("You Don't have Access!",3)
      }

     
    }
  }


  //TO GET DAILY PROGRAMS
  getDailyPrograms() {
    this.service.getDailyPrograms().subscribe(
      res => {
        // console.log(res);
        this.dailyPrograms = res.List;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    )
  }

  getCommandantMessage() {
    this.service.getCommandantMessage().subscribe(
      res => {
        if (res.status == '1') {
          this.commandantMsg = res.List;
          this.readLess = this.commandantMsg.message.substring(0, 256);
          if (this.commandantMsg.message.length > 256) {
            this.isReadMore = true;
          }
        }
      }
    )
  }

  getEvents() {
    this.events = [];
    this.service.getAllUpcomingEvents(false).subscribe(
      res => {
        // console.log("UPCOMING EVENTS====",this.events);    

        if (res.status == '1') {
          this.events = res.List;
          this.events.forEach((res, index) => {
            this.events[index].isNew = this.isNew(res.createdAt);
            return this.events.sort((a, b) => {
              return <any>new Date(b.eventDate) - <any>new Date(a.eventDate);
            });
          })
        }
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

  isNew(date) {
    var currentDate = new Date();
    var someDate = new Date(date);
    someDate.setDate(someDate.getDate() + 7); //number  of days to add, e.x. 3days
    if (currentDate > someDate) {
      return false;
    } else {
      return true;
    }
  }

  getActivities() {
    this.activities = []
    this.service.getActivities().subscribe(
      res => {
        console.log('res images',res);
        
        if (res.status == '1') {
          res.List.forEach(element => {
            this.activities.push(element.image)
          });
        }
      }
    )
  }

  // getSpecialOccasions() {
  //   //getSpecialOccasions
  //   this.specialOccasions=[];
  //   this.service.getSpecialOccasions().subscribe(
  //     res => {
  //       if (res.status == 'OK') {
  //         // console.log("==========SPECIAL OCCASIONS=========");
  //         // console.log(res);
  //         // console.log("==========TO HERE=========");

  //         const currDate = Date.now();
  //         let oc = res.object;
  //         const diff: number = 604800000;
       
  //         oc.forEach(element => {

  //           console.log(element);
  //           let dobOfc;
  //           let dobSps;
  //           let wedd;

  //           if (element.officerDOB != null) {

  //             dobOfc = new Date(element.officerDOB).setFullYear(this.currentYear);
          
  //             let oc = dobOfc - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   type: 'oBday',
  //                   date: element.officerDOB,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges()
  //             }

  //           }
  //           if (element.spouseDOB != null) {
  //             dobSps = new Date(element.spouseDOB).setFullYear(this.currentYear);
         
  //             let oc = dobSps - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   relation: element.relation,
  //                   sName: element.spouseName,
  //                   type: 'sBday',
  //                   date: element.spouseDOB,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges()

  //             }

  //           }
  //           if (element.marriageAnniversary != null) {
  //             wedd = new Date(element.marriageAnniversary).setFullYear(this.currentYear);
     

  //             let oc = wedd - currDate
  //             if (oc < diff) {
  //               this.specialOccasions.push(
  //                 {
  //                   oName: element.officerRank + ' ' + element.officerName,
  //                   relation: element.relation,
  //                   sName: element.spouseName,
  //                   type: 'wedd',
  //                   date: element.marriageAnniversary,
  //                   department: element.postedBranch
  //                 }
  //               )
  //               this.cdref.detectChanges();

  //             }
  //           }

  //         });

  //         this.specialOccasions.sort(function (a, b) { return a.date - b.date });
  //         console.log("=============Filtered occasions============");
  //         console.log(this.specialOccasions);
  //         console.log("=============To Here============");

  //       }
  //     }
  //   )
  // }

  noImg(e) {
    e.target.src = "assets/img/default_user.png";
  }

  openEventDetails(details) {
    this.dialog.open(EventDetailsDialogComponent, {
      width: '600px', height: '400px',
      data: { type: 'event', title: "Event Details", details: details },
      disableClose: true
    })
  }

  readMore(details) {
    this.dialog.open(ReadMoreDialogComponent, { width: '800px', height: '485px', data: details, disableClose: true })
  }

  openE_Dossier(){
    window.open(Links.E_DOSSIER,"_blank")
  }


  getAnnouncementList() {
    this.spinner.show();
    this.service.getAnnouncementList(1).subscribe(res => {
      // console.log(res);

      if (res.status == "OK") {
        this.announcement = res.object;
        this.spinner.hide();
        this.cdref.detectChanges();
        // console.log(res);

      }
      else {
        this.spinner.hide()
      }
    },
      err => {
        this.spinner.hide();
      }

    )
  }


  openDoc(e) {
    // console.log(e.announcementDocument);

    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'Announcement Document', url: e.announcementDocument
      }
    });
  }

  openDocGC(e) {
    // console.log(e.document);

    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: 'OC Document', url: e.document
      }
    });
  }

  getMESSAGEBOARD(){
    this.spinner.show();
  this.service.getMESSAGEBOARD(1).subscribe(res =>{  
    // console.log(res);
    
    if(res.status=="OK"){
      this.gcboard = res.object ;
      // this.dataSource = new MatTableDataSource(res.object);
      
      this.spinner.hide();
      this.cdref.detectChanges();
// console.log(res,"=================");

    }
    else{
      this.spinner.hide()
      // this.adminservice.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    // this.adminservice.openSnackbar("Some Error Occured.");
  }
  
  )
  }

  getpcht(){
    this.spinner.show();
  this.service.getpcht(1).subscribe(res =>{  
    // console.log(res);
    
    if(res.status=="OK"){
      this.pcht = res.object ;
      // this.dataSource = new MatTableDataSource(res.object);
      
      this.spinner.hide();
      this.cdref.detectChanges();
// console.log(res,"=================");

    }
    else{
      this.spinner.hide()
      // this.adminservice.openSnackbar(res.message)
     }
  },
  err=>{
    this.spinner.hide()
    // this.adminservice.openSnackbar("Some Error Occured.");
  }
  
  )
  }



}
