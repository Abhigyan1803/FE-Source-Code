import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-pt',
  templateUrl: './pt.component.html',
  styleUrls: ['./pt.component.scss']
})
export class PtComponent implements OnInit {

  hasAccess: boolean = true;
  attemptTypes: any[] = ['M1', 'M2', 'C1', 'C2']
  serviceId: string = '';

  cadetDetails: any = {};

  

  _I_termData: any = {};

  _II_techData: any = {};

  _II_termData: any = {};

  _III_termData: any = {};

  constructor(private service: EDossierService, private router: Router, private fb: FormBuilder, private sharedService: SharedService
    , private spinner: NgxSpinnerService
  ) {
    service.cadetObj.subscribe(
      object => {
        // console.log("CADET: ", object);
        if(!object){
          this.router.navigate(['/e-dossior/ed-content/Ed-dashboard'])
        } else{
          this.cadetDetails = JSON.parse(object)
        }
      }
    )

    // this.cadetDetails = JSON.parse(localStorage.getItem('cadet'))
    this.serviceId = this.cadetDetails.serviceId;

    this.cadetDetails.rank = (this.cadetDetails.nationality == 'India') ? 'GC' : 'FGC';

  }

  ngOnInit(): void {
    this._I_termData = {
      termId: 1,
      dataAvailable: false,
      subjects: [],
      motivationalAwards: {
        blazer: '0',
        blue: '0',
        halfBlue: '0',
        meritCard: '0',
        obtainedMarks: 0,
        serviceId: this.cadetDetails.serviceId,
        status: 1,
        termId: 1,
        totalMarks: 0
      },
      totalObtainedMarks: 0
    };
  
    this._II_techData = {
      termId: 7,
      dataAvailable: false,
      subjects: [],
      motivationalAwards: {
        blazer: 0,
        blue: 0,
        halfBlue: 0,
        meritCard: 0,
        obtainedMarks: '',
        serviceId: this.cadetDetails.serviceId,
        status: 1,
        termId: 7,
        totalMarks: ''
      },
      totalObtainedMarks: 0
  
    };
  
    this._II_termData = {
      termId: 2,
      dataAvailable: false,
      subjects: [],
      motivationalAwards: {
        blazer: 0,
        blue: 0,
        halfBlue: 0,
        meritCard: 0,
        obtainedMarks: '',
        serviceId: this.cadetDetails.serviceId,
        status: 1,
        termId: 2,
        totalMarks: ''
      },
      totalObtainedMarks: 0
  
    };
  
    this._III_termData = {
      termId: 3,
      dataAvailable: false,
      subjects: [],
      motivationalAwards: {
        blazer: 0,
        blue: 0,
        halfBlue: 0,
        meritCard: 0,
        obtainedMarks: '',
        serviceId: this.cadetDetails.serviceId,
        status: 1,
        termId: 3,
        totalMarks: ''
      },
      totalObtainedMarks: 0
  
    };
  

  }


  ngAfterViewInit() {
    this.getPTRecords()
    this.getMotivationalAwards()
  }


  goBack() {
    window.history.back()
  }




