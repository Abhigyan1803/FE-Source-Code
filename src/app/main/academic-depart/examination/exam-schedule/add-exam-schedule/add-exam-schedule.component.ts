import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-exam-schedule',
  templateUrl: './add-exam-schedule.component.html',
  styleUrls: ['./add-exam-schedule.component.scss']
})
export class AddExamScheduleComponent implements OnInit {

  unSelectedFile;
  pageTitle = "Add";
  terms: any[] = [];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addExamScheduleform: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl;
  isError;
  url: any;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  
  type:string;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private sharedService: SharedService) {
    
    this.route.params.subscribe(
      (params)=>{
        this.type = params.type;
        console.log("Recieved Param: ", this.type);
       
      }
    )
    // this.getBattalion();
    var tempTermId;
    if(this.type == "Exam-I-Term"){
      tempTermId =1;
    }else if(this.type == "Exam-II-Term"){
      tempTermId =2;
    }else if(this.type == "Exam-III-Term"){
      tempTermId =3;
    }else if(this.type == "Exam-II-Tech"){
      tempTermId =7;
    }
      this.addExamScheduleform = this.fb.group({
        name: ['', Validators.required],
        status: ['1', Validators.required],
        termId:[tempTermId],
        type:['Academic Exam Schedule'],
        doc: [],
        userId:[1],
  
      })
    
    
    
   
  }


  ngOnInit(): void {
    this.getTerms();
    if (this.router.url.includes('add-exam-marks')) {
      this.pageTitle = 'Add'
    }
    else if (this.router.url.includes('view-exam-marks')) {
      this.spinner.show()
      this.pageTitle = 'View'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getdistributionById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addExamScheduleform.patchValue({
              name: res.object.name,
              termId:res.object.termId,
              status:  res.object.status,
              type: res.object.type,
            })
            this.docUrl = res.object.url
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addExamScheduleform.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/examination/Exam-schedule/'+this.type]);
  }

  submit() {
   
    if (this.addExamScheduleform.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      console.log(this.addExamScheduleform.value,"this.addExamScheduleform.value");
      
      this.adminservice.addExamSchedule(this.addExamScheduleform.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/examination/Exam-schedule/'+this.type]);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
}


openDoc(l) {
  console.log("++++++++",l);
  
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l
    }
  });
}

// onSelectDoc(e) {
//   var file = e.target.files[0];
//   console.log(file,"file juned");
  
//   if (file.size > 5242880) {
//     this.docFile.nativeElement.files = this.unSelectedFile;
//     this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
//   } else {
//     this.docUrl = ''
//     this.addExamScheduleform.patchValue({
//       doc: file
//     });
//     this.isDoc=true;
//     this.adminservice.addDoc(file).subscribe(
//       res => {
//         console.log(res,"url dj");
//         if (res.status == 'OK') {
//           this.adminservice.openSnackbar(res.message)
//         this.url=res.object.url
//         console.log(this.url,"my url");
        
//         } else {
//           this.spinner.hide();
//           this.adminservice.openSnackbar(res.message)
//         }
//       },
//       err => {
//         this.spinner.hide();
//         this.adminservice.openSnackbar('Error Occured.')
//         console.log(JSON.stringify(err));
//       }
//     )
//   }
// }

onSelectDoc(e) {
  var file = e.target.files[0]
  //change file from 50mb to 200mb
  let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800 ) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.value = '';
    this.adminservice.openSnackbar('Document Should Be Maximum 200 MB in Size')
  }
  else if(file.size == 0){
    this.docFile.nativeElement.value = '';
    this.adminservice.openSnackbar('Document Should Be greater than 0 MB in Size')
  }
   else {
    this.docUrl = ''
    this.addExamScheduleform.patchValue({
      doc: file
    });
    
    this.isDoc=true;
  }
}

termChange(e) {
  console.log(e)
  if (e = 1) {
    this.terms[0]
    console.log(this.terms[0])
  }
}
getTerms() {
  this.adminservice.getAllTerms().subscribe(
    res => {
      // console.log(res);
      if (res.status == '1') {
        this.terms = res.List;
        this.cdref.detectChanges();
      }

    }
  )
}

update() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);
  this.addExamScheduleform.value.url = this.url;
  if (this.addExamScheduleform.valid) {
    this.adminservice.updateDistribution(this.id,this.addExamScheduleform.value).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.")
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
    this.adminservice.openSnackbar(res.message)
    this.router.navigate(['main/academic-depart/examination/Exam-schedule/'+this.type])  
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}






