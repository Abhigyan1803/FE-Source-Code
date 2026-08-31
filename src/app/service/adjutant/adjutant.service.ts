import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Links } from 'app/links.module';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdjutantService {

 
  jwtToken;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private http: HttpClient, private snackbar:MatSnackBar, private authService:AuthService) {
  }

  /** ===============GSO 1 TRAINING ===================== */

  getAdjutantList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ADJUTANT_LIST, httpOptions).pipe(map((response: any) => response));
  }


  getAdjutantaro(id, status){
    return this.http.get(Links.GET_ADJUTANT_ARO+`?id=${id}&status=${status}`).pipe(map((response: any) => response));
  }

  
  addARO(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('doc', form.document);
    formData.append('adjutantBranch.id', form.type);
    // formData.append('name', form.name);
    formData.append('name',form.name+"/"+form.year);
    formData.append('status', form.status)


    return this.http.post(Links.ADD_ARO,formData, httpOptions).pipe(map((response: any) => response));

  }
  getAROById(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_ARO_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
 
  }

  updateARO(form,id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);

    formData.append('doc', form.document);
    formData.append('adjutantBranch.id', form.type);
    // formData.append('name', form.name);
    formData.append('flag', form.forGCFlag)

    formData.append('status', form.status)

    return this.http.post(Links.UPDATE_ARO,formData, httpOptions).pipe(map((response: any) => response));

  }
  
  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  aroStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.ARO_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



 /** ================ ADJUTANT BRANCH DRILL================ */

  getAdjutantdrill(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ADJUTANT_DRILL,httpOptions).pipe(map((response: any) => response));
  }

  addDRILL(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_DRILL,form, httpOptions).pipe(map((response: any) => response));
  }

  updateDrill(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_DRILL,form, httpOptions).pipe(map((response: any) => response));
  }

  getDrillyId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_DRILL_BY_ID +`?id=${id}`,httpOptions).pipe(map((response: any) => response));
  }
  changeStatus
  drillStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    this.changeStatus={
    id:id,
    status:status
    }
    return this.http.put(Links.DRILL_STATUS, this.changeStatus, httpOptions).pipe(map((response: any) => response));
  }


   /** ================ ADJUTANT POP================ */
  getPOP(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_POP,formData, httpOptions).pipe(map((response: any) => response));
  }

  addPOP(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('letterNo', form.letterNo);
    formData.append('scheduleDate', form.scheduleDate)
    formData.append('subject', form.subject);
    formData.append('status', form.status)
    return this.http.post(Links.ADD_POP,formData, httpOptions).pipe(map((response: any) => response));

  }

  updatePOP(form,id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);

    formData.append('file', form.file);
    formData.append('letterNo', form.letterNo);
    formData.append('scheduleDate', form.scheduleDate)
    formData.append('subject', form.subject);
    formData.append('status', form.status)

    return this.http.post(Links.UPDATE_POP,formData, httpOptions).pipe(map((response: any) => response));

  }

  getPOPId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_POP_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
 
  }

  orderPOPStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.POP_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

     /** ================ ADJUTANT POP================ */
     getSOP(status) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      const formData = new FormData();
      formData.append('status', status)
      return this.http.post(Links.GET_SOP,formData, httpOptions).pipe(map((response: any) => response));
    }
  
    addSOP(form){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
  
      const formData = new FormData();
      formData.append('file', form.file);
    formData.append('letterNo', form.letterNo);
    formData.append('scheduleDate', form.scheduleDate)
    formData.append('subject', form.subject);
    formData.append('status', form.status)
      return this.http.post(Links.ADD_SOP,formData, httpOptions).pipe(map((response: any) => response));
  
    }
  
    updateSOP(form,id){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
  
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', form.file);
      formData.append('letterNo', form.letterNo);
      formData.append('scheduleDate', form.scheduleDate)
      formData.append('subject', form.subject);
      formData.append('status', form.status)
  
      return this.http.post(Links.UPDATE_SOP,formData, httpOptions).pipe(map((response: any) => response));
  
    }
  
    getSOPId(id){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      
      const formData = new FormData();
      formData.append('id', id);
      return this.http.post(Links.GET_SOP_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
   
    }
  
    orderSOPStatus(id, status){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      const formData = new FormData();
      formData.append('id', id);
      formData.append('status', status)
      return this.http.post(Links.SOP_STATUS, formData, httpOptions).pipe(map((response: any) => response));
    }
  
   /** ================ ADJUTANT Reception of gc================ */
   getReception(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_Reception,formData,httpOptions).pipe(map((response: any) => response));
  }

  addReception(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('file', form.file);
    formData.append('letterNo', form.letterNo);
    // formData.append('scheduleDate', form.scheduleDate)
    formData.append('subject', form.subject);
    formData.append('status', form.status)

    return this.http.post(Links.ADD_Reception,formData, httpOptions).pipe(map((response: any) => response));

  }

  updateReception(form,id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);

    formData.append('file', form.file);
    formData.append('letterNo', form.letterNo);
    // formData.append('scheduleDate', form.scheduleDate)
    formData.append('subject', form.subject);
    formData.append('status', form.status);

    return this.http.post(Links.UPDATE_Reception,formData, httpOptions).pipe(map((response: any) => response));

  }

    getReceptionId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_Reception_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
 
  }

  orderReceptionStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.Reception_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
   /** ================ ADJUTANT BRANCH Order ================ */
   getAdjutantOrder(id,status) {
    return this.http.get(Links.GET_ADJUTANT_ORDER+`?id=${id}&status=${status}`).pipe(map((response: any) => response));
  }

  addAdjutantOrder(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('doc', form.document);
    formData.append('adjutantBranch.id', form.type);
    formData.append('name', form.name);
    formData.append('status', form.status)
    formData.append('flag', form.forGCFlag)
    formData.append('description', form.description)


    return this.http.post(Links.ADD_ORDER,formData, httpOptions).pipe(map((response: any) => response));
  }

  updateOrder(form,id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);

    formData.append('doc', form.document);
    formData.append('adjutantBranch.id', form.type);
    formData.append('name', form.name);
    formData.append('status', form.status)
    formData.append('flag', form.forGCFlag)
    formData.append('description', form.description)

    

    return this.http.post(Links.UPDATE_ORDER,formData, httpOptions).pipe(map((response: any) => response));

  }

  getOrderId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
        const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_ORDER_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
  }

  orderStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.ORDER_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ================ ADJUTANT Reception of gc================ */
  getScheduleList(type,status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_DRILL_COMP_SCHEDULE_LIST+`?type=${type}&status=${status}  `,httpOptions).pipe(map((response: any) => response));
  }
  getSCHEDULE(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_SCHEDULE_LIST,formData,httpOptions).pipe(map((response: any) => response));
  }

  addScheduleNResult(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    for(let prop in form){
      formData.append(`${prop}`,form[prop])
    }
    // formData.append('file', form.file);
    // formData.append('title', form.title);
    // formData.append('status', form.status)

    return this.http.post(Links.ADD_SCHEDULE,formData, httpOptions).pipe(map((response: any) => response));
  }

  addSCHEDULE(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('file', form.file);
    formData.append('title', form.title);
    formData.append('status', form.status)
    return this.http.post(Links.ADD_SCHEDULE,formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSCHEDULE(form,id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', form.file);
    formData.append('title', form.title);
    formData.append('status', form.status);
    formData.append('type', form.type);

    return this.http.post(Links.UPDATE_SCHEDULE,formData, httpOptions).pipe(map((response: any) => response));

  }

    viewSCHEDULEId(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_SCHEDULE_BY_ID, formData   ,httpOptions).pipe(map((response: any) => response));
 
  }

  orderSCHEDULEStatus(id, status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.SCHEDULE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  // ================================================
  getAcademyParadeState(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMY_PARADE_STATE + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getAcademyParadeUnauth(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    return this.http.get(Links.GET_ACADEMY_PARADE_STATE + `?&status=${status}`).pipe(map((response: any) => response));
  }
  


  addParadeState(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('paradeDoc', form.doc)
    return this.http.post(Links.ADD_ACADEMY_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateParadeState(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('paradeDoc', form.doc)

    return this.http.patch(Links.UPDATE_ACADEMY_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAcademyParadeStateById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_ACADEMY_PARADE_STATE_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeParadeStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_ACADEMY_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }
/////////////// Term ///////////
getAllTerms(){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
}

  
 /** ----------------------I Card------------------------------- */


 getICardLIST(status) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_ICARD_LIST + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
}

addICard(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
 

  return this.http.post(Links.ADD_ICARD, form, httpOptions).pipe(map((response: any) => response));
}

getICardById(id) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_CARD_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
}

updateICard(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.put(Links.UPDATE_CARD, form, httpOptions).pipe(map((response: any) => response));
}

updateICardStatus(id, status) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.UPDATE_CARD + `?id=${id}&status=${status}`, httpOptions).pipe(map((response: any) => response));
}

  /* ---------------------New Drill CONTROLLER-------------------------- */

getDrill_Subject(status) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_NEW_DRILL_SUBJECT +`?id=${status}`, httpOptions).pipe(map((response: any) => response));
}
getDrillAllCadetlist(termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_NEW_DRILL_CADET_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}

