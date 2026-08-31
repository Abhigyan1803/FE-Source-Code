// import { formatDate } from '@angular/common';
// import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatStepper } from '@angular/material/stepper';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AdminService } from 'app/service/admin/admin.service';
// import { DialogComponent } from 'app/Shared/dialog/dialog.component';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'ms-view-cadet',
//   templateUrl: './view-cadet.component.html',
//   styleUrls: ['./view-cadet.component.scss']
// })
// export class ViewCadetComponent implements OnInit {

//   @ViewChild('stepper', { static: true }) stepper: MatStepper;

//   @ViewChild('govtEmpArmy', { static: true }) govtEmpArmy;
//   @ViewChild('govtEmpNavy', { static: true }) govtEmpNavy;
//   @ViewChild('govtEmpAirForce', { static: true }) govtEmpAirForce;
//   @ViewChild('govtEmpTA', { static: true }) govtEmpTA;
//   @ViewChild('govtEmpCivilGovt', { static: true }) govtEmpCivilGovt;
//   @ViewChild('govtEmpSemiGovt', { static: true }) govtEmpSemiGovt;
//   @ViewChild('govtEmpGovt', { static: true }) govtEmpGovt;

//   @ViewChild('memberOfNCC', { static: true }) memberOfNCC;
//   @ViewChild('memberOfOTU', { static: true }) memberOfOTU;

//   @ViewChild('everTrainedWithIMA', { static: true }) everTrainedWithIMA;
//   @ViewChild('everTrainedWithOTA', { static: true }) everTrainedWithOTA;
//   @ViewChild('everTrainedWithNDA', { static: true }) everTrainedWithNDA;

//   pTitle = "Add Cadet";

//   nationalities: any[] = [];
//   states: any[] = [];
//   religions: any[] = [];
//   casts: any[] = []
//   bloodGroups: any[] = []
//   maritalStatuses: any[] = [];

//   battalions: any[] = [];
//   companies: any[] = [];
//   seasonTerms: any[] = [];
//   terms: any[] = [];

//   localID;
//   currentYear = new Date().getFullYear();
//   maxYear = this.currentYear + 4;
//   maxTodayDate;
//   minDob;
//   maxDob;


//   addCadetForm: FormGroup = new FormGroup({});
//   educationQualificationForm: FormGroup = new FormGroup({});
//   imaAuthorityForm: FormGroup = new FormGroup({});



//   isIndia: boolean = false;

//   isArmy: boolean = false;
//   isNavy: boolean = false;
//   isAirForce: boolean = false;
//   isTA: boolean = false;
//   isCivil: boolean = false;
//   isSemiGovernment: boolean = false;
//   isGovernment: boolean = false;

//   isIMA: boolean = false;
//   isOTA: boolean = false;
//   isNDA: boolean = false;

//   isError: boolean = false;
//   isErrorInEduForm: boolean = false;
//   isErrorAuthorityForm: boolean = false;

//   docArray: any[] = ['', '', '', '', '', '', ''];

//   previewImg;
//   preview10thImg;
//   preview12thImg;
//   previewGraduationImg;
//   previewPostGraduationImg;
//   previewAadharImg;
//   previewPANImg;

//   id: string = '';

//   editPersonalDetails: boolean = true;
//   editContactDetails: boolean = true;
//   editFamilyDetails: boolean = true;
//   editProfessionalDetails: boolean = true;
//   editAcademicDetails: boolean = true;
//   editSportsDetails: boolean = true;
//   editCourseDetails: boolean = true;
//   editSSBDetails: boolean = true;
//   editArivalDetails: boolean = true;
//   editEducationDetails: boolean = true;
//   editDocuments: boolean = true;
//   editAcademyDetails: boolean = true;


//   constructor(private dialog: MatDialog, private service: AdminService,
//     private cdref: ChangeDetectorRef,
//     private spinner: NgxSpinnerService, @Inject(LOCALE_ID) localID: string,
//     private fb: FormBuilder,
//     private router: Router, private route: ActivatedRoute) {
//     this.localID = localID

//     //========= CADET DETAILS FORM ========
//     this.addCadetForm = this.fb.group({
//       courseSerNo: ['', Validators.required],
//       entry: ['', Validators.required],

//       name: ['', Validators.required],

//       upscRollNo: [''],
//       ssbSerNo: [''],
//       ssbBatchNo: [''],
//       chestNo: [''],

//       dob: ['', Validators.required],
//       birthPlace: ['', Validators.required],
//       religion: ['', Validators.required],
//       cast: ['', Validators.required],
//       bloodGroup: ['', Validators.required],
//       nationality: ['', Validators.required],
//       state: ['', Validators.required],
//       identificationMarks: ['', Validators.required],

//       fatherName: ['', Validators.required],

//       address: ['', Validators.required],
//       contactNo: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],

//       fatherProfession: ['', Validators.required],
//       fatherProfessionStatus: [''],
//       parentMonthlyIncome: ['', Validators.required],

//       professionPriorIMA: [''],

//       maritalStatus: ['', Validators.required],

