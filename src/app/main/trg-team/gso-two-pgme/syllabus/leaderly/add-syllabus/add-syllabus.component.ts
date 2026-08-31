import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.scss']
})
export class AddSyllabusComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile;

  id;
  pTitle;
  descLength=0;
  addSyllabusForm: FormGroup;
  unSelectedFile;
  isDoc: boolean = true;
  terms: any[] = [];
  isError: boolean;
  isLessDate:boolean;

  
  docUrl: any;
  datePipe = new DatePipe('en-IN');

  date = new Date();
  minDate;
  maxDate;
  currentYear:number = new Date().getFullYear();

  term:string;
  termId:number;


  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, 
    private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    private sharedService: SharedService) {

      
      this.route.params.subscribe(
        params=>{
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


          this.addSyllabusForm = this.fb.group({
            name: ['', Validators.required],
            date: [new Date().toISOString().split('T')[0],
            // [Validators.required, this.currentDateValidator.bind(this)]
            ],
            description: ['', Validators.required],
            status: ['1', Validators.required],
            document: [],
            type: ['Leaderly'],
            id:[],
            termId: [this.termId, Validators.required],
          })
      
                  
        }
      )


  }

  ngOnInit(): void {
    this.getTerms()
    if (this.router.url.includes('view-syllabus')) {
      this.pTitle = 'View Syllabus';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.getSyllabusById();
    } else {
      this.pTitle = 'Add Syllabus';
    }

    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(new Date().setFullYear(this.currentYear+5), 'yyyy-MM-dd');


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
  getSyllabusById(){
    this.service.getSyllabusById(this.id).subscribe(res=>{
      this.addSyllabusForm.patchValue({
        date: this.datePipe.transform(res.object.date, 'yyyy-MM-dd'),
        name: res.object.name,
        description: res.object.description,
        status:res.object.status,
        id:res.object.id,
        termId: res.object.termId,
      });
      this.docUrl = res.object.doc;
      this.descLength=res.object.description.length;
    })
  } 

  onSelectDoc(e: any) {
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.sharedService.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addSyllabusForm.patchValue({
        document: file
      });
      this.isDoc=true;
    }
  }

  charCount(e: any, t) {
    if (t == 'description')
      this.descLength = e.target.value.length
  }

  get f() {
    return this.addSyllabusForm.controls;
  }


  openDoc(l) {
   this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title:'Syllabus Leaderly', url: l
      }
    });
  }
  
  addSyllabus() {
    console.log(this.addSyllabusForm.value);
    
    if (this.addSyllabusForm.valid) {
      if (this.addSyllabusForm.value.document == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this.service.addSyllabus(this.addSyllabusForm.value).subscribe(
          res => {
            this.apiCall(res);
          },
          err => {
            this.spinner.hide();
            this.sharedService.openSnackbar('Some Error Occured.')
          })
      }
    }
    else{
      this.isError=true
    }
  }
  
  updateSyllabus(){
    if (this.addSyllabusForm.valid) { 
        this.spinner.show();
        this.service.updateSyllabus(this.addSyllabusForm.value).subscribe(
          res => {
            this.apiCall(res);
          },
          err => {
            this.spinner.hide();
            this.sharedService.openSnackbar('Some Error Occured.')
          })     
    }
    else{
      this.isError=true;
    }
  }

  apiCall(res) {
    if (res.status == 'OK') {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message)
      this.cdref.detectChanges();
      this.goBack()
    }
    else {
      this.spinner.hide();
      this.sharedService.openSnackbar(res.message)
    }
  }
  goBack(){
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['/main/admin/trg-team/gso-2-pgme/'+this.term+'/syllabus/leaderly']); 
      } else {
        this.router.navigate(['/main/trg-team/gso-2-pgme/'+this.term+'/syllabus/leaderly']); 
      }

  }


  // currentDateValidator(control: FormControl): ValidationErrors | null{
  //   const currDt =  new Date().setHours(0o00,0o00,0o00,0o0000);
  //   const maxAcceptDate = new Date().setFullYear(this.currentYear + 5)
  //   const pDt = Date.parse(control.value.toString());
  //   if (pDt < currDt || pDt > maxAcceptDate) {
  //     this.isLessDate = true;
  //     return { 'invalidDate': true };
  //   } else {
  //     this.isLessDate = false;
  //     return null;
  //   }
  // }

}
