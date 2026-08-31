import { Injectable } from '@angular/core';

import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GcService {
  jwtToken = "";


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  /**============ ENTITLEMENT =========== */
  addEntitlement(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_ENTITLEMENT_FROM_GC, data, httpOptions).pipe(map((response: any) => response));
  }

  getEntitlementList(cadetId, type) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ENTITLEMENTS_LIST_BY_TYPE + `?type=${type}&cadetId=${cadetId}`, httpOptions).pipe(map((response: any) => response));

  }
 


  getAllCLec(status, type) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_FORECASTS + `?status=${status}&isGcLec=${type}`).pipe(map((response: any) => response));
  }

  getAllCounsellor(battalionId, companyId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_COUNSELLOR + `?battalionId=${battalionId}&companyId=${companyId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  getUpcomingEvent(type) {
    return this.http.get(Links.GET_ALL_UPCOMING_EVENTS + `?isGcEvent=${type}`).pipe(map((response: any) => response));
  }

  getClubs(type, subType, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Clubs_LIST + `?type=${type}&subType=${subType}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  getSyllabusList(type, termId, status) {
    return this.http.get(Links.GET_ALL_SYLLABUS_LIST + `?type=${type}&termId=${termId}&status=${status}`).pipe(map((response: any) => response));
  }

  getSubjectsLists(type, termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_SUBJECTS_LIST + `?type=${type}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  getSyllabusGCScreenLIST(SyllabusBMT1) {

    return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${SyllabusBMT1}&status=${1}`).pipe(map((response: any) => response));
  }

  getSyllabusBMT2ScreenLIST(BMT2) {

    return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${BMT2}&status=${1}`).pipe(map((response: any) => response));
  }
  getAllMyTask(type, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MY_TASK + `?termId=${type}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getAllCounsellors(battalionId, companyId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_COUNSELLOR + `?battalionId=${battalionId}&companyId=${companyId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  // getAllMyTask(status, type) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.get(Links.GET_ALL_FORECASTS+`?status=${status}&isGcLec=${type}`).pipe(map((response: any) => response));
  // }


  getAssignments(serviceId, term, paper, assignment) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_ASSIGNMENT_ANSWERS_LIST + `?serviceId=${serviceId}&termId=${term}&paper=${paper}&assignmentType=${assignment}&status=1`, httpOptions).pipe(map((response: any) => response));
  }



  getAssignmentsForDashboard(term) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_ANSWERS_LIST + `?termId=${term}`, httpOptions).pipe(map((response: any) => response));
  }


  submitAssignmentAnswer(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_ACADEMIC_ASSIGNMENT_ANSWER, data, httpOptions).pipe(map((response: any) => response));
  }

  /** ------------------------------------ */

  getSubjectsTopicsList(termId, paper, subjectName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    //new term id work
    if(termId){
      return this.http.get(Links.GET_ACADEMIC_SUBJECTS_LIST + `?paper=${paper}&termId=${termId}&subjectName=${subjectName}`,
      httpOptions).pipe(map((response: any) => response));
    }else{ 
      return this.http.get(Links.GET_ACADEMIC_SUBJECTS_LIST + `?paper=${paper}&subjectName=${subjectName}`,
      httpOptions).pipe(map((response: any) => response));
    }
   
  }

  getAcademicSyllabusList(termId, paper, subject, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_SYLLABUS_LIST + `?termId=${termId}&paper=${paper}&subject=${subject}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  getAcademicExaminationSchedule(type, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Distribution_LIST + `?type=${type}&termId=${id}&status=${2}`, httpOptions).pipe(map((response: any) => response));
  }

  //====== DISTRIBUTION OF MARKS =========//
  getDistributionOfMarksLIST(type, termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Distribution_LIST + `?type=${type}&termId=${termId}&status=1`, httpOptions).pipe(map((response: any) => response));
  }

  /**====== EXAM SCHEDULE FOR BMT 1 AND BMT 2 =========== */
  getExamScheduleList(termId, type, subType) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EXAM_SCHEDULE_LIST + `?termId=${termId}&type=${type}&subType=${subType}&status=1`, httpOptions).pipe(map((response: any) => response));
  }

  /** ========== PUNISHMENTS ========== */
  getPunishments(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GC_PUNISMENTS + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }

  getAdjutantOrders(id, flag) {
    return this.http.get(Links.GET_ADJUTANT_ARO + `?id=${id}&status=1&flag=${flag}`).pipe(map((response: any) => response));
  }

  getComplaintList(type) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ENTITLEMENTS_LIST_BY_TYPE + `?type=${type}`, httpOptions).pipe(map((response: any) => response));

  }
}
