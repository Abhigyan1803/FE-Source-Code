import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-pgmes',
  templateUrl: './pgmes.component.html',
  styleUrls: ['./pgmes.component.scss']
})
export class PgmesComponent implements OnInit {

  battalions:any[]=[];
  weeks:any[]=[];
  currentYear = new Date().getFullYear();
  seasonTerms:any[]=[]
  terms:any[]=[];

  pgmeForm:FormGroup = new FormGroup({});
  weekStart;
  weekEnd;
  weeklySchedule:any[]=[];
  dataAvailable:boolean = false;

  constructor( private homeService:HomePageService, private sharedService:SharedService, private fb:FormBuilder, private spinner:NgxSpinnerService, private cdref:ChangeDetectorRef ) {

    // document.getElementById('foot-id').style.position = 'absolute';

    this.pgmeForm = this.fb.group({
      weekId: ['1',Validators.required],
      termId: ['1', Validators.required],
      termSeasonId: ['1', Validators.required],
      year: [this.currentYear, Validators.required],
      battalianId:  ['1',Validators.required]
    })

    this.getBattalions();
    this.getAllWeeks();
    this.getAllSeasonTerms();
    this.getAllTerms();

   }

  ngOnInit(): void {
    this.getWeekPrograms()
		document.getElementById('foot-id').style.position='relative';
  }

  getBattalions(){
    this.sharedService.getBattalionList().subscribe(
      res=>{
        console.log(res);
        
        if(res.status == "OK"){
          this.battalions = res.object
        }
        
      }
    )
  }

  getAllWeeks(){
    this.sharedService.getAllWeeks().subscribe(
      res => {
        console.log(res);
        if (res.status == "OK") {
          this.weeks = res.object
        }
      }
    )
  }

  getAllSeasonTerms(){
    this.sharedService.getAllSeasonTerms().subscribe(
      res => {
        console.log(res);

        if (res.status == "1") {
          this.seasonTerms = res.List
        }
      }
    )
  }

  getAllTerms(){
    this.sharedService.getAllTerms().subscribe(
      res => {
        console.log(res);
        if (res.status == "1") {
          this.terms = res.List
        }
      }
    )
  }

  getWeekPrograms(){
    console.log(this.pgmeForm.value)
    if(!this.pgmeForm.invalid){
      this.homeService.getWeeklyPrograms(this.pgmeForm.value).subscribe(
        res=>{
          // console.log(res);

          if(res.status== "OK"){
            if(res.object.length){
              this.dataAvailable = true;
              this.weekStart = res.object[0].weekStartDate;
              this.weekEnd = res.object[0].weekEndDate;
              this.weeklySchedule = res.object[0].weeklyScheduleDate;
              console.log(this.weeklySchedule);
              this.cdref.detectChanges();
            }
            else{ 
              this.dataAvailable = false;
              this.sharedService.openSnackbar("No Records Found.")
            }
            

          }
          
        }
      )
    }
  }


}
