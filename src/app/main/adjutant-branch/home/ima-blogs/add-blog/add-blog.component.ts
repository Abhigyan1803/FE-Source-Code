import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';


@Component({
  selector: 'ms-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  @ViewChild('file', { static: true }) imgFile;
  @ViewChild('document', { static: true }) document;

  @ViewChild('categorySelector', { static: true }) categorySelector;

  userName = localStorage.getItem('userName')
  unSelectedFile;
  isError: boolean = false;
  previewImg: string = '';
  previewDoc:string = '';
  addBlogForm: FormGroup
  pageName: string = "Add Blog"

  id;

  otherCategory: boolean = false;

  blogCategory: any[] = ['Lifestyle', 'Fitness', 'Sports', 'Warfare', 'Entertainment', 'Arts',
    'Historical', 'Others'];

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private authService: AuthService, private dialog:MatDialog
    ,private route: ActivatedRoute, private cdref: ChangeDetectorRef, private service: AdminService, private sharedService: SharedService) {
    this.addBlogForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      author: [this.userName],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      image: [''],
      docs: ['']
    })



  }

  disableForm: boolean = false;


  ngOnInit(): void {

    if (this.router.url.includes('ima-blog/view-blog')) {
      this.pageName = 'View Blog';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getIMABlogById(this.id).subscribe(
        res => {
          this.spinner.show()
          console.log(res);
          let d = res.object
          if (res.status == 'OK') {

            this.addBlogForm.patchValue({
              title: d.title,
              category: d.category,
              author: d.author,
              description: d.description,
              status: d.status,
            })
            if (this.userName != d.author) {
              this.disableForm = true;
              this.addBlogForm.disable()
            }





            if (!this.blogCategory.includes(d.category)) {
              this.otherCategory = true;
              this.categorySelector.nativeElement.value = 'Others'
            } else {
              this.categorySelector.nativeElement.value = d.category
            }

            this.descLength = d.description.length;

            this.previewImg = d.blogImage
            this.previewDoc = d.docs
            this.spinner.hide();
          }
          else {
            this.sharedService.openSnackbar(res.msg)
            this.spinner.hide();
          }
        }
      )


    }
    // else if (this.router.url.includes('add-event')) {
    //   this.pageName = 'Add Upcoming Event'
    // }

    // this.unSelectedFile = this.imgFile.nativeElement.files

  }

  goBack() {
    window.history.back();
    // this.router.navigate(['/main/admin/home/ima-blog'])
  }




  /** ========= CHARACTERS COUNT ========= */
  titleLength = 0;
  descLength = 0;
  charCount(e: any, t) {
    if (t == 'title')
      this.titleLength = e.target.value.length
    if (t == 'description') {
      if (e.target.value.length > 3000) {
        return false;
      } else {
        this.descLength = e.target.value.length
      }
    }

  }

  categorySelected(e: any) {
    if (e == 'Others') {
      this.otherCategory = true;
      this.f.category.setValue('')

    } else {
      this.otherCategory = false;
      // this.addBlogForm.patchValue({
      //   category:e
      // })
      this.f.category.setValue(e)
    }
  }

  onSelectImage(e: any) {
    // this.addBlogForm.patchValue({
    //   image: e.target.files[0]
    // })


    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.imgFile.nativeElement.files = this.unSelectedFile;
      this.sharedService.openSnackbar('Image Should Be Maximum 50 MB in Size')
    } else {
      this.addBlogForm.patchValue({
        image: file
      });

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewImg = event.target.result;
      }
    }

    //  var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = (event:any)=>{
    //   this.previewImg = event.target.result;
    // }
  }

  onSelectDocument(e: any) {

    let file = e.target.files[0]
    // console.log(file);

    if (file.type != "application/pdf") {
      this.sharedService.openAlertSnackbarWithSeconds('Please Chose Only PDF Document.', 4)
    } else {

      if (file.size > 157286400) {
        this.document.nativeElement.files = this.unSelectedFile;
        this.sharedService.openSnackbar('Document Should Be Maximum 150 MB in Size')
      } else {
        this.addBlogForm.patchValue({
          docs: file
        });

      }
    }


  }

  public get f() {
    return this.addBlogForm.controls;
  }

  addBlog() {
    if (this.addBlogForm.invalid) {
      alert('Please Fill Required Details')
    } else {
      this.spinner.show();

      this.service.addIMABlog(this.addBlogForm.value).subscribe(
        res => {
          this.apiRes(res)
        },
        err => {
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
          this.spinner.hide()
        }
      )
    }
  }

  apiRes(res) {
    if (res.status == "OK") {
      this.sharedService.openSnackbar(res.message)
      this.cdref.detectChanges();

      this.spinner.hide();
      this.goBack()
    }
    else {
      this.sharedService.openSnackbar(res.message)
      this.spinner.hide()
    }
  }

  updateBlog() {
    if (this.addBlogForm.invalid) {
      alert('Please Fill Required Details')
    } else {
      this.spinner.show();

      this.service.updateIMABlog(this.id, this.addBlogForm.value).subscribe(
        res => {
          this.apiRes(res)
        },
        err => {
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
          this.spinner.hide()
        }
      )
    }
  }


  public onChange(event: CKEditor4.EventInfo) {
    this.authService.resetTime()
    // console.log(event.editor.getData());
    // console.log(event.editor)
  }

  eventFired(e, t) {
    // console.log(t)
    this.authService.resetTime()
  }


  openDoc(url){
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:"Document",url: this.previewDoc
      }
    });
  }


}
