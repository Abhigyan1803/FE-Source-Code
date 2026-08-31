import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.scss']
})
export class AddHistoryComponent implements OnInit {
  IP = Links.IP;
  addHistoryForm: FormGroup = new FormGroup({});

  id;
  pageTitle;
  memberObj;
  previewImg;
  isError: boolean = false;
  battalionList: any[] = [];
  companyList: any[] = [];
                               
  descLength:number = 0;


  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,private _trgBattalion:TrgBattalionService
   , private service: AdminService, private cdref: ChangeDetectorRef,  private spinner: NgxSpinnerService) { 
    this.addHistoryForm = this.fb.group({
    
      history: ['', Validators.required],
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
    if (this.router.url.includes('add-history')) {
      this.pageTitle = 'Add History'
    }
    else if (this.router.url.includes('view-history')) {
      this.spinner.show()
      this.pageTitle = 'View History'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getTRGBattalionHistoryById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            // this.battalionSelected(res.object.battalionType.id)
            this.addHistoryForm.patchValue({
              name: res.object.name,
              battalion: res.object.battalionType.id,
              history: res.object.description,
              status: res.object.status
            });
            this.descLength = res.object.description.length;

            this.previewImg = res.object.image;
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
    this.router.navigate(['/main/admin/trg-battalion/history']);
  }

  onSelectImage(e) {
    this.addHistoryForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }


  public get f() {
    return this.addHistoryForm.controls;
  }

  charCount(e: any) {
      this.descLength = e.target.value.length
  }

  addHistory() {
    if (this.addHistoryForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addHistory(this.addHistoryForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/history']);
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

  updateHistory() {
    if (this.addHistoryForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateTRGBattalionHistory(this.id, this.addHistoryForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/history'])
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
