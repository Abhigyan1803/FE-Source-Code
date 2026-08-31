

import { Injectable } from '@angular/core';

import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EDossierService {
  obj: any;

  jwtToken;
  httpOptions
  objOfCadet = new BehaviorSubject('')
  cadetObj = this.objOfCadet.asObservable();


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService:AuthService) {
  }

  setCadetObj(obj) {
    this.objOfCadet.next(obj)
  }


  getEDossierMenu(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EDOSSIER_MENU + `?status=${1}`, httpOptions).pipe(map((response: any) => response));
  }
  getEDossierAssessmentMatrix(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_EDOSSIER_ASSESSMENTMATRIX + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }

  getEqtnEdossiermarks(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EQTN_EDOSSIER_MARKS + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateEdossiermarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_EQTN, form, httpOptions).pipe(map((response: any) => response));
  }

  getEDossierLeadershipMatrix(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_EDOSSIER_LEADERSHIPMATRIX + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }


  getEDossierList(termid, shortname, companyid, pageIndex, pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    console.log(companyid, '--->>companyid');
    if (shortname == undefined || shortname == null) {
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    } else if (companyid != undefined && companyid != null) {
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&company=${companyid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    } else {
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }


  }
  getEDossierAllList(pageIndex, pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_EDOSSIER_List + `?pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }



  getAssessmentOQMatrixEdossiermarksByServiceId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
   
    return this.http.get(Links. GET_Assessment_OQ_MATRIX_EDOSSIER_MARKS  + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));
  }
  





getAssessmentOQEdossierMarksOQMatrixDrillEqtn(id){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
 
  return this.http.get(Links.GET_OQ_MATRIX_DRILL_EQTN_ADC_MARKS_BY_SERVICE_ID + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));

}

get_ed_final_marks(id){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
 
  return this.http.get(Links.GET_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));

}

add_ed_final_marks(data){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
 
  // return this.http.get(Links.ADD_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID ,data, httpOptions).pipe(map((response: any) => response));
  return this.http.post(Links.ADD_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID, data, httpOptions).pipe(map((response: any) => response));

}
update_ed_final_marks(data){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
 
  return this.http.put(Links.UPDATE_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID,data, httpOptions).pipe(map((response: any) => response));

}





  updateLDMatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_LD_MATRIX, form, httpOptions).pipe(map((response: any) => response));
  }



  /* SPORTS & GAMES */

  getSportsEdossiermarksByServiceId(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SPORTS_EDOSSIER_MARKS + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateSportsEdossiermarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_SPORTS_EDOSSIER_MARKS, form, httpOptions).pipe(map((response: any) => response));
  }


  /* DRILL */

  getDrillEdossiermarksByServiceId(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_Nx_DRILL_EDOSSIER_MARKS + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /* ASSESSMENTOQ */

  getAssessmentOQEdossiermarksByServiceId(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_Assessment_OQ_EDOSSIER_MARKS + `?serviceId=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  getDillDatById(serviceId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_DRILLDAT + `?serviceId=${serviceId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  addDrillDat(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_DRILLDAT, data, httpOptions).pipe(map((response: any) => response));
  }
  updateDrillDat(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_DRILLDAT, data, httpOptions).pipe(map((response: any) => response));
  }

  // getautobiography(Id) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.get(Links.GET_AUTOBIOGRAPHY + `?id=${Id}` , httpOptions).pipe(map((response: any) => response));
  // }
  addAutography(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_AUTOBIOGRAPHY, data, httpOptions).pipe(map((response: any) => response));
  }
  getautobiographybyserviceid(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_AUTOBIOGRAPHYBYSERVICEID + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }
  updateautobiography(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_AUTOBIOGRAPHY, data, httpOptions).pipe(map((response: any) => response));
  }
  getssbreport(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SSBREPORT + `?id=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  getssbreportservicebyid(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SSBREPORTBYSERVICEID + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }
  addssbreport(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_SSBREPORT, data, httpOptions).pipe(map((response: any) => response));
  }
  updatessbreport(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_SSBREPORT, data, httpOptions).pipe(map((response: any) => response));
  }
  getpersnolinfobyserviceid(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PERSNOLINFO + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }
  updatecadetdetails(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_CADETDETAILS, data, httpOptions).pipe(map((response: any) => response));
  }

  getWtbyservicebyid(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WT + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }

  getWTAllCadetlist(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_WT_ED_SEARCH + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }

  updateWt(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_WT, data, httpOptions).pipe(map((response: any) => response));
  }
  getmotivationbyserviceId(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MOTIVATION + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }
  // getWtbyservicebyid(serviceId) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.get(Links.GET_WT + `?serviceId=${serviceId}` , httpOptions).pipe(map((response: any) => response));
  // }
  getEDossierInteractualMarks(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_INTERACTUAL + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  updateEdinteractual(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)  
    return this.http.put(Links.E_DOSSIER_UPDATE_INTERACTUAL, form, httpOptions).pipe(map((response: any) => response));
  }

  getClubDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_CLUB_DETAILS + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }

  addClubDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {

      details: form.details,
      loc: form.loc,
      performance: form.performance,
    }
    return this.http.post(Links.E_DOSSIER_ADD_CLUB_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }

  updateClubDetails(Id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = Object.assign({}, { id: Id }, form)
    // {
    //   id:Id,
    //   details: form.details,
    //   loc: form.loc,
    //   performance: form.performance,
    // }
    return this.http.put(Links.E_DOSSIER_UPDATE_CLUB_DETAILS, data, httpOptions).pipe(map((response: any) => response));
  }

  getHikeDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_HIKE_DETAILS + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }

  addHikeDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {

      hike: form.hike,
      loc: form.loc,
      remarks: form.remarks,
    }
    return this.http.post(Links.E_DOSSIER_ADD_HIKE_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }
  updateHikeDetails(Id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = Object.assign({}, { id: Id }, form)
    // {
    //   id:Id,
    //   details: form.details,
    //   loc: form.loc,
    //   performance: form.performance,
    // }
    return this.http.put(Links.E_DOSSIER_UPDATE_HIKE_DETAILS, data, httpOptions).pipe(map((response: any) => response));
  }
  getLveDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_LVE_DETAILS + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }

  addLveDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_LVE_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }
  updateLveDetails(Id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = Object.assign({}, { id: Id }, form)
    // {
    //   id:Id,
    //   details: form.details,
    //   loc: form.loc,
    //   performance: form.performance,
    // }
    return this.http.put(Links.E_DOSSIER_UPDATE_LVE_DETAILS, data, httpOptions).pipe(map((response: any) => response));
  }
  getRecordsDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_RECORD_DETAILS + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }

  addRecordsDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_RECORD_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }
  updateRecordDetails(Id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = Object.assign({}, { id: Id }, form)
    // {
    //   id:Id,
    //   details: form.details,
    //   loc: form.loc,
    //   performance: form.performance,
    // }
    return this.http.put(Links.E_DOSSIER_UPDATE_RECORD_DETAILS, data, httpOptions).pipe(map((response: any) => response));
  }
  getObsnDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_OBSN_DETAILS + `?serviceId=${Id}&status=${1}`, httpOptions).pipe(map((response: any) => response));
  }
  addObsnDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_OBSN_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }

  getCounsDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_COUNS_DETAILS + `?serviceId=${Id}&status=${1}`, httpOptions).pipe(map((response: any) => response));
  }
  addCounsDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_COUNS_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }



  getInterviewDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_INTERVIEW_DETAILS + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  addInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_INTERVIEW_DETAILS, form, httpOptions).pipe(map((response: any) => response));
  }

  updateinterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)  
    return this.http.put(Links.UPDATE_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }



  getInitialInterviewDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_INITIAL_INTERVIEW + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  addInitialInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_INITIAL_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }
  updateInitialInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    //const data = Object.assign({},{id:Id},form)
    console.log('form' + form);
    return this.http.put(Links.UPDATE_INITIAL_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }



  getBegInterviewDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_BEGINING_INTERVIEW + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  addBegInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_BEGINING_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }
  updateBegInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_BEGINING_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }



  getMidInterviewDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_MID_INTERVIEW + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  addMidInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_MID_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }

  updateMidInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_MID_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }



  getSpecialInterviewDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_SPECIAL_INTERVIEW + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }
  addSpecialInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.E_DOSSIER_ADD_SPECIAL_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }
  updateSpecialInterviewDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_SPECIAL_INTERVIEW, form, httpOptions).pipe(map((response: any) => response));
  }

  getEdServiceSubMarks(Id, resultType, serviceSubjectType) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.E_DOSSIER_SERVICE_SUBJECT + `?serviceId=${Id}&resultType=${resultType}&serviceSubjectType=${serviceSubjectType}`, httpOptions).pipe(map((response: any) => response));
  }

  getPT_RecordsOfCadet(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PT_RECORD_OF_CADET + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }


  updatePTResult(subject) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_GC_PT_RESULT, subject, httpOptions).pipe(map((response: any) => response));
  }

  addPT_MotivationalAwards(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_PT_MOTIVATIONAL_AWARDS, data, httpOptions).pipe(map((response: any) => response));
  }

  getPT_MotivationalAwards(serviceId, termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PT_MOTIVATIONAL_AWARDS + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }





  addMotivationBadgeDetails(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_MOTIVATION_BADGE, form, httpOptions).pipe(map((response: any) => response));
  }
  updateMotivationBadgeDetails(Id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = Object.assign({}, { id: Id }, form)
    return this.http.patch(Links.UPDATE_MOTIVATION_BADGE, data, httpOptions).pipe(map((response: any) => response));
  }
  getMotivationBadgeDetails(Id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MOTIVATION_BADGE + `?serviceId=${Id}`, httpOptions).pipe(map((response: any) => response));
  }

  /*===============GC INTERVIEW=================*/
  updateinterviewDetailsGc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)  
    return this.http.put(Links.UPDATE_INTERVIEW_GC, form, httpOptions).pipe(map((response: any) => response));
  }
  updateInitialInterviewDetailsGc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    //const data = Object.assign({},{id:Id},form)
    console.log('form' + form);
    return this.http.put(Links.UPDATE_INITIAL_INTERVIEW_GC, form, httpOptions).pipe(map((response: any) => response));
  }
  updateBegInterviewDetailsGc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_BEGINING_INTERVIEW_GC, form, httpOptions).pipe(map((response: any) => response));
  }
  updateMidInterviewDetailsGc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_MID_INTERVIEW_GC, form, httpOptions).pipe(map((response: any) => response));
  }

  updateSpecialInterviewDetailsGc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_SPECIAL_INTERVIEW_GC, form, httpOptions).pipe(map((response: any) => response));
  }

  getGCAssessment(serviceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GC_ASSESSMENT + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  }

}
