import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-counsellors-poonach',
  templateUrl: './add-counsellors-poonach.component.html',
  styleUrls: ['./add-counsellors-poonach.component.scss']
})
export class AddCounsellorsPoonachComponent implements OnInit {
  pageTitle = "Add ITSEC";
  id: string = '';
  isAdmin:boolean = false;
  addpoonachForm: FormGroup = new FormGroup({});
  isError: boolean;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addpoonachForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['1'],
      companyId: ['3'],
      status:['1']
    })

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-poonach')) {
      this.pageTitle = 'Add POONCH'
    }
    else if (this.router.url.includes('view-poonach')) {
      this.spinner.show()
      this.pageTitle = 'View POONCH'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addpoonachForm.patchValue({
              name: res.object.name,
              rankName: res.object.rankName,
              mobileNumber:  res.object.mobileNumber,
              id:res.object.id
            })
           
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
    return this.addpoonachForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-poonach']);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addPOONACH() {
    if (this.addpoonachForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.addpoonachForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-poonach']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
    }
  }



  updatePOONACH() {
    if (this.addpoonachForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      console.log("form",this.addpoonachForm.value)
      this.adminservice.updateCounsellor(this.addpoonachForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-poonach']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
        }
      )
    }
  }
apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
    
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-poonach'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-poonach'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}
