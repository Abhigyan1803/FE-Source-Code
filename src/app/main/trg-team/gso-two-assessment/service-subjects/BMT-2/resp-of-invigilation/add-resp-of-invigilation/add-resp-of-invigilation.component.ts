import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'app/service/admin/admin.service';

@Component({
  selector: 'ms-add-resp-of-invigilation',
  templateUrl: './add-resp-of-invigilation.component.html',
  styleUrls: ['./add-resp-of-invigilation.component.scss']
})
export class AddRespOfInvigilationComponent implements OnInit {

  
  addNominalForm: FormGroup;
  title: string;
  id: string = '';
  unSelectedFile: any;
  docUrl: any;
  @ViewChild('inputFile', { static: true }) docFile;
  isDoc;
  isError;
  nameLength = 0;
  descLength = 0;
  term;
  

  constructor(
    private dialog: MatDialog,
    private _trgTeam: TrgTeamService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router, private route:ActivatedRoute,
    private _trgBattalion: TrgBattalionService,
    private adminservice: AdminService,
    private activeRoute: ActivatedRoute) {

      this.route.params.subscribe(
        (params)=>{
          this.term = params.term;
          if(this.term)
          console.log(this.term,"TERM ");
          // this.ngAfterViewInit();

          this.addNominalForm = this.fb.group({
            name: ['', Validators.required],
            status: ['1', Validators.required],
            studyMaterialType:['BMT2Eval'],
            doc: []
          })

        }
      )


  }

  ngOnInit(): void {
    if (this.router.url.includes('add-invigilation')) {
      this.title = 'Add Mark'
    }
    else if (this.router.url.includes('view-invigilation')) {
      this.spinner.show()
      this.title = 'View Mark'
      this.id = this.activeRoute.snapshot.queryParamMap.get('id');
      this.adminservice.getBMT1ById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addNominalForm.patchValue({
              name: res.object.name,
              status:  res.object.status,
              studyMaterialType: res.object.studyMaterialType,
            })
            this.docUrl = res.object.doc
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
  openDoc(l) {
    console.log("++++++++",l);
    
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:"Document",url: l
      }
    });
  }
  
  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.adminservice.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addNominalForm.patchValue({
        doc: file
      });
      this.isDoc=true;
    }
  }
  

  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  get f() {
    return this.addNominalForm.controls;
  }

  submit() {
    if (this.addNominalForm.invalid || !this.isDoc) {
      this.isError = true;
      this.adminservice.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.adminservice.addBMT1(this.addNominalForm.value).subscribe(
        res => {
          console.log(res);
       this.apiRes(res)
        },
        err => {
          this.spinner.hide();
          this.adminservice.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  updateNominal() {
    if (this.addNominalForm.valid) {
      this.spinner.show();
      this.adminservice.updateBMT1(this.id,this.addNominalForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.")
        }
      )
    }
  }


  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message)
      this.goBack()
    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.message)
    }
  }

  goBack(){
    this.router.navigate(['/main/trg-team/gso-2-assessment/'+this.term+'/service-subjects/Bmt2/resp-eval']); 
  }
}

