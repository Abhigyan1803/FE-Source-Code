import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from 'app/service/shared.service';
import { Observable } from 'rxjs';

@Injectable()
export class UsersGuard implements CanActivate {
    userType: any;

    constructor(public router: Router, public sharedService:SharedService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
// console.log(route);

        const expectedUser = route.data.expectedUser;
        const expectedUserAdmin = route.data.expectedUserAdmin;
        const currentUserAdmin = localStorage.getItem('userType')
        const currentUser = localStorage.getItem('userDept')
        if (currentUser === expectedUser || currentUserAdmin === expectedUserAdmin ) {
            return true;
        } else {
            localStorage.clear();
            this.sharedService.openErrorSnackbarWithSeconds('INVALID LOGIN!',5)
            return false;
        }


        // return new Promise((resolve, reject) => {
        //     const currentUserAdmin = localStorage.getItem('userType')
        //     const currentUser = localStorage.getItem('userDept')
        //     console.log('CURRENT', currentUser);
        //     if (currentUser === expectedUser || currentUserAdmin === expectedUserAdmin ) {
        //         console.log('CURRENT', currentUser);
        //         resolve(true);
        //     } else {
        //         this.router.navigate(['/pages']);
        //         console.log('not authenticated');
        //         resolve(false);
        //     }
        // })


    }
}