//       isArmy: ['0'],
//       isNavy: ['0'],
//       isAirForce: ['0'],
//       isTA: ['0'],
//       isCivil: ['0'],
//       isSemiGovernment: ['0'],
//       isGovernment: ['0'],

//       govtEmp: [''],

//       memberOfNCC: ['0'],
//       memberOfOTU: ['0'],

//       cadetRank: [''],
//       NCCDate: [''],
//       certObtained: [''],
//       division: [''],
//       trainingPeriod: [''],

//       nameOfNextKinRelation: ['', Validators.required],
//       relationWithKin: ['', Validators.required],
//       addressOfNextKinRelation: ['', Validators.required],

//       sports: [''],
//       sportsLevel: [''],

//       hobies: ['', Validators.required],

//       adharNo: ['', Validators.required],

//       belongsTo: ['', Validators.required],

//       isTrainedWithIMA: ['0'],
//       isTrainedWithOTA: ['0'],
//       isTrainedWithNDA: ['0'],

//       trainingAcademyNo: [''],
//       trainingCourseSerNo: [''],
//       trainingJoiningDate: [''],
//       trainingLeavingDate: [''],
//       reasionOfLeaving: [''],

//       IMA_JoiningDate: ['', Validators.required]

//     })

//     //=============== EDUCATION FORM ===============
//     this.educationQualificationForm = this.fb.group({

//       _10passed: ['10th', Validators.required],
//       _10schoolName: ['', Validators.required],
//       _10passedYear: ['', Validators.required],
//       _10subjects: ['', Validators.required],
//       _10percentage: ['', Validators.required],
//       _10division: ['', Validators.required],
//       _10board: ['', Validators.required],

//       _12passed: ['12th', Validators.required],
//       _12schoolName: ['', Validators.required],
//       _12passedYear: ['', Validators.required],
//       _12subjects: ['', Validators.required],
//       _12percentage: ['', Validators.required],
//       _12division: ['', Validators.required],
//       _12board: ['', Validators.required],

//       gradu_passed: [''],
//       gradu_collName: [''],
//       gradu_passedYear: [''],
//       gradu_subjects: [''],
//       gradu_percentage: [''],
//       gradu_division: [''],
//       gradu_university: [''],

//       post_gradu_passed: [''],
//       post_gradu_collName: [''],
//       post_gradu_passedYear: [''],
//       post_gradu_subjects: [''],
//       post_gradu_percentage: [''],
//       post_gradu_division: [''],
//       post_gradu_university: ['']

//     })
//     //============IMA DETAILS FORM=============
//     this.imaAuthorityForm = this.fb.group({
//       srno: ['', Validators.required],
//       academyNo: ['', Validators.required],

//       username: ['', Validators.required],
//       password: ['', Validators.required],


//       battalion: ['', Validators.required],
//       company: ['', Validators.required],
//       date: ['', Validators.required],

//       seasonTerm: ['', Validators.required],
//       year: [this.currentYear, [Validators.required, Validators.min(this.currentYear), Validators.max(this.currentYear + 4)]],
//       term: ['', Validators.required],
//       course: ['', Validators.required],
//       status: ['1', Validators.required]

//     })



//     //get nationality
//     this.service.getNationalities().subscribe(
//       res => {
//         // console.log(res);
//         if (res.status == 'OK') {
//           this.nationalities = res.object
//           this.cdref.detectChanges();
//         }
//       }
//     )

//     //get religions
//     this.service.getReligions().subscribe(
//       res => {
//         // console.log(res);

//         if (res.status == "OK") {
//           this.religions = res.object
//           this.cdref.detectChanges();
//         }
//       }
//     )

//     //get castes
//     this.service.getCasts().subscribe(
//       res => {

//         // console.log(res);    


//         if (res.status == "OK") {
//           this.casts = res.object;
//           this.cdref.detectChanges();
//         }
//       }
//     )

//     //get blood groups
//     this.service.getBloodGroups().subscribe(
//       res => {
//         // console.log(res);

//         if (res.status == "OK") {
//           this.bloodGroups = res.object;
//           this.cdref.detectChanges();
//         }
//       }
//     )

//     //get merital statuses
//     this.service.getMeritalStatuses().subscribe(
//       res => {
//         // console.log(res);

//         if (res.status == "OK") {
//           this.maritalStatuses = res.object;
//           this.cdref.detectChanges();
//         }
//       }

//     )

//     //get battalions
//     this.service.getBattalionList().subscribe(
//       res => {
//         // console.log(res);

//         if (res.status == 'OK') {
//           this.battalions = res.object
//           this.cdref.detectChanges();

//         } else {
//           alert('Battalions not found.')
//         }

//       }, err => {
//         alert('Cannot find battalions')
//       }
//     )

//     //get season terms
//     this.service.getSeasonTerms().subscribe(
//       res => {
//         if (res.status == "1") {
//           this.seasonTerms = res.List
//           this.cdref.detectChanges();
//         }
//       }
//     )

//     //get all terms
//     this.service.getTerms().subscribe(
//       res => {
//         // console.log(res);

//         if (res.status == "1") {
//           this.terms = res.List
//           this.cdref.detectChanges();
//         }

//       }
//     )

