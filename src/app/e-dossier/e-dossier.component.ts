import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material/material.module';
import { AuthService } from './../service/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ms-e-dossier',
  templateUrl: './e-dossier.component.html',
  styleUrls: ['./e-dossier.component.scss']
})
export class EDossierComponent implements OnInit {
  EDDetails;
  userName
  year: Date = new Date();
  constructor(private router:Router, private authService:AuthService) { 
    
  }

  ngOnInit(): void {  
    this.EDDetails = JSON.parse(localStorage.getItem('loginResponse')).object
   }
  
  onActivate(event) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });  
 }

  noImg(e:any){
    e.target.src = "assets/img/default_cadet_img.jpg"

  }

  logout(){
    this.authService.logOut()
  }
  ngOnDestroy(){
    localStorage.clear()
  }
}
