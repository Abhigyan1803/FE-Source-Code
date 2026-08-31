import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {




  @ViewChild('stepper', { static: true }) stepper: MatStepper;




  pTitle = "Add Record of Service";

  nationalities: any[] = [];
  states: any[] = [];
  religions: any[] = [];
  casts: any[] = []
  bloodGroups: any[] = []
  maritalStatuses: any[] = [];

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

  today;

  personalDetailsForm: FormGroup = new FormGroup({});
  qualificationForm: FormGroup = new FormGroup({});
  otherDetailsForm: FormGroup = new FormGroup({});

  isIndia: boolean = false;

  editPersonalDetails: boolean = true;


  isError: boolean = false;
  isErrQForm: boolean = false;
  isErrODForm: boolean = false;

  docArray: any[] = ['', '', '', '', '', '', ''];

  id: string = '';


  trueValue: boolean = true;
  falseValue: boolean = false;


  constructor(private dialog: MatDialog, private service: AdminService,
    private cdref: ChangeDetectorRef,
    private spinner: NgxSpinnerService, @Inject(LOCALE_ID) localID: string,
    private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) {

    this.localID = localID

    this.today = formatDate(new Date(), 'yyyy-MM-dd', this.localID);

    //========= CADET DETAILS FORM ========

    this.personalDetailsForm = this.fb.group({

      name: ['', Validators.required],
      personalNumber: ['', Validators.required],
      rankName: ['', Validators.required],
      substantiveDate: [''],
      actingDate: [''],
      regimentCrops: [''],

      isEcCommission: [false],
      isPcSlCommission: [false],
      isPcWefCommission: [false],
      isSscCommission: [false],
      isTaCommission: [false],

      authority: [''],
      commissionDate: [''],

      substantivePromotionSeniorityDate: [''],
      firstCommissionDate: [''],
      dob: [''],
      placeOfBirth: [''],
      nationality: [''],
      religiousDenomination: [''],
      motherTongue: [''],
      medicalCategory: [''],
      previousOccupation: [''],
      accountNumber: [''],
      idCardNo: [''],
    })



    //=============== EDUCATION AND QUALIFICATION FORM ===============
    this.qualificationForm = this.fb.group({
      academicList: this.fb.array([this.getAcad()]),
      professionalList: this.fb.array([this.createProfTechQl()]),
      experienceInCivilTradeList: this.fb.array([this.createExp()]),
      formerServiceList: this.fb.array([this.createService()]),

      jcoPersonalNumber: [''],
      jcoRank: [''],
      offrPersonalNumber: [''],
      offrRank: [''],
      otherReckonableServiceDetails: [''],

      passingOutTrainingEstablishmentList: this.fb.array([this.createCommission()])
    })


    this.otherDetailsForm = this.fb.group({
      courseList: this.fb.array([this.createCourse()]),
      promotionExaminationList: this.fb.array([this.createPromotionExam()]),
      foreignlanguageList: this.fb.array([this.createForeignLanguage()]),
      indianLanguageList: this.fb.array([this.createIndianLanguage()]),
      regimentalDutyList: this.fb.array([this.createRegimentalDuties()]),
      staffEmploymentOtherRegimentalList: this.fb.array([this.createStaffEmployment()]),
      extraRegimentalEmploymentList: this.fb.array([this.createInstructional()]),
      decorationList: this.fb.array([this.createDecoration()]),

      // PERSONAL ADDRESS
      perAddLine1: [''],
      perAddLine2: [''],
      perVillage: [''],
      perTehsil: [''],
      perPostOffice: [''],
      perCity: [''],
      perDistrict: [''],
      perState: [''],
      perPinCode: [''],

      // BANKERS ADDRESS

      officerBankersName: [''],
      officerBankersAddLine1: [''],
      officerBankersAddLine2: [''],
      officerBankersVillage: [''],
      officerBankersTehsil: [''],
      officerBankersPostOffice: [''],
      officerBankersCity: [''],
      officerBankersDistrict: [''],
      officerBankersState: [''],
      officerBankersPinCode: [''],

      nextKinList: this.fb.array([this.createNextKin()]),

      whetherLocation: [''],

      isDeathCumRetirementGratuity: [''],
      isArmyGroupInsurance: [''],
      isDSOPFund: [''],

      insurancePolicyList: this.fb.array([this.createLifeInsurancePolicy()]),
      familyDetailsAList: this.fb.array([this.createFamilyDetail()]),
      familyDetailsBList: this.fb.array([this.createChildrenDetail()]),
      annualLeaveList: this.fb.array([this.createAnnualLeave()]),

      confirmationPlace: ['', Validators.required],
      confirmationDate: ['', Validators.required],
      declareConfirmation: [false, Validators.required],
      status: ['1', Validators.required],

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
        // console.log(res);

        if (res.status == 'OK') {
          this.battalions = res.object
          this.cdref.detectChanges();

        } else {
          // alert('Battalions not found.')
        }

      }, err => {
        // alert('Cannot find battalions')
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
          this.terms = res.List
          this.cdref.detectChanges();
        }

      }
    )

    this.maxTodayDate = formatDate(new Date(), 'yyyy-MM-dd', this.localID);
    this.minDob = formatDate(new Date().setFullYear(this.currentYear - 18), 'yyyy-MM-dd', this.localID);
    this.maxDob = formatDate(new Date().setFullYear(this.currentYear - 28), 'yyyy-MM-dd', this.localID);

  }

  ngOnInit(): void {




    if (this.router.url.includes('view-record')) {
      this.pTitle = 'View Record of Service';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getRecordOfServiceById(this.id).subscribe(
        res => {
          // console.log('swapnil',res);
          if (res.status == "OK") {

            const obj = res.object

            this.personalDetailsForm.patchValue({

              name: obj.name,
              personalNumber: obj.personalNumber,
              rankName: obj.rankName,
              substantiveDate: formatDate(obj.substantiveDate, 'yyyy-MM-dd', this.localID),
              actingDate: formatDate(obj.actingDate, 'yyyy-MM-dd', this.localID),
              regimentCrops: obj.regimentCrops,

              isEcCommission: obj.isEcCommission,
              isPcSlCommission: obj.isPcSlCommission,
              isPcWefCommission: obj.isPcWefCommission,
              isSscCommission: obj.isSscCommission,
              isTaCommission: obj.isTaCommission,

              authority: obj.authority,
              commissionDate: formatDate(obj.commissionDate, 'yyyy-MM-dd', this.localID),

              substantivePromotionSeniorityDate: formatDate(obj.substantivePromotionSeniorityDate, 'yyyy-MM-dd', this.localID),
              firstCommissionDate: formatDate(obj.firstCommissionDate, 'yyyy-MM-dd', this.localID),
              dob: formatDate(obj.dob, 'yyyy-MM-dd', this.localID),
              placeOfBirth: obj.placeOfBirth,
              nationality: obj.nationality,
              religiousDenomination: obj.religiousDenomination,
              motherTongue: obj.motherTongue,
              medicalCategory: obj.medicalCategory,
              previousOccupation: obj.previousOccupation,
              accountNumber: obj.accountNumber,
              idCardNo: obj.idCardNo,
            })

            this.qualificationForm.patchValue({

              jcoPersonalNumber: obj.jcoPersonalNumber,
              jcoRank: obj.jcoRank,
              offrPersonalNumber: obj.offrPersonalNumber,
              offrRank: obj.offrRank,
              otherReckonableServiceDetails: obj.otherReckonableServiceDetails,

            })

            if (obj.academicList.length) {
              this.getAcads.clear();

              for (let i = 0; i < obj.academicList.length; i++) {

                this.getAcads.push(
                  this.fb.group({
                    id: obj.academicList[i].id,
                    divisionClass: obj.academicList[i].divisionClass,
                    examination: obj.academicList[i].examination,
                    schoolCollege: obj.academicList[i].schoolCollege,
                    year: obj.academicList[i].year
                  })
                )
              }

              this.qualificationForm.patchValue({
                academicList: this.getAcads.value
              })

            }



            if (obj.professionalList.length) {
              this.getAllProfTechQl.clear()

              for (let i = 0; i < obj.professionalList.length; i++) {

                this.getAllProfTechQl.push(
                  this.fb.group({
                    id: obj.professionalList[i].id,
                    qualification: obj.professionalList[i].qualification,
                    institution: obj.professionalList[i].institution,
                    year: obj.professionalList[i].year,
                    distinction: obj.professionalList[i].distinction,
                  })
                )
              }

              this.qualificationForm.patchValue({
                professionalList: this.getAllProfTechQl.value
              })

            }


            if (obj.experienceInCivilTradeList.length) {
              this.getAllExp.clear()

              for (let i = 0; i < obj.experienceInCivilTradeList.length; i++) {

                this.getAllExp.push(
                  this.fb.group({
                    id: obj.experienceInCivilTradeList[i].id,
                    addressOfEmployer: obj.experienceInCivilTradeList[i].addressOfEmployer,
                    duration: obj.experienceInCivilTradeList[i].duration,
                    nameOfEmployer: obj.experienceInCivilTradeList[i].nameOfEmployer,
                    profession: obj.experienceInCivilTradeList[i].profession
                  })
                )
              }

              this.qualificationForm.patchValue({
                experienceInCivilTradeList: this.getAllExp.value
              })

            }



            if (obj.formerServiceList.length) {
              this.getAllService.clear()
              // console.log(this.getAllService, 'mine')
              // console.log(obj.formerServiceList);
              for (let i = 0; i < obj.formerServiceList.length; i++) {
                // alert(this.localID)
                //alert(formatDate(obj.formerServiceList[i].dateFrom, 'yyyy-MM-dd', this.localID));
                this.getAllService.push(
                  this.fb.group({
                    id: obj.formerServiceList[i].id,

                    dateFrom: (obj.formerServiceList[i].dateFrom) ? formatDate(obj.formerServiceList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.formerServiceList[i].dateTo) ? formatDate(obj.formerServiceList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,

                    preCommissionService: obj.formerServiceList[i].preCommissionService,
                    regtCorpsOfficeDeptt: obj.formerServiceList[i].regtCorpsOfficeDeptt,
                    totalServiceExperience: obj.formerServiceList[i].totalServiceExperience,
                    remark: obj.formerServiceList[i].remark

                  })
                );


              }

              this.qualificationForm.patchValue({
                formerServiceList: this.getAllService.value
              })

            }


            if (obj.passingOutTrainingEstablishmentList.length) {
              this.getAllCommissions.clear()
              for (let j = 0; j < this.getAllCommissions.length; j++) {
                this.getAllCommissions[j].dateFrom = null;
              }
              // console.log(this.getAllCommissions)
              for (let i = 0; i < obj.passingOutTrainingEstablishmentList.length; i++) {
                // alert(obj.passingOutTrainingEstablishmentList[i].dateFrom);


                this.getAllCommissions.push(
                  this.fb.group({
                    id: obj.passingOutTrainingEstablishmentList[i].id,
                    dateFrom: (obj.passingOutTrainingEstablishmentList[i].dateFrom) ? formatDate(obj.passingOutTrainingEstablishmentList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.passingOutTrainingEstablishmentList[i].dateTo) ? formatDate(obj.passingOutTrainingEstablishmentList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    courseNo: obj.passingOutTrainingEstablishmentList[i].courseNo,
                    trainingEstablishmentLocation: obj.passingOutTrainingEstablishmentList[i].trainingEstablishmentLocation,
                    trainingEstablishmentName: obj.passingOutTrainingEstablishmentList[i].trainingEstablishmentName
                  })
                )
                // console.log(this.getAllCommissions)
              }
              this.qualificationForm.patchValue({
                passingOutTrainingEstablishmentList: this.getAllCommissions.value
              })
            }





            this.otherDetailsForm.patchValue({
              // PERSONAL ADDRESS
              perAddLine1: obj.perAddLine1,
              perAddLine2: obj.perAddLine2,
              perVillage: obj.perVillage,
              perTehsil: obj.perTehsil,
              perPostOffice: obj.perPostOffice,
              perCity: obj.perCity,
              perDistrict: obj.perDistrict,
              perState: obj.perState,
              perPinCode: obj.perPinCode,

              // BANKERS ADDRESS
              officerBankersName: obj.officerBankersName,
              officerBankersAddLine1: obj.officerBankersAddLine1,
              officerBankersAddLine2: obj.officerBankersAddLine2,
              officerBankersVillage: obj.officerBankersVillage,
              officerBankersTehsil: obj.officerBankersTehsil,
              officerBankersPostOffice: obj.officerBankersPostOffice,
              officerBankersCity: obj.officerBankersCity,
              officerBankersDistrict: obj.officerBankersDistrict,
              officerBankersState: obj.officerBankersState,
              officerBankersPinCode: obj.officerBankersPinCode,


              whetherLocation: obj.whetherLocation,

              isDeathCumRetirementGratuity: obj.isDeathCumRetirementGratuity,
              isArmyGroupInsurance: obj.isArmyGroupInsurance,
              isDSOPFund: obj.isDSOPFund,

              confirmationPlace: obj.confirmationPlace,
              confirmationDate: formatDate(obj.confirmationDate, 'yyyy-MM-dd', this.localID),
              declareConfirmation: obj.declareConfirmation,
              status: obj.status,

            })



            if (obj.courseList.length) {
              this.getAllCourses.clear()

              for (let i = 0; i < obj.courseList.length; i++) {
                this.getAllCourses.push(
                  this.fb.group({
                    id: obj.courseList[i].id,
                    courseName: obj.courseList[i].courseName,
                    dateFrom: (obj.courseList[i].dateFrom) ? formatDate(obj.courseList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.courseList[i].dateTo) ? formatDate(obj.courseList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    institution: obj.courseList[i].institution,
                    location: obj.courseList[i].location,
                    gradingObtained: obj.courseList[i].gradingObtained,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                courseList: this.getAllCourses.value
              })
            }



            if (obj.promotionExaminationList.length) {
              this.getAllPromotionExams.clear()
              for (let i = 0; i < obj.promotionExaminationList.length; i++) {
                this.getAllPromotionExams.push(
                  this.fb.group({
                    id: obj.promotionExaminationList[i].id,
                    exam: obj.promotionExaminationList[i].exam,
                    cleared: obj.promotionExaminationList[i].cleared,
                    attempts: obj.promotionExaminationList[i].attempts,
                    auth: obj.promotionExaminationList[i].auth,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                promotionExaminationList: this.getAllPromotionExams.value
              })
            }


            if (obj.foreignlanguageList.length) {
              this.getAllForeignLanguages.clear()
              for (let i = 0; i < obj.foreignlanguageList.length; i++) {
                this.getAllForeignLanguages.push(
                  this.fb.group({
                    id: obj.foreignlanguageList[i].id,
                    language: obj.foreignlanguageList[i].language,
                    examinationPassed: obj.foreignlanguageList[i].examinationPassed,
                    examinationDate: (obj.foreignlanguageList[i].examinationDate) ? formatDate(obj.foreignlanguageList[i].examinationDate, 'yyyy-MM-dd', this.localID) : null,
                    canRead: obj.foreignlanguageList[i].canRead,
                    canWrite: obj.foreignlanguageList[i].canWrite,
                    canSpeak: obj.foreignlanguageList[i].canSpeak,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                foreignlanguageList: this.getAllForeignLanguages.value
              })
            }


            if (obj.indianLanguageList.length) {

              this.getAllIndianLanguages.clear()
              for (let i = 0; i < obj.indianLanguageList.length; i++) {
                this.getAllIndianLanguages.push(
                  this.fb.group({
                    id: obj.indianLanguageList[i].id,
                    language: obj.indianLanguageList[i].language,
                    examinationPassed: obj.indianLanguageList[i].examinationPassed,
                    examinationDate: (obj.indianLanguageList[i].examinationDate) ? formatDate(obj.indianLanguageList[i].examinationDate, 'yyyy-MM-dd', this.localID) : null,
                    canRead: obj.indianLanguageList[i].canRead,
                    canWrite: obj.indianLanguageList[i].canWrite,
                    canSpeak: obj.indianLanguageList[i].canSpeak,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                indianLanguageList: this.getAllIndianLanguages.value
              })
            }



            if (obj.regimentalDutyList.length) {

              this.getAllRegimentalDuties.clear()
              for (let i = 0; i < obj.regimentalDutyList.length; i++) {
                this.getAllRegimentalDuties.push(
                  this.fb.group({
                    id: obj.regimentalDutyList[i].id,
                    unit: obj.regimentalDutyList[i].unit,
                    appt: obj.regimentalDutyList[i].appt,
                    place: obj.regimentalDutyList[i].place,
                    dateFrom: (obj.regimentalDutyList[i].dateFrom) ? formatDate(obj.regimentalDutyList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.regimentalDutyList[i].dateTo) ? formatDate(obj.regimentalDutyList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    totalDays: obj.regimentalDutyList[i].totalDays,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                regimentalDutyList: this.getAllRegimentalDuties.value
              })
            }

            if (obj.staffEmploymentOtherRegimentalList.length) {
              this.getAllStaffEmployment.clear()
              for (let i = 0; i < obj.staffEmploymentOtherRegimentalList.length; i++) {
                this.getAllStaffEmployment.push(
                  this.fb.group({
                    id: obj.staffEmploymentOtherRegimentalList[i].id,
                    unit: obj.staffEmploymentOtherRegimentalList[i].unit,
                    appointment: obj.staffEmploymentOtherRegimentalList[i].appointment,
                    place: obj.staffEmploymentOtherRegimentalList[i].place,
                    dateFrom: (obj.staffEmploymentOtherRegimentalList[i].dateFrom) ? formatDate(obj.staffEmploymentOtherRegimentalList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.staffEmploymentOtherRegimentalList[i].dateTo) ? formatDate(obj.staffEmploymentOtherRegimentalList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    totalDays: obj.staffEmploymentOtherRegimentalList[i].totalDays,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                staffEmploymentOtherRegimentalList: this.getAllStaffEmployment.value
              })
            }

            if (obj.extraRegimentalEmploymentList.length) {
              this.getAllInstructionals.clear()
              for (let i = 0; i < obj.extraRegimentalEmploymentList.length; i++) {
                this.getAllInstructionals.push(
                  this.fb.group({
                    id: obj.extraRegimentalEmploymentList[i].id,
                    unit: obj.extraRegimentalEmploymentList[i].unit,
                    appointment: obj.extraRegimentalEmploymentList[i].appointment,
                    place: obj.extraRegimentalEmploymentList[i].place,
                    dateFrom: (obj.extraRegimentalEmploymentList[i].dateFrom) ? formatDate(obj.extraRegimentalEmploymentList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.extraRegimentalEmploymentList[i].dateTo) ? formatDate(obj.extraRegimentalEmploymentList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    totalDays: obj.extraRegimentalEmploymentList[i].totalDays
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                extraRegimentalEmploymentList: this.getAllInstructionals.value
              })
            }

            if (obj.decorationList.length) {
              this.getAllDecorations.clear()
              for (let i = 0; i < obj.decorationList.length; i++) {
                this.getAllDecorations.push(
                  this.fb.group({
                    id: obj.decorationList[i].id,
                    decorations: obj.decorationList[i].decorations,
                    servingUnit: obj.decorationList[i].servingUnit,
                    authority: obj.decorationList[i].authority,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                decorationList: this.getAllDecorations.value
              })
            }



            if (obj.nextKinList.length) {
              this.getAllNextKins.clear()
              for (let i = 0; i < obj.nextKinList.length; i++) {
                this.getAllNextKins.push(
                  this.fb.group({
                    id: obj.nextKinList[i].id,
                    name: obj.nextKinList[i].name,
                    relationship: obj.nextKinList[i].relationship,
                    address: obj.nextKinList[i].address,

                  })
                )
              }
              this.otherDetailsForm.patchValue({
                nextKinList: this.getAllNextKins.value
              })
            }

            if (obj.insurancePolicyList.length) {
              this.getAllLifeInsurancePolicies.clear()
              for (let i = 0; i < obj.insurancePolicyList.length; i++) {
                this.getAllLifeInsurancePolicies.push(
                  this.fb.group({
                    id: obj.insurancePolicyList[i].id,
                    policyNo: obj.insurancePolicyList[i].policyNo,
                    sumAssured: obj.insurancePolicyList[i].sumAssured,
                    assigned: obj.insurancePolicyList[i].assigned,
                    paymentMode: obj.insurancePolicyList[i].paymentMode,
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                insurancePolicyList: this.getAllLifeInsurancePolicies.value
              })
            }

            if (obj.familyDetailsAList.length) {

              this.getAllFamilyDetails.clear()
              for (let i = 0; i < obj.familyDetailsAList.length; i++) {
                this.getAllFamilyDetails.push(
                  this.fb.group({
                    id: obj.familyDetailsAList[i].id,
                    marriageDate: (obj.familyDetailsAList[i].marriageDate) ? formatDate(obj.familyDetailsAList[i].marriageDate, 'yyyy-MM-dd', this.localID) : null,
                    marriagePlace: obj.familyDetailsAList[i].marriagePlace,
                    law: obj.familyDetailsAList[i].law,
                    toWhom: obj.familyDetailsAList[i].toWhom,
                    spouseNationality: obj.familyDetailsAList[i].spouseNationality,
                    authority: obj.familyDetailsAList[i].authority
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                familyDetailsAList: this.getAllFamilyDetails.value
              })
            }

            if (obj.familyDetailsBList.length) {

              this.getAllChildrenDetails.clear()
              for (let i = 0; i < obj.familyDetailsBList.length; i++) {
                this.getAllChildrenDetails.push(
                  this.fb.group({
                    id: obj.familyDetailsBList[i].id,
                    name: obj.familyDetailsBList[i].name,
                    gender: obj.familyDetailsBList[i].gender,
                    dob: (obj.familyDetailsBList[i].dob) ? formatDate(obj.familyDetailsBList[i].dob, 'yyyy-MM-dd', this.localID) : null,
                    birthPlace: obj.familyDetailsBList[i].birthPlace,
                    authority: obj.familyDetailsBList[i].authority

                  })
                )
              }
              this.otherDetailsForm.patchValue({
                familyDetailsBList: this.getAllChildrenDetails.value
              })
            }

            if (obj.annualLeaveList.length) {

              this.getAllAnnualLeaves.clear()
              for (let i = 0; i < obj.annualLeaveList.length; i++) {
                this.getAllAnnualLeaves.push(
                  this.fb.group({
                    id: obj.annualLeaveList[i].id,
                    unit: obj.annualLeaveList[i].unit,
                    dateFrom: (obj.annualLeaveList[i].dateFrom) ? formatDate(obj.annualLeaveList[i].dateFrom, 'yyyy-MM-dd', this.localID) : null,
                    dateTo: (obj.annualLeaveList[i].dateTo) ? formatDate(obj.annualLeaveList[i].dateTo, 'yyyy-MM-dd', this.localID) : null,
                    remarks: obj.annualLeaveList[i].remarks
                  })
                )
              }
              this.otherDetailsForm.patchValue({
                annualLeaveList: this.getAllAnnualLeaves.value
              })
            }


          }
        }
      )
    }

  }

  /**========FOR QUALIFICATIONS========= */


  //----------ACADEMIC DETAILS------------
  getAcad(): FormGroup {
    return this.fb.group({
      divisionClass: [''],
      examination: [''],

      schoolCollege: [''],
      year: ['']
    })
  }
  get getAcads(): FormArray {
    return this.qualificationForm.get('academicList') as FormArray;
  }
  addAcad(): void {
    this.getAcads.push(this.getAcad())
    // console.log(this.getAcads)
  }
  removeAAcad(i): void {
    this.getAcads.removeAt(i)
  }
  //-----------------------------------

  //----------PROFESSIONAL/TECHNICAL----------
  createProfTechQl(): FormGroup {
    return this.fb.group({

      qualification: [''],
      institution: [''],
      year: [''],
      distinction: [''],
    })
  }
  get getAllProfTechQl(): FormArray {
    return this.qualificationForm.get('professionalList') as FormArray;
  }
  addProfTechQl(): void {
    this.getAllProfTechQl.push(this.createProfTechQl())
  }
  removeProfTechQl(i): void {
    this.getAllProfTechQl.removeAt(i);
  }

  //------------------------------------------

  //--------EXPERIENCE IN CIVIL TRADDE--------

  createExp(): FormGroup {
    return this.fb.group({

      addressOfEmployer: [''],
      duration: [''],
      nameOfEmployer: [''],
      profession: ['']
    })
  }
  get getAllExp(): FormArray {
    return this.qualificationForm.get('experienceInCivilTradeList') as FormArray;
  }
  addExp(): void {
    this.getAllExp.push(this.createExp())
  }
  removeExp(i): void {
    this.getAllExp.removeAt(i);
  }
  //------------------------------------------

  //-------- PARTICULARS OF FORMER SERVICE ------


  createService(): FormGroup {
    return this.fb.group({
      dateFrom: [''],
      dateTo: [''],

      preCommissionService: [''],
      regtCorpsOfficeDeptt: [''],
      totalServiceExperience: [''],
      remark: ['']
    })
  }
  get getAllService(): FormArray {
    return this.qualificationForm.get('formerServiceList') as FormArray;
  }
  addService(): void {
    this.getAllService.push(this.createService())
  }
  removeService(i): void {
    this.getAllService.removeAt(i);
  }
  //-----------------------------------------



  //----------commisioned after passing out from NDA/IMA/OTS-------------------

  createCommission(): FormGroup {
    return this.fb.group({

      dateFrom: [''],
      dateTo: [''],
      courseNo: [''],
      trainingEstablishmentLocation: [''],
      trainingEstablishmentName: ['']
    })
  }
  get getAllCommissions(): FormArray {
    //alert(this.qualificationForm.get('passingOutTrainingEstablishmentList') as FormArray);
    return this.qualificationForm.get('passingOutTrainingEstablishmentList') as FormArray;
  }
  addCommission(): void {
    this.getAllCommissions.push(this.createCommission())
  }
  removeCommission(i): void {
    this.getAllCommissions.removeAt(i);
  }

  //--------------------------------

  //--------------COURSES-----------

  createCourse(): FormGroup {
    return this.fb.group({

      courseName: [''],
      dateFrom: [''],
      dateTo: [''],
      institution: [''],
      location: [''],
      gradingObtained: [''],
    })
  }
  get getAllCourses(): FormArray {
    return this.otherDetailsForm.get('courseList') as FormArray;
  }
  addCourse(): void {
    this.getAllCourses.push(this.createCourse())
  }
  removeCourse(i): void {
    this.getAllCourses.removeAt(i);
  }

  //--------------------------------

  //---------PROMOTION EXAM---------

  createPromotionExam(): FormGroup {
    return this.fb.group({
      exam: [''],
      cleared: [''],
      attempts: [''],
      auth: [''],
    })
  }
  get getAllPromotionExams(): FormArray {
    return this.otherDetailsForm.get('promotionExaminationList') as FormArray;
  }
  addPromotionExam(): void {
    this.getAllPromotionExams.push(this.createPromotionExam())
  }
  removePromotionExam(i): void {
    this.getAllPromotionExams.removeAt(i);
  }

  //--------------------------------

  //----------FOREIGN LANGUAGES----------

  createForeignLanguage(): FormGroup {
    return this.fb.group({
      language: [''],
      examinationPassed: [''],
      examinationDate: [''],
      canRead: [''],
      canWrite: [''],
      canSpeak: [''],
    })
  }

  get getAllForeignLanguages(): FormArray {
    return this.otherDetailsForm.get('foreignlanguageList') as FormArray;
  }

  addForeignLanguage(): void {
    this.getAllForeignLanguages.push(this.createForeignLanguage())
  }

  removeForeignLanguage(i): void {
    this.getAllForeignLanguages.removeAt(i);
  }

  //------------------------------------

  //----------INDIAN LANGUAGES----------

  createIndianLanguage(): FormGroup {
    return this.fb.group({
      language: [''],
      examinationPassed: [''],
      examinationDate: [''],
      canRead: [false],
      canSpeak: [false],
      canWrite: [false],
    })
  }

  get getAllIndianLanguages(): FormArray {
    return this.otherDetailsForm.get('indianLanguageList') as FormArray;
  }

  addIndianLanguage(): void {
    this.getAllIndianLanguages.push(this.createIndianLanguage())
  }

  removeIndianLanguage(i): void {
    this.getAllIndianLanguages.removeAt(i);
  }

  //------------------------------------



  //----------REGIMENTAL DUTIES----------


  createRegimentalDuties(): FormGroup {
    return this.fb.group({
      unit: [''],
      appt: [''],
      place: [''],
      dateFrom: [''],
      dateTo: [''],
      totalDays: [''],
    })
  }

  get getAllRegimentalDuties(): FormArray {
    return this.otherDetailsForm.get('regimentalDutyList') as FormArray;
  }

  addRegimentalDuties(): void {
    this.getAllRegimentalDuties.push(this.createRegimentalDuties())
  }

  removeRegimentalDuties(i): void {
    this.getAllRegimentalDuties.removeAt(i);
  }

  //------------------------------------


  //----------Staff employment other than regimental----------


  createStaffEmployment(): FormGroup {
    return this.fb.group({
      unit: [''],
      appointment: [''],
      place: [''],
      dateFrom: [''],
      dateTo: [''],
      totalDays: [''],
    })
  }

  get getAllStaffEmployment(): FormArray {
    return this.otherDetailsForm.get('staffEmploymentOtherRegimentalList') as FormArray;
  }

  addStaffEmployment(): void {
    this.getAllStaffEmployment.push(this.createStaffEmployment())
  }

  removeStaffEmployment(i): void {
    this.getAllStaffEmployment.removeAt(i);
  }

  //------------------------------------


  //----------Instructional and Extra Regimental Employment----------

  createInstructional(): FormGroup {
    return this.fb.group({
      unit: [''],
      appointment: [''],
      place: [''],
      dateFrom: [''],
      dateTo: [''],
      totalDays: [''],
    })
  }

  get getAllInstructionals(): FormArray {
    return this.otherDetailsForm.get('extraRegimentalEmploymentList') as FormArray;
  }

  addInstructional(): void {
    this.getAllInstructionals.push(this.createInstructional())
  }

  removeInstructional(i): void {
    this.getAllInstructionals.removeAt(i);
  }

  //------------------------------------

  //----------Decorations, Campaign Stars and Medals----------

  createDecoration(): FormGroup {
    return this.fb.group({
      decorations: [''],
      servingUnit: [''],
      authority: [''],
    })
  }

  get getAllDecorations(): FormArray {
    return this.otherDetailsForm.get('decorationList') as FormArray;
  }

  addDecoration(): void {
    this.getAllDecorations.push(this.createDecoration())
  }

  removeDecoration(i): void {
    this.getAllDecorations.removeAt(i);
  }

  //------------------------------------



  //----------NEXT OF KIN----------

  createNextKin(): FormGroup {
    return this.fb.group({
      name: [''],
      relationship: [''],
      address: [''],
    })
  }

  get getAllNextKins(): FormArray {
    return this.otherDetailsForm.get('nextKinList') as FormArray;
  }

  addNextKin(): void {
    this.getAllNextKins.push(this.createNextKin())
  }

  removeNextKin(i): void {
    this.getAllNextKins.removeAt(i);
  }

  //------------------------------------




  createLifeInsurancePolicy(): FormGroup {
    return this.fb.group({
      policyNo: [''],
      sumAssured: [''],
      assigned: [''],
      paymentMode: ['']
    })
  }

  get getAllLifeInsurancePolicies(): FormArray {
    return this.otherDetailsForm.get('insurancePolicyList') as FormArray;
  }

  addLifeInsurancePolicy(): void {
    this.getAllLifeInsurancePolicies.push(this.createLifeInsurancePolicy())
  }

  removeLifeInsurancePolicy(i): void {
    this.getAllLifeInsurancePolicies.removeAt(i);
  }


  //------------------------------------


  //----------FAMILY DETAILS----------

  createFamilyDetail(): FormGroup {
    return this.fb.group({
      marriageDate: [''],
      marriagePlace: [''],
      law: [''],
      toWhom: [''],
      spouseNationality: [''],
      authority: ['']

    })
  }

  get getAllFamilyDetails(): FormArray {
    return this.otherDetailsForm.get('familyDetailsAList') as FormArray;
  }

  addFamilyDetail(): void {
    this.getAllFamilyDetails.push(this.createFamilyDetail())
  }

  removeFamilyDetail(i): void {
    this.getAllFamilyDetails.removeAt(i);
  }

  //------------------------------------



  //----------CHILDREN DETAILS----------

  createChildrenDetail(): FormGroup {
    return this.fb.group({
      name: [''],
      gender: [''],
      dob: [''],
      birthPlace: [''],
      authority: ['']
    })
  }

  get getAllChildrenDetails(): FormArray {
    return this.otherDetailsForm.get('familyDetailsBList') as FormArray;
  }

  addChildrenDetail(): void {
    this.getAllChildrenDetails.push(this.createChildrenDetail())
  }

  removeChildrenDetail(i): void {
    this.getAllChildrenDetails.removeAt(i);
  }

  //------------------------------------


  //----------ANNUAL LEAVE DETAILS----------


  createAnnualLeave(): FormGroup {
    return this.fb.group({
      unit: [''],
      dateFrom: [''],
      dateTo: [''],
      remarks: ['']
    })
  }

  get getAllAnnualLeaves(): FormArray {
    return this.otherDetailsForm.get('annualLeaveList') as FormArray;
  }

  addAnnualLeave(): void {
    this.getAllAnnualLeaves.push(this.createAnnualLeave())
  }

  removeAnnualLeave(i): void {
    this.getAllAnnualLeaves.removeAt(i);
  }

  //------------------------------------




  /**=================================== */


























  // noImg(e: any): void {
  //   e.target.src = "assets/img/default_cadet_img.jpg"
  // }

  // noDocImg(e: any): void {
  //   e.target.src = "assets/img/default-doc-image.jpg"
  // }

  noKeyInput(): boolean {
    return false;
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }






  public get b() {
    return this.personalDetailsForm.controls;
  }

  public get ef() {
    return this.qualificationForm.controls;
  }

  public get of() {
    return this.otherDetailsForm.controls;
  }







  submitPersonalForm() {
    // console.log(this.personalDetailsForm);

    this.spinner.show();
    // if (this.personalDetailsForm.invalid ||  !this.b['isPcWefCommission'].value 
    // && !this.b['isPcSlCommission'].value
    // && !this.b['isSscCommission'].value
    // && !this.b['isEcCommission'].value
    // && !this.b['isTaCommission'].value ) 
    if (this.personalDetailsForm.invalid) {
      this.isError = true;
      this.spinner.hide();
      this.service.openSnackbar("Please Fill All the Required Fields.");
    } else {
      this.spinner.hide();
      this.stepper.next();
    }
  }



  submitQualificationForm() {
    this.spinner.show();
    if (this.qualificationForm.invalid) {
      this.isErrQForm = true;
      this.spinner.hide();
      this.service.openSnackbar("Please Fill All the Required Fields.");
    } else {
      this.spinner.hide();
      this.stepper.next();
    }
  }







  addRecordOfService() {
    this.spinner.show();
    // if (this.personalDetailsForm.invalid || this.qualificationForm.invalid || this.otherDetailsForm.invalid || !this.b['isPcWefCommission'].value
    //   && !this.b['isPcSlCommission'].value
    //   && !this.b['isSscCommission'].value
    //   && !this.b['isEcCommission'].value
    //   && !this.b['isTaCommission'].value)
    if (this.personalDetailsForm.invalid || this.qualificationForm.invalid 
      || this.otherDetailsForm.invalid)
    
      {
      this.spinner.hide();
      this.isErrODForm = true;
      this.service.openSnackbar("Please Field All the Required Fields.");
    } else {

      this.service.addRecordOfService(this.personalDetailsForm.value, this.qualificationForm.value, this.otherDetailsForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res)
        }
      )

    }
  }


  updateRecordOfService() {
    this.spinner.show();
    if (this.personalDetailsForm.invalid || this.qualificationForm.invalid || this.otherDetailsForm.invalid) {
      this.spinner.hide();
      this.isErrODForm = true;
      this.service.openSnackbar("Please Field All the Required Fields.");
    } else {

      this.service.updateRecordOfService(this.id, this.personalDetailsForm.value, this.qualificationForm.value, this.otherDetailsForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res)
        }
      )

    }
  }


  apiRes(res) {
    if (res.status == "OK") {
      this.service.openSnackbar(res.message)
      this.goBack()
    } else {
      this.service.openSnackbar(res.message)
    }
  }





  goBack() {
   
    let arr:string[]=this.router.url.split('/')
    let navigateUrl:string='';
    for(let i=0;i<arr.length-1;i++){
      if(arr[i]){
        navigateUrl = navigateUrl+`/${arr[i]}`;
      }
    }
    this.router.navigate([navigateUrl])
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



}
