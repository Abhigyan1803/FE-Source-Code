import { Injectable } from '@angular/core';

import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TrgTeamService {
obj:any;

jwtToken;
 httpOptions 

 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService:AuthService) {
  console.log('trg team service initialized')
    this.jwtToken = localStorage.getItem('jwtToken');
    
  }



  //============ GET CAMP MARKS ============

  getCampMarks(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CAMP_MARKS + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }
  //============ ORGANIZATIN CHART DATA ============
  getOrganizationChartData(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ORGANIZATION_CHART).pipe(map((response: any) => response));  
  }


  
  /** ===============GSO 1 TRAINING ===================== */

  addSopDocument(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('document', form.doc)

    return this.http.post(Links.ADD_SOP_DOCUMENT, formData, httpOptions).pipe(map((response: any) => response));
  }
  

  getAllGsoOneTrg() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_TRG_DOCS, httpOptions).pipe(map((response: any) => response));
  }

  changeGSOOneTrgDocStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_GSO_ONE_TRG_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getSopDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.GET_SOP_DETAILS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSOPDoc(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('document', form.doc)

    return this.http.post(Links.UPDATE_SOP_DOC, formData, httpOptions).pipe(map((response: any) => response));

  }

  /** ============ SCHEDULE OF CENTRALLECTURE ==============*/

  addSCentralLecture(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('document', form.doc)

    return this.http.post(Links.ADD_CENTRALLECTURE, formData, httpOptions).pipe(map((response: any) => response));
  }
  getAllCentralLecture() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALLCENTRALLECTURE, httpOptions).pipe(map((response: any) => response));
  }

  changeGSOOneTrglCentralLectureStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_CENTRALLECTURE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getlCentralLectureDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.GET_CENTRALLECTURE_DETAILS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatelCentralLectureDoc(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('document', form.doc)

    return this.http.post(Links.UPDATE_CENTRALLECTURE_DOC, formData, httpOptions).pipe(map((response: any) => response));

  }


  /** ============ SCHEDULE OF EXERCISES ==============*/



  getRESP() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_ALL_RESP, httpOptions).pipe(map((response: any) => response));
  }

  addScheduleOfExercise(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = {
    //   seasonTermId:form.seasonTerm,
    //   year:form.year,
    //   exercise: form.exercise,
    //   termId: form.termId,
    //   dsBriefing: form.dsBriefing,
    //   recceTewt: form.recceTewt,
    //   bbe: form.bbe,
    //   verbalOrders: form.verbalOrders,
    //   smd: form.smd,
    //   duration: form.duration,
    //   respId: form.resp,
    //   status: form.status
    // }
    console.log(form,"service");

    // const formData = new FormData();
    // formData.append('seasonTerm', form.seasonTerm);
    // formData.append('year', form.year);
    // formData.append('exercise', form.exercise)
    // formData.append('termId', form.termId)
    // formData.append('dsBriefing', form.dsBriefing)
    // formData.append('recceTewt', form.recceTewt)
    // formData.append('bbe', form.bbe)
    // formData.append('verbalOrders', form.verbalOrders)
    // formData.append('smd', form.smd)
    // formData.append('duration', form.duration)
    // formData.append('respId', form.resp)
    // formData.append('status', form.status)
    // formData.append('url', form.url)
    
    return this.http.post(Links.ADD_SCHEDULE_OF_EXERCISE, form, httpOptions).pipe(map((response: any) => response));
  }

  getScheduleOfExercisesList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

   
    return this.http.post(Links.GET_SCHEDULEs_OF_EXERCISEs_LIST,'', httpOptions).pipe(map((response: any) => response));
  }

  getScheduleOfExerciseById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.GET_SCHEDULE_OF_EXERCISE_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateScheduleOfExercise(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = {
    //   id: id,
    //   seasonTermId:form.seasonTerm,
    //   year:form.year,
    //   bbe: form.bbe,
    //   dsBriefing: form.dsBriefing,
    //   duration: form.duration,
    //   exercise: form.exercise,
    //   recceTewt: form.recceTewt,
    //   respId: form.resp,
    //   smd: form.smd,
    //   termId: parseInt(form.termId),
    //   verbalOrders: form.verbalOrders,
    //   status: form.status
    // }
    // const formData = new FormData();
    // formData.append('id', id);
    // formData.append('seasonTermId', form.seasonTerm);
    // formData.append('year', form.year);
    // formData.append('bbe', form.bbe)
    // formData.append('dsBriefing', form.dsBriefing)
    // formData.append('duration', form.duration);
    // formData.append('exercise', form.exercise);
    // formData.append('recceTewt', form.recceTewt);
    // formData.append('respId', form.resp)
    // formData.append('smd', form.smd)
    // formData.append('termId', form.termId);
    // formData.append('verbalOrders', form.verbalOrders);
    // formData.append('status', form.status)
    // formData.append('url', form.url)
    return this.http.post(Links.UPDATE_SCHEDULE_OF_EXERCISE, form, httpOptions).pipe(map((response: any) => response));
  }

  changeSchduleOfExerciseStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
    return this.http.post(Links.CHANGE_SCHEDULE_OF_EXERCISE_STATUS, formData, httpOptions).pipe(map((response: any) => response));

  }




  /** -------------------------- */

  /** ================= GSO 2 PGME SYLLABUS ================= */

  getBattalions() {
    return this.http.get(Links.GET_BATTALIONS_FOR_SYLLABUS).pipe(map((response: any) => response));
  }

  /**===========SEASON TERM============= */

  getAllSeasonTerms(status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status);
    return this.http.post(Links.GET_ALL_ADDED_SEASON_TERMS_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addFullSeasonTerm(form){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      startDate: form.startDate,
      endDate: form.endDate,
      sessionYear: form.year,
      status: form.status,
      termSeason: {id:form.seasonTerm}
    }
    return this.http.post(Links.ADD_A_FULL_SEASON_TERM, data, httpOptions).pipe(map((response: any) => response));
  }


  /**==================================== */



  addTermSyllabus(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('date',form.date);
    formData.append('name',form.name);
    formData.append('term', form.term);
    formData.append('description',form.description);
    formData.append('status', form.status);
    formData.append('Syllabusdoc', form.document)
    formData.append('syllabusType', 'Term');

    return this.http.post(Links.ADD_TERM_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getTermSyllabus() {
  
    return this.http.get(Links.GET_TERM_SYLLABUSES).pipe(map((response: any) => response));
  }

  getTermSyllabusById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_TERM_SYLLABUS_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateTermSyllabus(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('date',form.date);
    formData.append('name',form.name);
    formData.append('term', form.term);
    formData.append('description',form.description);
    formData.append('status', form.status);
    formData.append('Syllabusdoc', form.document);
    return this.http.patch(Links.UPDATE_TERM_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  
  updateTermSyllabusStatus(id,status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status);
    formData.append('id', id);
    return this.http.patch(Links.UPDATE_TERM_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /** ========= Syllabus CELL============*/

  addSyllabus(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('date', form.date);
    formData.append('description', form.description);
    formData.append('status', form.status);
    formData.append('Syllabusdoc', form.document);
    formData.append('syllabusType', form.type);
    formData.append('termId', form.termId);

    return this.http.post(Links.ADD_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  
  updateSyllabus(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('date', form.date);
    formData.append('description', form.description);
    formData.append('status', form.status);
    if(form.document){
      formData.append('Syllabusdoc', form.document);
    }
    formData.append('termId', form.termId);

   
    formData.append('syllabusType', form.type);
    formData.append('id', form.id);
    return this.http.patch(Links.UPDATE_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  getSyllabusList(type,termId,status){
    
    return this.http.get(Links.GET_ALL_SYLLABUS_LIST+`?type=${type}&status=${status}&termId=${termId}`).pipe(map((response: any) => response));
  }

  getSyllabusById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SYLLABUS_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }
  
  updateSyllabusStatus(id,status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status);
    formData.append('id', id);
    return this.http.patch(Links.UPDATE_SYLLABUS, formData, httpOptions).pipe(map((response: any) => response));
  }
/** =========== STUDY MATERIAL ============= */

getStudyMaterialList(type,termId){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_BMT1_LIST + `?type=${type}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));

}

changeStudyMaterialStatus(id,status){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('id', id);
  formData.append('status', status)
  return this.http.patch(Links.UPDATE_BMT1_STATUS, formData, httpOptions).pipe(map((response: any) => response));

}

addStudyMaterial(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('name', form.name)
  formData.append('status', form.status)
  formData.append('description', form.description)
  formData.append('date', new Date().toISOString().slice(0, 10))
  formData.append('studyMaterialType', form.studyMaterialType)
  formData.append('Syllabusdoc', form.doc)
  formData.append('termId', form.termId)

  return this.http.post(Links.ADD_BMT1, formData, httpOptions).pipe(map((response: any) => response));
}

getStudyMaterialById(id) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_BMT1_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
}


updateStudyMaterial(id, form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('id', id)
  formData.append('name', form.name)
  formData.append('status', form.status)
  formData.append('studyMaterialType', form.studyMaterialType)
  formData.append('description', form.description)
  formData.append('date', new Date().toISOString().slice(0, 10))
  formData.append('Syllabusdoc', form.doc)
  console.log(formData, '>>');

  return this.http.patch(Links.UPDATE_BMT1, formData, httpOptions).pipe(map((response: any) => response));
}
updateStudyMaterialDelete(id, status) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('id', id)
  formData.append('status', status)
  return this.http.patch(Links.UPDATE_BMT1, formData, httpOptions).pipe(map((response: any) => response));
}






  /**  GENERAL INSTRUCTIONS =========== */

  getAllAdventureCellType() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_ALL_ADVENTURE_CELL_TYPE, httpOptions).pipe(map((response: any) => response));
  }

  getAllSeasonTerm() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_TERMS).pipe(map((response: any) => response));
  }

  getAllTerms(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
  }
  
  addGenralInstruction(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('docName', form.docName);
    formData.append('acType', form.acType);
    formData.append('term', form.term);
    formData.append('year', form.year);
    formData.append('description', form.description);
    formData.append('document', form.document);
    formData.append('status', form.status);
    return this.http.post(Links.ADD_GENERAL_INSTRUCTION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateGenralInstruction(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    formData.append('docName', form.docName);
    formData.append('acType', form.acType);
    formData.append('term', form.term);
    formData.append('year', form.year);
    formData.append('description', form.description);
    formData.append('document', form.document);
    formData.append('status', form.status);

    return this.http.post(Links.UPDATE_GENERAL_INSTRUCTION, formData, httpOptions).pipe(map((response: any) => response));

  }

  getAllGeneralInstructions() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_GENERAL_INSTRUCTIONS, httpOptions).pipe(map((response: any) => response));

  }

  changeInstructionStatus(id, status) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData()
    formData.append('id', id)
    formData.append('status', status)
    // const data ={
    //   "id":id,
    //   "status":status
    // }
    return this.http.post(Links.CHANGE_INSTRUCTION_STATUS, formData, httpOptions).pipe(map((response: any) => response));

  }

  getInstructionById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData()
    formData.append('id', id)
    return this.http.post(Links.GET_INSTRUCTION_DETAILS_BY_ID, formData, httpOptions).pipe(map((response: any) => response));

  }




  /** ============= ADVENTURE CELL ----  LETTERS =================*/

  addLetter(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('acType', form.acType)
    formData.append('status', form.status)
    formData.append('doc', form.doc)
    return this.http.post(Links.ADD_ADVENTURE_CELL_LETTER, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllLetters() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_ALL_LETTERS, httpOptions).pipe(map((response: any) => response));
  }

  getLetterById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData()
    formData.append('id', id)
    return this.http.post(Links.VIEW_LETTER_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }


  updateLetter(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('acType', form.acType)
    formData.append('status', form.status)
    formData.append('doc', form.doc)
    return this.http.post(Links.UPDATE_LETTER, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeLetterStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_LETTER_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ================ DATESHEET ============== */

  addDatesheet(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('termId', form.termId)

    return this.http.post(Links.ADD_DATESHEET, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllDatesheets(termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_DATESHEET+`?termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }


  viewDatesheetById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_DATESHEET_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }


  updateDatesheet(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    return this.http.post(Links.UPDATE_DATESHEET, formData, httpOptions).pipe(map((response: any) => response));
  }


  changeDatesheetStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_DATESHEET_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /**==========BMT 1 & 2 EXAM SCHEDULE============== */
  
  addExamSchedue(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('termId', form.termId)
    formData.append('type', form.type)
    formData.append('subType', form.subType)
    

    return this.http.post(Links.ADD_EXAM_SCHEDULE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getExamScheduleList(termId,type,subType) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EXAM_SCHEDULE_LIST+`?termId=${termId}&type=${type}&subType=${subType}`, httpOptions).pipe(map((response: any) => response));
  }


  viewExamScheduleById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_EXAM_SCHEDULE_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }


  updateExamSchedule(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('termId', form.termId)
    formData.append('type', form.type)
    formData.append('subType', form.subType)
    

    return this.http.post(Links.UPDATE_EXAM_SCHEDULE, formData, httpOptions).pipe(map((response: any) => response));
  }


  changeExamScheduleStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_EXAM_SCHEDULE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  /** ------------------------------ */

  /** ============== GSO 2 PGME =============== */


  /** ========= TRG CALENDAR =========== */

  getAllWeeks(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_WEEK).pipe(map((response: any) => response));
  }

  /** ------DAILY PROGRAMS -------- */
  addTRGDailyProgram(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      "battalian":form.battalion,
      "week": form.week,
      "term": form.term,
      "sessionTerm":form.seasonTerm,
      "year":form.year,
      "date": form.date,
      "startTime": form.startTime,
      "endTime": form.endTime,
      "period": form.period,
      "subject": form.subject,
      "type": form.type,
      "lession": form.lession,
      "instruction": form.instruction,
      "place": form.place,
      "status": form.status
    }
    return this.http.post(Links.ADD_TRG_CALENDAR_PROGRAM, data, httpOptions).pipe(map((response: any) => response));
  }


  getAllTRGDailyPrograms() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_TRG_CALENDAR_PROGRAMS, httpOptions).pipe(map((response: any) => response));
  }

  getTRGProgramById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_TRG_CALENDAR_PROGRAM_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  
  updateTRGProgramStatus(id,status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "id":id,
      "status": status
    }
    return this.http.patch(Links.UPDATE_TRG_CALENDAR_PROGRAM,data ,httpOptions).pipe(map((response: any) => response));
  }


  updateTRGProgram(id,form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "id":id,
      "battalian":form.battalion,
      "week": form.week,
      "term": form.term,
      "date": form.date,
      "sessionTerm":form.seasonTerm,
      "year":form.year,
      "startTime": form.startTime,
      "endTime": form.endTime,
      "period": form.period,
      "subject": form.subject,
      "type": form.type,
      "lession": form.lession,
      "instruction": form.instruction,
      "place": form.place,
      "status": form.status
    }
   
    return this.http.patch(Links.UPDATE_TRG_CALENDAR_PROGRAM,data ,httpOptions).pipe(map((response: any) => response));
  }



  /** ------WEEKLY PROGRAMS---------- */

  getAllDatesOfWeek(seasonTerm,year,week){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('seasonYear',seasonTerm)
    formData.append('year',year)
    formData.append('week',week)
    return this.http.post(Links.GET_ALL_DATES_OF_WEEK, formData, httpOptions).pipe(map((response: any) => response));
  }



  addWeeklyProgram(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
 // weekEndDate: "2022-11-27T18:00:00.000Z",
    // weekStartDate: "2022-11-21T18:00:00.000Z",
    const data = {
      battalian: { id:form.battalion },
      weeklyScheduleDate: form.weeklyScheduleDate,
      sessionTerm: { id: form.seasonTerm},
      status: form.status,
      term: { id: form.term},
      week: { id: form.week},
      weekEndDate: form.weekEndDate,
      weekStartDate: form.weekStartDate,
      year: form.year
    }

    return this.http.post(Links.ADD_WEEKLY_PROGRAM, data, httpOptions).pipe(map((response: any) => response));

  }

  getWeeklyPrograms() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_WEEKLY_PROGRAMS, httpOptions).pipe(map((response: any) => response));
  }

  changeWeeklyProgramStatus(id,status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "id":id,
      "status": status
    }
    return this.http.patch(Links.UPDATE_WEEKLY_PROGRAM, data, httpOptions).pipe(map((response: any) => response));
 
  }

  getWeeklyProgramById(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WEEKLY_PROGRAM_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));  
  }

  updateWeeklyProgram(id,form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id, 
      battalian: { id: form.battalion },
      weeklyScheduleDate: form.weeklyScheduleDate,
      sessionTerm: { id: form.seasonTerm },
      status: form.status,
      term: { id: form.term },
      week: { id: form.week },
      weekEndDate: form.weekEndDate,
      weekStartDate: form.weekStartDate,
      year: form.year
    }
    return this.http.patch(Links.UPDATE_WEEKLY_PROGRAM, data, httpOptions).pipe(map((response: any) => response));
  }


  /** ============ FORECAST OF TRG EVENTS ============ */
  addForecast(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('sessionTerm', form.sessionTerm);
    formData.append('year', form.year)
    formData.append('week', form.week);
    formData.append('date', form.date)
    formData.append('description', form.description)
    formData.append('status', form.status)
    formData.append('isGcLec', form.isGcLec)
    formData.append('mapImage', form.mapImage)
    return this.http.post(Links.ADD_FORECAST, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllForecast(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_FORECASTS+`?status=${status}&isGcLec=${true}`).pipe(map((response: any) => response));
  }

  changeForecastStatus(id,status){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    
    const data = {
      "id":id,
      "status": status
    }
    return this.http.patch(Links.UPDATE_FORECAST, data, httpOptions).pipe(map((response: any) => response));
  
  }

  getForecastById(id){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_FORECAST_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }


  updateForecast(id,form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('sessionTerm', form.sessionTerm);
    formData.append('year', form.year)
    formData.append('week', form.week);
    formData.append('date', form.date)
    formData.append('description', form.description)
    formData.append('status', form.status)
    formData.append('mapImage', form.mapImage)
  
    return this.http.patch(Links.UPDATE_FORECAST, formData, httpOptions).pipe(map((response: any) => response));
  }
  /** ---------------------------------- */

  /** ---------------Transport ------------------- */

  addTransport(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('file', form.file)
    formData.append('status', form.status)
    return this.http.post(Links.ADD_TRANSPORT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getTransport() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_TRANSPORT, '', httpOptions).pipe(map((response: any) => response));
  }

  getByIdTransport(id) {
    var formData = new FormData();
    formData.append('id', id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_TRANSPORT_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateTransport(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('file', form.file)
    formData.append('status', form.status)
    formData.append('id', form.id)
    return this.http.post(Links.UPDATE_TRANSPORT, formData, httpOptions).pipe(map((response: any) => response));
  }
  changeTransportStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_TRANSPORT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** ---------------Nominal ------------------- */

  addNominal(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('file', form.file)
    formData.append('status', form.status)
    return this.http.post(Links.ADD_NOMINAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  getNominal() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_NOMINAL, '', httpOptions).pipe(map((response: any) => response));
  }

  getByIdNominal(id) {
    var formData = new FormData();
    formData.append('id', id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_NOMINAL_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateNominal(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('file', form.file)
    formData.append('status', form.status)
    formData.append('id', form.id)
    return this.http.post(Links.UPDATE_NOMINAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeNominalStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_NOMINAL_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------------Sops ------------------- */

  addSops(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('docName', form.docName)
    formData.append('description', form.description)
    formData.append('document', form.document)
    formData.append('status', form.status)
    formData.append('acType', form.acType)
    formData.append('term', form.term)
    formData.append('year', form.year)
    return this.http.post(Links.ADD_SOPS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getSops() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SOPS, httpOptions).pipe(map((response: any) => response));
  }

  getByIdSops(id) {
    var formData = new FormData();
    formData.append('id', id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_SOPS_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSops(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('docName', form.docName)
    formData.append('description', form.description)
    formData.append('file', form.file)
    formData.append('status', form.status)
    formData.append('id', form.id)
    formData.append('acType', form.acType)
    formData.append('term', form.term)
    formData.append('year', form.year)
    return this.http.post(Links.UPDATE_SOPS, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeSopsStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)

    return this.http.post(Links.CHANGE_SOPS_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** ---------------Chart ------------------- */

  addChart(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('acType', form.acType)
    formData.append('seasonTerm', form.seasonTerm)
    formData.append('year', form.year)
    return this.http.post(Links.ADD_CHART, formData, httpOptions).pipe(map((response: any) => response));
  }

  getChart() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CHART, httpOptions).pipe(map((response: any) => response));
  }

  getByIdChart(id) {
    var formData = new FormData();
    formData.append('id', id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_CHART_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateChart(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', form.id)
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('acType', form.acType)
    formData.append('seasonTerm', form.seasonTerm)
    formData.append('year', form.year)
    return this.http.post(Links.UPDATE_CHART, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeChartStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)

    return this.http.post(Links.CHANGE_CHART_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------------Report ------------------- */

  addReport(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('acType', form.acType)
    formData.append('seasonTerm', form.seasonTerm)
    formData.append('year', form.year)
    return this.http.post(Links.ADD_REPORT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getReport() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_REPORT, httpOptions).pipe(map((response: any) => response));
  }

  getByIdReport(id) {
    var formData = new FormData();
    formData.append('id', id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_REPORT_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateReport(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', form.id)
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('doc', form.doc)
    formData.append('status', form.status)
    formData.append('acType', form.acType)
    formData.append('seasonTerm', form.seasonTerm)
    formData.append('year', form.year)
    return this.http.post(Links.UPDATE_REPORT, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeReportStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)

    return this.http.post(Links.CHANGE_REPORT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /** -------------------Weapons--------------------- */


  addWeapon(form) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_WEAPON, form, httpOptions).pipe(map((response: any) => response));
  }

  getWeaponByTerm(termId,status) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WEAPON_BY_TERM1+`?termId=${termId}`+ `&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  getWeaponByTermResult(serviceId,termId) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WEAPON_BY_TERM+`?serviceId=${serviceId}`+ `&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  getByIdWeapon(id) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WEAPON_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateWeapon(form) {
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_WEAPON, form, httpOptions).pipe(map((response: any) => response));
  }

  changeWeaponStatus(id,s) {
    let data = {
      id:id,
      status:s
    }
  
     const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_WEAPON, data, httpOptions).pipe(map((response: any) => response));
  }

  /** ------------------------------ */
  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  addResult(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

  //  const data = form.cadetWTMainResultlist
    // const data = {
    //   "attrName":form.name,
    //   "total": form.total,
    //   "std": form.std,
    //   "gpt":form.gpt,
    //   "remark":form.remark,
    //   "marks": form.marks,
    // }
    return this.http.post(Links.ADD_WP_RESULT, form, httpOptions).pipe(map((response: any) => response));
  }

   updateResult(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_RESULT_WP, form, httpOptions).pipe(map((response: any) => response));
  }

  getWTT(termId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WTT + `?termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }

  getExamParam(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EXAM_WTT + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  
  
addWtt(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const data = {
    termId: form.termId,
    spotTestMark: form.spotTestMark,
    wttMark: form.wttMark,
    status:form.status
  }

  return this.http.post(Links.ADD_WTT_MARKS, data, httpOptions).pipe(map((response: any) => response));
}

getSUBJECTByID(id) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('id', id);
  
  return this.http.get(Links.VIEW_SUBJECT_BY_ID+`?id=${id}`, httpOptions).pipe(map((response: any) => response));
}

updateSUBJECT(id, form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const data = {
    id: id,
    subjectName: form.subjectName,
    plTotalMarks: form.plTotalMarks,
    bnTotalMarks: form.bnTotalMarks,
    coyTotalMarks: form.coyTotalMarks,
    status:form.status
  }
  return this.http.post(Links.UPDATE_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
}


/*------------------------EQTN NEW----------------------*/

getEqtn(serviceId, termId) {
  console.log(serviceId)
  console.log(termId)
  
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_EQTN + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
}
addEqtn(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.post(Links.Add_EQTN, form, httpOptions).pipe(map((response: any) => response));
}
updateEqtn(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.UPDATE_EQTN, form, httpOptions).pipe(map((response: any) => response));
}




/*------------------------OQ EQTN NEW----------------------*/

getOqEqtn_All_ListByBCName(termType,termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };

  // if(battalionName==null|| battalionName==undefined || battalionName==''){
  //   return this.http.get(Links.GET_OQEQTN_ALL_LIST+`?termType=${termType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  // }
 if(companyName==null||companyName==''||companyName==undefined){
  return this.http.get(Links.GET_OQEQTN_ALL_LIST+`?termType=${termType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}
else if (companyName!=null||companyName!=''||companyName!=undefined){
  return this.http.get(Links.GET_OQEQTN_ALL_LIST+`?termType=${termType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
}
else{
  return this.http.get(Links.GET_OQEQTN_ALL_LIST+`?termType=${termType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
}

getOqEqtn_All_List(termType,termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_OQEQTN_ALL_LIST+`?termType=${termType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));


}


updateOqEqtn(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.UPDATE_OQEQTN, form, httpOptions).pipe(map((response: any) => response));
}

getOqEqtn_search(termId,serviceId,termType,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_SEARCH_OQEQTN + `?termId=${termId}&serviceId=${serviceId}&termType=${termType}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
/* ---------------------BMT1-------------------------- */


// getBmt1list(termId,pageIndex,pageSize) {
//   const httpOptions = {
//     headers: new HttpHeaders()
//       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
//   };
//   return this.http.get(Links.GET_BMT1_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
// }
getBmt1MidDetails(resultType,termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_BMT1_DETAILS + `?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'mid-term'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
getBmt1FinalDetails(resultType,termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_BMT1_DETAILS + `?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
updateBmt1Details(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.UPDATE_BMT1_DETAILS, form, httpOptions).pipe(map((response: any) => response));
}

getBmt1search(termId,serviceId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_BMT1_SEARCH + `?termId=${termId}&serviceId=${serviceId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}




    /* ---------------------BMT2-------------------------- */
    getBmt2Subject(status,termId) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_BMT2_SUBJECT +`?status=${status}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
    }


    getBmt2_list(resultType,termId,pageIndex,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_BMT2_list + `?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    getBmt2search(termId,serviceId,pageIndex,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_BMT2_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    
    updateBmt2Details(form) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.put(Links.UPDATE_BMT2_DETAILS, form, httpOptions).pipe(map((response: any) => response));
    }
  
    getEqtn_All_List(termId,pageIndex,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_EQTN_ALL_List+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }

    getEqtn_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
     
      if(companyName==null||companyName==''||companyName==undefined){
      
        return this.http.get(Links.GET_EQTN_ALL_List+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
    
      }
      else if (companyName!=null||companyName!=''||companyName!=undefined ){
      
        return this.http.get(Links.GET_EQTN_ALL_List+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
      }
    }

    getEqtn_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      
        return this.http.get(Links.GET_EQTN_ALL_List+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
    }
    
    
    
    getEqtn_Search(termId,serviceId,pageIndex,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_EQTN_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));

    }
    
    update_Eqtn(form) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.put(Links.GET_EQTN_UPDATE, form, httpOptions).pipe(map((response: any) => response));
    }
    getBattalionList() {
    
      return this.http.get(Links.GET_BATTALION_LIST).pipe(map((response: any) => response));
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

    getEqtnById(termId,status) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_ALL_CADET_EQTN +`?termId=${termId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
    }
    
    /* ---------------------New WT CONTROLLER-------------------------- */


getWTAllCadetlist(termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_NEW_WT_CADET_list + `?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}
getWt_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_NEW_WT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_NEW_WT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}

getWT_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_NEW_WT_CADET_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}

updateWTCadet(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.GET_NEW_WT_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
}

searchWT(termId,serviceId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_NEW_WT_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}


getCadetsListForPTMarks(termId, subjectType, battalion, company, serviceId){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };

  let response;

  if(serviceId){
    response =  this.http.get(Links.GET_PT_CADETS_LIST + `?termId=${termId}&subjectType=${subjectType}&serviceId=${serviceId}`, httpOptions).pipe(map((response: any) => response));
  } else {
    
  if(!battalion && !company){
  response = this.http.get(Links.GET_PT_CADETS_LIST + `?termId=${termId}&subjectType=${subjectType}`, httpOptions).pipe(map((response: any) => response));
  } else if(battalion && !company){
  response = this.http.get(Links.GET_PT_CADETS_LIST + `?termId=${termId}&subjectType=${subjectType}&battalion=${battalion}`, httpOptions).pipe(map((response: any) => response));
  } else{
    response =  this.http.get(Links.GET_PT_CADETS_LIST + `?termId=${termId}&subjectType=${subjectType}&battalion=${battalion}&company=${company}`, httpOptions).pipe(map((response: any) => response));
  }

  }
 
  return response;
}

savePTResults(data){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.SAVE_PT_RESULTS,data, httpOptions).pipe(map((response: any) => response));
}





  

 /* ---------------------NEW Runback-------------------------- */
 addRunback(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.post(Links.ADD_RUNBACK, form, httpOptions).pipe(map((response: any) => response));
}


getCadetRunback(resultType,termId , pageIndex ,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_CADET_RUNBACK + `?resultType=${resultType}&termId=${termId }&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}

getRun_All_ListByBCName(resultType,termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}

getRun_All_ListByBCNameComp(resultType,termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}


getRunback_All_List(resultType,termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}

updateRunback(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.put(Links.UPDATE_RUNBACK, form, httpOptions).pipe(map((response: any) => response));
}

getRunback_search(termId,serviceId,resultType,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_SEARCH_RUNBACK + `?termId=${termId}&serviceId=${serviceId}&resultType=${resultType}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}

getRunbackById(termId,status) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_ALL_CADET_EQTN +`?termId=${termId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
}

getBmt2_listByBCName(resultType,termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_BMT2_list+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_BMT2_list+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}
getBmt1FinalDetailsByBCName(resultType,termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_BMT1_DETAILS+`?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_BMT1_DETAILS+`?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}
getBmt1MidDetailsByBCName(resultType,termId,pageIndex,pageSize,battalionName,companyName) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  if(companyName==null||companyName==''||companyName==undefined){
    return this.http.get(Links.GET_BMT1_DETAILS+`?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));

  }
  else if (companyName!=null||companyName!=''||companyName!=undefined){
    return this.http.get(Links.GET_BMT1_DETAILS+`?resultType=${resultType}&termId=${termId}&serviceSubjectType=${'BMT1'}&assesmentTermType=${'final-term'}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
  }
}
getBmt2_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  
    return this.http.get(Links.GET_BMT2_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
}

getGCReports(){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_REPORTS, httpOptions).pipe(map((response: any) => response));
}


}
