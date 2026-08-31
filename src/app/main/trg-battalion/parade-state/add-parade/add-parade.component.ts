import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { TrgBattalionService } from '../../../../service/trg-battalion/trg-battalion.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-parade',
  templateUrl: './add-parade.component.html',
  styleUrls: ['./add-parade.component.scss']
})
export class AddParadeComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile;
  unSelectedFile;
  isDoc;
  isError;
  docUrl;
  id;
  previewImg;
  pTitle = "Add Pared State of GCs";

  addParadeForm:FormGroup= new FormGroup({});
  constructor(private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService,
    private service:AdjutantService, private dialog:MatDialog,  private _trgBattalion: TrgBattalionService,) { 

    this.addParadeForm=this.fb.group({
     
      name:['',Validators.required],
      document:[''],
      status:['1',Validators.required],
    })

  }

  ngOnInit(): void {
    if(this.router.url.includes('view-paradestate')){
      this.id=this.route.snapshot.queryParamMap.get('id');
      
      this.pTitle = "View Pared State of GCs";

      this._trgBattalion.getParadeStateById(this.id).subscribe(
        res=>{
          console.log(res);
          
          if(res.status=='1'){
            this.addParadeForm.patchValue({
               name:res.List.name,
              status:res.List.status
            })
            this.docUrl = res.List.document
            this.isDoc = true;
          }
        }
      )
    }
  }


 

  public get f(){
    return this.addParadeForm.controls;
  }

  addParadeState(){
    if(this.addParadeForm.invalid || !this.isDoc){
      this.isError = true;
      this._trgBattalion.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this._trgBattalion.addParadeState(this.addParadeForm.value).subscribe(
        res=>{
          console.log(res);
          if(res.status == '1'){
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg);
            if(this.router.url.includes('main/trg-battalion'))
            this.router.navigate(['/main/trg-battalion/parade-state']);
            if(this.router.url.includes('main/admin'))
            this.router.navigate(['/main/admin/trg-battalion/parade-state']);
          
          } else {
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg);
          }
        },
        err=>{
          this.spinner.hide();
          this._trgBattalion.openSnackbar("Some Error Occured.");
        
        }
      )
    }
  }


  updateParadeState(){
    if(this.addParadeForm.invalid || !this.isDoc){
      this.isError = true;
      this._trgBattalion.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this._trgBattalion.updateParadeState(this.addParadeForm.value,this.id).subscribe(
        res=>{
          console.log(res);
          if(res.status == '1'){
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg);

            if(this.router.url.includes('main/trg-battalion'))
            this.router.navigate(['/main/trg-battalion/parade-state']);
            if(this.router.url.includes('main/admin'))
            this.router.navigate(['/main/admin/trg-battalion/parade-state']);
          
          } else {
            this.spinner.hide();
            this._trgBattalion.openSnackbar(res.msg);
          }
        },
        err=>{
          this.spinner.hide();
          this._trgBattalion.openSnackbar("Some Error Occured.");
        
        },
        ()=>{
          this._trgBattalion.openSnackbar("Have a Good Day.")
        }
      )
    }
  }



  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 5242880) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this._trgBattalion.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docUrl = ''
      this.addParadeForm.patchValue({
        document: file
      });
      this.isDoc=true;

    }
    console.log("selected Doc", this.addParadeForm.value);
  }


  openDoc() {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:"Pared State of GCs", url: this.docUrl
      }
    });
  }


  goBack(){
    
    if(this.router.url.includes('main/trg-battalion'))
    this.router.navigate(['/main/trg-battalion/parade-state']);
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/trg-battalion/parade-state']);
  }


}
