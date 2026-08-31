import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-assessment-oq',
  templateUrl: './assessment-oq.component.html',
  styleUrls: ['./assessment-oq.component.scss']
})
export class AssessmentOqComponent implements OnInit {

  menu: any;
  serviceId;
  termId;
  status;
  termid: any = '';
  serviceID: string;
  obj: any[] = [];
  AssessmentForm: FormGroup = new FormGroup({});

  oqSubjectResult: any[] = [];
  obtainedMarksBnCdr: number;
  obtainedMarksCoyCdr: number;
  obtainedMarksPlCdr: number;
  totalMarksBnCdr: number;
  totalMarksCoyCdr: number;
  totalMarksPlCdr: number;

  oqSubjectResult1: any[] = [];
  obtainedMarksBnCdr1: number;
  obtainedMarksCoyCdr1: number;
  obtainedMarksPlCdr1: number;
  totalMarksBnCdr1: number;
  totalMarksCoyCdr1: number;
  totalMarksPlCdr1: number;

  oqSubjectResult2: any[] = [];
  obtainedMarksBnCdr2: number;
  obtainedMarksCoyCdr2: number;
  obtainedMarksPlCdr2: number;
  totalMarksBnCdr2: number;
  totalMarksCoyCdr2: number;
  totalMarksPlCdr2: number;


  oqSubjectResult7: any[] = [];
  obtainedMarksBnCdr7: number;
  obtainedMarksCoyCdr7: number;
  obtainedMarksPlCdr7: number;
  totalMarksBnCdr7: number;
  totalMarksCoyCdr7: number;
  totalMarksPlCdr7: number;



  _I_termData: FormGroup;

  _II_techData: any = {};

  _II_termData: any = {};

  _III_termData: any = {};

  totalPlMarks_I_MID_TERM: number = 0;
  totalObtainedPlMarks_I_MID_TERM: number = 0;
  totalCoyMarks_I_MID_TERM: number = 0
  totalObtainedCoyMarks_I_MID_TERM: number = 0;
  totalBnMarks_I_MID_TERM: number = 0
  totalObtainedBnMarks_I_MID_TERM: number = 0;
  // totalBNPLCOYMarks:number=0;
  // totalPLBNCOYMarks: number = 0;

  total_I_MID_TERM: number = 0;
  totalObtained_I_MID_TERM: number = 0;
  oqEqtn_I_MID_TERM: number = 0;
  acd_I_MID_TERM: number = 0;
  drill_I_MID_TERM: number = 0;
  totalacdoqeqtndrill_I_MID_TERM: number = 0;
  grandTotalMidFirstTerm_I_MID_TERM: number = 0;
  finaltotal_I_MID_TERM: number = 0;

  avg_I_TERM: number = 0;
  marks_DC_CI_I_Term = 0;
  marks_comdt_I_Term = 0; GRAND_TOTAL_I_TERM: number = 0;
  X: number = 0;
  Y: number = 0;
  TERM_S_Id: number;





  //I FINAL TERM
  totalPlMarks_I_FINAL_TERM: number = 0;
  totalObtainedPlMarks_I_FINAL_TERM: number = 0;
  totalCoyMarks_I_FINAL_TERM: number = 0
  totalObtainedCoyMarks_I_FINAL_TERM: number = 0;
  totalBnMarks_I_FINAL_TERM: number = 0
  totalObtainedBnMarks_I_FINAL_TERM: number = 0;
  // totalBNPLCOYMarks:number=0;
  // totalPLBNCOYMarks: number = 0;

  total_I_FINAL_TERM: number = 0;
  totalObtained_I_FINAL_TERM: number = 0;
  oqEqtn_I_FINAL_TERM: number = 0;
  acd_I_FINAL_TERM: number = 0;
  drill_I_FINAL_TERM: number = 0;
  totalacdoqeqtndrill_I_FINAL_TERM: number = 0;
  grandTotalFINALFirstTerm_I_FINAL_TERM: number = 0;
  finaltotal_I_FINAL_TERM: number = 0;


  // II MID TERM

  totalPlMarks_II_MID_TERM: number = 0;
  totalObtainedPlMarks_II_MID_TERM: number = 0;
  totalCoyMarks_II_MID_TERM: number = 0
  totalObtainedCoyMarks_II_MID_TERM: number = 0;
  totalBnMarks_II_MID_TERM: number = 0
  totalObtainedBnMarks_II_MID_TERM: number = 0;
  totalBNPLCOYMarks_II_MID_TERM: number = 0;
  totalPLBNCOYMarks_II_MID_TERM: number = 0;

  total_II_MID_TERM: number = 0;
  totalObtained_II_MID_TERM: number = 0;
  oqEqtn_II_MID_TERM: number = 0;
  acd_II_MID_TERM: number = 0;
  drill_II_MID_TERM: number = 0;
  totalacdoqeqtndrill_II_MID_TERM: number = 0;
  grandTotalMidFirstTerm_II_MID_TERM: number = 0;
  finaltotal_II_MID_TERM: number = 0;

  GRAND_TOTAL_II_TERM: number = 0;


  //II FINAL TERM
  totalPlMarks_II_FINAL_TERM: number = 0;
  totalObtainedPlMarks_II_FINAL_TERM: number = 0;
  totalCoyMarks_II_FINAL_TERM: number = 0
  totalObtainedCoyMarks_II_FINAL_TERM: number = 0;
  totalBnMarks_II_FINAL_TERM: number = 0
  totalObtainedBnMarks_II_FINAL_TERM: number = 0;
  // totalBNPLCOYMarks:number=0;
  // totalPLBNCOYMarks: number = 0;

  total_II_FINAL_TERM: number = 0;
  totalObtained_II_FINAL_TERM: number = 0;
  oqEqtn_II_FINAL_TERM: number = 0;
  acd_II_FINAL_TERM: number = 0;
  drill_II_FINAL_TERM: number = 0;
  totalacdoqeqtndrill_II_FINAL_TERM: number = 0;
  grandTotalFINALFirstTerm_II_FINAL_TERM: number = 0;
  finaltotal_II_FINAL_TERM: number = 0;


  avg_II_TERM: number = 0;
  marks_DC_CI_II_Term = 0;
  marks_comdt_II_Term = 0;