  getPTRecords() {
    this.spinner.show()
    this.service.getPT_RecordsOfCadet(this.serviceId).subscribe(
      res => {

        console.log(res);

        if(res.object){
          const source = from(res.object);
          const find_I_Term = source.pipe(filter((obj: any) => obj.termId === 1));
          const subscribe_I_term = find_I_Term.subscribe(
            val => {
              //  console.log(JSON.stringify(val))
              if (val) {
                this._I_termData.dataAvailable = true;
                this._I_termData.subjects.push(val)
  
  
              }
            }
          );
  
          const find_II_Tech = source.pipe(filter((obj: any) => obj.termId === 7));
          const subscribe_II_tech = find_II_Tech.subscribe(
            val => {
              //  console.log(JSON.stringify(val))
              if (val) {
                this._II_techData.dataAvailable = true;
                this._II_techData.subjects.push(val)
  
              }
            }
          );
         
  
          const find_II_Term = source.pipe(filter((obj: any) => obj.termId === 2));
          const subscribe_II_term = find_II_Term.subscribe(
            val => {
              //  console.log(JSON.stringify(val))
              if (val) {
                this._II_termData.dataAvailable = true;
                this._II_termData.subjects.push(val)
  
              }
            }
          );
  
          const find_III_Term = source.pipe(filter((obj: any) => obj.termId === 3));
          const subscribe_III_term = find_III_Term.subscribe(
            val => {
              //  console.log(JSON.stringify(val))
              if (val) {
                this._III_termData.dataAvailable = true;
                this._III_termData.subjects.push(val)
              }
            }
          );
  
          if (this._I_termData.dataAvailable) {
            this.getTotalMarksIterm()
          }
          if (this._II_termData.dataAvailable) {
            this.getTotalMarksIIterm()
          } 
          if (this._III_termData.dataAvailable) {
            this.getTotalMarksIIIterm()
          }
          if (this._II_techData.dataAvailable) {
            this.getTotalMarksIItech()
          }

        }
       
        console.log('I term', this._I_termData);
        console.log('II term', this._II_termData);
        console.log('II tech', this._II_techData);
        console.log('III term', this._III_termData);

        this.spinner.hide();
      }
    )

  }

