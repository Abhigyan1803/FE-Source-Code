import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-counsellors-dograi',
  templateUrl: './add-counsellors-dograi.component.html',
  styleUrls: ['./add-counsellors-dograi.component.scss']
})
export class AddCounsellorsDograiComponent implements OnInit {

  pageTitle = "Add DOGRAI";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  adddograiForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.adddograiForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['1'],
      companyId: ['7'],
      status:['1']

    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-dograi')) {
      this.pageTitle = 'Add DOGRAI'
    }
    else if (this.router.url.includes('view-dograi')) {
      this.spinner.show()
      this.pageTitle = 'View DOGRAI'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.adddograiForm.patchValue({
              id:res.object.id,
              name: res.object.name,
              rankName: res.object.rankName,
              mobileNumber:  res.object.mobileNumber,
              
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
    return this.adddograiForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/thbn/counsellors-dograi']);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  addDOGRAI() {
    if (this.adddograiForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.adddograiForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/thbn/counsellors-dograi']);
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



  updateDOGRAI() {
    if (this.adddograiForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      console.log("form",this.adddograiForm.value)
      this.adminservice.updateCounsellor(this.adddograiForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/thbn/counsellors-dograi']);
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
    this.router.navigate(['main/academic-depart/counsellors/thbn/counsellors-dograi'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/thbn/counsellors-dograi'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}