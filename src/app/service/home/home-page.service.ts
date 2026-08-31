import { Injectable } from '@angular/core';
import { Links } from '../../links.module'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  homepageSyllabusData = {
    type:'',
    data:[]
  }

  homePageSyllabus = new BehaviorSubject<any>(this.homepageSyllabusData);
  getHomePageSyllabus = this.homePageSyllabus.asObservable();

  constructor(private http: HttpClient) { }

  setHomePageSyllabus(data){
    this.homePageSyllabus.next(data)
  }


  //GET DAILY PROGRAMS 
  getDailyPrograms() {
    return this.http.get(Links.GET_DAILY_PROGRAM).pipe(map((response: any) => response));
  }

  getAdjutantaro(id, status){
    return this.http.get(Links.GET_ADJUTANT_ARO+`?id=${id}&status=${status}`).pipe(map((response: any) => response));
  }

  //GET EVENTS
  getAllUpcomingEvents(type) {
    return this.http.get(Links.GET_ALL_UPCOMING_EVENTS+`?isGcEvent=${type}`).pipe(map((response: any) => response));
  }


  //GET ACTIVITIES
  getActivities() {
    const formData = new FormData();
    formData.append('status', '1')
    return this.http.post(Links.GET_IMA_ACTIVITIES_IMAGES, formData).pipe(map((response: any) => response));
  }

  //GET COMMANDANT ACTIVE MESSAGE
  getCommandantMessage() {
    const formData = new FormData();
    formData.append('status', '1')
    return this.http.post(Links.GET_COMMANDANT_ACTIVE_MESSAGE, formData).pipe(map((response: any) => response));
  }
  //GET SPECIAL OCCASIONS
  getSpecialOccasions(){
    const formData = new FormData();
    formData.append('status', '1')
    return this.http.get(Links.GET_SPECIAL_OCCASIONS_FOR_WEEK+ '?status=1').pipe(map((response: any) => response));
  }


  getCentralLibrary() {
    return this.http.get(Links.GET_CENTRAL_LIBRARY_LINKS).pipe(map((response: any) => response));
  }
  getCyberPolicies() {
    return this.http.get(Links.GET_CYBER_POLICY).pipe(map((response: any) => response));
  }

  getGreybookrec() {
    return this.http.get(Links.GREY_BOOKS + '?status=1').pipe(map((response: any) => response));
  }

  getARO(flag){
    return this.http.get(Links.GET_ADJUTANT_ARO + `?id=2&status=1&flag=${flag}`).pipe(map((response: any) => response));
  }

  getForcastEventsList(){
    return this.http.get(Links.GET_FORCAST_OF_EVENT_LIST+'?status=1&isGcLec=false').pipe(map((response: any) => response));
  }
  
  getTermSyllabus() {
    return this.http.get(Links.GET_TERM_SYLLABUSES).pipe(map((response: any) => response));
  }

  getSyllabusList(type,termId,status?){
    return this.http.get(Links.GET_ALL_SYLLABUS_LIST+`?type=${type}&termId=${termId}&status=${status}`).pipe(map((response: any) => response));
  }
  getStudyMaterialList(type,termId,status?){
    return this.http.get(Links.GET_ALL_SUBJECTS_LIST+`?type=${type}&termId=${termId}&status=${status}`).pipe(map((response: any) => response));
  }
  getSyllabusListAcademic(termId,paper,subject,status) {
    return this.http.get(Links.GET_ACADEMIC_SYLLABUS_LIST + `?termId=${termId}&paper=${paper}&subject=${subject}&status=${status}`).pipe(map((response: any) => response));
  }
  getStudymaterial(type,termId,status) {
    return this.http.get(Links.GET_ALL_SUBJECTS_LIST +`?type=${type}&termId=${termId}&status=${status}`).pipe(map((response: any) => response));
  }
  getBmt1Lists(type){
    return this.http.get(Links.GET_ALL_SUBJECTS_LIST+`?type=${type}&status=${1}`).pipe(map((response: any) => response));
  }

  getWeeklyPrograms(form){

    // let params = new HttpParams();
    // /**
    //  *   weekId: ['',Validators.required],
    //   termId: ['', Validators.required],
    //   termSeasonId: ['', Validators.required],
    //   year: [this.currentYear, Validators.required],
    //   battalianId:  ['',Validators.required]
    //  */
    // params = params.append("weekId", form.weekId);
    // params = params.append("termId", form.termId);
    // params = params.append("termSeasonId", form.termSeasonId);
    // params = params.append("year", form.year);
    // params = params.append("battalianId", form.battalianId);

    // return this.http.get(Links.GET_WEEKLY_PGMES_HOME_PAGE, { observe: "response", params } ).pipe(map((response: any) => response));
    return this.http.post(Links.GET_WEEKLY_PGMES_HOME_PAGE, form).pipe(map((response: any) => response));

  }

  getDailyPgme(data){
    return this.http.post(Links.GET_DAILY_PGMES_HOME_PAGE,data).pipe(map((response: any) => response));
  }

  getOrganizationChartData() {
    return this.http.get(Links.GET_ORGANIZATION_CHART).pipe(map((response: any) => response));
  }

  getAllGSBranchMembers(status) {
    const formData = new FormData();
    formData.append('status', status)
    return this.http.post(Links.GET_GS_BRANCH_ORGANIZATION_MEMBERS, formData).pipe(map((response: any) => response));
  }

  getTRGBattalionOrgMembers(battalionId, status) {
    return this.http.get(Links.GET_TRG_BATTALION_MEMBERS + `?battalionId=${battalionId}&status=${status}`).pipe(map((response: any) => response));
  }

  hallOfFameGallantryAwardees(award){
    return this.http.get(Links.GET_HALL_OF_FAME_GALLANTRY_AWARDEES + `?fameCounrty=0&awardName=${award}&status=1`).pipe(map((response: any) => response));
  }

  getIMABlogList(pageNo,pageSize) {
    return this.http.get(Links.GET_IMA_BLOG_LIST + `?status=1&pageNo=${pageNo}&pageSize=${pageSize}`).pipe(map((response: any) => response));
  }
  getIMABlogByCategory(cat){
    return this.http.get(Links.GET_IMA_BLOG_BY_CATEGORY + `?cat=${cat}`).pipe(map((response: any) => response));
  }

  getIMABlogById(id) {
    return this.http.get(Links.GET_IMA_BLOG_BY_ID + `?id=${id}`).pipe(map((response: any) => response));
  }

  getAllSpecialOccasionsList(status) {
    return this.http.get(Links.GET_SPECIAL_OCCASIONS_LIST + `?status=${status}`,).pipe(map((response: any) => response));
  }
  getAnnouncementList(status) {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${this.jwtToken}`)
    // };
    return this.http.get(Links.GET_ANNOUNCEMENT_LIST + `?status=${status}`,).pipe(map((response: any) => response));
  }

  getMESSAGEBOARD(status) {
    const formData = new FormData();
    formData.append('status', status)
    return this.http.get(Links.GET_GC_MESSAGE_BOARD_LIST+`?status=${status}`,  ).pipe(map((response: any) => response));
  }
  getpcht(status) {
    const formData = new FormData();
    formData.append('status', status)
    return this.http.get(Links.GET_PCHT_LIST+`?status=${status}`,  ).pipe(map((response: any) => response));
  }
 
}
