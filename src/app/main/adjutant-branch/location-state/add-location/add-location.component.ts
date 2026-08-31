import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

import { TrgBattalionService } from '../../../../service/trg-battalion/trg-battalion.service';
import { SharedService } from 'app/service/shared.service';


@Component({
  selector: 'ms-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})


export class AddLocationComponent implements OnInit {

  addLocationForm:FormGroup = new FormGroup({});

  @ViewChild('inputFile', { static: true }) docFile;
  unSelectedFile;
  isDoc;
  isError;
  docUrl;
  id;
  pTitle="Add Location State of Officers"
 
  constructor(private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService,
     private dialog:MatDialog,  private _trgBattalion: TrgBattalionService, private sharedService: SharedService) { 

    this.addLocationForm=this.fb.group({
     
      name:['',Validators.required],
      document:[''],
      status:['1',Validators.required],
    })

  }

  ngOnInit(): void {

    this.unSelectedFile = this.docFile.nativeElement.files;

    if(this.router.url.includes('view-locationstate')){
      this.spinner.show()
      this.id=this.route.snapshot.queryParamMap.get('id');
  this.pTitle="View Location State of Officers"

      this._trgBattalion.getLocationStateById(this.id).subscribe(
        res=>{
          console.log(res);
          if(res.status=='1'){
            this.addLocationForm.patchValue({
               name:res.List.name,
              status:res.List.status
            })
            this.docUrl = res.List.document
            this.isDoc = true;
            this.spinner.hide()
            this.cdref.detectChanges();
          } else {
            this.spinner.hide()
            this._trgBattalion.openSnackbar(res.msg)
          }
        },
        err=>{
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.")
        
        }
      )
    }
  }

  public get f(){
    return this.addLocationForm.controls;
  }
  
  addLocation(){
      if(this.addLocationForm.invalid || !this.isDoc){
        this.isError = true;
        this._trgBattalion.openSnackbar("Please Fill All Required Fields")
      } else {
        this.spinner.show();
        this._trgBattalion.addLocationState(this.addLocationForm.value).subscribe(
          res=>{
            console.log(res);
            if(res.status == '1'){
              this.spinner.hide();
              this._trgBattalion.openSnackbar(res.msg);
              window.history.back()
              // if (this.router.url.includes('main/adjutant-branch'))
              // this.router.navigate(['/main/trg-battalion/location-state/']);
              // if (this.router.url.includes('main/admin'))
              // this.router.navigate(['/main/admin/trg-battalion/location-state']);
         
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
  
  
    updateAro(){
      if(this.addLocationForm.invalid || !this.isDoc){
        this.isError = true;
        this._trgBattalion.openSnackbar("Please Fill All Required Fields")
      } else {
        this.spinner.show();
        this._trgBattalion.updateLocationState(this.addLocationForm.value,this.id).subscribe(
          res=>{
            console.log(res);
            if(res.status == '1'){
              this.spinner.hide();
              this._trgBattalion.openSnackbar(res.msg);
              window.history.back()
 
              // if (this.router.url.includes('main/adjutant-branch'))
              // this.router.navigate(['/main/trg-battalion/location-state/']);
              // if (this.router.url.includes('main/admin'))
              // this.router.navigate(['/main/admin/trg-battalion/location-state']);
         
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
  
    openDoc() {
      this.dialog.open(DialogComponent, {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title:"Location State of Officers",url: this.docUrl
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
        this._trgBattalion.openSnackbar('Document Should Be Maximum 200 MB in Size')
      } else {
        this.docUrl = ''
        this.addLocationForm.patchValue({
          document: file
        });
        this.isDoc=true;
  
      }
      // console.log("selected Doc", this.addLocationForm.value);
    }
  
    goBack(){
      
      if (this.router.url.includes('main/adjutant-branch'))
      this.router.navigate(['/main/trg-battalion/location-state/']);
      if (this.router.url.includes('main/admin'))
      this.router.navigate(['/main/admin/trg-battalion/location-state']);
 
    }


}
