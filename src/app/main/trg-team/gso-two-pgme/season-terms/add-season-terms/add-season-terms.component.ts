import { ChangeDetectorRef, Component, OnInit, LOCALE_ID, ViewChild, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-season-terms',
  templateUrl: './add-season-terms.component.html',
  styleUrls: ['./add-season-terms.component.scss']
})
export class AddSeasonTermsComponent implements OnInit {

  id;
  pageTitle:string="Add Season Term";

  show: boolean = false;

  addSeasonTermForm: FormGroup = new FormGroup({});

  seasonTerms: any[] = [];

  date = new Date();

  currentYear = this.date.getFullYear();

  public localID: string;

  isError: boolean = false;

  minStartDate;
  minEndDte
  constructor(private fb: FormBuilder, private service: TrgTeamService, 
     public dialog: MatDialog, private spinner: NgxSpinnerService, private router: Router,
     private route: ActivatedRoute, private cdref: ChangeDetectorRef, @Inject(LOCALE_ID) localID: string,
    private sharedService:SharedService
    ) {
    this.addSeasonTermForm = this.fb.group({

      seasonTerm: ['', Validators.required],
      year: [this.currentYear, [Validators.min(this.currentYear),Validators.max(this.currentYear+5)]],

      startDate:['',Validators.required],
      endDate: ['', Validators.required],    

      status: ['1', Validators.required]

    });

    //get season terms
    this.service.getAllSeasonTerm().subscribe(
      res => {
        console.log(res);

        if (res.status == '1') {
          this.seasonTerms = res.List
          this.cdref.detectChanges();
        }
      }
    )


    this.localID = localID;

    this.minStartDate = formatDate(new Date(),'yyy-MM-dd',this.localID);
    this.minEndDte = formatDate(new Date(), 'yyy-MM-dd', this.localID);

  }


  ngOnInit(): void {

    // if (this.router.url.includes('view-program')) {
    //   this.spinner.show();
    //   this.pageTitle = 'View Weekly PGME'
    //   this.id = this.route.snapshot.queryParamMap.get('id')
    //   // console.log(this.id);
    //   this.service.getWeeklyProgramById(this.id).subscribe(
    //     res => {
    //       // console.log(res);
    //       if (res.status == 'OK') {

    //         this.addSeasonTermForm.patchValue({

    //         })

    //         this.cdref.detectChanges();
    //         this.spinner.hide();

    //       } else {
    //         this.spinner.hide()
    //         this.sharedService.openSnackbar(res.message);
    //       }
    //     },
    //     err => {
    //       this.spinner.hide();
    //       this.sharedService.openSnackbar('Some Error Occured.')
    //     })
    // } else {
    //   this.pageTitle = 'Add Weekly PGME'
    // }




  }



  onSelectStartDate(e:any){
    console.log(e.target.value);
    
    const dt = new Date(e.target.value);
  if(dt.getDay() != 1){
    this.sharedService.openSnackbar("Please Select First Day of Week")
    this.f.startDate.setValue('')
  } else {
    this.minEndDte = e.target.value
  }
  }

  noType(){
    return false;
  }


  public get f() {
    return this.addSeasonTermForm.controls;
  }
  

  goBack() {
    
    if (this.router.url.includes('main/trg-team'))
    this.router.navigate(['/main/trg-team/gso-2-pgme/season-terms'])

    if (this.router.url.includes('main/admin/trg-team'))
    this.router.navigate(['/main/admin/trg-team/gso-2-pgme/season-terms'])

  }


  confirmAddSeasonTerm(){
    let tempST
    if(this.f.seasonTerm.value == 1){
      tempST = 'Spring'
    } else {
      tempST = 'Autumn'
    }

    if (this.addSeasonTermForm.valid) {

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        // height: '600px',
        data: {
          type: 'confirmation',
          title: 'Confirm! Add This Season Term',
          object: {startDate:this.f.startDate.value,endDate:this.f.endDate.value,year:this.f.year.value,seasonTerm:tempST}
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result == true){
          console.log(result);
          this.addSeasonTerm();
        }
        
      });

    }
    else {
      this.sharedService.openSnackbar('Please Fill All Required Fields.')
      this.isError = true;
    }


  }



   addSeasonTerm() {
    console.log(this.addSeasonTermForm.value);

    if (this.addSeasonTermForm.valid) {
      this.spinner.show()
      this.service.addFullSeasonTerm(this.addSeasonTermForm.value).subscribe(
        
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.spinner.hide();
            this.sharedService.openSnackbar(res.message);
            this.goBack()
           }
          else {
            this.spinner.hide();
            this.sharedService.openSnackbar(res.message);
          }
        },
        err => {
          this.spinner.hide();
          this.sharedService.openSnackbar('Error Occured.')
        }
      )

    } else {
      this.sharedService.openSnackbar('Please Fill All Required Fields.')
      this.isError = true;
    }

  }







}
