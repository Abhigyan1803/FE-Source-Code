import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { AdminService } from 'app/service/admin/admin.service';
import { DatePipe } from '@angular/common';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-persnol',
  templateUrl: './persnol.component.html',
  styleUrls: ['./persnol.component.scss']
})
export class PersnolComponent implements OnInit {
  // id;
  serid;
  datePipe = new DatePipe('en-IN');
  persnolForm: FormGroup = new FormGroup({

  });
  serviceId: any;
  id: any;
  pay: number;
  Date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  serialNo:number = 1;


  constructor(private route:ActivatedRoute, private dialog: MatDialog, private fb: FormBuilder, 
    private trg_team_services:TrgTeamService,
    private spinner: NgxSpinnerService,private edossierservice: EDossierService, private adminservice: AdminService) {

    // this.serid = (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("e");

    this.serviceId = this.route.snapshot.queryParamMap.get('Id');
    // this.termId = this.route.snapshot.queryParamMap.get('termId');

    this.persnolForm = this.fb.group({
      id: [''],
      serviceId: [this.serviceId],
      academyNo: ['', Validators.required],
      name: ['', Validators.required],
      course: ['', Validators.required],
      entry: ['', Validators.required],
      previewImg: ['', Validators.required],
      company: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: ['', Validators.required],
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      upscRollNo: ['', Validators.required],
      ssbSerNo: ['', Validators.required],
      identificationMarks: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      fatherName: ['', Validators.required],
      address_of_next_of_kin_showing_rel: ['', Validators.required],
      father_profession: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      detailsOfNOk: ['', Validators.required],
      rankType: ['', Validators.required],
      rankName: ['', Validators.required],
      relation: ['', Validators.required],
      currentStatus:['',Validators.required],
      serialNo:[this.serialNo],
      contactNo: ['', Validators.required],

   
      cadetEducation: this.fb.array([]),
      
      achievements: ['', Validators.required],
      appt: ['', Validators.required],
      armAndService: ['', Validators.required],
      bankAccountNo: ['', Validators.required],
      fGPA: ['', Validators.required],
      marriageDate: ['', Validators.required],
      medalAward: ['', Validators.required],
      merit: ['', Validators.required],
      noOfChild: ['', Validators.required],
      orderNo: ['', Validators.required],
      pay: ['', Validators.required],
      postAndOrg: ['', Validators.required],
      spouseDetails: ['', Validators.required],
      spouseName: ['', Validators.required],
      ssbPlan: ['', Validators.required],
      visaExpiredDate: ['', Validators.required],
    });

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode == 32) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      id: [''],
      examination: [''],
      schoolCollege: [''],
      university: [''],
      subjectTaken: [''],
      percentage: [''],
      divisionClass: [''],
    })
  }


  getControls() {
    return (this.persnolForm.get('cadetEducation') as FormArray).controls;
  }
  
  get cadetEducation() : FormArray {
    return this.persnolForm.get('cadetEducation') as FormArray;
  }

  addCadetEducation() {
    this.cadetEducation.push(this.newSkill());
  }

  // cadetEducation:any=[];

  ngOnInit(): void {
    console.log(localStorage.getItem("e"), '1111');
    console.log(localStorage.getItem("i"), '2222');
    (<HTMLInputElement>document.getElementById("autobiographyID")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("autobiographyName")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("autobiographyComp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("autobiographyBn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("autobiographyTermId")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("autobiographyTermName")).value = localStorage.getItem("termName");
    (<HTMLInputElement>document.getElementById("autobiographyRk")).value = localStorage.getItem("rank");
    // this.spinner.show();
    // if (this.router.url.includes('id'), ('termid')) {
    //   this.id = this.route.snapshot.queryParamMap.get('id');
    //   this.termid = this.route.snapshot.queryParamMap.get('termid');
    // }

    // if (this.router.url.includes('add-eqtn'))

    // this.spinner.show();
    // this.id = this.serid;
    // console.log(this.id, "---------");
   
    this.adminservice.getDrillMarks(this.serviceId).subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.spinner.hide();
          // this.trg_team_services.openSnackbar(res.message);

          // this.serId=res.object.serviceId
          console.log(res, "id")
          // this.spinner.hide();
          let obj = res.object;



               /**=======CADET EDUCATION========== */
               if (obj.cadetEducation.length >= 1) {
                for (let i = 0; i <= obj.cadetEducation.length - 1; i++) {
                  this.addCadetEducation();
                }
              }
              this.persnolForm.patchValue({
                cadetEducation: obj.cadetEducation
              })
              console.log(this.cadetEducation,'------------------')
              /**==================================== */
  
          // this.cadetEducation=res.object.cadetEducation;
          this.persnolForm.patchValue({
            academyNo: obj.academyNo,
            name: obj.name,
            course: obj.course,
            entry: obj.entry,
            previewImg: obj.profileImg,
            company: obj.company,
            // dob:obj.dob,
            dob: this.datePipe.transform(obj.dob, 'yyyy-MM-dd'),
            birthPlace: obj.birthPlace,
            religion: obj.religion,
            nationality: obj.nationality,
            upscRollNo: obj.upscRollNo,
            identificationMarks: obj.identificationMarks,
            bloodGroup: obj.bloodGroup,
            fatherName: obj.familyDetails.fatherName,
            relation:obj.familyDetails.relation,
            father_profession:obj.familyDetails.father_profession,
            currentStatus:obj.familyDetails.currentStatus,
            address_of_next_of_kin_showing_rel: obj.address_of_next_of_kin_showing_rel,
            monthlyIncome: obj.familyDetails.monthlyIncome,
            maritalStatus: obj.maritalStatus,
            ssbSerNo: obj.ssbSerNo,
            rankType: obj.rankType,
            rankName: obj.rankName,
            contactNo: obj.contactNo,
            cadetEducation:obj.cadetEducation,
           
            achievements: obj.achievements,
            appt: obj.appt,
            armAndService: obj.armAndService,
            bankAccountNo:obj.bankAccountNo,
            detailsOfNOk: obj.detailsOfNOk,
            fGPA: obj.fGPA,
            marriageDate: this.datePipe.transform(obj.marriageDate, 'yyyy-MM-dd'),
            medalAward: obj.medalAward,
            merit: obj.merit,   
            noOfChild: obj.noOfChild, 
            orderNo: obj.orderNo, 
            pay: obj.pay,
            postAndOrg: obj.postAndOrg,
            spouseDetails: obj.spouseDetails,
            spouseName: obj.spouseName,
            ssbPlan:obj.ssbPlan,
            visaExpiredDate: this.datePipe.transform(obj.visaExpiredDate, 'yyyy-MM-dd'),
            serviceId:obj.serviceId
          
          });
          this.id = obj.id;
          this.pay = obj.pay;
         
         this.previewImg= obj.profileImg;
       
         console.log(this.persnolForm.value.previewImg);
        } else {
          this.adminservice.openSnackbar(res.message)
          this.spinner.hide();
        }
      });
   
  }
  noImg() {

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.updatepersnoldetails()


  }