updateDrillCadet(data) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.GET_NEW_DRILL_SAVE_list, data, httpOptions).pipe(map((response: any) => response));
}

searchDRILL(termId,serviceId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_NEW_DRILL_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}

getBattalionList() {
  return this.http.get(Links.GET_BATTALION_LIST).pipe(map((response: any) => response));
}

getDrill_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_NEW_DRILL_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_NEW_DRILL_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}

getRun_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_CADET_RUNBACK+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}

getCamp_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_NEW_DRILL_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}
 
getCompanyList(id) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('id', id);
  return this.http.post(Links.GET_COMPANY_BY_BATTALION, formData, httpOptions).pipe(map((response: any) => response));
}



  /* ---------------------New OQ Drill CONTROLLER-------------------------- */

getOQ_DRILL_list(termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_OQ_DRILL_CADET_list + `?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
getOQ_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}
getOQ_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}

updateOQDrill(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.GET_OQ_DRILL_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
}

getOQ_DRILL_search(termId,serviceId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_OQ_DRILL_SEARCH + `?termId=${termId}&termType=${'MID-TERM'}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}


// OQ Drill Final Term

getOQ_Final_DRILL_list(termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_OQ_DRILL_CADET_list + `?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
getOQ_Final_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}
getOQ_Final_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  
    return this.http.get(Links.GET_OQ_DRILL_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}

updateOQFinalDrill(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.GET_OQ_DRILL_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
}

getOQ_Final_DRILL_search(termId,serviceId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_OQ_DRILL_SEARCH + `?termId=${termId}&termType=${'FINAL-TERM'}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}


