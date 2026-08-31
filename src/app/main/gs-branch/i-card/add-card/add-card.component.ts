import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { formatDate } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'ms-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  localID:any;
  unSelectedFile: any;
  pageTitle = "Add CARD";
  battalions:any[]=[];
  descLength:number = 0;
  RemarksLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addCardForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(private service: AdjutantService,
    @Inject(LOCALE_ID) localID:string,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
this.localID = localID;
    this.addCardForm = this.fb.group({
      name_of_issuing_Auth: ['', Validators.required],
      fatherOrHusband_Designation: ['', Validators.required],
      fatherOrHusband_Name: ['', Validators.required],
      pers_No: ['', Validators.required],
      rankName: ['', Validators.required],
      old_ICard_No: ['', Validators.required],
      place_of_Birth: ['', Validators.required],
      place_of_Issue: ['', Validators.required],
      permanent_Home_Address_Elsewhere:[''],
      permanent_Home_Address_India:[''],
      date_of_CommissionOrEnrolment: ['', Validators.required],
      reason_for_Change_ICard: ['', Validators.required],
      date_of_Retirement: ['', Validators.required],
      height: ['', Validators.required],
      color_of_Hair: ['', Validators.required],
      color_of_Eyes: ['', Validators.required],
      station:['Dehradun'],
     
      unit_crops_ship: ['',],
      date_of_issue: ['', Validators.required],
      date_of_Birth:['',Validators.required],
      name:['', Validators.required],
      request_type:[''],
      signature_name:[''],
      department:[localStorage.getItem('department')],
      todayDate:['',Validators.required],
      status: ['1', Validators.required],
    
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-card')) {
      this.pageTitle = 'Add CARD'
    }
    else if (this.router.url.includes('view-card')) {
      // this.spinner.show();
      this.pageTitle = 'View CARD'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getICardById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addCardForm.patchValue({
              id: res.object.id,
              name_of_issuing_Auth: res.object.name_of_issuing_Auth,
              fatherOrHusband_Designation: res.object.fatherOrHusband_Designation,
              fatherOrHusband_Name: res.object.fatherOrHusband_Name,
              pers_No: res.object.pers_No ,
              rankName: res.object.rankName ,
              old_ICard_No: res.object.old_ICard_No ,
              place_of_Birth: res.object.place_of_Birth ,
              place_of_Issue: res.object.place_of_Issue ,
              permanent_Home_Address: res.object.permanent_Home_Address,
              unit_crops_ship: res.object.unit_crops_ship ,
              permanent_Home_Address_Elsewhere: res.object.permanent_Home_Address_Elsewhere ,
              reason_for_Change_ICard: res.object.reason_for_Change_ICard ,
              permanent_Home_Address_India: res.object.permanent_Home_Address_India ,
              height: res.object.height ,
              color_of_Hair: res.object.color_of_Hair ,
              color_of_Eyes: res.object.color_of_Eyes ,
              station: res.object.station,
             
              request_type: res.object.request_type ,
              // date_of_issue: res.object.date_of_issue ,
              // date_of_Birth: res.object.date_of_Birth,
              name: res.object.name,
              // fathername: res.object.fathername,
              signature_name: res.object.signature_name,
            
              // todayDate: res.object.todayDate,
            todayDate:formatDate(res.object.todayDate,'yyyy-MM-dd',this.localID),
            retd:formatDate(res.object.todayDate,'yyyy-MM-dd',this.localID),
            date_of_CommissionOrEnrolment:formatDate(res.object.date_of_CommissionOrEnrolment,'yyyy-MM-dd',this.localID),
            date_of_Birth:formatDate(res.object.date_of_Birth,'yyyy-MM-dd',this.localID),
            date_of_Retirement:formatDate(res.object.date_of_Retirement,'yyyy-MM-dd',this.localID),
            date_of_issue:formatDate(res.object.date_of_issue,'yyyy-MM-dd',this.localID),
              status: res.object.status,
            })
            this.spinner.hide();
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addCardForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/i-card']);
  }
  // date_of_Birth:any;
  // cardDAte(){
  //   this.addCardForm.patchValue({
  //     todayDate:formatDate(todayDate,'yyyy-MM-dd',this.localID),
  //     retd:formatDate(todayDate,'yyyy-MM-dd',this.localID),
  //     date_of_CommissionOrEnrolment:formatDate(date_of_CommissionOrEnrolment,'yyyy-MM-dd',this.localID),
  //     date_of_Birth:formatDate(this.date_of_Birth,'yyyy-MM-dd',this.localID),
  //     place_of_Birth:formatDate(place_of_Birth,'yyyy-MM-dd',this.localID),
  //     date_of_issue:formatDate(date_of_issue,'yyyy-MM-dd',this.localID),
  //   })
  //   console.log(this.cardDAte);
  // }

  addCard() {
    console.log(this.addCardForm.value);
    
    if (this.addCardForm.invalid) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addICard(this.addCardForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/i-card']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any,t) {
    if(t == 'desc')
    this.descLength = e.target.value.length
    if(t == 'remarks')
    this.RemarksLength= e.target.value.length
}

openDoc(l) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l.file
    }
    
  });
 

}

onSelectDoc(e) {
  console.log(this.docUrl);
  
  var file = e.target.files[0]
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.service.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addCardForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateCard() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);
  this.addCardForm.value.color_of_Eyes;
  console.log(this.addCardForm.value.request_type,"request_type");
  this.addCardForm.value.id=this.id;
  if (this.addCardForm.valid) {
    this.service.updateICard(this.addCardForm.value).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.")
      }
    )
  }
  else {
    this.isError = true;
  }
}

apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.service.openSnackbar(res.message)
    this.router.navigate(['main/gs-branch/i-card'])  
    
     
 
  } else {
    this.spinner.hide()
    this.service.openSnackbar(res.message)
  }
}

keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}

