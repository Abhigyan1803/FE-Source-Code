import { Injectable } from '@angular/core';
import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service/auth.service';
import { throwError } from 'rxjs';
import { SharedService } from '../shared.service';


@Injectable({
  providedIn: 'root'
})
export class AcademicDeptService {

  jwtToken = "";
  httpOptions: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService:AuthService, 
    public sharedService:SharedService,
    ) {
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('docfile', file);
    
    //  const httpOptions = {reportProgress:true,
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`),
    // };
    // return this.http.post(Links.UPLOAD_A_FILE, formData, httpOptions).pipe(map((response: any) => response));
    
    return this.http.post(Links.UPLOAD_A_FILE, formData, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`),
        reportProgress:true,
        observe: 'events'
    }
    ).pipe(map((response: any) => response),catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
  
  addSubject(data) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_ACADEMIC_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }
  getSubjectsList(termId, paper, subjectName) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_SUBJECTS_LIST + `?paper=${paper}&termId=${termId}&subjectName=${subjectName} `, httpOptions).pipe(map((response: any) => response));
  }
  getSubjectById(id) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_SUBJECT_BY_ID + `?id=${id} `, httpOptions).pipe(map((response: any) => response));
  }
  updateSubjectById(id, form) {
    const data = Object.assign({}, { academicTermId: id }, form)
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_ACADEMIC_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }
  getAssigenment(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_ASSIGNMENT + `?acdAsnId=${id}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  addAssignment(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.ADD_ACADEMIC_ASSIGNMENT, form, httpOptions).pipe(map((response: any) => response));
  }
  updateAssignment(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.put(Links.UPDATE_ACADEMIC_ASSIGNMENT, form, httpOptions).pipe(map((response: any) => response));
  }
  deleteAssignment(id,status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.DELETE_ACADEMIC +`?id=${id}&status=${status}`,{}, httpOptions).pipe(map((response: any) => response));
 
  }
  getAnswerList(paper, assignment, term, status) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_ANSWERS_LIST + `?paper=${paper}&assignmentType=${assignment}&termId=${term}&status=${1}`, httpOptions).pipe(map((response: any) => response));
  }


  getAnswerListGC(paper, type, termId, serviceId, status) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_ASSIGNMENT_ANSWERS_LIST + `?paper=${paper}&assignmentType=${type}&termId=${1}&serviceId=${serviceId}&status=${1}`, httpOptions).pipe(map((response: any) => response));
  }
  addAnswer(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.ADD_ACADEMIC_ASSIGNMENT_ANSWER, form, httpOptions).pipe(map((response: any) => response));
  }
  //////////////////CreditforExellence/////////////
  getCreditExcellence(serviceId, termId) {
    console.log(serviceId)
    console.log(termId)
    termId = 1
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CREDITOFEXELLENCE_LIST + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  addCreditExcellence(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_CREDITOFEXELLENCE, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCreditExcellence(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_CREDITOFEXELLENCE, form, httpOptions).pipe(map((response: any) => response));
  }
 


    /* ---------------------OQ MATRIX-------------------------- */
    getOQMatrix(servceId) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_OQ_MATRIX + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
    }
  
    getSubjectOQMatrix_List(serviceId, termId) {
      termId = 1
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_OQ_MATRIX + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
    }
  
    addOQMatrix(form) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.post(Links.ADD_OQ_MATRIX, form, httpOptions).pipe(map((response: any) => response));
    }
  
    updateOQMatrix(form) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.put(Links.UPDATE_OQ_MATRIX, form, httpOptions).pipe(map((response: any) => response));
    }

     /* ---------------------NEW OQ MATRIX CONTROLLER-------------------------- */

  getOQ_matrix_Subject(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX_SUBJECT +`?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getOQ_matrix_list(termId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX_CADET_list + `?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getOQ_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    if(companyName==null||companyName==''||companyName==undefined){
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  
    }
    else if (companyName!=null||companyName!=''||companyName!=undefined){
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
    }
  }
  getOQ_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'MID-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  }

  updateOQmatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.GET_OQ_MATRIX_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
  }

  getOQ_Matrix_search(termId,serviceId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX_SEARCH + `?termId=${termId}&termType=${'MID-TERM'}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }





  getOQ_Final_matrix_list(termId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX_CADET_list + `?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getOQ_Final_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    if(companyName==null||companyName==''||companyName==undefined){
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  
    }
    else if (companyName!=null||companyName!=''||companyName!=undefined){
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
    }
  }
  getOQ_Final_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&termType=${'FINAL-TERM'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  }

  getOQ_Final_Matrix_search(termId,serviceId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX_SEARCH + `?termId=${termId}&termType=${'FINAL-TERM'}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  
   /* ---------------------NEW CREDIT FOR  EXELLENCE-------------------------- */

   getCREDIT_Subject(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_CREDIT_SUBJECT +`?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getCREDIT_list(termId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_CREDIT_CADET_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getCredit_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    if(companyName==null||companyName==''||companyName==undefined){
      return this.http.get(Links.GET_NEW_CREDIT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  
    }
    else if (companyName!=null||companyName!=''||companyName!=undefined){
      return this.http.get(Links.GET_NEW_CREDIT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
    }
  }
  getCredit_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
      return this.http.get(Links.GET_NEW_CREDIT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  }
  
  updateCREDIT(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.GET_NEW_CREDIT_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
  }

  searchCREDIT(termId,serviceId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_CREDIT_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }

      /* ---------------------LEADERSHIP MATRIX CONTROLLER-------------------------- */

  getLeadership_matrix(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_LEADERSHIP_MATRIX +`?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getLeadership_matrix_list(termId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_LEADERSHIP_MATRIX_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getLeaderShip_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    if(companyName==null||companyName==''||companyName==undefined){
      return this.http.get(Links.GET_LEADERSHIP_MATRIX_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  
    }
    else if (companyName!=null||companyName!=''||companyName!=undefined){
      return this.http.get(Links.GET_LEADERSHIP_MATRIX_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
    }
  }

  getLeaderShip_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
      return this.http.get(Links.GET_LEADERSHIP_MATRIX_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  }

  getLeadership_search(termId,serviceId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_LEADERSHIP_MATRIX_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  
  updateLeadershipmatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.GET_LEADERSHIP_MATRIX_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
  }



   /* ---------------------NEW Intellectual -------------------------- */

   getIntellectual_Subject(status,termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_Intellectual_SUBJECT +`?status=${status}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }
  getIntellectual_list(termId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_Intellectual_CADET_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getIntellectual_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    if(companyName==null||companyName==''||companyName==undefined){
      return this.http.get(Links.GET_NEW_Intellectual_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  
    }
    else if (companyName!=null||companyName!=''||companyName!=undefined){
      return this.http.get(Links.GET_NEW_Intellectual_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
    }
  }
  getIntellectual_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
      return this.http.get(Links.GET_OQ_MATRIX_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
  }
  updateIntellectualMarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.GET_NEW_Intellectual_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
  }

  searchIntellectual(termId,serviceId,pageIndex,pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NEW_INTELLECTUAL_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
      /* ---------------------Leadership Development Matrix-------------------------- */
  getLDMatrix(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_MATRIX + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }

  getSubjectLDMatrix_List(serviceId, termId) {
    termId = 1
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_LD_MATRIX + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  addLDMatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_LD_MATRIX, form, httpOptions).pipe(map((response: any) => response));
  }

  updateLDMatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_LD_MATRIX, form, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------syllabus academic -------------------- */
  getSyllabusList(termId,paper,subject,status) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMIC_SYLLABUS_LIST + `?termId=${termId}&paper=${paper}&subject=${subject}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  addSyllabus(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('termId',form.termId);
    formData.append('paper',form.paper);
    formData.append('name',form.name);
    formData.append('file',form.doc);
    formData.append('subject',form.subject);
    formData.append('status',form.status);
    return this.http.post(Links.ADD_ACADEMIC_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAcademicSyllabusById(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_ACADEMIC_SYLLABUS_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateSyllabus(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = {
    //   "id": id,
    //   "name": form.name,
    //   "doc": form.url,
    //   "termId": form.termId,
    //   "status":form.status,
    //   "paper": form.paper,
    // }

    const formData = new FormData();
    formData.append('id',id);
    formData.append('termId',form.termId);
    formData.append('paper',form.paper);
    formData.append('name',form.name);
    formData.append('file',form.doc);
    formData.append('status',form.status);
    return this.http.patch(Links.UPDATE_ACADEMIC_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  




  getSports(serviceId, termId,termSession) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SPORTS + `?serviceId=${serviceId}&termId=${termId}&termSession=${termSession}`, httpOptions).pipe(map((response: any) => response));
  }
  
  addSports(data) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_SPORTS ,data , httpOptions).pipe(map((response: any) => response));
  }
  updateSports(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_SPORTS, form, httpOptions).pipe(map((response: any) => response));
  }


  updateSyllabusStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      status: status
    }
    return this.http.patch(Links.UPDATE_ACADEMIC_SYLLABUS, data, httpOptions).pipe(map((response: any) => response));
  }
  addIntellectualSkills(form) {
    // console.log(form,">>>> addcase")
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_INTELLECTUALSKILL, form, httpOptions).pipe(map((response: any) => response));
  }
  getIntellectualskills(serviceid,termid) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
 
    return this.http.get(Links.GET_INTELLECTUALSKILL_List + `?termId=${termid}&serviceId=${serviceid}`, httpOptions).pipe(map((response: any) => response));
  }
  updateIntellectual(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_INTELLECTUALSKILL, form, httpOptions).pipe(map((response: any) => response));
  }

      /* ---------------------SPORTS GAMES CONTROLLER-------------------------- */

      getGames_Sports(termId,status, termSession) {
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
        };
        return this.http.get(Links.GET_SPORTS_GAMES+`?termId=${termId}&status=${status}&termSession=${termSession}`, httpOptions).pipe(map((response: any) => response));
      }
      getGames_Sports_list(termId,termSession,pageIndex,pageSize) {
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
        };
        return this.http.get(Links.GET_SPORTS_GAMES_LIST + `?termId=${termId}&termSession=${termSession}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
      }

      getGames_Sports_listByBCName(termId,termSession,pageIndex,pageSize,battalionName,companyName) {
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
        };
        
      if(companyName==null||companyName==''||companyName==undefined){
      
        return this.http.get(Links.GET_SPORTS_GAMES_LIST+`?termId=${termId}&termSession=${termSession}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
    
      }
       else if(companyName!=null|| companyName!=''|| companyName!=undefined){
          return this.http.get(Links.GET_SPORTS_GAMES_LIST + `?termId=${termId}&termSession=${termSession}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
        }
        // else{
        //   return this.http.get(Links.GET_SPORTS_GAMES_LIST + `?termId=${termId}&termSession=${termSession}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
        // }
      }
      getGames_Sports_search(termId,termSession,serviceId,pageIndex,pageSize) {
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
        };

        return this.http.get(Links.GET_SPORTS_GAMES_SEARCH + `?termId=${termId}&termSession=${termSession}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));

      }
      
      updateGames_Sports(form) {
        const httpOptions = {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
        };
        return this.http.put(Links.GET_SPORTS_GAMES_UPDATE_LIST, form, httpOptions).pipe(map((response: any) => response));
      }

  /** ----------------------------------------------------- */

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  openSnackbarTime(msg: string, duration: number) {
    this.snackbar.open(msg, 'x', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  /** ====== DISTRIBUTION OF MARKS ========= */
  getDistributionOfMarksLIST(DistributionMarks, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Distribution_LIST + `?type=${DistributionMarks}&termId=${id}&status=${2}`, httpOptions).pipe(map((response: any) => response));
  }

  addDistributionOfMarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    /**
            url: [this.url],
            :[1],
            :[]
     */
    const formData = new FormData();
    formData.append('name',form.name);
    formData.append('termId',form.termId);
    formData.append('status',form.status);
    formData.append('type',form.type);
    formData.append('userId',form.userId);
    formData.append('doc',form.doc);

    return this.http.post(Links.ADD_Examination, formData, httpOptions).pipe(map((response: any) => response));
  }
  getDistributionOfMarksById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.VIEW_Distribution_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateDistributionOfMarks(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('termId', form.termId)
    formData.append('userId', form.userId)
    formData.append('doc', form.doc)
    return this.http.patch(Links.UPDATE_Distribution, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateDistributionOfMarksStatis(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_Distribution, formData, httpOptions).pipe(map((response: any) => response));
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
}