  getMotivationalAwards() {
    this.service.getPT_MotivationalAwards(this.cadetDetails.serviceId, 1).subscribe(
      res => {
        
        if (res.status == "OK") {
          if (res.object) {
            Object.assign(this._I_termData.motivationalAwards, res.object)
            delete this._I_termData.motivationalAwards.createdAt
            delete this._I_termData.motivationalAwards.updatedAt

          }
        }

      }
    )

    this.service.getPT_MotivationalAwards(this.cadetDetails.serviceId, 2).subscribe(
      res => {
  
        if (res.status == "OK") {
          if (res.object) {
            Object.assign(this._II_termData.motivationalAwards, res.object)
            delete this._II_termData.motivationalAwards.createdAt
            delete this._II_termData.motivationalAwards.updatedAt
          }
        }

      }
    )

    this.service.getPT_MotivationalAwards(this.cadetDetails.serviceId, 3).subscribe(
      res => {
        
        if (res.status == "OK") {
          if (res.object) {
            Object.assign(this._III_termData.motivationalAwards, res.object)
            delete this._III_termData.motivationalAwards.createdAt
            delete this._III_termData.motivationalAwards.updatedAt
          }
        }
      }
    )

    this.service.getPT_MotivationalAwards(this.cadetDetails.serviceId, 7).subscribe(
      res => {
        
        if (res.status == "OK") {
          if (res.object) {
            Object.assign(this._II_techData.motivationalAwards, res.object)
            delete this._II_techData.motivationalAwards.createdAt
            delete this._II_techData.motivationalAwards.updatedAt
          }
        }
      }
    )

  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  patchMarksIterm(event: any, subject, obj, i, j, type) {
    // console.log(obj);
    let value = event.target.value;
    if (value > obj.totalMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
      obj.resultGrade = '';
      if(type == 'M1'){
        obj.m1ObtainedMarks = ''
      } else if(type == 'M2'){
        obj.m2ObtainedMarks = ''
      } else if(type == 'C1'){
        obj.c1ObtainedMarks = ''
      } else if(type == 'C2'){
        obj.c2ObtainedMarks = ''
      }
      event.preventDefault();
      return false;
    } else {
      if (value) {
        if (obj.subjectType === "PPT") {
          if (obj.subjectName == '2.4KM' || obj.subjectName == 'C/UP' || obj.subjectName == 'TOE TOUCH') {
            if (value >= 9) {
              if (value == 20) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 19) {
                obj.resultGrade = 'S/EX-2';
              } else if (value >= 17 && value <= 18) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 17 && value >= 15) {
                obj.resultGrade = 'EX';
              } else if (value < 15 && value >= 12) {
                obj.resultGrade = 'GOOD';
              } else if (value < 12 && value >= 9) {
                obj.resultGrade = 'SAT';
              }

              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }


          } else if (obj.subjectName == '5/MTR' || obj.subjectName == 'SIT/UP') {

            if (value >= 6) {
              if (value == 15) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 14) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 13) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 12) {
                obj.resultGrade = 'EX';
              } else if (value < 12 && value >= 9) {
                obj.resultGrade = 'GOOD';
              } else if (value < 9 && value >= 6) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }



          } else if (obj.subjectName == '100 MTR') {

            if (value >= 5) {
              if (value == 10) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 9) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 8) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 7) {
                obj.resultGrade = 'EX';
              } else if (value == 6) {
                obj.resultGrade = 'GOOD';
              } else if (value == 5) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }


          }



        } else if (obj.subjectType === "IPET") {

          if (obj.subjectName == '3rd CL ROPE(3 MTR CLIMB)' || obj.subjectName == 'BEAM (2 REP)'
            || obj.subjectName == 'A/VAULT (III CL)' || obj.subjectName == 'CW/F/ROLL') {
            if (value >= 4) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName == 'BACK ROLL' || obj.subjectName == 'DIVE ROLL') {
            if (value >= 2) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          }

        } else if (obj.subjectType === "SWM") {
          if (obj.subjectName == '6.5 MTR JUMP' || obj.subjectName == '150 MTR SWM'
            || obj.subjectName == '100 MTR SWM' || obj.subjectName == '50 MTR SWM') {
            if (value >= 2) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName == '5 MTR JUMP') {
            if (value >= 4) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName == '25 MTR SWM') {
            if (value >= 6) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          }
        } else if (obj.subjectType === "SOT") {
          if (value >= 12) {
            if (value == 30) {
              obj.resultGrade = 'S/EX-1';
            } else if (value < 30 && value >= 28) {
              obj.resultGrade = 'S/EX-2';
            } else if (value < 28 && value >= 26) {
              obj.resultGrade = 'S/EX-3';
            } else if (value < 26 && value >= 24) {
              obj.resultGrade = 'EX';
            } else if (value < 24 && value >= 18) {
              obj.resultGrade = 'GOOD';
            } else if (value < 18 && value >= 12) {
              obj.resultGrade = 'SAT';
            }

            obj.clearedIn = type;


          } else {
            obj.resultGrade = 'Failed';
          }
        }
        this.calculateMarks(subject)
        
        if(obj.termId == 1){
          this.getTotalMarksIterm()
        } else if(obj.termId == 7){
          this.getTotalMarksIItech()

        }

      } else {
        obj.resultGrade = ''
        this.calculateMarks(subject)
      
      }

    }

  }

  patchMarksIIterm(event: any, subject, obj, i, j, type) {
    // console.log(obj);
    let value = event.target.value;
    if (value > obj.totalMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
      obj.resultGrade = '';
      if(type == 'M1'){
        obj.m1ObtainedMarks = ''
      } else if(type == 'M2'){
        obj.m2ObtainedMarks = ''
      } else if(type == 'C1'){
        obj.c1ObtainedMarks = ''
      } else if(type == 'C2'){
        obj.c2ObtainedMarks = ''
      }
      event.preventDefault();
      return false;
    } else {
      if (value) {
        if (obj.subjectType === "PPT") {
          if (obj.subjectName == '2.4KM' || obj.subjectName == 'C/UP' || obj.subjectName == 'TOE TOUCH') {
            if (value >= 9) {
              if (value == 20) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 19) {
                obj.resultGrade = 'S/EX-2';
              } else if (value >= 17 && value <= 18) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 17 && value >= 15) {
                obj.resultGrade = 'EX';
              } else if (value < 15 && value >= 12) {
                obj.resultGrade = 'GOOD';
              } else if (value < 12 && value >= 9) {
                obj.resultGrade = 'SAT';
              }

              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }


          } else if (obj.subjectName == '5/MTR' || obj.subjectName == 'SIT/UP') {

            if (value >= 6) {
              if (value == 15) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 14) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 13) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 12) {
                obj.resultGrade = 'EX';
              } else if (value < 12 && value >= 9) {
                obj.resultGrade = 'GOOD';
              } else if (value < 9 && value >= 6) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }



          } else if (obj.subjectName == '100 MTR') {

            if (value >= 5) {
              if (value == 10) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 9) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 8) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 7) {
                obj.resultGrade = 'EX';
              } else if (value == 6) {
                obj.resultGrade = 'GOOD';
              } else if (value == 5) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;

            } else {
              obj.resultGrade = 'Failed';
            }


          }



        } else if (obj.subjectType === "IPET") {

          if (value >= 4) {
            obj.resultGrade = 'Pass'
            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed'
          }

        } else if (obj.subjectType === "SWM") {
          if (obj.subjectName == '10 MTR JUMP' || obj.subjectName == '200 MTR SWM'
            || obj.subjectName == '150 MTR SWM' || obj.subjectName == '100 MTR SWM') {
            if (value >= 2) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName == '6.5 MTR JUMP') {
            if (value >= 4) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName == '35 MTR SWM') {
            if (value >= 6) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          }

        } else if (obj.subjectType === "CTOT") {
          if(value >= 2){
            obj.resultGrade = 'Pass'
            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed'
          }
        }
        
        this.calculateMarks(subject)
        this.getTotalMarksIIterm()

      } else {
        obj.resultGrade = ''
      }

    }

  }

  patchMarksIIIterm(event: any, subject, obj, i, j, type) {
    // console.log(obj);
    let value = event.target.value;
    if (value > obj.totalMarks || value < 0) {
      this.sharedService.openErrorSnackbarWithSeconds("Please Enter Correct Marks. Neither Marks Should be Greater than Subject's Maximum Marks Nor Negative(-).", 10)
      event.target.value = ''
      obj.resultGrade = '';
      if(type == 'M1'){
        obj.m1ObtainedMarks = ''
      } else if(type == 'M2'){
        obj.m2ObtainedMarks = ''
      } else if(type == 'C1'){
        obj.c1ObtainedMarks = ''
      } else if(type == 'C2'){
        obj.c2ObtainedMarks = ''
      }
      event.preventDefault();
      return false;
    } else {
      if (value) {
        if (obj.subjectType === "PPT") {
        
          if (obj.subjectName == '2.4KM' || obj.subjectName == 'C/UP' || obj.subjectName == 'TOE TOUCH') {

            if (value >= 4) {

              if (value == 12) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 11) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 10) {
                obj.resultGrade = 'S/EX-3';
              } else if (value < 10 && value >= 8) {
                obj.resultGrade = 'EX';
              } else if (value < 8 && value >= 6) {
                obj.resultGrade = 'GOOD';
              } else if (value < 6 && value >= 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;


            } else {
              obj.resultGrade = 'Failed';

            }



          } else if (obj.subjectName == '5/MTR') {

            if (value >= 4) {

              if (value == 11) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 10) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 9) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 8) {
                obj.resultGrade = 'EX';
              } else if (value < 8 && value >= 6) {
                obj.resultGrade = 'GOOD';
              } else if (value < 6 && value >= 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed';
            }


          } if (obj.subjectName == 'SIT/UP' || obj.subjectName == '100 MTR') {

            if (value >= 4) {

              if (value == 9) {
                obj.resultGrade = 'S/EX-1';
              } else if (value == 8) {
                obj.resultGrade = 'S/EX-2';
              } else if (value == 7) {
                obj.resultGrade = 'S/EX-3';
              } else if (value == 6) {
                obj.resultGrade = 'EX';
              } else if (value == 5) {
                obj.resultGrade = 'GOOD';
              } else if (value == 4) {
                obj.resultGrade = 'SAT';
              }
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed';
            }


          } if (obj.subjectName == '2nd CL Rope (4 Mtr Climb)') {

            if (value == 10) {
                obj.resultGrade = 'Pass';
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed';
            }


          }




        } else if (obj.subjectType === "SWM") {

          if (obj.subjectName.trim() == '250 MTR SWM' || obj.subjectName.trim() == '200 MTR SWM'
            || obj.subjectName.trim() == '150 MTR SWM' || obj.subjectName.trim() == '100 MTR SWM') {
            if (value >= 2) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName.trim() == '10 MTR JUMP') {
            if (value >= 4) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          } else if (obj.subjectName.trim() == '50 MTR SWM') {
            if (value >= 6) {
              obj.resultGrade = 'Pass'
              obj.clearedIn = type;
            } else {
              obj.resultGrade = 'Failed'
            }
          }

        } else if (obj.subjectType === "ROT") {
          
        if (value >= 12) {
          if (value == 30) {
            obj.resultGrade = 'S/EX-1';
          } else if (value < 30 && value >= 28) {
            obj.resultGrade = 'S/EX-2';
          } else if (value == 27) {
            obj.resultGrade = 'S/EX-3';
          } else if (value == 26) {
            obj.resultGrade = 'EX-1';
          } else if (value == 25) {
            obj.resultGrade = 'EX-2';
          } else if (value == 24) {
            obj.resultGrade = 'EX-3';
          } else if (value < 24 && value >= 22) {
            obj.resultGrade = 'GD-1';
          } else if (value < 22 && value >= 20) {
            obj.resultGrade = 'GD-2';
          } else if (value < 20 && value >= 18) {
            obj.resultGrade = 'GD-3';
          } else if (value < 18 && value >= 16) {
            obj.resultGrade = 'SAT-1';
          } else if (value < 16 && value >= 14) {
            obj.resultGrade = 'SAT-2';
          } else if (value < 14 && value >= 12) {
            obj.resultGrade = 'SAT-3';
          }

          obj.clearedIn = type;

        } else {
          obj.resultGrade = 'Failed';
        }
        } else if (obj.subjectType === "BPET") {
          
        if (obj.subjectName == '5 KM') {

          if (value >= 10) {

            if (value == 25) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 24) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 23) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 22) {
              obj.resultGrade = 'EX-1';
            } else if (value == 21) {
              obj.resultGrade = 'EX-2';
            } else if (value == 20) {
              obj.resultGrade = 'EX-3';
            } else if (value == 19) {
              obj.resultGrade = 'GOOD-1';
            } else if (value < 19 && value >= 17) {
              obj.resultGrade = 'GOOD-2';
            } else if (value < 17 && value >= 15) {
              obj.resultGrade = 'GOOD-3';
            } else if (value == 14) {
              obj.resultGrade = 'SAT-1';
            } else if (value < 14 && value >= 12) {
              obj.resultGrade = 'SAT-2';
            } else if (value < 12 && value >= 10) {
              obj.resultGrade = 'SAT-3';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == '60 MTR') {

          if (value >= 6) {

            if (value == 15) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 14) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 13) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 12) {
              obj.resultGrade = 'EX';
            } else if (value < 12 && value >= 9) {
              obj.resultGrade = 'GOOD';
            } else if (value < 9 && value >= 6) {
              obj.resultGrade = 'SAT';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == "V/ROPE 4 MTR CLIMB") {

          if (value >= 12) {

            if (value == 15) {
              obj.resultGrade = 'S/EX-1';
            } else if (value == 14) {
              obj.resultGrade = 'S/EX-2';
            } else if (value == 13) {
              obj.resultGrade = 'S/EX-3';
            } else if (value == 12) {
              obj.resultGrade = 'PASS';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == 'H/ROPE 9 MTR') {

          if (value >= 6) {

            if (value == 10) {
              obj.resultGrade = 'EX';
            } else if (value < 10 && value >= 8) {
              obj.resultGrade = 'GOOD';
            } else if (value < 8 && value >= 6) {
              obj.resultGrade = 'SAT';
            }

            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }

        } else if (obj.subjectName == "9' DITCH") {

          if (value == 10) {
            obj.resultGrade = 'PASS';
            obj.clearedIn = type;
          } else {
            obj.resultGrade = 'Failed';
          }
        }  
          
        } 
        
        this.calculateMarks(subject)
        this.getTotalMarksIIIterm()

      } else {
        obj.resultGrade = ''
        this.calculateMarks(subject)

      }

    }

  }

  calculateMarks(subject) {
    let ptTotal = 0;
    subject.edossierPtSubjectResult.forEach(el => {
      let currentMarks = 0;
      if (el.lastAttemptType == 'M1') {
        if (el.m1ObtainedMarks)
          currentMarks = parseInt(el.m1ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'M2') {
        if (el.m2ObtainedMarks)
          currentMarks = parseInt(el.m2ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'C1') {
        if (el.c1ObtainedMarks)
          currentMarks = parseInt(el.c1ObtainedMarks);
        else
          currentMarks = 0;

      } else if (el.lastAttemptType == 'C2') {
        if (el.c2ObtainedMarks)
          currentMarks = parseInt(el.c2ObtainedMarks);
        else
          currentMarks = 0;

      } else {
        currentMarks = 0;
      }
      ptTotal = ptTotal + currentMarks
    })
    // return ptTotal;
    subject.obtainedMarks = ptTotal
  }

  getTotalMarksIterm() {
    let obtMarks = 0;
    this._I_termData.subjects.forEach(
      el => {
        let currentMarks = 0;
        if (el.obtainedMarks)
          currentMarks = parseInt(el.obtainedMarks)

        obtMarks = obtMarks + currentMarks;

      }
    )
    this._I_termData.totalObtainedMarks = obtMarks;
  }
  
  getTotalMarksIIterm() {
    let obtMarks = 0;
    this._II_termData.subjects.forEach(
      el => {
        let currentMarks = 0;
        if (el.obtainedMarks)
          currentMarks = parseInt(el.obtainedMarks)

        obtMarks = obtMarks + currentMarks;

      }
    )
    this._II_termData.totalObtainedMarks = obtMarks;
  }

  getTotalMarksIIIterm() {
    let obtMarks = 0;
    this._III_termData.subjects.forEach(
      el => {
        let currentMarks = 0;
        if (el.obtainedMarks)
          currentMarks = parseInt(el.obtainedMarks)

        obtMarks = obtMarks + currentMarks;

      }
    )
    this._III_termData.totalObtainedMarks = obtMarks;
  }

  getTotalMarksIItech() {
    let obtMarks = 0;
    this._II_techData.subjects.forEach(
      el => {
        let currentMarks = 0;
        if (el.obtainedMarks)
          currentMarks = parseInt(el.obtainedMarks)

        obtMarks = obtMarks + currentMarks;

      }
    )
    this._II_techData.totalObtainedMarks = obtMarks;
  }



  updateResult(subject) {
    console.log(subject);

    this.spinner.show()
    this.service.updatePTResult(subject).subscribe(
      res => {
        if (res.status == 'OK') {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
      },
      err=>{
        this.spinner.hide();
        this.sharedService.openSnackbar("Error Occured.")
      }
    )
  }

  markMotivationalAwards(event, awardName, termId) {
    let obj;
    let checked: boolean = event.target.checked

    //SETTING TERM
    if (termId == 1) {
      obj = this._I_termData.motivationalAwards
    } else if (termId == 2) {
      obj = this._II_termData.motivationalAwards
    } else if (termId == 3) {
      obj = this._III_termData.motivationalAwards
    } else if (termId == 7) {
      obj = this._II_techData.motivationalAwards
    }


    //SETTING AWARDS
    if (awardName == 'Merit Card') {
      obj.meritCard = checked ? '1' : '0'
    } else if (awardName == 'Half Blue') {
      obj.halfBlue = checked ? '1' : '0'
    } else if (awardName == 'Blue') {
      obj.blue = checked ? '1' : '0'
    } else if (awardName == 'Blazer') {
      obj.blazer = checked ? '1' : '0'
    }

  }

  updateMotivationalAwards(term) {

    this.spinner.show();
    let obj;
    if (term == 1) {
      obj = this._I_termData.motivationalAwards
    } else if (term == 2) {
      obj = this._II_termData.motivationalAwards
    } else if (term == 3) {
      obj = this._III_termData.motivationalAwards
    } else if (term == 7) {
      obj = this._II_techData.motivationalAwards
    }

    console.log(obj);

    this.service.addPT_MotivationalAwards(obj).subscribe(
      res => {
        if (res.status == "OK") {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar("Error Occured")
      }
    )


  }








}
