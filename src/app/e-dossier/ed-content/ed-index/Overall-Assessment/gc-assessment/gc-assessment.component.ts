import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';

import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-gc-assessment',
  templateUrl: './gc-assessment.component.html',
  styleUrls: ['./gc-assessment.component.scss']
})
export class GcAssessmentComponent implements OnInit {
  serviceId;
  cadetDetails;
  hasAccess:boolean = true;

  I_termOfficerQuotient: any[] = [];
  II_termOfficerQuotient: any[] = [];
  III_termOfficerQuotient: any[] = [];
  II_techOfficerQuotient: any[] = [];


  I_termPhysical: any[] = [];
  II_termPhysical: any[] = [];
  III_termPhysical: any[] = [];
  II_techPhysical: any[] = [];

  I_termServiceSubjects: any[] = [];
  II_termServiceSubjects: any[] = [];
  III_termServiceSubjects: any[] = [];
  II_techServiceSubjects: any[] = [];


  I_termAcademicSubjects: any[] = [];
  II_termAcademicSubjects: any[] = [];
  III_termAcademicSubjects: any[] = [];
  II_techAcademicSubjects: any[] = [];


  I_termOtherSubjects: any[] = [];
  II_termOtherSubjects: any[] = [];
  III_termOtherSubjects: any[] = [];
  II_techOtherSubjects: any[] = [];


  officerQuotient: any[] = [];
  physical: any[] = [];
  serviceSubjects: any[] = [];
  academicSubjects: any[] = [];
  otherSubjects: any[] = [];


