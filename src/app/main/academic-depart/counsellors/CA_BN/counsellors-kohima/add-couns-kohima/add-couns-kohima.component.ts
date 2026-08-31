import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-couns-kohima',
  templateUrl: './add-couns-kohima.component.html',
  styleUrls: ['./add-couns-kohima.component.scss']
})
export class AddCounsKohimaComponent implements OnInit {

  pageTitle = "Add KOHIMA";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addkohimaForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addkohimaForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      rankName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      battalionId: ['1'],
      companyId: ['1'],
      status:['1']
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-kohima')) {
      this.pageTitle = 'Add KOHIMA'
    }
    else if (this.router.url.includes('view-kohima')) {
      this.spinner.show()
      this.pageTitle = 'View KOHIMA'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getCounsellorById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addkohimaForm.patchValue({
              id:res.object.id,
              name: res.object.name,
              rankName:res.object.rankName,
              mobileNumber:res.object.mobileNumber
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
    return this.addkohimaForm.controls;
  }
  goBack() {
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-kohima']);
  }

  addKOHIMA() {
    if (this.addkohimaForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      console.log("form",this.addkohimaForm.value)
      this.adminservice.addCounsellor(this.addkohimaForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-kohima']);
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


updateKOHIMA() {
  if (this.addkohimaForm.invalid) {
    this.isError = true;
  } else {
    this.spinner.show();
    console.log("form",this.addkohimaForm.value)
    this.adminservice.updateCounsellor(this.addkohimaForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.adminservice.openSnackbar(res.message)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-kohima']);
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
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-kohima'])
  
    if(this.router.url.includes('main/academic-depart'))
    this.router.navigate(['main/academic-depart/counsellors/cabn/counsellors-kohima'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

