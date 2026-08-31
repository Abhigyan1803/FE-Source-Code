import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventDetailsDialogComponent } from 'app/main/shared-component/event-details-dialog/event-details-dialog.component';
import { AuthService } from 'app/service/auth-service/auth.service';
import { HomePageService } from 'app/service/home/home-page.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import * as $ from 'jquery';

@Component({
  selector: 'ms-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
	test: Date = new Date();
  isLoggedIn:boolean;
  userDetails:any;

  centralLibraryLinks:any[]=[];
  cyberPolicies:any[]=[];
  constructor(private router: Router, private service: HomePageService, private dialog: MatDialog, 
    private cdref:ChangeDetectorRef, private authService:AuthService ) { }

  ngOnInit(): void {
    // localStorage.clear();

    $(document).ready(function() {
      $('#main-menu-btn').on('click', function() {
        $('#main-menu').toggleClass('d-block');
      });
    });

    if(localStorage.getItem('jwtToken')){
        this.authService.isLoggedIn = true;
        this.isLoggedIn = true;
        this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object
        
    }

  }
  ngAfterViewInit(){
    
    this.getCentralLibraryLinks();
    // this.getCyberPolicies();
   
    // setInterval(()=>{
    // this.getCentralLibraryLinks();
    // // this.getCyberPolicies();
    // },60000)
    
  }

  login(ac) {
    this.router.navigate(['/session/loginV2'], { queryParams: { ac: ac } });
  }
  logout(){
    this.authService.logOut();
    this.isLoggedIn=false;
  }
  sendToLogin(type){
    if(!localStorage.length){
      console.log('login fn work')
      this.authService.setLoginType(type);
      this.router.navigate(['/session/loginV2'])
    }
  }
  
  getCentralLibraryLinks(){
    this.service.getCentralLibrary().subscribe(
      res=>{
        // console.log(res);
        if(res.status=="OK"){
          this.centralLibraryLinks = res.object
          this.cdref.detectChanges();
        }
      }
    )
  }

  // getCyberPolicies(){
  //  this.service.getCyberPolicies().subscribe(
  //    res=>{
  //     //  console.log(res);
  //      if(res.status=="OK"){
  //       this.cyberPolicies = res.object
  //       this.cdref.detectChanges();
  //     }
  //    }
  //  ) 
  // }

  goToDashboard(){
    this.router.navigate([localStorage.getItem('welcomeRoute')])
  }

  visitCentralLbrary(lib){
    window.open(lib.linkUrl,"_blank");
  }

  openCyberPolicy(c){
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'Cyber Policy' ,url: c.link
      }
    });
  }

  goToCMS(){
    window.open("10.10.60.2/CMS/","_blank");
  }
}

$(document).ready(function () {
  $(".tog_cls").click(function () {
    $(".nav").toggle();
  });
});