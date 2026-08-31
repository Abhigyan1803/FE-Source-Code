import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Links } from 'app/links.module';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ALL_MODULES } from 'app/session/modules information/all-modules';


@Injectable({
   providedIn: 'root'
})
export class AuthService {

   timeOut: number = 15 * 60 * 1000;
   timeOutFn;

   lastMomentTime;
   currentMomentTime;

   private loginType = new BehaviorSubject('');
   public getLoginType = this.loginType.asObservable();

   private loginForARO = new BehaviorSubject(false)
   public getAROLogin = this.loginForARO.asObservable();

   user: Observable<firebase.User>;
   userData: any;
   isLoggedIn = false;

   constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient,
      private router: Router,
      private toastr: ToastrService) {
      this.user = firebaseAuth.authState;
      this.lastMomentTime = Date.now();
      this.currentMomentTime = Date.now();
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   //login for aro
   setLoginType(type) {
      this.loginType.next(type)
   }

   setAROLogin(param) {
      this.loginForARO.next(param);
   }


   getLocalStorageUser() {
      this.userData = JSON.parse(localStorage.getItem("loginResponse"));

      if (this.userData) {
         this.isLoggedIn = true;
         return this.userData;
      } else {
         this.isLoggedIn = false;
         return null;
      }
   }

   /*
* signupUserProfile method save email and password into firabse &
* signupUserProfile method save the user sign in data into local storage.
*/
   signupUserProfile(value) {
      this.firebaseAuth
         .createUserWithEmailAndPassword(value.email, value.password)
         .then(value => {
            this.toastr.success('Successfully Signed Up!');
            this.setLocalUserProfile(value);
            this.router.navigate(['/']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * loginUser fuction used to login
    */
   getBattalions() {

   }

   public get getJWT_Token() {
      const token = localStorage.getItem('jwtToken')
      if (token)
         return token;
      else
         this.router.navigate(['/pages']);

   }

   loginAdmin(value) {
      const data = {
         "username": value.username,
         "password": value.password
      }
      return this.http.post(Links.ADMIN_LOGIN, data).pipe(map((response: any) => response));
   }

   loginRoles(form) {
      return this.http.post(Links.LOGIN_ROLES, form).pipe(map((response: any) => response));
   }


   loginTRGBattalion(form) {
      const data = {
         "username": form.username,
         // "userName":form.username,
         "password": form.password,
         // "battalionId":form.battalion
      }
      return this.http.post(Links.TRG_BATTALION_LOGIN, data).pipe(map((response: any) => response));
   }

   loginGC(form) {
      const data = {
         "username": form.username,
         // "userName":form.username,
         "password": form.password,
         // "battalionId":form.battalion
      }
      return this.http.post(Links.GC_LOGIN, data).pipe(map((response: any) => response));
   }

   loginDossier(form) {
      const data = {
         "username": form.username,
         "password": form.password,
      }
      return this.http.post(Links.LOGIN_ROLES, data).pipe(map((response: any) => response));
   }
   checkEDossierAccess(obj): boolean {
      const ED_MODULE = ALL_MODULES.object.find(module => module.moduleName == 'E-Dossier');

      const MODULE_LIST = obj.moduleList
      let ed_access: boolean = false;

      if (obj.hasRole == '0') {
         ed_access = true;
      } else {
         
         for (let role of MODULE_LIST) {
            const ed = role.modulesPayLoadList.find( m => m.id == ED_MODULE.id )
            if (ed) {
               ed_access = true;
               break;
            }
         }
      }

      return ed_access;
   }

   /*
    * resetPassword is used to reset your password
    */
   resetPassword(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
            this.toastr.success("A password reset link has been sent to this email.");
            this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }


   /*
    * resetPasswordV2 is used to reset your password
    */
   resetPasswordV2(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
            this.toastr.success("A password reset link has been sent to this email.");
            this.router.navigate(['/session/loginV2']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * logOut function is used to sign out
    */
   logOut() {
      this.isLoggedIn = false;
      // this.toastr.success("Successfully logged out!");
      localStorage.clear();
      window.location.reload();

      // this.router.navigate(['/pages']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */

   setLocalUserProfile(value) {
      localStorage.setItem("userProfile", JSON.stringify(value));
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }

   getToken() {
      return localStorage.getItem('authToken');
   }

   resetTime() {
      this.currentMomentTime = Date.now();
      const duration = this.lastMomentTime - this.currentMomentTime
      if (duration > this.timeOut) {
         this.logOut();
      } else {
         this.lastMomentTime = Date.now();
         this.currentMomentTime = Date.now();
         // console.log(this.lastMomentTime);
         // console.log(this.currentMomentTime);


         this.timeOut = 15 * 60 * 1000;
         this.clearTime();
         this.setTimeOut();
      }

   }

   clearTime() {
      clearTimeout(this.timeOutFn)
   }

   setTimeOut() {
      this.timeOutFn = setTimeout(() => {
         // console.log("==============================");
         // console.log('Timeout');
         // console.log("==============================");

         this.logOut();


      }, this.timeOut)
   }









}
