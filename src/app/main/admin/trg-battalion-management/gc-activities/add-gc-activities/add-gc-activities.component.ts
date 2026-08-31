import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-gc-activities',
  templateUrl: './add-gc-activities.component.html',
  styleUrls: ['./add-gc-activities.component.scss']
})
export class AddGcActivitiesComponent implements OnInit {

  addActivitiesForm: FormGroup;
  id;
  pageTitle;
  memberObj;
  previewImg;
  isError: boolean = false;
  battalionList: any[] = [];
  companyList: any[] = [];
                               
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,private _trgBattalion:TrgBattalionService
   , private service: AdminService, private cdref: ChangeDetectorRef,  private spinner: NgxSpinnerService) { 
    this.addActivitiesForm = this.fb.group({
      battalion: ['', Validators.required],
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
    if (this.router.url.includes('add-activities')) {
      this.pageTitle = 'Add Activities'
    }
    else if (this.router.url.includes('view-activities')) {
      this.spinner.show()
      this.pageTitle = 'View Activities'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getGcActivitiesById(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            // this.battalionSelected(res.object.battalionType.id)
            this.addActivitiesForm.patchValue({
             
              name: res.object.name,
              battalion: res.object.battalionType.id,
              description: res.object.description.id,
              status: res.object.status
            })

            this.previewImg = res.object.image
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
    this.router.navigate(['/main/admin/trg-battalion/gc-activities']);
  }

  // battalionSelected(e: any) {
  //   this.spinner.show();
  //   this.service.getCompanyList(e).subscribe(
  //     res => {
  //       if (res.status == 'OK') {
  //         this.companyList = res.object
  //         this.cdref.detectChanges();
  //         this.spinner.hide();
  //       } else {
  //         this.spinner.hide()
  //       }
  //     },
  //     err => {
  //       this.spinner.hide();
  //     }
  //   )

  // }

  onSelectImage(e) {
    this.addActivitiesForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }


  public get f() {
    return this.addActivitiesForm.controls;
  }

  

  addActivities() {
    if (this.addActivitiesForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addGcActivities(this.addActivitiesForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/gc-activities']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message)
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

  updateActivities() {
    if (this.addActivitiesForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateGcActivities(this.id, this.addActivitiesForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/gc-activities'])
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message);
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
