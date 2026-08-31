import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GcService} from 'app/service/gc/gc.service'
@Component({
  selector: 'ms-add-entitlement',
  templateUrl: './add-entitlement.component.html',
  styleUrls: ['./add-entitlement.component.scss']
})
export class AddEntitlementComponent implements OnInit {
  cadetDetails:any;
  id;
  pTitle:string = 'Add Entitlement';
  addEntitlementForm: FormGroup = new FormGroup({});
  entitlements:string[]=['MES','Personal Kit Items','IT','Additional Items'];

  isError: boolean = false;
  type:string;
  userDetails;
  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, 
    private route: ActivatedRoute, private cdref: ChangeDetectorRef, public service:GcService, public sharedService:SharedService) {

  this.cadetDetails = JSON.parse(localStorage.getItem('loginResponse')).object
   console.log("888888888",this.cadetDetails.name);
    this.route.params.subscribe(
      (params)=>{
        
        this.type = params.type;
        // console.log("Recieved Param: ", this.type);

        if(!this.entitlements.includes(this.type)){
          
          this.router.navigate(['/gc/content/dashboard'])
          this.sharedService.openErrorSnackbarWithSeconds('Error!',5)
        }

        this.addEntitlementForm = this.fb.group({
          cadetId: ['', [Validators.required]],
          cadetName:['', [Validators.required]],
          details: ['', Validators.required],
          title: ['', Validators.required],
          address:['', [Validators.required]],
          type: ['', Validators.required],
          // status: ['1', Validators.required],
        });

       


      }
    )
this.userDetails= JSON.parse(localStorage.getItem("loginResponse")); 
console.log(this.userDetails);


  }

  ngOnInit(): void {
    
    this.f.cadetId.setValue(this.userDetails.object.id)
    this.f.cadetName.setValue(this.cadetDetails.name)
    this.f.type.setValue(this.type)
    console.log("*****",this.addEntitlementForm.value);
    // if(this.router.url.includes('view-greybook')){
    //   this.pTitle = 'View Greybook';
    //   this.id = this.route.snapshot.queryParamMap.get('id');

      // this.service.getGreybookById(this.id).subscribe(
      //   res => {
      //     let values = res.object
      //     // console.log(res);

      //     this.addEntitlementForm.patchValue({
      //       userRank: values.userRank,
      //       name: values.name,
      //       email: values.email,
      //       address: values.address,
      //       countryCode: values.countyCode,
      //       phoneNumber: values.phoneNumber,
      //       department: values.department,
      //       post: values.post,
      //       status: values.status,
      //     })
          
      //   }
      // )

    // } 

  }


  public get f() {
    return this.addEntitlementForm.controls;
  }

  goBack(){
    this.router.navigate(["/gc/content/entitlements/"+this.type]);
  }

  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addEntitlement() {
 
    this.spinner.show()
    if(this.addEntitlementForm.invalid){
      this.isError=true;
      this.spinner.hide()
    } else {
      this.service.addEntitlement(this.addEntitlementForm.value).subscribe(
        res => {
          console.log(res);
          this.apiResponse(res)
         },
        err => {
          this.spinner.hide();
          this.sharedService.openSnackbar("Error Occured.");  
        
        }
      )
    }



  }

  apiResponse(res){
    if(res.status == 'OK'){
      this.spinner.hide();
      this.goBack()
      this.sharedService.openSnackbar(res.message);
    } else {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message);  
    }
  }


  updateEntitlement() {


    // this.spinner.show()
    // if(this.addEntitlementForm.invalid){
    //   this.isError=true;
    //   this.spinner.hide()
    // } else {
    //   this.service.updateGreybook(this.id,this.addEntitlementForm.value).subscribe(
    //     res => {
    //       console.log(res);

    //       if(res.status == 'OK'){
    //         this.spinner.hide();
    //         this.router.navigate(['/main/admin/home/greybook']);
    //         this.service.openSnackbar(res.message);
    //       } else {
    //         this.spinner.hide();
    //         this.service.openSnackbar(res.message);  
    //       }
          
    //     },
    //     err => {
    //       this.spinner.hide();
    //       this.service.openSnackbar("Error Occured.");  
        
    //     }
    //   )
    // }
    
  }
  titleLength=0;
addLength=0;
detailength=0;
  charCount(e:any,t){
    if(t == 'title')
    this.titleLength = e.target.value.length
    if(t == 'address')
    this.addLength = e.target.value.length
    if(t == 'details')
    this.detailength = e.target.value.length
   
   }




}
