import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-conus-sangro',
  templateUrl: './add-conus-sangro.component.html',
  styleUrls: ['./add-conus-sangro.component.scss']
})
export class AddConusSangroComponent implements OnInit {

  pageTitle = "Add SANGRO";
  id: string = '';
  isAdmin:boolean = false;
  addsangroForm: FormGroup = new FormGroup({});
  isError: boolean;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addsangroForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['3'],
      companyId: ['10'],
      status:['1']

    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-sangro')) {
      this.pageTitle = 'Add SANGRO'
    }
    else if (this.router.url.includes('view-sangro')) {
      this.spinner.show()
      this.pageTitle = 'View SANGRO'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addsangroForm.patchValue({
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
    return this.addsangroForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-sangro']);
  }

  addSANGRO() {
    if (this.addsangroForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.addsangroForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-sangro']);
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


  updateSANGRO() {
  if (this.addsangroForm.invalid) {
    this.isError = true;
  } else {
    this.spinner.show();
    console.log("form",this.addsangroForm.value)
    this.adminservice.updateCounsellor(this.addsangroForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-sangro']);
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
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-sangro'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-sangro'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}
