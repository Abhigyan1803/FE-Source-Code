
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add PACB";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addPACBForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: AdjutantService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute, private sharedService: SharedService) {
    this.addPACBForm = this.fb.group({
      title: ['', Validators.required],
      status: ['1', Validators.required],
      file: []
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
    if (this.router.url.includes('add-schedule')) {
      this.pageTitle = 'Add Schedule'
    }
    else if (this.router.url.includes('view-schedule')) {
      this.spinner.show()
      this.pageTitle = 'View Schedule'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.viewSCHEDULEId(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addPACBForm.patchValue({
              title: res.object.title,
              status:  res.object.status,
            })
            // this.descLength =  res.object.description.length;
            this.docUrl = res.object.file
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.service.openSnackbar(res.message)
          }
        }
      )
    }
  }

  public get f() {
    return this.addPACBForm.controls;
  }
  goBack() {
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule']);
  }

  addSchedule() {
    if (this.addPACBForm.invalid || !this.isDoc) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addSCHEDULE(this.addPACBForm.value).subscribe(
        res => {
          console.log(res);
          if (res.status == 'OK') {
            this.service.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.spinner.hide();
            this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule']);
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

  charCount(e: any) {
    this.descLength = e.target.value.length
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
  var file = e.target.files[0]
  //change file from 50mb to 200mb 
 let fileSizeMatch = this.sharedService.checkFileSize(file);
  // if (file.size > 52428800) {
  if (!fileSizeMatch) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.service.openSnackbar('Document Should Be Maximum 200 MB in Size')
  } else {
    this.docUrl = ''
    this.addPACBForm.patchValue({
      file: file
    });
    this.isDoc=true;
  }
}

updateSchedule() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addPACBForm.valid) {
    this.service.updateSCHEDULE(this.addPACBForm.value,this.id).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.service.openSnackbar("Some Error Occured.")
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
    this.service.openSnackbar(res.message)
    
    if(this.router.url.includes('main/GS-Branch'))
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule'])
  
    if(this.router.url.includes('adjutant-branch'))
    this.router.navigate(['main/adjutant-branch/general-instruction/drill-competition/schedule'])  
 
  } else {
    this.spinner.hide()
    this.service.openSnackbar(res.message)
  }
}

}