  // III MID TERM

  totalPlMarks_III_MID_TERM: number = 0;
  totalObtainedPlMarks_III_MID_TERM: number = 0;
  totalCoyMarks_III_MID_TERM: number = 0
  totalObtainedCoyMarks_III_MID_TERM: number = 0;
  totalBnMarks_III_MID_TERM: number = 0
  totalObtainedBnMarks_III_MID_TERM: number = 0;
  totalBNPLCOYMarks_III_MID_TERM: number = 0;
  totalPLBNCOYMarks_III_MID_TERM: number = 0;

  total_III_MID_TERM: number = 0;
  totalObtained_III_MID_TERM: number = 0;
  oqEqtn_III_MID_TERM: number = 0;
  acd_III_MID_TERM: number = 0;
  drill_III_MID_TERM: number = 0;
  totalacdoqeqtndrill_III_MID_TERM: number = 0;
  grandTotalMidFirstTerm_III_MID_TERM: number = 0;
  finaltotal_III_MID_TERM: number = 0;




  //III FINAL TERM
  totalPlMarks_III_FINAL_TERM: number = 0;
  totalObtainedPlMarks_III_FINAL_TERM: number = 0;
  totalCoyMarks_III_FINAL_TERM: number = 0
  totalObtainedCoyMarks_III_FINAL_TERM: number = 0;
  totalBnMarks_III_FINAL_TERM: number = 0
  totalObtainedBnMarks_III_FINAL_TERM: number = 0;
  // totalBNPLCOYMarks:number=0;
  // totalPLBNCOYMarks: number = 0;

  total_III_FINAL_TERM: number = 0;
  totalObtained_III_FINAL_TERM: number = 0;
  oqEqtn_III_FINAL_TERM: number = 0;
  acd_III_FINAL_TERM: number = 0;
  drill_III_FINAL_TERM: number = 0;
  totalacdoqeqtndrill_III_FINAL_TERM: number = 0;
  grandTotalFINALFirstTerm_III_FINAL_TERM: number = 0;
  finaltotal_III_FINAL_TERM: number = 0;



  avg_III_TERM: number = 0;
  marks_DC_CI_III_Term = 0;
  marks_comdt_III_Term = 0;

  GRAND_TOTAL_III_TERM: number = 0;
  Z: any;
  cmrks: any = [];
  cmrks_I_FINAL_TERM: any;
  cmrks_II_MID_TERM: any;
  cmrks_II_FINAL_TERM: any;
  cmrks_III_MID_TERM: any;
  cmrks_III_FINAL_TERM: any;
  ID_I_TERM: any;
  SERVICEID_I_TERM: any;
  TEMID_I_TERM: any;
  ID_II_TERM: any;
  SERVICEID_II_TERM: any;
  TEMID_II_TERM: any;
  ID_III_TERM: any;
  SERVICEID_III_TERM: any;
  TEMID_III_TERM: any;











  _G_T_I_MID_TERM :number = 0;
  _G_T_II_MID_TERM :number = 0;
  _G_T_III_MID_TERM :number = 0;
  _G_T_I_FINAL_TERM :number = 0;
  _G_T_II_FINAL_TERM :number = 0;
  _G_T_III_FINAL_TERM :number = 0;
  ASSESSMENT_MARKS_ID1: any;
  ASSESSMENT_MARKS_ID2: any;
  ASSESSMENT_MARKS_ID3: any;
  constructor(private fb: FormBuilder, private EDossierService: EDossierService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute,) {
    //alert(this.route.snapshot.queryParamMap.get('serviceId'))
    this.marks_DC_CI_I_Term=0;
    this.marks_comdt_I_Term=0;
    this.serviceID = this.route.snapshot.queryParamMap.get('Id');
    this.termid = this.route.snapshot.queryParamMap.get('termId');
    // alert(this.serviceID);

    
    this._G_T_I_MID_TERM = 0;
    this._G_T_II_MID_TERM =  0;
    this._G_T_III_MID_TERM =  0;
    this._G_T_I_FINAL_TERM =   0;
    this._G_T_II_FINAL_TERM =   0;
    this._G_T_III_FINAL_TERM =  0;


    this.AssessmentForm = this.fb.group({
      obtainedMarksBnCdr: ['', Validators.required],
      obtainedMarksCoyCdr: ['', Validators.required],
      obtainedMarksPlCdr: ['', Validators.required],
      id: ['', Validators.required],
      totalMarksBnCdr: ['', Validators.required],
      totalMarksCoyCdr: ['', Validators.required],
      totalMarksPlCdr: ['', Validators.required],
      serviceId: ['',],
      // subjectId: [''],
      status: [''],
      termId: [''],

      trgEQTNSubResult: this.fb.array([]),
      trgEQTNSubResult_I_FINAL_TERM: this.fb.array([]),
      trgEQTNSubResult2: this.fb.array([]),
      trgEQTNSubResult_II_FINAL_TERM: this.fb.array([]),
      trgEQTNSubResult3: this.fb.array([]),
      trgEQTNSubResult_III_FINAL_TERM: this.fb.array([]),
      marks_DC_CI_I_Term: ['', Validators.required],
      marks_comdt_I_Term: ['', Validators.required],
      GRAND_TOTAL_I_TERM: ['', Validators.required],
      marks_DC_CI_II_Term: ['', Validators.required],
      marks_comdt_II_Term: ['', Validators.required],
      GRAND_TOTAL_II_TERM: ['', Validators.required],
      acd_I_MID_TERM: ['', Validators.required]

    });

    console.log(this.X, this.Y, '==============');

    console.log(this.Y, '$$$$$$$$$$$$$$$$$$$')
    this.getOQMatrixDataByServiceId();
 
    this.getEDAssessmentByServiceId();

 

  }


