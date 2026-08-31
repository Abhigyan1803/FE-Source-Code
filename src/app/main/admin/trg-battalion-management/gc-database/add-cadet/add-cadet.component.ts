import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-cadet',
  templateUrl: './add-cadet.component.html',
  styleUrls: ['./add-cadet.component.scss']
})
export class AddCadetComponent implements OnInit {
  userDetails: any;

  count: number = 0;

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  @ViewChild('religionSelect', { static: true }) religionSelect;

  @ViewChild('govtEmpArmy', { static: true }) govtEmpArmy;
  @ViewChild('govtEmpNavy', { static: true }) govtEmpNavy;
  @ViewChild('govtEmpAirForce', { static: true }) govtEmpAirForce;
  @ViewChild('govtEmpTA', { static: true }) govtEmpTA;
  @ViewChild('govtEmpCivilGovt', { static: true }) govtEmpCivilGovt;
  @ViewChild('govtEmpSemiGovt', { static: true }) govtEmpSemiGovt;
  @ViewChild('govtEmpGovt', { static: true }) govtEmpGovt;

  @ViewChild('memberOfNCC', { static: true }) memberOfNCC;
  @ViewChild('memberOfOTU', { static: true }) memberOfOTU;

  @ViewChild('everTrainedWithIMA', { static: true }) everTrainedWithIMA;
  @ViewChild('everTrainedWithOTA', { static: true }) everTrainedWithOTA;
  @ViewChild('everTrainedWithNDA', { static: true }) everTrainedWithNDA;

  @ViewChild('imaArrivalDate', { static: true }) imaArrivalDate;
  @ViewChild('imaArrivalHours', { static: true }) imaArrivalHours;
  @ViewChild('imaArrivalMinutes', { static: true }) imaArrivalMinutes;



