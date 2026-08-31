import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-conus-singarh',
  templateUrl: './add-conus-singarh.component.html',
  styleUrls: ['./add-conus-singarh.component.scss']
})
export class AddConusSingarhComponent implements OnInit {

  pageTitle = "Add SINGARH";
  id: string = '';
  isAdmin:boolean = false;
  addsingarhForm: FormGroup = new FormGroup({});
  isError: boolean;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addsingarhForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['4'],
      companyId: ['14'],
      status:['1']


    })

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-singarh')) {
      this.pageTitle = 'Add SINGARH'
    }
    else if (this.router.url.includes('view-singarh')) {
      this.spinner.show()
      this.pageTitle = 'View SINGARH'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addsingarhForm.patchValue({
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
    return this.addsingarhForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-singarh']);
  }

  addSINGARH() {
    if (this.addsingarhForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.addsingarhForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-singarh']);
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


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  updateSINGARH() {
  if (this.addsingarhForm.invalid) {
    this.isError = true;
  } else {
    this.spinner.show();
    console.log("form",this.addsingarhForm.value)
    this.adminservice.updateCounsellor(this.addsingarhForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-singarh']);
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
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-singarh'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-singarh'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}