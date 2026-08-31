import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-gallantry',
  templateUrl: './add-gallantry.component.html',
  styleUrls: ['./add-gallantry.component.scss']
})
export class AddGallantryComponent implements OnInit {
  addGallantryForm: FormGroup;
  id;
  pageTitle = "Add Gallantry Awardees";
  memberObj;
  previewImg;
  isError: boolean = false;
  battalionList: any[] = [];
  companyList: any[] = [];
                               
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,private _trgBattalion:TrgBattalionService
   , private service: AdminService, private cdref: ChangeDetectorRef,  private spinner: NgxSpinnerService){

    this.addGallantryForm = this.fb.group({
      rank: ['', Validators.required],
      name: ['', Validators.required],
      awards:[''],
      battalion: ['', Validators.required],
      company: ['', Validators.required],
      image: [],
      status: ['1', Validators.required]
    })
    this.service.getBattalionList().subscribe(
      res => {
        this.spinner.show();
        if (res.status == 'OK') {
          this.battalionList = res.object
          this.cdref.detectChanges();
          this.spinner.hide()
        } else {
          this.spinner.hide();
        }

      }, err => {
        this.spinner.hide();
      }
    )
    }

  ngOnInit(): void {
    if (this.router.url.includes('add-gallantry')) {
      this.pageTitle = 'Add Gallantry Awardees'
    }
    else if (this.router.url.includes('view-gallantry')) {
      this.spinner.show()
      this.pageTitle = 'View Gallantry Awardees'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getTRGBattalionGallantryById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == '1') {
            this.addGallantryForm.patchValue({
              rank: res.Object.rank,
              name: res.Object.name,
              awards:res.Object.award,
              battalion: res.Object.battalionId,
              status:  res.Object.status,
       
            })

            this.previewImg = res.Object.image
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        }
      )
    }
  }

  goBack() {
    this.router.navigate(['/main/admin/trg-battalion/gallantry']);
  }

  onSelectImage(e) {
    this.addGallantryForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }


  public get f() {
    return this.addGallantryForm.controls;
  }

  battalionSelected(e: any) {
    this.spinner.show();
    this.service.getCompanyList(e).subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.companyList = res.object
          this.cdref.detectChanges();
          this.spinner.hide();
        } else {
          this.spinner.hide()
        }
      },
      err => {
        this.spinner.hide();
      }
    )

  }

  addGallantryaward() {
    if (this.addGallantryForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addGallantryaward(this.addGallantryForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == '1') {
            this.service.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/gallantry']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  updateGallantry() {
    if (this.addGallantryForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateTRGBattalionGallantry(this.id, this.addGallantryForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.service.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/gallantry'])
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.msg);
          }
        },
        err => {
          this.spinner.hide()
          this.service.openSnackbar('Error Occured.')
        }
      )
    }
  }


}