//     this.maxTodayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID);
//     this.minDob = formatDate(new Date().setFullYear(this.currentYear - 18), 'yyyy-MM-dd', this.localID);
//     this.maxDob = formatDate(new Date().setFullYear(this.currentYear - 28), 'yyyy-MM-dd', this.localID);
//   }


//   ngOnInit(): void {
//     if (this.router.url.includes('view-cadet')) {
//       this.spinner.show();

//       this.pTitle = 'View Cadet'
//       this.id = this.route.snapshot.queryParamMap.get('id')
//       if (this.id) {
//         this.service.getACadet(this.id).subscribe(
//           res => {
//             console.log(res);

//             if (res.status == 'OK') {

//               this.editPersonalDetails = false;
//               this.editContactDetails = false;
//               this.editFamilyDetails = false;
//               this.editProfessionalDetails = false;
//               this.editAcademicDetails = false;
//               this.editSportsDetails = false;
//               this.editCourseDetails = false;
//               this.editSSBDetails = false;
//               this.editArivalDetails = false;
//               this.editEducationDetails = false;
//               this.editDocuments = false;
//               this.editAcademyDetails = false;


//               let f = res.object
//               console.log(res);

//               this.previewImg = f.profileImg;
//               this.previewAadharImg = f.adharImg;
//               this.previewPANImg = f.panImg;

//               this.nationalitySelected(f.nationality)

//               this.addCadetForm.patchValue({

//                 courseSerNo: f.courseSerNo,
//                 entry: f.entry,

//                 name: f.name,

//                 upscRollNo: f.upscRollNo,
//                 ssbSerNo: f.ssbSerNo,
//                 ssbBatchNo: f.ssbBatchNo,
//                 chestNo: f.chestNo,

//                 dob: formatDate(f.dob, 'yyyy-MM-dd', this.localID),

//                 birthPlace: f.birthPlace,
//                 religion: f.religion,
//                 cast: f.cast,
//                 bloodGroup: f.bloodGroup,
//                 nationality: f.nationality,
//                 state: f.state,
//                 identificationMarks: f.identificationMarks,

//                 fatherName: f.fatherName,

//                 address: f.address,
//                 contactNo: f.contactNo,
//                 email: f.email,

//                 parentMonthlyIncome: f.parentMonthlyIncome,
//                 professionPriorIMA: f.professionPriorIMA,
//                 maritalStatus: f.maritalStatus,

//                 addressOfNextKinRelation: f.addressOfNextKinRelation,

//                 sports: f.sports,
//                 sportsLevel: f.sportsLevel,

//                 hobies: f.hobies,
//                 adharNo: f.adharNo,

//                 belongsTo: f.belongsTo,

//                 IMA_JoiningDate: f.ima_JoiningDate
//               });

//               if (f.fatherProfession.includes('@')) {
//                 const fProf = f.fatherProfession.split('@')
//                 this.addCadetForm.patchValue({
//                   fatherProfession: fProf[1],
//                   fatherProfessionStatus: fProf[0]
//                 });
//               } else {
//                 this.addCadetForm.patchValue({
//                   fatherProfession: f.fatherProfession,
//                 });
//               }

//               const relativeKin = f.nameOfNextKinRelation.split('-')
//               this.addCadetForm.patchValue({
//                 nameOfNextKinRelation: relativeKin[0],
//                 relationWithKin: relativeKin[1],
//               });

//               if (f.govtEmp) {
//                 if (f.isArmy == 1) {
//                   this.isArmy = true;
//                   this.govtEmpArmy.nativeElement.checked = true;
//                 }
//                 if (f.isNavy == 1) {
//                   this.isNavy = true;
//                   this.govtEmpNavy.nativeElement.checked = true;
//                 }
//                 if (f.isAirForce == 1) {
//                   this.isAirForce = true;
//                   this.govtEmpAirForce.nativeElement.checked = true;
//                 }
//                 if (f.isTA == 1) {
//                   this.isTA = true;
//                   this.govtEmpTA.nativeElement.checked = true;
//                 }
//                 if (f.isCivil == 1) {
//                   this.isCivil = true;
//                   this.govtEmpCivilGovt.nativeElement.checked = true;
//                 }
//                 if (f.isSemiGovernment == 1) {
//                   this.isSemiGovernment = true;
//                   this.govtEmpSemiGovt.nativeElement.checked = true;
//                 }
//                 if (f.isGovernment == 1) {
//                   this.isGovernment = true;
//                   this.govtEmpGovt.nativeElement.checked = true;
//                 }

//                 this.addCadetForm.patchValue({
//                   govtEmp: f.govtEmp
//                 });
//               }

//               if (f.memberOfNCC == 1) {
//                 this.memberOfNCC.nativeElement.checked = true;
//                 this.addCadetForm.patchValue({
//                   memberOfNCC: f.memberOfNCC,
//                   cadetRank: f.cadetRank,
//                   NCCDate: f.nccdate,
//                   certObtained: f.certObtained,
//                   division: f.division,
//                   trainingPeriod: f.trainingPeriod,
//                 });
//               }


