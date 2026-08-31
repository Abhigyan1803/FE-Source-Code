import { Injectable } from '@angular/core';
import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrgBattalionService {
  jwtToken = "";
  httpOptions: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService:AuthService) {
    this.jwtToken = localStorage.getItem('jwtToken')


   
  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    console.log("a", a);
    console.log("b", b)
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  /** ============DASHBOARD============ */

  getHistoryActive(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    var formData = new FormData();
    formData.append('battalionId', id)
    return this.http.post(Links.GET_HISTORY_ACTIVE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getGallantryList(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    var formData = new FormData();
    formData.append('battalionId', id)
    return this.http.post(Links.GET_GALLANTRY_LIST + `?status=${status}&battalianId=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPerformanceList(status, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PERFORMANCE_LIST + `?status=${status}&battalianId=${id}`,).pipe(map((response: any) => response));
  }

  getGcActivities(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GC_ACTIVITIES + `?status=${status}&battalianId=${id}`).pipe(map((response: any) => response));
  }


  /** =============BRO=============== */

  addBro(form) {
    var formData = new FormData();
    formData.append('broDoc', form.broDoc);
    formData.append('status', form.status);
    formData.append('battalian.id', form.battalion);
    formData.append('broNumber', form.number + "/" + form.year);
    // formData.append('year',form.year);

    formData.append('date', form.date);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_BRO, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateBro(id, form) {
    var formData = new FormData();
    if (form.broDoc) {
      // console.log("broDoc", form);
      formData.append('broDoc', form.broDoc);
    }
    formData.append('broNumber', form.number + "/" + form.year);
    formData.append('battalian.id', form.battalion);
    formData.append('status', form.status);
    formData.append('date', form.date);
    formData.append('id', id);

      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_BRO, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeBroStatus(id, status) {
    var formData = new FormData();

    formData.append('status', status);
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_BRO, formData, httpOptions).pipe(map((response: any) => response));
  }

  getBro(type) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BRO + `?status=${type}`, httpOptions).pipe(map((response: any) => response));
  }

  getBroById(id) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BRO_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /** ============BDO=========== */
  addBdo(form) {
    var formData = new FormData();
    formData.append('bdoDoc', form.bdoDoc);
    formData.append('status', form.status);
    formData.append('date', form.date);
    formData.append('battalian.id', form.battalion);

      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_BDO, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateBdo(id, form) {
    var formData = new FormData();
    formData.append('id', id);
    if (form.bdoDoc)
      formData.append('bdoDoc', form.bdoDoc);

    formData.append('status', form.status);
    formData.append('date', form.date);
    formData.append('battalian.id', form.battalion);

      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_BDO, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeBdoStatus(id, status) {
    var formData = new FormData();
    formData.append('status', status);
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_BDO, formData, httpOptions).pipe(map((response: any) => response));
  }

  getBdo(type) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BDO + `?status=${type}`, httpOptions).pipe(map((response: any) => response));
  }

  getBdoById(id) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BDO_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /** =============ASSIGNMENT OF DUTIES=========== */

  addAssigment(form) {
    var formData = new FormData();
    formData.append('doc', form.doc);
    formData.append('status', form.status);
    formData.append('battalionType.id', form.battalionType);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_ASSIGNMENT, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateAssignment(id, form) {
    var formData = new FormData();
    if (form.doc)
      formData.append('doc', form.doc);
    formData.append('status', form.status);
    formData.append('battalionType.id', form.battalionType);
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_ASSIGNMENT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAssigment(battalionId, status) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ASSIGNMENT + `?battalionId=${battalionId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  
  deleteAssignmentofDuties(id, status) {
    var formData = new FormData();
    formData.append('id', id);
    formData.append('status',status);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.DELETE_ASSIGNMENTOFDUTIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAssigmentById(id) {
    const formData = new FormData();
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_ASSIGNMENT_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  getBattalionList() {
    return this.http.get(Links.GET_BATTALION_LIST).pipe(map((response: any) => response));
  }

  getCompanies(id) {
    const formData = new FormData();
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_COMPANY_BY_BATTALION, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** -------------PARADE STATE OF GCs-------------------- */
  getParadeState() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_PARADE_STATE_LIST, '', httpOptions).pipe(map((response: any) => response));
  }
  addParadeState(form) {
    var formData = new FormData();
    formData.append('doc', form.document);
    formData.append('name', form.name);
    formData.append('status', form.status);
    // formData.append('date', form.date);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateParadeState(form, id) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('doc', form.document);
    formData.append('name', form.name);
    formData.append('status', form.status)
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));

  }

  changeParadeStateStatus(id, status) {
    var formData = new FormData();

    formData.append('status', status);
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ACTIVE_PARADE_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getParadeStateById(id) {
    const formData = new FormData();
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_PARADE_STATE_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------LOCATION STATE OF OFFICER-------------------- */

  getLocationState() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_LOCATION_STATE_LIST, '', httpOptions).pipe(map((response: any) => response));
  }

  addLocationState(form) {
    var formData = new FormData();
    formData.append('doc', form.document);
    formData.append('name', form.name);
    formData.append('status', form.status);
    // formData.append('date', form.date);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_LOCATION_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateLocationState(form, id) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('doc', form.document);
    formData.append('name', form.name);
    formData.append('status', form.status)
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_LOCATION_STATE, formData, httpOptions).pipe(map((response: any) => response));

  }

  changeLocationStateStatus(id, status) {
    var formData = new FormData();

    formData.append('status', status);
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ACTIVE_LOCATION_STATE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getLocationStateById(id) {
    const formData = new FormData();
    formData.append('id', id);
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_LOCATION_STATE_ID, formData, httpOptions).pipe(map((response: any) => response));
  }


  // ADD CADET FORM

  getNationalities() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_NATIONALITIES, httpOptions).pipe(map((response: any) => response));
  }
  getStates() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_STATES, httpOptions).pipe(map((response: any) => response));
  }
  getReligions() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RELIGIONS, httpOptions).pipe(map((response: any) => response));
  }
  getCasts() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CASTS, httpOptions).pipe(map((response: any) => response));
  }
  getBloodGroups() {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BLOOD_GROUPS, httpOptions).pipe(map((response: any) => response));
  }

  getAllCadetsList(name) {
      const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CADETS_LIST + `?status=${name}`, httpOptions).pipe(map((response: any) => response));
  }
  // ADD SUBJECT MARKS IN CAMP MARKS
  getSubjectCamp(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CAMP_SUBJECT + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  addCampSubject(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      subjectName: form.subjectName,
      totalMarks: form.totalMarks,
      status: form.status
    }

    return this.http.post(Links.ADD_CAMP_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }
  updateCAMPSUBJECT(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      subjectName: form.subjectName,
      totalMarks: form.totalMarks,
      status: form.status
    }
    return this.http.post(Links.UPDATE_CAMP_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }
  getCAMPSUBJByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);

    return this.http.get(Links.VIEW_CAMP_SUBJECT_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }
  getCAMPSUBJCHANGESTATUS(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      status: status,
      id: id
    }
    console.log(data)
    return this.http.post(Links.UPDATE_CAMP_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }
  // ADD SUBJECT MARKS IN OQ MARKS
  getSubject(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_SUBJECT + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addSubject(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      subjectName: form.subjectName,
      plTotalMarks: form.plTotalMarks,
      bnTotalMarks: form.bnTotalMarks,
      coyTotalMarks: form.coyTotalMarks,
      status: form.status
    }

    return this.http.post(Links.ADD_OQ_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }

  getSUBJECTByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);

    return this.http.get(Links.VIEW_SUBJECT_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateSUBJECT(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      subjectName: form.subjectName,
      totalMarksPlCdr: form.totalMarksPlCdr,
      totalMarksBnCdr: form.totalMarksBnCdr,
      totalMarksCoyCdr: form.totalMarksCoyCdr,
      status: form.status
    }
    return this.http.put(Links.UPDATE_SUBJECT, data, httpOptions).pipe(map((response: any) => response));
  }


  getSubjectMarks_List(serviceId, termId, e) {
    console.log(serviceId, 'service id');
    termId = 1;
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OQ_RESULT_CHECK + `?serviceId=${serviceId}&termId=${termId}&entryTypeId=${e}`, httpOptions).pipe(map((response: any) => response));
  }

  getAllGcappt() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GCAPPT, httpOptions).pipe(map((response: any) => response));
  }

  AddOQMarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_OQ_RESULT, form, httpOptions).pipe(map((response: any) => response));
  }
  updateOQmarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_OQ_RESULT, form, httpOptions).pipe(map((response: any) => response));
  }

    /* ---------------------New Marking CAMPMARKS-------------------------- */
    getCamp_Marks_Subject(status) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_Camp_Marks_Subject +`?status=${status}`, httpOptions).pipe(map((response: any) => response));
    }
    getCamp_Marks_list(termId,pageIndex,exerciseTypeId,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_Camp_Marks_list + `?termId=${termId}&pageNo=${pageIndex}&exerciseTypeId=${exerciseTypeId}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    getCamp_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      if(companyName==null||companyName==''||companyName==undefined){
        return this.http.get(Links.GET_Camp_Marks_list+`?termId=${termId}&pageNo=${pageIndex}&exerciseTypeId=${1}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
    
      }
      else if (companyName!=null||companyName!=''||companyName!=undefined){
        return this.http.get(Links.GET_Camp_Marks_list+`?termId=${termId}&pageNo=${pageIndex}&exerciseTypeId=${1}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
      }
    }
    getCamp_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
        return this.http.get(Links.GET_Camp_Marks_list+`?termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
    }
    getCamp_Marks_list_search(termId,serviceId,pageIndex,pageSize) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.get(Links.GET_Camp_Marks_SEARCH + `?termId=${termId}&serviceId=${serviceId}&pageNo=${pageIndex}&exerciseTypeId=${1}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    
    updateCamp_Marks_list(form) {
      const httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
      };
      return this.http.put(Links.GET_Camp_Marks_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
    }


        /* ---------------------New Marking OQMARKS-------------------------- */
        getOQ_Marks_Subject(status) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.get(Links.GET_OQ_Marks_Subject +`?status=${status}`, httpOptions).pipe(map((response: any) => response));
        }
        getOQ_Marks_list(termId,entryTypeId,pageIndex,pageSize) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.get(Links.GET_OQ_Marks_list + `?termId=${termId}&entryTypeId=${1}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
        }
        getOQ_Marks_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          if(companyName==null||companyName==''||companyName==undefined){
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${1}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
        
          }
          else if (companyName!=null||companyName!=''||companyName!=undefined){
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${1}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
          }
        }
        
        getOQ_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${1}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
        }
        
        getOQ_Marks_list_search(termId,serviceId,pageIndex,pageSize) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.get(Links.GET_OQ_Marks_SEARCH + `?termId=${termId}&entryTypeId=${1}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
        }

        // final term OQ
        getOQ_final_Marks_list(termId,pageIndex,pageSize) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.get(Links.GET_OQ_Marks_list + `?termId=${termId}&entryTypeId=${2}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
        }
        getOQ_Final_Marks_All_ListByBCName(termId,pageIndex,pageSize,battalionName,companyName) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          if(companyName==null||companyName==''||companyName==undefined){
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${2}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
        
          }
          else if (companyName!=null||companyName!=''||companyName!=undefined){
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${2}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}&company=${companyName}`, httpOptions).pipe(map((response: any) => response));
          }
        }
        
        getOQ_Final_All_ListByBCNameComp(termId,pageIndex,pageSize,battalionName){
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
            return this.http.get(Links.GET_OQ_Marks_list+`?termId=${termId}&entryTypeId=${2}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
        }
        
        getOQ_Final_Marks_list_search(termId,serviceId,pageIndex,pageSize) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.get(Links.GET_OQ_Marks_SEARCH + `?termId=${termId}&entryTypeId=${2}&serviceId=${serviceId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
        }
        
        updateOQ_Marks_list(form) {
          const httpOptions = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
          };
          return this.http.put(Links.GET_OQ_Marks_SAVE_list, form, httpOptions).pipe(map((response: any) => response));
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

getRunback_All_List(resultType,termId,pageIndex,pageSize) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
}


getRun_All_ListByBCNameComp(resultType,termId,pageIndex,pageSize,battalionName){
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
    return this.http.get(Links.GET_CADET_RUNBACK+`?resultType=${resultType}termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}&battalion=${battalionName}`, httpOptions).pipe(map((response: any) => response));
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

FileAboutUs(form) {
  const httpOptions = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  };
  const formData = new FormData();
  formData.append('docfile', form)
  return this.http.post(Links.FILEUPLOAD, formData,httpOptions).pipe(map((response: any) => response));
}
}