  change(e:any){
    if(this.termid == 1){
      this.marks_DC_CI_I_Term = parseInt(e.target.value);
      this.marks_DC_CI_I_Term = this.marks_DC_CI_I_Term<=20?this.marks_DC_CI_I_Term:null;
      if(this.marks_comdt_I_Term){
       this.GRAND_TOTAL_I_TERM =  this.marks_comdt_I_Term+this.marks_DC_CI_I_Term + this.avg_I_TERM;
      }
    }
    else if(this.termid == 2){
      this.marks_DC_CI_II_Term = parseInt(e.target.value);
      this.marks_DC_CI_II_Term = this.marks_DC_CI_II_Term<=20?this.marks_DC_CI_II_Term:null;
      if(this.marks_comdt_II_Term){
      this.GRAND_TOTAL_II_TERM =  this.marks_comdt_II_Term+this.marks_DC_CI_II_Term + this.avg_II_TERM;
      }
    }

    else if(this.termid == 3){
      this.marks_DC_CI_III_Term = parseInt(e.target.value);
      this.marks_DC_CI_III_Term = this.marks_DC_CI_III_Term<=20?this.marks_DC_CI_III_Term:null;
      if(this.marks_comdt_III_Term){
      this.GRAND_TOTAL_III_TERM =  this.marks_comdt_III_Term + this.marks_DC_CI_III_Term + this.avg_III_TERM;
      }
    }
  
  }
  
  changec(e:any){
    if(this.termid == 1){
    this.marks_comdt_I_Term =parseInt(e.target.value);
    this.marks_comdt_I_Term = this.marks_comdt_I_Term<=30?this.marks_comdt_I_Term:null;
    if(this.marks_DC_CI_I_Term){
      this.GRAND_TOTAL_I_TERM =  this.marks_comdt_I_Term+this.marks_DC_CI_I_Term + this.avg_I_TERM;
     }
    }
    else if(this.termid == 2){
      this.marks_comdt_II_Term =parseInt(e.target.value);
      this.marks_comdt_II_Term = this.marks_comdt_II_Term<=30?this.marks_comdt_II_Term:null;
      if(this.marks_DC_CI_II_Term){
        this.GRAND_TOTAL_II_TERM =  this.marks_comdt_II_Term+this.marks_DC_CI_II_Term + this.avg_II_TERM;
       }
    }

    else if(this.termid == 3){
      this.marks_comdt_III_Term =parseInt(e.target.value);
      this.marks_comdt_III_Term = this.marks_comdt_III_Term<=30?this.marks_comdt_III_Term:null;
      if(this.marks_DC_CI_III_Term){
        this.GRAND_TOTAL_III_TERM =  this.marks_comdt_III_Term+this.marks_DC_CI_III_Term + this.avg_III_TERM;
       }
    }
  }

  ngOnInit(): void {
    // alert(this.serviceID);
  }
  _ED_ASSESSMENT_MARKS_DETAILS:any[]=[];

  getEDAssessmentByServiceId(){
    this.EDossierService.get_ed_final_marks(this.serviceID).subscribe(
      res => {
        if (res.status == "OK") {
          // this.mnc = "update"
         
          this._ED_ASSESSMENT_MARKS_DETAILS = res.object;


          console.log(this._ED_ASSESSMENT_MARKS_DETAILS[0],'oppppppppppppppppppppp');
  
          // this.GreenZoneForm.patchValue({
          //   title:this.greenZoneDetails[0].title,    
          //   color : this.greenZoneDetails[0].color,
          //   message : this.greenZoneDetails[0].message,
          //   });

          if(this._ED_ASSESSMENT_MARKS_DETAILS != null || this._ED_ASSESSMENT_MARKS_DETAILS[0] != null)
          {
            this.ASSESSMENT_MARKS_ID1 = this._ED_ASSESSMENT_MARKS_DETAILS[0]['id'];
            this.marks_comdt_I_Term = this._ED_ASSESSMENT_MARKS_DETAILS[0]['comdtObtainedMarks'];
            this.marks_DC_CI_I_Term=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['dcCiObtainedMarks'];
            this.GRAND_TOTAL_I_TERM=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['grandObtaionedMarks'];
            this.termId=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['termId'];
            this.serviceId=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['serviceId'];
            this.spinner.hide();         
          }   
          else if(this._ED_ASSESSMENT_MARKS_DETAILS[1]){
            this.ASSESSMENT_MARKS_ID2 = this._ED_ASSESSMENT_MARKS_DETAILS[1]['id'];
            this.marks_comdt_I_Term = this._ED_ASSESSMENT_MARKS_DETAILS[1]['comdtObtainedMarks'];
            this.marks_DC_CI_I_Term=  this._ED_ASSESSMENT_MARKS_DETAILS[1]['dcCiObtainedMarks'];
            this.GRAND_TOTAL_I_TERM=  this._ED_ASSESSMENT_MARKS_DETAILS[1]['grandObtaionedMarks'];
            this.termId=  this._ED_ASSESSMENT_MARKS_DETAILS[1]['termId'];
            this.serviceId=  this._ED_ASSESSMENT_MARKS_DETAILS[1]['serviceId'];
            this.spinner.hide();         
          }  
          else if(this._ED_ASSESSMENT_MARKS_DETAILS[2]){
            this.ASSESSMENT_MARKS_ID3 = this._ED_ASSESSMENT_MARKS_DETAILS[2]['id'];
            this.marks_comdt_I_Term = this._ED_ASSESSMENT_MARKS_DETAILS[2]['comdtObtainedMarks'];
            this.marks_DC_CI_I_Term=  this._ED_ASSESSMENT_MARKS_DETAILS[2]['dcCiObtainedMarks'];
            this.GRAND_TOTAL_I_TERM=  this._ED_ASSESSMENT_MARKS_DETAILS[2]['grandObtaionedMarks'];
            this.termId=  this._ED_ASSESSMENT_MARKS_DETAILS[2]['termId'];
            this.serviceId=  this._ED_ASSESSMENT_MARKS_DETAILS[2]['serviceId'];
            this.spinner.hide();         
          } 
          // else if(this._ED_ASSESSMENT_MARKS_DETAILS[3] != null){
          //   this.ASSESSMENT_MARKS_ID = this._ED_ASSESSMENT_MARKS_DETAILS[0]['id'];
          //   this.marks_comdt_I_Term = this._ED_ASSESSMENT_MARKS_DETAILS[0]['comdtObtainedMarks'];
          //   this.marks_DC_CI_I_Term=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['dcCiObtainedMarks'];
          //   this.GRAND_TOTAL_I_TERM=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['grandObtaionedMarks'];
          //   this.termId=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['termId'];
          //   this.serviceId=  this._ED_ASSESSMENT_MARKS_DETAILS[0]['serviceId'];
          //   this.spinner.hide();         
          // }    
         } 
        
      })

  }
  // getAssessmentAllMARKS() {
   