//               if (f.memberOfOTU == 1) {
//                 this.memberOfOTU.nativeElement.checked = true;
//                 this.addCadetForm.patchValue({
//                   memberOfOTU: f.memberOfOTU
//                 });
//               }

//               if (f.isTrainedWithIMA == 1 || f.isTrainedWithOTA == 1 || f.isTrainedWithNDA == 1) {

//                 this.addCadetForm.patchValue({

//                   trainingAcademyNo: f.trainingAcademyNo,
//                   trainingCourseSerNo: f.trainingCourseSerNo,
//                   trainingJoiningDate: f.trainingJoiningDate,
//                   trainingLeavingDate: f.trainingLeavingDate,
//                   reasionOfLeaving: f.reasionOfLeaving

//                 })

//                 if (f.isTrainedWithIMA == 1) {
//                   this.addCadetForm.patchValue({
//                     isTrainedWithIMA: f.isTrainedWithIMA
//                   })
//                   this.isIMA = true;
//                   this.everTrainedWithIMA.nativeElement.checked = true;
//                 }

//                 if (f.isTrainedWithOTA == 1) {
//                   this.addCadetForm.patchValue({
//                     isTrainedWithOTA: f.isTrainedWithOTA
//                   })
//                   this.isOTA = true;
//                   this.everTrainedWithOTA.nativeElement.checked = true;
//                 }

//                 if (f.isTrainedWithNDA == 1) {
//                   this.addCadetForm.patchValue({
//                     isTrainedWithNDA: f.isTrainedWithNDA
//                   })
//                   this.isNDA = true;
//                   this.everTrainedWithNDA.nativeElement.checked = true;
//                 }

//               }







//               if (f.cadetEducation[0]) {

//                 this.educationQualificationForm.patchValue({

//                   _10passed: f.cadetEducation[0].examination,
//                   _10schoolName: f.cadetEducation[0].schoolCollege,
//                   _10passedYear: f.cadetEducation[0].year,
//                   _10subjects: f.cadetEducation[0].subjectTaken,
//                   _10percentage: f.cadetEducation[0].percentage,
//                   _10division: f.cadetEducation[0].divisionClass,
//                   _10board: f.cadetEducation[0].university,

//                   _12passed: f.cadetEducation[1].examination,
//                   _12schoolName: f.cadetEducation[1].schoolCollege,
//                   _12passedYear: f.cadetEducation[1].year,
//                   _12subjects: f.cadetEducation[1].subjectTaken,
//                   _12percentage: f.cadetEducation[1].percentage,
//                   _12division: f.cadetEducation[1].divisionClass,
//                   _12board: f.cadetEducation[1].university,

//                 });
//                 this.preview10thImg = f.cadetEducation[0].certImg;

//               }
//               if (f.cadetEducation[1]) {

//                 this.educationQualificationForm.patchValue({

//                   _12passed: f.cadetEducation[1].examination,
//                   _12schoolName: f.cadetEducation[1].schoolCollege,
//                   _12passedYear: f.cadetEducation[1].year,
//                   _12subjects: f.cadetEducation[1].subjectTaken,
//                   _12percentage: f.cadetEducation[1].percentage,
//                   _12division: f.cadetEducation[1].divisionClass,
//                   _12board: f.cadetEducation[1].university,

//                 });
//                 this.preview12thImg = f.cadetEducation[1].certImg;

//               }


//               if (f.cadetEducation[2]) {
//                 this.educationQualificationForm.patchValue({

//                   gradu_passed: f.cadetEducation[2].examination,
//                   gradu_collName: f.cadetEducation[2].schoolCollege,
//                   gradu_passedYear: f.cadetEducation[2].year,
//                   gradu_subjects: f.cadetEducation[2].subjectTaken,
//                   gradu_percentage: f.cadetEducation[2].percentage,
//                   gradu_division: f.cadetEducation[2].divisionClass,
//                   gradu_university: f.cadetEducation[2].university,

//                 });

//                 this.previewGraduationImg = f.cadetEducation[2].certImg;;
//               }

//               if (f.cadetEducation[3]) {

//                 this.educationQualificationForm.patchValue({

//                   post_gradu_passed: f.cadetEducation[3].examination,
//                   post_gradu_collName: f.cadetEducation[3].schoolCollege,
//                   post_gradu_passedYear: f.cadetEducation[3].year,
//                   post_gradu_subjects: f.cadetEducation[3].subjectTaken,
//                   post_gradu_percentage: f.cadetEducation[3].percentage,
//                   post_gradu_division: f.cadetEducation[3].divisionClass,
//                   post_gradu_university: f.cadetEducation[3].university,
//                 });
//                 this.previewPostGraduationImg = f.cadetEducation[3].certImg;;

//               }



//               this.battalionSelected(f.battalian)
//               this.imaAuthorityForm.patchValue({
//                 username: f.username,
//                 password: f.password,
//                 srno: f.serialNo,
//                 academyNo: f.serviceId,
//                 battalion: f.battalian,
//                 company: f.company,
//                 date: f.date,

//                 seasonTerm: f.termSession,
//                 year: f.year,
//                 term: f.term,
//                 course: f.course,
//                 status: f.status
//               });


//               this.spinner.hide();
//             }
//           }
//         )
//       }
//     }

