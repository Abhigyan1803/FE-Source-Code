import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-poc',
  templateUrl: './add-poc.component.html',
  styleUrls: ['./add-poc.component.scss']
})
export class AddPocComponent implements OnInit {

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
    private activeRoute: ActivatedRoute) {
    this.addPOCForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-poc')) {
      this.pageTitle = 'Add POC'
    }
    else if (this.router.url.includes('view-poc')) {
      this.spinner.show()
      this.pageTitle = 'View POC'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getPOCByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addPOCForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.docUrl = res.object.file
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
    this.router.navigate(['main/gs-branch/stats/stats/poc']);
  }

  addPOC() {
    if (this.addPOCForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addPOC(this.addPOCForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/stats/stats/poc']);
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
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addPOCForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updatePOC() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPOCForm.valid) {
    this.adminservice.updatePOC(this.addPOCForm.value,this.id).subscribe(
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
    
    if(this.router.url.includes('main/gs-branch'))
    this.router.navigate(['main/gs-branch/stats/stats/poc'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/stats/stats/poc'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}






