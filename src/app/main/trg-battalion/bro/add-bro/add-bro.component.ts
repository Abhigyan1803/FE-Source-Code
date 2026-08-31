import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrgBattalionService } from '../../../../service/trg-battalion/trg-battalion.service';


@Component({
  selector: 'ms-add-bro',
  templateUrl: './add-bro.component.html',
  styleUrls: ['./add-bro.component.scss']
})
export class AddBroComponent implements OnInit {
  addBroForm: FormGroup;
  battalionsList:any[]=[];
  title: string = "Add BRO";
  unSelectedFile: any;
  docUrl: any;
  datePipe = new DatePipe('en-IN');
  id: string="";
  minDate: any;
  isError;
  isDoc : boolean = false;
  isAdmin:boolean=false;
  localID
  
  currentTime = new Date()
   year = this.currentTime.getFullYear()
  userDetails:any;
  @ViewChild('inputFile', { static: true }) docFile;
  broDoc: string;
  constructor(
    @Inject(LOCALE_ID) localID: string, private cdref:ChangeDetectorRef, private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private activeRoute: ActivatedRoute) {
    this.addBroForm = this.fb.group({
      date: ['', Validators.required],
      number:['', Validators.required],
      year:[this.year, Validators.required],
      status: ['1', Validators.required],
      battalion:['',Validators.required],
      broDoc: ['',Validators.required]
    })
    this.minDate = formatDate(Date.now(), 'yyyy-MM-dd', localID);
    this.localID = localID;
  }
  

  

  ngOnInit(): void {
    this.broDoc='';
    
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object
   
    if(this.router.url.includes('main/trg-battalion')){
      this.isAdmin = false;
      const battalion = this.userDetails.battalion
      this.addBroForm.patchValue({
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

    if(this.router.url.includes('view-bro')){
      this.id = this.activeRoute.snapshot.queryParamMap.get('id')
      this.title = "View BRO"
      this.getBro();
    }

   

  }


  get f() {
    return this.addBroForm.controls;
  }

  getBro() {
    this.spinner.show();
    this._trgBattalion.getBroById(this.id).subscribe(res => {
      console.log("by id", res);
      this.spinner.hide();
      if (res.status == 'OK') {
        this.addBroForm.patchValue({
          number:res.object.broNumber  ,
          date: formatDate(res.object.date, 'yyyy-MM-dd', this.localID),
          battalion:res.object.battalian.id,
          status: res.object.status
        })
        this.docUrl = res.object.broDocuments[0].broDocument;
      }
      else {
        this._trgBattalion.openSnackbar(res.msg)
      }
    }, (err) => {
      this.spinner.hide();
    })
  }


  onSelectDoc(e) {
  
    var file = e.target.files[0];
    // alert(file);
    console.log(file,'==================================');
    if(file){
      if (file.size > 52428800) {
        this.docUrl = null;
        this.isDoc = false;
        this.docFile.nativeElement.files = this.unSelectedFile;
        this._trgBattalion.openSnackbar('Document Should Be Maximum 50 MB in Size')
      } else {
        this.docUrl = '';
        this.docUrl = null;
     
        this.isDoc=true;
  
      }

    }
    else{

      this.docUrl = null;
      this.isDoc=false;
  
    }

    this.addBroForm.patchValue({
      broDoc: file
    });
   
    console.log("selected Doc", this.addBroForm.value);
  }

  openDoc(l) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'BRO Document', url: l
      }
    });
  }

  submit() {
    console.log(this.addBroForm.value,'=============++++++++=')

    if (this.addBroForm.valid) {
      this.spinner.show();
      
      if (this.addBroForm.value.broDoc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgBattalion.addBro(this.addBroForm.value).subscribe(res => {
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


  updateBro() {
    if (this.addBroForm.valid) {
      this.spinner.show();
      this._trgBattalion.updateBro(this.id, this.addBroForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.");
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
      this._trgBattalion.openSnackbar(res.message);

      if(this.router.url.includes('main/trg-battalion'))
      this.router.navigate(['/main/trg-battalion/bro']);
    
      if(this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/bro']);

    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message);
    }
  }
  goBack(){
    
    if(this.router.url.includes('main/trg-battalion'))
    this.router.navigate(['/main/trg-battalion/bro'])
  
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/trg-battalion/bro']);  
 
  }

}