//   }


//   noImg(e: any) {
//     e.target.src = "assets/img/default_cadet_img.jpg"
//   }

//   noDocImg(e: any) {
//     e.target.src = "assets/img/default-doc-image.jpg"
//   }

//   noKeyInput() {
//     return false;
//   }

//   public get b() {
//     return this.addCadetForm.controls;
//   }
//   public get ef() {
//     return this.educationQualificationForm.controls;
//   }
//   public get af() {
//     return this.imaAuthorityForm.controls
//   }

//   nationalitySelected(e: any) {

//     this.addCadetForm.get('state').setValue('')
//     if (e == 'India') {
//       this.spinner.show();
//       this.isIndia = true;

//       this.addCadetForm.get('adharNo').setValue('');

//       this.service.getStates().subscribe(
//         res => {
//           if (res.status == "OK") {

//             this.states = res.object;
//             this.cdref.detectChanges();
//             this.spinner.hide();
//           } else {
//             this.spinner.hide()
//           }
//         },
//         err => {
//           this.spinner.hide()
//           alert('No States Found')
//         }
//       )
//     } else {
//       this.isIndia = false;
//       this.states = [];
//       this.addCadetForm.get('adharNo').setValue('');

//     }

//   }




//   govEmpCheckboxChecked(e: any, type) {
//     if (e.target.checked) {
//       this.addCadetForm.get('govtEmp').setValidators([Validators.required]);
//       this.addCadetForm.get('govtEmp').updateValueAndValidity();

//       if (type == 'Army') {
//         this.isArmy = true;
//         this.addCadetForm.get('isArmy').setValue('1')
//       }
//       if (type == 'Navy') {
//         this.isNavy = true;
//         this.addCadetForm.get('isNavy').setValue('1')
//       }
//       if (type == 'Air Force') {
//         this.isAirForce = true;
//         this.addCadetForm.get('isAirForce').setValue('1')
//       }
//       if (type == 'TA') {
//         this.isTA = true;
//         this.addCadetForm.get('isTA').setValue('1')
//       }
//       if (type == 'Civil Government') {
//         this.isCivil = true;
//         this.addCadetForm.get('isCivil').setValue('1')
//       }
//       if (type == 'Semi Government') {
//         this.isSemiGovernment = true;
//         this.addCadetForm.get('isSemiGovernment').setValue('1')
//       }
//       if (type == 'Government') {
//         this.isGovernment = true;
//         this.addCadetForm.get('isGovernment').setValue('1')
//       }


//     }

//     else {


//       if (type == 'Army') {
//         this.isArmy = false;
//         this.addCadetForm.get('isArmy').setValue('0')
//       }
//       if (type == 'Navy') {
//         this.isNavy = false;
//         this.addCadetForm.get('isNavy').setValue('0')
//       }
//       if (type == 'Air Force') {
//         this.isAirForce = false;
//         this.addCadetForm.get('isAirForce').setValue('0')
//       }
//       if (type == 'TA') {
//         this.isTA = false;
//         this.addCadetForm.get('isTA').setValue('0')
//       }
//       if (type == 'Civil Government') {
//         this.isCivil = false;
//         this.addCadetForm.get('isCivil').setValue('0')
//       }
//       if (type == 'Semi Government') {
//         this.isSemiGovernment = false;
//         this.addCadetForm.get('isSemiGovernment').setValue('0')
//       }
//       if (type == 'Government') {
//         this.isGovernment = false;
//         this.addCadetForm.get('isGovernment').setValue('0')
//       }

//       if (!this.isArmy && !this.isNavy && !this.isAirForce && !this.isTA && !this.isCivil && !this.isSemiGovernment && !this.isGovernment) {
//         this.addCadetForm.get('govtEmp').clearValidators()
//         this.addCadetForm.get('govtEmp').updateValueAndValidity();
//         this.addCadetForm.get('govtEmp').setValue('');
//       }

//     }

//   }



//   memberOfNCC_Checked(e: any) {

//     if (e.target.checked) {

//       this.addCadetForm.patchValue({ memberOfNCC: '1' });

//       this.addCadetForm.get('cadetRank').setValidators([Validators.required]);
//       this.addCadetForm.get('NCCDate').setValidators([Validators.required]);
//       this.addCadetForm.get('certObtained').setValidators([Validators.required]);
//       this.addCadetForm.get('division').setValidators([Validators.required]);
//       this.addCadetForm.get('trainingPeriod').setValidators([Validators.required]);

//       this.addCadetForm.get('cadetRank').updateValueAndValidity();
//       this.addCadetForm.get('NCCDate').updateValueAndValidity();
//       this.addCadetForm.get('certObtained').updateValueAndValidity();
//       this.addCadetForm.get('division').updateValueAndValidity();
//       this.addCadetForm.get('trainingPeriod').updateValueAndValidity();

//     } else {

//       this.addCadetForm.patchValue({ memberOfNCC: '0' });

//       this.addCadetForm.get('cadetRank').clearValidators();
//       this.addCadetForm.get('NCCDate').clearValidators();
//       this.addCadetForm.get('certObtained').clearValidators();
//       this.addCadetForm.get('division').clearValidators();
//       this.addCadetForm.get('trainingPeriod').clearValidators();

