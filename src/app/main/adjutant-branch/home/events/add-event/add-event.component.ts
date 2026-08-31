import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import {formatDate} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  
  @ViewChild('scheduleDate',{static:true}) scheduleDate;
  @ViewChild('scheduleHours',{static:true}) scheduleHours;
  @ViewChild('scheduleMinutes',{static:true}) scheduleMinutes;

  
  minHours;
  minMinutes;
  minDate;
  date_time;
  
  hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  minutes =['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
  
  localID;

  @ViewChild('file', { static: true }) imgFile;
  @ViewChild('dateTime',{static:true}) dateTime;
  
  unSelectedFile;
  isError:boolean=false;
  previewImg: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addEventForm: FormGroup
  pageName:string
  id;

  constructor(private fb: FormBuilder, private router: Router, private spinner:NgxSpinnerService, private route:ActivatedRoute, 
    private cdref: ChangeDetectorRef, private service:AdminService, private snackbar:MatSnackBar,  @Inject( LOCALE_ID ) localID: string) {
    this.addEventForm = this.fb.group({
      date:[''],
      time: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1',Validators.required],
      isGcEvent:[''],
      image: ['']
    })


    this.localID = localID
    this.minDate =formatDate(Date.now(), 'yyyy-MM-dd',this.localID);

  }

  ngOnInit(): void {

    if(this.router.url.includes('view-event')){
      this.pageName = 'View Upcoming Event';
      this.id =  this.route.snapshot.queryParamMap.get('id');
      this.service.getEventDetailsById(this.id).subscribe(
        res =>{
          this.spinner.show()
          console.log(res);
          if(res.status == '1'){

            let checkDt = formatDate(res.List.eventDate, 'yyyy-MM-dd', this.localID);
            let currDt = formatDate(Date.now(), 'yyyy-MM-dd', this.localID);

            this.scheduleDate.nativeElement.value = formatDate(res.List.eventDate, 'yyyy-MM-dd',this.localID);
            this.date_time = new Date(res.List.eventDate);
            this.scheduleHours.nativeElement.value = formatDate(res.List.eventDate, "HH",this.localID);
            this.scheduleMinutes.nativeElement.value = formatDate(res.List.eventDate, "mm",this.localID);
            

            this.addEventForm.patchValue({
              time: res.List.eventDate,
              title: res.List.title,
              description: res.List.description,
              status: res.List.status,
              isGcEvent: res.List.isGcEvent
            })

            this.titleLength = res.List.title.length;
            this.descLength = res.List.description.length;


            if(currDt == checkDt){
              this.minHours = new Date().getHours();
              this.minMinutes = new Date().getMinutes();
            }

            this.titleLength = res.List.title.length
            this.descLength = res.List.description.length

            this.previewImg = res.List.image
          this.spinner.hide();
          }
          else {
            this.openSnackbar(res.msg)
            this.spinner.hide();
          }
        }
      )


    }
    else if(this.router.url.includes('add-event')){
      this.pageName = 'Add Upcoming Event'
    }
   
    this.unSelectedFile = this.imgFile.nativeElement.files
  
  }

  goBack(){
    this.router.navigate(['/main/gs-branch/home/events'])
  }

  dateChanged(e:any){
  console.log(e.target.value)
    this.date_time = new Date(e.target.value);

    let currDt = new Date();
    let checkDt = formatDate(currDt, 'yyyy-MM-dd', this.localID);

    if (e.target.value == checkDt) {
      this.minHours = currDt.getHours();
      this.minMinutes = currDt.getMinutes();
      this.scheduleHours.nativeElement.value = formatDate(currDt, 'HH', this.localID);
      this.scheduleMinutes.nativeElement.value = formatDate(currDt, 'mm', this.localID);
      this.date_time.setHours(currDt.getHours());
      this.date_time.setMinutes(currDt.getMinutes());
    } else {
      this.date_time.setHours("00");
      this.date_time.setMinutes("00");
      this.minHours = '00';
      this.minMinutes = '00';
      this.scheduleHours.nativeElement.value = '00';
      this.scheduleMinutes.nativeElement.value = '00';
    }


    this.addEventForm.patchValue({
      time: Date.parse(this.date_time)
    })  
     console.log(this.date_time);
    console.log(new Date(this.addEventForm.get('time').value));
     
  }

  hoursSelected(e:any){
    
    let currDt = new Date();
    let checkDt = formatDate(currDt, 'yyyy-MM-dd', this.localID);

    if (this.scheduleDate.nativeElement.value == checkDt) {
      let currHrs = currDt.getHours();
      if (e.target.value > currHrs) {
        this.minMinutes = '00';
        this.scheduleMinutes.nativeElement.value = '00';
      }
    }
    this.date_time.setHours(e.target.value)
  
    this.addEventForm.patchValue({
      time:Date.parse(this.date_time)
    })
   
    console.log(this.date_time);
  }

  minutesSelected(e:any){
    this.date_time.setMinutes(e.target.value);
    this.addEventForm.patchValue({
      time:Date.parse(this.date_time)
    })
    console.log(this.date_time); 
  }

  
/** ========= CHARACTERS COUNT ========= */
titleLength=0;
descLength=0;
  charCount(e:any,t){
    if(t == 'title')
    this.titleLength = e.target.value.length
    if(t == 'description')
    this.descLength = e.target.value.length
   }



  onSelectImage(e: any) {
    // this.addEventForm.patchValue({
    //   image: e.target.files[0]
    // })

    
    let file = e.target.files[0]
    //change file from 50mb to 200mb 
    // if (file.size > 52428800) {
   if (file.size > 202428800) {
      this.imgFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 200 MB in Size')
    } else {
      this.addEventForm.patchValue({
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

  public  get f(){
    return this.addEventForm.controls;
  }

  addEvent() {
    if(this.addEventForm.invalid){
      alert('Please Fill Required Details')
    } else {
    this.spinner.show();
   
    this.service.addEvent(this.addEventForm.value).subscribe(
      res =>{
        if(res.status == "1"){
          this.openSnackbar(res.msg)
          this.cdref.detectChanges();
          this.router.navigate(['/main/admin/home/events']);
          window.history.back;
        }
        else{
          this.openSnackbar(res.msg)
          this.spinner.hide()
        }
      },
      err =>{
        this.openSnackbar('Error Occured.')
        console.log(JSON.parse(err));
        
      }
    )
    }
  }

  
  updateEvent() {
    if(this.addEventForm.invalid){
      alert('Please Fill Required Details')
    } else {
    this.spinner.show();
  
    this.service.updateEvent(this.id,this.addEventForm.value).subscribe(
      res =>{
        if(res.status == "1"){
          this.openSnackbar(res.msg)
          this.cdref.detectChanges()
          this.router.navigate(['/main/admin/home/events'])
          this.spinner.hide();
          window.history.back;
        }
        else{
          this.openSnackbar(res.msg)
          this.spinner.hide()
        }
        console.log(res);
        
      },
      err =>{
        this.spinner.hide()
        console.log(JSON.parse(err));
        
      }
    )
    }
  }

  openSnackbar(msg){
    this.snackbar.open(msg,'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }


}
