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
  selector: 'ms-add-hindi',
  templateUrl: './add-hindi.component.html',
  styleUrls: ['./add-hindi.component.scss']
})
export class AddHindiComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add POC";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addPOCForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addPOCForm = this.fb.group({
      name: ['', Validators.required],
      status: ['1', Validators.required],
      type:['INSTRUCTION'],
      subType:['HINDI'],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-hindi')) {
      this.pageTitle = 'Add Exam'
    }
    else if (this.router.url.includes('view-hindi')) {
      this.spinner.show()
      this.pageTitle = 'View Exam'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getClubsById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addPOCForm.patchValue({
              name: res.object.name,
              status:  res.object.status,
              type: res.object.type,
              subType: res.object.subType,
            })
            this.docUrl = res.object.document
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
    return this.addPOCForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/general/hindi']);
  }

  addExam() {
    if (this.addPOCForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addClubs(this.addPOCForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/general/hindi']);
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

onSelectDoc(e) {
  var file = e.target.files[0]
  //change file from 50mb to 200mb 
 let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 200 MB in Size')
  } else {
    this.docUrl = ''
    this.addPOCForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateExam() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPOCForm.valid) {
    this.adminservice.updateClubs(this.id,this.addPOCForm.value).subscribe(
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
    
    this.router.navigate(['main/academic-depart/general/hindi'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}






