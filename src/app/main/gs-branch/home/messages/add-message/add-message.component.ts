import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.scss']
})
export class AddMessageComponent implements OnInit {

  @ViewChild('file', { static: true }) imgFile;
  unSelectedFile;
  previewImg: string = '';

  addMessageForm: FormGroup;
  pageName: string;
  id;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef,
    private route: ActivatedRoute, private snackbar: MatSnackBar, private service: AdminService) {
    this.addMessageForm = this.fb.group({
      rank: ['', Validators.required],
      name: ['', Validators.required],
      awards: ['', Validators.required],
      organisation: ['INDIAN MILITARY ACADEMY', Validators.required],
      message: ['', Validators.required],
      status: ['1', Validators.required],
      image: ['']
    })
  }


  ngOnInit(): void {
    if (this.router.url.includes('view-message')) {
      this.pageName = "View Message"
      this.id = this.route.snapshot.queryParamMap.get('id');

      this.service.getCommandantMessageById(this.id).subscribe(
        res => {
          console.log(res);
          
          this.addMessageForm.patchValue({
            rank: res.List.designation,
            name: res.List.name,
            awards: res.List.award,
            message: res.List.message,
            status: res.List.status,
          })
          this.rankLength = res.List.designation.length;
          this.nameLength =  res.List.name.length;
          this.awardsLength = res.List.award.length;
          this.msgLength = res.List.message.length;

          this.previewImg = res.List.image;
        }
      )

    } else if (this.router.url.includes('add-message')) {
      this.pageName = "Add Message"
    }

    this.unSelectedFile = this.imgFile.nativeElement.files

  }

  goBack(){
    this.router.navigate(['/main/admin/home/messages'])
  }

  onSelectImage(e: any) {
    // this.addMessageForm.patchValue({
    //   image: e.target.files[0]
    // })


    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.imgFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addMessageForm.patchValue({
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

  public get f(){
    return this.addMessageForm.controls;
  }

  rankLength=0
  nameLength=0;
  awardsLength=0;
  msgLength=0;
  charCount(e:any,t){
    if(t == 'rank')
    this.rankLength = e.target.value.length
    if(t == 'name')
    this.nameLength = e.target.value.length
    if(t == 'awards')
    this.awardsLength = e.target.value.length
    if(t == 'msg')
    this.msgLength = e.target.value.length
   }

  addMessage() {

    if(this.addMessageForm.invalid){
      alert('Please Fill Required Details')
    }else {

      this.spinner.show();
      this.service.addCommandantMessage(this.addMessageForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == "1") {
            this.openSnackbar(res.msg);
            this.cdref.detectChanges();
            this.spinner.hide()
            this.router.navigate(['/main/admin/home/messages'])
          } else {
            this.openSnackbar(res.msg)
            this.spinner.hide()
          }
        },
        err => {
          this.spinner.hide()
          console.log(JSON.stringify(err));
  
        }
      )
  
    }
  }

  updateMessage() {
    if(this.addMessageForm.invalid){
      alert('Please Fill Required Details')
    }else {

    this.spinner.show()
    this.service.updateCommandantMessage(this.id, this.addMessageForm.value).subscribe(
      res => {
        console.log(res);
        if (res.status == "1") {
          this.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.spinner.hide();
          this.router.navigate(['/main/admin/home/messages'])
        } else {
          this.openSnackbar(res.msg)
          this.spinner.hide()
        }
      },
      err => {
        this.spinner.hide();
        console.log(JSON.stringify(err));

      }
    )
    }
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }



}
