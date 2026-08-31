import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-add-reception',
  templateUrl: './add-reception.component.html',
  styleUrls: ['./add-reception.component.scss']
})
export class AddReceptionComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Reception";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addRECEPTIONForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  localID
  @ViewChild('inputFile', { static: true }) docFile;  

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,private service: AdjutantService,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addRECEPTIONForm = this.fb.group({
      letterNo: ['', Validators.required],
      // scheduleDate: ['', Validators.required],
      subject: ['', Validators.required],
      status: ['1', Validators.required],
      file: []
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-reception')) {
      this.pageTitle = 'Add Reception'
    }
    else if (this.router.url.includes('view-reception')) {
      this.spinner.show()
      this.pageTitle = 'View Reception'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getReceptionId(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addRECEPTIONForm.patchValue({
              letterNo: res.object.letterNo,
              subject: res.object.subject,
              // scheduleDate:new Date(res.scheduleDate),
              status:  res.object.status,
            })
          
            this.docUrl = res.object.document
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addRECEPTIONForm.controls;
  }

 

    DateReception(e:any){
      this.addRECEPTIONForm.patchValue({
        scheduleDate:new Date(e.target.value)
      })
    }
   

  goBack() {
    this.router.navigate(['main/adjutant-branch/general-instruction/reception']);
  }

  addDemoCoy() {
    if (this.addRECEPTIONForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addReception(this.addRECEPTIONForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.service.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/adjutant-branch/general-instruction/reception']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg)
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

  charCount(e: any) {
    this.descLength = e.target.value.length
}

openDoc(l) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l
    }
  });
}



onSelectDoc(e) {
  var file = e.target.files[0]
  //change file from 50mb to 200mb 
 let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.service.openSnackbar('Document Should Be Maximum 200 MB in Size')
  } else {
    this.docUrl = ''
    this.addRECEPTIONForm.patchValue({
      file: file
    });
    this.isDoc=true;
  }
  // console.log("selected Doc", this.addBdoForm.value);
}


updateDemoCoy() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addRECEPTIONForm.valid) {
    this.service.updateReception(this.addRECEPTIONForm.value,this.id).subscribe(
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
    
    if(this.router.url.includes('main/adjutant-branch'))
    this.router.navigate(['main/adjutant-branch/general-instruction/reception'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/adjutant-branch/general-instruction/reception'])  
 
  } else {
    this.spinner.hide()
    this.service.openSnackbar(res.message)
  }
}


}
