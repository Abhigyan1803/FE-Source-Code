import { ChangeDetectorRef, Component, OnInit,Inject, LOCALE_ID, ViewChild} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.scss']
})
export class AddSyllabusComponent implements OnInit {
  @ViewChild('inputFile', { static: true }) docFile;

  pTitle;
  id;
  docUrl;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addSyllabusForm: FormGroup;
  unSelectedFile;
  battalions: any[] = [];
  terms: any[] = [];
  weeks: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI'];
  isError: boolean;
  isLessDate:boolean;
  isDoc: boolean = true;

  descriptionLength:number=0;

  date = new Date();
  minDate;
  maxDate;
  currentYear:number = new Date().getFullYear();
  
  public localID: string;

  constructor(private fb: FormBuilder,private _trgBattalion: TrgBattalionService,
     private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog,
    private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute, private service: TrgTeamService,
    @Inject(LOCALE_ID) localID: string
    ) {

    this.addSyllabusForm = this.fb.group({
      name:['',Validators.required],
      date:['',[Validators.required,this.currentDateValidator.bind(this)]],
      term: ['', Validators.required],
      description:['',Validators.required],
      status: ['1', Validators.required],
      document: []
    })


//get terms
this.service.getAllTerms().subscribe(
  res => {
    // console.log(res);
    if(res.status == '1'){
      this.terms = res.List
      this.cdref.detectChanges();
    }
    
  }
)
    this.localID = localID;


  }

  ngOnInit(): void {
    if (this.router.url.includes('view-syllabus')) {
      this.pTitle = 'View Syllabus'
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.service.getTermSyllabusById(this.id).subscribe(
        res => {
          if (res.status == 'OK') {
            this.addSyllabusForm.patchValue({
              name:res.object.name,
              date: formatDate(res.object.date, 'yyyy-MM-dd', this.localID),
              term: res.object.term,
              description:res.object.description,
              status: res.object.status
            })
            this.descriptionLength=res.object.description.length;
            this.docUrl = res.object.doc;
          }

        }
      )
    }
    else{
      this.pTitle = 'Add Syllabus'
    }



    this.minDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);
    this.maxDate = formatDate(this.date.setFullYear(this.currentYear+5), 'yyyy-MM-dd', this.localID);




  }

  goBack(){
    this.router.navigate(['/main/trg-team/gso-2-pgme/syllabus/terms']);
  }

  //============CHARACTER COUNT==========
  
  charCount(e: any, t) {
    if (t == 'desc')
      this.descriptionLength = e.target.value.length
  }


  openDoc(doc) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: doc
      }
    });
  }

  onSelectDoc(e: any) {
    this.docUrl = ''
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this._trgBattalion.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addSyllabusForm.patchValue({
        document: file
      });
      this.isDoc=true;
    }
  }


  get f() {
    return this.addSyllabusForm.controls;
  }

  addSyllabus() {
    if (this.addSyllabusForm.valid) {
      if (this.addSyllabusForm.value.document == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this.service.addTermSyllabus(this.addSyllabusForm.value).subscribe(
          res => {
            // console.log(res);
            this.apiRes(res);
          },
          err => {
            this.spinner.hide();
            this._trgBattalion.openSnackbar('Some Error Occured.');
          }
        )
      }
    }
    else {
      this.isError = true;
    }
  }


  updateSyllabus() {
    if (this.addSyllabusForm.valid) {
      this.spinner.show();
      this.service.updateTermSyllabus(this.id, this.addSyllabusForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide();
          this._trgBattalion.openSnackbar('Some Error Occured.');
        }
      )
    }
    else {
      this.isError = true;
    }
  }

  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide();
      this._trgBattalion.openSnackbar(res.message)
      this.cdref.detectChanges();
      this.router.navigate(['/main/trg-team/gso-2-pgme/syllabus/terms']);
    }
    else {
      this.spinner.hide();
      this._trgBattalion.openSnackbar(res.message);
    }
  }


  currentDateValidator(control: FormControl): ValidationErrors | null{
    const currDt =  new Date().setHours(0o00,0o00,0o00,0o0000);
    const maxAcceptDate = new Date().setFullYear(this.currentYear + 5)
    const pDt = Date.parse(control.value.toString());
    if (pDt < currDt || pDt > maxAcceptDate) {
      this.isLessDate = true;
      return { 'invalidDate': true };
    } else {
      this.isLessDate = false;
      return null;
    }
  }
  

}