  constructor(private service: EDossierService, private router: Router, private fb: FormBuilder, private sharedService: SharedService
    , private spinner: NgxSpinnerService
  ) {
    service.cadetObj.subscribe(
      object => {
        console.log("CADET: ", object);
        if (!object) {
          this.router.navigate(['/e-dossior/ed-content/Ed-dashboard'])
        } else {
          this.cadetDetails = JSON.parse(object)
        }
      }
    )

    // this.cadetDetails = JSON.parse(localStorage.getItem('cadet'))
    this.serviceId = this.cadetDetails.serviceId;
    this.cadetDetails.rank = (this.cadetDetails.nationality == 'India') ? 'GC' : 'FGC';

  }

  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getGcAssessment();
  }



  getGcAssessment() {
    this.service.getGCAssessment(this.serviceId).subscribe(
      res => {
        console.log("RESPONSE: ", res);

        if (res.status == 'OK') {
 
          const dataITerm: any[] = res.object.term1;
          const dataIITerm: any[] = res.object.term2;
          const dataIIITerm: any[] = res.object.term3;
          const dataIITech: any[] = res.object.tech2;

          dataITerm.filter(
            element => {
              if (element.category === 'Officer Quotient') {
                this.I_termOfficerQuotient.push(element);
              } else if (element.category === 'Physicals') {
                this.I_termPhysical.push(element);
              } else if (element.category === 'Service Subjects') {
                this.I_termServiceSubjects.push(element);
              } else if (element.category === 'Academics Subjects') {
                this.I_termAcademicSubjects.push(element);
              } else {
                this.I_termOtherSubjects.push(element);
              }
            }
          )

          dataIITerm.filter(
            element => {
              if (element.category === 'Officer Quotient') {
                this.II_termOfficerQuotient.push(element);
              } else if (element.category === 'Physicals') {
                this.II_termPhysical.push(element);
              } else if (element.category === 'Service Subjects') {
                this.II_termServiceSubjects.push(element);
              } else if (element.category === 'Academics Subjects') {
                this.II_termAcademicSubjects.push(element);
              } else {
                this.II_termOtherSubjects.push(element);
              }
            }
          )

          dataIIITerm.filter(
            element => {
              if (element.category === 'Officer Quotient') {
                this.III_termOfficerQuotient.push(element);
              } else if (element.category === 'Physicals') {
                this.III_termPhysical.push(element);
              } else if (element.category === 'Service Subjects') {
                this.III_termServiceSubjects.push(element);
              } else if (element.category === 'Academics Subjects') {
                this.III_termAcademicSubjects.push(element);
              } else {
                this.III_termOtherSubjects.push(element);
              }
            }
          )


          dataIITech.filter(
            element => {
              if (element.category === 'Officer Quotient') {
                this.II_techOfficerQuotient.push(element);
              } else if (element.category === 'Physicals') {
                this.II_techPhysical.push(element);
              } else if (element.category === 'Service Subjects') {
                this.II_techServiceSubjects.push(element);
              } else if (element.category === 'Academics Subjects') {
                this.II_techAcademicSubjects.push(element);
              } else {
                this.II_techOtherSubjects.push(element);
              }

            }
          )


          this.I_termOfficerQuotient.forEach(
            el => {
              this.officerQuotient.push([])
            }
          )
          this.I_termPhysical.forEach(
            el => {
              this.physical.push([])
            }
          )
          this.I_termServiceSubjects.forEach(
            el => {
              this.serviceSubjects.push([])
            }
          )

          this.I_termAcademicSubjects.forEach(
            el => {
              this.academicSubjects.push([])
            }
          )

          this.I_termOtherSubjects.forEach(
            el => {
              this.otherSubjects.push([])
            }
          )





          console.log("======== OQ ==========");

          if (this.cadetDetails.entry == 'TGC') {

            for (let i = 0; i < this.II_techOfficerQuotient.length; i++) {
              this.officerQuotient[i].push(this.II_techOfficerQuotient[i])
              this.officerQuotient[i].push(this.III_termOfficerQuotient[i])
            }

            for (let i = 0; i < this.II_techPhysical.length; i++) {
              this.physical[i].push(this.II_techPhysical[i])
              this.physical[i].push(this.III_termPhysical[i])
            }


            for (let i = 0; i < this.II_techServiceSubjects.length; i++) {
              this.serviceSubjects[i].push(this.II_techServiceSubjects[i])
              this.serviceSubjects[i].push(this.III_termServiceSubjects[i])
            }

            for (let i = 0; i < this.II_techAcademicSubjects.length; i++) {
              this.academicSubjects[i].push(this.II_techAcademicSubjects[i])
              this.academicSubjects[i].push(this.III_termAcademicSubjects[i])
            }

            
            for (let i = 0; i < this.II_techOtherSubjects.length; i++) {
              this.otherSubjects[i].push(this.II_techOtherSubjects[i])
              this.otherSubjects[i].push(this.III_termOtherSubjects[i])
            }





          } else {

            for (let i = 0; i < this.I_termOfficerQuotient.length; i++) {
              this.officerQuotient[i].push(this.I_termOfficerQuotient[i])
              this.officerQuotient[i].push(this.II_termOfficerQuotient[i])
              this.officerQuotient[i].push(this.III_termOfficerQuotient[i])
            }


            for (let i = 0; i < this.I_termPhysical.length; i++) {
              this.physical[i].push(this.I_termPhysical[i])
              this.physical[i].push(this.II_termPhysical[i])
              this.physical[i].push(this.III_termPhysical[i])
            }


            for (let i = 0; i < this.I_termServiceSubjects.length; i++) {
              this.serviceSubjects[i].push(this.I_termServiceSubjects[i])
              this.serviceSubjects[i].push(this.II_termServiceSubjects[i])
              this.serviceSubjects[i].push(this.III_termServiceSubjects[i])
            }
            
            for (let i = 0; i < this.I_termAcademicSubjects.length; i++) {
              this.academicSubjects[i].push(this.I_termAcademicSubjects[i])
              this.academicSubjects[i].push(this.II_termAcademicSubjects[i])
              this.academicSubjects[i].push(this.III_termAcademicSubjects[i])
            }
            
            for (let i = 0; i < this.I_termOtherSubjects.length; i++) {
              this.otherSubjects[i].push(this.I_termOtherSubjects[i])
              this.otherSubjects[i].push(this.II_termOtherSubjects[i])
              this.otherSubjects[i].push(this.III_termOtherSubjects[i])
            }




          }









          console.log("===========ALL SUBJECTS============");
          console.log("OQ: ",this.officerQuotient);
          console.log("PHYSICALS: ",this.physical);
          console.log("SERVICE SUBJECTS: ",this.serviceSubjects);
          console.log("ACADEMIC SUBJECTS: ",this.academicSubjects);
          console.log("OTHER SUBJECTS: ",this.otherSubjects);
          console.log("====================================");


        }




      }
    )
  }


  goBack() {
    window.history.back()
  }
}
