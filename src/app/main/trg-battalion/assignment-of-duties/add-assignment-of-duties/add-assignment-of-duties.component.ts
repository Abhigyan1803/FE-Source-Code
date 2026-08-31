import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-assignment-of-duties',
  templateUrl: './add-assignment-of-duties.component.html',
  styleUrls: ['./add-assignment-of-duties.component.scss']
})

export class AddAssignmentOfDutiesComponent implements OnInit {
  unSelectedFile: any;
  title: string = "Add Assignment of Duties";
  battalions:any[]=[];

  id: string = '';
  isAdmin:boolean = false;
  addAssignmentForm: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  addBroForm: FormGroup;
  docUrl: any;
  isError: boolean;
  isDoc: boolean = true;
  @ViewChild('inputFile', { static: true }) docFile;
  
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService, private cdref:ChangeDetectorRef,
    private activeRoute: ActivatedRoute) {
    this.addAssignmentForm = this.fb.group({
      battalionType: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    // this.getBattalion();

  }

  ngOnInit(): void {
    if(this.router.url.includes('main/trg-battalion')){
      this.isAdmin = false;
      const battalion = JSON.parse(localStorage.getItem('loginResponse')).object.battalion.id;
      this.addAssignmentForm.patchValue({
        battalionType:battalion
      })
    } else if(this.router.url.includes('main/admin')) {
      this.isAdmin = true;
      this._trgBattalion.getBattalionList().subscribe(
        res=>{
          if(res.status == "OK"){
            this.battalionList = res.object;
            this.cdref.detectChanges();
          }
        }
      )
    }
    

    this.unSelectedFile = this.docFile.nativeElement.files;





    if(this.router.url.includes('view-aod')){
      this.id = this.activeRoute.snapshot.queryParamMap.get('id')
      
      this.title = "View Assignment of Duties"
      this.getAssignment();
      
    }

    // this.activeRoute.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    // });
    // this.getBattalion();
    // if (this.id > 0) {
    //   this.title = "View Assignment of Duties"
    //   this.getAssignment();
    // } else {
    //   this.title = "Add Assignment of Duties"
    // }
  }


  getBattalion() {
    this._trgBattalion.getBattalionList().subscribe(res => {
      // console.log(res);
      if(res.status == "OK"){
        this.battalionList = res.object;
        this.cdref.detectChanges();
      }
    })
  }

  getAssignment() {
    this.spinner.show();
    this._trgBattalion.getAssigmentById(this.id).subscribe(res => {
      console.log(res);
      if(res.status == "1"){

        this.addAssignmentForm.patchValue({
          battalionType: res.List.battalionType.id,
          status: res.List.status,
        })
        this.docUrl = res.List.document;
        this.cdref.detectChanges();
        this.spinner.hide();

      } else{
        this.spinner.hide();
        this._trgBattalion.openSnackbar(res.message)
      }
    },
    err=>{
      this.spinner.hide();
      this._trgBattalion.openSnackbar("Some Error Occured.")
  
    }
    
    )
  }

  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this._trgBattalion.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addAssignmentForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
  }

  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:"Assignment of Duties", url: l
      }
    });
  }


  get f() {
    return this.addAssignmentForm.controls;
  }

  submit() {
    if (this.addAssignmentForm.valid) {
      if (this.addAssignmentForm.value.doc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgBattalion.addAssigment(this.addAssignmentForm.value).subscribe(res => {
          this.apiRes(res);
        },
          err => {
            this.spinner.hide()
            this._trgBattalion.openSnackbar("Some Error Occured.")
          }
        )
      }
    }
    else {
      this.isError = true;
    }
  }

  updateAssignment() {
    if (this.addAssignmentForm.valid) {
      this.spinner.show();
      this._trgBattalion.updateAssignment(this.id, this.addAssignmentForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.")
        }
      )
    }
    else {
      this.isError = true;
    }
  }

  apiRes(res) {
    if (res.status == '1') {
      this.spinner.hide();
      this._trgBattalion.openSnackbar(res.msg);

      if(this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/assignment-of-duties']);
    
      if(this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/assignment-of-duties']);
  
    }
    else {
      this.spinner.hide();
      this._trgBattalion.openSnackbar(res.msg)
    }
  }

  goBack(){
    if(this.router.url.includes('main/trg-battalion'))
    this.router.navigate(['/main/trg-battalion/assignment-of-duties']);
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/trg-battalion/assignment-of-duties']);
  }

}
