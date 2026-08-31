import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-fcg',
  templateUrl: './add-fcg.component.html',
  styleUrls: ['./add-fcg.component.scss']
})
export class AddFcgComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add FGC";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addFCGForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isDoc;
  isError;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addFCGForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-Fgc')) {
      this.pageTitle = 'Add FGC'
    }
    else if (this.router.url.includes('view-Fgc')) {
      this.spinner.show()
      this.pageTitle = 'View FGC'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getFGCById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addFCGForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
            this.docUrl = res.object.doc
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
    return this.addFCGForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/stats/guidelines/fgc-policy']);
  }

  addFGC() {
    if (this.addFCGForm.invalid || !this.isDoc) {
      this.isError = true;
      console.log(this.isDoc)
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      console.log(this.addFCGForm.value)
      this.adminservice.addFGC(this.addFCGForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/stats/guidelines/fgc-policy']);
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
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l
    }
  });
}

onSelectDoc(e) {
  var file = e.target.files[0]
  console.log(file.size)
  if (file.size > 6291456) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
  } else {
    this.docUrl = ''
    this.addFCGForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateFGC() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addFCGForm.valid) {
    this.adminservice.updateFGC(this.addFCGForm.value,this.id).subscribe(
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
    this.router.navigate(['main/gs-branch/stats/guidelines/fgc-policy'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/stats/guidelines/fgc-policy'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}
