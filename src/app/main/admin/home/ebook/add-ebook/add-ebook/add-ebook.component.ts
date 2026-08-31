import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'app/Constants/Constants';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
declare const $: any; 

@Component({
  selector: 'ms-add-ebook',
  templateUrl: './add-ebook.component.html',
  styleUrls: ['./add-ebook.component.scss']
})
export class AddEbookComponent implements OnInit {
  addEbookForm: FormGroup = new FormGroup({});
  imgFile: any;
  unSelectedFile;
  previewImg: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  docExtArr: string[] = Constants.DOC_EXTS;
  imgExtArr: string[] = Constants.IMG_EXTS;
  pTitle:string='Add E-Book'
  id:any;

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute,
   private service: AdminService, public sharedService: SharedService, private snackbar:MatSnackBar, private acadmicService: AcademicDeptService,
   private Trgservice: TrgBattalionService) {
    this.addEbookForm = this.fb.group({
      name:['',Validators.required],
      ebookUrl: ['', Validators.required],
      status: ['1', Validators.required],
      description:[''],
      id:['']

    })
    }

  ngOnInit(): void {
    if (this.router.url.includes('view-ebook')) {
      this.pTitle = 'View E-Book'
      this.id = this.route.snapshot.queryParamMap.get('id')
      console.log(this.id);
      this.service.getEbookById(this.id).subscribe(
        (res:any) => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addEbookForm.patchValue({
              name:res.object.name,
              ebookUrl: res.object.ebookUrl,
              status: res.object.status,
              description: res.object.description,
              id: res.object.id
            })
          }
          
          console.log(this.addEbookForm.value);
          
        }
      )

    }
  }

  public get f() {
    return this.addEbookForm.controls;
  }

  goBack(){
    this.router.navigate(['/main/admin/home/ebook'])
  }

  onSelectImage(e: any) {
    console.log('image value',$('#image').val() );
    
    // let file = e.target.files[0]
    // //change file from 50mb to 200mb 
    // let fileSizeMatch = this.sharedService.checkFileSize(file);
    // // if (file.size > 52428800) {
    //   if (!fileSizeMatch) {
    //   this.imgFile.nativeElement.files = this.unSelectedFile;
    //   this.openSnackbar(`Document Should Be Maximum ${this.sharedService.fileSize} MB in Size`)
    // } else {
    //   // this.addEventForm.patchValue({
    //   //   image: file
    //   // });

    //   var reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.previewImg = event.target.result;
    //   }
    // }  
    const file = (e.target as HTMLInputElement).files[0]
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
    if (this.docExtArr.includes(ext) || this.imgExtArr.includes(ext) ) {
      let fileSizeMatch = this.sharedService.checkFileSize(file);
      if (file.size < 202428800) {
        this.Trgservice.FileAboutUs(file).subscribe(
         
          (res: any) => {
            console.log(res);
            // // console.log(res);
            // let _progress
            // switch (res.type) {
            //   case HttpEventType.Sent:
            //     this.authService.resetTime()
            //     // console.log('Request has been made!');
            //     break;
            //   case HttpEventType.ResponseHeader:
            //     this.authService.resetTime()
            //     // console.log('Response header has been received!');
            //     break;
            //   case HttpEventType.UploadProgress:
            //     _progress = Math.round(res.loaded / res.total * 100);
            //     this.authService.resetTime()
            //     // // console.log(`Uploaded! ${_progress}%`);
            //     this.setNotesProgress(i, j, _progress)
            //     break;
            //   case HttpEventType.Response: {
            //     // // console.log('User successfully created!', res.body);
            //     const obj = res.body;

            //     if (obj.status == "OK") {
            //       if (this.docExtArr.includes(ext)) {
            //         this.setNoteUrl(i, j, obj.object.url, 'document')
            //       } else if (this.imgExtArr.includes(ext)) {
            //         this.setNoteUrl(i, j, obj.object.url, 'img')
            //       } else if (this.vidExtArr.includes(ext)) {
            //         this.setNoteUrl(i, j, obj.object.url, 'video')
            //       }
            //     }
            //     // // console.log(this.addSubjectForm.value);
            //     this.authService.resetTime()
            //   }
            // }
            this.addEbookForm.patchValue({
              ebookUrl:res.object.url
            })
          }
        )
      } else {
        this.sharedService.openAlertSnackbarWithSeconds('File Size Exceeded.', 3)
        $('#image').val(''); 
      }
    } else {
      this.sharedService.openAlertSnackbarWithSeconds("Please Select a Valid File or Document.", 5)
    }

  }

  openSnackbar(msg){
    this.snackbar.open(msg,'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  //add e-book
  addEbook(){
   this.service.addEbook(this.addEbookForm.value).subscribe((res:any)=>{
    console.log(res);
    this.openSnackbar(res.message)
    this.router.navigate(['/main/admin/home/ebook'])
   },(err:any)=>{
    console.log(err);
    
   })
  }

  //update e-book
  updateEbook(){
    this.service.updateEbook(this.addEbookForm.value).subscribe((res:any)=>{
      console.log(res);
      this.openSnackbar(res.message)
      this.router.navigate(['/main/admin/home/ebook'])
     },(err:any)=>{
      console.log(err);
      
     })
  }
}