//       this.addCadetForm.get('cadetRank').updateValueAndValidity();
//       this.addCadetForm.get('NCCDate').updateValueAndValidity();
//       this.addCadetForm.get('certObtained').updateValueAndValidity();
//       this.addCadetForm.get('division').updateValueAndValidity();
//       this.addCadetForm.get('trainingPeriod').updateValueAndValidity();


//     }

//   }

//   memberOfOTU_Checked(e: any) {
//     if (e.target.checked) {
//       this.addCadetForm.get('memberOfOTU').setValue('1')
//     } else {
//       this.addCadetForm.get('memberOfOTU').setValue('0')
//     }
//   }



//   everTrainedWithIMAOTANDAChecked(e: any, type) {
//     if (e.target.checked) {


//       this.addCadetForm.get('trainingAcademyNo').setValidators([Validators.required]);
//       this.addCadetForm.get('trainingCourseSerNo').setValidators([Validators.required]);
//       this.addCadetForm.get('trainingJoiningDate').setValidators([Validators.required]);
//       this.addCadetForm.get('trainingLeavingDate').setValidators([Validators.required]);
//       this.addCadetForm.get('reasionOfLeaving').setValidators([Validators.required]);

//       this.addCadetForm.get('trainingAcademyNo').updateValueAndValidity();
//       this.addCadetForm.get('trainingCourseSerNo').updateValueAndValidity();
//       this.addCadetForm.get('trainingJoiningDate').updateValueAndValidity();
//       this.addCadetForm.get('trainingLeavingDate').updateValueAndValidity();
//       this.addCadetForm.get('reasionOfLeaving').updateValueAndValidity();


//       if (type == 'IMA') {
//         this.isIMA = true;
//         this.addCadetForm.get('isTrainedWithIMA').setValue('1');
//       }

//       if (type == 'OTA') {
//         this.isOTA = true;
//         this.addCadetForm.get('isTrainedWithOTA').setValue('1');
//       }
//       if (type == 'NDA') {
//         this.isNDA = true;
//         this.addCadetForm.get('isTrainedWithNDA').setValue('1');
//       }

//     } else {
//       if (type == 'IMA') {
//         this.isIMA = false;
//         this.addCadetForm.get('isTrainedWithIMA').setValue('0');
//       }

//       if (type == 'OTA') {
//         this.isOTA = false;
//         this.addCadetForm.get('isTrainedWithOTA').setValue('0');
//       }
//       if (type == 'NDA') {
//         this.isNDA = false;
//         this.addCadetForm.get('isTrainedWithNDA').setValue('0');
//       }



//       if (!this.isIMA && !this.isOTA && !this.isNDA) {

//         this.addCadetForm.get('trainingAcademyNo').clearValidators();
//         this.addCadetForm.get('trainingCourseSerNo').clearValidators();
//         this.addCadetForm.get('trainingJoiningDate').clearValidators();
//         this.addCadetForm.get('trainingLeavingDate').clearValidators();
//         this.addCadetForm.get('reasionOfLeaving').clearValidators();

//         this.addCadetForm.get('trainingAcademyNo').updateValueAndValidity();
//         this.addCadetForm.get('trainingCourseSerNo').updateValueAndValidity();
//         this.addCadetForm.get('trainingJoiningDate').updateValueAndValidity();
//         this.addCadetForm.get('trainingLeavingDate').updateValueAndValidity();
//         this.addCadetForm.get('reasionOfLeaving').updateValueAndValidity();

//       }


//     }
//   }






//   onlyNum(event: any) {
//     const pattern = /^[0-9]*\.?\d{0,2}$/;
//     let inputChar = String.fromCharCode(event.charCode);
//     if (!pattern.test(inputChar)) {
//       event.preventDefault();
//     }
//   }


//   imgSelected(e: any) {
//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {

//       this.docArray[0] = e.target.files[0];

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.previewImg = event.target.result;
//       }
//     }

//   }


//   submitPersonalForm() {
//     if (this.addCadetForm.invalid || !this.previewImg) {
//       console.log(this.addCadetForm.invalid)
//       console.log(this.addCadetForm.value);

//       this.isError = true;
//       this.service.openSnackbar('Please Fill all Required Fields.')

//     } else {
//       this.isError = false;
//       this.stepper.next();
//     }
//   }

//   _10thImgSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {


//       this.docArray[3] = e.target.files[0]

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.preview10thImg = event.target.result;
//       }
//     }
//   }

//   _12thImgSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {


//       this.docArray[4] = e.target.files[0]

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.preview12thImg = event.target.result;
//       }
//     }
//   }

//   graduationImgSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {


//       this.docArray[5] = e.target.files[0]

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.previewGraduationImg = event.target.result;
//       }
//     }

//   }
//   postGraduationImgSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {

//       this.docArray[6] = e.target.files[0]

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.previewPostGraduationImg = event.target.result;
//       }
//     }

//   }

//   aadharCardSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {


//       this.docArray[1] = e.target.files[0];

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.previewAadharImg = event.target.result;
//       }
//     }
//   }


