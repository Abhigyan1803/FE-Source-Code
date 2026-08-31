import { ChangeDetectorRef, Component, OnInit, LOCALE_ID, Inject  } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-occasion',
  templateUrl: './add-occasion.component.html',
  styleUrls: ['./add-occasion.component.scss']
})
export class AddOccasionComponent implements OnInit {


  id;
  pTitle: string = 'Add Special Occasion';
  addOccasionForm: FormGroup = new FormGroup({});
  relations:string[]=['H/O','W/O'];
  isError: boolean = false;
  localID;
  datePipe = new DatePipe('en-IN');
  Date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private cdref: ChangeDetectorRef, private service: AdminService, 
    @Inject(LOCALE_ID) lID: string) {
  
    this.addOccasionForm = this.fb.group({
   
      marriageAnniversary: [''],
      officerDOB: ['', Validators.required],
      officerName: ['', Validators.required],
      officerRank: ['', Validators.required],
      department:['', Validators.required],
      relation: [''],
      spouseDOB: [''],
      spouseName: [''],
      icNumber:['', Validators.required],
      status: ['1', Validators.required],
   
    });

    this.localID = lID

  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  ngOnInit(): void {


    if (this.router.url.includes('/adjutant-branch/social-list/view?id')) {
      this.pTitle = 'View Special Occasion';
      this.id = this.route.snapshot.queryParamMap.get('id');

      this.service.getSpecialOccasionById(this.id).subscribe(
        res => {
          let values = res.object

          console.log(res);

          this.addOccasionForm.patchValue({
            officerDOB: formatDate(values.officerDOB, 'yyyy-MM-dd', this.localID),
            officerName: values.officerName,
            officerRank: values.officerRank,
            department:values.postedBranch,
            relation: values.relation,
            spouseName: values.spouseName,
            status: values.status,
            icNumber:values.icNumber
          })

          if (values.spouseDOB){
            this.addOccasionForm.patchValue({
              spouseDOB: formatDate(values.spouseDOB, 'yyyy-MM-dd', this.localID),
            })
          }

          if (values.marriageAnniversary) {
            this.addOccasionForm.patchValue({
              marriageAnniversary: formatDate(values.marriageAnniversary, 'yyyy-MM-dd', this.localID),
            })
          }


        }
      )

    } else {
    }
  }

  public get f() {
    return this.addOccasionForm.controls;
  }

  officerDOBSelected(e:any){
    this.addOccasionForm.patchValue({
      officerDOB:formatDate(e.target.value, 'yyyy-MM-dd', this.localID)
    })
  }
  spouseDOBSelected(e: any) {
    this.addOccasionForm.patchValue({
      spouseDOB: formatDate(e.target.value, 'yyyy-MM-dd', this.localID)
    })
  }
  mariageDateSelected(e: any) {
    this.addOccasionForm.patchValue({
      marriageAnniversary: formatDate(e.target.value, 'yyyy-MM-dd', this.localID)
    })
  }



  goBack() {
    // this.router.navigate(['/main/admin/home/special-occasions']);
    
    this.router.navigate(['/main/adjutant-branch/social-list']);

  }


  addSpecialOccasion() {
    console.log(this.addOccasionForm.value);
    
    this.spinner.show();
    if (this.addOccasionForm.invalid) {
      this.isError = true;
      this.spinner.hide();
    } else {
      this.service.addSpecialOccasion(this.addOccasionForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.goBack();
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


  updateSpecialOccasion() {
    this.spinner.show()
    if (this.addOccasionForm.invalid) {
      this.isError = true;
      this.spinner.hide()
    } else {
      this.service.updateSpecialOccasion(this.id, this.addOccasionForm.value).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.spinner.hide();
            this.goBack()
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
