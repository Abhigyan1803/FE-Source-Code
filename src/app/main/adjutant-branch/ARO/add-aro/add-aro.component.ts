import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AdjutantDialogComponent } from '../../adjutant-dialog/adjutant-dialog.component';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-aro',
  templateUrl: './add-aro.component.html',
  styleUrls: ['./add-aro.component.scss']
})
export class AddAroComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile;
  unSelectedFile;
  isDoc;
  isError;
  docUrl;
  id;
  pTitle = "Add ARO";

  currentTime = new Date()
  year = this.currentTime.getFullYear()

  addAroForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService,
    private service: AdjutantService, private dialog: MatDialog) {

    this.addAroForm = this.fb.group({
      type: ['2'],
      name: ['', Validators.required],
      document: [''],
      // number:['', Validators.required],
      year:[this.year, Validators.required],
      status: ['1', Validators.required],
     
    })

  }

  ngOnInit(): void {
    if (this.router.url.includes('view-aro')) {
      this.pTitle = "View ARO"
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getAROById(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == '1') {
            this.addAroForm.patchValue({
              type: res.List.adjutantBranch.id,
              name: res.List.name,
              // forGCFlag:res.List.flag,
              status: res.List.status,
            
            })
            this.docUrl = res.List.document
            this.isDoc = true;
          }
        }
      )
    }
  }

  public get f() {
    return this.addAroForm.controls;
  }

  getPreviousRouote():string{
    const routeArr = this.router.url.split('/');
    let navRoute='';
    for(let i=0;i<routeArr.length-1;i++){
      if(routeArr[i]){
        navRoute = navRoute+'/'+routeArr[i];
      }  
    }
    return navRoute;
  }


  addARO() {
    console.log(this.addAroForm.value);
    
    if (this.addAroForm.invalid || !this.isDoc) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addARO(this.addAroForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == '1') {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
   
    this.router.navigate([this.getPreviousRouote()])
            
            // if(this.router.url.includes('main/adjutant-branch'))
            // this.router.navigate(['/main/adjutant-branch/ARO']);
            // if(this.router.url.includes('main/admin'))
            // this.router.navigate(['/main/admin/Adjutant-Branch-Management/aro']);

          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");

        }
      )
    }
  }


  updateAro() {
    if (this.addAroForm.invalid || !this.isDoc) {
      this.isError = true;
      this.service.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.updateARO(this.addAroForm.value, this.id).subscribe(
        res => {
          // console.log(res);
          if (res.status == '1') {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
            this.router.navigate([this.getPreviousRouote()])

            // if (this.router.url.includes('main/adjutant-branch'))
            //   this.router.navigate(['/main/adjutant-branch/ARO']);
            // if (this.router.url.includes('main/admin'))
            //   this.router.navigate(['/main/admin/Adjutant-Branch-Management/aro']);
          } else {
            this.spinner.hide();
            this.service.openSnackbar(res.msg);
          }
        },
        err => {
          this.spinner.hide();
          this.service.openSnackbar("Some Error Occured.");

        }
      )
    }
  }


  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 5242880) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.service.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docUrl = ''
      this.addAroForm.patchValue({
        document: file
      });
      this.isDoc = true;

    }
    console.log("selected Doc", this.addAroForm.value);
  }

  goBack() {
    this.router.navigate([this.getPreviousRouote()])

    //   if (this.router.url.includes('main/adjutant-branch'))
  //   this.router.navigate(['/main/adjutant-branch/aro']);
  // if (this.router.url.includes('main/admin'))
  //   this.router.navigate(['/main/admin/Adjutant-Branch-Management/aro']);
  }
  
  openDoc(e) {
    this.dialog.open(DialogComponent,
      {
        width: '1250px', height: '650px',
        data: {
          type: 'document', title: "ARO Document", url: this.docUrl
        }
      }
    )
  }



}
