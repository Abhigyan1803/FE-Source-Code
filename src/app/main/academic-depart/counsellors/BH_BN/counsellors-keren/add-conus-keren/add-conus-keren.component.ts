import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-conus-keren',
  templateUrl: './add-conus-keren.component.html',
  styleUrls: ['./add-conus-keren.component.scss']
})
export class AddConusKerenComponent implements OnInit {

  pageTitle = "Add KEREN";
  id: string = '';
  isAdmin:boolean = false;
  addkerenForm: FormGroup = new FormGroup({});
  isError: boolean;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addkerenForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['4'],
      companyId: ['15'],
      status:['1']

    })

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-keren')) {
      this.pageTitle = 'Add KEREN'
    }
    else if (this.router.url.includes('view-keren')) {
      this.spinner.show()
      this.pageTitle = 'View KEREN'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addkerenForm.patchValue({
              name: res.object.name,
              rankName: res.object.rankName,
              mobileNumber:  res.object.mobileNumber,
              id: res.object.id
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
    return this.addkerenForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-keren']);
  }

  addKEREN() {
    if (this.addkerenForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.addkerenForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-keren']);
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


updateKEREN() {
  if (this.addkerenForm.invalid) {
    this.isError = true;
  } else {
    this.spinner.show();
    console.log("form",this.addkerenForm.value)
    this.adminservice.updateCounsellor(this.addkerenForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-keren']);
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
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-keren'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/bhbn/counsellors-keren'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}