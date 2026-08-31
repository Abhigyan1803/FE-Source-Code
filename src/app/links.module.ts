export class Links {

  //========================================================//
  //CLIENT IP BASE URL

  // ON CIVIL NET
  // public static IP = 'http://172.16.10.170:8080/'
  // ON ARMY NET
  // Onsite server LINK
  // public static IP = 'http://10.10.50.10:8080/';

  // public static IP = 'http://192.168.0.98:8080/'

  //========================================================//

  // public static IP = 'http://65.2.78.179:8080/';
  // public static IP = 'http://65.2.78.210:8080/';

// ADVANTAL SERVER
  // public static IP = 'http://65.2.78.210:8080/';
  public static IP = 'http://151.106.39.5:8080/';

  // LOCAL CONNECTION
  // public static IP = 'http://192.168.0.31:8080/';

  public static base = Links.IP + 'ImaLms/';
  // public static base = Links.IP + 'ImaLms/';
  // public static base = Links.IP + 'ImaLms/';

  /**=================FOR LOCAL SYSTEM================*/
  // public static base = Links.IP;
  /**=============================================== */

  /** ================= */
  public static ADMIN_LOGIN = Links.base + 'admin/login';
  public static TRG_BATTALION_LOGIN = Links.base + 'user/login';
  public static GC_LOGIN = Links.base + 'cadet/login';
  public static ED_LOGIN = Links.base + 'edossier/login';

  public static LOGIN_ROLES = Links.base + 'staff/login';

  public static ADD_MANAGE_ADMIN = Links.base + 'admin/addAdminNew';

  // public static TRG_BATTALION_LOGIN = Links.base + 'AllUser/login'

  /** ----------------- */
  /** =======  Role Master ======= */
  public static ADD_Role = Links.base + 'api/userrole/add_role';
  public static UPDATE_Role = Links.base + 'api/userrole/update_role';
  public static GET_Department_LIST = Links.base + 'api/RoleManagement/getRoles';
  public static GET_SUB_Depart_LIST = Links.base + 'api/RoleManagement/getSubRolesByRoleId';
  public static GET_APPT_Role_LIST = Links.base + 'api/RoleManagement/getAppointementByRoleIdAndSubRoleId';
  public static GET_Role = Links.base + 'api/userrole/get_all_roles';

  /**========== CREATE STAFF =========== */
  public static GET_STAFF_LIST = Links.base + 'admin/get_staff_list';
  public static GET_OFFICERS_LIST = Links.base + 'api/recordOfService/get_active_officers_list';
  public static CREATE_STAFF = Links.base + 'admin/create_staff';
  public static UPDATE_STAFF = Links.base + 'admin/update_staff';
  public static UPDATE_STAFF_STATUS = Links.base + 'admin/update_staff_status';

  /**======================================================  */
  //HOME PAGE DATA
  public static GET_ALL_UPCOMING_EVENTS = Links.base + 'api/eventsController/upcomingEvents'
  public static GET_DAILY_PROGRAM = Links.base + 'api/dailyPrgmController/getTodaysPrograme'
  public static GET_IMA_ACTIVITIES_IMAGES = Links.base + 'api/imaActivityController/getActivityByStatus'
  public static GET_COMMANDANT_ACTIVE_MESSAGE = Links.base + 'api/messageCommandantController/getLatestMsgByStatus';
  public static GET_CENTRAL_LIBRARY_LINKS = Links.base + 'api/centralLibraryController/getAllCentralLibraryRecordHomePage';
  public static GET_CYBER_POLICY = Links.base + 'api/cyberPolicyTypeController/getAllPolicyTypeHomePage';
  public static GREY_BOOKS = Links.base + 'api/greyBookController/getGreyBookRecords';
  public static GET_FORCAST_OF_EVENT_LIST = Links.base + 'api/forecast/get-forecast-list';
  public static GET_SPECIAL_OCCASIONS_FOR_WEEK = Links.base + 'api/special-occasion/get-week-occasions';
  public static GET_WEEKLY_PGMES_HOME_PAGE = Links.base + 'api/trg-calendar/get-current-week-schedule';
  public static GET_DAILY_PGMES_HOME_PAGE = Links.base + 'api/trg-calendar/get-week-schedule-by-date';

  public static GET_HALL_OF_FAME_GALLANTRY_AWARDEES = Links.base + 'api/hall-of-fame/get-param-veer-fame-list';
  public static GET_IMA_BLOG_BY_CATEGORY = Links.base + 'api/blog/get-blog-list-by-category';
  public static GET_MY_TASK = Links.base + 'get_academic_assignment_By_termId_status';
  public static E_DOSSIER = Links.IP + 'E-dossier-html/index.html'
  /**------------------------------------------------------- */

  /**==================== ADMIN ========================== */
  //Daily Programs
  public static ADD_PROGRAM = Links.base + 'api/dailyPrgmController/addPrograme';
  public static GET_ALL_PROGRAMS = Links.base + 'api/dailyPrgmController/getAllPrograme';
  public static GET_PROGRAM_BY_DATE = Links.base + 'api/dailyPrgmController/getProgrameByDate';
  public static VIEW_PROGRAM_BY_ID = Links.base + 'api/dailyPrgmController/viewProgrameById';
  public static UPDATE_PROGRAM = Links.base + 'api/dailyPrgmController/updatePrograme';

  //Events
  public static ADD_EVENT = Links.base + 'api/eventsController/addUpcomingEvents';
  public static GET_EVENTS = Links.base + 'api/eventsController/getAllUpcomingEvents';
  public static CHANGE_EVENT_STATUS = Links.base + 'api/eventsController/activeDeactiveEvents';
  public static VIEW_EVENT_BY_ID = Links.base + 'api/eventsController/viewEventsById'
  public static UPDATE_EVENT = Links.base + 'api/eventsController/updateEvents';

  //SPECIAL OCCASIONS
  public static ADD_SPECIAL_OCCASION = Links.base + 'api/special-occasion/add-occasion';
  public static GET_SPECIAL_OCCASIONS_LIST = Links.base + 'api/special-occasion/get-all-occasion';
  public static GET_SPECIAL_OCCASION_BY_ID = Links.base + 'api/special-occasion/get-occasion';
  public static UPDATE_SPECIAL_OCCASION = Links.base + 'api/special-occasion/update-occasion';

  //IMA Activity
  public static ADD_IMA_ACTIVITY = Links.base + 'api/imaActivityController/addIMAActivity';
  public static GET_IMA_ACTIVITIES = Links.base + 'api/imaActivityController/getIMAActivities'
  public static CHANGE_ACTIVITY_STATUS = Links.base + 'api/imaActivityController/activeDeactiveActivity'

  //Commandant Messages
  public static ADD_COMMANDANT_MESSAGE = Links.base + 'api/messageCommandantController/addMessage';
  public static GET_COMMANDANT_MESSAGES = Links.base + 'api/messageCommandantController/getAllMessages';
  public static ACTIVATE_OR_DEACTIVATE_COMMANDANT_MESSAGE = Links.base + 'api/messageCommandantController/activeDeActiemsg';
  public static VIEW_MESSAGE_BY_ID = Links.base + 'api/messageCommandantController/viewMessageById';
  public static UPDATE_COMMANDANT_MESSAGE = Links.base + 'api/messageCommandantController/updateMessage';

  //GREYBOOK
  public static GET_GREYBOOKS_LIST = Links.base + 'api/greyBookController/getGreyBookRecords';
  public static ADD_GREYBOOK = Links.base + 'api/greyBookController/addGreyBook';
  public static GET_A_GREYBOOK_BY_ID = Links.base + 'api/greyBookController/getDetailsById';
  public static UPDATE_GREYBOOK = Links.base + 'api/greyBookController/updateGreyBook';
  public static CHANGE_GREYBOOK_STATUS = Links.base + 'api/greyBookController/activeDeActiveGreyBook';

  /*CENTRAL LIBRARY*/
  public static ADD_CENTRAL_LIBRARY = Links.base + 'api/centralLibraryController/addCentralLibrary';
  public static GET_CENTRAL_LIBRARY_LIST = Links.base + 'api/centralLibraryController/getAllCentralLibraryRecord';
  public static CHANGE_CENTRAL_LIBRARY_STATUS = Links.base + 'api/centralLibraryController/activeDeActiveLibrary';
  public static GET_CENTRAL_LIBRARY_BY_ID = Links.base + 'api/centralLibraryController/getLibraryDetailsById';
  public static UPDATE_CENTRAL_LIBRARY = Links.base + 'api/centralLibraryController/updateLibrary';

  /*E-BOOK*/
  public static ADD_EBOOK = Links.base + 'api/homeEbookController/add_ebook';
  public static GET_EBOOK = Links.base + 'api/homeEbookController/getAll_ebook';
  public static GET_EBOOK_BY_ID = Links.base + 'api/homeEbookController/get_ebook_By_Id';
  public static UPDATE_EBOOK = Links.base + 'api/homeEbookController/update_ebook';

  /**CYBER POLICY */
  public static ADD_CYBER_POLICY = Links.base + 'api/cyberPolicyTypeController/addCyberPolicy';
  public static GET_CYBER_POLICY_LIST = Links.base + 'api/cyberPolicyTypeController/getAllPolicyType';
  public static CHANGE_CYBER_POLICY_STATUS = Links.base + 'api/cyberPolicyTypeController/activeDeacticePolicy';
  public static GET_CYBER_POLICY_BY_ID = Links.base + 'api/cyberPolicyTypeController/getCyberPolicyById';
  public static UPDATE_CYBER_POLICY = Links.base + 'api/cyberPolicyTypeController/updateCyberPolicyById';

  //Commandant Recommended Reading List Controller
  public static GET_ALL_RECOMMENDED_BOOK = Links.base + 'api/commandant-recommended-reading-list/get-recommended-book-list';
  public static ADD_RECOMMENDED_BOOK = Links.base + 'api/commandant-recommended-reading-list/add-recommended-book';
  public static GET_RECOMMENDED_BOOK_BY_ID = Links.base + 'api/commandant-recommended-reading-list/get-recommended-book';
  public static UPDATE_RECOMMENDED_BOOK = Links.base + 'api/commandant-recommended-reading-list/update-recommended-book';
  public static CHANGE_RECOMMENDED_BOOK_STATUS = Links.base + 'api/commandant-recommended-reading-list/update-recommended-book';

  //SECTION HOSPITAL
  public static GET_HOSPITAL_LIST = Links.base + 'api/section-hospital/get-list';
  public static ADD_HOSPITAL = Links.base + 'api/section-hospital/add';
  public static VIEW_HOSPITAL_BY_ID = Links.base + 'api/section-hospital/view-by-Id';
  public static UPDATE_HOSPITAL = Links.base + 'api/section-hospital/update';
  public static CHANGE_HOSPITAL_STATUS = Links.base + 'api/section-hospital/change-status';

  //GC MESSAGE BOARD
  public static GET_GC_MESSAGE_BOARD_LIST = Links.base + 'api/gc_board/get-list';
  public static ADD_GC_MESSAGE_BOARD = Links.base + 'api/gc_board/add-gcBoard';
  public static VIEW_GC_MESSAGE_BOARD_BY_ID = Links.base + 'api/gc_board/view-by-Id';
  public static UPDATE_GC_MESSAGE_BOARD = Links.base + 'api/gc_board/update-gcBoard';
  public static CHANGE_GC_MESSAGE_BOARD_STATUS = Links.base + 'api/gc_board/change-status';



  //HALL OF FAME
  public static GET_HALL_OF_FAME_GALLANTRY_AWARDEES_LIST = Links.base + 'api/hall-of-fame/get-fame-list';
  public static ADD_HALL_OF_FAME_GALLANTRY_AWARDEE = Links.base + 'api/hall-of-fame/add-officer-fame';
  public static GET_A_HALL_OF_FAME_GALLANTRY_AWARDEES = Links.base + 'api/hall-of-fame/get-fame';
  public static UPDATE_HALL_OF_FAME_GALLANTRY_AWARDEES = Links.base + 'api/hall-of-fame/update-officer-fame';

  //ANNOUNCEMENT
  public static GET_ANNOUNCEMENT_LIST = Links.base + 'api/announcement/get-announcement-list';
  public static ADD_ANNOUNCEMENT = Links.base + 'api/announcement/add-announcement';
  public static GET_A_ANNOUNCEMENT_BY_ID = Links.base + 'api/announcement/get-announcement';
  public static UPDATE_ANNOUNCEMENT = Links.base + 'api/announcement/update-announcement';

  //IMA BLOG
  public static ADD_IMA_BLOG = Links.base + 'api/blog/add-blog';
  public static GET_IMA_BLOG_LIST = Links.base + 'api/blog/get-blog-list';
  public static GET_IMA_BLOG_BY_ID = Links.base + 'api/blog/get-blog';
  public static UPDATE_IMA_BLOG = Links.base + 'api/blog/update-blog';

  /**---------------------------------------------------------------- */

  /**-----------------RECORD OF SERVICE----------------- */
  public static GET_RECORD_OF_SERVICE = Links.base + 'api/recordOfService/get_All_officer_by_status';
  public static ADD_RECORD_OF_SERVICE = Links.base + 'api/recordOfService/add_officer';
  public static CHANGE_RECORD_OF_SERVICE_STATUS = Links.base + 'api/recordOfService/change_officer_status'
  public static GET_RECORD_OF_SERVICE_BY_ID = Links.base + 'api/recordOfService/get_officer_by_id';
  public static UPDATE_RECORD_OF_SERVICE = Links.base + 'api/recordOfService/update_officer';




  /**======================ACADEMIC DEPART============================= */


  public static ADD_Examination = Links.base + 'add_academic_examination';
  public static ADD_Exam_Schedule = Links.base + 'add_academic_examination';

  public static ADD_DOCs = Links.base + 'api/academic_files/add-adcademicFiles';

  public static GET_Distribution_LIST = Links.base + 'get_academic_examination_list_by_termId_type';

  public static UPDATE_Distribution = Links.base + 'update_academic_examination';
  public static VIEW_Distribution_BY_ID = Links.base + 'get_academic_examination_By_Id';

  /** ===================== GS BRANCH ============================ */

  /** ---------ACADEMY STATE-------- */
  public static GET_ACADEMY_PARADE_STATE = Links.base + 'api/academy-parade-state/get-parade-state-list';
  public static ADD_ACADEMY_PARADE_STATE = Links.base + 'api/academy-parade-state/add-parade-state';
  public static UPDATE_ACADEMY_PARADE_STATE = Links.base + 'api/academy-parade-state/update-parade-state';
  public static VIEW_ACADEMY_PARADE_STATE_BY_ID = Links.base + 'api/academy-parade-state/get-parade-state';

  /** ---------AdministrativeInstructions-------- */
  public static GET_ADMINISTRATIVE_INSTRUCTION = Links.base + 'api/administrative-instructions/get-instructions-list';
  public static ADD_ADMINISTRATIVE_INSTRUCTION = Links.base + 'api/administrative-instructions/add-instructions';
  public static UPDATE_ADMINISTRATIVE_INSTRUCTION = Links.base + 'api/administrative-instructions/update-instructions';
  public static VIEW_ADMINISTRATIVE_INSTRUCTION_BY_ID = Links.base + 'api/administrative-instructions/get-instructions';

  /** ---------standing-trg-directives-------- */
  public static GET_STANDING_TRG = Links.base + 'api/standing-trg-directive/get-trg-directive-list';
  public static ADD_GET_STANDING_TRG = Links.base + 'api/standing-trg-directive/add-trg-directive';
  public static UPDATE_GET_STANDING_TRG = Links.base + 'api/standing-trg-directive/update-trg-directive';
  public static VIEW_GET_STANDING_TRG_BY_ID = Links.base + 'api/standing-trg-directive/get-trg-directive';

  /** ---------FGC-------- */
  public static GET_FGC = Links.base + 'api/fgc-policy/get-policy-list';
  public static ADD_GET_FGC = Links.base + 'api/fgc-policy/add-policy';
  public static UPDATE_FGC = Links.base + 'api/fgc-policy/update-policy';
  public static VIEW_FGC_BY_ID = Links.base + 'api/fgc-policy/get-policy';

  /** ---------PCAB & COA-------- */
  public static GET_PCAB = Links.base + 'api/pcab-and-coa/get-pcab-and-coa-list';
  public static ADD_GET_PCAB = Links.base + 'api/pcab-and-coa/add-pcab-and-coa';
  public static UPDATE_PCAB = Links.base + 'api/pcab-and-coa/update-pcab-and-coa';
  public static VIEW_PCAB_BY_ID = Links.base + 'api/pcab-and-coa/get-pcab-and-coa';

  /** ---------MISC-------- */
  public static GET_MISC = Links.base + 'api/gs-policy-misc/get-misc-list';
  public static ADD_GET_MISC = Links.base + 'api/gs-policy-misc/add-misc';
  public static UPDATE_MISC = Links.base + 'api/gs-policy-misc/update-parade-state';
  public static VIEW_MISC_BY_ID = Links.base + 'api/gs-policy-misc/get-parade-state';


  /** -------------------CURRENT CASES---------------------- **/
  /* -------Relegation---------- */
  public static GET_RELEGATION = Links.base + 'api/current-cases/get-relegation-list';
  public static ADD_GET_RELEGATION = Links.base + 'api/current-cases/add-relegation';
  public static UPDATE_RELEGATION = Links.base + 'api/current-cases/update-relegation';
  public static VIEW_RELEGATION_BY_ID = Links.base + 'api/current-cases/get-relegation';

  /* -------Relegation---------- */
  public static GET_RESIGNATION = Links.base + 'api/current-cases/get-resignation-list';
  public static ADD_GET_RESIGNATION = Links.base + 'api/current-cases/add-resignation';
  public static UPDATE_GET_RESIGNATION = Links.base + 'api/current-cases/update-resignation';
  public static VIEW_RESIGNATION_BY_ID = Links.base + 'api/current-cases/get-resignation';

  /* -------COURT CASES---------- */
  public static GET_COURTCASES = Links.base + 'api/current-cases/get-court-case-list';
  public static ADD_GET_COURTCASES = Links.base + 'api/current-cases/add-court-case';
  public static UPDATE_GET_COURTCASES = Links.base + 'api/current-cases/update-court-case';
  public static VIEW_COURTCASES_BY_ID = Links.base + 'api/current-cases/get-court-case';

  /* -------WITHDRAWAL---------- */
  public static GET_WITHDRAWAL = Links.base + 'api/current-cases /get-withdrawal-list';
  public static ADD_GET_WITHDRAWAL = Links.base + 'api/current-cases /add-withdrawal';
  public static UPDATE_GET_WITHDRAWAL = Links.base + 'api/current-cases /update-withdrawal';
  public static VIEW_WITHDRAWAL_BY_ID = Links.base + 'api/current-cases /get-withdrawal';

  /** -------------------ASSESMENT---------------------- **/
  /* -------MATRIX---------- */

  public static GET_MATRIX = Links.base + 'api/gs-assessment/get-gs-matrix-list';
  public static ADD_GET_MATRIX = Links.base + 'api/gs-assessment/add-gs-matrix';
  public static UPDATE_GET_MATRIX = Links.base + 'api/gs-assessment/update-gs-matrix';
  public static VIEW_MATRIX_BY_ID = Links.base + 'api/gs-assessment/get-gs-matrix';

  /* -------Schedule---------- */

  public static GET_SCHEDULE = Links.base + 'api/gs-assessment/get-gs-schedule-list';
  public static ADD_GET_SCHEDULE = Links.base + 'api/gs-assessment/add-gs-schedule';
  public static UPDATE_GET_SCHEDULE = Links.base + 'api/gs-assessment/update-gs-schedule';
  public static VIEW_SCHEDULE_BY_ID = Links.base + 'api/gs-assessment/get-gs-schedule';

  /** -------------------Admin Document Checkboard ---------------------- **/
  /* -------AVIATION LIST---------- */
  public static GET_AVIATION = Links.base + 'api/documentCheckboard/get-AviationList';
  public static ADD_GET_AVIATION = Links.base + 'api/documentCheckboard/add-AviationList';
  public static UPDATE_GET_AVIATION = Links.base + 'api/documentCheckboard/update-AviationList';
  public static VIEW_AVIATION_BY_ID = Links.base + 'api/documentCheckboard/view-AviationList-byId';
  public static CHANGE_AVIATION_STATUS = Links.base + 'api/documentCheckboard/change-AviationList-status';

  /* -------PENDING CVR ---------- */
  public static GET_CVR = Links.base + 'api/documentCheckboard/get-CVR-list';
  public static ADD_GET_CVR = Links.base + 'api/documentCheckboard/add-CVR';
  public static UPDATE_GET_CVR = Links.base + 'api/documentCheckboard/update-CVR';
  public static VIEW_CVR_BY_ID = Links.base + 'api/documentCheckboard/view-CVR';
  public static CHANGE_CVR_STATUS = Links.base + 'api/documentCheckboard/change-CVR-status';

  /* -------PARA LIST ---------- */
  public static GET_PARA = Links.base + 'api/documentCheckboard/get-ParaList';
  public static ADD_GET_PARA = Links.base + 'api/documentCheckboard/add-ParaList';
  public static UPDATE_GET_PARA = Links.base + 'api/documentCheckboard/update-ParaList';
  public static VIEW_PARA_BY_ID = Links.base + 'api/documentCheckboard/view-ParaList-byId';
  public static CHANGE_PARA_STATUS = Links.base + 'api/documentCheckboard/change-ParaList-status';

  /* -------PC LIST ---------- */
  public static GET_PC = Links.base + 'api/documentCheckboard/get-PCList';
  public static ADD_GET_PC = Links.base + 'api/documentCheckboard/add-PCList';
  public static UPDATE_GET_PC = Links.base + 'api/documentCheckboard/update-PCList';
  public static VIEW_PC_BY_ID = Links.base + 'api/documentCheckboard/view-PCList-byId';
  public static CHANGE_PC_STATUS = Links.base + 'api/documentCheckboard/change-PCList-status';

  /* -------------CAV LIST ---------------- */
  public static GET_CAV = Links.base + 'api/documentCheckboard/get-CavList';
  public static ADD_GET_CAV = Links.base + 'api/documentCheckboard/add-CavList';
  public static UPDATE_GET_CAV = Links.base + 'api/documentCheckboard/update-CavList';
  public static VIEW_CAV_BY_ID = Links.base + 'api/documentCheckboard/view-CavList-byId';
  public static CHANGE_CAV_STATUS = Links.base + 'api/documentCheckboard/change-CavList-status';

  /* -----------------PENDING EDUCATION DOCS ---------- */
  public static GET_EDUCATION_DOC = Links.base + 'api/documentCheckboard/get-education-doc-list';
  public static ADD_GET_EDUCATION_DOC = Links.base + 'api/documentCheckboard/add-education-doc';
  public static UPDATE_GET_EDUCATION_DOC = Links.base + 'api/documentCheckboard/update-education-doc';
  public static VIEW_EDUCATION_DOC_BY_ID = Links.base + 'api/documentCheckboard/view-education-doc';
  public static CHANGE_EDUCATION_DOC_STATUS = Links.base + 'api/documentCheckboard/change-education-doc-status';

  /* ------------PENDING confirmation --------------- */
  public static GET_PENDING = Links.base + 'api/documentCheckboard/get-line-directorate-list';
  public static ADD_GET_PENDING = Links.base + 'api/documentCheckboard/add-line-directorate';
  public static UPDATE_GET_PENDING = Links.base + 'api/documentCheckboard/update-line-directorate';
  public static VIEW_PENDING_BY_ID = Links.base + 'api/documentCheckboard/view-line-directorate';
  public static CHANGE_PENDING_STATUS = Links.base + 'api/documentCheckboard/change-line-directorate-status';

  /** -------------------Stats ---------------------- **/
  /* -------Intake---------- */
  public static GET_INTAKE = Links.base + 'api/statsController/get-intake-list';
  public static ADD_GET_INTAKE = Links.base + 'api/statsController/add-intake';
  public static UPDATE_GET_INTAKE = Links.base + 'api/statsController/update-intake';
  public static VIEW_INTAKE_BY_ID = Links.base + 'api/statsController/view-intake';
  public static CHANGE_INTAKE_STATUS = Links.base + 'api/statsController/change-intake-Status';
  /* -------POC---------- */
  public static GET_POC = Links.base + 'api/statsController/get-POC-list';
  public static ADD_GET_POC = Links.base + 'api/statsController/add-POC';
  public static UPDATE_GET_POC = Links.base + 'api/statsController/update-POC';
  public static VIEW_POC_BY_ID = Links.base + 'api/statsController/view-POC';
  public static CHANGE_POC_STATUS = Links.base + 'api/statsController/change-POC-Status';

  /** -------------------Security ---------------------- **/


  /* -------Territorial army---------- */
  public static GET_TERRITORIAL = Links.base + 'api/territorial-army-security/get-list';
  public static ADD_TERRITORIAL = Links.base + 'api/territorial-army-security/add-territorialArmy-security';
  public static UPDATE_GET_TERRITORIAL = Links.base + 'api/territorial-army-security/update-territorialArmy-security';
  public static VIEW_GET_TERRITORIAL_BY_ID = Links.base + 'api/territorial-army-security/view-by-Id';
  public static CHANGE_TERRITORIAL_STATUS = Links.base + 'api/territorial-army-security/change-status';

  /* -------DSC---------- */
  public static GET_DSC = Links.base + 'api/dscSecurity/get-list';
  public static ADD_DSC = Links.base + 'api/dscSecurity/add-dsc-security';
  public static UPDATE_GET_DSC = Links.base + 'api/dscSecurity/update-dsc-security';
  public static VIEW_GET_DSC_BY_ID = Links.base + 'api/dscSecurity/view-by-Id';
  public static CHANGE_DSC_STATUS = Links.base + 'api/dscSecurity/change-status';

  /* -------RP SECURITY---------- */
  public static GET_RP = Links.base + 'api/rpSecurity/get-list';
  public static ADD_RP = Links.base + 'api/rpSecurity/add-rp-security';
  public static UPDATE_GET_RP = Links.base + 'api/rpSecurity/update-rp-security';
  public static VIEW_GET_RP_BY_ID = Links.base + 'api/rpSecurity/view-by-Id';
  public static CHANGE_RP_STATUS = Links.base + 'api/rpSecurity/change-status';

  /* -------DEMO COY---------- */
  public static GET_DEMO_COY = Links.base + 'api/demoCoys/get-list';
  public static ADD_DEMO_COY = Links.base + 'api/demoCoys/add-coysService';
  public static UPDATE_GET_DEMO_COY = Links.base + 'api/demoCoys/update-coysService';
  public static VIEW_GET_DEMO_COY_BY_ID = Links.base + 'api/demoCoys/view-by-Id';
  public static CHANGE_DEMO_COY_STATUS = Links.base + 'api/demoCoys/change-status';

  /* -------POLICIES COY---------- */
  public static GET_POLICIES_LIST = Links.base + 'api/policies-security/get-policy-list';
  public static ADD_POLICIES = Links.base + 'api/policies-security/add-policy-security';
  public static UPDATE_POLICIES = Links.base + 'api/policies-security/update-policy-security';
  public static VIEW_POLICIES_BY_ID = Links.base + 'api/policies-security/view-policy-by-Id';
  public static CHANGE_POLICIES_STATUS = Links.base + 'api/policies-security/change-policy-status';


  /** ------------------------------ACCESS CONTROL---------------------------------------------- **/
  /* -----------------------BIOMETRIC RFID------------------------------- */
  public static GET_BIOMETRIC_LIST = Links.base + 'api/biometric-card/get-list';
  public static ADD_BIOMETRIC = Links.base + 'api/biometric-card/add-biometric-card';
  public static UPDATE_BIOMETRIC = Links.base + 'api/biometric-card/update-biometric-card';
  public static VIEW_BIOMETRIC_BY_ID = Links.base + 'api/biometric-card/view-by-Id';
  public static CHANGE_BIOMETRIC_STATUS = Links.base + 'api/biometric-card/change-status';
  /* -----------------------VEHICLE RFID------------------------------- */
  public static GET_VEHICLE_LIST = Links.base + 'api/vehicle-stickers/get-list';
  public static ADD_VEHICLE = Links.base + 'api/vehicle-stickers/add-vehicle-stickers';
  public static UPDATE_VEHICLE = Links.base + 'api/vehicle-stickers/update-vehicle-stickers';
  public static VIEW_VEHICLE_BY_ID = Links.base + 'api/vehicle-stickers/view-by-Id';
  public static CHANGE_VEHICLE_STATUS = Links.base + 'api/vehicle-stickers/change-status';

  /* -----------------------COMBAT------------------------------- */
  public static GET_COMBAT_LIST = Links.base + 'api/entryPasses/get-combat-list';
  public static ADD_COMBAT = Links.base + 'api/entryPasses/add-combat';
  public static UPDATE_COMBAT = Links.base + 'api/entryPasses/update-combat';
  public static VIEW_COMBAT_BY_ID = Links.base + 'api/entryPasses/view-combat';
  public static CHANGE_COMBAT_STATUS = Links.base + 'api/entryPasses/change-combat-status';

  /* -----------------------CIV STAFF------------------------------- */
  public static GET_CIV_LIST = Links.base + 'api/entryPasses/get-def-list';
  public static ADD_CIV = Links.base + 'api/entryPasses/add-def';
  public static UPDATE_CIV = Links.base + 'api/entryPasses/update-def';
  public static VIEW_CIV_BY_ID = Links.base + 'api/entryPasses/view-def';
  public static CHANGE_CIV_STATUS = Links.base + 'api/entryPasses/change-def-status';

  /* -----------------------CASUAL STAFF------------------------------- */
  public static GET_CASUAL_LIST = Links.base + 'api/entryPasses/get-casual-list';
  public static ADD_CASUAL = Links.base + 'api/entryPasses/add-casual';
  public static UPDATE_CASUAL = Links.base + 'api/entryPasses/update-casual';
  public static VIEW_CASUAL_BY_ID = Links.base + 'api/entryPasses/view-casual';
  public static CHANGE_CASUAL_STATUS = Links.base + 'api/entryPasses/change-casual-status';

  /* -----------------------POLICIES ------------------------------- */
  public static GET_POLICIES_ADVISORIES_LIST = Links.base + 'api/info_security/get-policy-list';
  public static ADD_POLICIES_ADVISORIES = Links.base + 'api/info_security/add-policy';
  public static UPDATE_POLICIES_ADVISORIES = Links.base + 'api/info_security/update-policy';
  public static VIEW_POLICIES_ADVISORIES_BY_ID = Links.base + 'api/info_security/view-policy';
  public static CHANGE_POLICIES_ADVISORIES_STATUS = Links.base + 'api/info_security/change-policy-status';

  /* -----------------------RETURN / REPORTS------------------------------- */
  public static GET_RETURN_ADVISORIES_LIST = Links.base + 'api/info_security/get-report-list';
  public static ADD_RETURN_ADVISORIES = Links.base + 'api/info_security/add-report';
  public static UPDATE_RETURN_ADVISORIES = Links.base + 'api/info_security/update-report';
  public static VIEW_RETURN_ADVISORIES_BY_ID = Links.base + 'api/info_security/view-report';
  public static CHANGE_RETURN_ADVISORIES_STATUS = Links.base + 'api/info_security/change-report-status';

  /* -----------------------Prophylactic Policies ------------------------------- */
  public static GET_PROPHYLACTIC_POLICY_LIST = Links.base + 'api/prophylactic_security/get-policy-list';
  public static ADD_PROPHYLACTIC_POLICY = Links.base + 'api/prophylactic_security/add-policy';
  public static UPDATE_PROPHYLACTIC_POLICY = Links.base + 'api/prophylactic_security/update-policy';
  public static VIEW_PROPHYLACTIC_POLICY_BY_ID = Links.base + 'api/prophylactic_security/view-policy';
  public static CHANGE_PROPHYLACTIC_POLICY_STATUS = Links.base + 'api/prophylactic_security/change-policy-status';

  /* -----------------------Prophylactic Report ------------------------------- */
  public static GET_PROPHYLACTIC_Report_LIST = Links.base + 'api/prophylactic_security/get-report-list';
  public static ADD_PROPHYLACTIC_Report = Links.base + 'api/prophylactic_security/add-report';
  public static UPDATE_PROPHYLACTIC_Report = Links.base + 'api/prophylactic_security/update-report';
  public static VIEW_PROPHYLACTIC_Report_BY_ID = Links.base + 'api/prophylactic_security/view-report';
  public static CHANGE_PROPHYLACTIC_Report_STATUS = Links.base + 'api/prophylactic_security/change-report-status';

  /* -----------------------Intelligence  Policies ------------------------------- */
  public static GET_INTELLIGENCE_POLICY_LIST = Links.base + 'api/intelligence_security/get-policy-list';
  public static ADD_INTELLIGENCE_POLICY = Links.base + 'api/intelligence_security/add-policy';
  public static UPDATE_INTELLIGENCE_POLICY = Links.base + 'api/intelligence_security/update-policy';
  public static VIEW_INTELLIGENCE_POLICY_BY_ID = Links.base + 'api/intelligence_security/view-policy';
  public static CHANGE_INTELLIGENCE_POLICY_STATUS = Links.base + 'api/intelligence_security/change-policy-status';

  /* -----------------------Intelligence  Report ------------------------------- */
  public static GET_INTELLIGENCE_REPORT_LIST = Links.base + 'api/intelligence_security/get-report-list';
  public static ADD_INTELLIGENCE_REPORT = Links.base + 'api/intelligence_security/add-report';
  public static UPDATE_INTELLIGENCE_REPORT = Links.base + 'api/intelligence_security/update-report';
  public static VIEW_INTELLIGENCE_REPORT_BY_ID = Links.base + 'api/intelligence_security/view-report';
  public static CHANGE_INTELLIGENCE_REPORT_STATUS = Links.base + 'api/intelligence_security/change-report-status';

  /* ---------------------LEADERSHIP MATRIX CONTROLLER-------------------------- */
  public static GET_LEADERSHIP_MATRIX = Links.base + 'get_academic_Leadership_matrix_by_status';
  public static GET_LEADERSHIP_MATRIX_list = Links.base + 'api/academic-leadership-matrix-result-controller/get_all_cadet_leadership_by_termId_battalion_company';
  public static GET_LEADERSHIP_MATRIX_SAVE_list = Links.base + 'api/academic-leadership-matrix-result-controller/save_bulk_academic_leadership_matrix_result';
  public static GET_LEADERSHIP_MATRIX_SEARCH = Links.base + 'api/academic-leadership-matrix-result-controller/get_all_academic_leadership_matrix_result_by_search';

  /* ---------------------OQ MATRIX CONTROLLER-------------------------- */
  public static GET_OQ_MATRIX_SUBJECT = Links.base + 'getAll_by_status';
  public static GET_OQ_MATRIX_CADET_list = Links.base + 'api/academicOqMatrixResultController/get_all_cadet_oq_matrix_by_termId_battalion_company';
  public static GET_OQ_MATRIX_SAVE_list = Links.base + 'api/academicOqMatrixResultController/save_bulk_academic_oq_matrix_result';
  public static GET_OQ_MATRIX_SEARCH = Links.base + 'api/academicOqMatrixResultController/get_all_academic_oq_matrix_result_by_search';

  /* ---------------------CREDIT CONTROLLER-------------------------- */
  public static GET_NEW_CREDIT_SUBJECT = Links.base + 'get_academic_Credit_for_Excellence_by_status';
  public static GET_NEW_CREDIT_CADET_list = Links.base + 'api/academic-credit-for-excellence-result-controller/get_all_cadet_credit_for_excellence_result_by_termId_battalion_company';
  public static GET_NEW_CREDIT_SAVE_list = Links.base + 'api/academic-credit-for-excellence-result-controller/save_bulk_credit_for_excellence_result';
  public static GET_NEW_CREDIT_SEARCH = Links.base + 'api/academic-credit-for-excellence-result-controller/get_all_credit_for_excellence_by_search';

  /* ---------------------Intellectual CONTROLLER-------------------------- */
  public static GET_NEW_Intellectual_SUBJECT = Links.base + 'get_intellectualsubject_by_status';
  public static GET_NEW_Intellectual_CADET_list = Links.base + 'api/intellectual_skills_result_controller/get_all_intellectualSkills_result_by_termId_battalion_company';
  public static GET_NEW_Intellectual_SAVE_list = Links.base + 'api/intellectual_skills_result_controller/save_bulk_intellectualSkills_result';
  public static GET_NEW_INTELLECTUAL_SEARCH = Links.base + 'api/intellectual_skills_result_controller/get_all_intellectualSkills_result_by_search';

  /* ---------------------New Drill CONTROLLER-------------------------- */
  public static GET_NEW_DRILL_SUBJECT = Links.base + 'api/drillSubjectController/get-subject-by-termid';
  public static GET_NEW_DRILL_CADET_list = Links.base + 'api/drillResultController/get_all_drill-result_by_termId_battalion_company';
  public static GET_NEW_DRILL_SAVE_list = Links.base + 'api/drillResultController/save_bulk_drill_result';
  public static GET_NEW_DRILL_SEARCH = Links.base + 'api/drillResultController/get_all_drill_result_by_search';

  /* ---------------------New Drill CONTROLLER-------------------------- */
  public static GET_OQ_DRILL_CADET_list = Links.base + 'api/oq_drill_result_controller/get_all_cadet_oq_drill_result_by_termId_battalion_company';
  public static GET_OQ_DRILL_SAVE_list = Links.base + 'api/oq_drill_result_controller/save_bulk_oq_drill_result';
  public static GET_OQ_DRILL_SEARCH = Links.base + 'api/oq_drill_result_controller/get_all_oq_drill_result_by_search';



  public static GET_NEW_DRILL_EDOSSIER_MARKS = Links.base + 'ImaLms/api/drillResultController/get-all-drill-result';

  public static GET_Nx_DRILL_EDOSSIER_MARKS = Links.base + 'api/drillResultController/get-all-drill-result';
  public static GET_Assessment_OQ_EDOSSIER_MARKS = Links.base + 'api/oqMarkResultController/get-oq-marks-result-by-serviceid';

  public static GET_DRILLDAT = Links.base + 'api/drillResultController/get_edossier_drill_3_term_dat';
  public static UPDATE_DRILLDAT = Links.base + 'api/drillResultController/update_edossier_drill_3_term_dat';
  public static ADD_DRILLDAT = Links.base + 'api/drillResultController/add_edossier_drill_3_term_dat';


  public static GET_Assessment_OQ_MATRIX_EDOSSIER_MARKS = Links.base + 'api/oqMarkResultController/get-oq-marks-result-by-serviceid';
  public static GET_OQ_MATRIX_DRILL_EQTN_ADC_MARKS_BY_SERVICE_ID = Links.base + 'api/academicOqMatrixResultController/get_oqmatrix_drill_eqtn';
  public static ADD_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID = Links.base + 'api/ed_assessment_oq_final_controller/ed_assessment_oq_final';
  public static GET_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID = Links.base + 'api/ed_assessment_oq_final_controller/get_ed_assessment_oq_final_by_serviceid';
  public static UPDATE_ED_ASSESSMENT_OQ_FINAL_BY_SERVICE_ID = Links.base + 'api/ed_assessment_oq_final_controller/update_ed_assessment_oq_final';



  /* ---------------------New WT CONTROLLER-------------------------- */
  // public static GET_NEW_WT_SUBJECT = Links.base + 'api/drillSubjectController/get-subject-by-termid';
  public static GET_NEW_WT_CADET_list = Links.base + 'api/training-result/get_all_cadet_weapon_training_result_by_termId_battalion_company';
  public static GET_NEW_WT_SAVE_list = Links.base + 'api/training-result/save_bulk_weapon_training_result';
  public static GET_NEW_WT_SEARCH = Links.base + 'api/training-result/get_all_weapon_training_result_by_search';

  public static GET_NEW_WT_ED_SEARCH = Links.base + 'api/training-result/get-cadet-weapon-main-result_by_serviceId';





  /** ------------------------------Security Apparatus---------------------------------------------- **/
  /* ---------------------ACS FP-------------------------- */
  public static GET_ACSFP_LIST = Links.base + 'api/security_apparatus/get-ACSFP-list';
  public static ADD_ACSFP = Links.base + 'api/security_apparatus/add-ACSFP-security';
  public static UPDATE_ACSFP = Links.base + 'api/security_apparatus/update-ACSFP-security';
  public static VIEW_ACSFP_BY_ID = Links.base + 'api/security_apparatus/view-ACSFP-by-Id';
  public static CHANGE_ACSFP_STATUS = Links.base + 'api/security_apparatus/change-ACSFP-status';
  /* ---------------------CAMPMARKS-------------------------- */

  public static GET_CAMP_MARKS = Links.base + 'api/cadet/get-cadet-by-serviceId';
  public static GET_SUBJECTCAMPMARKS_LIST = Links.base + 'api/campMarksResultController/get-camp-mark-result-check';
  public static ADD_CAMPMARKS = Links.base + 'api/campMarksResultController/add-campMarkResult';
  public static UPDATE_CAMPMARKS = Links.base + 'api/campMarksResultController/update-camp_marks_result';

  /* ---------------------NEW CAMPMARKS-------------------------- */
  public static GET_Camp_Marks_Subject = Links.base + 'api/campSubjectDetailsController/get-all-subject-by-status';
  public static GET_Camp_Marks_list = Links.base + 'api/campMarksResultController/get_all_campmarksresult_by_termId_battalion_company';
  public static GET_Camp_Marks_SEARCH = Links.base + 'api/campMarksResultController/get_all_camp_marks_result_by_search';
  public static GET_Camp_Marks_SAVE_list = Links.base + 'api/campMarksResultController/save_bulk_camp_marks_leadership_matrix_result';

  /* ---------------------NEW CAMPMARKS-------------------------- */
  public static GET_OQ_Marks_Subject = Links.base + 'api/oqSubjectDetailsController1/get-all-subject-by-status';
  public static GET_OQ_Marks_list = Links.base + 'api/oqMarkResultController/get_all_oq-marks_by_termId_battalion_company';
  public static GET_OQ_Marks_SEARCH = Links.base + 'api/oqMarkResultController/get_all_oq_marks_result_by_search';
  public static GET_OQ_Marks_SAVE_list = Links.base + 'api/oqMarkResultController/save_bulk_oq_marks_result';

  /* ---------------------DRILL-------------------------- */

  public static GET_DRILL_MARKS = Links.base + 'api/cadet/get-cadet-by-serviceId';
  public static GET_SUBJECTDRIIL_LIST = Links.base + 'api/drillResultController/get-drill-result';
  public static ADD_DRILLMARKS = Links.base + 'api/drillResultController/saveDRILLResult';
  public static UPDATE_DRILLMARKS = Links.base + 'api/drillResultController/update-drill_result';

  /* ---------------------GSO2 SERVICE BMT2-------------------------- */

  public static GET_BMT2_SUBJECT = Links.base + 'api/service_bmt_2_subject_controller/get_service_bmt_2_subject_by_status';
  public static GET_BMT2_list = Links.base + 'api/service_bmt_2_result_controller/get_all_service_bmt_2_result_by_termId_battalion_company';
  public static GET_BMT2_SEARCH = Links.base + 'api/service_bmt_2_result_controller/get_all_service_bmt_2_result_by_search';
  public static UPDATE_BMT2_DETAILS = Links.base + 'api/service_bmt_2_result_controller/save_bulk_service_bmt_2_result';

  /* ---------------------GSO2 SERVICE BMT1-------------------------- */

  public static GET_BMT1_DETAILS = Links.base + 'api/gso2servicesubjectbmtcontroller/get_all_cadet_getbyserviceId_GSO2ServiceSubjectBMT_result_by_termId_battalion_company';
  public static GET_BMT1_SEARCH = Links.base + 'api/gso2servicesubjectbmtcontroller/get_all_GSO2ServiceSubjectBMT_by_search';
  public static UPDATE_BMT1_DETAILS = Links.base + 'api/gso2servicesubjectbmtcontroller/save_bulk_GSO2ServiceSubjectBMT_result';


  /* ---------------------CreditOfExellence-------------------------- */
  public static GET_CREDITOFEXELLENCE_LIST = Links.base + 'api/academic-credit-for-excellence-result-controller/get_academic_credit_for_exellence_result_check';
  public static ADD_CREDITOFEXELLENCE = Links.base + 'api/academic-credit-for-excellence-result-controller/add_academic_credit_for_excellence_result';
  public static UPDATE_CREDITOFEXELLENCE = Links.base + 'api/academic-credit-for-excellence-result-controller/update-academic_credit_for_exellence_result';

  /* ---------------------BMT1FINALTERM-------------------------- */
  public static ADD_BMT1FINALTERM = Links.base + 'api/gso2servicesubjectbmtcontroller/add_GSO2ServiceSubjectBMT';
  public static GET_BMT1FINALTERM = Links.base + 'api/gso2servicesubjectbmtcontroller/getbytermId_subjecttype_assesmenttermType_serviceid_status';
  public static UPDATE_BMT1FINALTERM = Links.base + 'api/gso2servicesubjectbmtcontroller/update_academic_subject';

  /* ---------------------RUNBACK-------------------------- */
  public static ADD_RUNBACK = Links.base + 'api/battalion/get_runBack_route_mr_by_serviceId_and_resultType_and_termId';
  public static UPDATE_RUNBACK = Links.base + 'api/battalion/save_bulk_route_run_mr_result';
  public static GET_RUNBACK = Links.base + 'api/battalion/get_all_cadet_route_run_mr_by_termId_battalion_company';
  public static GET_CADET_RUNBACK = Links.base + 'api/battalion/get_all_cadet_route_run_mr_by_termId_battalion_company';
  public static GET_SEARCH_RUNBACK = Links.base + 'api/battalion/get_all_route_run_mr_by_search';


  /* ---------------------COUNSELLOR-KOHIMA-------------------------- */
  public static ADD_KOHIMA = Links.base + 'api/gc_board/add_acd_counsellor';
  public static GET_KOHIMA = Links.base + 'api/gc_board/get_acd_counsellor_list';
  public static GET_KOHIMA_BY_ID = Links.base + 'api/gc_board/get_acd_counsellor_by_id';
  public static UPDATE_KOHIMA = Links.base + 'api/gc_board/update_acd_counsellor';



  /* ---------------------EXERCISETYPE-------------------------- */
  public static GET_EXERCISE_Type = Links.base + 'api/exercisesController/getAllExerciseTypeListByStatus';
  public static GET_EXERCISE_Types = Links.base + 'api/exercisesController/getAllExerciseTypeList';
  public static GET_GCAPPT = Links.base + 'api/campMarksResultController/get-gc-appt-all';

  public static ADD_EXERCISE_TYPE = Links.base + 'api/exercisesController/add_exercise_type';
  public static VIEW_EXERCISETYPE_BY_ID = Links.base + 'api/exercisesController/get_exercise_type_by_id';
  public static CHANGE_EXERCISETYPE_STATUS = Links.base + 'api/exercisesController/update_exercise_type';


  /* ---------------------SRE-------------------------- */

  public static GET_SRE_LIST = Links.base + 'api/security_apparatus/get-SRE-list';
  // public static GET_CAMP_MARKS = Links.base + 'api/cadet/get-cadet-by-serviceId';
  // public static GET_EXERCISE_Type = Links.base + 'api/exercisesController/getAllExerciseTypeList';
  public static GET_ENTRY_Type = Links.base + 'api/entryTypeController/getAllEntryTypeList';
  public static ADD_SRE = Links.base + 'api/security_apparatus/add-SRE-security';
  public static UPDATE_SRE = Links.base + 'api/security_apparatus/update-SRE-security';
  public static VIEW_SRE_BY_ID = Links.base + 'api/security_apparatus/view-SRE-by-Id';
  public static CHANGE_SRE_STATUS = Links.base + 'api/security_apparatus/change-SRE-status';

  /* ---------------------OTHER SECURITY-------------------------- */
  public static GET_OTHERSECURITY_LIST = Links.base + 'api/security_apparatus/get-OtherInfra-list';
  public static ADD_OTHERSECURITY = Links.base + 'api/security_apparatus/add-OtherInfra-security';
  public static UPDATE_OTHERSECURITY = Links.base + 'api/security_apparatus/update-OtherInfra-security';
  public static VIEW_OTHERSECURITY_BY_ID = Links.base + 'api/security_apparatus/view-OtherInfra-by-Id';
  public static CHANGE_OTHERSECURITY_STATUS = Links.base + 'api/security_apparatus/change-OtherInfra-status';



  /* ---------------------COMMUNICATION INFRA-------------------------- */
  public static GET_COMMUNICATION_LIST = Links.base + 'api/security_apparatus/get-CommunicationInfra-list';
  public static ADD_COMMUNICATION = Links.base + 'api/security_apparatus/add-CommunicationInfra-security';
  public static UPDATE_COMMUNICATION = Links.base + 'api/security_apparatus/update-CommunicationInfra-security';
  public static VIEW_COMMUNICATION_BY_ID = Links.base + 'api/security_apparatus/view-CommunicationInfra-by-Id';
  public static CHANGE_COMMUNICATION_STATUS = Links.base + 'api/security_apparatus/change-CommunicationInfra-status';


  /* ---------------------ITCOMMUNICATION-------------------------- */
  /* ---------------------CHARTER-------------------------- */
  /* ---------------------ITSEC-------------------------- */
  public static GET_ITSEC_LIST = Links.base + 'api/charter-IT&Communication/get-ITCharter-list';
  public static ADD_ITSEC = Links.base + 'api/charter-IT&Communication/add-ITCharter';
  public static UPDATE_ITSEC = Links.base + 'api/charter-IT&Communication/update-ITCharter';
  public static VIEW_ITSEC_BY_ID = Links.base + 'api/charter-IT&Communication/view-IT-Charter';
  public static CHANGE_ITSEC_STATUS = Links.base + 'api/charter-IT&Communication/change-ITCharter-status';
  /* ---------------------COMMUNICATIONSEC-------------------------- */

  public static GET_COMMUNICATIONSEC_LIST = Links.base + 'api/charter-IT&Communication/get-communication-list';
  public static ADD_COMMUNICATIONSEC = Links.base + 'api/charter-IT&Communication/add-communication';
  public static UPDATE_COMMUNICATIONSEC = Links.base + 'api/charter-IT&Communication/update-communication';
  public static VIEW_COMMUNICATIONSEC_BY_ID = Links.base + 'api/charter-IT&Communication/view-communication-Charter';
  public static CHANGE_COMMUNICATIONSEC_STATUS = Links.base + 'api/charter-IT&Communication/change-communication-status';

  /* ---------------------ITPPP-------------------------- */
  public static GET_ITPPP_LIST = Links.base + 'api/ITPPP-IT&Communication/get-list';
  public static ADD_ITPPP = Links.base + 'api/ITPPP-IT&Communication/add';
  public static UPDATE_ITPPP = Links.base + 'api/ITPPP-IT&Communication/update';
  public static VIEW_ITPPP_BY_ID = Links.base + 'api/ITPPP-IT&Communication/view-by-Id';
  public static CHANGE_ITPPP_STATUS = Links.base + 'api/ITPPP-IT&Communication/change-status';




  /** ------------------------------IT COMPLAINTS---------------------------------------------- **/
  /* -----------------------COMPLAINTS REQUIREMENTS------------------------------- */
  public static GET_COMPLAINTS_LIST = Links.base + 'api/requirements-complaints/get-list';
  public static ADD_COMPLAINTS = Links.base + 'api/requirements-complaints/add';
  public static UPDATE_COMPLAINTS = Links.base + 'api/requirements-complaints/update';
  public static VIEW_COMPLAINTS_BY_ID = Links.base + 'api/requirements-complaints/view';
  public static CHANGE_COMPLAINTS_STATUS = Links.base + 'api/requirements-complaints/change-status';



  /** ===================== TRG TEAM MANAGEMENT ============================ */

  public static GET_ALL_POSITION = Links.base + 'api/position/get-position-list'
  public static ADD_TRG_TEAM_MEMBER = Links.base + 'api/OrganizationChartController/addOrg';
  public static GET_TRG_TEAM_MEMBERS = Links.base + 'api/OrganizationChartController/getAllOrg';
  public static GET_MEMBER_BY_ID = Links.base + 'api/OrganizationChartController/getOrgDetailsById';
  public static UPDATE_TRG_MEMBER = Links.base + 'api/OrganizationChartController/updateOrg';
  public static CHANGE_MEMBER_STATUS = Links.base + 'api/OrganizationChartController/activeDeactiveStatus'

  /** ===================== TRG BATTALION MANAGEMENT ======================= */

  public static GET_COMPANY_LIST = Links.base + 'api/battalion/get-company-list';
  public static GET_BATTALION_LIST = Links.base + 'api/battalion/get-battalion-list';
  public static GET_COMPANY_BY_BATTALION = Links.base + 'api/battalion/get-company-by-battalion'
  public static GET_BATTALION_POSTS = Links.base + 'api/battalion/battalion-post-list';

  public static ADD_TRG_BATTALION_MEMBER = Links.base + 'api/battalion/add-organization';
  public static GET_TRG_BATTALION_MEMBERS = Links.base + 'api/battalion/get-organization-list';
  public static CHANGE_TRG_BATTALION_MEMBER_STATUS = Links.base + 'api/battalion/update-status-org';
  public static VIEW_TRG_BATTALION_MEMBER_BY_ID = Links.base + 'api/battalion/view-organization';
  public static UPDATE_TRG_BATTALION_MEMBER = Links.base + 'api/battalion/update-organization';

  /** ========== GS BRANCH ORGANIZATION CHART MANAGEMENT =========== */
  public static ADD_GS_BRANCH_ORGANIZATION_MEMBER = Links.base + 'api/gsController/add-GsOrg';
  public static GET_GS_BRANCH_ORGANIZATION_MEMBERS = Links.base + 'api/gsController/get-gsOrg-list';
  public static GET_GS_BRANCH_MEMBER_BY_ID = Links.base + 'api/gsController/view-gsOrg';
  public static UPDATE_GS_BRANCH_MEMBER = Links.base + 'api/gsController/update-GsOrg'
  public static CHANGE_GS_BRANCH_MEMBER_STATUS = Links.base + 'api/gsController/change-gsOrg-status';
  public static GET_GS_BRANCH_APPTS = Links.base + 'api/gsController/get-gsPositions';

  /** =======  ADD History of Battalion ======= */
  public static GET_HISTORY_LIST = Links.base + 'api/battalion/get-history-list';
  public static ADD_HISTORY = Links.base + 'api/battalion/add-battalion-history';
  public static UPDATE_TRG_BATTALION_HISTORY = Links.base + 'api/battalion/update-battalion-history';
  public static VIEW_TRG_BATTALION_HISTORY_BY_ID = Links.base + 'api/battalion/view-history';
  public static UPDATE_HISTORY_STATUS = Links.base + 'api/battalion/update-history-status';


  /** =======  ADD GALLANTRY of Battalion ======= */
  public static GET_GALLANTRY_LIST = Links.base + 'api/battallionAwardController/getAllAwards';
  public static ADD_GALLANTRY = Links.base + 'api/battallionAwardController/addBattallionAward';
  public static UPDATE_TRG_BATTALION_GALLANTRY = Links.base + 'api/battallionAwardController/updateAwards';
  public static VIEW_TRG_BATTALION_GALLANTRY_BY_ID = Links.base + 'api/battallionAwardController/getDetailsByOnlyById';
  public static CHANGE_GALLANTRY_AWARDEE_STATUS = Links.base + 'api/battallionAwardController/activeDeActiveAwards'

  /** =======  ADD PERFORMANCE ======= */
  public static GET_PERFORMANCE_LIST = Links.base + 'api/performance-highlights/get-performance-highlights-list';
  public static ADD_PERFORMANCE = Links.base + 'api/performance-highlights/add-performance-highlights';
  public static UPDATE_TRG_BATTALION_PERFORMANCE = Links.base + 'api/performance-highlights/update-performance-highlights';
  public static VIEW_TRG_BATTALION_PERFORMANCE_BY_ID = Links.base + 'api/performance-highlights/get-performance-highlights';



  /** -------------GC ACTIVITIES -------------------- */
  public static ADD_GC_ACTIVITIES = Links.base + 'api/gc-activities/add-gc-activities';
  public static GET_GC_ACTIVITIES = Links.base + 'api/gc-activities/get-gc-activities-list';
  public static GET_GC_Activities_By_ID = Links.base + 'api/gc-activities/get-gc-activity';
  public static UPDATE_GC_Activities = Links.base + 'api/gc-activities/update-gc-activities';



  /**----------------------------------------------- */







  /** =================TRG TEAM ===================== */
  /** ================= REPORTS OF ALL TERMS ============ */
  public static GET_REPORTS = Links.base + 'api/cadet_result_report/get_all_cadet_result_report';
  /** ============== ORGANIZATION CHART ============= */
  public static GET_ORGANIZATION_CHART = Links.base + 'api/OrganizationChartController/active-positions'

  /** ============== GSO 1 TRAINING 
   * 
   * =================SOPs============== */
  public static ADD_SOP_DOCUMENT = Links.base + 'api/gsoContoller/addGSOOneTrg';
  public static GET_ALL_TRG_DOCS = Links.base + 'api/gsoContoller/getAllModules';
  public static CHANGE_GSO_ONE_TRG_STATUS = Links.base + 'api/gsoContoller/activeDeactiveStatus';
  public static GET_SOP_DETAILS = Links.base + 'api/gsoContoller/getModuleById'
  public static UPDATE_SOP_DOC = Links.base + 'api/gsoContoller/updateModule'

  /** ============SCHEDULE OF CENTRALLECTURE=============== */
  public static ADD_CENTRALLECTURE = Links.base + 'api/gsoContoller/addCentralLecture';
  public static GET_ALLCENTRALLECTURE = Links.base + 'api/gsoContoller/getAllCentralLecture';
  public static CHANGE_CENTRALLECTURE_STATUS = Links.base + 'api/gsoContoller/activeDeactiveStatusCentralLec';
  public static GET_CENTRALLECTURE_DETAILS = Links.base + 'api/gsoContoller/getCentralLectureById'
  public static UPDATE_CENTRALLECTURE_DOC = Links.base + 'api/gsoContoller/updateCentralLecture'

  /** ============SCHEDULE OF EXERCISES=============== */
  public static GET_ALL_RESP = Links.base + 'api/respController/getAllResp';
  public static ADD_SCHEDULE_OF_EXERCISE = Links.base + 'api/exercisesController/addExercise';
  public static GET_SCHEDULEs_OF_EXERCISEs_LIST = Links.base + 'api/exercisesController/getAllExercises';
  public static GET_SCHEDULE_OF_EXERCISE_BY_ID = Links.base + 'api/exercisesController/getExerciseById';
  public static CHANGE_SCHEDULE_OF_EXERCISE_STATUS = Links.base + 'api/exercisesController/activeDeActiveExercise';
  public static UPDATE_SCHEDULE_OF_EXERCISE = Links.base + 'api/exercisesController/updateExercise';


  /** ------------------------------------------- */




  /** ------------------------------------------------- */



  /**============  ADVENTURE CELL ============*/

  /*============GENERAL INSTRUCTION =================== */

  public static GET_ALL_ADVENTURE_CELL_TYPE = Links.base + 'api/adventureCellType/getAllAdventureTypes'
  public static GET_ALL_TERMS = Links.base + 'termSeason/getSeasonTerm'
  public static GET_TERMS = Links.base + 'api/term/getAllTerms'
  public static GET_TERMS_NEW = Links.base + 'api/term/getAllTermsNew'


  public static ADD_GENERAL_INSTRUCTION = Links.base + 'api/generalInstruction/addInstruction';
  public static GET_ALL_GENERAL_INSTRUCTIONS = Links.base + 'api/generalInstruction/getAllInstructions';
  public static GET_INSTRUCTION_DETAILS_BY_ID = Links.base + 'api/generalInstruction/viewInstructionById';
  public static UPDATE_INSTRUCTION = Links.base + 'api/generalInstruction/updateInstruction';
  public static CHANGE_INSTRUCTION_STATUS = Links.base + 'api/generalInstruction/activeDeactiveInstruction';
  public static UPDATE_GENERAL_INSTRUCTION = Links.base + 'api/generalInstruction/updateInstruction'

  /** ============LETTERS ===========*/
  public static ADD_ADVENTURE_CELL_LETTER = Links.base + 'letter/addLetter';
  public static GET_ALL_LETTERS = Links.base + 'letter/getAllLetters';
  public static VIEW_LETTER_BY_ID = Links.base + 'letter/viewById';
  public static UPDATE_LETTER = Links.base + 'letter/updateLetter';
  public static CHANGE_LETTER_STATUS = Links.base + 'letter/activeDeactiveStatus';

  /** -------------TRANSPORT -------------------- */
  public static ADD_TRANSPORT = Links.base + 'api/transportDemandController/addTransportDemand';
  public static GET_TRANSPORT = Links.base + 'api/transportDemandController/getAllTransportDemand';
  public static GET_TRANSPORT_BY_ID = Links.base + 'api/transportDemandController/getTransportById';
  public static UPDATE_TRANSPORT = Links.base + 'api/transportDemandController/updateTranport';
  public static CHANGE_TRANSPORT_STATUS = Links.base + 'api/transportDemandController/activeDeActiveTransport';

  /** -------------NOMINAL -------------------- */
  public static ADD_NOMINAL = Links.base + 'api/nominalController/addNominalDetails';
  public static GET_NOMINAL = Links.base + 'api/nominalController/getAllNominalDetails';
  public static GET_NOMINAL_BY_ID = Links.base + 'api/nominalController/getNominalById';
  public static UPDATE_NOMINAL = Links.base + 'api/nominalController/updateNominal';
  public static CHANGE_NOMINAL_STATUS = Links.base + 'api/nominalController/activeDeActiveNominal';

  /** -------------SOPS-------------------- */
  public static ADD_SOPS = Links.base + 'api/advCellSopsController/addSopsDetails';
  public static GET_SOPS = Links.base + 'api/advCellSopsController/getAllSopsDetails';
  public static GET_SOPS_BY_ID = Links.base + 'api/advCellSopsController/getSopsById';
  public static UPDATE_SOPS = Links.base + 'api/advCellSopsController/updateSops';
  public static CHANGE_SOPS_STATUS = Links.base + 'api/advCellSopsController/activeDeActiveSops';

  /** -------------CHART -------------------- */
  public static ADD_CHART = Links.base + 'api/adventureCellType/addChart';
  public static GET_CHART = Links.base + 'api/adventureCellType/getAllCharts';
  public static GET_CHART_BY_ID = Links.base + 'api/adventureCellType/viewChartById';
  public static UPDATE_CHART = Links.base + 'api/adventureCellType/updateChart';
  public static CHANGE_CHART_STATUS = Links.base + 'api/adventureCellType/updateChartStatus';

  /** -------------REPORT -------------------- */
  public static ADD_REPORT = Links.base + 'api/adventureCellType/addReport';
  public static GET_REPORT = Links.base + 'api/adventureCellType/getAllReports';
  public static GET_REPORT_BY_ID = Links.base + 'api/adventureCellType/viewReportById';
  public static UPDATE_REPORT = Links.base + 'api/adventureCellType/updateReport';
  public static CHANGE_REPORT_STATUS = Links.base + 'api/adventureCellType/updateReportStatus';

  /** ============ DATESHEET =========== */
  public static ADD_DATESHEET = Links.base + 'dateSheet/addSheet';
  public static GET_ALL_DATESHEET = Links.base + 'dateSheet/getAll';
  public static VIEW_DATESHEET_BY_ID = Links.base + 'dateSheet/viewById';
  public static UPDATE_DATESHEET = Links.base + 'dateSheet/updateRecord';
  public static CHANGE_DATESHEET_STATUS = Links.base + 'dateSheet/activeDeactiveStatus';
  /** ========== BMT 1 & 2 EXAM SCHEDULE =========== */
  public static ADD_EXAM_SCHEDULE = Links.base + 'dateSheet/addServiceSubject';
  public static GET_EXAM_SCHEDULE_LIST = Links.base + 'dateSheet/get_all_service_subject_by_type_subType_termId';
  public static VIEW_EXAM_SCHEDULE_BY_ID = Links.base + 'dateSheet/viewSubjectServiceById';
  public static UPDATE_EXAM_SCHEDULE = Links.base + 'dateSheet/updateServiceSubject';
  public static CHANGE_EXAM_SCHEDULE_STATUS = Links.base + 'dateSheet/activeDeactiveStatusSubjectService';

  /** ------------------------------------------------------- */

  /** =============== GSO 2 PGME =============== */

  /** =========== TRG CALENDAR =================*/

  /** =========== DAILY PROGRAMS ========= */

  public static GET_ALL_WEEK = Links.base + 'api/week/get-week-list'
  public static ADD_TRG_CALENDAR_PROGRAM = Links.base + 'api/trg-calendar/add-daily-program';
  public static GET_ALL_TRG_CALENDAR_PROGRAMS = Links.base + 'api/trg-calendar/get-daily-program-list';
  public static GET_TRG_CALENDAR_PROGRAM_BY_ID = Links.base + 'api/trg-calendar/get-daily-program';
  public static UPDATE_TRG_CALENDAR_PROGRAM = Links.base + 'api/trg-calendar/update-daily-program';

  public static GET_WEEKSBYSEASON = Links.base + 'api/sessionController/getWeeksBySeason'

  /** ========= WEEKLY PROGRAM ======== */

  public static GET_ALL_DATES_OF_WEEK = Links.base + "api/sessionController/getByWeek"
  public static ADD_WEEKLY_PROGRAM = Links.base + 'api/trg-calendar/add-weekly-program';
  public static GET_ALL_WEEKLY_PROGRAMS = Links.base + 'api/trg-calendar/get-weekly-program-list';
  public static GET_WEEKLY_PROGRAM_BY_ID = Links.base + 'api/trg-calendar/get-weekly-program';
  public static UPDATE_WEEKLY_PROGRAM = Links.base + 'api/trg-calendar/update-weekly-program';

  /** =========FORECAST OF TRG EVENTS ============= */

  public static ADD_FORECAST = Links.base + 'api/forecast/add-forecast';
  public static GET_ALL_FORECASTS = Links.base + 'api/forecast/get-forecast-list';
  public static GET_FORECAST_BY_ID = Links.base + 'api/forecast/get-forecast';
  public static UPDATE_FORECAST = Links.base + 'api/forecast/update-forecast';

  /** ===========ADD SEASON TERM=========== */
  public static GET_ALL_ADDED_SEASON_TERMS_LIST = Links.base + 'api/sessionController/get-sessionYear-list'
  public static ADD_A_FULL_SEASON_TERM = Links.base + 'api/sessionController/addSessionYear';
  /** ========= SYLLABUS ======== */
  public static GET_BATTALIONS_FOR_SYLLABUS = Links.base + 'api/battalion/get-battalion-list';

  /** -----TERM SYLLABUS -------- */
  public static ADD_TERM_SYLLABUS = Links.base + 'api/syllabus/term/add-syllabus-term';
  public static GET_TERM_SYLLABUSES = Links.base + 'api/syllabus/term/get-syllabus-term-list';
  public static GET_TERM_SYLLABUS_BY_ID = Links.base + 'api/syllabus/term/get-syllabus-term';
  public static UPDATE_TERM_SYLLABUS = Links.base + 'api/syllabus/term/update-syllabus-term'

  /** ---- OTHER SYLLABUSES ----- */
  public static ADD_SYLLABUS = Links.base + 'api/syllabus/add-syllabus';
  public static GET_ALL_SYLLABUS_LIST = Links.base + 'api/syllabus/get-syllabus-list';
  public static GET_SYLLABUS_BY_ID = Links.base + 'api/syllabus/get-syllabus';
  public static UPDATE_SYLLABUS = Links.base + 'api/syllabus/update-syllabus';


  public static GET_COUNSELLOR = Links.base + 'api/gc_board/get_acd_counsellor_list';
  public static GET_UPCOMING_EVENTS = Links.base + 'api/eventsController/upcomingEvents';

  /** -----PHYSICAL TRAINING (PT) --------------- */

  public static GET_PT_CADETS_LIST = Links.base + 'api/edossier_pt_controller/get_all_cadet_pt_result_by_termId_battalion_company';
  public static SAVE_PT_RESULTS = Links.base + 'api/edossier_pt_controller/save_bulk_edossier_pt_result';

  public static GET_PT_RECORD_OF_CADET = Links.base + 'api/edossier_pt_controller/get_ed_trg_eqtn_result_by_service_id_and_subject_type';
  public static UPDATE_GC_PT_RESULT = Links.base + 'api/edossier_pt_controller/update_edossier_pt_result';

  /** --------- MOTIVATIONAL AWARDS --------- */
  public static ADD_PT_MOTIVATIONAL_AWARDS = Links.base + 'api/edossier_pt_controller/add_pt_motivation_awards';
  public static GET_PT_MOTIVATIONAL_AWARDS = Links.base + 'api/edossier_pt_controller/get_pt_motivation_awards_check'



  /** --------------STUDY MATERIAL SUBJECT--------------- */
  public static GET_ALL_SUBJECTS_LIST = Links.base + 'api/studymaterial/get-studymaterial-list';




  /** =============TRG BATTALION================= */
  public static GET_HISTORY_ACTIVE = Links.base + 'api/battalion/latest-active-record';

  /** -------------BDO -------------------- */
  public static ADD_BDO = Links.base + 'api/BDO/add-bdo';
  public static GET_BDO = Links.base + 'api/BDO/get-bdo-list';
  public static GET_BDO_BY_ID = Links.base + 'api/BDO/get-bdo';
  public static UPDATE_BDO = Links.base + 'api/BDO/update-bdo';

  /** -------------BRO -------------------- */
  public static ADD_BRO = Links.base + 'api/BRO/add-bro';
  public static GET_BRO = Links.base + 'api/BRO/get-bro-list';
  public static GET_BRO_BY_ID = Links.base + 'api/BRO/get-bro';
  public static UPDATE_BRO = Links.base + 'api/BRO/update-bro';

  /** -------------Assignment-------------------- */
  public static ADD_ASSIGNMENT = Links.base + 'assaigment_of_duties/addAssaigmentDuties';
  public static GET_ASSIGNMENT = Links.base + 'assaigment_of_duties/getAll';
  public static GET_ASSIGNMENT_BY_ID = Links.base + 'assaigment_of_duties/viewDetailsById';
  public static UPDATE_ASSIGNMENT = Links.base + 'assaigment_of_duties/updateAssaigmentDuties';
  public static DELETE_ASSIGNMENTOFDUTIES = Links.base + 'assaigment_of_duties/activeDeactiveStatus';

  
  /** ADD CADET ALL MASTERS */
  public static GET_MOTHER_TOUNGS = Links.base + 'api/master/mother-tongue-list';
  public static GET_NATIONALITIES = Links.base + 'api/master/nationality-list';
  public static GET_STATES = Links.base + 'api/master/state-list';
  public static GET_RELIGIONS = Links.base + 'api/master/religious-list';
  public static GET_CASTS = Links.base + 'api/master/caste-list';
  public static GET_BLOOD_GROUPS = Links.base + 'api/master/blood-group-list';
  public static GET_MERITAL_STATUSES = Links.base + 'api/master/marital-list';
  public static GET_SCHOOLS_ORGS = Links.base + 'api/master/school-list'
  public static GET_SAINIK_SCHOOLS = Links.base + 'api/master/sainik-location-list'

  /** =======  ADD CADET ======= */
  public static ADD_CADET = Links.base + 'api/cadet/add-cadet';
  public static GET_CADETS_LIST = Links.base + 'api/cadet/get-cadet-list';
  public static GET_A_CADET = Links.base + 'api/cadet/get-cadet';
  public static UPDATE_CADET = Links.base + 'api/cadet/update-cadet';

  public static UPDATE_CADET_NEW = Links.base + 'api/cadet/update-cadet-new';

  /** =======  ADD I CARD ======= */
  public static ADD_ICARD = Links.base + 'api/ICard/saveICard';
  public static GET_ICARD_LIST = Links.base + 'api/ICard/get-ICard-By-Status';
  public static GET_CARD_BY_ID = Links.base + 'api/ICard/get-ICard-By-id';
  public static UPDATE_CARD = Links.base + 'api/ICard/update-ICard';
  public static UPDATE_CARD_STATUS = Links.base + 'api/ICard/update-ICard-Status';

  public static ADD_PCHT = Links.base + 'api/gc_board/add-gcBoard_Pcht_Ol_Achievements';
  public static GET_PCHT_LIST = Links.base + 'api/gc_board/get-gcBoard_Pcht_Ol_AchievementsList';
  public static GET_PCHT_BY_ID = Links.base + 'api/gc_board/view-gcBoard_Pcht_Ol_Achievements-by-Id';
  public static UPDATE_PCHT = Links.base + 'api/gc_board/update-gcBoard_Pcht_Ol_AchievementsDetails';
  public static UPDATE_PCHT_STATUS = Links.base + 'api/gc_board/change-gcBoard_Pcht_Ol_AchievementsDetails-status';

  /** =======  BMT 1 ======= */
  public static ADD_BMT1 = Links.base + 'api/studymaterial/add-studymaterial';
  public static GET_BMT1_LIST = Links.base + 'api/studymaterial/get-studymaterial-list';
  public static GET_BMT1_BY_ID = Links.base + 'api/studymaterial/get-studymaterial';
  public static UPDATE_BMT1 = Links.base + 'api/studymaterial/update-studymaterial';
  public static UPDATE_BMT1_STATUS = Links.base + 'api/studymaterial/update-studymaterial';

  /** ======= SYLLABUS BMT 1 ======= */
  public static ADD_SYLLABUS_BMT1 = Links.base + 'api/syllabus/add-syllabus';
  public static GET_SYLLABUS_BMT1_LIST = Links.base + 'api/syllabus/get-syllabus-list';
  public static GET_SYLLABUS_BMT1_BY_ID = Links.base + 'api/syllabus/get-syllabus';
  public static UPDATE_SYLLABUS_BMT1 = Links.base + 'api/syllabus/update-syllabus';
  public static UPDATE_SYLLABUS_BMT1_STATUS = Links.base + 'api/syllabus/update-syllabus';

  /** =======  CLUBS SOPS ======= */
  public static ADD_Clubs = Links.base + 'api/gc_board/add_acd_club_sops';
  public static GET_Clubs_LIST = Links.base + 'api/gc_board/get_acd_club_sops_list';
  public static GET_Clubs_BY_ID = Links.base + 'api/gc_board/get_acd_club_sops_by_id';
  public static UPDATE_Clubs = Links.base + 'api/gc_board/update_acd_club_sops';
  public static UPDATE_Clubs_STATUS = Links.base + 'api/gc_board/change_acd_club_sops_status';


  /** -------------LOCATION STATE OF OFFICER-------------------- */
  public static GET_LOCATION_STATE_LIST = Links.base + 'location_state/getAll';
  public static ADD_LOCATION_STATE = Links.base + 'location_state/add';
  public static UPDATE_LOCATION_STATE = Links.base + 'location_state/update';
  public static GET_LOCATION_STATE_ID = Links.base + 'location_state/viewById';
  public static ACTIVE_LOCATION_STATE = Links.base + 'location_state/activeDeactiveStatus';

  /** -------------PARADE STATE OF GCs-------------------- */
  public static GET_PARADE_STATE_LIST = Links.base + 'parade_state/getAll';
  public static ADD_PARADE_STATE = Links.base + 'parade_state/add';
  public static UPDATE_PARADE_STATE = Links.base + 'parade_state/update';
  public static GET_PARADE_STATE_ID = Links.base + 'parade_state/viewById';
  public static ACTIVE_PARADE_STATE = Links.base + 'parade_state/activeDeactiveStatus';





  /** -------------WEAPONS -------------------- */
  public static ADD_WEAPON = Links.base + 'api/weapon/add-weapon';
  public static GET_WEAPON_BY_TERM = Links.base + 'api/training-result/get-cadet-weapon-main-result';
  public static GET_WEAPON_BY_TERM1 = Links.base + 'api/weapon/get-weapon-by-term-new';
  public static GET_WEAPON_BY_ID = Links.base + 'api/weapon/get-weapon-by-id';
  public static UPDATE_WEAPON = Links.base + 'api/weapon/update-weapon';




  /** ================ ADJUTANT BRANCH ================ */

  public static GET_ADJUTANT_LIST = Links.base + 'adjutant/getAdjutantBranches';
  public static GET_ADJUTANT_ARO = Links.base + 'adjutant/getByAdjutantBranch';
  public static ADD_ARO = Links.base + 'adjutant/addAdjudantDetails';
  public static GET_ARO_BY_ID = Links.base + 'adjutant/viewDetailsById'
  public static UPDATE_ARO = Links.base + 'adjutant/updateAdjutantDetails';
  public static ARO_STATUS = Links.base + 'adjutant/activeDeactiveStatus';

  // public static GET_ADJUTANT_DRILL = Links.base + 'adjutant/getByAdjutantBranch';
  // public static ADD_DRILL = Links.base + 'adjutant/addAdjudantDetails';
  // public static GET_DRILL_BY_ID = Links.base + 'adjutant/viewDetailsById'
  // public static UPDATE_DRILL = Links.base + 'adjutant/updateAdjutantDetails';
  // public static DRILL_STATUS = Links.base + 'adjutant/activeDeactiveStatus';

  public static GET_ADJUTANT_DRILL = Links.base + 'api/drillSubjectController/get-all-subject';
  public static ADD_DRILL = Links.base + 'api/drillSubjectController/add-subject';
  public static GET_DRILL_BY_ID = Links.base + 'api/drillSubjectController/get-subject-by-id';
  public static UPDATE_DRILL = Links.base + 'api/drillSubjectController/update-subject';
  public static DRILL_STATUS = Links.base + 'api/drillSubjectController/update-subject';


  public static GET_ADJUTANT_ORDER = Links.base + 'adjutant/getByAdjutantBranch';
  public static ADD_ORDER = Links.base + 'adjutant/addAdjudantDetails';
  public static GET_ORDER_BY_ID = Links.base + 'adjutant/viewDetailsById'
  public static UPDATE_ORDER = Links.base + 'adjutant/updateAdjutantDetails';
  public static ORDER_STATUS = Links.base + 'adjutant/activeDeactiveStatus';

  public static GET_POP = Links.base + 'api/adjutant_general_instruction/get-pop-list';
  public static ADD_POP = Links.base + 'api/adjutant_general_instruction/add-pop';
  public static GET_POP_BY_ID = Links.base + 'api/adjutant_general_instruction/view-pop';
  public static UPDATE_POP = Links.base + 'api/adjutant_general_instruction/update-pop';
  public static POP_STATUS = Links.base + 'api/adjutant_general_instruction/change-pop-status';

  public static GET_SOP = Links.base + 'api/adjutant_general_instruction/get-sop-list';
  public static ADD_SOP = Links.base + 'api/adjutant_general_instruction/add-sop';
  public static GET_SOP_BY_ID = Links.base + 'api/adjutant_general_instruction/view-sop';
  public static UPDATE_SOP = Links.base + 'api/adjutant_general_instruction/update-sop';
  public static SOP_STATUS = Links.base + 'api/adjutant_general_instruction/change-sop-status';


  public static GET_Reception = Links.base + 'api/adjutant_general_instruction/get-reception-list';
  public static ADD_Reception = Links.base + 'api/adjutant_general_instruction/add-reception';
  public static GET_Reception_BY_ID = Links.base + 'api/adjutant_general_instruction/view-reception'
  public static UPDATE_Reception = Links.base + 'api/adjutant_general_instruction/update-reception';
  public static Reception_STATUS = Links.base + 'api/adjutant_general_instruction/change-reception-status';

  public static GET_SCHEDULE_LIST = Links.base + 'api/adjutant_general_instruction/get-schedule-list';
  public static GET_DRILL_COMP_SCHEDULE_LIST = Links.base + 'api/adjutant_general_instruction/get-schedule-by-type-status';
  public static ADD_SCHEDULE = Links.base + 'api/adjutant_general_instruction/add-schedule';
  public static GET_SCHEDULE_BY_ID = Links.base + 'api/adjutant_general_instruction/view-schedule'
  public static UPDATE_SCHEDULE = Links.base + 'api/adjutant_general_instruction/update-schedule';
  public static SCHEDULE_STATUS = Links.base + 'api/adjutant_general_instruction/change-schedule-status';

  public static ADD_WP_RESULT = Links.base + 'api/training-result/save-cadet-weapon-training-result';
  public static UPDATE_RESULT_WP = Links.base + 'api/training-result/update-cadet-weapon-main-result';

  public static GET_OQ_SUBJECT = Links.base + 'api/oqSubjectDetailsController1/get-all-subject-by-status';
  public static ADD_OQ_SUBJECT = Links.base + 'api/oqSubjectDetailsController1/add-subject';
  public static VIEW_SUBJECT_BY_ID = Links.base + 'api/oqSubjectDetailsController1/get-subject-by-id';
  public static UPDATE_SUBJECT = Links.base + 'api/oqSubjectDetailsController1/update-subject';

  public static GET_OQ_RESULT_CHECK = Links.base + 'api/oqMarkResultController/get-oq-mark-result-check';
  // public static GET_GCAPPT = Links.base + 'api/apptType/getAllAppt';
  public static ADD_OQ_RESULT = Links.base + 'api/oqMarkResultController/add-oqMarkResult';
  public static UPDATE_OQ_RESULT = Links.base + 'api/oqMarkResultController/update-oq-mark-result';




  public static GET_WTT = Links.base + 'api/training-result/get_spotTest_and_wtt_marks_by_term';
  public static ADD_WTT_MARKS = Links.base + 'api/training-result/add_spotTest_and_wtt_marks';
  public static GET_EXAM_WTT = Links.base + 'api/training-result/get_spotTest_and_wtt_marks_by_Status';

  // public static GET_WTT = Links.base + 'api/training-result/get_spotTest_and_wtt_marks_by_Status';

  ///// CAMP SUBJECT  /////
  public static GET_CAMP_SUBJECT = Links.base + 'api/campSubjectDetailsController/get-all-subject-by-status';
  public static ADD_CAMP_SUBJECT = Links.base + 'api/campSubjectDetailsController/add-subject';
  public static UPDATE_CAMP_SUBJECT = Links.base + 'api/campSubjectDetailsController/update-subject';
  public static VIEW_CAMP_SUBJECT_BY_ID = Links.base + 'api/campSubjectDetailsController/get-subject-by-id';

  /** ========  GCs PUNISHMENTS ========= */
  public static GET_LIST_OF_GCS_PUNISHMENTS = Links.base + 'api/cadet/get_all_cadet_by_termId_battalion_company';
  public static GET_GC_BY_IMA_NO = Links.base + 'api/cadet/get_all_cadet_by_search';
  public static ADD_GC_PUNISHMENT = Links.base + 'api/gcspunshmentsController/add_gcspunishments';
  public static GET_GC_PUNISMENTS = Links.base + 'api/gcspunshmentsController/get_gcsPunishmentsList';
  public static UPDATE_GC_PUNISHMENT = Links.base + 'api/gcspunshmentsController/update-gcspunishimnets';




  /** ============ACADEMIC DEPARTMENT================= */
  public static GET_SPORTS = Links.base + 'api/sports-result-controller/get_sports_result_check';
  public static ADD_SPORTS = Links.base + 'api/sports-result-controller/add_sports_result';
  public static UPDATE_SPORTS = Links.base + 'api/sports-result-controller/update-sports_result';

  /**================GENTLEMAN (GC) CADET LINKS============= */
  public static ADD_ENTITLEMENT_FROM_GC = Links.base + 'api/entitle/add-entitle';
  public static GET_ENTITLEMENTS_LIST_BY_TYPE = Links.base + 'api/entitle/get-all-entitle-by-type_cadetId';


  /** ============ACADEMIC DEPARTMENT================= */

  public static UPLOAD_A_FILE = Links.base + 'api/academic_files/add-adcademicFiles';

  //--------- SUBJECTS ------------//
  public static ADD_ACADEMIC_SUBJECT = Links.base + 'add_academic_subject';
  public static GET_ACADEMIC_SUBJECTS_LIST = Links.base + 'get_academic_subject_List';
  public static GET_ACADEMIC_SUBJECT_BY_ID = Links.base + 'get_academic_subject_By_Id';
  public static UPDATE_ACADEMIC_SUBJECT = Links.base + 'update_academic_subject';

  //--------- ACADEMIC Syllabus ------------//
  public static ADD_ACADEMIC_SYLLABUS = Links.base + 'api/acadmic_syllabus_controller/add_academic_syllabus';
  public static GET_ACADEMIC_SYLLABUS_LIST = Links.base + 'api/acadmic_syllabus_controller/get_academic_syllabus_List_by_termid';
  public static GET_ACADEMIC_SYLLABUS_BY_ID = Links.base + 'api/acadmic_syllabus_controller/get_academic_syllabus_By_Id';
  public static UPDATE_ACADEMIC_SYLLABUS = Links.base + 'api/acadmic_syllabus_controller/update_academic_syllabus';
  public static UPDATE_ACADEMIC_SYLLABUS_STATUS = Links.base + 'api/acadmic_syllabus_controller/getall_academic_syllabus_by_status';

  //--------- Cadet Assignment  ------------//
  public static ADD_ACADEMIC_ASSIGNMENT_ANSWER = Links.base + 'add_cadet_assignment_answer';
  public static GET_ACADEMIC_ANSWERS_LIST = Links.base + 'get_academic_Assignment_list_by_paper_type_termId';
  public static GET_ACADEMIC_ANSWER_BY_ID = Links.base + 'get_cadet_assignment_answer_by_id';
  public static UPDATE_ACADEMIC_ANSWER = Links.base + 'update_cadet_assignment_answer';
  public static GET_ACADEMIC_ASSIGNMENT_ANSWERS_LIST = Links.base + 'get_academic_Assignment_list_by_paper_type_termId_serviceId';

  /**------------------- ACADEMIC ASSIGNMENT------------------------------ */
  public static GET_ACADEMIC_ASSIGNMENT = Links.base + 'get_cadet_assignment_answer_by_academic_assignment_id_status';
  public static ADD_ACADEMIC_ASSIGNMENT = Links.base + 'add_academic_assignment';
  public static UPDATE_ACADEMIC_ASSIGNMENT = Links.base + 'update_cadet_assignment_answer';
  public static DELETE_ACADEMIC = Links.base + 'update_academic_assignment';

  /* ---------------------OQ MATRIX-------------------------- */

  public static GET_OQ_MATRIX = Links.base + 'api/academicOqMatrixResultController/get_academic_oq_result_check';
  public static GET_SUBJECTOQMATRIX_LIST = Links.base + 'getAll_by_status';
  public static ADD_OQ_MATRIX = Links.base + 'api/academicOqMatrixResultController/add_academic_oq_mark_result';
  public static UPDATE_OQ_MATRIX = Links.base + 'api/academicOqMatrixResultController/update_academic_oq_mark_result';

  /* ---------------------Leadership Development Matrix-------------------------- */


  public static GET_LD_MATRIX = Links.base + 'api/academic-leadership-matrix-result-controller/get_academic_leadership_matrix_result_check';
  public static GET_SUBJECT_LD_MATRIX_LIST = Links.base + 'get_academic_Leadership_matrix_by_status';
  public static ADD_LD_MATRIX = Links.base + 'api/academic-leadership-matrix-result-controller/add_academic_leadership_matrix_result';
  public static UPDATE_LD_MATRIX = Links.base + 'api/academic-leadership-matrix-result-controller/update-academic_leadership_matrix_result';

  /**------------------------eqtn---------------------------------------------- */
  public static GET_EQTN = Links.base + 'api/trg-eqtn-result-controller/get_trg_eqtn_result_check';
  public static Add_EQTN = Links.base + 'api/trg-eqtn-result-controller/add_trg_eqtn_result';
  public static UPDATE_EQTN = Links.base + 'api/trg-eqtn-result-controller/update-trg_eqtn_result';
  public static GET_EQTN_EDOSSIER_MARKS = Links.base + 'api/trg-eqtn-result-controller/get_ed_trg_eqtn_result_by_service_id';


  /*-----------------------------OQ EQTN---------------------------------------*/
  public static GET_OQEQTN_ALL_LIST = Links.base + 'api/oq_eqnt_result_controller/get_all_cadet_oq_eqtn_result_by_termId_battalion_company';
  public static GET_SEARCH_OQEQTN = Links.base + 'api/oq_eqnt_result_controller/get_all_oq_eqtn_result_by_search';
  public static UPDATE_OQEQTN = Links.base + 'api/oq_eqnt_result_controller/save_bulk_oq_eqtn_result';


  /* ---------------------E-DOSSIER-------------------------- */


  public static E_DOSSIER_UPDATE_INTERACTUAL = Links.base + 'api/intellectual_skills_result_controller/update-intellectualSkills_result';

  public static E_DOSSIER_INTERACTUAL = Links.base + 'api/intellectual_skills_result_controller/get_intellectualSkills_result_by_service_id';
  public static E_DOSSIER_SERVICE_SUBJECT = Links.base + 'api/gso2servicesubjectbmtcontroller/get_bmt1_bmt2_mrprac';

  public static E_DOSSIER_CLUB_DETAILS = Links.base + 'api/eDossierClubController/get_eDossierClubService_by_serviceId';
  public static E_DOSSIER_ADD_CLUB_DETAILS = Links.base + 'api/eDossierClubController/add_EDossierClubService';

  public static E_DOSSIER_UPDATE_CLUB_DETAILS = Links.base + 'api/eDossierClubController/update-eDossierClubService';
  public static E_DOSSIER_UPDATE_HIKE_DETAILS = Links.base + 'api/adventureController/update-Adventure';
  public static E_DOSSIER_UPDATE_LVE_DETAILS = Links.base + 'api/eDossierLveController/update-eDossierLve';
  public static E_DOSSIER_UPDATE_RECORD_DETAILS = Links.base + 'api/recordOfDetentionController/update-RecordOfDetention';

  public static E_DOSSIER_HIKE_DETAILS = Links.base + 'api/adventureController/get_adventure_by_serviceId';
  public static E_DOSSIER_ADD_HIKE_DETAILS = Links.base + 'api/adventureController/add_Adventure';
  public static E_DOSSIER_RECORD_DETAILS = Links.base + 'api/recordOfDetentionController/get_recordOfDetention_by_serviceId';
  public static E_DOSSIER_ADD_RECORD_DETAILS = Links.base + 'api/recordOfDetentionController/add_RecordOfDetention';
  public static E_DOSSIER_LVE_DETAILS = Links.base + 'api/eDossierLveController/get_eDossierLve_by_serviceId';
  public static E_DOSSIER_ADD_LVE_DETAILS = Links.base + 'api/eDossierLveController/add_eDossierLve';

  public static E_DOSSIER_OBSN_DETAILS = Links.base + 'api/ObsnSheet/getAll_ObsnSheet_by_status_and_serviceid';
  public static E_DOSSIER_ADD_OBSN_DETAILS = Links.base + 'api/ObsnSheet/save_ObsnSheet';
  public static E_DOSSIER_COUNS_DETAILS = Links.base + 'api/Counselling/getAll_Counselling_by_status_and_serviceid';
  public static E_DOSSIER_ADD_COUNS_DETAILS = Links.base + 'api/Counselling/save_counselling';

  public static E_DOSSIER_INTERVIEW_DETAILS = Links.base + 'api/edInterviewSheetController/get_edInterviewSheetService_by_serviceId';
  public static E_DOSSIER_ADD_INTERVIEW_DETAILS = Links.base + 'api/edInterviewSheetController/add_edInterviewSheetService';
  public static UPDATE_INTERVIEW = Links.base + 'api/edInterviewSheetController/update-edInterviewSheetService';

  public static E_DOSSIER_INITIAL_INTERVIEW = Links.base + 'api/edInitialInterviewController/get_edInitialInterviewService_by_serviceId';
  public static E_DOSSIER_ADD_INITIAL_INTERVIEW = Links.base + 'api/edInitialInterviewController/add_edInitialInterviewService';
  public static UPDATE_INITIAL_INTERVIEW = Links.base + 'api/edInitialInterviewController/update-edInitialInterviewService';

  public static E_DOSSIER_BEGINING_INTERVIEW = Links.base + 'api/edBeginningInterviewController/get_edBeginningInterviewService_by_serviceId';
  public static E_DOSSIER_ADD_BEGINING_INTERVIEW = Links.base + 'api/edBeginningInterviewController/add_edBeginningInterviewService';
  public static UPDATE_BEGINING_INTERVIEW = Links.base + 'api/edBeginningInterviewController/update-edBeginningInterviewService';

  public static E_DOSSIER_MID_INTERVIEW = Links.base + 'api/edMidInterviewController/get_edMidInterviewService_by_serviceId';
  public static E_DOSSIER_ADD_MID_INTERVIEW = Links.base + 'api/edMidInterviewController/add_edMidInterviewService';
  public static UPDATE_MID_INTERVIEW = Links.base + 'api/edMidInterviewController/update-edMidInterviewService';

  public static E_DOSSIER_SPECIAL_INTERVIEW = Links.base + 'api/edSpecialInterviewController/get_edSpecialInterviewService_by_serviceId';
  public static E_DOSSIER_ADD_SPECIAL_INTERVIEW = Links.base + 'api/edSpecialInterviewController/add_edSpecialInterviewService';
  public static UPDATE_SPECIAL_INTERVIEW = Links.base + 'api/edSpecialInterviewController/update-edSpecialInterviewService';

  public static ADD_MOTIVATION_BADGE = Links.base + 'api/wt_motivation_badge_controller/add_wt_motivation_badge';
  public static GET_MOTIVATION_BADGE = Links.base + 'api/wt_motivation_badge_controller/get_wt_motivation_badge_by_serviceId';
  public static UPDATE_MOTIVATION_BADGE = Links.base + 'api/wt_motivation_badge_controller/update_wt_motivation_badge';



  /* ---------------------E-DOSSIER-MENU-------------------------- */
  public static GET_EDOSSIER_MENU = Links.base + 'api/edossier_menu_controller/get_all_by_status';
  public static GET_EDOSSIER_ASSESSMENTMATRIX = Links.base + 'api/campMarksResultController/get-camp-mark-result-by-service-id';
  public static GET_EDOSSIER_LEADERSHIPMATRIX = Links.base + 'api/academic-leadership-matrix-result-controller/get_ed_leadership_matrix_result_by_serviceid';
  public static E_DOSSIER_DRILL = Links.base + 'api/drillResultController/get-all-drill-result';

  public static GET_EDOSSIER_List = Links.base + 'api/cadet/get_all_cadet_by_termId_battalion_company';
  public static UPDATE_TERM = Links.base + 'api/cadet/update-bulk-cadet-term';

  public static GET_GC_ASSESSMENT = Links.base + 'api/ed_assessment_of_gc/get_ed_assessment_of_gc_by_serviceId_new1';


  //////////////////////
  public static GET_AUTOBIOGRAPHY = Links.base + 'get_auto_biography_by_Id';
  public static ADD_AUTOBIOGRAPHY = Links.base + 'add_auto_biography';
  public static GET_AUTOBIOGRAPHYBYSERVICEID = Links.base + 'get_auto_biography_by_serviceId';
  public static UPDATE_AUTOBIOGRAPHY = Links.base + 'update_auto_biography';


  public static GET_SSBREPORT = Links.base + 'api/edossier_ssb_report_controller/get_edossier_ssb_report_By_Id';
  public static GET_SSBREPORTBYSERVICEID = Links.base + 'api/edossier_ssb_report_controller/get_edossier_ssb_report_By_serviceId';
  public static UPDATE_SSBREPORT = Links.base + 'api/edossier_ssb_report_controller/update_edossier_ssb_report';
  public static ADD_SSBREPORT = Links.base + 'api/edossier_ssb_report_controller/add_edossier_ssb_report';
  public static GET_PERSNOLINFO = Links.base + 'api/cadet/get-cadet-by-serviceId';
  public static GET_WT = Links.base + 'api/training-result/get-cadet-weapon-main-result_by_serviceId';
  public static UPDATE_WT = Links.base + 'api/training-result/update-cadet-weapon-main-result';
  public static GET_MOTIVATION = Links.base + 'api/wt_motivation_badge_controller/get_wt_motivation_badge_by_serviceId';
  public static UPDATE_CADETDETAILS = Links.base + 'api/cadet/update-cadet-by-serviceId';



  /* ---------------------INTELLECTUAL SKILL-------------------------- */
  public static ADD_INTELLECTUALSKILL = Links.base + 'api/intellectual_skills_result_controller/add_intellectualskills_result';
  public static GET_INTELLECTUALSKILL_List = Links.base + 'api/intellectual_skills_result_controller/get_intellectualSkills_result_check';
  public static UPDATE_INTELLECTUALSKILL = Links.base + 'api/intellectual_skills_result_controller/update-intellectualSkills_result';

  /**------------------------ALL CADET EQTN---------------------------------------------- */
  public static GET_ALL_CADET_EQTN = Links.base + 'get_trg_eqtn_by_status';
  public static GET_EQTN_ALL_List = Links.base + 'api/trg-eqtn-result-controller/get_all_cadet_trg_eqtn_result_by_termId_battalion_company';
  public static GET_EQTN_UPDATE = Links.base + 'api/trg-eqtn-result-controller/save_bulk_trg_eqtn_result';
  public static GET_EQTN_SEARCH = Links.base + 'api/trg-eqtn-result-controller/get_all_eqtn_for_excelle_by_search';

  /* ---------------------SPORTS_GAMES CONTROLLER-------------------------- */
  public static GET_SPORTS_GAMES = Links.base + 'get_sports_by_status';
  public static GET_SPORTS_GAMES_LIST = Links.base + 'api/sports-result-controller/get_all_cadet_sports_by_termId_battalion_company';
  public static GET_SPORTS_GAMES_UPDATE_LIST = Links.base + 'api/sports-result-controller/save_bulk_sports_result';
  public static GET_SPORTS_GAMES_SEARCH = Links.base + 'api/sports-result-controller/get_all_academic_leadership_matrix_result_by_search';
  public static GET_SPORTS_EDOSSIER_MARKS = Links.base + 'api/sports-result-controller/get_sports_result_by_service_id';
  public static UPDATE_SPORTS_EDOSSIER_MARKS = Links.base + 'api/sports-result-controller/update-sports_result';


  /*-------------------admin------------------*/
  public static CHANGE_MANAGE_ADMIN_STATUS = Links.base + 'admin/update_admin_status';
  public static GET_MANAGE_ADMIN = Links.base + 'admin/get_all_admin_list';
  public static UPDATE_ADMIN_PASSWORD = Links.base + 'admin/update_admin_passward';

  ////////////
  public static GET_ALL_MODULES = Links.base + 'get_module_List';


  /** =========== DELAY DASHBOARD ========== */
  public static GET_LIST_OF_STAFF = Links.base + 'api/delay-dashboard-controller/get_delay_dashboard_staff';
  public static SET_FINAL_SUBMIT_DATE = Links.base + 'api/delay-dashboard-controller/add_delay_dashboard';
  public static UPDATE_FINAL_SUBMIT_DATE = Links.base + 'api/delay-dashboard-controller/update-delay_dashboard';


  /**========GC INTERVIEW============ */
  public static UPDATE_INTERVIEW_GC = Links.base + 'api/edInterviewSheetController/update-edInterviewSheetService';
  public static UPDATE_INITIAL_INTERVIEW_GC = Links.base + 'api/edInitialInterviewController/update-edInitialInterviewService';
  public static UPDATE_BEGINING_INTERVIEW_GC = Links.base + 'api/edBeginningInterviewController/update-edBeginningInterviewService';
  public static UPDATE_MID_INTERVIEW_GC = Links.base + 'api/edMidInterviewController/update-edMidInterviewService';
  public static UPDATE_SPECIAL_INTERVIEW_GC = Links.base + 'api/edSpecialInterviewController/update-edSpecialInterviewService';





  public static FILEUPLOAD = Links.base + 'api/academic_files/add-adcademicFiles';

}