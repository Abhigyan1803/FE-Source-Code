import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent implements OnInit {

  id;
  pTitle = "Add Link";
  isError: boolean = false;
  isWrongUrl: boolean = false;
  tabNames=['Library Management System','Archive Management System'];
  
  addLinkForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private cdref: ChangeDetectorRef, private service: AdminService) {

    this.addLinkForm = this.fb.group({
      name:['',Validators.required],
      url: ['', Validators.required],
      status: ['1', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.router.url.includes('view-link')) {
      this.pTitle = 'View Link'
      this.id = this.route.snapshot.queryParamMap.get('id')
      console.log(this.id);
      this.service.getCentralLIbraryById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addLinkForm.patchValue({
              name:res.object.tabName,
              url: res.object.linkUrl,
              status: res.object.status
            })
          }
        }
      )

    }
  }

  public get f() {
    return this.addLinkForm.controls;
  }

  addCentralLIbraryLink() {
    if (this.addLinkForm.invalid) {
      this.isError = true;
    } else if(!this.f.url.value.startsWith('http') || !this.f.url.value.startsWith('https')){ 
      this.isWrongUrl = true;
    }
    else {

        this.isWrongUrl = false
        this.spinner.show()

        this.service.addCentralLIbraryLink(this.addLinkForm.value).subscribe(
          res => {
            console.log(res);
            if (res.status == 'OK') {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
              this.router.navigate(['/main/admin/home/central-library-management']);
            } else {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
            }
          },
          err => {
            this.spinner.hide();
            this.service.openSnackbar('Error Occured.');
          }
        )

      


    }
  }

  updateCentralLibraryLink() {
    if (this.addLinkForm.invalid) {
      this.isError = true;
    }
    else {
        this.spinner.show()
        this.service.updateCentralLibraryLink(this.id, this.addLinkForm.value).subscribe(
          res => {
            console.log(res);
            if (res.status == 'OK') {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
              this.router.navigate(['/main/admin/home/central-library-management'])
            } else {
              this.spinner.hide();
              this.service.openSnackbar(res.message);
            }
          },
          err => {
            this.spinner.hide();
            this.service.openSnackbar('Error Occured.');
          }
        )

    }

  }

  goBack() {
    this.router.navigate(['/main/admin/home/central-library-management'])
  }

}
