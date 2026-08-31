import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { SharedService} from 'app/service/shared.service'

@Component({
  selector: 'ms-add-bmt2',
  templateUrl: './add-bmt2.component.html',
  styleUrls: ['./add-bmt2.component.scss']
})
export class AddBmt2Component implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add Study Material";
 
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addBMT2form: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  term:string;
  termId:number;




  @ViewChild('inputFile', { static: true }) docFile;  
  type:string;
  terms: any[] = [];
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder, private sharedService:SharedService,
    private router: Router, private trgTeamService:TrgTeamService,
    private adminservice: AdminService, private cdref:ChangeDetectorRef) {
    

    this.route.params.subscribe(
      (params)=>{
        this.type = params.type;
        this.term = params.term;

            
      if(params.term == "I Term"){
        this.termId = 1
        console.log(this.term);
        
      } else if (params.term == "II Term"){
        this.termId = 2
        console.log(this.term);

      } else if( params.term == "II Tech"){
        this.termId = 7
        console.log(this.term);
        
      }else if(params.term == "III Term"){
        this.termId = 3
        console.log(this.term);

      }
     






        console.log("Recieved Param:=", this.type);
        this.addBMT2form = this.fb.group({
          name: ['', Validators.required],
          status: ['1', Validators.required],
          description:['', Validators.required],
          studyMaterialType:[this.type],
          doc: [],
          termId: [this.termId],
        })
      }
    )
    // this.getBattalion();
   
  }


  ngOnInit(): void {
    
    if (this.router.url.includes('view-bmt2')) {
      this.spinner.show()
      this.pageTitle = 'View Study Material'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.trgTeamService.getStudyMaterialById (this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addBMT2form.patchValue({
              name: res.object.name,
              description:res.object.description,
              status:  res.object.status,
              studyMaterialType: res.object.studyMaterialType,
              termId: res.object.termId,
            })
            this.docUrl = res.object.doc
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
          }
        }
      )
    }
  }
  // getTerms() {
  //   this.service.getAllTerms().subscribe(
  //     res => {
  //       // console.log(res);
  //       if (res.status == '1') {
  //         this.terms = res.List;
  //         this.cdref.detectChanges();
  //       }

  //     }
  //   )
  // }
  public get f() {
    return this.addBMT2form.controls;
  }
  goBack() {
    this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/study-material/BMT-2/'+this.type]);
  }

  submit() {
    if (this.addBMT2form.invalid) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.trgTeamService.addStudyMaterial(this.addBMT2form.value).subscribe(
        res => {
          console.log(res);
          this.apiRes(res)
          // if (res.status == 'OK') {
          //   this.sharedService.openSnackbar(res.message)
          //   this.cdref.detectChanges();
          //   this.spinner.hide();
          //   this.router.navigate(['main/trg-team/gso-2-pgme/study-material/Bmt2/'+this.type]);
          // } else {
          //   this.spinner.hide();
          //   this.sharedService.openSnackbar(res.message)
          // }
        },
        err => {
          this.spinner.hide();
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  charCount(e: any) {
    this.descLength = e.target.value.length
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
    this.sharedService.openSnackbar('Document Should Be Maximum 50 MB in Size')
  } else {
    this.docUrl = ''
    this.addBMT2form.patchValue({
      doc: file
    });
    this.isDoc=true;
  }
}

update() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addBMT2form.valid) {
    this.trgTeamService.updateStudyMaterial(this.id,this.addBMT2form.value).subscribe(
      res => {
        // console.log(res);
        this.apiRes(res);
      },
      err => {
        this.spinner.hide()
        this.sharedService.openSnackbar("Some Error Occured.")
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
    this.sharedService.openSnackbar(res.message)
    this.goBack()
  } else {
    this.spinner.hide()
    this.sharedService.openSnackbar(res.message)
  }
}

}