sendData:any={};
update() {
       this.sendData = this.persnolForm.value;
       console.log(this.sendData)
       this.sendData  =   {
        // achievements:this.persnolForm.value.achievements,
        id:this.id,
        achievements:this.persnolForm.value.achievements,
        appt: this.persnolForm.value.appt,
        armAndService: this.persnolForm.value.armAndService,
        bankAccountNo:this.persnolForm.value.bankAccountNo,
        detailsOfNOk: this.persnolForm.value.detailsOfNOk,
        fGPA: this.persnolForm.value.fGPA,
        marriageDate: this.persnolForm.value.marriageDate,
        medalAward: this.persnolForm.value.medalAward,
        merit: this.persnolForm.value.merit,
        noOfChild: this.persnolForm.value.noOfChild,
        orderNo: this.persnolForm.value.orderNo,
        pay: this.persnolForm.value.pay,
        postAndOrg: this.persnolForm.value.postAndOrg,
        spouseDetails:this.persnolForm.value.spouseDetails,
        spouseName: this.persnolForm.value.spouseName,
        ssbPlan:this.persnolForm.value.ssbPlan,
        visaExpiredDate: this.persnolForm.value.visaExpiredDate,
        serviceId:this.persnolForm.value.serviceId
      }
    ;
    //let x:any={};

    //  this.sendData['id'] = this.id;

    console.log(this.sendData.value);
    // delete sendData.academyNo
    this.edossierservice.updatecadetdetails(this.sendData).subscribe(res => {
      this.spinner.show();
      console.log("updatedpersnoldetails:", res);
      if (res.status == 'OK') {
        this.spinner.hide();
        this.trg_team_services.openSnackbar(res.message);
        window.history.back();

      }
      err => {
        this.spinner.hide()
        this.trg_team_services.openSnackbar("Some Error Occured.");
      }


    });
  }


  goBack() {
    window.history.back();
  }


  // openImg(img) {
  //   console.log(img);
  //   this.dialog.open(DialogComponent, {
  //     width: '1300px', height: '650px',
  //     data: {
  //       type: 'img', title: '', url: img
  //     }
  //   })
  // }


  docArray: any[] = ['', '', '', '', '', '', ''];

  previewImg;
  // imgSelected(e: any) {
  //   const file = e.target.files[0]

  //   if (file.size > 5242880) {
  //     this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
  //   } else {

  //     this.docArray[0] = e.target.files[0];

  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.previewImg = event.target.result;
  //       console.log(this.previewImg)
  //     }
  //   }

  // }
}
function Number(pay: any) {
  throw new Error('Function not implemented.');
}