  arHours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  arMinutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];


  pTitle: string = "Add Cadet";

  schoolings: string[] = ["RIMC", "Mil School", "Sainik School", "KV", "APS", "Army School", "Convent School (any bd - CBSE/ISCE/State etc)", "CBSE (Non Convent)", "ICSE (Non Convent)", "State Board", "Other"]
  graduations: string[] = ["B.A", "B.Sc", "B.Tech", "BE", "BCA", "BBA", "B.Com."]
  postGraduations: string[] = ["M.A", "M.Sc", "M.Tech", "ME", "MCA", "MBA", "M.Com"]
  streamsXII: string[] = [];
  streams: string[] = ["Humanities/Mgt", "Science", "Technical", "Commerce", "Other"];


  nationalities: any[] = [];
  states: any[] = [];
  religions: any[] = [];
  casts: any[] = []
  bloodGroups: any[] = []
  maritalStatuses: any[] = [];

  schoolOrgs: any[] = [];
  sainikShools: any[] = [];
  X_SainikSchool: boolean = false;
  XII_SainikSchool: boolean = false


  battalions: any[] = [];
  companies: any[] = [];
  seasonTerms: any[] = [];
  terms: any[] = [];

  localID;
  currentYear = new Date().getFullYear();
  maxYear = this.currentYear + 4;
  maxTodayDate;
  minDob;
  maxDob;


  addCadetForm: FormGroup = new FormGroup({});
  educationQualificationForm: FormGroup = new FormGroup({});
  imaAuthorityForm: FormGroup = new FormGroup({});

  oReligion: boolean = false;
  isIndia: boolean = false;

  isArmy: boolean = false;
  isNavy: boolean = false;
  isAirForce: boolean = false;
  isTA: boolean = false;
  isCivil: boolean = false;
  isSemiGovernment: boolean = false;
  isGovernment: boolean = false;

  isIMA: boolean = false;
  isOTA: boolean = false;
  isNDA: boolean = false;

  isError: boolean = false;
  isErrorInEduForm: boolean = false;
  isErrorAuthorityForm: boolean = false;

  docArray: any[] = ['', '', '', '', '', '', ''];

  previewImg;
  profileImg: File;
  preview10thImg;
  tenthImg;
  preview12thImg;
  twelfthImg;
  previewGraduationImg;
  graduationImg
  previewPostGraduationImg;
  postGraduationImg
  previewAadharImg;
  aadharImg;
  previewPANImg;
  panImg;

  id: string = '';

  editPersonalDetails: boolean = true;
  editContactDetails: boolean = true;
  editFamilyDetails: boolean = true;
  editProfessionalDetails: boolean = true;
  editAcademicDetails: boolean = true;
  editSportsDetails: boolean = true;
  editCourseDetails: boolean = true;
  editSSBDetails: boolean = true;
  editArivalDetails: boolean = true;
  editCommissioningDetails: boolean = true;
  editEducationDetails: boolean = true;
  editDocuments: boolean = true;
  editAcademyDetails: boolean = true;
  editVaccinationDetails: boolean = true;
  bnDetails: any;
  coyDetails: any;
  ter: any = [{
    id: 1, name: 'term1'
  },
  { id: 7, name: 'tech II' }
  ];


  constructor(private dialog: MatDialog, private service: AdminService,
    private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService, @Inject(LOCALE_ID) localID: string,
    private fb: FormBuilder, private el: ElementRef,
    private router: Router, private route: ActivatedRoute) {
    this.localID = localID

    //========= CADET DETAILS FORM ========
    this.addCadetForm = this.fb.group({
      courseSerNo: ['', Validators.required],
      entry: ['', Validators.required],

      name: ['', [Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],

      upscRollNo: [''],
      ssbSerNo: [''],
      ssbBatchNo: [''],
      chestNo: [''],

      dob: ['', Validators.required],
      birthPlace: ['', [Validators.required]],
      religion: ['', Validators.required],
      cast: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationality: ['', Validators.required],
      state: ['', [Validators.required]],
      identificationMarks: ['', [Validators.required]],

      motheTongue: ['', [Validators.required]],

      foreignLanguages: this.fb.array([this.getALanguage()]),

      fatherName: ['', [Validators.required]],

      addressLine1: ['', Validators.required],
      addressLine2: [''],
      village: [''],
      tehsil: [''],
      postOffice: [''],
      city: ['', [Validators.required]],
      district: [''],
      AddressState: ['', Validators.required],
      pincode: ['', [Validators.required]],

      contactNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      familiDetailsId: [''],
      fatherProfession: ['', Validators.required],
      fatherProfessionDetails: [''],
      fatherProfessionStatus: ['', Validators.required],
      fatherProfessionIAFRankType: [''],
      fatherProfessionIAFUnit: [''],
      fatherProfessionIAFChoceOfArms: [''],
      fatherProfessionIAFType: [''],
      fatherProfessionIAFRank: [''],

      parentMonthlyIncome: ['', Validators.required],

      professionalDetails: this.fb.array([this.getAProfessionalDetail()]),

      maritalStatus: ['', Validators.required],

      isArmy: ['0'],
      isNavy: ['0'],
      isAirForce: ['0'],
      isTA: ['0'],
      isCivil: ['0'],
      isSemiGovernment: ['0'],
      isGovernment: ['0'],

      govtEmp: [''],

      memberOfNCC: ['0'],
      memberOfOTU: ['0'],

      cadetRank: [''],
      NCCDate: [''],
      certObtained: [''],
      division: [''],
      trainingPeriod: [''],

      nameOfNextKinRelation: ['', [Validators.required]],
      relationWithKin: ['', [Validators.required]],
      addressOfNextKinRelation: ['', Validators.required],

      sports: [''],
      sportsLevel: [''],

      hobies: ['', [Validators.required]],

      adharNo: ['', [Validators.required]],

      belongsTo: ['', Validators.required],

      isTrainedWithIMA: ['0'],
      isTrainedWithOTA: ['0'],
      isTrainedWithNDA: ['0'],

      trainingAcademyNo: [''],
      trainingCourseSerNo: [''],
      trainingJoiningDate: [''],
      trainingLeavingDate: [''],
      reasionOfLeaving: [''],

      arrivingDateTime: this.fb.group({
        date: ['', Validators.required],
        hours: ['', Validators.required],
        minutes: ['', Validators.required]
      }),

      IMA_JoiningDate: ['', Validators.required],

      commissioningDetailsId: [''],
      commissioningDetailsIC_Number: [''],
      commissioningDetailsunit_Posted_To: [''],
      commissioningDetailschoice_of_Arms: [''],
      commissioningDetailsdate_of_Commissioning: [''],


    })

    //=============== EDUCATION FORM ===============
    this.educationQualificationForm = this.fb.group({

      _10passed: ['10th', Validators.required],
      _10schoolName: ['', Validators.required],
      _10passedYear: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      _10subjects: ['', [Validators.required]],
      _10percentage: ['', Validators.required],
      _10division: ['', [Validators.required]],
      _10board: ['', Validators.required],

      _12passed: ['12th', Validators.required],
      _12schoolName: ['', Validators.required],
      _12passedYear: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      _12subjects: ['', [Validators.required]],
      _12percentage: ['', Validators.required],
      _12division: ['', [Validators.required]],
      _12board: ['', Validators.required],

      gradu_passed: [''],
      gradu_collName: [''],
      gradu_passedYear: ['', Validators.pattern("^[0-9]*$")],
      gradu_subjects: [''],
      gradu_percentage: [''],
      gradu_division: ['', Validators.pattern("^[0-9]*$")],
      gradu_university: [''],

      post_gradu_passed: [''],
      post_gradu_collName: [''],
      post_gradu_passedYear: ['', Validators.pattern("^[0-9]*$")],
      post_gradu_subjects: [''],
      post_gradu_percentage: [''],
      post_gradu_division: ['', Validators.pattern("^[0-9]*$")],
      post_gradu_university: [''],

      graduationMarksheet: [''],
      postGraduationMarksheet: [''],
    })

    //============IMA DETAILS FORM=============
    this.imaAuthorityForm = this.fb.group({
      srno: ['', Validators.required],
      academyNo: ['', Validators.required],
      serviceId: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      battalion: ['', Validators.required],
      company: ['', Validators.required],
      date: ['', Validators.required],
      miscellaneous: [''],
      //{value:(this.addCadetForm.value.entry=='DE'?1:7)}

      seasonTerm: ['', Validators.required],
      year: [this.currentYear, [Validators.required]],
      term: ['', Validators.required],
      course: ['', Validators.required],
      status: ['1', Validators.required],

      vaccinationDetailsId: [''],
      vaccineName: ['', Validators.required],
      IstDoseRefferenceId: ['', Validators.required],
      IstDoseDate: ['', Validators.required],
      IIndDoseDate: [''],
      IIndDoseRefferenceId: [''],

    })



    //get nationality
    this.service.getNationalities().subscribe(
      res => {
        // console.log(res);
        if (res.status == 'OK') {
          this.nationalities = res.object
          this.cdref.detectChanges();
        }
      }
    )

    //get religions
    this.service.getReligions().subscribe(
      res => {
        // console.log(res);

        if (res.status == "OK") {
          this.religions = res.object
          this.cdref.detectChanges();
        }
      }
    )

    //get castes
    this.service.getCasts().subscribe(
      res => {

        // console.log(res);    


        if (res.status == "OK") {
          this.casts = res.object;
          this.cdref.detectChanges();
        }
      }
    )

    //get blood groups
    this.service.getBloodGroups().subscribe(
      res => {
        // console.log(res);
        if (res.status == "OK") {
          this.bloodGroups = res.object;
          this.cdref.detectChanges();
        }
      }
    )

    //get merital statuses
    this.service.getMeritalStatuses().subscribe(
      res => {
        // console.log(res);

        if (res.status == "OK") {
          this.maritalStatuses = res.object;
          this.cdref.detectChanges();
        }
      }

    )

    //get battalions
    this.service.getBattalionList().subscribe(
      res => {
        // console.log("BATTALIONS: ",res);

        if (res.status == 'OK') {
          this.battalions = res.object
          if (this.userDetails.battalion) {
            this.af.battalion.setValue(this.userDetails.battalion.shortName)
            this.bnDetails = this.userDetails.battalion
            this.battalionSelected(this.bnDetails.shortName)
            if (this.userDetails.company) {
              this.af.company.setValue(this.userDetails.company.name)
              this.coyDetails = this.userDetails.company
            }
          }
          this.cdref.detectChanges();

        } else {
          //    alert('Battalions not found.')
        }

      }, err => {
        //  alert('Cannot find battalions')
      }
    )

    //get season terms
    this.service.getSeasonTerms().subscribe(
      res => {
        if (res.status == "1") {
          this.seasonTerms = res.List
          this.cdref.detectChanges();
        }
      }
    )

    //get all terms
    this.service.getTerms().subscribe(
      res => {
        // console.log(res);

        if (res.status == "1") {
          this.terms = res.List;





          this.cdref.detectChanges();
        }

      }
    )


    this.service.getSchoolOrgList().subscribe(
      res => {
        // console.log("SCHOOLS ORGS",res);
        if (res.status == "OK")
          this.schoolOrgs = res.object;
        this.cdref.detectChanges();
      }
    )

    this.service.getSainikSchoolList().subscribe(
      res => {
        // console.log("SAINIK SCHOOLS: ",res);
        if (res.status == "OK") {
          this.sainikShools = res.object
          this.cdref.detectChanges();
        }
      }
    )

    this.maxTodayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID);
    this.minDob = formatDate(new Date().setFullYear(this.currentYear - 18), 'yyyy-MM-dd', this.localID);
    this.maxDob = formatDate(new Date().setFullYear(this.currentYear - 28), 'yyyy-MM-dd', this.localID);

console.log('swap',this.minDob,this.maxDob);

    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
    // console.log("USER DETAILS: ",this.userDetails);





  }





  ngOnInit(): void {


    this.onPersonalFormFatherProfessionChanges();
    this.arrivingValueChanges();
  }

  ngAfterViewInit() {
    if (this.router.url.includes('view-cadet')) {
      this.viewCadet();
    }
  }



  //ima arriving date and time

  public get arriving() {
    return this.b.arrivingDateTime as FormGroup;
  }

  arrivingValueChanges() {
    this.b.arrivingDateTime.valueChanges.subscribe(
      val => {
        // console.log("CHANGED VALUES: ",val);

        if (this.arriving.valid) {
          // console.log("Form is Valid");

          this.imaArrivingDate = new Date(val.date);
          this.imaArrivingDate.setHours(val.hours)
          this.imaArrivingDate.setMinutes(val.minutes)

          // console.log(this.imaArrivingDate);
          this.addCadetForm.patchValue({
            IMA_JoiningDate: formatDate(this.imaArrivingDate, 'yyyy-MM-dd HH:mm:ss', this.localID)
          })
          // console.log(this.b.IMA_JoiningDate.value);

        } else {
          // console.log("Form is Invalid");

        }

      }
    )
  }

  //father profession value change
  onPersonalFormFatherProfessionChanges() {
    this.b.fatherProfession.valueChanges.subscribe(val => {
      // console.log(val);
      if (val == 'Indian Armed Forces') {

        this.b.fatherProfessionIAFRankType.setValidators([Validators.required]);
        this.b.fatherProfessionIAFUnit.setValidators([Validators.required]);
        this.b.fatherProfessionIAFChoceOfArms.setValidators([Validators.required]);
        this.b.fatherProfessionIAFType.setValidators([Validators.required]);
        this.b.fatherProfessionIAFRank.setValidators([Validators.required]);

        this.b.fatherProfessionIAFRankType.updateValueAndValidity();
        this.b.fatherProfessionIAFUnit.updateValueAndValidity();
        this.b.fatherProfessionIAFChoceOfArms.updateValueAndValidity();
        this.b.fatherProfessionIAFType.updateValueAndValidity();
        this.b.fatherProfessionIAFRank.updateValueAndValidity();

        this.b.fatherProfessionStatus.setValue('');
        this.b.fatherProfessionDetails.setValue('');


        this.b.fatherProfessionDetails.clearValidators();
        this.b.fatherProfessionDetails.updateValueAndValidity();


      } else {

        this.b.fatherProfessionDetails.setValidators([Validators.required]);
        this.b.fatherProfessionDetails.updateValueAndValidity();


        this.b.fatherProfessionIAFRankType.clearValidators();
        this.b.fatherProfessionIAFUnit.clearValidators();
        this.b.fatherProfessionIAFChoceOfArms.clearValidators();
        this.b.fatherProfessionIAFType.clearValidators();
        this.b.fatherProfessionIAFRank.clearValidators();


        this.b.fatherProfessionIAFRankType.setValue('');
        this.b.fatherProfessionIAFUnit.setValue('');
        this.b.fatherProfessionIAFChoceOfArms.setValue('');
        this.b.fatherProfessionIAFType.setValue('');
        this.b.fatherProfessionIAFRank.setValue('');

        this.b.fatherProfessionStatus.setValue('');

        this.b.fatherProfessionIAFRankType.updateValueAndValidity();
        this.b.fatherProfessionIAFUnit.updateValueAndValidity();
        this.b.fatherProfessionIAFChoceOfArms.updateValueAndValidity();
        this.b.fatherProfessionIAFType.updateValueAndValidity();
        this.b.fatherProfessionIAFRank.updateValueAndValidity();

      }
    })

  }

  viewCadet() {

    this.spinner.show();

    this.pTitle = 'View Cadet';
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.service.getACadet(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {

            this.editPersonalDetails = false;
            this.editContactDetails = false;
            this.editFamilyDetails = false;
            this.editProfessionalDetails = false;
            this.editAcademicDetails = false;
            this.editSportsDetails = false;
            this.editCourseDetails = false;
            this.editSSBDetails = false;
            this.editArivalDetails = false;
            this.editCommissioningDetails = false;
            this.editEducationDetails = false;
            this.editDocuments = false;
            this.editAcademyDetails = false;
            this.editVaccinationDetails = false;

            let f = res.object
            console.log(f, 'image_object');



            this.previewImg = f.profileImg;
            this.previewAadharImg = f.adharImg;
            this.previewPANImg = f.panImg;

            this.nationalitySelected(f.nationality)


            let findReligion = this.religions.find(
              el => {
                if (el.name == f.religion) {
                  console.log(el.name);
                  return true;
                } else {
                  return false
                }
              }
            )

            if (findReligion) {
              this.religionSelect.nativeElement.value = f.religion;
            } else {
              this.oReligion = true;
              this.religionSelect.nativeElement.value = 'Others';
            }











            this.addCadetForm.patchValue({

              courseSerNo: f.courseSerNo,
              entry: f.entry,

              name: f.name,

              upscRollNo: f.upscRollNo,
              ssbSerNo: f.ssbSerNo,
              ssbBatchNo: f.ssbBatchNo,
              chestNo: f.chestNo,

              dob: formatDate(f.dob, 'yyyy-MM-dd', this.localID),

              birthPlace: f.birthPlace,

              religion: f.religion,

              cast: f.cast,
              bloodGroup: f.bloodGroup,
              nationality: f.nationality,
              state: f.state,
              identificationMarks: f.identificationMarks,
              motheTongue: f.motheTongue,



              addressLine1: f.addressLine1,
              addressLine2: f.addressLine2,
              village: f.village,
              tehsil: f.tehsil,
              postOffice: f.postOffice,
              city: f.city,
              district: f.district,
              AddressState: f.addressState,
              pincode: f.pincode,

              contactNo: f.contactNo,
              email: f.email,

              familiDetailsId: f.familyDetails.id,
              fatherName: f.familyDetails.fatherName,

              parentMonthlyIncome: f.familyDetails.monthlyIncome,
              fatherProfession: f.familyDetails.father_profession,
              fatherProfessionDetails: f.familyDetails.furnishDetail,
              fatherProfessionStatus: f.familyDetails.currentStatus,
              fatherProfessionIAFRankType: f.familyDetails.rankType,
              fatherProfessionIAFUnit: f.familyDetails.unit,

              fatherProfessionIAFChoceOfArms: f.familyDetails.choiceofArms,
              fatherProfessionIAFType: f.familyDetails.armedForce,

              fatherProfessionIAFRank: f.familyDetails.rankName,


              nameOfNextKinRelation: f.familyDetails.name_of_next_of_kin_showing_rel,
              relationWithKin: f.familyDetails.relation,
              addressOfNextKinRelation: f.familyDetails.address_of_next_of_kin_showing_rel,




              // professionPriorIMA: f.professionPriorIMA,


              maritalStatus: f.maritalStatus,


              sports: f.sports,
              sportsLevel: f.sportsLevel,

              hobies: f.hobies,
              adharNo: f.adharNo,

              belongsTo: f.belongsTo,


              commissioningDetailsId: f.commissioningDetails.id,
              commissioningDetailsIC_Number: f.commissioningDetails.ic_Number,
              commissioningDetailsunit_Posted_To: f.commissioningDetails.unit_Posted_To,
              commissioningDetailschoice_of_Arms: f.commissioningDetails.choice_of_Arms,
              commissioningDetailsdate_of_Commissioning: formatDate(f.commissioningDetails.date_of_Commissioning, 'yyyy-MM-dd', this.localID),

            });

            this.arriving.controls.date.setValue(formatDate(f.ima_JoiningDate, 'yyyy-MM-dd', this.localID))
            this.arriving.controls.hours.setValue(formatDate(f.ima_JoiningDate, 'HH', this.localID))
            this.arriving.controls.minutes.setValue(formatDate(f.ima_JoiningDate, 'mm', this.localID))

            // this.imaArrivalDate.nativeElement.value = formatDate(f.ima_JoiningDate, 'yyyy-MM-dd', this.localID)
            // this.arrivalDateSelected(f.ima_JoiningDate)

            // this.imaArrivalHours.nativeElement.value = formatDate(f.ima_JoiningDate, 'HH', this.localID)
            // this.arrivalHoursSelected(this.imaArrivalHours.nativeElement.value)

            // this.imaArrivalMinutes.nativeElement.value = formatDate(f.ima_JoiningDate, 'mm', this.localID)
            // this.arrivalMinutesSelected(this.imaArrivalMinutes.nativeElement.value)




            /**=======FOREIGN LANGUAGES========== */
            if (f.foreignLanguages.length > 1) {
              for (let i = 1; i <= f.foreignLanguages.length - 1; i++) {
                this.addAForeignLanguage();
              }
            }
            this.addCadetForm.patchValue({
              foreignLanguages: f.foreignLanguages
            })
            /**==================================== */





            /**===========PROFESSIONAL DETAILS========= */
            if (f.professionalDetails.length >= 1) {

              this.professions.clear()

              for (let i = 0; i <= f.professionalDetails.length - 1; i++) {

                this.professions.push(

                  this.fb.group({
                    id: f.professionalDetails[i].id,
                    profession: f.professionalDetails[i].profession,
                    dateOfResignation: formatDate(f.professionalDetails[i].dateofResignation, 'yyyy-MM-dd', this.localID),
                    companyName: f.professionalDetails[i].companyName,
                    duration: f.professionalDetails[i].duration
                  })

                );

              }

              // console.log(this.professions);

              this.addCadetForm.patchValue({
                professionalDetails: this.professions.value
              })

            }

            /**========================================= */


            if (f.govtEmp) {
              if (f.isArmy == 1) {
                this.isArmy = true;
                this.govtEmpArmy.nativeElement.checked = true;
              }
              if (f.isNavy == 1) {
                this.isNavy = true;
                this.govtEmpNavy.nativeElement.checked = true;
              }
              if (f.isAirForce == 1) {
                this.isAirForce = true;
                this.govtEmpAirForce.nativeElement.checked = true;
              }
              if (f.isTA == 1) {
                this.isTA = true;
                this.govtEmpTA.nativeElement.checked = true;
              }
              if (f.isCivil == 1) {
                this.isCivil = true;
                this.govtEmpCivilGovt.nativeElement.checked = true;
              }
              if (f.isSemiGovernment == 1) {
                this.isSemiGovernment = true;
                this.govtEmpSemiGovt.nativeElement.checked = true;
              }
              if (f.isGovernment == 1) {
                this.isGovernment = true;
                this.govtEmpGovt.nativeElement.checked = true;
              }

              this.addCadetForm.patchValue({
                govtEmp: f.govtEmp
              });
            }

            if (f.memberOfNCC == 1) {
              this.memberOfNCC.nativeElement.checked = true;
              this.addCadetForm.patchValue({
                memberOfNCC: f.memberOfNCC,
                cadetRank: f.cadetRank,
                NCCDate: formatDate(f.nccdate, "yyyy-MM-dd", this.localID),
                certObtained: f.certObtained,
                division: f.division,
                trainingPeriod: f.trainingPeriod,
              });
            }


            if (f.memberOfOTU == 1) {
              this.memberOfOTU.nativeElement.checked = true;
              this.addCadetForm.patchValue({
                memberOfOTU: f.memberOfOTU
              });
            }

            if (f.isTrainedWithIMA == 1 || f.isTrainedWithOTA == 1 || f.isTrainedWithNDA == 1) {

              this.addCadetForm.patchValue({

                trainingAcademyNo: f.trainingAcademyNo,
                trainingCourseSerNo: f.trainingCourseSerNo,
                trainingJoiningDate: formatDate(f.trainingJoiningDate, "yyyy-MM-dd", this.localID),
                trainingLeavingDate: formatDate(f.trainingLeavingDate, "yyyy-MM-dd", this.localID),
                reasionOfLeaving: f.reasionOfLeaving

              })

              if (f.isTrainedWithIMA == 1) {
                this.addCadetForm.patchValue({
                  isTrainedWithIMA: f.isTrainedWithIMA
                })
                this.isIMA = true;
                this.everTrainedWithIMA.nativeElement.checked = true;
              }

              if (f.isTrainedWithOTA == 1) {
                this.addCadetForm.patchValue({
                  isTrainedWithOTA: f.isTrainedWithOTA
                })
                this.isOTA = true;
                this.everTrainedWithOTA.nativeElement.checked = true;
              }

              if (f.isTrainedWithNDA == 1) {
                this.addCadetForm.patchValue({
                  isTrainedWithNDA: f.isTrainedWithNDA
                })
                this.isNDA = true;
                this.everTrainedWithNDA.nativeElement.checked = true;
              }

            }







            if (f.cadetEducation[0]) {

              this.educationQualificationForm.patchValue({

                _10passed: f.cadetEducation[0].examination,
                _10schoolName: f.cadetEducation[0].schoolCollege,
                _10passedYear: f.cadetEducation[0].year,
                _10subjects: f.cadetEducation[0].subjectTaken,
                _10percentage: f.cadetEducation[0].percentage,
                _10division: f.cadetEducation[0].divisionClass,
                _10board: f.cadetEducation[0].university,

                _12passed: f.cadetEducation[1].examination,
                _12schoolName: f.cadetEducation[1].schoolCollege,
                _12passedYear: f.cadetEducation[1].year,
                _12subjects: f.cadetEducation[1].subjectTaken,
                _12percentage: f.cadetEducation[1].percentage,
                _12division: f.cadetEducation[1].divisionClass,
                _12board: f.cadetEducation[1].university,

              });

              this.preview10thImg = f.cadetEducation[0].certImg;

            }
            if (f.cadetEducation[1]) {

              this.educationQualificationForm.patchValue({

                _12passed: f.cadetEducation[1].examination,
                _12schoolName: f.cadetEducation[1].schoolCollege,
                _12passedYear: f.cadetEducation[1].year,
                _12subjects: f.cadetEducation[1].subjectTaken,
                _12percentage: f.cadetEducation[1].percentage,
                _12division: f.cadetEducation[1].divisionClass,
                _12board: f.cadetEducation[1].university,

              });
              this.preview12thImg = f.cadetEducation[1].certImg;

            }


            if (f.cadetEducation[2]) {
              this.educationQualificationForm.patchValue({

                gradu_passed: f.cadetEducation[2].examination,
                gradu_collName: f.cadetEducation[2].schoolCollege,
                gradu_passedYear: f.cadetEducation[2].year,
                gradu_subjects: f.cadetEducation[2].subjectTaken,
                gradu_percentage: f.cadetEducation[2].percentage,
                gradu_division: f.cadetEducation[2].divisionClass,
                gradu_university: f.cadetEducation[2].university,

              });

              this.previewGraduationImg = f.cadetEducation[2].certImg;;
            }

            if (f.cadetEducation[3]) {

              this.educationQualificationForm.patchValue({

                post_gradu_passed: f.cadetEducation[3].examination,
                post_gradu_collName: f.cadetEducation[3].schoolCollege,
                post_gradu_passedYear: f.cadetEducation[3].year,
                post_gradu_subjects: f.cadetEducation[3].subjectTaken,
                post_gradu_percentage: f.cadetEducation[3].percentage,
                post_gradu_division: f.cadetEducation[3].divisionClass,
                post_gradu_university: f.cadetEducation[3].university,
              });
              this.previewPostGraduationImg = f.cadetEducation[3].certImg;;

            }

            this.battalionSelected(f.battalian)

            this.imaAuthorityForm.patchValue({
              username: f.username,
              password: f.password,
              srno: f.serialNo,
              academyNo: f.academyNo,
              serviceId: f.serviceId,
              battalion: f.battalian,
              company: f.company,
              date: formatDate(f.createdAt, "yyyy-MM-dd", this.localID),

              seasonTerm: f.termSession,
              year: f.year,
              term: f.term,
              course: f.course,
              status: f.status,
              miscellaneous: f.miscellaneous,

              vaccinationDetailsId: f.vaccinationDetails.id,
              vaccineName: f.vaccinationDetails.nameOfVaccine,
              IstDoseRefferenceId: f.vaccinationDetails.fistDoseReferenceId,
              IstDoseDate: formatDate(f.vaccinationDetails.dateOfFistDose, 'yyyy-MM-dd', this.localID),
              IIndDoseDate: formatDate(f.vaccinationDetails.dateOfSecDose, 'yyyy-MM-dd', this.localID),
              IIndDoseRefferenceId: f.vaccinationDetails.secDoseReferenceId

            });
            this.imaAuthorityForm.get('password').clearValidators();
            this.imaAuthorityForm.get('password').updateValueAndValidity();

            this.spinner.hide();
          }
        }
      )
    }

    this.cdref.detectChanges()

  }

  X_schoolOrgSelected(e) {
    // console.log(e);
    if (e == "Sainik School") {
      this.X_SainikSchool = true;
    } else {
      this.X_SainikSchool = false;
    }


  }
  XII_schoolOrgSelected(e) {
    // console.log(e);
    if (e == "Sainik School") {
      this.XII_SainikSchool = true;
    } else {
      this.XII_SainikSchool = false;
    }

  }
  /**=======LANGUAGES====== */
  getALanguage() {
    return this.fb.group({
      id: [''],
      language: [''],
      qualification: [''],
      university: [''],
      proRead: [false],
      proWrite: [false],
      proSpeak: [false],
      status: ['1']
    })
  }

  get getForeignLanguages() {
    return this.addCadetForm.get('foreignLanguages') as FormArray;
  }
  addAForeignLanguage() {
    this.getForeignLanguages.push(this.getALanguage());
  }
  removeAForeignLanguage(i) {
    this.getForeignLanguages.removeAt(i)
  }

  /**==========PROFESSIONAL DETAILS=============== */

  getAProfessionalDetail() {
    return this.fb.group({
      id: [''],
      profession: [''],
      dateOfResignation: [''],
      companyName: [''],
      duration: ['']
    })
  }
  get professions() {
    return this.addCadetForm.get('professionalDetails') as FormArray;
  }
  addProfessionalDetail() {
    this.professions.push(this.getAProfessionalDetail());
  }
  removeAProfessionalDetail(i) {
    this.professions.removeAt(i);
  }

  /** ============================================= */


  noImg(e: any) {
    // e.target.src = "assets/img/default_cadet_img.jpg"
    e.target.src = "assets/img/cadet-default-img.png"
  }

  /** ============================ */
  //for religion 

  religionSelected(e: any) {
    if (e == "Others") {
      // alert('a')
      this.oReligion = true;
      this.b.religion.setValue('');
    } else {
      // alert('b')
      this.oReligion = false;
      this.b.religion.setValue(e)
    }
  }
  /**================================= */











  noDocImg(e: any) {
    e.target.src = "assets/img/default-doc-image.jpg"
  }

  noKeyInput() {
    return false;
  }

  public get b() {
    //console.log(this.addCadetForm.controls['birthPlace']);

    return this.addCadetForm.controls;
  }
  public get ef() {
    return this.educationQualificationForm.controls;
  }
  public get af() {
    return this.imaAuthorityForm.controls
  }


  nationalitySelected(e: any) {

    this.addCadetForm.get('state').setValue('')
    if (e == 'India') {
      this.spinner.show();
      this.isIndia = true;

      this.addCadetForm.get('adharNo').setValue('');

      this.service.getStates().subscribe(
        res => {
          if (res.status == "OK") {

            this.states = res.object;
            this.cdref.detectChanges();
            this.spinner.hide();
          } else {
            this.spinner.hide()
          }
        },
        err => {
          this.spinner.hide()
          // alert('No States Found')
        }
      )
    } else {
      this.isIndia = false;
      this.states = [];
      this.addCadetForm.get('adharNo').setValue('');

    }

  }




  govEmpCheckboxChecked(e: any, type) {
    if (e.target.checked) {

      this.addCadetForm.get('govtEmp').setValidators([Validators.required]);
      this.addCadetForm.get('govtEmp').updateValueAndValidity();

      if (type == 'Army') {
        this.isArmy = true;
        this.addCadetForm.get('isArmy').setValue('1')
      }
      if (type == 'Navy') {
        this.isNavy = true;
        this.addCadetForm.get('isNavy').setValue('1')
      }
      if (type == 'Air Force') {
        this.isAirForce = true;
        this.addCadetForm.get('isAirForce').setValue('1')
      }




      if (type == 'TA') {
        this.isTA = true;
        this.addCadetForm.get('isTA').setValue('1')
      }
      if (type == 'Civil Government') {
        this.isCivil = true;
        this.addCadetForm.get('isCivil').setValue('1')
      }
      if (type == 'Semi Government') {
        this.isSemiGovernment = true;
        this.addCadetForm.get('isSemiGovernment').setValue('1')
      }
      if (type == 'Government') {
        this.isGovernment = true;
        this.addCadetForm.get('isGovernment').setValue('1')
      }


    }

    else {


      if (type == 'Army') {
        this.isArmy = false;
        this.addCadetForm.get('isArmy').setValue('0')
      }
      if (type == 'Navy') {
        this.isNavy = false;
        this.addCadetForm.get('isNavy').setValue('0')
      }
      if (type == 'Air Force') {
        this.isAirForce = false;
        this.addCadetForm.get('isAirForce').setValue('0')
      }
      if (type == 'TA') {
        this.isTA = false;
        this.addCadetForm.get('isTA').setValue('0')
      }
      if (type == 'Civil Government') {
        this.isCivil = false;
        this.addCadetForm.get('isCivil').setValue('0')
      }
      if (type == 'Semi Government') {
        this.isSemiGovernment = false;
        this.addCadetForm.get('isSemiGovernment').setValue('0')
      }
      if (type == 'Government') {
        this.isGovernment = false;
        this.addCadetForm.get('isGovernment').setValue('0')
      }

      if (!this.isArmy && !this.isNavy && !this.isAirForce && !this.isTA && !this.isCivil && !this.isSemiGovernment && !this.isGovernment) {
        this.addCadetForm.get('govtEmp').clearValidators()
        this.addCadetForm.get('govtEmp').updateValueAndValidity();
        this.addCadetForm.get('govtEmp').setValue('');
      }

    }

  }



  memberOfNCC_Checked(e: any) {

    if (e.target.checked) {

      this.addCadetForm.patchValue({ memberOfNCC: '1' });

      this.addCadetForm.get('cadetRank').setValidators([Validators.required]);
      this.addCadetForm.get('NCCDate').setValidators([Validators.required]);
      this.addCadetForm.get('certObtained').setValidators([Validators.required]);
      this.addCadetForm.get('division').setValidators([Validators.required]);
      this.addCadetForm.get('trainingPeriod').setValidators([Validators.required]);

      this.addCadetForm.get('cadetRank').updateValueAndValidity();
      this.addCadetForm.get('NCCDate').updateValueAndValidity();
      this.addCadetForm.get('certObtained').updateValueAndValidity();
      this.addCadetForm.get('division').updateValueAndValidity();
      this.addCadetForm.get('trainingPeriod').updateValueAndValidity();

    } else {

      this.addCadetForm.patchValue({ memberOfNCC: '0' });

      this.addCadetForm.get('cadetRank').clearValidators();
      this.addCadetForm.get('NCCDate').clearValidators();
      this.addCadetForm.get('certObtained').clearValidators();
      this.addCadetForm.get('division').clearValidators();
      this.addCadetForm.get('trainingPeriod').clearValidators();

      this.addCadetForm.get('cadetRank').updateValueAndValidity();
      this.addCadetForm.get('NCCDate').updateValueAndValidity();
      this.addCadetForm.get('certObtained').updateValueAndValidity();
      this.addCadetForm.get('division').updateValueAndValidity();
      this.addCadetForm.get('trainingPeriod').updateValueAndValidity();


    }

  }

  memberOfOTU_Checked(e: any) {
    if (e.target.checked) {
      this.addCadetForm.get('memberOfOTU').setValue('1')
    } else {
      this.addCadetForm.get('memberOfOTU').setValue('0')
    }
  }



  everTrainedWithIMAOTANDAChecked(e: any, type) {
    if (e.target.checked) {


      this.addCadetForm.get('trainingAcademyNo').setValidators([Validators.required]);
      this.addCadetForm.get('trainingCourseSerNo').setValidators([Validators.required]);
      this.addCadetForm.get('trainingJoiningDate').setValidators([Validators.required]);
      this.addCadetForm.get('trainingLeavingDate').setValidators([Validators.required]);
      this.addCadetForm.get('reasionOfLeaving').setValidators([Validators.required]);

      this.addCadetForm.get('trainingAcademyNo').updateValueAndValidity();
      this.addCadetForm.get('trainingCourseSerNo').updateValueAndValidity();
      this.addCadetForm.get('trainingJoiningDate').updateValueAndValidity();
      this.addCadetForm.get('trainingLeavingDate').updateValueAndValidity();
      this.addCadetForm.get('reasionOfLeaving').updateValueAndValidity();


      if (type == 'IMA') {
        this.isIMA = true;
        this.addCadetForm.get('isTrainedWithIMA').setValue('1');
      }

      if (type == 'OTA') {
        this.isOTA = true;
        this.addCadetForm.get('isTrainedWithOTA').setValue('1');
      }
      if (type == 'NDA') {
        this.isNDA = true;
        this.addCadetForm.get('isTrainedWithNDA').setValue('1');
      }

    } else {
      if (type == 'IMA') {
        this.isIMA = false;
        this.addCadetForm.get('isTrainedWithIMA').setValue('0');
      }

      if (type == 'OTA') {
        this.isOTA = false;
        this.addCadetForm.get('isTrainedWithOTA').setValue('0');
      }
      if (type == 'NDA') {
        this.isNDA = false;
        this.addCadetForm.get('isTrainedWithNDA').setValue('0');
      }

      if (!this.isIMA && !this.isOTA && !this.isNDA) {

        this.addCadetForm.get('trainingAcademyNo').clearValidators();
        this.addCadetForm.get('trainingCourseSerNo').clearValidators();
        this.addCadetForm.get('trainingJoiningDate').clearValidators();
        this.addCadetForm.get('trainingLeavingDate').clearValidators();
        this.addCadetForm.get('reasionOfLeaving').clearValidators();

        this.addCadetForm.get('trainingAcademyNo').updateValueAndValidity();
        this.addCadetForm.get('trainingCourseSerNo').updateValueAndValidity();
        this.addCadetForm.get('trainingJoiningDate').updateValueAndValidity();
        this.addCadetForm.get('trainingLeavingDate').updateValueAndValidity();
        this.addCadetForm.get('reasionOfLeaving').updateValueAndValidity();

      }


    }
  }


  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  imgSelected(e: any) {
    const file = e.target.files[0]

    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {

      this.docArray[0] = e.target.files[0];
      this.profileImg = e.target.files[0];
      console.log(this.profileImg, 'here it is')
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewImg = event.target.result;
        // this.profileImg=this.previewImg.split('data:image/jpeg;base64,')[1];
      }
    }

  }

  /** IMA ARRIVAL DATE AND TIME */

  imaArrivingDate: Date;
  arrivalDateSelected(e: any) {
    // console.log(e);

    this.imaArrivingDate = new Date(e);
    this.imaArrivingDate.setHours(0)
    this.imaArrivingDate.setMinutes(0)
    // console.log(this.imaArrivingDate);
    this.addCadetForm.patchValue({
      IMA_JoiningDate: formatDate(this.imaArrivingDate, 'yyyy-MM-dd HH:mm:ss', this.localID)
    })
  }

  arrivalHoursSelected(e: any) {
    // this.imaArrivingDate = this.imaArrivingDate +" "+e+":"
    this.imaArrivingDate.setHours(e)
    this.addCadetForm.patchValue({
      IMA_JoiningDate: formatDate(this.imaArrivingDate, 'yyyy-MM-dd HH:mm:ss', this.localID)
    })
    // console.log(this.imaArrivingDate);
  }

  arrivalMinutesSelected(e: any) {
    // this.imaArrivingDate = this.imaArrivingDate+e+":00"
    this.imaArrivingDate.setMinutes(e)
    // console.log(this.imaArrivingDate);

    this.addCadetForm.patchValue({
      IMA_JoiningDate: formatDate(this.imaArrivingDate, 'yyyy-MM-dd HH:mm:ss', this.localID)
    })

  }


  submitPersonalForm() {
    // alert("start")
    console.log(this.addCadetForm)
    console.log(this.previewImg)
    // this.stepper.next();
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', this.addCadetForm.value);
    if (this.addCadetForm.invalid) {
      console.log(this.addCadetForm.invalid)
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', this.addCadetForm.value);

      this.isError = true;
      for (const key of Object.keys(this.addCadetForm.controls)) {
        if (this.addCadetForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.service.openSnackbar('Please Fill all Required Fields.')

    } else {
      this.isError = false;
      this.stepper.next();
    }
  }



  graduationSelected(gr) {

    // console.log(gr);
    if (gr) {

      this.ef.gradu_passed.setValidators([Validators.required]);
      this.ef.gradu_collName.setValidators([Validators.required]);
      this.ef.gradu_passedYear.setValidators([Validators.required]);
      this.ef.gradu_subjects.setValidators([Validators.required]);
      this.ef.gradu_percentage.setValidators([Validators.required]);
      this.ef.gradu_division.setValidators([Validators.required]);
      this.ef.gradu_university.setValidators([Validators.required]);
      this.ef.graduationMarksheet.setValidators([Validators.required]);

      this.ef.gradu_passed.updateValueAndValidity();
      this.ef.gradu_collName.updateValueAndValidity();
      this.ef.gradu_passedYear.updateValueAndValidity();
      this.ef.gradu_subjects.updateValueAndValidity();
      this.ef.gradu_percentage.updateValueAndValidity();
      this.ef.gradu_division.updateValueAndValidity();
      this.ef.gradu_university.updateValueAndValidity();
      this.ef.graduationMarksheet.updateValueAndValidity();




    } else {


      this.ef.gradu_passed.clearValidators();
      this.ef.gradu_collName.clearValidators();
      this.ef.gradu_passedYear.clearValidators();
      this.ef.gradu_subjects.clearValidators();
      this.ef.gradu_percentage.clearValidators();
      this.ef.gradu_division.clearValidators();
      this.ef.gradu_university.clearValidators();
      this.ef.graduationMarksheet.clearValidators();

      this.ef.gradu_passed.updateValueAndValidity();
      this.ef.gradu_collName.updateValueAndValidity();
      this.ef.gradu_passedYear.updateValueAndValidity();
      this.ef.gradu_subjects.updateValueAndValidity();
      this.ef.gradu_percentage.updateValueAndValidity();
      this.ef.gradu_division.updateValueAndValidity();
      this.ef.gradu_university.updateValueAndValidity();
      this.ef.graduationMarksheet.updateValueAndValidity();


    }

  }


  postGraduationSelected(pg) {

    // console.log(pg);
    if (pg) {

      this.ef.post_gradu_passed.setValidators([Validators.required]);
      this.ef.post_gradu_collName.setValidators([Validators.required]);
      this.ef.post_gradu_passedYear.setValidators([Validators.required]);
      this.ef.post_gradu_subjects.setValidators([Validators.required]);
      this.ef.post_gradu_percentage.setValidators([Validators.required]);
      this.ef.post_gradu_division.setValidators([Validators.required]);
      this.ef.post_gradu_university.setValidators([Validators.required]);
      this.ef.postGraduationMarksheet.setValidators([Validators.required]);

      this.ef.post_gradu_passed.updateValueAndValidity();
      this.ef.post_gradu_collName.updateValueAndValidity();
      this.ef.post_gradu_passedYear.updateValueAndValidity();
      this.ef.post_gradu_subjects.updateValueAndValidity();
      this.ef.post_gradu_percentage.updateValueAndValidity();
      this.ef.post_gradu_division.updateValueAndValidity();
      this.ef.post_gradu_university.updateValueAndValidity();
      this.ef.postGraduationMarksheet.updateValueAndValidity();




    } else {


      this.ef.post_gradu_passed.clearValidators();
      this.ef.post_gradu_collName.clearValidators();
      this.ef.post_gradu_passedYear.clearValidators();
      this.ef.post_gradu_subjects.clearValidators();
      this.ef.post_gradu_percentage.clearValidators();
      this.ef.post_gradu_division.clearValidators();
      this.ef.post_gradu_university.clearValidators();
      this.ef.postGraduationMarksheet.clearValidators();

      this.ef.post_gradu_passed.updateValueAndValidity();
      this.ef.post_gradu_collName.updateValueAndValidity();
      this.ef.post_gradu_passedYear.updateValueAndValidity();
      this.ef.post_gradu_subjects.updateValueAndValidity();
      this.ef.post_gradu_percentage.updateValueAndValidity();
      this.ef.post_gradu_division.updateValueAndValidity();
      this.ef.post_gradu_university.updateValueAndValidity();
      this.ef.postGraduationMarksheet.updateValueAndValidity();


    }

  }



  _10thImgSelected(e: any) {
    const file = e.target.files[0];
    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {

      this.docArray[3] = e.target.files[0]
      this.tenthImg = e.target.files[0]

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.preview10thImg = event.target.result;
        // this.tenthImg=this.preview10thImg.split('data:image/jpeg;base64,')[1];
      }
    }
  }

  _12thImgSelected(e: any) {
    const file = e.target.files[0]
    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docArray[4] = e.target.files[0]
      this.twelfthImg = e.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.preview12thImg = event.target.result;
        //   this.twelfthImg =this.preview12thImg.split('data:image/jpeg;base64,')[1];
      }
    }
  }

  graduationImgSelected(e: any) {
    const file = e.target.files[0]
    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docArray[5] = e.target.files[0]
      this.graduationImg = e.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewGraduationImg = event.target.result;
        // this.graduationImg =this.previewGraduationImg.split('data:image/jpeg;base64,')[1];
      }
      this.ef.graduationMarksheet.setValue('1');

    }
  }

  postGraduationImgSelected(e: any) {

    const file = e.target.files[0]

    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docArray[6] = e.target.files[0];
      this.postGraduationImg = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewPostGraduationImg = event.target.result;
        // this.postGraduationImg=this.previewPostGraduationImg.split('data:image/jpeg;base64,')[1];
      }
      this.ef.postGraduationMarksheet.setValue('1');
    }
  }

  aadharCardSelected(e: any) {

    //alert('adhar')
    const file = e.target.files[0]
    console.log(file, 'helloImage')
    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {

      this.docArray[1] = e.target.files[0];
      this.aadharImg = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewAadharImg = event.target.result;
        // this.aadharImg=this.previewAadharImg.split('data:image/jpeg;base64,')[1];
      }
    }
  }


  panCardSelected(e: any) {

    const file = e.target.files[0]

    if (file.size > 5242880) {
      // this.imgFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {

      this.docArray[2] = e.target.files[0];
      this.panImg = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewPANImg = event.target.result;
        // this.panImg =this.previewPANImg.split('data:image/jpeg;base64,')[1];
      }
    }
  }



  submitEducationForm() {
    if (this.educationQualificationForm.invalid) {
      this.isErrorInEduForm = true;
      this.service.openSnackbar('Please Fill all Required Fields.')
    } else {
      this.stepper.next();
    }
  }

  battalionSelected(bn: any) {
    this.af.company.setValue('')
   
    // this.spinner.show();
    console.log("Battalions: ", this.battalions);

    let id;
    this.battalions.find(
      el => {
        if (el.shortName == bn) {
          // console.log("ELEMENTS: ",el);          
          id = el.id;
        }
      }
    )
    this.service.getCompanyList(id).subscribe(
      res => {
        if (res.status == 'OK') {
          this.companies = res.object
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          // alert('Companies not found.')
          this.spinner.hide()
        }
      },
      err => {
        // alert('Cannot find companies.')
        this.spinner.hide();
      }
    )

  }

  goBack() {
    if (this.router.url.includes('/main/admin/trg-battalion/gc-database')) {
      this.router.navigate(['/main/admin/trg-battalion/gc-database']);
    } else if (this.router.url.includes('/main/trg-battalion/gc-database')) {
      this.router.navigate(['/main/trg-battalion/gc-database'])
    }
  }

  openImg(img) {
    // console.log(img);
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'img', title: '', url: img
      }
    })
  }



  removeDocument(type) {
    if (type == "aadhar") {
      this.docArray[1] = ""
      this.previewAadharImg = ""
    }
    if (type == "pan") {
      this.docArray[2] = ""
      this.previewPANImg = ""
    }
    if (type == "10") {
      this.docArray[3] = ""
      this.preview10thImg = ""
    }
    if (type == "12") {
      this.docArray[4] = ""
      this.preview12thImg = ""
    }
    if (type == "grad") {
      this.docArray[5] = ""
      this.previewGraduationImg = ""
    }
    if (type == "postGrad") {
      this.docArray[6] = ""
      this.previewPostGraduationImg = ""
    }

  }



  addCadet() {
    if (this.imaAuthorityForm.invalid) {
      this.isErrorAuthorityForm = true;
      this.service.openSnackbar('Please Fill all Required Fields.');
    } else {
      this.spinner.show()
      this.service.addCadet(this.docArray, this.addCadetForm.value, this.educationQualificationForm.value, this.imaAuthorityForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
            this.goBack();
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          console.log(JSON.stringify(err));

          this.service.openSnackbar('Some Error Occured.')
        }
      )
    }
  }




  updatePersonalDetails() {
    this.isError = false;
    
    if (!this.previewImg || !this.addCadetForm.value.name || !this.addCadetForm.value.dob || !this.addCadetForm.value.birthPlace
      || !this.addCadetForm.value.religion || !this.addCadetForm.value.cast || !this.addCadetForm.value.bloodGroup
      || !this.addCadetForm.value.nationality || !this.addCadetForm.value.state || !this.addCadetForm.value.maritalStatus
      || !this.addCadetForm.value.hobies || !this.addCadetForm.value.adharNo
    ) {
      
      this.isError = true
      this.service.openSnackbar('Please Fill All Required Details')
    } else {

      this.spinner.show();
      this.service.updateCadetPersonalDetails(this.id, this.docArray, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editPersonalDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )

    }


  }

  updateContactDetails() {
    this.isError = false;
    if (!this.b.belongsTo.value || !this.b.addressLine1.value ||
      !this.b.city.value || !this.b.AddressState.value || !this.b.pincode.value ||
      !this.b.contactNo.value || !this.b.email.value) {
      this.isError = true
      // alert(this.b.postOffice.value)
      this.service.openSnackbar("Required Fields Should Not Be Blank")
      // alert('contact')
    } else {
      this.spinner.show();
      this.service.updateCadetContactDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editContactDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }

  }

  updateFamilyDetails() {
    this.isError = false;
    if (!this.b.fatherName.value || !this.b.fatherProfession.value || !this.b.nameOfNextKinRelation.value
      || !this.b.relationWithKin.value || !this.b.addressOfNextKinRelation.value) {
      this.isError = true;
      this.service.openSnackbar("Required Fields Should Not Be Blank")
    }
    else {
      this.spinner.show()
      this.service.updateCadetFamilyDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editFamilyDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }


  }

  updateProfessionalDetails() {
    this.isError = false;
    if (this.b.govtEmp.errors) {
      this.isError = true;
      this.service.openSnackbar("Please Provide Details");
    } else {
      this.spinner.show();
      this.service.updateCadetProfessionalDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editProfessionalDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }
  }

  userN: any;
  keyupfor(e) {

    // alert(e.target.value)
    this.userN = e.target.value;

  }



  updateAcademicDetails() {
    this.isError = false;
    if (this.b.cadetRank.errors || this.b.NCCDate.errors || this.b.certObtained.errors || this.b.division.errors || this.b.trainingPeriod.errors
      || this.b.trainingAcademyNo.errors || this.b.trainingCourseSerNo.errors || this.b.trainingJoiningDate.errors || this.b.trainingLeavingDate.errors || this.b.reasionOfLeaving.errors) {
      this.isError = true;
      this.service.openSnackbar("Please Provide Details");
    } else {
      this.spinner.show();
      this.service.updateCadetAcademicDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editAcademicDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }
  }


  updateSportsDetails() {

    if (!this.b.sports.value && !this.b.sportsLevel.value) {
      this.service.openSnackbar("Please Provide Details")
    } else {
      this.spinner.show()
      this.service.updateCadetSportsDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editSportsDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }
  }

  updateCourseDetails() {
    this.isError = false;
    if (this.b.courseSerNo.errors || this.b.entry.errors) {
      this.isError = true;
      this.service.openSnackbar("Required Fields Should Not Be Blank")
    } else {
      this.spinner.show();
      this.service.updateCadetCourseDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editCourseDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }
  }

  updateSSBDetails() {
    this.isError = false;
    if (this.b.upscRollNo.errors || this.b.ssbSerNo.errors || this.b.ssbBatchNo.errors || this.b.chestNo.errors) {
      this.isError = true;
      this.service.openSnackbar("Required Fields Should Not Be Blank");
    } else {
      this.spinner.show();
      this.service.updateCadetSSBDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editSSBDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }

  }

  updateArivalDetails() {
    this.isError = false;
    if (this.b.IMA_JoiningDate.errors) {
      this.isError = true;
      this.service.openSnackbar("Required Fields Should Not Be Blank")
    } else {
      this.spinner.show();
      this.service.updateCadetArrivalDetails(this.id, this.addCadetForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editArivalDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )
    }
  }

  updateCommissioningDetails() {

    this.spinner.show();
    this.service.updateCadetCommissioningDetails(this.id, this.addCadetForm.value).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide()
          this.service.openSnackbar(res.message);
          this.editCommissioningDetails = false;
          this.cdref.detectChanges();
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.");
      }
    )

  }



  updateEducationDetails() {
    // alert('latest')
    if (this.educationQualificationForm.invalid) {

      this.isErrorInEduForm = true;
      this.service.openSnackbar("Please Fill All Required Educational Details")
    } else {

      this.spinner.show();
      this.service.updateCadetEducationalDetails(this.id, this.educationQualificationForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editEducationDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )

    }


  }

  // updateDocuments() {
  //    console.log('aaaaaaaa==>',this.docArray);
  //    console.log('docArray length==>',this.docArray.length);
  //    //console.log(this.adharImage,this.panImage,this.postImage,this.gradImage)

  //   this.spinner.show();
  //   this.service.updateDocuments(this.id, this.docArray).subscribe(
  //     res => {
  //       if (res.status == "OK") {
  //         this.spinner.hide()
  //         this.service.openSnackbar(res.message);
  //         this.editDocuments = false;
  //         this.cdref.detectChanges();
  //       } else {
  //         this.spinner.hide();
  //         this.service.openSnackbar(res.message);
  //       }
  //     },
  //     err => {
  //       this.spinner.hide()
  //       this.service.openSnackbar("Some Error Occured.");
  //     }
  //   )

  // }

  updateDocuments() {
    console.log('aaaaaaaa==>', this.docArray);
    console.log('docArray length==>', this.docArray.length);
    //console.log(this.adharImage,this.panImage,this.postImage,this.gradImage)

    this.spinner.show();
    this.service.updateDocuments2(this.id, this.profileImg, this.aadharImg,
      this.panImg, this.tenthImg, this.twelfthImg, this.graduationImg, this.postGraduationImg).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editDocuments = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )

  }

  update_IMA_Authority_Details() {
    console.log("password check",this.imaAuthorityForm.value)
    if (this.imaAuthorityForm.invalid) {
      this.service.openSnackbar("Please Fill All Required Educational Details")
      this.isErrorInEduForm = true;
    } else {

      this.spinner.show();
      this.service.updateIMA_AuthorityDetails(this.id, this.imaAuthorityForm.value).subscribe(
        res => {
          if (res.status == "OK") {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
            this.editAcademyDetails = false;
            this.cdref.detectChanges();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar("Some Error Occured.");
        }
      )

    }

  }

  updateVaccinationDetails() {


    this.spinner.show();
    this.service.updateVaccinationDetails(this.id, this.imaAuthorityForm.value).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide()
          this.service.openSnackbar(res.message);
          this.editVaccinationDetails = false;
          this.cdref.detectChanges();
        } else {
          this.spinner.hide();
          this.service.openSnackbar(res.message);
        }
      },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.");
      }
    )

  }









  updateCadet() {
    if (this.imaAuthorityForm.invalid || !this.previewImg || !this.previewAadharImg || !this.previewPANImg || !this.preview10thImg || !this.preview12thImg) {
      this.isErrorAuthorityForm = true;
      this.service.openSnackbar('Please Fill all Required Fields and Choose Required Documents and Images.');

    } else {
      this.spinner.show()
      this.service.updateCadet(this.id, this.docArray, this.addCadetForm.value, this.educationQualificationForm.value, this.imaAuthorityForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.service.openSnackbarTime(res.message, 5000);
            this.goBack();
          } else {
            this.spinner.hide()
            this.service.openSnackbarTime(res.message, 5000)
          }
        },
        err => {
          this.spinner.hide()
          console.log(JSON.stringify(err));

          this.service.openSnackbarTime('Some Error Occured.', 5000)
        }
      )
    }
  }


  gradOthStream: boolean = false;
  gradStreadSelected(e: any) {
    let val = e;
    if (val == "Other") {
      this.gradOthStream = true;
      this.ef.gradu_subjects.setValue('')
    } else {
      this.gradOthStream = false;
      this.ef.gradu_subjects.setValue(e)
    }
  }

  pgOthStream: boolean = false;
  pgStreadSelected(e: any) {
    let val = e;
    if (val == "Other") {
      this.pgOthStream = true;
      this.ef.post_gradu_subjects.setValue('')

    } else {
      this.pgOthStream = false
      this.ef.post_gradu_subjects.setValue(e)
    }
  }

  entryResult: any; x: any;
  entryTerm(e) {
    // alert(e.target.value)
    this.entryResult = e.target.value;
    // if(this.entryResult=='DE'){
    //   this.x=1;
    //   this.addCadetForm.value.term=1;
    //   alert(this.x)
    // }
    // else{
    //   this.addCadetForm.value.term=7;
    // }
    if (this.entryResult == 'DE') {
      //  alert('DE')
      this.ter = [{ id: 1, name: 'term1' }]
    }
    else if (this.entryResult == 'TGC') {
      // alert('TGC')
      this.ter = [{ id: 7, name: 'tech II' }]
    }
  }


}
