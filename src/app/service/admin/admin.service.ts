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
export class AdminService {
  jwtToken = "";

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService: AuthService) {
  }

  /**============= HOME PAGE MANAGEMENT ==================== */

  //FOR DAILY PROGRAMS
  addProgram(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      scheduledDate: form.scheduledDate,
      startTime: form.startTime,
      endTime: form.endTime,
      title: form.title,
      venue: form.venue
    }
    return this.http.post(Links.ADD_PROGRAM, data, httpOptions).pipe(map((response: any) => response));
  }

  getAllPrograms() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.post(Links.GET_ALL_PROGRAMS, '', httpOptions).pipe(map((response: any) => response));
  }

  getProgramDetailsById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.VIEW_PROGRAM_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateProgram(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      scheduledDate: form.scheduledDate,
      startTime: form.startTime,
      endTime: form.endTime,
      title: form.title,
      venue: form.venue
    }
    return this.http.post(Links.UPDATE_PROGRAM, data, httpOptions).pipe(map((response: any) => response));
  }




  //FOR ACTIVITIES
  addActivity(form, date) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('status', form.status)
    formData.append('date', date)
    return this.http.post(Links.ADD_IMA_ACTIVITY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getImaActivities() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_IMA_ACTIVITIES, '', httpOptions).pipe(map((response: any) => response));
  }

  changeImaActivityStatus(id, status) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status);
    return this.http.post(Links.CHANGE_ACTIVITY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }




  //FOR EVENTS
  addEvent(form) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('eventDate', form.time);
    formData.append('isGcEvent', form.isGcEvent);
    formData.append('status', form.status)
    return this.http.post(Links.ADD_EVENT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllEvents(type) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EVENTS + `?isGcEvent=${type}`, httpOptions).pipe(map((response: any) => response));
  }

  getEventDetailsById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.VIEW_EVENT_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateEventStatus(id, status) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData()
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_EVENT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateEvent(id, form) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', form.image);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('eventDate', form.time);
    formData.append('isGcEvent', form.isGcEvent);
    formData.append('status', form.status);
    return this.http.post(Links.UPDATE_EVENT, formData, httpOptions).pipe(map((response: any) => response));
  }

  //FOR SPECIAL OCCASIONS
  /**========================================================== */


  addSpecialOccasion(form) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "marriageAnniversary": form.marriageAnniversary,
      "officerDOB": form.officerDOB,
      "officerName": form.officerName,
      "officerRank": form.officerRank,
      "postedBranch": form.department,
      "relation": form.relation,
      "spouseDOB": form.spouseDOB,
      "spouseName": form.spouseName,
      "status": form.status,
      "icNumber": form.icNumber
    }

    return this.http.post(Links.ADD_SPECIAL_OCCASION, data, httpOptions).pipe(map((response: any) => response));
  }

  getAllSpecialOccasionsList(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    return this.http.get(Links.GET_SPECIAL_OCCASIONS_LIST + `?status=${status}`,).pipe(map((response: any) => response));
  }

  getSpecialOccasionById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SPECIAL_OCCASION_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeSpecialOccasionStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "id": id,
      "status": status,
    }
    return this.http.patch(Links.UPDATE_SPECIAL_OCCASION, data, httpOptions).pipe(map((response: any) => response));
  }

  updateSpecialOccasion(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      "id": id,
      "marriageAnniversary": form.marriageAnniversary,
      "officerDOB": form.officerDOB,
      "officerName": form.officerName,
      "officerRank": form.officerRank,
      "postedBranch": form.department,
      "relation": form.relation,
      "spouseDOB": form.spouseDOB,
      "spouseName": form.spouseName,
      "status": form.status,
    }
    return this.http.patch(Links.UPDATE_SPECIAL_OCCASION, data, httpOptions).pipe(map((response: any) => response));
  }


  /**============================================================= */

  //FOR COMMANDANT MESSAGE
  addCommandantMessage(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('designation', form.rank);
    formData.append('name', form.name);
    formData.append('award', form.awards);
    formData.append('organization', form.organisation);
    formData.append('status', form.status);
    formData.append('message', form.message);
    return this.http.post(Links.ADD_COMMANDANT_MESSAGE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCommandantMessages() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_COMMANDANT_MESSAGES, httpOptions).pipe(map((response: any) => response));
  }

  changeCommandantMessageStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
    return this.http.post(Links.ACTIVATE_OR_DEACTIVATE_COMMANDANT_MESSAGE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCommandantMessageById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(Links.VIEW_MESSAGE_BY_ID, formData, httpOptions).pipe(map((response: any) => response));

  }

  updateCommandantMessage(id, form) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', form.image);
    formData.append('designation', form.rank);
    formData.append('name', form.name);
    formData.append('award', form.awards);
    formData.append('organization', form.organisation);
    formData.append('status', form.status);
    formData.append('message', form.message);
    return this.http.post(Links.UPDATE_COMMANDANT_MESSAGE, formData, httpOptions).pipe(map((response: any) => response));
  }

  //GREYBOOK

  getGreybooksList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GREYBOOKS_LIST + '?status=2').pipe(map((response: any) => response));
  }

  addGreybook(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      department: form.department,
      email: form.email,
      name: form.name,
      address: form.address,
      countyCode: form.countryCode,
      phoneNumber: form.phoneNumber,
      post: form.post,
      status: form.status,
      userRank: form.userRank
    }

    return this.http.post(Links.ADD_GREYBOOK, data, httpOptions).pipe(map((response: any) => response));

  }

  getGreybookById(id) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_A_GREYBOOK_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));

  }

  updateGreybook(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      id: id,
      department: form.department,
      email: form.email,
      name: form.name,
      address: form.address,
      countyCode: form.countryCode,
      phoneNumber: form.phoneNumber,
      post: form.post,
      status: form.status,
      userRank: form.userRank
    }

    return this.http.patch(Links.UPDATE_GREYBOOK, data, httpOptions).pipe(map((response: any) => response));
  }

  changeGreybookStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.CHANGE_GREYBOOK_STATUS + `?id=${id}&status=${status}`, httpOptions).pipe(map((response: any) => response));

  }

  /* ===========CENTRAL LIBRARY ============*/
  getCentralLibraryList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CENTRAL_LIBRARY_LIST, httpOptions).pipe(map((response: any) => response));
  }

  addCentralLIbraryLink(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      tabName: form.name,
      linkUrl: form.url,
      status: form.status
    }

    return this.http.post(Links.ADD_CENTRAL_LIBRARY, data, httpOptions).pipe(map((response: any) => response));
  }

  getCentralLIbraryById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CENTRAL_LIBRARY_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateCentralLibraryLink(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      tabName: form.name,
      linkUrl: form.url,
      status: form.status
    }
    return this.http.patch(Links.UPDATE_CENTRAL_LIBRARY, data, httpOptions).pipe(map((response: any) => response));
  }

  changeCentralLibraryStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.CHANGE_CENTRAL_LIBRARY_STATUS + `?id=${id}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


   /** =============== E-BOOK =============== */
   getEbookList() {
   
    return this.http.get(Links.GET_EBOOK).pipe(map((response: any) => response));
  }
  addEbook(form:any) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_EBOOK, form).pipe(map((response: any) => response));
  }
  updateEbook(form:any) {
    console.log(form);
    
    const httpOptions = {
      headers: new HttpHeaders()
        // .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.patch(Links.UPDATE_EBOOK, form).pipe(map((response: any) => response));
  }
  getEbookById(id:number) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(`${Links.GET_EBOOK_BY_ID}?id=${id}`).pipe(map((response: any) => response));
  }

    /** =============== E-BOOK =============== */


  /** =============== CYBER POLICY =============== */

  getCyberPolicyList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CYBER_POLICY_LIST, httpOptions).pipe(map((response: any) => response));
  }

  addCyberPolicy(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('tabName', form.name);
    formData.append('status', form.status);

    return this.http.post(Links.ADD_CYBER_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCyberPolicyById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CYBER_POLICY_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  updateCyberPolicy(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id);
    formData.append('file', form.file);
    formData.append('tabName', form.name);
    formData.append('status', form.status);

    return this.http.patch(Links.UPDATE_CYBER_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCyberPolicyStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.CHANGE_CYBER_POLICY_STATUS + `?id=${id}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  /** ===============  =============== */
  getAllRecommendedBook(status) {
    return this.http.get(Links.GET_ALL_RECOMMENDED_BOOK + `?&status=${status}`).pipe(map((response: any) => response));
  }


  addRecommendedBook(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      authorName: form.authorName,
      bookGenre: form.bookGenre,
      bookName: form.bookName,
      description: form.description,
      status: form.status,

    }

    return this.http.post(Links.ADD_RECOMMENDED_BOOK, data, httpOptions).pipe(map((response: any) => response));

  }

  getRecommendedBookById(id) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RECOMMENDED_BOOK_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));

  }

  updateRecommendedBook(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      id: id,
      authorName: form.authorName,
      bookGenre: form.bookGenre,
      bookName: form.bookName,
      description: form.description,
      status: form.status,
    }
    return this.http.post(Links.UPDATE_RECOMMENDED_BOOK, data, httpOptions).pipe(map((response: any) => response));
  }

  changeRecommendedbookStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const data = {
      id: id,
      status: status,
    }
    return this.http.post(Links.CHANGE_RECOMMENDED_BOOK_STATUS, data, httpOptions).pipe(map((response: any) => response));
  }

  /** =============== Section Hospital =============== */
  getSection(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_HOSPITAL_LIST, formData,).pipe(map((response: any) => response));
  }

  addSection(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('title', form.title)
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_HOSPITAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSection(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', form.title)
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_HOSPITAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  getSectionByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_HOSPITAL_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeSectionStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_HOSPITAL_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** =============== GC MESSAGEBOARD =============== */
  getMESSAGEBOARD(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.get(Links.GET_GC_MESSAGE_BOARD_LIST + `?status=${status}`,).pipe(map((response: any) => response));
  }

  addMESSAGEBOARD(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('title', form.title)
    formData.append('description', form.description)
    // formData.append('eventStartTime', form.startTime)
    // formData.append('eventEndTime', form.endTime)
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_GC_MESSAGE_BOARD, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateMESSAGEBOARD(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('title', form.title)
    formData.append('description', form.description)
    // formData.append('eventStartTime', form.startTime)
    // formData.append('eventEndTime', form.endTime)
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    console.log(formData);

    return this.http.put(Links.UPDATE_GC_MESSAGE_BOARD, formData, httpOptions).pipe(map((response: any) => response));


  }

  getMESSAGEBOARDByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_GC_MESSAGE_BOARD_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeMESSAGEBOARDStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_GC_MESSAGE_BOARD_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /**===========HALL OF FAME========= */
  getHallOfFameGallantryAwardeesList(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_HALL_OF_FAME_GALLANTRY_AWARDEES_LIST + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addGallantryHallOfFame(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('officerRank', form.officerRank)
    formData.append('officerName', form.officerName)
    formData.append('officerRegiment', form.officerRegiment)
    formData.append('officerBattalion', form.officerBattalion)
    formData.append('awardMedal', form.awardMedal)
    formData.append('yearAwarded', form.yearAwarded)
    formData.append('recognition', form.recognition)
    formData.append('description', form.description)
    formData.append('isForeign', form.isForeign)
    formData.append('country', form.country)

    formData.append('Imageofficer', form.image)
    formData.append('status', form.status);

    return this.http.post(Links.ADD_HALL_OF_FAME_GALLANTRY_AWARDEE, formData, httpOptions).pipe(map((response: any) => response));
  }


  changeGallantryHallOfFameStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)
    formData.append('status', status);

    return this.http.patch(Links.UPDATE_HALL_OF_FAME_GALLANTRY_AWARDEES, formData, httpOptions).pipe(map((response: any) => response));
  }



  getGallantryHallOfFameById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_A_HALL_OF_FAME_GALLANTRY_AWARDEES + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }


  updateGallantryHallOfFame(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)

    formData.append('officerRank', form.officerRank)
    formData.append('officerName', form.officerName)
    formData.append('officerRegiment', form.officerRegiment)
    formData.append('officerBattalion', form.officerBattalion)
    formData.append('awardMedal', form.awardMedal)
    formData.append('yearAwarded', form.yearAwarded)
    formData.append('recognition', form.recognition)
    formData.append('description', form.description)
    formData.append('isForeign', form.isForeign)
    formData.append('country', form.country)

    formData.append('ImageOfficer', form.image)
    formData.append('status', form.status);

    return this.http.patch(Links.UPDATE_HALL_OF_FAME_GALLANTRY_AWARDEES, formData, httpOptions).pipe(map((response: any) => response));
  }



  /**===========HALL OF FAME========= */
  getAnnouncementList(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    return this.http.get(Links.GET_ANNOUNCEMENT_LIST + `?status=${status}`,).pipe(map((response: any) => response));
  }


  addAnnouncement(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('announcementDescp', form.announcementDescp)
    formData.append('validTill', form.validTill);
    formData.append('status', form.status)
    formData.append('announcementDoc', form.doc)
    console.log(form.doc, "MJJ");

    return this.http.post(Links.ADD_ANNOUNCEMENT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAnnouncementById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_A_ANNOUNCEMENT_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }


  updateAnnouncement(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('announcementDescp', form.announcementDescp)
    formData.append('validTill', form.validTill);
    formData.append('status', form.status)
    formData.append('announcementDoc', form.doc)

    return this.http.patch(Links.UPDATE_ANNOUNCEMENT, formData, httpOptions).pipe(map((response: any) => response));
  }



  changeAnnouncementStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_ANNOUNCEMENT, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** ==========IMA BLOG============== */

  addIMABlog(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('title', form.title)
    formData.append('category', form.category)
    formData.append('author', form.author)
    formData.append('description', form.description)
    formData.append('blgImage', form.image)
    formData.append('doc', form.docs)
    if (form.battalionId == null || form.battalionId == undefined) {
      form.battalionId = 0
    }
    formData.append('battalionId', form.battalionId)


    formData.append('isCadet', '0')

    formData.append('status', form.status)

    return this.http.post(Links.ADD_IMA_BLOG, formData, httpOptions).pipe(map((response: any) => response));
  }

  getIMABlogList(status, pageNo, pageSize, bid) {
    console.log(bid, 'bid');

    this.authService.getJWT_Token
    return this.http.get(Links.GET_IMA_BLOG_LIST + `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&battalionId=${bid}`).pipe(map((response: any) => response));
  }


  changeIMABlogStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_IMA_BLOG, formData, httpOptions).pipe(map((response: any) => response));
  }

  getIMABlogById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_IMA_BLOG_BY_ID + `?id=${id}`).pipe(map((response: any) => response));
  }

  updateIMABlog(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('title', form.title)
    formData.append('category', form.category)
    // formData.append('author', form.author)

    formData.append('description', form.description)
    formData.append('blgImage', form.image)
    formData.append('doc', form.docs)

    formData.append('status', form.status)

    return this.http.patch(Links.UPDATE_IMA_BLOG, formData, httpOptions).pipe(map((response: any) => response));
  }




  /** ---------------------------------------------------------------------------*/

  /** =======SHARED========== */
  getBattalionList() {

    return this.http.get(Links.GET_BATTALION_LIST).pipe(map((response: any) => response));
  }

  updateTerm(data) {
    const Data = data
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    //  const formData = new FormData();
    //formData.append('id', id);
    return this.http.post(Links.UPDATE_TERM, Data, httpOptions).pipe(map((response: any) => response));

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

  getBattalionPosts() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BATTALION_POSTS, httpOptions).pipe(map((response: any) => response));
  }

  getSeasonTerms() {
    return this.http.get(Links.GET_ALL_TERMS).pipe(map((response: any) => response));
  }

  getTerms() {
    return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
  }


  /** ------------------------ */






  /** =========== TRG TEAM MANAGEMENT ================== */

  //GET ALL TRG TEAM POSTS
  getAllPositions() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ALL_POSITION, httpOptions).pipe(map((response: any) => response));

  }

  //ADD TRG TEAM MEMBER
  addTRGMember(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('rank', form.rank);
    formData.append('name', form.name);
    formData.append('award', form.awards)

    formData.append('position', form.position)
    formData.append('subPosition', form.subPosition)
    formData.append('image', form.image)
    formData.append('status', form.status);

    return this.http.post(Links.ADD_TRG_TEAM_MEMBER, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllTrgTeam() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_TRG_TEAM_MEMBERS, '', httpOptions).pipe(map((response: any) => response));
  }

  getTRGMemberDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.GET_MEMBER_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateTRGMember(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('orgId', id);
    formData.append('rank', form.rank);
    formData.append('name', form.name);
    formData.append('position', form.position);
    formData.append('subPosition', form.subPosition);
    formData.append('image', form.image);
    formData.append('status', form.status);
    for (let i = 0; i < form.wa.length; i++) {
      if (form.wa[i].id) {
        formData.append(`teamMembers[${i}].team_member_id`, form.wa[i].id)
      }
      formData.append(`teamMembers[${i}].team_rank`, form.wa[i].team_rank)
      formData.append(`teamMembers[${i}].team_name`, form.wa[i].team_name)
      formData.append(`teamMembers[${i}].team_position`, form.wa[i].team_position)
      formData.append(`teamMembers[${i}].team_award`, form.wa[i].team_award)
      formData.append(`teamMembers[${i}].team_status`, form.wa[i].status)
    }
    return this.http.post(Links.UPDATE_TRG_MEMBER, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeMemberStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
    return this.http.post(Links.CHANGE_MEMBER_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }


  /* ===============================GS BRANCH =========================================*/

  getAllGSBranchPosts(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)

    return this.http.post(Links.GET_GS_BRANCH_APPTS, formData, httpOptions).pipe(map((response: any) => response));

  }

  addGSBranchMembers(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('gsRank', form.rank)
    formData.append('name', form.name)
    formData.append('ICNum', form.icNum)
    formData.append('gsPosition.id', form.appt);
    formData.append('award', form.awards)
    formData.append('status', form.status)
    formData.append('docfile', form.image)

    return this.http.post(Links.ADD_GS_BRANCH_ORGANIZATION_MEMBER, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAllGSBranchMembers(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_GS_BRANCH_ORGANIZATION_MEMBERS, formData).pipe(map((response: any) => response));
  }

  changeGSBranchMemberStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_GS_BRANCH_MEMBER_STATUS, formData, httpOptions).pipe(map((response: any) => response));

  }

  getGSBranchMemberById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.GET_GS_BRANCH_MEMBER_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateGSBranchMembers(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('gsRank', form.rank)
    formData.append('name', form.name)
    formData.append('ICNum', form.icNum)
    formData.append('gsPosition.id', form.appt);
    formData.append('award', form.awards)
    formData.append('status', form.status)
    formData.append('docfile', form.image)

    return this.http.post(Links.UPDATE_GS_BRANCH_MEMBER, formData, httpOptions).pipe(map((response: any) => response));
  }


  getAcademyParadeState(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ACADEMY_PARADE_STATE + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
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
  /** ---------AdministrativeInstructions-------- */
  getAdministrativeInstructions(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_ADMINISTRATIVE_INSTRUCTION + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  addAdministrative(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('instructionsDoc ', form.doc)
    return this.http.post(Links.ADD_ADMINISTRATIVE_INSTRUCTION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateAdministrative(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('instructionsDoc', form.doc)

    return this.http.patch(Links.UPDATE_ADMINISTRATIVE_INSTRUCTION, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAdministrativeById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_ADMINISTRATIVE_INSTRUCTION_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeAdministrativeStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_ADMINISTRATIVE_INSTRUCTION, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------standing-trg-directives-------- */

  getStandingTrg(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_STANDING_TRG + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  addStandingTrg(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('trgDirectiveDoc ', form.doc)
    return this.http.post(Links.ADD_GET_STANDING_TRG, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateStandingTrg(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('trgDirectiveDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_STANDING_TRG, formData, httpOptions).pipe(map((response: any) => response));
  }

  getStandingTrgById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_GET_STANDING_TRG_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeStandingTrgByStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_STANDING_TRG, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------FGC POLICY-------- */

  getFGC(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_FGC + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  addFGC(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('policyDoc ', form.doc)
    return this.http.post(Links.ADD_GET_FGC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateFGC(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('policyDoc', form.doc)

    return this.http.patch(Links.UPDATE_FGC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getFGCById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_FGC_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------PCAB & COA-------- */
  getPCABAndCOA(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PCAB + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addPCABAndCOA(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('pcabDoc', form.doc)
    return this.http.post(Links.ADD_GET_PCAB, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePCABAndCOA(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('pcabDoc', form.doc)

    return this.http.patch(Links.UPDATE_PCAB, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPCABAndCOAByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_PCAB_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changePCABAndCOABStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_PCAB, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ---------Misc-------- */
  getMisc(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MISC + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addMisc(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('miscDoc', form.doc)
    return this.http.post(Links.ADD_GET_MISC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateMisc(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('miscDoc', form.doc)

    return this.http.patch(Links.UPDATE_MISC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getMiscByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_MISC_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeMiscStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_MISC, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------------CURRENT CASES---------------------- **/
  /* -------Relegation---------- */
  getRelegation(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RELEGATION + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addRelegation(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('relegationDoc', form.doc)
    return this.http.post(Links.ADD_GET_RELEGATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateRelegation(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('relegationDoc', form.doc)

    return this.http.patch(Links.UPDATE_RELEGATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  getRelegationByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_RELEGATION_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeRelegationStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_RELEGATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -------Resignation---------- */
  getResignation(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RESIGNATION + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addResignation(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('resignationDoc', form.doc)
    return this.http.post(Links.ADD_GET_RESIGNATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateResignation(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('resignationDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_RESIGNATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeResignationStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_RESIGNATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  getResignationByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_RESIGNATION_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /* -------COURT CASES---------- */
  getCourtCases(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_COURTCASES + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addCourtCases(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('courtCaseDoc', form.doc)
    return this.http.post(Links.ADD_GET_COURTCASES, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCourtCases(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('courtCaseDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_COURTCASES, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCourtCasesStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_COURTCASES, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCourtCasesByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_COURTCASES_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  /* -------WithDrawal---------- */
  getWithDrawal(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_WITHDRAWAL + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addWithDrawal(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('withdrawalDoc', form.doc)
    return this.http.post(Links.ADD_GET_WITHDRAWAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateWithDrawal(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('withdrawalDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_WITHDRAWAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  getWithDrawalByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_WITHDRAWAL_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeWidthdrawalStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_WITHDRAWAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------------ASSESMENT----------------------- **/
  /* --------------MATRIX------------------- */
  getMatrix(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MATRIX + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addMatrix(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('matrixDoc', form.doc)
    return this.http.post(Links.ADD_GET_MATRIX, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateMatrix(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('matrixDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_MATRIX, formData, httpOptions).pipe(map((response: any) => response));
  }

  getMatrixByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_MATRIX_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeMatrixStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_MATRIX, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* --------------Schedule------------------- */
  getSchedule(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SCHEDULE + `?&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }


  addSchedule(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('scheduleDoc', form.doc)
    return this.http.post(Links.ADD_GET_SCHEDULE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSchedule(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('scheduleDoc', form.doc)

    return this.http.patch(Links.UPDATE_GET_SCHEDULE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getScheduleByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_SCHEDULE_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeScheduleStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_GET_SCHEDULE, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------------Admin Document Checkboard ---------------------- **/
  /* -------AVIATION LIST---------- */
  getAviation(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_AVIATION + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));

  }


  addAviation(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_AVIATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateAviation(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_AVIATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  getAviationByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_AVIATION_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeAviationStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_AVIATION_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /* ----------------------PENDING CVR ---------------------------- */
  getCvr(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_CVR + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addCvr(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_GET_CVR, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCvr(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_CVR, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCvrByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_CVR_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeCvrStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_CVR_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ----------------------PARA LIST---------------------------- */
  getPara(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_PARA + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addPara(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_PARA, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePara(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_PARA, formData, httpOptions).pipe(map((response: any) => response));
  }

  getParaByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_PARA_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeParaStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_PARA_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ----------------------PC LIST---------------------------- */
  getPC(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_PC + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addPC(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_PC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePC(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_PC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPCByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_PC_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changePCStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_PC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* --------------------------CAV LIST ----------------------------- */
  getCAV(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_CAV + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }

  addCAV(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_CAV, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCAV(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_CAV, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCAVByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_CAV_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeCAVStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_CAV_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------PENDING EDUCATION DOCS ---------- */

  getEducation(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_EDUCATION_DOC + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addEducation(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_EDUCATION_DOC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateEducation(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_EDUCATION_DOC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getEducationByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_EDUCATION_DOC_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeEducationStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_EDUCATION_DOC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ------------PENDING directorate list --------------- */
  getDirectorate(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_PENDING + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }

  addDirectorate(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_GET_PENDING, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateDirectorate(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docFile', form.doc)

    return this.http.post(Links.UPDATE_GET_PENDING, formData, httpOptions).pipe(map((response: any) => response));
  }

  getDirectorateByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_PENDING_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeDirectorateStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_PENDING_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------------Stats ---------------------- **/
  /* -------Intake---------- */
  getIntake(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_INTAKE + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addIntake(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_GET_INTAKE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateIntake(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_INTAKE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getIntakeByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_INTAKE_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeIntakeStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_INTAKE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -------POC---------- */
  getPOC(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_POC + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }
  getManageAdmin() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MANAGE_ADMIN, httpOptions).pipe(map((response: any) => response));
  }

  addPOC(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_GET_POC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePOC(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_POC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPOCByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_POC_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changePOCStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_POC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------------------Security ---------------------- **/
  /* -------Territorial army---------- */
  getTerritorial(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_TERRITORIAL + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addTerritorial(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_TERRITORIAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateTerritorial(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_TERRITORIAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  getTerritorialByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_GET_TERRITORIAL_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeTerritorialStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_TERRITORIAL_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------DSC------------------- */

  getDSC(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_DSC + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addDSC(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_DSC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateDSC(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_DSC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getDSCByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_GET_DSC_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeDSCStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_DSC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------RP SECURITY------------------- */
  getRP(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_RP, formData, httpOptions).pipe(map((response: any) => response));
  }


  addRP(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_RP, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateRP(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_RP, formData, httpOptions).pipe(map((response: any) => response));
  }

  getRPByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_GET_RP_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeRPStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_RP_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -------------------------DEMO COY---------------------- */
  getDemoCoy(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_DEMO_COY + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addDemoCoy(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_DEMO_COY, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateDemoCoy(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_GET_DEMO_COY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getDemoCoyByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_GET_DEMO_COY_BY_ID + `?id=${id}`, "", httpOptions).pipe(map((response: any) => response));
  }

  changeDemoCoyStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_DEMO_COY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }




  /* -------------------------DEMO COY---------------------- */
  getPolicies(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.GET_POLICIES_LIST + `?status=${status}`, "", httpOptions).pipe(map((response: any) => response));
  }


  addPolicies(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_POLICIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePolicies(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_POLICIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPoliciesByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_POLICIES_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changePoliciesStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_POLICIES_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ------------------------------ACCESS CONTROL---------------------------------------------- **/
  /* -----------------------BIOMETRIC RFID------------------------------- */
  getBIOMETRIC(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_BIOMETRIC_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  addBIOMETRIC(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_BIOMETRIC, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateBIOMETRIC(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_BIOMETRIC, formData, httpOptions).pipe(map((response: any) => response));
  }

  getBIOMETRICByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_BIOMETRIC_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeBIOMETRICStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_BIOMETRIC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------VEHICLE STICKERSS------------------------------- */
  getVEHICLE(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_VEHICLE_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  addVEHICLE(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_VEHICLE, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateVEHICLE(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_VEHICLE, formData, httpOptions).pipe(map((response: any) => response));
  }

  getVEHICLEByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_VEHICLE_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeVEHICLEStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_VEHICLE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  /* -----------------------COMBAT------------------------------- */
  getCOMBAT(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_COMBAT_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  addCOMBAT(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_COMBAT, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCOMBAT(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_COMBAT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCOMBATByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_COMBAT_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCOMBATStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_COMBAT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------CIV Staff------------------------------- */
  getCIV(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_CIV_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  addCIV(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_CIV, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCIV(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_CIV, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCIVByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_CIV_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCIVStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_CIV_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------CASUAL Staff------------------------------- */
  getCASUAL(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_CASUAL_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  addCASUAL(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_CASUAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCASUAL(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_CASUAL, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCASUALByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_CASUAL_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCASUALStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_CASUAL_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------POLICIES ADVISORIES------------------------------- */
  getPOLICIES(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_POLICIES_ADVISORIES_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addPOLICIES(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_POLICIES_ADVISORIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePOLICIES(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_POLICIES_ADVISORIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPOLICIESByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_POLICIES_ADVISORIES_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changePOLICIESAdvisiorStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_POLICIES_ADVISORIES_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------RETURN / REPORTS------------------------------- */
  getRETURN(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_RETURN_ADVISORIES_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addRETURN(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_RETURN_ADVISORIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateRETURN(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_RETURN_ADVISORIES, formData, httpOptions).pipe(map((response: any) => response));
  }

  getRETURNByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_RETURN_ADVISORIES_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeRETURNAdvisiorStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_RETURN_ADVISORIES_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* -----------------------Prophylactic  Report------------------------------- */
  getProphylactic(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_PROPHYLACTIC_Report_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addProphylactic(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_PROPHYLACTIC_Report, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateProphylactic(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_PROPHYLACTIC_Report, formData, httpOptions).pipe(map((response: any) => response));
  }

  getProphylacticByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_PROPHYLACTIC_Report_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeProphylacticStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_PROPHYLACTIC_Report_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  /* -----------------------Prophylactic policies Controlle------------------------------- */
  getProphylacticPolicies(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_PROPHYLACTIC_POLICY_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addProphylacticPolicies(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_PROPHYLACTIC_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateProphylacticPolicies(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_PROPHYLACTIC_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getProphylacticByIDPolicies(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_PROPHYLACTIC_POLICY_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeProphylacticStatusPolicies(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_PROPHYLACTIC_POLICY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ----------------------------INTELLIGENCE-------------------------------------- */
  /** -------INTELLIGENCE POLICY---------- */
  getIntelligencePolicies(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_INTELLIGENCE_POLICY_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addIntelligencePolicies(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_INTELLIGENCE_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateIntelligencePolicies(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_INTELLIGENCE_POLICY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getIntelligenceByIDPolicies(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_INTELLIGENCE_POLICY_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeIntelligenceStatusPolicies(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_INTELLIGENCE_POLICY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /** -------INTELLIGENCE REPORT/RETURN---------- */
  getIntelligenceReport(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_INTELLIGENCE_REPORT_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addIntelligenceReport(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_INTELLIGENCE_REPORT, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateIntelligenceReport(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_INTELLIGENCE_REPORT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getIntelligenceByIDReport(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_INTELLIGENCE_REPORT_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeIntelligenceStatusReport(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_INTELLIGENCE_REPORT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** ------------------------------Security Apparatus---------------------------------------------- **/
  /* ---------------------ACS FP-------------------------- */
  getACSFP(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_ACSFP_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addACSFP(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_ACSFP, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateACSFP(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_ACSFP, formData, httpOptions).pipe(map((response: any) => response));
  }

  getACSFPByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_ACSFP_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeACSFPStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_ACSFP_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /* ---------------------Drill Marks-------------------------- */
  getDrillMark(serviceId, termId) {
    console.log(serviceId)
    console.log(termId)
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SUBJECTDRIIL_LIST + `?serviceId=${serviceId}&termId=${termId}`, httpOptions).pipe(map((response: any) => response));
  }
  addDrillMarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_DRILLMARKS, form, httpOptions).pipe(map((response: any) => response));
  }
  updateDrilmarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_DRILLMARKS, form, httpOptions).pipe(map((response: any) => response));
  }


  /* ---------------------CreditOfExellence-------------------------- */

  /* ---------------------BMT1FINALTERM-------------------------- */
  addBMT1Finalterm(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_BMT1FINALTERM, form, httpOptions).pipe(map((response: any) => response));
  }
  getBMT1Finalterm(servceId, subjectType, termId, assesmentTermType, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1FINALTERM + `?serviceId=${servceId}&subjectType=${subjectType}&termId=${termId}&assesmentTermType=${assesmentTermType}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  updateBMT1Finalterm(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_BMT1FINALTERM, form, httpOptions).pipe(map((response: any) => response));
  }


  addRunback(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_RUNBACK, form, httpOptions).pipe(map((response: any) => response));
  }
  updateRunback(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_RUNBACK, form, httpOptions).pipe(map((response: any) => response));
  }
  getRunback_search(termId, serviceId, resultType, pageIndex, pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SEARCH_RUNBACK + `?termId=${termId}&serviceId=${serviceId}&resultType=${resultType}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }
  getRunback(servceId, resulttypeId, temId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RUNBACK + `?serviceId=${servceId}&resultType=${resulttypeId}&termId=${temId}`, httpOptions).pipe(map((response: any) => response));
  }
  getCadetRunback(resultType, termId, pageIndex, pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CADET_RUNBACK + `?resultType=${resultType}&termId=${termId}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------COUNSELLOR-------------------------- */
  addCounsellor(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_KOHIMA, form, httpOptions).pipe(map((response: any) => response));
  }
  getCounsellor(battalionId, companyId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_KOHIMA + `?battalionId=${battalionId}&companyId=${companyId}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }
  getCounsellorById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_KOHIMA_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }
  updateCounsellor(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_KOHIMA, form, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------CAMPMARKS-------------------------- */
  getCampMarks(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CAMP_MARKS + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }

  getSubjectMarks_List(serviceId, termId, e) {
    console.log(serviceId)
    // console.log(termId)
    console.log(e)

    // termId = 3
    // console.log(e)

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SUBJECTCAMPMARKS_LIST + `?serviceId=${serviceId}&termId=${termId}&exerciseTypeId=${e}`, httpOptions).pipe(map((response: any) => response));
  }
  addCammarks(form) {
    // console.log(form,">>>> addcase")
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_CAMPMARKS, form, httpOptions).pipe(map((response: any) => response));
  }
  updateCammarks(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.put(Links.UPDATE_CAMPMARKS, form, httpOptions).pipe(map((response: any) => response));
  }



  /* ---------------------DRILL-------------------------- */

  getDrillMarks(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_DRILL_MARKS + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }


  /* ---------------------PERSONAL-------------------------- */

  getPersonalInfo(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PERSNOLINFO + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------EXERCISETYPE-------------------------- */
  getExerciseType(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_EXERCISE_Type + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  addExerciseType(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_EXERCISE_TYPE, form, httpOptions).pipe(map((response: any) => response));
  }
  getExerciseTypeByID(id) {
    console.log("id====>>>", id);
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.VIEW_EXERCISETYPE_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  changeStatus
  changeExerciseTypeStatus(id, status) {
    this.changeStatus = { id, status }
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.CHANGE_EXERCISETYPE_STATUS, this.changeStatus, httpOptions).pipe(map((response: any) => response));
  }
  updateExerciseType(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.CHANGE_EXERCISETYPE_STATUS, form, httpOptions).pipe(map((response: any) => response));
  }
  /* ---------------------SRE-------------------------- */
  getSRE(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_SRE_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }


  // getCampMarks(servceId) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   const formData = new FormData();
  //   formData.append('servceId', servceId)
  //   return this.http.post(Links.GET_CAMP_MARKS, formData, httpOptions).pipe(map((response: any) => response));
  // }

  getOQMarks(servceId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_CAMP_MARKS + `?serviceId=${servceId}`, httpOptions).pipe(map((response: any) => response));
  }
  addSRE(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_SRE, formData, httpOptions).pipe(map((response: any) => response));
  }


  updateSRE(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_SRE, formData, httpOptions).pipe(map((response: any) => response));
  }
  getSREByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_SRE_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }


  changeSREStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_SRE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /* ---------------------OTHER SECURITY-------------------------- */
  getOtherSecurity(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_OTHERSECURITY_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }
  addOtherSecurity(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_OTHERSECURITY, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateOtherSecurity(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_OTHERSECURITY, formData, httpOptions).pipe(map((response: any) => response));
  }
  getOtherSecurityByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_OTHERSECURITY_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }
  changeOtherSecurityStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_OTHERSECURITY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  /* ---------------------ITCOMMUNICATION-------------------------- */
  /* ---------------------CHARTER-------------------------- */
  /* ---------------------COMMUNICATIONSEC-------------------------- */

  getCommunicationSec(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_COMMUNICATIONSEC_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }
  addCommunicationSec(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_COMMUNICATIONSEC, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateCommunicationSec(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_COMMUNICATIONSEC, formData, httpOptions).pipe(map((response: any) => response));
  }
  getCommunicationSecByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_COMMUNICATIONSEC_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }
  changeCommunicationSecStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_COMMUNICATIONSEC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /* ---------------------ITSEC-------------------------- */
  getiTSec(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_ITSEC_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }
  addItSec(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_ITSEC, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateItSec(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_ITSEC, formData, httpOptions).pipe(map((response: any) => response));
  }
  getItSecByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_ITSEC_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }
  changeItSecStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_ITSEC_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  /* ---------------------ITPPP-------------------------- */

  getItppp(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_ITPPP_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }
  addItppp(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_ITPPP, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateItppp(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_ITPPP, formData, httpOptions).pipe(map((response: any) => response));
  }
  getItpppByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_ITPPP_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }
  changeItpppStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_ITPPP_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }






  /* ---------------------COMMUNICATION INFRA-------------------------- */
  getCOMMUNICATION(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_COMMUNICATION_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addCOMMUNICATION(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_COMMUNICATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateCOMMUNICATION(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', form.name)
    formData.append('description', form.description);
    formData.append('status', form.status)
    formData.append('docfile', form.doc)

    return this.http.post(Links.UPDATE_COMMUNICATION, formData, httpOptions).pipe(map((response: any) => response));
  }

  getCOMMUNICATIONByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_COMMUNICATION_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeCOMMUNICATIONStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_COMMUNICATION_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }



  /** -------COMPLAINTS---------- */
  getComplaints(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_COMPLAINTS_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addComplaints(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('title', form.title)
    formData.append('name', form.name)
    formData.append('address', form.address)
    formData.append('department', form.department)
    formData.append('requestType', form.requestType)
    formData.append('requestNature', form.requestNature)
    formData.append('details', form.details);
    formData.append('requestStatus', form.requestStatus)
    formData.append('remarks', form.remarks)
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.ADD_COMPLAINTS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateComplaints(form, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', form.title)
    formData.append('name', form.name)
    formData.append('address', form.address)
    formData.append('department', form.department)
    formData.append('requestType', form.requestType)
    formData.append('requestNature', form.requestNature)
    formData.append('details', form.details);
    formData.append('requestStatus', form.requestStatus)
    formData.append('remarks', form.remarks)
    formData.append('status', form.status)
    formData.append('docFile', form.doc)
    return this.http.post(Links.UPDATE_COMPLAINTS, formData, httpOptions).pipe(map((response: any) => response));
  }

  getComplaintsByID(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_COMPLAINTS_BY_ID + `?id=${id}`, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeComplaintsStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.post(Links.CHANGE_COMPLAINTS_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }




  /** ============== TRG BATALION MANAGEMENT ============== */

  /** -------TRG BATTALION MEMBERS---------- */


  getTRGBattalionList(battalionId, status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    const formData = new FormData();
    formData.append('id', battalionId)
    formData.append('status', status);
    return this.http.get(Links.GET_TRG_BATTALION_MEMBERS + `?battalionId=${battalionId}&status=${status}`).pipe(map((response: any) => response));
  }

  changeTRGBattalionMemberStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status);
    return this.http.post(Links.CHANGE_TRG_BATTALION_MEMBER_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  addTRGBattalionMember(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('rank', form.rank)
    formData.append('name', form.name)
    formData.append('award', form.awards)
    formData.append('battalionPost.id', form.post)
    formData.append('battalionType.id', form.battalion)
    formData.append('companyId', form.company)
    formData.append('status', form.status)

    formData.append('document', form.image)
    return this.http.post(Links.ADD_TRG_BATTALION_MEMBER, formData, httpOptions).pipe(map((response: any) => response));
  }

  getTRGBattalionMemberById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_TRG_BATTALION_MEMBER_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateTRGBattalionMember(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)
    formData.append('rank', form.rank)
    formData.append('name', form.name)

    formData.append('battalionPost.id', form.post)
    formData.append('battalionType.id', form.battalion)
    formData.append('companyId', form.company)

    formData.append('status', form.status)
    formData.append('document', form.image)

    return this.http.post(Links.UPDATE_TRG_BATTALION_MEMBER, formData, httpOptions).pipe(map((response: any) => response));

  }

  /** -------TRG BATTALION History---------- */

  getHistoryList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_HISTORY_LIST, httpOptions).pipe(map((response: any) => response));
  }

  addHistory(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('description', form.history)
    formData.append('battalionType.id', form.battalion)
    formData.append('status', form.status)
    formData.append('document', form.image)

    return this.http.post(Links.ADD_HISTORY, formData, httpOptions).pipe(map((response: any) => response));
  }


  updateTRGBattalionHistory(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)

    formData.append('description', form.history)
    formData.append('battalionType.id', form.battalion)
    formData.append('status', form.status)
    formData.append('document', form.image)

    return this.http.post(Links.UPDATE_TRG_BATTALION_HISTORY, formData, httpOptions).pipe(map((response: any) => response));
  }

  getTRGBattalionHistoryById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.post(Links.VIEW_TRG_BATTALION_HISTORY_BY_ID, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateHistoryStatus(id, status) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const formData = new FormData();

    formData.append('id', id)
    formData.append('status', status);
    return this.http.post(Links.UPDATE_HISTORY_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  /** -------TRG BATTALION GALLANTRY---------- */
  getGallantryList(battalionId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('battalionId', battalionId),
      formData.append('status', status)
    return this.http.post(Links.GET_GALLANTRY_LIST, formData, httpOptions).pipe(map((response: any) => response));
  }

  addGallantryaward(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('rank', form.rank)
    formData.append('name', form.name)
    formData.append('award', form.awards)

    formData.append('battalionId', form.battalion)
    formData.append('companyId', form.company)
    formData.append('status', form.status)

    formData.append('img', form.image)
    return this.http.post(Links.ADD_GALLANTRY, formData, httpOptions).pipe(map((response: any) => response));
  }
  getTRGBattalionGallantryById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      "id": id
    }
    return this.http.post(Links.VIEW_TRG_BATTALION_GALLANTRY_BY_ID, data, httpOptions).pipe(map((response: any) => response));
  }

  updateTRGBattalionGallantry(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('rank', form.rank)
    formData.append('name', form.name)
    formData.append('award', form.awards)

    formData.append('battalionId', form.battalion)
    formData.append('battalionCompany', form.company)
    formData.append('status', form.status)
    formData.append('img', form.image)
    return this.http.post(Links.UPDATE_TRG_BATTALION_GALLANTRY, formData, httpOptions).pipe(map((response: any) => response));
  }

  changeGallantryAwardeeStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('status', status)
    return this.http.post(Links.CHANGE_GALLANTRY_AWARDEE_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }





  /** -------TRG BATTALION Performance---------- */
  getPerformanceList(battalianId, status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    // };
    return this.http.get(Links.GET_PERFORMANCE_LIST + `?status=${status}&battalianId=${battalianId}`,).pipe(map((response: any) => response));
  }

  addPerformance(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('description', form.description)
    // formData.append('rank', form.rank)
    // formData.append('name', form.name)
    formData.append('battalian.id', form.battalion)
    formData.append('battalionCompany', form.company)
    formData.append('status', form.status)
    // formData.append('file', form.image)
    return this.http.post(Links.ADD_PERFORMANCE, formData, httpOptions).pipe(map((response: any) => response));
  }
  getTRGBattalionPerformanceById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.VIEW_TRG_BATTALION_PERFORMANCE_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));

  }

  updateTRGBattalionPerformance(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)
    formData.append('description', form.description)
    // formData.append('rank', form.rank)
    // formData.append('name', form.name)
    formData.append('battalian.id', form.battalion)
    formData.append('battalionCompany', form.company)
    formData.append('status', form.status)

    return this.http.patch(Links.UPDATE_TRG_BATTALION_PERFORMANCE, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateTRGPerformance(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)
    formData.append('description', form.description)

    return this.http.patch(Links.UPDATE_TRG_BATTALION_PERFORMANCE, formData, httpOptions).pipe(map((response: any) => response));
  }

  changePerformanceStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('id', id)
    formData.append('status', status)

    return this.http.patch(Links.UPDATE_TRG_BATTALION_PERFORMANCE, formData, httpOptions).pipe(map((response: any) => response));
  }



  /** -------TRG BATTALION GC ACTIVITIES---------- */

  getGcActivities(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_GC_ACTIVITIES + `?status=${status}&battalianId=${id}`).pipe(map((response: any) => response));
  }

  addGcActivities(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();

    formData.append('battalian.id', form.battalion)
    formData.append('status', form.status)
    formData.append('file', form.image)

    return this.http.post(Links.ADD_GC_ACTIVITIES, formData, httpOptions).pipe(map((response: any) => response));
  }
  getGcActivitiesById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    return this.http.get(Links.GET_GC_Activities_By_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));

  }

  updateGcActivities(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)

    formData.append('battalionType', form.battalion)

    formData.append('status', form.status)
    formData.append('file', form.image)
    return this.http.patch(Links.UPDATE_GC_Activities, formData, httpOptions).pipe(map((response: any) => response));
  }

  // ADD CADET FORM ( GC )

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
  getMeritalStatuses() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_MERITAL_STATUSES, httpOptions).pipe(map((response: any) => response));

  }

  getSchoolOrgList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SCHOOLS_ORGS, httpOptions).pipe(map((response: any) => response));

  }

  getSainikSchoolList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SAINIK_SCHOOLS, httpOptions).pipe(map((response: any) => response));

  }




  getAllCadetsList(status, pageNo, pageSize, battalion?, company?, termId?) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    let searchParams;
    if (termId && battalion && company) {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}&battalion=${battalion}&company=${company}`;
    } else if (termId && !battalion && !company) {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}`;
    } else if (termId && battalion && !company) {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&termId=${termId}&battalion=${battalion}`;
    } else if (battalion && !company && !termId) {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&battalion=${battalion}`;
    } else if (battalion && company && !termId) {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}&battalion=${battalion}&company=${company}`;
    } else {
      searchParams = `?status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`;
    }

    return this.http.get(Links.GET_CADETS_LIST + searchParams, httpOptions).pipe(map((response: any) => response));
  }


  addCadet(files, pForm, edForm, iForm) {
    console.log("iForm", iForm);

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const form = new FormData();

    form.append('serialNo', iForm.srno)

    form.append('serviceId', iForm.serviceId)
    form.append('academyNo', iForm.academyNo)

    form.append('username', iForm.username)
    form.append('password', iForm.password)

    form.append('battalian', iForm.battalion)
    form.append('company', iForm.company)
    form.append('date', iForm.date)
    form.append('termSession', iForm.seasonTerm)
    form.append('year', iForm.year)
    form.append('course', iForm.course)
    form.append('term', iForm.term)
    form.append('status', iForm.status)
    form.append('Miscellaneous', iForm.miscellaneous)

    form.append('vaccinationDetails.nameOfVaccine', iForm.vaccineName)

    form.append('vaccinationDetails.fistDoseReferenceId', iForm.IstDoseRefferenceId)
    form.append('vaccinationDetails.DateOfFistDose', iForm.IstDoseDate)
    form.append('vaccinationDetails.DateOfSecDose', iForm.IIndDoseDate)
    form.append('vaccinationDetails.secDoseReferenceId', iForm.IIndDoseRefferenceId)

    //personal info
    form.append('courseSerNo', pForm.courseSerNo);
    form.append('entry', pForm.entry);
    form.append('name', pForm.name);
    form.append('upscRollNo', pForm.upscRollNo);
    form.append('ssbSerNo', pForm.ssbSerNo);
    form.append('ssbBatchNo', pForm.ssbBatchNo);
    form.append('chestNo', pForm.chestNo);
    form.append('dob', pForm.dob);
    form.append('birthPlace', pForm.birthPlace);
    form.append('religion', pForm.religion);
    form.append('cast', pForm.cast);
    form.append('bloodGroup', pForm.bloodGroup);
    form.append('nationality', pForm.nationality);
    form.append('state', pForm.state);
    form.append('identificationMarks', pForm.identificationMarks);

    form.append('contactNo', pForm.contactNo);
    form.append('email', pForm.email);

    form.append('addressLine1', pForm.addressLine1);
    form.append('addressLine2', pForm.addressLine2);
    form.append('village', pForm.village);
    form.append('tehsil', pForm.tehsil);
    form.append('postOffice', pForm.postOffice);
    form.append('city', pForm.city);
    form.append('district', pForm.district);
    form.append('AddressState', pForm.AddressState);
    form.append('pincode', pForm.pincode);

    form.append('motheTongue', pForm.motheTongue);

    form.append('familyDetails.fatherName', pForm.fatherName);
    form.append('familyDetails.monthlyIncome', pForm.parentMonthlyIncome);
    form.append('familyDetails.name_of_next_of_kin_showing_rel', pForm.nameOfNextKinRelation)
    form.append('familyDetails.address_of_next_of_kin_showing_rel', pForm.addressOfNextKinRelation)
    form.append('familyDetails.relation', pForm.relationWithKin)

    form.append('familyDetails.father_profession', pForm.fatherProfession)
    form.append('familyDetails.currentStatus', pForm.fatherProfessionStatus)
    form.append('familyDetails.furnishDetail', pForm.fatherProfessionDetails)
    form.append('familyDetails.rankType', pForm.fatherProfessionIAFRankType)
    form.append('familyDetails.armedForce', pForm.fatherProfessionIAFType)
    form.append('familyDetails.unit', pForm.fatherProfessionIAFUnit)
    form.append('familyDetails.choiceofArms', pForm.fatherProfessionIAFChoceOfArms)
    form.append('familyDetails.rankName', pForm.fatherProfessionIAFRank)

    // form.append('professionPriorIMA', pForm.professionPriorIMA)

    for (let i = 0; i < pForm.professionalDetails.length; i++) {
      form.append('professionalDetails[' + i + '].profession', pForm.professionalDetails[i].profession)
      form.append('professionalDetails[' + i + '].dateofResignation', pForm.professionalDetails[i].dateOfResignation)
      form.append('professionalDetails[' + i + '].companyName', pForm.professionalDetails[i].companyName)
      form.append('professionalDetails[' + i + '].duration', pForm.professionalDetails[i].duration)
    }

    form.append('maritalStatus', pForm.maritalStatus)

    form.append('isArmy', pForm.isArmy)
    form.append('isNavy', pForm.isNavy)
    form.append('isAirForce', pForm.isAirForce)
    form.append('isTA', pForm.isTA)
    form.append('isCivil', pForm.isCivil)
    form.append('isSemiGovernment', pForm.isSemiGovernment)
    form.append('govtEmp', pForm.govtEmp)


    form.append('memberOfNCC', pForm.memberOfNCC)
    form.append('memberOfOTU', pForm.memberOfOTU)

    form.append('cadetRank', pForm.cadetRank)
    form.append('NCCDate', pForm.NCCDate)
    form.append('certObtained', pForm.certObtained)
    form.append('division', pForm.division)
    form.append('trainingPeriod', pForm.trainingPeriod)

    form.append('sports', pForm.sports)
    form.append('sportsLevel', pForm.sportsLevel)
    form.append('hobies', pForm.hobies)
    form.append('adharNo', pForm.adharNo)
    form.append('belongsTo', pForm.belongsTo)

    form.append('isTrainedWithIMA', pForm.isTrainedWithIMA)
    form.append('isTrainedWithOTA', pForm.isTrainedWithOTA)
    form.append('isTrainedWithNDA', pForm.isTrainedWithNDA)

    form.append('trainingAcademyNo', pForm.trainingAcademyNo)
    form.append('trainingCourseSerNo', pForm.trainingCourseSerNo)
    form.append('trainingJoiningDate', pForm.trainingJoiningDate)
    form.append('trainingLeavingDate', pForm.trainingLeavingDate)
    form.append('reasionOfLeaving', pForm.reasionOfLeaving)


    for (let i = 0; i < pForm.foreignLanguages.length; i++) {
      form.append('foreignLanguages[' + i + '].language', pForm.foreignLanguages[i].language);
      form.append('foreignLanguages[' + i + '].qualification', pForm.foreignLanguages[i].qualification);
      form.append('foreignLanguages[' + i + '].University', pForm.foreignLanguages[i].university);
      form.append('foreignLanguages[' + i + '].ProRead', pForm.foreignLanguages[i].proRead);
      form.append('foreignLanguages[' + i + '].ProWrite', pForm.foreignLanguages[i].proWrite);
      form.append('foreignLanguages[' + i + '].ProSpeak', pForm.foreignLanguages[i].proSpeak);
      form.append('foreignLanguages[' + i + '].status', pForm.foreignLanguages[i].status);
    }

    form.append('IMA_JoiningDate', pForm.IMA_JoiningDate)


    form.append('commissioningDetails.IC_Number', pForm.commissioningDetailsIC_Number)
    form.append('commissioningDetails.unit_Posted_To', pForm.commissioningDetailsunit_Posted_To)
    form.append('commissioningDetails.choice_of_Arms', pForm.commissioningDetailschoice_of_Arms)
    form.append('commissioningDetails.date_of_Commissioning', pForm.commissioningDetailsdate_of_Commissioning)






    //10th education
    form.append('cadetEducation[0].examination', edForm._10passed);
    form.append('cadetEducation[0].schoolCollege', edForm._10schoolName);
    form.append('cadetEducation[0].year', edForm._10passedYear);
    form.append('cadetEducation[0].subjectTaken', edForm._10subjects);
    form.append('cadetEducation[0].percentage', edForm._10percentage);
    form.append('cadetEducation[0].divisionClass', edForm._10division);
    form.append('cadetEducation[0].university', edForm._10board);

    //12th education
    form.append('cadetEducation[1].examination', edForm._12passed);
    form.append('cadetEducation[1].schoolCollege', edForm._12schoolName);
    form.append('cadetEducation[1].year', edForm._12passedYear);
    form.append('cadetEducation[1].subjectTaken', edForm._12subjects);
    form.append('cadetEducation[1].percentage', edForm._12percentage);
    form.append('cadetEducation[1].divisionClass', edForm._12division);
    form.append('cadetEducation[1].university', edForm._12board);

    //graduation
    if (edForm.gradu_passed) {

      form.append('cadetEducation[2].examination', edForm.gradu_passed);
      form.append('cadetEducation[2].schoolCollege', edForm.gradu_collName);
      form.append('cadetEducation[2].year', edForm.gradu_passedYear);
      form.append('cadetEducation[2].subjectTaken', edForm.gradu_subjects);
      form.append('cadetEducation[2].percentage', edForm.gradu_percentage);
      form.append('cadetEducation[2].divisionClass', edForm.gradu_division);
      form.append('cadetEducation[2].university', edForm.gradu_university);

    }

    //post graduation
    if (edForm.post_gradu_passed) {

      form.append('cadetEducation[3].examination', edForm.post_gradu_passed);
      form.append('cadetEducation[3].schoolCollege', edForm.post_gradu_collName);
      form.append('cadetEducation[3].year', edForm.post_gradu_passedYear);
      form.append('cadetEducation[3].subjectTaken', edForm.post_gradu_subjects);
      form.append('cadetEducation[3].percentage', edForm.post_gradu_percentage);
      form.append('cadetEducation[3].divisionClass', edForm.post_gradu_division);
      form.append('cadetEducation[3].university', edForm.post_gradu_university);

    }

    //files
    files.forEach(file => {
      form.append('file', file);
    });

    return this.http.post(Links.ADD_CADET, form, httpOptions).pipe(map((response: any) => response));

  }

  getACadet(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_A_CADET + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }



  updateCadetPersonalDetails(id, files, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)

    //files

    files.forEach(file => {
      form.append('file', file);
    });

    form.append('name', pForm.name);
    form.append('dob', pForm.dob);
    form.append('birthPlace', pForm.birthPlace);
    form.append('religion', pForm.religion);
    form.append('cast', pForm.cast);
    form.append('bloodGroup', pForm.bloodGroup);
    form.append('nationality', pForm.nationality);
    form.append('state', pForm.state);
    form.append('identificationMarks', pForm.identificationMarks);
    form.append('maritalStatus', pForm.maritalStatus);
    form.append('adharNo', pForm.adharNo)
    form.append('hobies', pForm.hobies)

    form.append('motheTongue', pForm.motheTongue);
    for (let i = 0; i < pForm.foreignLanguages.length; i++) {
      form.append('foreignLanguages[' + i + '].id', pForm.foreignLanguages[i].id);
      form.append('foreignLanguages[' + i + '].language', pForm.foreignLanguages[i].language);
      form.append('foreignLanguages[' + i + '].qualification', pForm.foreignLanguages[i].qualification);
      form.append('foreignLanguages[' + i + '].University', pForm.foreignLanguages[i].university);
      form.append('foreignLanguages[' + i + '].ProRead', pForm.foreignLanguages[i].proRead);
      form.append('foreignLanguages[' + i + '].ProWrite', pForm.foreignLanguages[i].proWrite);
      form.append('foreignLanguages[' + i + '].ProSpeak', pForm.foreignLanguages[i].proSpeak);
      form.append('foreignLanguages[' + i + '].status', pForm.foreignLanguages[i].status);
    }
    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }




  updateCadetContactDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)
    form.append('belongsTo', pForm.belongsTo)

    form.append('addressLine1', pForm.addressLine1);
    form.append('addressLine2', pForm.addressLine2);
    form.append('village', pForm.village);
    form.append('tehsil', pForm.tehsil);
    form.append('postOffice', pForm.postOffice);
    form.append('city', pForm.city);
    form.append('district', pForm.district);
    form.append('AddressState', pForm.AddressState);
    form.append('pincode', pForm.pincode);

    form.append('contactNo', pForm.contactNo);
    form.append('email', pForm.email);

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCadetFamilyDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)
    form.append('familyDetails.id', pForm.familiDetailsId);
    form.append('familyDetails.fatherName', pForm.fatherName);
    form.append('familyDetails.monthlyIncome', pForm.parentMonthlyIncome);
    form.append('familyDetails.name_of_next_of_kin_showing_rel', pForm.nameOfNextKinRelation)
    form.append('familyDetails.address_of_next_of_kin_showing_rel', pForm.addressOfNextKinRelation)
    form.append('familyDetails.relation', pForm.relationWithKin)

    form.append('familyDetails.father_profession', pForm.fatherProfession)
    form.append('familyDetails.currentStatus', pForm.fatherProfessionStatus)
    form.append('familyDetails.furnishDetail', pForm.fatherProfessionDetails)
    form.append('familyDetails.rankType', pForm.fatherProfessionIAFRankType)
    form.append('familyDetails.armedForce', pForm.fatherProfessionIAFType)
    form.append('familyDetails.unit', pForm.fatherProfessionIAFUnit)
    form.append('familyDetails.choiceofArms', pForm.fatherProfessionIAFChoceOfArms)
    form.append('familyDetails.rankName', pForm.fatherProfessionIAFRank)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }



  updateCadetProfessionalDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();

    form.append('id', id)

    for (let i = 0; i < pForm.professionalDetails.length; i++) {
      form.append('professionalDetails[' + i + '].id', pForm.professionalDetails[i].id)
      form.append('professionalDetails[' + i + '].profession', pForm.professionalDetails[i].profession)
      form.append('professionalDetails[' + i + '].dateofResignation', pForm.professionalDetails[i].dateOfResignation)
      form.append('professionalDetails[' + i + '].companyName', pForm.professionalDetails[i].companyName)
      form.append('professionalDetails[' + i + '].duration', pForm.professionalDetails[i].duration)
    }

    form.append('isArmy', pForm.isArmy)
    form.append('isNavy', pForm.isNavy)
    form.append('isAirForce', pForm.isAirForce)
    form.append('isTA', pForm.isTA)
    form.append('isCivil', pForm.isCivil)
    form.append('isSemiGovernment', pForm.isSemiGovernment)
    form.append('govtEmp', pForm.govtEmp)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));

  }


  updateCadetAcademicDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();

    //id
    form.append('id', id);
    form.append('memberOfNCC', pForm.memberOfNCC)
    form.append('memberOfOTU', pForm.memberOfOTU)

    form.append('cadetRank', pForm.cadetRank)
    form.append('NCCDate', pForm.NCCDate)
    form.append('certObtained', pForm.certObtained)
    form.append('division', pForm.division)
    form.append('trainingPeriod', pForm.trainingPeriod)

    form.append('isTrainedWithIMA', pForm.isTrainedWithIMA)
    form.append('isTrainedWithOTA', pForm.isTrainedWithOTA)
    form.append('isTrainedWithNDA', pForm.isTrainedWithNDA)

    form.append('trainingAcademyNo', pForm.trainingAcademyNo)
    form.append('trainingCourseSerNo', pForm.trainingCourseSerNo)
    form.append('trainingJoiningDate', pForm.trainingJoiningDate)
    form.append('trainingLeavingDate', pForm.trainingLeavingDate)
    form.append('reasionOfLeaving', pForm.reasionOfLeaving)
    // form.append('IMA_JoiningDate', pForm.IMA_JoiningDate)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCadetSportsDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)
    form.append('sports', pForm.sports)
    form.append('sportsLevel', pForm.sportsLevel)
    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCadetCourseDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)
    form.append('courseSerNo', pForm.courseSerNo);
    form.append('entry', pForm.entry);
    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCadetSSBDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();

    form.append('id', id)
    form.append('upscRollNo', pForm.upscRollNo);
    form.append('ssbSerNo', pForm.ssbSerNo);
    form.append('ssbBatchNo', pForm.ssbBatchNo);
    form.append('chestNo', pForm.chestNo);

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));

  }

  updateCadetArrivalDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();

    form.append('id', id)
    form.append('IMA_JoiningDate', pForm.IMA_JoiningDate)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }


  updateCadetCommissioningDetails(id, pForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();

    form.append('id', id)

    form.append('commissioningDetails.id', pForm.commissioningDetailsId)
    form.append('commissioningDetails.IC_Number', pForm.commissioningDetailsIC_Number)
    form.append('commissioningDetails.unit_Posted_To', pForm.commissioningDetailsunit_Posted_To)
    form.append('commissioningDetails.choice_of_Arms', pForm.commissioningDetailschoice_of_Arms)
    form.append('commissioningDetails.date_of_Commissioning', pForm.commissioningDetailsdate_of_Commissioning)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateCadetEducationalDetails(id, edForm) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const form = new FormData();

    //id
    form.append('id', id)

    //10th education
    form.append('cadetEducation[0].examination', edForm._10passed);
    form.append('cadetEducation[0].schoolCollege', edForm._10schoolName);
    form.append('cadetEducation[0].year', edForm._10passedYear);
    form.append('cadetEducation[0].subjectTaken', edForm._10subjects);
    form.append('cadetEducation[0].percentage', edForm._10percentage);
    form.append('cadetEducation[0].divisionClass', edForm._10division);
    form.append('cadetEducation[0].university', edForm._10board);

    //12th education
    form.append('cadetEducation[1].examination', edForm._12passed);
    form.append('cadetEducation[1].schoolCollege', edForm._12schoolName);
    form.append('cadetEducation[1].year', edForm._12passedYear);
    form.append('cadetEducation[1].subjectTaken', edForm._12subjects);
    form.append('cadetEducation[1].percentage', edForm._12percentage);
    form.append('cadetEducation[1].divisionClass', edForm._12division);
    form.append('cadetEducation[1].university', edForm._12board);

    //graduation
    if (edForm.gradu_passed) {
      form.append('cadetEducation[2].examination', edForm.gradu_passed);
      form.append('cadetEducation[2].schoolCollege', edForm.gradu_collName);
      form.append('cadetEducation[2].year', edForm.gradu_passedYear);
      form.append('cadetEducation[2].subjectTaken', edForm.gradu_subjects);
      form.append('cadetEducation[2].percentage', edForm.gradu_percentage);
      form.append('cadetEducation[2].divisionClass', edForm.gradu_division);
      form.append('cadetEducation[2].university', edForm.gradu_university);
    }
    //post graduation
    if (edForm.post_gradu_passed) {
      form.append('cadetEducation[3].examination', edForm.post_gradu_passed);
      form.append('cadetEducation[3].schoolCollege', edForm.post_gradu_collName);
      form.append('cadetEducation[3].year', edForm.post_gradu_passedYear);
      form.append('cadetEducation[3].subjectTaken', edForm.post_gradu_subjects);
      form.append('cadetEducation[3].percentage', edForm.post_gradu_percentage);
      form.append('cadetEducation[3].divisionClass', edForm.post_gradu_division);
      form.append('cadetEducation[3].university', edForm.post_gradu_university);

    }


    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateDocuments(id, files) {
    console.log(files)
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    //files
    const formData = new FormData();
    formData.append('id', id);
    files.forEach(file => {
      formData.append('file', file);
    });
    console.log(formData, 'push')
    return this.http.patch(Links.UPDATE_CADET, formData, httpOptions).pipe(map((response: any) => response));

  }

  updateDocuments2(id, file1, file2, file3, file4, file5, file6, file7) {
    console.log('these are all images', file1, file2, file3, file4, file5, file6, file7)
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };


    //files
    const formData = new FormData();
    formData.append('id', id);
    file1 ? formData.append('profileImg', file1) : null;
    file2 ? formData.append('aadharImg', file2) : null;
    file3 ? formData.append('panImg', file3) : null;
    file4 ? formData.append('tenthImg', file4) : null;
    file5 ? formData.append('twelfthImg', file5) : null;
    file6 ? formData.append('graduationImg', file6) : null;
    file7 ? formData.append('postGraduationImg', file7) : null;
    // var opost ={
    //   id:parseInt(id),
    //   profileImg:file1,
    //   aadharImg:file2,
    //   panImg:file3,
    //   tenthImg:file4,
    //   twelfthImg:file5,
    //   graduationImg:file6,
    //   postGraduationImg:file7
    // }
    console.log(formData)
    return this.http.patch(Links.UPDATE_CADET_NEW, formData, httpOptions).pipe(map((response: any) => response));

  }


  updateIMA_AuthorityDetails(id, iForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    //files
    const form = new FormData();
    form.append('id', id);
    form.append('serialNo', iForm.srno)
    form.append('serviceId', iForm.serviceId)
    form.append('academyNo', iForm.academyNo)
    if (iForm.password == undefined) {
      var confirmPassword=""
      form.append('password',confirmPassword)
    }
    else{
      form.append('password', iForm.password)
    }
    // form.append('username', iForm.username)
    form.append('battalian', iForm.battalion)
    form.append('company', iForm.company)
    form.append('date', iForm.date)
    form.append('termSession', iForm.seasonTerm)
    form.append('year', iForm.year)
    form.append('course', iForm.course)
    form.append('term', iForm.term)
    form.append('status', iForm.status)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));
  }

  updateVaccinationDetails(id, iForm) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    //files
    const form = new FormData();
    form.append('id', id);

    form.append('vaccinationDetails.id', iForm.vaccinationDetailsId)
    form.append('vaccinationDetails.nameOfVaccine', iForm.vaccineName)
    form.append('vaccinationDetails.fistDoseReferenceId', iForm.IstDoseRefferenceId)
    form.append('vaccinationDetails.DateOfFistDose', iForm.IstDoseDate)
    form.append('vaccinationDetails.DateOfSecDose', iForm.IIndDoseDate)
    form.append('vaccinationDetails.secDoseReferenceId', iForm.IIndDoseRefferenceId)

    form.append('serialNo', iForm.srno)



    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));

  }



  updateCadet(id, files, pForm, edForm, iForm) {

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    const form = new FormData();
    //id
    form.append('id', id)



    form.append('serialNo', iForm.srno)

    form.append('serviceId', iForm.serviceId)
    form.append('academyNo', iForm.academyNo)

    form.append('username', iForm.username)
    form.append('password', iForm.password)

    form.append('battalian', iForm.battalion)
    form.append('company', iForm.company)
    form.append('date', iForm.date)
    form.append('termSession', iForm.seasonTerm)
    form.append('year', iForm.year)
    form.append('course', iForm.course)
    form.append('term', iForm.term)
    form.append('status', iForm.status)
    form.append('Miscellaneous', iForm.miscellaneous)

    form.append('vaccinationDetails.nameOfVaccine', iForm.vaccineName)

    form.append('vaccinationDetails.fistDoseReferenceId', iForm.IstDoseRefferenceId)
    form.append('vaccinationDetails.DateOfFistDose', iForm.IstDoseDate)
    form.append('vaccinationDetails.DateOfSecDose', iForm.IIndDoseDate)
    form.append('vaccinationDetails.secDoseReferenceId', iForm.IIndDoseRefferenceId)

    //personal info
    form.append('courseSerNo', pForm.courseSerNo);
    form.append('entry', pForm.entry);
    form.append('name', pForm.name);
    form.append('upscRollNo', pForm.upscRollNo);
    form.append('ssbSerNo', pForm.ssbSerNo);
    form.append('ssbBatchNo', pForm.ssbBatchNo);
    form.append('chestNo', pForm.chestNo);
    form.append('dob', pForm.dob);
    form.append('birthPlace', pForm.birthPlace);
    form.append('religion', pForm.religion);
    form.append('cast', pForm.cast);
    form.append('bloodGroup', pForm.bloodGroup);
    form.append('nationality', pForm.nationality);
    form.append('state', pForm.state);
    form.append('identificationMarks', pForm.identificationMarks);

    form.append('contactNo', pForm.contactNo);
    form.append('email', pForm.email);

    form.append('addressLine1', pForm.addressLine1);
    form.append('addressLine2', pForm.addressLine2);
    form.append('village', pForm.village);
    form.append('tehsil', pForm.tehsil);
    form.append('postOffice', pForm.postOffice);
    form.append('city', pForm.city);
    form.append('district', pForm.district);
    form.append('AddressState', pForm.AddressState);
    form.append('pincode', pForm.pincode);

    form.append('motheTongue', pForm.motheTongue);

    form.append('familyDetails.fatherName', pForm.fatherName);
    form.append('familyDetails.monthlyIncome', pForm.parentMonthlyIncome);
    form.append('familyDetails.name_of_next_of_kin_showing_rel', pForm.nameOfNextKinRelation)
    form.append('familyDetails.address_of_next_of_kin_showing_rel', pForm.addressOfNextKinRelation)
    form.append('familyDetails.relation', pForm.relationWithKin)

    form.append('familyDetails.father_profession', pForm.fatherProfession)
    form.append('familyDetails.currentStatus', pForm.fatherProfessionStatus)
    form.append('familyDetails.furnishDetail', pForm.fatherProfessionDetails)
    form.append('familyDetails.rankType', pForm.fatherProfessionIAFRankType)
    form.append('familyDetails.armedForce', pForm.fatherProfessionIAFType)
    form.append('familyDetails.unit', pForm.fatherProfessionIAFUnit)
    form.append('familyDetails.choiceofArms', pForm.fatherProfessionIAFChoceOfArms)
    form.append('familyDetails.rankName', pForm.fatherProfessionIAFRank)

    // form.append('professionPriorIMA', pForm.professionPriorIMA)

    for (let i = 0; i < pForm.professionalDetails.length; i++) {
      form.append('professionalDetails[' + i + '].id', pForm.professionalDetails[i].id)
      form.append('professionalDetails[' + i + '].profession', pForm.professionalDetails[i].profession)
      form.append('professionalDetails[' + i + '].dateofResignation', pForm.professionalDetails[i].dateOfResignation)
      form.append('professionalDetails[' + i + '].companyName', pForm.professionalDetails[i].companyName)
      form.append('professionalDetails[' + i + '].duration', pForm.professionalDetails[i].duration)
    }


    form.append('maritalStatus', pForm.maritalStatus)

    form.append('isArmy', pForm.isArmy)
    form.append('isNavy', pForm.isNavy)
    form.append('isAirForce', pForm.isAirForce)
    form.append('isTA', pForm.isTA)
    form.append('isCivil', pForm.isCivil)
    form.append('isSemiGovernment', pForm.isSemiGovernment)
    form.append('govtEmp', pForm.govtEmp)


    form.append('memberOfNCC', pForm.memberOfNCC)
    form.append('memberOfOTU', pForm.memberOfOTU)

    form.append('cadetRank', pForm.cadetRank)
    form.append('NCCDate', pForm.NCCDate)
    form.append('certObtained', pForm.certObtained)
    form.append('division', pForm.division)
    form.append('trainingPeriod', pForm.trainingPeriod)

    form.append('sports', pForm.sports)
    form.append('sportsLevel', pForm.sportsLevel)
    form.append('hobies', pForm.hobies)
    form.append('adharNo', pForm.adharNo)
    form.append('belongsTo', pForm.belongsTo)

    form.append('isTrainedWithIMA', pForm.isTrainedWithIMA)
    form.append('isTrainedWithOTA', pForm.isTrainedWithOTA)
    form.append('isTrainedWithNDA', pForm.isTrainedWithNDA)

    form.append('trainingAcademyNo', pForm.trainingAcademyNo)
    form.append('trainingCourseSerNo', pForm.trainingCourseSerNo)
    form.append('trainingJoiningDate', pForm.trainingJoiningDate)
    form.append('trainingLeavingDate', pForm.trainingLeavingDate)
    form.append('reasionOfLeaving', pForm.reasionOfLeaving)

    for (let i = 0; i < pForm.foreignLanguages.length; i++) {
      form.append('foreignLanguages[' + i + '].id', pForm.foreignLanguages[i].id);
      form.append('foreignLanguages[' + i + '].language', pForm.foreignLanguages[i].language);
      form.append('foreignLanguages[' + i + '].qualification', pForm.foreignLanguages[i].qualification);
      form.append('foreignLanguages[' + i + '].University', pForm.foreignLanguages[i].university);
      form.append('foreignLanguages[' + i + '].ProRead', pForm.foreignLanguages[i].proRead);
      form.append('foreignLanguages[' + i + '].ProWrite', pForm.foreignLanguages[i].proWrite);
      form.append('foreignLanguages[' + i + '].ProSpeak', pForm.foreignLanguages[i].proSpeak);
      form.append('foreignLanguages[' + i + '].status', pForm.foreignLanguages[i].status);
    }

    form.append('IMA_JoiningDate', pForm.IMA_JoiningDate)

    form.append('commissioningDetails.IC_Number', pForm.commissioningDetailsIC_Number)
    form.append('commissioningDetails.unit_Posted_To', pForm.commissioningDetailsunit_Posted_To)
    form.append('commissioningDetails.choice_of_Arms', pForm.commissioningDetailschoice_of_Arms)
    form.append('commissioningDetails.date_of_Commissioning', pForm.commissioningDetailsdate_of_Commissioning)

    form.append('cadetEducation[0].examination', edForm._10passed);
    form.append('cadetEducation[0].schoolCollege', edForm._10schoolName);
    form.append('cadetEducation[0].year', edForm._10passedYear);
    form.append('cadetEducation[0].subjectTaken', edForm._10subjects);
    form.append('cadetEducation[0].percentage', edForm._10percentage);
    form.append('cadetEducation[0].divisionClass', edForm._10division);
    form.append('cadetEducation[0].university', edForm._10board);

    //12th education
    form.append('cadetEducation[1].examination', edForm._12passed);
    form.append('cadetEducation[1].schoolCollege', edForm._12schoolName);
    form.append('cadetEducation[1].year', edForm._12passedYear);
    form.append('cadetEducation[1].subjectTaken', edForm._12subjects);
    form.append('cadetEducation[1].percentage', edForm._12percentage);
    form.append('cadetEducation[1].divisionClass', edForm._12division);
    form.append('cadetEducation[1].university', edForm._12board);

    //graduation
    if (edForm.gradu_passed) {

      form.append('cadetEducation[2].examination', edForm.gradu_passed);
      form.append('cadetEducation[2].schoolCollege', edForm.gradu_collName);
      form.append('cadetEducation[2].year', edForm.gradu_passedYear);
      form.append('cadetEducation[2].subjectTaken', edForm.gradu_subjects);
      form.append('cadetEducation[2].percentage', edForm.gradu_percentage);
      form.append('cadetEducation[2].divisionClass', edForm.gradu_division);
      form.append('cadetEducation[2].university', edForm.gradu_university);

    }

    //post graduation
    if (edForm.post_gradu_passed) {

      form.append('cadetEducation[3].examination', edForm.post_gradu_passed);
      form.append('cadetEducation[3].schoolCollege', edForm.post_gradu_collName);
      form.append('cadetEducation[3].year', edForm.post_gradu_passedYear);
      form.append('cadetEducation[3].subjectTaken', edForm.post_gradu_subjects);
      form.append('cadetEducation[3].percentage', edForm.post_gradu_percentage);
      form.append('cadetEducation[3].divisionClass', edForm.post_gradu_division);
      form.append('cadetEducation[3].university', edForm.post_gradu_university);

    }


    //files
    files.forEach(element => {
      form.append('file', element);
    });

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));

  }


  changeCadetStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const form = new FormData();
    //id
    form.append('id', id)
    form.append('status', status)

    return this.http.patch(Links.UPDATE_CADET, form, httpOptions).pipe(map((response: any) => response));

  }



  /**=====================RECORDS OF SERVICE OF OFFICERS===================== */

  addRecordOfService(form1, form2, form3) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    let data = Object.assign({}, form1, form2, form3)
    // console.log(data);
    return this.http.post(Links.ADD_RECORD_OF_SERVICE, data, httpOptions).pipe(map((response: any) => response));
  }

  getRecordOfServiceList(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RECORD_OF_SERVICE + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  changeOfficerStats(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      status: status
    }
    return this.http.post(Links.CHANGE_RECORD_OF_SERVICE_STATUS, data, httpOptions).pipe(map((response: any) => response));
  }

  getRecordOfServiceById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_RECORD_OF_SERVICE_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }


  updateRecordOfService(id, form1, form2, form3) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    let data = Object.assign({ id: id }, form1, form2, form3)
    // console.log(data);
    return this.http.post(Links.UPDATE_RECORD_OF_SERVICE, data, httpOptions).pipe(map((response: any) => response));
  }


  /**------------------------------------------------------------------------ */











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
    const data = {
      id: id,
      status: status
    }
    return this.http.put(Links.UPDATE_CARD_STATUS, data, httpOptions).pipe(map((response: any) => response));
  }

  /** ----------------------pcht------------------------------- */


  getPCHTLIST(PCHT, status) {

    return this.http.get(Links.GET_PCHT_LIST + `?type=${PCHT}&status=${status}`).pipe(map((response: any) => response));
  }

  getGOILIST(GOI, status) {
    return this.http.get(Links.GET_PCHT_LIST + `?type=${GOI}&status=${status}`).pipe(map((response: any) => response));
  }

  getACHIEVEMENTLIST(ACHIEVEMENT, status) {
    return this.http.get(Links.GET_PCHT_LIST + `?type=${ACHIEVEMENT}&status=${status}`).pipe(map((response: any) => response));
  }
  addPCHT(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_PCHT, formData, httpOptions).pipe(map((response: any) => response));
  }

  getPCHTById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_PCHT_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }



  updatePCHTStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.put(Links.UPDATE_PCHT_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updatePCHT(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('docfile', form.doc)
    console.log(formData, '>>');

    return this.http.put(Links.UPDATE_PCHT, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** ----------------------BMT 1------------------------------- */
  getMAPLIST(MAP) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${MAP}`, httpOptions).pipe(map((response: any) => response));
  }

  getConfirmationLIST(Confirmation) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${Confirmation}`, httpOptions).pipe(map((response: any) => response));
  }

  getConfirmationLIST2(BMT2Confirmation) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${BMT2Confirmation}`, httpOptions).pipe(map((response: any) => response));
  }

  getRetestLIST(Retest) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${Retest}`, httpOptions).pipe(map((response: any) => response));
  }

  getEvalLIST(Eval) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${Eval}`, httpOptions).pipe(map((response: any) => response));
  }

  getGeneralInstructionLIST(GeneralInstruction,) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${GeneralInstruction}`, httpOptions).pipe(map((response: any) => response));
  }

  getBMT2LIST(BMT2,) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_LIST + `?type=${BMT2}`, httpOptions).pipe(map((response: any) => response));
  }

  addBMT1(form) {
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
    return this.http.post(Links.ADD_BMT1, formData, httpOptions).pipe(map((response: any) => response));
  }

  getBMT1ById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_BMT1_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }



  updateBMT1Status(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_BMT1_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateBMT1(id, form) {
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

  /** ----------------------SYLLABUS BMT-1 ------------------------------- */

  getSyllabusLIST(SyllabusBMT1, termId, status) {

    return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${SyllabusBMT1}&termId=${termId}&status=${status}`).pipe(map((response: any) => response));
  }

  getSyllabusBMT2LIST(BMT2) {

    return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${BMT2}&status=${1}`).pipe(map((response: any) => response));
  }
  // getSyllabusLIST(SyllabusBMT1) {

  //   return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${SyllabusBMT1}`).pipe(map((response: any) => response));
  // }

  // getSyllabusBMT2LIST(BMT2) {

  //   return this.http.get(Links.GET_SYLLABUS_BMT1_LIST + `?type=${BMT2}`).pipe(map((response: any) => response));
  // }

  addSyllabusBMT1(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('description', form.description)
    formData.append('date', new Date().toISOString().slice(0, 10))
    formData.append('syllabusType', form.syllabusType)
    formData.append('Syllabusdoc', form.doc)
    formData.append('termId', form.termId)

    return this.http.post(Links.ADD_SYLLABUS_BMT1, formData, httpOptions).pipe(map((response: any) => response));
  }

  getSyllabusById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SYLLABUS_BMT1_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }



  updateSyllabusStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.patch(Links.UPDATE_SYLLABUS_BMT1_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateSyllabus(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('syllabusType', form.syllabusType)
    formData.append('description', form.description)
    formData.append('date', new Date().toISOString().slice(0, 10))
    formData.append('Syllabusdoc', form.doc)
    console.log(formData, '>>');

    return this.http.patch(Links.UPDATE_SYLLABUS_BMT1, formData, httpOptions).pipe(map((response: any) => response));
  }
  /** ----------------------CLUBS SOPs------------------------------- */


  getClubs(type, subType, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Clubs_LIST + `?type=${type}&subType=${subType}&status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  getSOPs(type, subType, subSubType, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Clubs_LIST + `?type=${type}&subType=${subType}&subSubType=${subSubType}&status=${status}`, httpOptions).pipe(map((response: any) => response));

  }


  addClubs(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('subType', form.subType)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_Clubs, formData, httpOptions).pipe(map((response: any) => response));
  }

  addSOPs(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('subType', form.subType)
    formData.append('subSubType', form.subSubType)
    formData.append('docfile', form.doc)
    return this.http.post(Links.ADD_Clubs, formData, httpOptions).pipe(map((response: any) => response));
  }

  getClubsById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Clubs_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }



  updateClubsStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status)
    return this.http.put(Links.UPDATE_Clubs_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateClubs(id, form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('id', id)
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('subType', form.subType)
    formData.append('docfile', form.doc)
    console.log(formData, '>>');

    return this.http.put(Links.UPDATE_Clubs, formData, httpOptions).pipe(map((response: any) => response));
  }


  /** ----------------------Role master admin------------------------------- */

  getRole() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Role, httpOptions).pipe(map((response: any) => response));
  }

  getApptRoleLIST(roleId, subRoleId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_APPT_Role_LIST + `?roleId=${roleId}&subRoleId=${subRoleId}`, httpOptions).pipe(map((response: any) => response));
  }
  getDepartmentLIST() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Department_LIST, httpOptions).pipe(map((response: any) => response));
  }
  getSubDepartmentLIST(roleId) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_SUB_Depart_LIST + `?&roleId=${roleId}`, httpOptions).pipe(map((response: any) => response));
  }


  addRole(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_Role, form, httpOptions).pipe(map((response: any) => response));
  }

  updateRole(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_Role, form, httpOptions).pipe(map((response: any) => response));
  }

  /**============== CREATE STAFF ============== */

  staffMember = new BehaviorSubject(null)
  getStaffMember = this.staffMember.asObservable();
  setStaffMember(object) {
    this.staffMember.next(object)
  };

  getOfficersList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_OFFICERS_LIST, httpOptions).pipe(map((response: any) => response));
  }

  createStaff(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.CREATE_STAFF, form, httpOptions).pipe(map((response: any) => response));
  }

  getStaffList(status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_STAFF_LIST + `?status=${status}`, httpOptions).pipe(map((response: any) => response));
  }

  changeStaffStatus(id, status) {
    const data = {
      loginId: id,
      status: status
    }
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_STAFF_STATUS, data, httpOptions).pipe(map((response: any) => response));
  }


  updateStaff(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.UPDATE_STAFF, form, httpOptions).pipe(map((response: any) => response));
  }


  /** ----------------------DISTRIBUTION OF MARKS------------------------------- */
  // getAllTerms() {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
  // }

  // addDistribution(form) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.post(Links.ADD_Examination, form, httpOptions).pipe(map((response: any) => response));
  // }

  // addDoc(file) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   const formData = new FormData();
  //   formData.append('docfile', file)
  //   return this.http.post(Links.ADD_DOCs, formData, httpOptions).pipe(map((response: any) => response));
  // }

  // getDistributionMarksLIST(DistributionMarks) {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
  //   };
  //   return this.http.get(Links.GET_Distribution_LIST + `?type=${DistributionMarks}&termId=${1}&status=${2}`, httpOptions).pipe(map((response: any) => response));
  // }
  /** ----------------------DISTRIBUTION OF MARKS------------------------------- */
  getAllTerms() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_TERMS).pipe(map((response: any) => response));
  }

  getAllTermsNew() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_TERMS_NEW, httpOptions).pipe(map((response: any) => response));
  }


  addDistribution(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_Examination, form, httpOptions).pipe(map((response: any) => response));
  }

  addExamSchedule(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('name', form.name)
    formData.append('status', form.status)
    formData.append('type', form.type)
    formData.append('termId', form.termId)
    formData.append('userId', form.userId)
    formData.append('doc', form.doc)
    return this.http.post(Links.ADD_Exam_Schedule, formData, httpOptions).pipe(map((response: any) => response));
  }

  getdistributionById(id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.VIEW_Distribution_BY_ID + `?id=${id}`, httpOptions).pipe(map((response: any) => response));
  }

  addDoc(file) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const formData = new FormData();
    formData.append('docfile', file)
    return this.http.post(Links.ADD_DOCs, formData, httpOptions).pipe(map((response: any) => response));
  }

  updateDistribution(id, form) {
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

  updateDistributionStatus(id, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    const data = {
      id: id,
      status: status
    }
    return this.http.patch(Links.UPDATE_Distribution, data, httpOptions).pipe(map((response: any) => response));
  }

  getDistributionMarksLIST(DistributionMarks, id) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.get(Links.GET_Distribution_LIST + `?type=${DistributionMarks}&termId=${id}&status=${2}`, httpOptions).pipe(map((response: any) => response));
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
  addAdmin(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    return this.http.post(Links.ADD_MANAGE_ADMIN, form, httpOptions).pipe(map((response: any) => response));
  }



  getAllTermsForUpdate(pageIndex, pageSize) {
    // alert("Term checking 2")
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    // alert(pageIndex+''+pageSize)

    return this.http.get(Links.GET_EDOSSIER_List + `?pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
  }

  getGCTermList(termid, shortname, companyid, pageIndex, pageSize) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };


    console.log(companyid, '--->>companyid');
    //  if((shortname == undefined || shortname == null) ||  companyid == null){
    //   alert('1');
    //   return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    // }


    if (shortname == undefined || shortname == null) {
      // alert('1');
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    else if (companyid == undefined || companyid == null || companyid == 0) {
      // alert('2');
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));


      console.log(companyid, '--->>companyid');
    }
    // if (shortname == undefined || shortname == null) {
    //   return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    // }
    else if (companyid != undefined && companyid != null) {
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&company=${companyid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }
    // else {

    //   return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    // }
    else {
      //alert('3');
      return this.http.get(Links.GET_EDOSSIER_List + `?termId=${termid}&battalion=${shortname}&company=${companyid}&pageNo=${pageIndex}&pageSize=${pageSize}`, httpOptions).pipe(map((response: any) => response));
    }



  }
  changeAdminStatus(adminId, status) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const formData = new FormData();
    // formData.append('id', id);
    // formData.append('status', status);
    const formData = {
      adminId: adminId,
      status: status
    }
    return this.http.post(Links.CHANGE_MANAGE_ADMIN_STATUS, formData, httpOptions).pipe(map((response: any) => response));
  }
  updateAdminPass(form) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };
    // const data = Object.assign({},{id:Id},form)

    return this.http.put(Links.UPDATE_ADMIN_PASSWORD, form, httpOptions).pipe(map((response: any) => response));
  }

  getAllModuleList() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getJWT_Token}`)
    };

    return this.http.get(Links.GET_ALL_MODULES, httpOptions).pipe(map((response: any) => response));
  }


}
