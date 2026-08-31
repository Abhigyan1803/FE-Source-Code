import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../service/auth-service/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, BehaviorSubject } from 'rxjs';
import { Constants } from 'app/Constants/Constants';
import { ALL_MODULES } from 'app/session/modules information/all-modules';

@Component({
   selector: 'ms-loginV2-session',
   templateUrl: './loginV2-component.html',
   styleUrls: ['./loginV2-component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class LoginV2Component implements OnDestroy {
   title: string = '';
   isError: boolean = false;
   loginForm: FormGroup = new FormGroup({});
   battalionLoginForm: FormGroup = new FormGroup({});
   LoginGCForm: FormGroup = new FormGroup({});
   LoginDossierForm: FormGroup = new FormGroup({});
   loginDelayDashboardForm: FormGroup = new FormGroup({});
   ac: string = '';
   battalions: any[] = [];

   delayDashboard;
   trgTeam;

   subscribeLoginType;
   loginType;

   constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute, private sharedService: SharedService,
      public translate: TranslateService, private fb: FormBuilder, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) {
      localStorage.clear();
      this.loginType = null
      this.ac = this.route.snapshot.queryParamMap.get('ac');

      this.subscribeLoginType = this.authService.getLoginType.subscribe(
         (res: any) => {
            this.loginType = res
            console.log(res);
            if (res == 'admin') {
               this.title = 'Admin'
            } else
               if (res == 'trg-team') {
                  this.title = 'TRG Team'
               } else if (res == 'delayDashboard') {
                  this.title = 'Delay Dashboard'
               } else if (res == 'gc') {
                  this.title = 'Gentleman Cadet'
               } else if (res == 'trg-battalion') {
                  this.title = 'TRG Battalion'
               } else if (res == 'academic-depart') {
                  this.title = 'Academic Department'
               } else if (res == 'adjutant-branch') {
                  this.title = 'Adjutant Branch'
               } else if (res == 'gs-branch') {
                  this.title = 'GS Branch'
               } else if (res == 'academic-depart') {
                  this.title = 'Academic Department'
               } else if (res == 'aro') {
                  this.title = 'aro'
               }

            // console.log(res);
            if (!this.loginType && !this.ac) {
               this.router.navigate(['/pages'])
            }






            this.loginForm = this.fb.group({
               username: ['', Validators.required],
               password: ['', Validators.required]
            })


            this.battalionLoginForm = this.fb.group({
               username: ['', Validators.required],
               password: ['', Validators.required],
               // battalion: ['', Validators.required]
            })

            this.LoginGCForm = this.fb.group({
               username: ['', Validators.required],
               password: ['', Validators.required],
               // battalion: ['', Validators.required]
            })

            this.LoginDossierForm = this.fb.group({
               username: ['', Validators.required],
               password: ['', Validators.required],
               // battalion: ['', Validators.required]
            })

            this.loginDelayDashboardForm = this.fb.group({
               username: ['', Validators.required],
               password: ['', Validators.required]
            })


         }
      )

      if (this.ac == "trg-battalion" || this.ac == "gc") {
         this.sharedService.getBattalionList().subscribe(
            res => {
               console.log(res);
               if (res.status == "OK") {
                  this.battalions = res.object
               }
            }
         )
      }

      if (this.ac == 'trg-team') {
         this.title = 'TRG Team'
      }
      else if (this.ac == 'adjutant-branch') {
         this.title = 'Adjutant Branch'

      }
      else if (this.ac == 'gs-branch') {
         this.title = 'GS Branch'

      }
      else if (this.ac == 'academic-depart') {
         this.title = 'Academic Department'

      }
      else if (this.ac == 'gc') {
         this.title = 'Gentleman Cadet'

      }
      else if (this.ac == 'trg-battalion') {
         this.title = 'TRG Battalion'

      } else if (this.ac == 'admin') {
         this.title = 'Admin'

      }





   }

   get f() {
      return this.loginForm.controls;
   }

   // when email and password is correct, user logged in.
   login() {
      if (this.loginForm.valid) {
         this.spinner.show();

         this.authService.loginAdmin(this.loginForm.value).subscribe(
            res => {
               // console.log('Login: ' + res.message);
               if (res.status == 'OK') {
                  if (res.object) {


                     localStorage.setItem('jwtToken', res.authToken.token)
                     localStorage.setItem('loginResponse', JSON.stringify(res))
                     localStorage.setItem('userName', res.object.name)
                     localStorage.setItem('serviceId', res.object.serviceId)
                     localStorage.setItem('userType', res.object.adminId)




                     // if (this.ac == 'trg-team') {
                     //    localStorage.setItem("department", this.ac)
                     //    this.router.navigate(['/main/trg-team/dashboard'])
                     // } else if (this.loginType == 'adjutant-branch') {
                     //    localStorage.setItem("department", this.ac)
                     //    this.router.navigate(['/main/adjutant-branch/dashboard'])
                     // }
                     // else if (this.loginType == 'gs-branch') {
                     //    localStorage.setItem("department", this.ac)
                     //    this.router.navigate(['/main/gs-branch/dashboard'])
                     // }
                     // else if (this.loginType == 'academic-depart') {
                     //    localStorage.setItem("department", this.ac)
                     //    this.router.navigate(['/main/academic-depart/dashboard'])
                     // }
                     //  else {
                     //    localStorage.setItem("department", "admin")
                     //    this.router.navigate(['/main/admin/dashboard'])
                     // }
                     this.router.navigate(['/main/admin/dashboard'])
                     localStorage.setItem('welcomeRoute', '/main/admin/dashboard')

                     this.spinner.hide();
                  } else {
                     this.spinner.hide();
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username of Password!", 5)
                  }
               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message);
               }

            },
            err => {
               this.spinner.hide();
               this.sharedService.openSnackbar('Some Error Occured.')
               console.log(JSON.stringify(err));
            }
         )
      }
      else {
         this.isError = true;
      }

   }

   setRoleModule(obj, dept, id) {
      console.log('OBJECT: ',obj);
      console.log("DEPT: ",dept);
      console.log("ID: ",id);
      
      const roleModule = obj.moduleList.find(role => role.department === dept)
      
      if(roleModule){
      const department = roleModule.modulesPayLoadList.find( element => element.id == id )
      if(department){
         localStorage.setItem('userDept',id)
         localStorage.setItem('menus', JSON.stringify(department.subModules))
           }
      }
      // const role = roleModule.modulesPayLoadList.find(
      //    element => {
      //       if (element.id == id) {
      //          localStorage.setItem('userDept', element.id)
      //          localStorage.setItem('menus', JSON.stringify(element.subModules))
      //       }
      //    }
      // )
   
   //    const department = roleModule.modulesPayLoadList.find( element => element.department == dept )
   //    if(department){
   //  }
      /**
       *   localStorage.setItem('userDept', element.id)
               localStorage.setItem('menus', JSON.stringify(element.subModules))
       */
   }


   loginRoles() {
      if (this.loginForm.valid) {
         this.spinner.show();

         this.authService.loginRoles(this.loginForm.value).subscribe(
            res => {
               // console.log('Login: ', res);
               if (res.status == 'OK') {
                  if (res.object) {

                     const userDetails = res.object
                     // console.log("USER DETAILS: ", userDetails);

                     localStorage.setItem('jwtToken', res.authToken.token)
                     localStorage.setItem('loginResponse', JSON.stringify(res))
                     localStorage.setItem('userName', res.object.name)
                     localStorage.setItem('serviceId', res.object.serviceId)
                     localStorage.setItem("department", this.ac)
                     localStorage.setItem('userType', userDetails.loginId)

                     if (this.loginType == 'trg-team') {
                        if (userDetails.moduleList) {
                           this.setRoleModule(userDetails, 'TRG Team', 1)
                        }
                        this.router.navigate(['/main/trg-team/dashboard'])
                        localStorage.setItem('welcomeRoute', '/main/trg-team/dashboard')
                        // localStorage.setItem('userDept',"1")
                     } else if (this.loginType == 'trg-battalion') {
                        if (userDetails.moduleList) {
                           this.setRoleModule(userDetails, 'TRG Battalion', 2)
                        }
                        this.router.navigate(['/main/trg-battalion/dashboard']);
                        localStorage.setItem('welcomeRoute', '/main/trg-battalion/dashboard')

                     } else if (this.loginType == 'academic-depart') {
                        if (userDetails.moduleList) {
                           this.setRoleModule(userDetails, 'Academic Department', 4)
                        }
                        this.router.navigate(['/main/academic-depart/dashboard']);
                        localStorage.setItem('welcomeRoute', '/main/academic-depart/dashboard')

                     } else if (this.loginType == 'adjutant-branch') {
                        if (userDetails.moduleList) {
                           this.setRoleModule(userDetails, 'Adjutant Branch', 12)
                        }
                        this.router.navigate(['/main/adjutant-branch/dashboard'])
                        localStorage.setItem('welcomeRoute', '/main/adjutant-branch/dashboard')

                     } else if (this.loginType == 'gs-branch') {
                        if (userDetails.moduleList) {
                           this.setRoleModule(userDetails, 'GS Branch', 10)
                        }
                        this.router.navigate(['/main/gs-branch/dashboard'])
                        localStorage.setItem('welcomeRoute', '/main/gs-branch/dashboard')
                     }

                     this.spinner.hide();
                  } else {
                     this.spinner.hide();
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username of Password!", 5)
                  }
               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message);
               }

            },
            err => {
               this.spinner.hide();
               this.sharedService.openSnackbar('Some Error Occured.')
               console.log(JSON.stringify(err));
            }
         )
      }
      else {
         this.isError = true;
      }

   }

   loginForARO() {
      if (this.loginForm.valid) {
         this.spinner.show();

         this.authService.loginRoles(this.loginForm.value).subscribe(
            res => {
               // console.log('Login: ', res);
               if (res.status == 'OK') {
                  if (res.object) {
                     this.authService.setAROLogin(true)
                     this.router.navigate(['/pages/aro'])
                     this.spinner.hide();
                  } else {
                     this.spinner.hide();
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username of Password!", 5)
                  }
               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message);
               }

            },
            err => {
               this.spinner.hide();
               this.sharedService.openSnackbar('Some Error Occured.')
               console.log(JSON.stringify(err));
            }
         )
      }
      else {
         this.isError = true;
      }

   }



   loginBattalion() {
      console.log('login for battalion');

      // this.router.navigate(['/main/trg-battalion/dashboard']);
      console.log(this.battalionLoginForm.value)
      const bId = this.battalionLoginForm.value.battalion
      if (this.battalionLoginForm.valid) {
         this.spinner.show()
         this.authService.loginTRGBattalion(this.battalionLoginForm.value).subscribe(
            res => {
               // console.log(res);
               if (res.status == "OK") {

                  if (res.object) {
                     localStorage.setItem('jwtToken', res.authToken.token)
                     localStorage.setItem('loginResponse', JSON.stringify(res))
                     localStorage.setItem('userName', res.object.firstName + " " + res.object.lastName)
                     localStorage.setItem("department", this.ac)
                     localStorage.setItem('roleId', res.object.roleId);
                     this.battalions.find(b => {
                        if (bId == b.id) {

                           localStorage.setItem('battalionDetails', JSON.stringify(b))
                        }
                     })

                     this.router.navigate(['/main/trg-battalion/dashboard']);
                     this.spinner.hide()

                  } else {
                     this.spinner.hide()
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username or Password!", 5)
                  }


               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message)
               }
            },
            err => {
               this.spinner.hide()
               this.sharedService.openSnackbar('Some Error Occured.')
            }
         )
      }

   }

   loginGC() {

      // console.log(this.LoginGCForm.value)
      //const bId = this.LoginGCForm.value.battalion
      if (this.LoginGCForm.valid) {
         this.spinner.show()
         this.authService.loginGC(this.LoginGCForm.value).subscribe(
            res => {

               // console.log("Login Response: ",res);
               if (res.status == "OK") {
                  if (res.object) {
                     localStorage.setItem('jwtToken', res.authToken.token)
                     localStorage.setItem('loginResponse', JSON.stringify(res))
                     // localStorage.setItem('userName', res.object.firstName + " " + res.object.lastName)
                     localStorage.setItem("department", this.ac)
                     //gc login new work for gc role id
                     localStorage.setItem("gcRoleId",res.object.hasRole)

                     // this.battalions.find(b => {
                     //    if (bId == b.id) {
                     //       localStorage.setItem('battalionDetails', JSON.stringify(b))
                     //    }
                     // })

                     this.router.navigate(['/gc/content']);
                     localStorage.setItem('welcomeRoute', '/gc/content')

                     this.spinner.hide()
                  } else {
                     this.spinner.hide()
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username or Password!", 5)
                  }

               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message)
               }
            },
            err => {
               this.spinner.hide()
               this.sharedService.openSnackbar('Some Error Occured.')
            }

         )

      }


   }


   loginDossier() {

      if (this.LoginDossierForm.valid) {
         this.authService.loginDossier(this.LoginDossierForm.value).subscribe(
            res => {
               const OBJECT = res.object
               if (this.authService.checkEDossierAccess(OBJECT)) {
                  localStorage.setItem('jwtToken', res.authToken.token)
                  localStorage.setItem('loginResponse', JSON.stringify(res))
                  localStorage.setItem('userName', res.object.name)
                  localStorage.setItem("department", this.ac)

                  this.router.navigate(['/e-dossior/ed-content']);
                  localStorage.setItem('welcomeRoute', '/e-dossior/ed-content');

               } else {
                  this.sharedService.openErrorSnackbarWithSeconds('ACCESS DENIED!', 3)
               }

               // if (res.status == "OK") {
               //    if (res.object) {

               //       localStorage.setItem('jwtToken', res.authToken.token)
               //       localStorage.setItem('loginResponse', JSON.stringify(res))
               //       localStorage.setItem('userName', res.object.firstName + " " + res.object.lastName)
               //       localStorage.setItem("department", this.ac)

               //       this.router.navigate(['/e-dossior/ed-content']);
               //       localStorage.setItem('welcomeRoute','/e-dossior/ed-content');
               //       this.spinner.hide()
               //    } else {
               //       this.spinner.hide();
               //       this.sharedService.openErrorSnackbarWithSeconds("Access Denied!", 5);
               //    }
               // }
               // else {
               //    this.spinner.hide()
               //    this.sharedService.openSnackbar(res.message)
               // }
            },
            err => {
               this.spinner.hide()
               this.sharedService.openSnackbar('Some Error Occured.')
            }

         )
      }


   }



   loginDelayDashboard() {
      if (this.loginDelayDashboardForm.valid) {
         this.spinner.show();

         this.authService.loginAdmin(this.loginDelayDashboardForm.value).subscribe(
            res => {
               // console.log('Login: ' + res.message);
               if (res.status == 'OK') {
                  if (res.object) {
                     // console.log(res.object);

                     if (res.object.adminId == 1) {
                        localStorage.setItem('jwtToken', res.authToken.token)
                        localStorage.setItem('loginResponse', JSON.stringify(res))
                        localStorage.setItem('userName', res.object.name)
                        localStorage.setItem('serviceId', res.object.serviceId)


                        localStorage.setItem("department", "admin")
                        this.router.navigate(['/main/delay-dashboard'])
                        localStorage.setItem('welcomeRoute', '/main/delay-dashboard');


                        this.spinner.hide();
                     } else {
                        this.sharedService.openErrorSnackbarWithSeconds('Access Denied!', 5)
                     }


                  } else {
                     this.spinner.hide();
                     this.sharedService.openErrorSnackbarWithSeconds("Invalid Username of Password!", 5)
                  }
               }
               else {
                  this.spinner.hide()
                  this.sharedService.openSnackbar(res.message);
               }

            },
            err => {
               this.spinner.hide();
               this.sharedService.openSnackbar('Some Error Occured.')
               console.log(JSON.stringify(err));
            }
         )
      }
      else {
         this.isError = true;
      }

   }


   ngOnDestroy() {
      console.log('ng on destroy');

      this.loginType = null

      // this.authService.setLoginType(null)
   }
}
