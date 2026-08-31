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
  selector: 'ms-add-pcht',
  templateUrl: './add-pcht.component.html',
  styleUrls: ['./add-pcht.component.scss']
})
export class AddPchtComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Achievements";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addPCHTForm: FormGroup = new FormGroup({});
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
    this.addPCHTForm = this.fb.group({
      name: ['', Validators.required],
      status: ['1', Validators.required],
      type:['PCHT'],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-pcht')) {
      this.pageTitle = 'Add Achievements'
    }
    else if (this.router.url.includes('view-pcht')) {
      this.spinner.show()
      this.pageTitle = 'View Achievements'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getPCHTById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addPCHTForm.patchValue({
              name: res.object.name,
              status:  res.object.status,
              type: res.object.type,
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
    return this.addPCHTForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/examination/pcht']);
  }

  addAchievements() {
    if (this.addPCHTForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addPCHT(this.addPCHTForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/examination/pcht']);
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
    this.addPCHTForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateAchievements() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPCHTForm.valid) {
    this.adminservice.updatePCHT(this.id,this.addPCHTForm.value).subscribe(
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
    this.router.navigate(['main/academic-depart/examination/pcht'])  
    
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/GS-Branch/stats/stats/poc'])
  
    
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}






