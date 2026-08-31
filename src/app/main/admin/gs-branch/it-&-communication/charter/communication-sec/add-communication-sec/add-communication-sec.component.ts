import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-communication-sec',
  templateUrl: './add-communication-sec.component.html',
  styleUrls: ['./add-communication-sec.component.scss']
})
export class AddCommunicationSecComponent implements OnInit {

 
  unSelectedFile: any;
  pageTitle = "Add Communication Sec";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addCommunicationsecForm: FormGroup = new FormGroup({});
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
    private router: Router,private el: ElementRef,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addCommunicationsecForm = this.fb.group({
      name: ['',[ Validators.required, Validators.pattern(/^[\a-zA-Z0-9\s]+$/)]],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-communication-sec')) {
      this.pageTitle = 'Add Communication Sec'
    }
    else if (this.router.url.includes('view-communication-sec')) {
      this.spinner.show()
      this.pageTitle = 'View Communication Sec'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCommunicationSecByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addCommunicationsecForm.patchValue({
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
    return this.addCommunicationsecForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/communication-sec']);
  }

  addCommunicationSec() {
    console.log(this.addCommunicationsecForm.value)
    if (this.addCommunicationsecForm.invalid|| !this.isDoc) {
      this.isError = true;
      for (const key of Object.keys(this.addCommunicationsecForm.controls)) {
        if (this.addCommunicationsecForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addCommunicationSec(this.addCommunicationsecForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/communication-sec']);
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

// onSelectDoc(e) {
//   var file = e.target.files[0]
//   if (file.size > 5242880) {
//     this.docFile.nativeElement.files = this.unSelectedFile;
//     this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
//   } else {
//     this.docUrl = ''
//     this.addCommunicationsecForm.patchValue({
//       doc: file
//     });
//     this.isDoc=true;
//   }
// }

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
    this.addCommunicationsecForm.patchValue({
      doc: file
    });
    this.isDoc = true;
  }

  console.log(file,'pppppppppppp')
}
updateCommunicationSec() {

  // console.log("Bdo", this.addBdoForm.value);

  // if (this.addCommunicationsecForm.valid) {
  //   this.adminservice.updateCommunicationSec(this.addCommunicationsecForm.value,this.id).subscribe(
  //     res => {
  //       // console.log(res);
  //       this.apiRes(res);
  //     },
  //     err => {
  //       this.spinner.hide()
  //       this.adminservice.openSnackbar("Some Error Occured.")
  //     }
  //   )
  // }
  // else {
  //   this.isError = true;
  // }




  if (this.addCommunicationsecForm.invalid|| !this.isDoc) {
    this.isError = true;
    for (const key of Object.keys(this.addCommunicationsecForm.controls)) {
      if (this.addCommunicationsecForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
    this.adminservice.openSnackbar("Please Fill All Required Fields")
  } else {
    this.spinner.show();
    this.adminservice.updateCommunicationSec(this.addCommunicationsecForm.value,this.id).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/communication-sec']);
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

apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
    
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/communication-sec'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/GS-Branch/itcommunication/charter/communication-sec'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

