import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.scss']
})
export class AddPerformanceComponent implements OnInit {

  addPerformanceForm: FormGroup;
  id;
  pageTitle;
  memberObj;
  previewImg;
  isError: boolean = false;
  battalionList: any[] = [];
  companyList: any[] = [];
  descLength;
  
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,private _trgBattalion:TrgBattalionService
   , private service: AdminService, private cdref: ChangeDetectorRef,  private spinner: NgxSpinnerService) { 
    this.addPerformanceForm = this.fb.group({
      // rank: ['', Validators.required],
      // name: ['', Validators.required],
      battalion: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
      // image: [],
      status: ['1', Validators.required]
    })
    this.service.getBattalionList().subscribe(
      res => {
        // this.spinner.show();
        if (res.status == 'OK') {
          this.battalionList = res.object
          this.cdref.detectChanges();
          // this.spinner.hide()
        } else {
          // this.spinner.hide();
        }

      }, err => {
        this.spinner.hide();
      }
    )
   }

  ngOnInit(): void {
    if (this.router.url.includes('add-performance')) {
      this.pageTitle = 'Add Performance Highlight'
    }
    else if (this.router.url.includes('view-performance')) {
      this.spinner.show()
      this.pageTitle = 'View Performance Highlight'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getTRGBattalionPerformanceById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            // this.battalionSelected(res.object.battalionType.id)
            this.addPerformanceForm.patchValue({
              rank:res.object.performanceRank,
              name: res.object.name,
              battalion: res.object.battalian.id,
              
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
    this.router.navigate(['/main/admin/trg-battalion/performance']);
  }

  battalionSelected(e: any) {
    this.spinner.show();
    this.service.getCompanyList(e).subscribe(
      res => {
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

  onSelectImage(e) {
    this.addPerformanceForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }


  public get f() {
    return this.addPerformanceForm.controls;
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
  }


  addPerformance() {
    if (this.addPerformanceForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addPerformance(this.addPerformanceForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/performance']);
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

  updatePerformance() {
    if (this.addPerformanceForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateTRGBattalionPerformance(this.id, this.addPerformanceForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/performance'])
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
