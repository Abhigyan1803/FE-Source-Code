import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-complaints',
  templateUrl: './add-complaints.component.html',
  styleUrls: ['./add-complaints.component.scss']
})
export class AddComplaintsComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Complaints";
  battalions:any[]=[];
  descLength:number = 0;
  RemarksLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addComplaintsForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService, private el: ElementRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private adminservice: AdminService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {

    this.addComplaintsForm = this.fb.group({
      title: ['', Validators.required],
      requestType: ['', Validators.required],
      requestNature: ['', Validators.required],
      details: ['', Validators.required],
      requestStatus: [''],
      name:[''],
      address:[''],
      department:[localStorage.getItem('department')],
      remarks: ['', ],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-complaints')) {
      this.pageTitle = 'Add Complaints'
    }
    else if (this.router.url.includes('view-complaints')) {
      this.spinner.show()
      this.pageTitle = 'View Complaints'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getComplaintsByID(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addComplaintsForm.patchValue({
              title: res.object.title,
              address: res.object.address,
              details: res.object.details,
              requestType: res.object.requestType,
              requestNature: res.object.requestNature,
              remarks: res.object.remarks,
              name: res.object.name,
              department: res.object.department,
              requestStatus: res.object.requestStatus,
              status:  res.object.status,
            })
            this.descLength =  res.object.details.length;
            this.docUrl = res.object.file
            this.isDoc = true;
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
    return this.addComplaintsForm.controls;
  }
  goBack() {
    this.router.navigate(['/main/trg-team/it']);
  }

  addComplaints() {
    console.log(this.addComplaintsForm.value);
    
    if (this.addComplaintsForm.invalid) {
      this.isError = true;
      for (const key of Object.keys(this.addComplaintsForm.controls)) {
        if (this.addComplaintsForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
    } else {
      this.spinner.show();
      this.adminservice.addComplaints(this.addComplaintsForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.adminservice.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['/main/trg-team/it']);
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

  charCount(e: any,t) {
    if(t == 'desc')
    this.descLength = e.target.value.length
    if(t == 'remarks')
    this.RemarksLength= e.target.value.length
}

openDoc(l) {
  this.dialog.open(DialogComponent, {
    width: '1300px', height: '650px',
    data: {
      type: 'document', title:"Document",url: l
    }
    
  });
 

}

onSelectDoc(e) {
  console.log(this.docUrl);
  
  var file = e.target.files[0]
  if (file.size > 52428800) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addComplaintsForm.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

updateComplaints() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addComplaintsForm.valid) {
    this.adminservice.updateComplaints(this.addComplaintsForm.value,this.id).subscribe(
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
    
    if(this.router.url.includes('main/trg-team'))
    this.router.navigate(['/main/trg-team/it'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/trg-team/it'])  
 
  } else {
    this.spinner.hide()
    this.adminservice.openSnackbar(res.message)
  }
}

}