//   panCardSelected(e: any) {

//     const file = e.target.files[0]

//     if (file.size > 5242880) {
//       // this.imgFile.nativeElement.files = this.unSelectedFile;
//       this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
//     } else {

//       this.docArray[2] = e.target.files[0];

//       var reader = new FileReader();
//       reader.readAsDataURL(e.target.files[0]);
//       reader.onload = (event: any) => {
//         this.previewPANImg = event.target.result;
//       }
//     }
//   }

//   submitEducationForm() {
//     if (this.educationQualificationForm.invalid || !this.previewAadharImg || !this.previewPANImg || !this.preview10thImg || !this.preview12thImg) {
//       this.isErrorInEduForm = true;
//       this.service.openSnackbar('Please Fill all Required Fields.')
//     } else {
//       this.stepper.next();
//     }
//   }

//   battalionSelected(e: any) {

//     this.spinner.show();
//     let id
//     this.battalions.find(
//       el => {
//         if (el.shortName == e) {
//           id = el.id
//         }
//       }
//     )

//     this.service.getCompanyList(id).subscribe(
//       res => {
//         if (res.status == 'OK') {
//           this.companies = res.object
//           this.cdref.detectChanges();
//           this.spinner.hide();
//         } else {
//           alert('Companies not found.')
//           this.spinner.hide()
//         }
//       },
//       err => {
//         alert('Cannot find companies.')
//         this.spinner.hide();
//       }
//     )

//   }

//   goBack() {
//     this.router.navigate(['/main/admin/trg-battalion/gc-database']);
//   }

//   openImg(img) {
//     console.log(img);
//     this.dialog.open(DialogComponent, {
//       width: '1300px', height: '650px',
//       data: {
//         type: 'img', title: '', url: img
//       }
//     })
//   }

//   removeDocument(type) {
//     if (type == "aadhar") {
//       this.docArray[1] = ""
//       this.previewAadharImg = ""
//     }
//     if (type == "pan") {
//       this.docArray[2] = ""
//       this.previewPANImg = ""
//     }
//     if (type == "10") {
//       this.docArray[3] = ""
//       this.preview10thImg = ""
//     }
//     if (type == "12") {
//       this.docArray[4] = ""
//       this.preview12thImg = ""
//     }
//     if (type == "grad") {
//       this.docArray[5] = ""
//       this.previewGraduationImg = ""
//     }
//     if (type == "postGrad") {
//       this.docArray[6] = ""
//       this.previewPostGraduationImg = ""
//     }

//   }



//   addCadet() {
//     if (this.imaAuthorityForm.invalid || !this.docArray[0] || !this.docArray[1] || !this.docArray[2] || !this.docArray[3] || !this.docArray[4]) {
//       this.isErrorAuthorityForm = true;
//       this.service.openSnackbar('Please Fill all Required Fields and Choose Required Document Images.');
//     } else {
//       this.spinner.show()
//       this.service.addCadet(this.docArray, this.addCadetForm.value, this.educationQualificationForm.value, this.imaAuthorityForm.value).subscribe(
//         res => {
//           if (res.status == 'OK') {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//             this.router.navigate(['/main/admin/trg-battalion/gc-database']);
//           } else {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message)
//           }
//         },
//         err => {
//           this.spinner.hide()
//           console.log(JSON.stringify(err));

//           this.service.openSnackbar('Some Error Occured.')
//         }
//       )
//     }
//   }




//   updatePersonalDetails() {

//     if (!this.previewImg || !this.addCadetForm.value.name || !this.addCadetForm.value.dob || !this.addCadetForm.value.birthPlace
//       || !this.addCadetForm.value.religion || !this.addCadetForm.value.cast || !this.addCadetForm.value.bloodGroup
//       || !this.addCadetForm.value.nationality || !this.addCadetForm.value.state || !this.addCadetForm.value.maritalStatus
//       || !this.addCadetForm.value.hobies || !this.addCadetForm.value.adharNo
//     ) {
//       this.isError = true
//       this.service.openSnackbar('Please Fill All Required Details')
//     } else {

//       this.spinner.show();
//       this.service.updateCadetPersonalDetails(this.id, this.docArray, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editPersonalDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )

//     }


//   }

//   updateContactDetails() {

//     if (!this.b.belongsTo.value || !this.b.address.value || !this.b.contactNo.value || !this.b.email.value) {
//       this.isError = true
//       this.service.openSnackbar("Required Fields Should Not Be Blank")
//     } else {
//       this.spinner.show();
//       this.service.updateCadetContactDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editContactDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }

//   }

//   updateFamilyDetails() {

//     if (!this.b.fatherName.value || !this.b.fatherProfession.value || !this.b.nameOfNextKinRelation.value
//       || !this.b.relationWithKin.value || !this.b.addressOfNextKinRelation.value) {
//       this.isError = true;
//       this.service.openSnackbar("Required Fields Should Not Be Blank")
//     }
//     else {
//       this.spinner.show()
//       this.service.updateCadetFamilyDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editFamilyDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }


//   }

//   updateProfessionalDetails() {

