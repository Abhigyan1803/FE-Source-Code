import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { TrgBattalionService } from '../trg-battalion/trg-battalion.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService : AuthService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('jwtToken');
        // if (token) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${token}`,
        //         }
        //     });
        // }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({
        //         setHeaders: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // }

        // request = request.clone({
        //     headers: request.headers.set('Accept', 'application/json')
        // });


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // if(event.body.is_user_deleted)
                    // {
                    //     console.log('event--->>>', event.body);
                    //     this.sessionExpireDialog("Block","Your  account blocked by admin.please contect us");
                    //     return;
                    // }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status > 399) {
                    if (error.error.success === false) {
                        // this.presentToast('Login failed');
                    } else {
                        this.sessionExpireDialog('Error!!', 'Session expired, Please login again ?');
                    }
                }
                return throwError(error);
            }));
    }

    public async sessionExpireDialog(title: string, msg: string) {

        // this.authService.logOut(); 
    }


}
