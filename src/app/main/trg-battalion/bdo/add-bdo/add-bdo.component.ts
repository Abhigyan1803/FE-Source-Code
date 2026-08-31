import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrgBattalionService } from '../../../../service/trg-battalion/trg-battalion.service';

@Component({
  selector: 'ms-add-bdo',
  templateUrl: './add-bdo.component.html',
  styleUrls: ['./add-bdo.component.scss']
})
export class AddBdoComponent implements OnInit {
  addBdoForm: FormGroup;
  title: string;
  unSelectedFile: any;
  docUrl: any;
  datePipe = new DatePipe('en-IN');
  id:string = '';
  minDate: any;
  isError: boolean;
  isDoc: boolean = false;
  isAdmin:boolean = false;
  battalionsList:any[]=[];
  @ViewChild('inputFile', { static: true }) docFile;
  userDetails:any;
  bdoDoc: string;

  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService, private cdref:ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private activeRoute: ActivatedRoute) {
    this.addBdoForm = this.fb.group({
      date: ['', Validators.required],
      battalion:['',Validators.required],
      status: ['1', Validators.required],
      bdoDoc: ['',Validators.required]
    })
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.bdoDoc='';
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;

    if(this.router.url.includes('main/trg-battalion')){
      this.isAdmin = false;
      
      const battalion = this.userDetails.battalion
      this.addBdoForm.patchValue({
        battalion:battalion.id
      })
    } else if(this.router.url.includes('main/admin')) {
      this.isAdmin = true;
      this._trgBattalion.getBattalionList().subscribe(
        res=>{
          if(res.status == "OK"){
            this.battalionsList = res.object;
            this.cdref.detectChanges();
          }
        }
      )
    }
    
    this.unSelectedFile = this.docFile.nativeElement.files;

    if(this.router.url.includes('view-bdo')){
      this.id = this.activeRoute.snapshot.queryParamMap.get('id');
      this.title = "View BDO"
        this.getBdo();
    }
    else if (this.router.url.includes('add-bdo')) {
      this.title = 'Add BDO'
    }

  }

  get f() {
    return this.addBdoForm.controls;
  }

  getBdo() {

    // this.spinner.show();
    this._trgBattalion.getBdoById(this.id).subscribe(res => {
      console.log("by id", res);
      if (res.status == 'OK') {
        this.addBdoForm.patchValue({
          date: this.datePipe.transform(res.object.date, 'yyyy-MM-dd'),
          battalion:res.object.battalian.id,
          status: res.object.status
        })
        this.docUrl = res.object.bdoDocuments[0].bdoDocument;
        this.spinner.hide();
      }
      else {
        this._trgBattalion.openSnackbar(res.msg)
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
    })

  }

  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:"BDO Document",url: l
      }
    });
  }

  onSelectDoc(e) {
    var file = e.target.files[0]
    if(file){
      if (file.size > 52428800) {
        this.docUrl = null;
        this.isDoc = false;
        this.docFile.nativeElement.files = this.unSelectedFile;
        this._trgBattalion.openSnackbar('Document Should Be Maximum 50 MB in Size')
      } 
      else {
        this.docUrl = '';
        this.docUrl = null;     
        this.isDoc=true;
      }
    }
      else{
        this.docUrl = null;
        this.isDoc=false;
      }

      this.addBdoForm.patchValue({
        bdoDoc: file
      });
    
   
    // console.log("selected Doc", this.addBdoForm.value);
  }

  submit() {
    if (this.addBdoForm.valid) {
      if (this.addBdoForm.value.bdoDoc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgBattalion.addBdo(this.addBdoForm.value).subscribe(res => {
          // console.log("result", res);
          this.apiRes(res);
        },
          err => {
            this.spinner.hide()
            this._trgBattalion.openSnackbar("Some Error Occured.")
          }
        )
      }
    } else {
      this.isError = true;
    }
  }

  updateBdo() {
    this.spinner.show();
    // console.log("Bdo", this.addBdoForm.value);

    if (this.addBdoForm.valid) {
      this._trgBattalion.updateBdo(this.id, this.addBdoForm.value).subscribe(
        res => {
          // console.log(res);
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
    if (res.status == 'OK') {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message)
      
      if(this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/bdo'])
    
      if(this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/bdo'])  
   
    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message)
    }
  }

  goBack(){
      if(this.router.url.includes('main/trg-battalion'))
    this.router.navigate(['/main/trg-battalion/bdo'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/trg-battalion/bdo'])  
 
  }

}
