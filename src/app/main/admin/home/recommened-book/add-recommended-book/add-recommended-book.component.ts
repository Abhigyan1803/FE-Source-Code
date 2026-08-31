import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-recommended-book',
  templateUrl: './add-recommended-book.component.html',
  styleUrls: ['./add-recommended-book.component.scss']
})
export class AddRecommendedBookComponent implements OnInit {

  id;
  pTitle:string = '';
  descLength:number = 0;
  addRecommendedForm: FormGroup = new FormGroup({});

  isError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, 
    private route: ActivatedRoute, private cdref: ChangeDetectorRef, private service: AdminService) {

    this.addRecommendedForm = this.fb.group({

      bookName: ['', Validators.required],
      bookGenre: ['', Validators.required],
      authorName: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      
    });

  }

  ngOnInit(): void {
    if(this.router.url.includes('view-book-list')){
      this.pTitle = 'View Recommended Reading List';
      this.id = this.route.snapshot.queryParamMap.get('id');

      this.service.getRecommendedBookById(this.id).subscribe(
        res => {
          let values = res.object
          console.log(res);

          this.addRecommendedForm.patchValue({
            authorName: values.authorName,
        bookGenre: values.bookGenre,
        bookName: values.bookName,
        description: values.description,
        status: values.status,
          })
          this.descLength =  res.object.description.length;
          
        }
      )

    } else {
      this.pTitle = 'Add Recommended Reading List';
    }
  }




  goBack(){
    this.router.navigate(['/main/admin/home/book-list']);
  }

  
  addRecommendedBook() {
    this.spinner.show()
    if(this.addRecommendedForm.invalid){
      this.isError=true;
      this.spinner.hide()
    } else {
      this.service.addRecommendedBook(this.addRecommendedForm.value).subscribe(
        res => {
          console.log(res);

          if(res.status == 'OK'){
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/book-list']);
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

  charCount(e: any) {
    this.descLength = e.target.value.length
}

  updateRecommendedBook() {
    this.spinner.show()
    if(this.addRecommendedForm.invalid){
      this.isError=true;
      this.spinner.hide()
    } else {
      this.service.updateRecommendedBook(this.id,this.addRecommendedForm.value).subscribe(
        res => {
          console.log(res);

          if(res.status == 'OK'){
            this.spinner.hide();
            this.router.navigate(['/main/admin/home/book-list']);
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

  public get f() {
    return this.addRecommendedForm.controls;
  }

}
