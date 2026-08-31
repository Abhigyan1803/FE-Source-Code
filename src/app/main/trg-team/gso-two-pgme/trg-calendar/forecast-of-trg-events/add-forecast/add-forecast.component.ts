import { ChangeDetectorRef, Component, OnInit,Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { AdminService } from 'app/service/admin/admin.service';


@Component({
  selector: 'ms-add-forecast',
  templateUrl: './add-forecast.component.html',
  styleUrls: ['./add-forecast.component.scss']
})
export class AddForecastComponent implements OnInit {


  id;
  pageTitle;

  seasonTerms: any[] = [];
  weeks: any[] = [];

  descriptionLength:number=0;

  minDate;
  maxDate;

  public localID: string;
  
  currentYear = new Date().getFullYear();
  docUrl: any;
  isError:boolean = false;
  isLessDate:boolean = false;
  date = new Date();
  isDoc: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addForecastForm: FormGroup;
  @ViewChild('inputFile', { static: true }) docFile;  
  unSelectedFile: any;


  constructor(private fb: FormBuilder, private service: TrgTeamService, private snackbar: MatSnackBar, public dialog: MatDialog,private adminservice: AdminService,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef,@Inject(LOCALE_ID) localID: string) {
    this.addForecastForm = this.fb.group({
      sessionTerm: ['', Validators.required],
      year: [this.currentYear, [Validators.min(this.currentYear), Validators.max(this.currentYear+5)]],
      week: [''],
      date: ['', [Validators.required, this.currentDateValidator.bind(this)]],
      description: ['', Validators.required],
      mapImage:[],
      isGcLec:[''],
      status: ['1', Validators.required]
    })

    //get season terms
    this.service.getAllSeasonTerm().subscribe(
      res => {
        if (res.status == '1') {
          this.seasonTerms = res.List
          this.cdref.detectChanges();
        }
      }
    )
    //get weeks
    this.service.getAllWeeks().subscribe(
      res => {
        console.log(res);
        if (res.status == 'OK') {
          this.weeks = res.object
          this.cdref.detectChanges();
        }
      }
    )
    this.localID = localID;
    this.minDate = formatDate(this.date, 'yyyy-MM-dd', this.localID);
    
    this.maxDate = formatDate(this.date.setFullYear(this.currentYear+5), 'yyyy-MM-dd', this.localID);
  }

  ngOnInit(): void {
    if (this.router.url.includes('view-forecast')) {
      
      this.spinner.show();

      this.pageTitle = 'View Forecast'
      this.id = this.route.snapshot.queryParamMap.get('id')
      console.log(this.id);
      this.service.getForecastById(this.id).subscribe(
        res => {
          this.spinner.hide();
          if(res.status == "OK"){
            this.addForecastForm.patchValue({
              sessionTerm: res.object.sessionTerm,
              year: res.object.year,
              week: res.object.week,
              date: formatDate(res.object.date, 'yyyy-MM-dd', this.localID),
              description: res.object.description,
              status: res.object.status ,
              isGcLec: res.object.isGcLec     
            })
            this.docUrl = res.object.file
            this.isDoc = true;
            this.spinner.hide()
            if(res.object.description){
              this.descriptionLength = res.object.description.length
            }
            
            this.cdref.detectChanges();
            
          } else{
            this.spinner.hide();
            this.openSnackbar(res.message)
          }
        },
         err => {
           this.spinner.hide();
           this.openSnackbar("Some Error Occured.");
         }
      )

    } else {
      this.pageTitle = 'Add Forecast'
    }

  }

  goBack(){
    this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/forecast'])
  }
  
  public get f(){
    return this.addForecastForm.controls;
  }

  openDoc(e) {
    this.dialog.open(DialogComponent,
      {
        width: '1250px', height: '650px',
        data: {
          type: 'document', title: "Forecast Document", url: this.docUrl
        }
      }
    )
  }
 
  onSelectDoc(e) {
    var file = e.target.files[0]
    console.log(file);
    
    if (file.size > 104857600) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.adminservice.openSnackbar('Document Should Be Maximum 100 MB in Size')
    } else {
      this.docUrl = ''
      this.addForecastForm.patchValue({
        mapImage: file
      });
      console.log(this.addForecastForm.value.mapImage);
      
      this.isDoc=true;
    }
  }

    //============CHARACTER COUNT==========
    
    charCount(e: any, t) {
      if (t == 'desc')
        this.descriptionLength = e.target.value.length
    }
  

  addForecast() {

    if(this.addForecastForm.valid){
      this.spinner.show()
      this.service.
      addForecast(this.addForecastForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.openSnackbar(res.message)
            this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/forecast'])
          }
          else {
            this.spinner.hide()
            this.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
    
    } else {
      this.isError =  true;
      this.openSnackbar("Please Fill All Required Fields.")
    }
  
  }

  updateForecast(){
    
    if(this.addForecastForm.valid){
      this.spinner.show()
      this.service.updateForecast(this.id,this.addForecastForm.value).subscribe(
        res => {
          if (res.status == 'OK') {
            this.spinner.hide();
            this.openSnackbar(res.message)
            this.router.navigate(['/main/trg-team/gso-2-pgme/trg-calendar/forecast'])
          }
          else {
            this.spinner.hide()
            this.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Error Occured.')
        }
      )
    
    } else {
      this.isError =  true;
      this.openSnackbar("Please Fill All Required Fields.")
    }
  }



  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
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
