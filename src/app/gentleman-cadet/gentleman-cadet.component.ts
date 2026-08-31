import { AuthService } from './../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-gentleman-cadet',
  templateUrl: './gentleman-cadet.component.html',
  styleUrls: ['./gentleman-cadet.component.scss']
})
export class GentlemanCadetComponent implements OnInit {

 
  isCollapsed:boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: boolean = true;
  isCollapsed4: boolean = true;

  myDate = new Date();

  cadetDetails;
  cadetName;


  constructor(private router:Router, private authService:AuthService) { 
    
  }

  ngOnInit(): void {
    if(!localStorage.length){
      this.router.navigate(['/pages'])
    }

    this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object
   
  }
  initListners() {

		document.body.addEventListener('click', () => this.resetTime());
		document.body.addEventListener('mouseover', () => this.resetTime());
		document.body.addEventListener('mouseout', () => this.resetTime());
		document.body.addEventListener('keydown', () => this.resetTime());
		document.body.addEventListener('keyup', () => this.resetTime());
		document.body.addEventListener('keypress', () => this.resetTime());

	}

	resetTime() {
		this.authService.resetTime()
		
	}

  logout(){
    this.authService.logOut()
  }

  noImg(e:any){
    e.target.src = "assets/img/cadet-default-img.png"

  }

}
