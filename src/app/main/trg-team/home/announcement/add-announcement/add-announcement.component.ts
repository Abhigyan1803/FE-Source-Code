import { ChangeDetectorRef, Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {

  unSelectedFile;
  pageTitle = "Add Announcement";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addAnnouncementForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) inputFile;  
  @ViewChild('scheduleDate',{static:true}) scheduleDate;

  minDate;
  date_time;
  localID;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref: ChangeDetectorRef, @Inject(LOCALE_ID) localID: string,
    private activeRoute: ActivatedRoute) {
      
    this.addAnnouncementForm = this.fb.group({
      announcementDescp: ['', Validators.required],
      validTill: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.minDate =formatDate(Date.now(), 'yyyy-MM-dd',this.localID);

    // this.getBattalion();

    this.localID = localID;
  }


  ngOnInit(): void {
    this.unSelectedFile = this.inputFile.nativeElement.files
    
    if (this.router.url.includes('add-announcement')) {
      this.pageTitle = 'Add Announcement'
    }
    else if (this.router.url.includes('view-announcement')) {
      this.spinner.show()
      this.pageTitle = 'View Announcement'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getAnnouncementById(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.addAnnouncementForm.patchValue({
              announcementDescp: res.object.announcementDescp,
              validTill: formatDate(res.object.validTill, 'yyyy-MM-dd', this.localID),
              status:  res.object.status,
            })
            this.descLength =  res.object.announcementDescp.length;

            this.docUrl = res.object.announcementDocument
            // this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.adminservice.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addAnnouncementForm.controls;
  }
  goBack() {
    this.router.navigate(['main/admin/home/announcement/']);
  }

  addAnnouncement() {
    if (this.addAnnouncementForm.invalid) {
      this.isError = true;
    } else {
      this.spinner.show();
      this.adminservice.addAnnouncement(this.addAnnouncementForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/admin/home/announcement/']);
          } else {
            this.spinner.hide();
            this.adminservice.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
}

openDoc(l) {
  console.log(l);
  
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url:l
    }
  });
}

onSelectDoc(e) {
  var file = e.target.files[0]
  if (file.size > 157286400) {
    this.inputFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 5 MB in Size')
  } else {
    this.docUrl = ''
    this.addAnnouncementForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateAnnouncement() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addAnnouncementForm.valid) {
    this.adminservice.updateAnnouncement(this.id,this.addAnnouncementForm.value).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.")
      }
    )
  }
  else {
    this.isError = true;
  }
}

apiRes(res) {
  if (res.status == 'OK') {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
    
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/admin/home/announcement/'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['main/admin/home/announcement/'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}


dateChanged(e:any){
  console.log(e.target.value)
    this.date_time = new Date(e.target.value);

    let currDt = new Date();
    let checkDt = formatDate(currDt, 'yyyy-MM-dd', this.localID);

    if (e.target.value == checkDt) {
      this.date_time.setHours(currDt.getHours());
      this.date_time.setMinutes(currDt.getMinutes());
    } else {
      this.date_time.setHours("00");
      this.date_time.setMinutes("00");
    }


  }




}
