import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-conus-imphal',
  templateUrl: './add-conus-imphal.component.html',
  styleUrls: ['./add-conus-imphal.component.scss']
})
export class AddConusImphalComponent implements OnInit {

  pageTitle = "Add IMPHAL";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addimphalForm: FormGroup = new FormGroup({});
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
    this.addimphalForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['1'],
      companyId: ['9'],
      status:['1']

    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-imphal')) {
      this.pageTitle = 'Add IMPHAL'
    }
    else if (this.router.url.includes('view-imphal')) {
      this.spinner.show()
      this.pageTitle = 'View IMPHAL'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addimphalForm.patchValue({
              id:res.object.id,
              name: res.object.name,
              rankName: res.object.rankName,
              mobileNumber:  res.object.mobileNumber,
            })
            // this.descLength =  res.object.description.length;
            // this.docUrl = res.object.file
            // this.isDoc = true;
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
    return this.addimphalForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-imphal']);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  addIMPHAL() {
    if (this.addimphalForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addCounsellor(this.addimphalForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-imphal']);
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



  updateIMPHAL() {
    if (this.addimphalForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      console.log("form",this.addimphalForm.value)
      this.adminservice.updateCounsellor(this.addimphalForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-imphal']);
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
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-imphal'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/mabn/counsellors-imphal'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}