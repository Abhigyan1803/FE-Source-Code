import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ms-add-bmt2',
  templateUrl: './add-bmt2.component.html',
  styleUrls: ['./add-bmt2.component.scss']
})
export class AddBmt2Component implements OnInit {

  unSelectedFile: any;
  pageTitle = "Add";

  datePipe = new DatePipe('en-IN')
 
  descLength:number = 0;
  id: string = '';
  isAdmin:boolean = false;
  addBMT2form: FormGroup = new FormGroup({});
  battalionList: any[]=[];
  docUrl: any;
  isError;
  isDoc;
  @ViewChild('inputFile', { static: true }) docFile;  
  type:string;
  sName:string;
  terms: any[] = [];
  term:string;
  termId:number;
  
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: AdjutantService,  private trgTeamService:TrgTeamService,
    private adminservice: AdminService, private cdref:ChangeDetectorRef, public sharedService:SharedService
   ) {
    
    this.route.params.subscribe(
      (params)=>{
        this.type = params.type;

        if(this.type == "OnA and InS"){
          this.sName = "O&A and I&S"
        } else {
          this.sName = this.type;
        }

       
        this.term = params.term
          
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
      

        console.log("Recieved Param: ", this.type);
        this.addBMT2form = this.fb.group({
          name: ['', Validators.required],
          date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')], 

          status: ['1', Validators.required],
          description:['', Validators.required],
          type:[this.type],
          document: [],
          termId: [this.termId, Validators.required],
        })

      }
    )
    // this.getBattalion();
   
  }


  ngOnInit(): void {
    this.getTerms()
    if (this.router.url.includes('add-bmt2')) {
      this.pageTitle = 'Add'
    }
    else if (this.router.url.includes('view-bmt2')) {
      this.spinner.show()
      this.pageTitle = 'View'
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.adminservice.getSyllabusById(this.id).subscribe(
        res => {
          console.log(res);
          
          if (res.status == 'OK') {
            this.addBMT2form.patchValue({
              name: res.object.name,
              description:res.object.description,
              status:  res.object.status,
              type: res.object.syllabusType,
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
  getTerms() {
    this.service.getAllTerms().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.terms = res.List;
          this.cdref.detectChanges();
        }

      }
    )
  }
  public get f() {
    return this.addBMT2form.controls;
  }
  goBack() {
    this.router.navigate(['main/trg-team/gso-2-pgme/'+this.term+'/syllabus/BMT-2/'+this.type]);
  }

  submit() {
    if (this.addBMT2form.invalid) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.trgTeamService.addSyllabus(this.addBMT2form.value).subscribe(
        res => {
          console.log(res);
         this.apiRes(res)
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
      document: file
    });
    this.isDoc=true;
  }
}

update() {
  this.spinner.show();
  // console.log("Bdo", this.addBdoForm.value);

  if (this.addBMT2form.valid) {
    this.adminservice.updateSyllabus(this.id,this.addBMT2form.value).subscribe(
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






