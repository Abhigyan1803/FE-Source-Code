import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-greybook',
  templateUrl: './add-greybook.component.html',
  styleUrls: ['./add-greybook.component.scss']
})
export class AddGreybookComponent implements OnInit {

  id;
  pTitle:string = '';
  addGreybookForm: FormGroup = new FormGroup({});
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, 
    private route: ActivatedRoute, private cdref: ChangeDetectorRef, private service: AdminService) {

    this.addGreybookForm = this.fb.group({
      userRank: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      address:['', [Validators.required]],
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      department: ['', Validators.required],
      post: ['', Validators.required],
      status: ['1', Validators.required],
    });

  }

  ngOnInit(): void {
    if(this.router.url.includes('view-greybook')){
      this.pTitle = 'View Greybook';
      this.id = this.route.snapshot.queryParamMap.get('id');

      this.service.getGreybookById(this.id).subscribe(
        res => {
          let values = res.object
          // console.log(res);

          this.addGreybookForm.patchValue({
            userRank: values.userRank,
            name: values.name,
            email: values.email,
            address: values.address,
            countryCode: values.countyCode,
            phoneNumber: values.phoneNumber,
            department: values.department,
            post: values.post,
            status: values.status,
          })
          
        }
      )

    } else {
      this.pTitle = 'Add Greybook';
    }
  }

  get officialEmail() {
    return this.addGreybookForm.get('email');
} 

  public get f() {
    return this.addGreybookForm.controls;
  }

  goBack(){
    this.router.navigate(['/main/admin/home/greybook']);
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addGreybook() {
    this.spinner.show()
    if(this.addGreybookForm.invalid){
      this.isError=true;
      this.spinner.hide()
    } else {
      this.service.addGreybook(this.addGreybookForm.value).subscribe(
        res => {
          console.log(res);

          if(res.status == 'OK'){
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/greybook']);
            this.service.openSnackbar(res.message);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);  
          }
          
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Error Occured.");  
        
        }
      )
    }
  }


  updateGreybook() {
    this.spinner.show()
    if(this.addGreybookForm.invalid){
      this.isError=true;
      this.spinner.hide()
    } else {
      this.service.updateGreybook(this.id,this.addGreybookForm.value).subscribe(
        res => {
          console.log(res);

          if(res.status == 'OK'){
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/greybook']);
            this.service.openSnackbar(res.message);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);  
          }
          
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Error Occured.");  
        
        }
      )
    }
  }

}
