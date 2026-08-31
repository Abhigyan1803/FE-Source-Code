import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-administrative',
  templateUrl: './add-administrative.component.html',
  styleUrls: ['./add-administrative.component.scss']
})
export class AddAdministrativeComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Administrative";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addAdministrativeForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addAdministrativeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-administrative')) {
      this.pageTitle = 'Add Administrative'
    }
    else if (this.router.url.includes('view-administrative')) {
      this.spinner.show()
      this.pageTitle = 'View Administrative'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getAdministrativeById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addAdministrativeForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
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
    return this.addAdministrativeForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/stats/guidelines/administrative-instructions']);
  }

  addAdministrative() {
    if (this.addAdministrativeForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addAdministrative(this.addAdministrativeForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/stats/guidelines/administrative-instructions']);
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
  if (file.size > 5242880) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
  } else {
    this.docUrl = ''
    this.addAdministrativeForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateAdministrative() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addAdministrativeForm.valid) {
    this.adminservice.updateAdministrative(this.addAdministrativeForm.value,this.id).subscribe(
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
    this.router.navigate(['main/gs-branch/stats/guidelines/administrative-instructions'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/stats/guidelines/administrative-instructions'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}


}
