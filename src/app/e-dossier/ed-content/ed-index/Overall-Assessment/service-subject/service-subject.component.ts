import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-service-subject',
  templateUrl: './service-subject.component.html',
  styleUrls: ['./service-subject.component.scss']
})
export class ServiceSubjectComponent implements OnInit {

  termIServiceForm: FormGroup = new FormGroup({});
  termIIServiceForm: FormGroup = new FormGroup({});
  techIIServiceForm: FormGroup = new FormGroup({});
  termIIIServiceForm: FormGroup = new FormGroup({});

  serviceId;
  id;
  termid;
  Id;
  termId; 
isShow:boolean = false;
  x: number;
  tech: number;
  y: number;
  z: number;
  k: number;
  X: number;
  Y: number;
  bmt2ObtainedMarks: any;

  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService,
    private sharedservice: SharedService, private cdref: ChangeDetectorRef, private edossierservice: EDossierService,
    private activeRoute: ActivatedRoute, private EDossierService:EDossierService) { 

      
      this.Id = this.route.snapshot.queryParamMap.get('Id');
      this.termId = this.route.snapshot.queryParamMap.get('termId');

      this.termIServiceForm = this.fb.group({
        resultType:['',Validators.required],
        id:['',Validators.required],
        termId:['',Validators.required],
        subjectType:['',Validators.required],
        assesmentTermType:['',Validators.required],
        totalMarks:['',Validators.required],
        totalObtainedMarks:['',Validators.required],
        totalObtainedMarks1:[''],
        bmt2ObtainedMarks:[''],
        mrPracObtainedMarks:[''],
        finalObtainedMarks:[''],
        midObtainedMarks:[''],
        serviceId:[''],
        })
        this.termIIServiceForm = this.fb.group({
          resultType:['',Validators.required],
          id:['',Validators.required],
          termId:['',Validators.required],
          subjectType:['',Validators.required],
          assesmentTermType:['',Validators.required],
          totalMarks:['',Validators.required],
          totalObtainedMarkst2:['',Validators.required],
          totalObtainedMarksmidt2:[''],
          bmt2ObtainedMarks:[''],
          mrPracObtainedMarks:[''],
          finalObtainedMarks:[''],
          midObtainedMarks:[''],
          serviceId:[''],
          })
          this.techIIServiceForm = this.fb.group({
            resultType:['',Validators.required],
            id:['',Validators.required],
            termId:['',Validators.required],
            subjectType:['',Validators.required],
            assesmentTermType:['',Validators.required],
            totalMarks:['',Validators.required],
            totalObtainedMarkst7:['',Validators.required],
            totalObtainedMarksmidt7:[''],
            bmt2ObtainedMarks:[''],
            mrPracObtainedMarks:[''],
            finalObtainedMarks:[''],
            midObtainedMarks:[''],
            serviceId:[''],
            })
            this.termIIIServiceForm = this.fb.group({
              resultType:['',Validators.required],
              id:['',Validators.required],
              termId:['',Validators.required],
              subjectType:['',Validators.required],
              assesmentTermType:['',Validators.required],
              totalMarks:['',Validators.required],
              totalObtainedMarks:['',Validators.required],
              totalObtainedMarkst3:[''],
              bmt2ObtainedMarksmidt3:[''],
              bmt2ObtainedMarks:[''],
              mrPracObtainedMarks:[''],
              finalObtainedMarks:[''],
              midObtainedMarks:[''],
              serviceId:[''],
              })
    }

    resultType = "MR Prac";
    serviceSubjectType="BMT1";
   

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("subServiceID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("subName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("subComp")).value = localStorage.getItem("companyName");
  (<HTMLInputElement>document.getElementById("subBn")).value = localStorage.getItem("battalionName");
  // (<HTMLInputElement>document.getElementById("lvetid")).value = localStorage.getItem("termId");
  (<HTMLInputElement>document.getElementById("subtName")).value = localStorage.getItem("termName");
  (<HTMLInputElement>document.getElementById("subrank")).value = localStorage.getItem("rank");
   
  }

  ngAfterViewInit() {
    this.getObtainMarks()
  }

  goBack() {
    window.history.back()
  }


  finalTotalMarks;
  finalObtainedMarks
  obj;
  getObtainMarks() {
    this.EDossierService.getEdServiceSubMarks(this.Id, this.resultType, this.serviceSubjectType).subscribe(res => {
      
      if (res.status == "OK") {
        let obj = res.object;
      let objTerm1 = obj.term1;
      let objTerm2 = obj.term2;
      let objTerm3 = obj.term3;
      let objTech2 = obj.tech2;
this.X = obj.term1;
this.Y = obj.term2;

      /*-----------------Term 1----------------*/
      if(this.termId==1 || this.termId == 2 || this.termId == 3){
      if(objTerm1 != undefined){
        let bmt1= objTerm1.bmt1;
        let bmt2= objTerm1.bmt2;
        let mrPrac= objTerm1.mrPrac;
        let totalObtainedMarks=0;
        let totalObtainedMarks1=0;
        if(bmt1 != undefined){
          totalObtainedMarks=totalObtainedMarks+parseInt(bmt1.finalObtainedMarks==undefined?0:bmt1.finalObtainedMarks);
          console.log("totalObtainedMarks111==>>",totalObtainedMarks, parseInt(bmt1.finalObtainedMarks));
          totalObtainedMarks1=totalObtainedMarks1+parseInt(bmt1.midObtainedMarks==undefined?0:bmt1.midObtainedMarks);

          this.termIServiceForm.patchValue({
            midObtainedMarks: bmt1.midObtainedMarks,
            finalObtainedMarks: bmt1.finalObtainedMarks,
          }) 
        // }else if(bmt1 == ""){
        //   totalObtainedMarks=totalObtainedMarks;
        }
        if(bmt2 != undefined){
          totalObtainedMarks=totalObtainedMarks+parseInt(bmt2.obtainedMarks==undefined?0:bmt2.obtainedMarks);
          console.log("totalObtainedMarks222==>>",totalObtainedMarks,parseInt(bmt2.obtainedMarks));
          this.termIServiceForm.patchValue({
            bmt2ObtainedMarks: bmt2.obtainedMarks,
          }) 
        }
        if(mrPrac != undefined){
          totalObtainedMarks=totalObtainedMarks+parseInt(mrPrac.obtainedMarks==undefined?0:mrPrac.obtainedMarks);
          console.log("totalObtainedMarks333==>>",totalObtainedMarks);
          console.log("totalObtainedMarks4444S==>>",parseInt(mrPrac.obtainedMarks));
          this.termIServiceForm.patchValue({
            mrPracObtainedMarks: mrPrac.obtainedMarks,
          }) 
        }
        if(bmt1 != undefined || bmt2 != undefined || mrPrac != undefined){
          console.log("totalObtainedMarkscheck==>>",totalObtainedMarks);

          this.termIServiceForm.patchValue({
            totalObtainedMarks: totalObtainedMarks+totalObtainedMarks1,
            totalObtainedMarks1:totalObtainedMarks1,
          });
          this.x=totalObtainedMarks+totalObtainedMarks1;
        }
      }
      }
      /*------------TERM2------------*/
      if (this.termId == 2 || this.termId == 3) {
      if(objTerm2 != undefined){
        let bmt1= objTerm2.bmt1;
        let bmt2= objTerm2.bmt2;
        let mrPrac= objTerm2.mrPrac;
        let totalObtainedMarkst2=0;
        let totalObtainedMarksmidt2=0;
        if(bmt1 != undefined){
          totalObtainedMarkst2=totalObtainedMarkst2+parseInt(bmt1.finalObtainedMarks==undefined?0:bmt1.finalObtainedMarks);
          console.log("totalObtainedMarkst2111==>>",totalObtainedMarkst2);
          totalObtainedMarksmidt2=totalObtainedMarksmidt2+parseInt(bmt1.midObtainedMarks==undefined?0:bmt1.midObtainedMarks);

          this.termIIServiceForm.patchValue({
            midObtainedMarks: bmt1.midObtainedMarks,
            finalObtainedMarks: bmt1.finalObtainedMarks,
          }) 
        }
        if(bmt2 != undefined){

          totalObtainedMarkst2=totalObtainedMarkst2+parseInt(bmt2.obtainedMarks==undefined?0:bmt2.obtainedMarks);
          console.log("totalObtainedMarkst2222==>>",totalObtainedMarkst2,parseInt(bmt2.obtainedMarks));
          this.termIIServiceForm.patchValue({
            bmt2ObtainedMarks: bmt2.obtainedMarks,
          }) 
        }
        if(mrPrac != undefined){
          totalObtainedMarkst2=totalObtainedMarkst2+parseInt(mrPrac.obtainedMarks==undefined?0:mrPrac.obtainedMarks);
          console.log("totalObtainedMarkst2333==>>",totalObtainedMarkst2);
          this.termIIServiceForm.patchValue({
            mrPracObtainedMarks: mrPrac.obtainedMarks,
          }) 
        }
        if(bmt1 != undefined || bmt2 != undefined || mrPrac != undefined){
          this.termIIServiceForm.patchValue({
            totalObtainedMarkst2: totalObtainedMarkst2+totalObtainedMarksmidt2,
            totalObtainedMarksmidt2:totalObtainedMarksmidt2,
          }) 
          this.y=totalObtainedMarkst2+totalObtainedMarksmidt2;

        }
      }
    }
      /*----------------TECH 2----------------*/
      
      if (this.termId == 7 || this.termId == 3) {
      if(objTech2 != undefined){
        let bmt1= objTech2.bmt1;
        let bmt2= objTech2.bmt2;
        let mrPrac= objTech2.mrPrac;
        let totalObtainedMarkst7=0;
        let totalObtainedMarksmidt7=0;
        if(bmt1 != undefined){
          totalObtainedMarkst7=totalObtainedMarkst7+parseInt(bmt1.finalObtainedMarks==undefined?0:bmt1.finalObtainedMarks);
          console.log("totalObtainedMarkst7111==>>",totalObtainedMarkst7);
          totalObtainedMarksmidt7=totalObtainedMarksmidt7+parseInt(bmt1.midObtainedMarks==undefined?0:bmt1.midObtainedMarks);

          this.techIIServiceForm.patchValue({
            midObtainedMarks: bmt1.midObtainedMarks,
            finalObtainedMarks: bmt1.finalObtainedMarks,
          }) 
        }
        if(bmt2 != undefined){

          totalObtainedMarkst7=totalObtainedMarkst7+parseInt(bmt2.obtainedMarks==undefined?0:bmt2.obtainedMarks);
          console.log("totalObtainedMarkst7222==>>",totalObtainedMarkst7,parseInt(bmt2.obtainedMarks));
          this.techIIServiceForm.patchValue({
            bmt2ObtainedMarks: bmt2.obtainedMarks,
          }) 
        }
        if(mrPrac != undefined){
          totalObtainedMarkst7=totalObtainedMarkst7+parseInt(mrPrac.obtainedMarks==undefined?0:mrPrac.obtainedMarks);
          console.log("totalObtainedMarkst7333==>>",totalObtainedMarkst7);
          this.techIIServiceForm.patchValue({
            mrPracObtainedMarks: mrPrac.obtainedMarks,
          }) 
        }
        if(bmt1 != undefined || bmt2 != undefined || mrPrac != undefined){
          this.techIIServiceForm.patchValue({
            totalObtainedMarkst7: totalObtainedMarkst7+totalObtainedMarksmidt7,
            totalObtainedMarksmidt7:totalObtainedMarksmidt7,
          }) 
          this.z=totalObtainedMarkst7+totalObtainedMarksmidt7;
        }
      }
      }
 /*-------------------TERM 3---------------------*/
 
 if (this.termId == 3) {
 if(objTerm3 != undefined){
  let bmt1= objTerm3.bmt1;
  let bmt2= objTerm3.bmt2;
  let mrPrac= objTerm3.mrPrac;
  let totalObtainedMarkst3=0;
  let totalObtainedMarksmidt3=0;
  console.log('bmt11-->',bmt1);
  console.log('bmt22-->',bmt2);
  console.log('mrr11-->',mrPrac);
  
  if(bmt1 != undefined){
    totalObtainedMarkst3=totalObtainedMarkst3+parseInt(bmt1.finalObtainedMarks==undefined?0:bmt1.finalObtainedMarks);
    console.log("totalObtainedMarksmidt311==>>",totalObtainedMarkst3);
    totalObtainedMarksmidt3=totalObtainedMarksmidt3+parseInt(bmt1.midObtainedMarks==undefined?0:bmt1.midObtainedMarks);

    this.termIIIServiceForm.patchValue({
      midObtainedMarks: bmt1.midObtainedMarks,
      finalObtainedMarks: bmt1.finalObtainedMarks,
    }) 
  }
  if(bmt2 != undefined){

    totalObtainedMarkst3=totalObtainedMarkst3+parseInt(bmt2.obtainedMarks==undefined?0:bmt2.obtainedMarks);
    console.log("totalObtainedMarkst3222==>>",totalObtainedMarkst3,parseInt(bmt2.obtainedMarks==undefined?0:bmt2.obtainedMarks));
    this.termIIIServiceForm.patchValue({
      bmt2ObtainedMarks: bmt2.obtainedMarks,
    }) 
  }
  if(mrPrac != undefined){
    totalObtainedMarkst3=totalObtainedMarkst3+ parseInt(mrPrac.obtainedMarks==undefined?0:mrPrac.obtainedMarks);
    console.log("totalObtainedMarkst3333==>>",totalObtainedMarkst3);
    this.termIIIServiceForm.patchValue({
      mrPracObtainedMarks: mrPrac.obtainedMarks,
    }) 
  }
  if(bmt1 != undefined || bmt2 != undefined || mrPrac != undefined){
    this.termIIIServiceForm.patchValue({
      totalObtainedMarkst3: totalObtainedMarkst3,
      totalObtainedMarksmidt3:totalObtainedMarksmidt3,
    }) 
    this.k=totalObtainedMarkst3;
  }
}
      }
    }
    })
  }

}
