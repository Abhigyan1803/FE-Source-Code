import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

	constructor(private router: Router, private userAuthService: AuthService) { }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userAuthService.getLocalStorageUser()) {
            // logged in so return true
            console.log('already logged in');

            return false;
            
        } else{ 
            console.log('not logged in');

            return true;
        }
    }
}