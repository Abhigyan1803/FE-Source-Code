import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-distribution-marks',
  templateUrl: './add-distribution-marks.component.html',
  styleUrls: ['./add-distribution-marks.component.scss']
})
export class AddDistributionMarksComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add";
  terms: any[] = [];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addDistributionform: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
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
    private adService:AcademicDeptService,
    private sharedService:SharedService) {
    
    this.route.params.subscribe(
      (params)=>{
        this.type = params.type;
        console.log("Recieved Param: ", this.type);
       
        var tempTermId;
        if(this.type == "I Term"){
          tempTermId =1;
        }else if(this.type == "II Term"){
          tempTermId =2;
        }else if(this.type == "III Term"){
          tempTermId =3;
        }else if(this.type == "II Tech"){
          tempTermId =7;
        } else{
          this.goBack();
          this.sharedService.openErrorSnackbarWithSeconds('Error!',5)
        }
          this.addDistributionform = this.fb.group({
            name: ['', Validators.required],
            status: ['1', Validators.required],
            termId:[tempTermId],
            type:['Academic Distribution of Marks'],
            url: [this.url],
            userId:[1],
            doc:[]
          })

      }
    )
    // this.getBattalion();

    
    
    
   
  }


  ngOnInit(): void {
    this.getTerms();
    if (this.router.url.includes('add-distribution-marks')) {
      this.pageTitle = 'Add'
    }
    else if (this.router.url.includes('view-distribution-marks')) {
      this.spinner.show()
      this.pageTitle = 'View'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adService.getDistributionOfMarksById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addDistributionform.patchValue({
              name: res.object.name,
              termId:res.object.termId,
              status:  res.object.status,
              type: res.object.type,
            })
            this.url = res.object.url
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addDistributionform.controls;
  }

  goBack() {
    this.router.navigate(['main/academic-depart/examination/Distribution-of-Marks/'+this.type]);
  }

  submit() {
    
    this.addDistributionform.value.url = this.url;

    if (this.addDistributionform.invalid) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      
      this.adService.addDistributionOfMarks(this.addDistributionform.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.sharedService.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/examination/Distribution-of-Marks/'+this.type]);
          } else {
            this.spinner.hide();
            this.sharedService.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
}

openDoc(juned) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: juned
    }
  });
}

onSelectDoc(e) {
  var file = e.target.files[0];
  console.log(file,"file juned");
  //change file from 50 mb to 200mb
  let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.sharedService.openSnackbar('Document Should Be Maximum 200 MB in Size')
  } else {
    this.docUrl = ''
    this.addDistributionform.patchValue({
      doc: file
    });
    this.isDoc=true;

    // this.adminservice.addDoc(file).subscribe(
    //   res => {
    //     console.log(res,"url dj");
    //     if (res.status == 'OK') {
    //       this.sharedService.openSnackbar(res.message)
    //     this.url=res.object.url
    //     console.log(this.url,"my url");
        
    //     } else {
    //       this.spinner.hide();
    //       this.sharedService.openSnackbar(res.message)
    //     }
    //   },
    //   err => {
    //     this.spinner.hide();
    //     this.sharedService.openSnackbar('Error Occured.')
    //     console.log(JSON.stringify(err));
    //   }
    // )
  }
}

// termChange(e) {
//   console.log(e)
//   if (e = 1) {
//     this.terms[0]
//     console.log(this.terms[0])
//   }
// }

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
  this.addDistributionform.value.url = this.url;
  if (this.addDistributionform.valid) {
    this.adService.updateDistributionOfMarks(this.id,this.addDistributionform.value).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.sharedService.openSnackbar("Some Error Occured.")
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
    this.sharedService.openSnackbar(res.message)
    this.router.navigate(['main/academic-depart/examination/Distribution-of-Marks/'+this.type])  
  } else {
    this.spinner.hide()
    this.sharedService.openSnackbar(res.message)
  }
}

}