getGC_PunishmentList(pageNo,pageSize,termId?,battalion?,company?,serviceId?){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  let searchParams;
  if(termId && battalion && company){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}&battalion=${battalion}&company=${company}`;
  } else if(termId && !battalion && !company){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}`;
  }  else if(termId && battalion && !company){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}&battalion=${battalion}`;
  } else if(termId && battalion && company){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}&battalion=${battalion}&company=${company}`;
  } else if(serviceId){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&serviceId=${serviceId}`;
  } else if(battalion && !company && !termId){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&battalion=${battalion}`;
  } else if(battalion && company && !termId){
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}&battalion=${battalion}&company=${company}`;
  } else {
    searchParams = `?pageNo=${pageNo}&pageSize=${pageSize}`;
  }
  return this.http.get(Links.GET_LIST_OF_GCS_PUNISHMENTS + searchParams, httpOptions).pipe(map((response: any) => response));
}

getCadetByIMA_No(imaNo){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_GC_BY_IMA_NO+`?serviceId=${imaNo}`, httpOptions).pipe(map((response: any) => response));
}


addGC_Punishment(data) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.post(Links.ADD_GC_PUNISHMENT, data, httpOptions).pipe(map((response: any) => response));
}

getGCAllPunishments(serviceId){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_GC_PUNISMENTS + `?serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
}

editGC_Punishment(data){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.post(Links.UPDATE_GC_PUNISHMENT, data, httpOptions).pipe(map((response: any) => response));

}



}