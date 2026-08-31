import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-it-sec',
  templateUrl: './add-it-sec.component.html',
  styleUrls: ['./add-it-sec.component.scss']
})
export class AddItSecComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add ITSEC";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addItsecForm: FormGroup = new FormGroup({});
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
    private router: Router,private el: ElementRef,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addItsecForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-it-sec')) {
      this.pageTitle = 'Add ITSEC'
    }
    else if (this.router.url.includes('view-it-sec')) {
      this.spinner.show()
      this.pageTitle = 'View ITSEC'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getItSecByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addItsecForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status:  res.object.status,
            })
            this.descLength =  res.object.description.length;
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
    return this.addItsecForm.controls;
  }
  goBack() {
    this.router.navigate(['main/gs-branch/itcommunication/charter/it-sec']);
  }

  addITSEC() {
    if (this.addItsecForm.invalid) {
      this.isError = true;
      for (const key of Object.keys(this.addItsecForm.controls)) {
        if (this.addItsecForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar('Please Fill all Required Fields.')

    } else {
      this.spinner.show();
      this.adminservice.addItSec(this.addItsecForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/gs-branch/itcommunication/charter/it-sec']);
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
  console.log(file)
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addItsecForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateITSEC() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addItsecForm.valid) {
    this.adminservice.updateItSec(this.addItsecForm.value,this.id).subscribe(
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
    this.router.navigate(['main/gs-branch/itcommunication/charter/it-sec'])
  
    // if(this.router.url.includes('main/admin'))
    // this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/it-sec'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

