import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AdjutantDialogComponent } from '../../adjutant-dialog/adjutant-dialog.component';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { ListKeyManager } from '@angular/cdk/a11y';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

 
  @ViewChild('inputFile', { static: true }) docFile;
  unSelectedFile;
  isDoc;
  isError;
  docUrl;
  id;
  pTitle = "Add Adjutant Order"
  descLength:number = 0;
  RemarksLength:number = 0;

addOrderForm:FormGroup= new FormGroup({});
  constructor(private fb:FormBuilder, private router:Router, private route:ActivatedRoute, private cdref:ChangeDetectorRef, private spinner:NgxSpinnerService,
    private service:AdjutantService,  private dialog:MatDialog, private sharedService: SharedService) { 

    this.addOrderForm=this.fb.group({
      type:['1'],
      name:['',Validators.required],
      document:[''],
      description:['',Validators.required],
      status:['1',Validators.required],
      forGCFlag:[false]
    })
  }


  ngOnInit(): void {
    if(this.router.url.includes('view-order')){
      this.id=this.route.snapshot.queryParamMap.get('id');
      this.pTitle = "View Adjutant Order"
      this.service.getOrderId(this.id).subscribe(
        res=>{
          console.log(res);
          if(res.status=='1'){
            this.addOrderForm.patchValue({
              type:res.List.adjutantBranch.id,
              name:res.List.name,
              status:res.List.status,
              description:res.List.description
            })
            this.docUrl = res.List.document
            this.descLength =  res.object.description.length;
            this.isDoc = true;
          }
        }
      )
    }
  }

public get f(){
  return this.addOrderForm.controls;
}
charCount(e: any,t) {
  if(t == 'desc')
  this.descLength = e.target.value.length
  if(t == 'remarks')
  this.RemarksLength= e.target.value.length
}

addAdjutantOrder(){
    if(this.addOrderForm.invalid || !this.isDoc){
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addAdjutantOrder(this.addOrderForm.value).subscribe(
        res=>{
          console.log(res);
          if(res.status == '1'){
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
            this.goBack();
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
          }
        },
        err=>{
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");
        },
       
      )
    }
  }


  updateOrder(){
    if(this.addOrderForm.invalid || !this.isDoc){
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.updateOrder(this.addOrderForm.value,this.id).subscribe(
        res=>{
          console.log(res);
          if(res.status == '1'){
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
            this.goBack()
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
          }
        },
        err=>{
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");
        
        }
      )
    }
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
      this.addOrderForm.patchValue({
        document: file
      });
      this.isDoc=true;

    }
    console.log("selected Doc", this.addOrderForm.value);
  }

  goBack(){
    if(this.router.url.includes('main/adjutant-branch'))
    this.router.navigate(['/main/adjutant-branch/adjutant-orders']);
    if(this.router.url.includes('main/admin'))
    this.router.navigate(['/main/admin/Adjutant-Branch-Management/adjutant-order']);
  }
 
  openDoc(e){
    this.dialog.open(DialogComponent,
      {
        width: '1250px', height: '650px',
        data: {
          type: 'document',title:"Adjutant Order Document", url:  this.docUrl
        }
      }
      )
    }


}