  // }

  SENDDATA:any = {};
  onSubmit1() {
    // alert('hi')
    this.marks_DC_CI_I_Term;
    this.marks_comdt_I_Term;
    console.log(this.AssessmentForm.value.trgEQTNSubResult[0], '1233333333333333333333333333333333');
    
    
    // this.SENDDATA['id'] = this.ID_I_TERM;
    this.SENDDATA['serviceId'] = this.SERVICEID_I_TERM;
    this.SENDDATA['termId'] = this.TEMID_I_TERM;
    this.SENDDATA['avgPrePostObtainedMarks'] =  this.avg_I_TERM;
    this.SENDDATA['preFinalTermObtainedMarks'] =  this.finaltotal_I_FINAL_TERM;
    this.SENDDATA['preMidTermObtainedMarks'] = this.finaltotal_I_MID_TERM;
    this.SENDDATA['preFinalTermTotalMarks'] =  this._G_T_I_FINAL_TERM;
    this.SENDDATA['preMidTermTotalMarks'] =  this._G_T_I_MID_TERM;
    this.SENDDATA['grandObtaionedMarks'] =  this.GRAND_TOTAL_I_TERM;
    this.SENDDATA['dcCiObtainedMarks'] =  this.marks_DC_CI_I_Term;
    this.SENDDATA['comdtObtainedMarks'] =  this.marks_comdt_I_Term;

 
    console.log(this.SENDDATA, '============+++++++++++++==========');
    if(this.ASSESSMENT_MARKS_ID1==undefined || this.ASSESSMENT_MARKS_ID1==null){
      this.EDossierService.add_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        });
    }

    else{
      // alert(this.ASSESSMENT_MARKS_ID)
     this.SENDDATA =  Object.assign(this.SENDDATA, {id: this.ASSESSMENT_MARKS_ID1});
      this.EDossierService.update_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        })
    }
   

  }

  onSubmit2() {
    // alert('hi')
    this.marks_DC_CI_II_Term;
    this.marks_comdt_II_Term;
    console.log(this.AssessmentForm.value.trgEQTNSubResult[2], '1233333333333333333333333333333333');
  
 
    // this.SENDDATA['id'] = this.ID_I_TERM;
    // this.SENDDATA['serviceId'] = this.SERVICEID_I_TERM;
    // this.SENDDATA['termId'] = this.TEMID_I_TERM;
    // this.SENDDATA['dcCiObtainedMarks'] =  this.marks_DC_CI_II_Term;;
    // this.SENDDATA['comdtObtainedMarks'] =  this.marks_comdt_II_Term;

 
    this.SENDDATA['serviceId'] = this.SERVICEID_II_TERM;
    this.SENDDATA['termId'] = this.TEMID_II_TERM;
    this.SENDDATA['avgPrePostObtainedMarks'] =  this.avg_II_TERM;
    this.SENDDATA['preFinalTermObtainedMarks'] =  this.finaltotal_II_FINAL_TERM;
    this.SENDDATA['preMidTermObtainedMarks'] = this.finaltotal_II_MID_TERM; 
    this.SENDDATA['preFinalTermTotalMarks'] =  this._G_T_II_FINAL_TERM;
    this.SENDDATA['preMidTermTotalMarks'] = this._G_T_II_MID_TERM;
    this.SENDDATA['grandObtaionedMarks'] =  this.GRAND_TOTAL_II_TERM;
    this.SENDDATA['dcCiObtainedMarks'] =  this.marks_DC_CI_II_Term;
    this.SENDDATA['comdtObtainedMarks'] = this.marks_comdt_II_Term;

 
    console.log(this.SENDDATA, '============+++++++++++++==========');
    // if(this.)
    if(this.ASSESSMENT_MARKS_ID2==undefined || this.ASSESSMENT_MARKS_ID2==null){
      this.EDossierService.add_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        });
    }
    else{
      // alert(this.ASSESSMENT_MARKS_ID)
     this.SENDDATA =  Object.assign(this.SENDDATA, {id: this.ASSESSMENT_MARKS_ID2});
      this.EDossierService.update_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        })
    }


  }

   onSubmit3() {
    // alert('hi')
    this.marks_DC_CI_III_Term;
    this.marks_comdt_III_Term;
    console.log(this.AssessmentForm.value.trgEQTNSubResult[4], '1233333333333333333333333333333333');
  
   
    this.SENDDATA['serviceId'] = this.SERVICEID_III_TERM;
    this.SENDDATA['termId'] = this.TEMID_III_TERM;
    this.SENDDATA['avgPrePostObtainedMarks'] =  this.avg_III_TERM;
    this.SENDDATA['preFinalTermObtainedMarks'] =  this.finaltotal_III_FINAL_TERM;
    this.SENDDATA['preMidTermObtainedMarks'] = this.finaltotal_III_MID_TERM; 
    this.SENDDATA['preFinalTermTotalMarks'] =  this._G_T_III_FINAL_TERM;
    this.SENDDATA['preMidTermTotalMarks'] = this._G_T_III_MID_TERM;
    this.SENDDATA['grandObtaionedMarks'] =  this.GRAND_TOTAL_III_TERM;
    this.SENDDATA['dcCiObtainedMarks'] =  this.marks_DC_CI_III_Term;
    this.SENDDATA['comdtObtainedMarks'] = this.marks_comdt_III_Term;

 
    console.log(this.SENDDATA, '============+++++++++++++==========');
    
    if(this.ASSESSMENT_MARKS_ID3==undefined || this.ASSESSMENT_MARKS_ID3==null){
      this.EDossierService.add_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        });
    }
    else{
      // alert(this.ASSESSMENT_MARKS_ID3)
     this.SENDDATA =  Object.assign(this.SENDDATA, {id: this.ASSESSMENT_MARKS_ID3});
      this.EDossierService.update_ed_final_marks(this.SENDDATA).subscribe(
        res => {
          if (res.message == "OK") {
            // this.mnc = "update"
            this.spinner.hide();
          }
  
        });
    }
 

  }
  updateAssessmentAllMARKS() {
    this.SENDDATA['serviceId'] = this.SERVICEID_II_TERM;
    this.SENDDATA['termId'] = this.TEMID_II_TERM;
    this.SENDDATA['avgPrePostObtainedMarks'] =  this.avg_II_TERM;
    this.SENDDATA['preFinalTermObtainedMarks'] =  this.finaltotal_II_FINAL_TERM;
    this.SENDDATA['preMidTermObtainedMarks'] = this.finaltotal_II_MID_TERM; 
    this.SENDDATA['preFinalTermTotalMarks'] =  this._G_T_II_FINAL_TERM;
    this.SENDDATA['preMidTermTotalMarks'] = this._G_T_II_MID_TERM;
    this.SENDDATA['grandObtaionedMarks'] =  this.GRAND_TOTAL_II_TERM;
    this.SENDDATA['dcCiObtainedMarks'] =  this.marks_DC_CI_II_Term;
    this.SENDDATA['comdtObtainedMarks'] = this.marks_comdt_II_Term;

    // this.EDossierService.update_ed_final_marks(this.SENDDATA).subscribe(
    //   res => {
    //     if (res.message == "OK") {
    //       // this.mnc = "update"
    //       this.spinner.hide();
    //     }

    //   })

  }






  getOQMatrixDataByServiceId() {

    this.EDossierService.getAssessmentOQEdossiermarksByServiceId(this.serviceID).subscribe(
      res => {
        if (res.message == "Record found successfully") {
          // this.mnc = "update"
          this.spinner.hide();
          this.obj = res.object;
        
      
          this.TERM_S_Id = this.termid;
          if (this.TERM_S_Id == 1 || this.TERM_S_Id == 2 || this.TERM_S_Id == 3) {

            if (res.object[0]) {
              this.cmrks = res.object[0].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[0].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[0].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[0].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[0].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[0].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[0].totalMarksPlCdr;
              this.ID_I_TERM =  res.object[0].id;
              this.SERVICEID_I_TERM =  res.object[0].serviceId;
              this.TEMID_I_TERM =  res.object[0].termId;
              this.cmrks.forEach(e => {
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_I_MID_TERM = this.totalPlMarks_I_MID_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_I_MID_TERM = this.totalObtainedPlMarks_I_MID_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_I_MID_TERM = this.totalCoyMarks_I_MID_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_I_MID_TERM = this.totalObtainedCoyMarks_I_MID_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_I_MID_TERM = this.totalPlMarks_I_MID_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_I_MID_TERM = this.totalObtainedBnMarks_I_MID_TERM + e.obtainedMarksBnCdr;
                this.total_I_MID_TERM = this.totalPlMarks_I_MID_TERM + this.totalCoyMarks_I_MID_TERM + this.totalBnMarks_I_MID_TERM;

                console.log(this.total_I_MID_TERM, '******');
                this.totalObtained_I_MID_TERM = this.totalObtainedPlMarks_I_MID_TERM + this.totalObtainedCoyMarks_I_MID_TERM + this.totalObtainedBnMarks_I_MID_TERM;
                // console.log(this.total,'==============');
                this.Y = this.totalObtained_I_MID_TERM;


                this.getCSubjectRes.push(this.genSubRec())

              });
              // this.getFinalTotal();
              this.AssessmentForm.patchValue({
                trgEQTNSubResult: this.cmrks,

              });
            }


            if (res.object[1]) {
              //FOR 1FINAL TERM

              this.cmrks_I_FINAL_TERM = res.object[1].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[1].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[1].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[1].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[1].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[1].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[1].totalMarksPlCdr;
           
              this.cmrks_I_FINAL_TERM.forEach(e => {
                e.marks_comdt = 0;
                e.marks_DC_CI = 0;
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_I_FINAL_TERM = this.totalPlMarks_I_FINAL_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_I_FINAL_TERM = this.totalObtainedPlMarks_I_FINAL_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_I_FINAL_TERM = this.totalCoyMarks_I_FINAL_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_I_FINAL_TERM = this.totalObtainedCoyMarks_I_FINAL_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_I_FINAL_TERM = this.totalPlMarks_I_FINAL_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_I_FINAL_TERM = this.totalObtainedBnMarks_I_FINAL_TERM + e.obtainedMarksBnCdr;
                this.total_I_FINAL_TERM = this.totalPlMarks_I_FINAL_TERM + this.totalCoyMarks_I_FINAL_TERM + this.totalBnMarks_I_FINAL_TERM;

                this.totalObtained_I_FINAL_TERM = this.totalObtainedPlMarks_I_FINAL_TERM + this.totalObtainedCoyMarks_I_FINAL_TERM + this.totalObtainedBnMarks_I_FINAL_TERM;

                //  this.Y = this.totalObtained_I_FINAL_TERM;

                this.getCSubjectRes4.push(this.genSubRec())

              });
              // this.getFinalTotal();


              this.AssessmentForm.patchValue({
                trgEQTNSubResult_I_FINAL_TERM: this.cmrks_I_FINAL_TERM,
              });
            }

          }





          // FOR 2ND TERM
          if (this.TERM_S_Id == 2 || this.TERM_S_Id == 3) {
            if (res.object[2]) {
              this.cmrks_II_MID_TERM = res.object[2].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[2].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[2].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[2].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[2].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[2].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[2].totalMarksPlCdr;
              this.ID_II_TERM =  res.object[2].id;
              this.SERVICEID_II_TERM =  res.object[2].serviceId;
              this.TEMID_II_TERM =  res.object[2].termId;
              // alert('hi')
              this.cmrks_II_MID_TERM.forEach(e => {
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_II_MID_TERM = this.totalPlMarks_II_MID_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_II_MID_TERM = this.totalObtainedPlMarks_II_MID_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_II_MID_TERM = this.totalCoyMarks_II_MID_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_II_MID_TERM = this.totalObtainedCoyMarks_II_MID_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_II_MID_TERM = this.totalPlMarks_II_MID_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_II_MID_TERM = this.totalObtainedPlMarks_II_MID_TERM + e.obtainedMarksBnCdr;
                this.total_II_MID_TERM = this.totalPlMarks_II_MID_TERM + this.totalCoyMarks_II_MID_TERM + this.totalBnMarks_II_MID_TERM;


                this.totalObtained_II_MID_TERM = this.totalObtainedPlMarks_II_MID_TERM + this.totalObtainedCoyMarks_II_MID_TERM + this.totalObtainedBnMarks_II_MID_TERM;
                // console.log(this.total,'==============');
                this.Y = this.totalObtained_II_MID_TERM;

                this.getCSubjectRes2.push(this.genSubRec())

              });
           //   this.getFinalTotal();
              // console.log( this.obj ,'111111111');

              // console.log(this.cmrks_II_MID_TERM,'******');
              this.AssessmentForm.patchValue({
                trgEQTNSubResult2: this.cmrks_II_MID_TERM,
              })
            }
            if (res.object[3]) {
              //FOR 2 FINAL TERM

              this.cmrks_II_FINAL_TERM = res.object[3].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[3].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[3].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[3].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[3].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[3].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[3].totalMarksPlCdr;
              console.log(this.cmrks_II_FINAL_TERM, '0000000000000000000000000000000000000')
              this.cmrks_II_FINAL_TERM.forEach(e => {
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_II_FINAL_TERM = this.totalPlMarks_II_FINAL_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_II_FINAL_TERM = this.totalObtainedPlMarks_II_FINAL_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_II_FINAL_TERM = this.totalCoyMarks_II_FINAL_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_II_FINAL_TERM = this.totalObtainedCoyMarks_II_FINAL_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_II_FINAL_TERM = this.totalPlMarks_II_FINAL_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_II_FINAL_TERM = this.totalObtainedBnMarks_II_FINAL_TERM + e.obtainedMarksBnCdr;
                this.total_II_FINAL_TERM = this.totalPlMarks_II_FINAL_TERM + this.totalCoyMarks_II_FINAL_TERM + this.totalBnMarks_II_FINAL_TERM;

                console.log(this.total_II_FINAL_TERM, '******');
                this.totalObtained_II_FINAL_TERM = this.totalObtainedPlMarks_II_FINAL_TERM + this.totalObtainedCoyMarks_II_FINAL_TERM + this.totalObtainedBnMarks_II_FINAL_TERM;

                //  this.Y = this.totalObtained_I_FINAL_TERM;

                this.getCSubjectRes5.push(this.genSubRec())

              });
            //  this.getFinalTotal();


              this.AssessmentForm.patchValue({
                trgEQTNSubResult_II_FINAL_TERM: this.cmrks_II_FINAL_TERM,
              });

            }

          }




          // FOR TERM 3

          if (this.TERM_S_Id == 3 || this.TERM_S_Id == 7) {
            if (res.object[4]) {
              this.cmrks_III_MID_TERM = res.object[4].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[4].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[4].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[4].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[4].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[4].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[4].totalMarksPlCdr;
              this.ID_III_TERM =  res.object[4].id;
              this.SERVICEID_III_TERM =  res.object[4].serviceId;
              this.TEMID_III_TERM =  res.object[4].termId;


              this.cmrks_III_MID_TERM.forEach(e => {
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_III_MID_TERM = this.totalPlMarks_III_MID_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_III_MID_TERM = this.totalObtainedPlMarks_III_MID_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_III_MID_TERM = this.totalCoyMarks_III_MID_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_III_MID_TERM = this.totalObtainedCoyMarks_III_MID_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_III_MID_TERM = this.totalPlMarks_III_MID_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_III_MID_TERM = this.totalObtainedPlMarks_III_MID_TERM + e.obtainedMarksBnCdr;
                this.total_III_MID_TERM = this.totalPlMarks_III_MID_TERM + this.totalCoyMarks_III_MID_TERM + this.totalBnMarks_III_MID_TERM;


                this.totalObtained_III_MID_TERM = this.totalObtainedPlMarks_III_MID_TERM + this.totalObtainedCoyMarks_III_MID_TERM + this.totalObtainedBnMarks_III_MID_TERM;
                // console.log(this.total,'==============');
                this.Y = this.totalObtained_III_MID_TERM;

                this.getCSubjectRes3.push(this.genSubRec())

              });
             // this.getFinalTotal();
              console.log(this.obj, '111111111');

              console.log(this.cmrks_III_MID_TERM, '******');
              this.AssessmentForm.patchValue({
                trgEQTNSubResult3: this.cmrks_III_MID_TERM,
              });
            }
            if (res.object[5]) {

              //FOR 3 FINAL TERM

              this.cmrks_III_FINAL_TERM = res.object[5].oqSubjectResult;
              this.obtainedMarksBnCdr = res.object[5].obtainedMarksBnCdr;
              this.obtainedMarksCoyCdr = res.object[5].obtainedMarksCoyCdr;
              this.obtainedMarksPlCdr = res.object[5].obtainedMarksPlCdr;
              this.totalMarksBnCdr = res.object[5].totalMarksBnCdr;
              this.totalMarksCoyCdr = res.object[5].totalMarksCoyCdr;
              this.totalMarksPlCdr = res.object[5].totalMarksPlCdr;
              console.log(this.cmrks_III_FINAL_TERM, '0000000000000000000000000000000000000')
              this.cmrks_III_FINAL_TERM.forEach(e => {
                e.totalPLBNCOYObtainedMarks = e.obtainedMarksPlCdr + e.obtainedMarksCoyCdr + e.obtainedMarksBnCdr;
                e.totalBNPLCOYMarks = e.totalMarksPlCdr + e.totalMarksCoyCdr + e.totalMarksBnCdr;

                e.id = e.id;
                this.totalPlMarks_III_FINAL_TERM = this.totalPlMarks_III_FINAL_TERM + e.totalMarksPlCdr;
                this.totalObtainedPlMarks_III_FINAL_TERM = this.totalObtainedPlMarks_III_FINAL_TERM + e.obtainedMarksPlCdr;
                this.totalCoyMarks_III_FINAL_TERM = this.totalCoyMarks_III_FINAL_TERM + e.totalMarksCoyCdr;
                this.totalObtainedCoyMarks_III_FINAL_TERM = this.totalObtainedCoyMarks_III_FINAL_TERM + e.obtainedMarksCoyCdr;
                this.totalBnMarks_III_FINAL_TERM = this.totalPlMarks_III_FINAL_TERM + e.totalMarksBnCdr;
                this.totalObtainedBnMarks_III_FINAL_TERM = this.totalObtainedBnMarks_III_FINAL_TERM + e.obtainedMarksBnCdr;
                this.total_III_FINAL_TERM = this.totalPlMarks_III_FINAL_TERM + this.totalCoyMarks_III_FINAL_TERM + this.totalBnMarks_III_FINAL_TERM;

                console.log(this.total_III_FINAL_TERM, '******');
                this.totalObtained_III_FINAL_TERM = this.totalObtainedPlMarks_III_FINAL_TERM + this.totalObtainedCoyMarks_III_FINAL_TERM + this.totalObtainedBnMarks_III_FINAL_TERM;

                //  this.Y = this.totalObtained_I_FINAL_TERM;

                this.getCSubjectRes6.push(this.genSubRec())

              });
              // this.getFinalTotal();


              this.AssessmentForm.patchValue({
                trgEQTNSubResult_III_FINAL_TERM: this.cmrks_III_FINAL_TERM,
              });
            }

          }

        }
        console.log(this.cmrks, '################3');

        this._G_T_I_MID_TERM = this.total_I_MID_TERM + 50;;
        this._G_T_II_MID_TERM =  this.total_II_MID_TERM + 50;
        this._G_T_III_MID_TERM =  this.total_III_MID_TERM + 50;
        this._G_T_I_FINAL_TERM =  this.total_I_FINAL_TERM + 50;
        this._G_T_II_FINAL_TERM =  this.total_II_FINAL_TERM + 50;
        this._G_T_III_FINAL_TERM =  this.total_III_FINAL_TERM + 50;
    
       console.log(this._G_T_I_MID_TERM, '[]][][][][][]');
       console.log(this._G_T_II_MID_TERM, '[]][][][][][]');;
       console.log(this._G_T_III_MID_TERM, '[]][][][][][]');
       console.log(this._G_T_I_FINAL_TERM, '[]][][][][][]');
       console.log(this._G_T_II_FINAL_TERM, '[]][][][][][]');
       console.log(this._G_T_III_FINAL_TERM, '[]][][][][][]');
        this.getAssessmentOQEdossierMarksOQMatrixDrillEqtn();
        // this.getFinalTotal();
      });
   

  }



  public get getCSubjectRes() {
    return this.AssessmentForm.get('trgEQTNSubResult') as FormArray;
  }
  public get getCSubjectRes2() {
    return this.AssessmentForm.get('trgEQTNSubResult2') as FormArray;
  }
  public get getCSubjectRes3() {
    return this.AssessmentForm.get('trgEQTNSubResult3') as FormArray;
  }
  public get getCSubjectRes4() {
    return this.AssessmentForm.get('trgEQTNSubResult_I_FINAL_TERM') as FormArray;
  }
  public get getCSubjectRes5() {
    return this.AssessmentForm.get('trgEQTNSubResult_II_FINAL_TERM') as FormArray;
  }
  public get getCSubjectRes6() {
    return this.AssessmentForm.get('trgEQTNSubResult_III_FINAL_TERM') as FormArray;
  }
  genSubRec() {
    return this.fb.group({
      id: [''],
      obtainedMarksBnCdr: [''],
      obtainedMarksCoyCdr: [''],
      obtainedMarksPlCdr: [''],
      totalMarksBnCdr: [''],
      totalMarksCoyCdr: [''],
      totalMarksPlCdr: [''],
      totalPLBNCOYObtainedMarks: [''],
      totalBNPLCOYMarks: [''],
      serviceId: [''],
      status: ['1'],
      subjectId: [''],
      subjectName: [''],
      termId: [''],
      totalMarks: [''],
      remarks: [''],
      marks_DC_CI: [''],
      marks_comdt: [''],
    })
  }

  getFinalTotal() {

    console.log(this.totalObtained_I_MID_TERM, this.totalacdoqeqtndrill_I_MID_TERM);
    this.finaltotal_I_MID_TERM = this.totalObtained_I_MID_TERM + this.totalacdoqeqtndrill_I_MID_TERM;
    this.finaltotal_II_MID_TERM = this.totalObtained_II_MID_TERM + this.totalacdoqeqtndrill_II_MID_TERM;
    this.finaltotal_III_MID_TERM = this.totalObtained_III_MID_TERM + this.totalacdoqeqtndrill_III_MID_TERM;
    this.finaltotal_I_FINAL_TERM = this.totalObtained_I_FINAL_TERM + this.totalacdoqeqtndrill_I_FINAL_TERM;
    this.finaltotal_II_FINAL_TERM = this.totalObtained_II_FINAL_TERM + this.totalacdoqeqtndrill_II_FINAL_TERM;
    this.finaltotal_III_FINAL_TERM = this.totalObtained_III_FINAL_TERM + this.totalacdoqeqtndrill_III_FINAL_TERM;
    this.calculateGRANDTOTAL();
    //  alert(this.finaltotal_I_MID_TERM);
  }


  calculateGRANDTOTAL() {
    // alert(this.finaltotal_II_MID_TERM);
    // alert(this.finaltotal_II_FINAL_TERM)

    this.avg_I_TERM = (this.finaltotal_I_MID_TERM + this.finaltotal_I_FINAL_TERM) / 2;
    // alert(this.avg_I_TERM)
    this.avg_II_TERM = (this.finaltotal_II_MID_TERM + this.finaltotal_II_FINAL_TERM) / 2;
    // alert(this.avg_II_TERM)
   
    this.avg_III_TERM = (this.finaltotal_III_MID_TERM + this.finaltotal_III_FINAL_TERM) / 2;
    // alert(this.avg_III_TERM)
    
    this.GRAND_TOTAL_I_TERM = this.avg_I_TERM + this.marks_DC_CI_I_Term + this.marks_comdt_I_Term;
    this.GRAND_TOTAL_II_TERM = this.avg_I_TERM + this.marks_DC_CI_I_Term + this.marks_comdt_I_Term;
    this.GRAND_TOTAL_III_TERM = this.avg_I_TERM + this.marks_DC_CI_I_Term + this.marks_comdt_I_Term;
    console.log(this.GRAND_TOTAL_I_TERM ,this.GRAND_TOTAL_II_TERM, this.GRAND_TOTAL_III_TERM,'mmmmmmmmmmmmmmmmmmmmmmmm');

  }
  getAssessmentOQEdossierMarksOQMatrixDrillEqtn() {
  console.log(this.cmrks,'_______________________-------____________---');
    this.EDossierService.getAssessmentOQEdossierMarksOQMatrixDrillEqtn(this.serviceID).subscribe(
      res => {
        if (res.message == "OK") {
          // this.mnc = "update"
          this.spinner.hide();
          let obj = res.object;

          console.log(obj, 'iiiiiiiiiiiiiiiiii');
          if (obj.term1 != null || obj.term1 != undefined) {
            this.oqEqtn_I_MID_TERM = res.object.term1.oqEqtn?res.object.term1.oqEqtn[0].obtainedMarks : 0;
            this.acd_I_MID_TERM = res.object.term1.oqMatrix?res.object.term1.oqMatrix[0].obtainedMarks : 0;
            this.drill_I_MID_TERM = res.object.term1.oqDrill?res.object.term1.oqDrill[0].obtainedMarks : 0;

            // console.log( this.drill_I_MID_TERM, this.oqEqtn_I_MID_TERM, this.acd_I_MID_TERM, '=====================');


            this.totalacdoqeqtndrill_I_MID_TERM = this.acd_I_MID_TERM + this.oqEqtn_I_MID_TERM + this.drill_I_MID_TERM;
            // console.log( this.totalacdoqeqtndrill_I_MID_TERM,'=====================');
          

            this.oqEqtn_I_FINAL_TERM = res.object.term1.oqEqtn?res.object.term1.oqEqtn[1].obtainedMarks : 0;
            this.acd_I_FINAL_TERM = res.object.term1.oqMatrix?res.object.term1.oqMatrix[1].obtainedMarks : 0;
            this.drill_I_FINAL_TERM = res.object.term1.oqDrill?res.object.term1.oqDrill[1].obtainedMarks : 0;

            this.totalacdoqeqtndrill_I_FINAL_TERM = this.acd_I_FINAL_TERM + this.oqEqtn_I_FINAL_TERM + this.drill_I_FINAL_TERM;

            this.getFinalTotal();
          }
          if (obj.term2 != null || obj.term2 != undefined) {

            this.oqEqtn_II_MID_TERM = res.object.term2.oqEqtn?res.object.term2.oqEqtn[2].obtainedMarks : 0;
            console.log(res.object.term2.oqEqtn[2].obtainedMarks, '---------------@@@@@@@@@@@@@@@@@@@@@');
            this.acd_II_MID_TERM = res.object.term2.oqMatrix?res.object.term2.oqMatrix[2].obtainedMarks : 0;

            this.drill_II_MID_TERM = res.object.term2.oqDrill?res.object.term2.oqDrill[2].obtainedMarks : 0;

            console.log(this.acd_II_MID_TERM, this.oqEqtn_II_MID_TERM, this.drill_II_MID_TERM, '=====================');

            this.totalacdoqeqtndrill_II_MID_TERM = this.acd_II_MID_TERM + this.oqEqtn_II_MID_TERM + this.drill_II_MID_TERM;
          

            this.oqEqtn_II_FINAL_TERM = res.object.term2.oqEqtn?res.object.term2.oqEqtn[3].obtainedMarks : 0;
            console.log(res.object.term2.oqEqtn[3].obtainedMarks, '---------------@@@@@@@@@@@@@@@@@@@@@');
            this.acd_II_FINAL_TERM = res.object.term2.oqMatrix?res.object.term2.oqMatrix[3].obtainedMarks : 0;

            this.drill_II_FINAL_TERM = res.object.term2.oqDrill.length>3?res.object.term2.oqDrill[3].obtainedMarks : 0;

            console.log(this.acd_II_FINAL_TERM, this.oqEqtn_II_FINAL_TERM, this.drill_II_FINAL_TERM, '=====================');

            this.totalacdoqeqtndrill_II_FINAL_TERM = this.acd_II_FINAL_TERM + this.oqEqtn_II_FINAL_TERM + this.drill_II_FINAL_TERM;
          
            this.getFinalTotal();
          }

           if(obj.term3!=null || obj.term3!=undefined){
            this.oqEqtn_III_MID_TERM = res.object.term3.oqEqtn.length>4?res.object.term3.oqEqtn[4].obtainedMarks:0 ;
            console.log(res.object.term3.oqEqtn[4],'@@@@@@@@@@@@@@@@@@@@@')
            this.acd_III_MID_TERM = res.object.term3.oqMatrix.length>4?res.object.term3.oqMatrix[4].obtainedMarks:0;
            this.drill_III_MID_TERM = res.object.term3.oqDrill.length>4?res.object.term3.oqDrill[4].obtainedMarks:0;
            this.totalacdoqeqtndrill_III_MID_TERM =this.acd_III_MID_TERM+ this.oqEqtn_III_MID_TERM+this.drill_III_MID_TERM;
            console.log( this.totalacdoqeqtndrill_III_FINAL_TERM,'=====================');
          

            this.oqEqtn_III_FINAL_TERM = res.object.term3.oqEqtn.length>5?res.object.term3.oqEqtn[5].obtainedMarks:0 ;
            console.log(res.object.term3.oqEqtn[5],'@@@@@@@@@@@@@@@@@@@@@')
            this.acd_III_FINAL_TERM = res.object.term3.oqMatrix.length>5?res.object.term3.oqMatrix[5].obtainedMarks:0;
            this.drill_III_FINAL_TERM = res.object.term3.oqDrill.length>5?res.object.term3.oqDrill[5].obtainedMarks:0;
            this.totalacdoqeqtndrill_III_FINAL_TERM =this.acd_III_FINAL_TERM+ this.oqEqtn_III_FINAL_TERM+this.drill_III_FINAL_TERM;
            console.log( this.totalacdoqeqtndrill_III_FINAL_TERM,'=====================');
          
            this.getFinalTotal();
          }




        }
      }
    )
  }

}