//     if (!this.b.professionPriorIMA.value || this.b.govtEmp.errors) {
//       this.isError = true;
//       this.service.openSnackbar("Please Provide Details");
//     } else {
//       this.spinner.show();
//       this.service.updateCadetProfessionalDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editProfessionalDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }
//   }

//   updateAcademicDetails() {

//     if (this.b.cadetRank.errors || this.b.NCCDate.errors || this.b.certObtained.errors || this.b.division.errors || this.b.trainingPeriod.errors
//       || this.b.trainingAcademyNo.errors || this.b.trainingCourseSerNo.errors || this.b.trainingJoiningDate.errors || this.b.trainingLeavingDate.errors || this.b.reasionOfLeaving.errors) {
//       this.isError = true;
//       this.service.openSnackbar("Please Provide Details");
//     } else {
//       this.spinner.show();
//       this.service.updateCadetAcademicDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editAcademicDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }
//   }

//   updateSportsDetails() {

//     if (!this.b.sports.value && !this.b.sportsLevel.value) {
//       this.service.openSnackbar("Please Provide Details")
//     } else {
//       this.spinner.show()
//       this.service.updateCadetSportsDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editSportsDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }
//   }

//   updateCourseDetails() {

//     if (this.b.courseSerNo.errors || this.b.entry.errors) {
//       this.isError = true;
//       this.service.openSnackbar("Required Fields Should Not Be Blank")
//     } else {
//       this.spinner.show();
//       this.service.updateCadetCourseDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editCourseDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }
//   }

//   updateSSBDetails() {

//     if (this.b.upscRollNo.errors || this.b.ssbSerNo.errors || this.b.ssbBatchNo.errors || this.b.chestNo.errors) {
//       this.isError = true;
//       this.service.openSnackbar("Required Fields Should Not Be Blank");
//     } else {
//       this.spinner.show();
//       this.service.updateCadetSSBDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editSSBDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }

//   }

//   updateArivalDetails() {
//     /**
//      * IMA_JoiningDate
//      */
//     if (this.b.IMA_JoiningDate.errors) {
//       this.isError = true;
//       this.service.openSnackbar("Required Fields Should Not Be Blank")
//     } else {
//       this.spinner.show();
//       this.service.updateCadetArrivalDetails(this.id, this.addCadetForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editArivalDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )
//     }
//   }




//   updateEducationDetails() {
//     if (this.educationQualificationForm.invalid) {
//       this.service.openSnackbar("Please Fill All Required Educational Details")
//       this.isErrorInEduForm = true;
//     } else {

//       this.spinner.show();
//       this.service.updateCadetEducationalDetails(this.id, this.educationQualificationForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editEducationDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )

//     }


//   }

//   updateDocuments() {

//     this.spinner.show();
//     this.service.updateDocuments(this.id, this.docArray).subscribe(
//       res => {
//         if (res.status == "OK") {
//           this.spinner.hide()
//           this.service.openSnackbar(res.message);
//           this.editDocuments = false;
//           this.cdref.detectChanges();
//         } else {
//           this.spinner.hide();
//           this.service.openSnackbar(res.message);
//         }
//       },
//       err => {
//         this.spinner.hide()
//         this.service.openSnackbar("Some Error Occured.");
//       }
//     )

//   }

//   update_IMA_Authority_Details() {

//     if (this.imaAuthorityForm.invalid) {
//       this.service.openSnackbar("Please Fill All Required Educational Details")
//       this.isErrorInEduForm = true;
//     } else {

//       this.spinner.show();
//       this.service.updateCadetEducationalDetails(this.id, this.imaAuthorityForm.value).subscribe(
//         res => {
//           if (res.status == "OK") {
//             this.spinner.hide()
//             this.service.openSnackbar(res.message);
//             this.editAcademyDetails = false;
//             this.cdref.detectChanges();
//           } else {
//             this.spinner.hide();
//             this.service.openSnackbar(res.message);
//           }
//         },
//         err => {
//           this.spinner.hide()
//           this.service.openSnackbar("Some Error Occured.");
//         }
//       )

//     }

//   }









//   updateCadet() {
//     if (this.imaAuthorityForm.invalid || !this.previewImg || !this.previewAadharImg || !this.previewPANImg || !this.preview10thImg || !this.preview12thImg) {
//       this.isErrorAuthorityForm = true;
//       this.service.openSnackbar('Please Fill all Required Fields and Choose Required Documents and Images.');

//     } else {
//       this.spinner.show()
//       this.service.updateCadet(this.id, this.docArray, this.addCadetForm.value, this.educationQualificationForm.value, this.imaAuthorityForm.value).subscribe(
//         res => {
//           if (res.status == 'OK') {
//             this.spinner.hide();
//             this.service.openSnackbarTime(res.message, 5000);
//             this.router.navigate(['/main/admin/trg-battalion/gc-database']);
//           } else {
//             this.spinner.hide()
//             this.service.openSnackbarTime(res.message, 5000)
//           }
//         },
//         err => {
//           this.spinner.hide()
//           console.log(JSON.stringify(err));

//           this.service.openSnackbarTime('Some Error Occured.', 5000)
//         }
//       )
//     }
//   }


// }
