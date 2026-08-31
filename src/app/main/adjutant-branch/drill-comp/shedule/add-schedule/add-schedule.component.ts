
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';


@Component({
  selector: 'ms-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add";
  battalions:any[]=[];
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addScheduleForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  

  type:string;
  // term:string;
  // termId:number;


  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: AdjutantService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
        activeRoute.params.subscribe(
          params=>{
            console.log(params);
            
            // this.term = params.term;
            this.type = params.type;

            // if(this.term == 'I Term'){
            //   this.termId = 1;
            // } else if(this.term == 'II Term'){
            //   this.termId = 2;
            // } else if(this.term == 'III Term'){
            //   this.termId = 3;
            // } else if(this.term == 'II Tech'){
            //   this.termId = 7;
            // } else {
            //     this.router.navigate(['/main/adjutant-branch/dashboard'])
            // }
            // console.log(this.termId);
            
            
          }
        )
    this.addScheduleForm = this.fb.group({
      title: ['', Validators.required],
      status: ['1', Validators.required],
      file: [],
      type:[this.type],
      // termId:[this.termId]
    })

    // this.getBattalion();

  }


  ngOnInit(): void {
   
     if (this.router.url.includes('view')) {
      this.spinner.show()
      this.pageTitle = 'View'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.viewSCHEDULEId(this.id).subscribe(
        res => {
          console.log(res,"durgesh");
          
          if (res.status == 'OK') {
            this.addScheduleForm.patchValue({
              title: res.object.title,
              status:  res.object.status,

            })
            // this.descLength =  res.object.description.length;
            this.docUrl = res.object.document
          console.log(this.docUrl,"durgesh1");

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
    return this.addScheduleForm.controls;
  }
  goBack() {
    window.history.back();
  }

  addSchedule() {
    if (this.addScheduleForm.invalid || !this.isDoc) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addScheduleNResult(this.addScheduleForm.value).subscribe(
        res => {
          console.log(res);
         this.apiRes(res)
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
  if (file.size > 104857600) {
    this.docFile.nativeElement.files = this.unSelectedFile;
    this.service.openSnackbar('Document Should Be Maximum 100 MB in Size')
  } else {
    this.docUrl = ''
    this.addScheduleForm.patchValue({
      file: file
    });
    this.isDoc=true;
  }
}

updateSchedule() {
  this.spinner.show();
  console.log("durgesh", this.addScheduleForm.value);

  if (this.addScheduleForm.valid) {
    this.service.updateSCHEDULE(this.addScheduleForm.value,this.id).subscribe(
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
   this.goBack()
 
  } else {
    this.spinner.hide()
    this.service.openSnackbar(res.message)
  }
}

}
