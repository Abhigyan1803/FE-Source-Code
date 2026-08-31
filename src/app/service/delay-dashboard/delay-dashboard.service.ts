import { Injectable } from '@angular/core';
import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DelayDashboardService {
  jwtToken = "";


  constructor(private http: HttpClient, private authService:AuthService) {
  }

  getStaffList(moduleId, termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_LIST_OF_STAFF + `?moduleId=${moduleId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  setFinalSubmitDate(obj) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.SET_FINAL_SUBMIT_DATE, obj, httpOptions).pipe(map((response: any) => response));
  }

  updateFinalSubmitDate(obj) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_FINAL_SUBMIT_DATE, obj, httpOptions).pipe(map((response: any) => response));
  }


}
