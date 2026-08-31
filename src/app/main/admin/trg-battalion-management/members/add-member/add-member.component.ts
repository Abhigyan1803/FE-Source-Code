import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
IP=Links.IP;
  addMemberForm: FormGroup;
  id;

  pageTitle;
  memberObj;
  previewImg;
  isError: boolean = false;
  isCoyCmdr: boolean = false;

  battalionPosts: any[] = [];
  battalionList: any[] = [];
  companyList: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private service: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) {

    this.addMemberForm = this.fb.group({
      rank: ['', Validators.required],
      name: ['', Validators.required],
      awards: [''],
      post: ['', Validators.required],
      battalion: ['', Validators.required],
      company: ['0'],
      image: [],
      status: ['1', Validators.required]
    });

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

    this.service.getBattalionPosts().subscribe(
      res => {
        // console.log(res);
        if (res.status == "OK") {
          this.battalionPosts = res.object
          this.cdref.detectChanges();
        }
      }
    )

  }

  ngOnInit(): void {
    if (this.router.url.includes('add-member')) {
      this.pageTitle = 'Add Member'
    }
    else if (this.router.url.includes('view-member')) {
      this.spinner.show()
      this.pageTitle = 'View Member'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getTRGBattalionMemberById(this.id).subscribe(
        res => {
          // console.log(res);

          if (res.status == 'OK') {
            this.battalionSelected(res.object.battalionType.id)
            this.addMemberForm.patchValue({
              rank: res.object.rank,
              name: res.object.name,
              post: res.object.battalionPost.id,
              battalion: res.object.battalionType.id,
              company: res.object.companyId,
              status: res.object.status,
              awards: res.object.award
            })

            if (res.object.battalionPost.id == 3) {
              this.isCoyCmdr = true;
              this.addMemberForm.get('company').setValidators([Validators.required]);
              this.addMemberForm.get('company').updateValueAndValidity();
            }
            else {
              this.isCoyCmdr = false;
              this.addMemberForm.get('company').clearValidators();
              this.addMemberForm.get('company').updateValueAndValidity();
            }

            this.previewImg = res.object.image
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.message);
          }
        }
      )
    }
  }

  goBack() {
    this.router.navigate(['/main/admin/trg-battalion/members']);
  }

  battalionSelected(e: any) {
    this.spinner.show();
    this.service.getCompanyList(e).subscribe(
      res => {
        console.log(res)
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
  postSelected(e: any) {
    if (e == 3) {
      this.isCoyCmdr = true;
      this.addMemberForm.get('company').setValidators([Validators.required]);
      this.addMemberForm.get('company').updateValueAndValidity();
    }
    else {
      this.isCoyCmdr = false;
      this.addMemberForm.get('company').clearValidators();
      this.addMemberForm.get('company').updateValueAndValidity();
    }
  }

  onSelectImage(e) {
    this.addMemberForm.patchValue({
      image: e.target.files[0]
    })
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    }
  }

  public get f() {
    return this.addMemberForm.controls;
  }

  addMember() {
    if (this.addMemberForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.service.addTRGBattalionMember(this.addMemberForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/members']);
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

  updateMember() {
    if (this.addMemberForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show()
      this.service.updateTRGBattalionMember(this.id, this.addMemberForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/admin/trg-battalion/members'])
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
