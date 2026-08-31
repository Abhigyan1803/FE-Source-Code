import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  IP = Links.IP;
  abc :any
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 3000, "arrows": true, };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  awardeesList:any;
  performanceList:any;
  imaActivities:any[] = [];
  activities: any[] = [];
  historyList : any;
  Myhistory: any[]=[];
  Myimage: any[]=[];
 
  bnCdr:any={};
  aq:any={};
  coyCmdrs:any[]=[];

  battalionsDetails:any;
  bnId:number;
  companyList: any;
  MyName: any;
  MyName1: any;
  MyName2: any;
  MyName3: any;
  abc1: any;
  abc2: any;
  abc3: any;
  battalionName: string = '';

  userDetails
  constructor(private spinner: NgxSpinnerService,public dialog: MatDialog,private _trg:TrgBattalionService, private admin:AdminService ,private service:AdminService, private cdref:ChangeDetectorRef,private router:Router) { 
    this.userDetails = JSON.parse(localStorage.getItem('loginResponse')).object;
    console.log("user details: ",this.userDetails.name);
    this.bnId = this.userDetails.battalionId;
    this.battalionsDetails = this.userDetails.battalion
    // this.battalionName = this.userDetails.
  }



  

  ngOnInit(): void {
    this.cdref.detectChanges()
    
    
  }

  ngAfterViewInit(){
    // this.battalionName = JSON.parse(localStorage.getItem('battalionDetails')).name;
    this.getHistoryList();
    this.getOrganizationMembers();
    this.getGallantryList();
    this.getPerformanceList();
    this.getActivities();
    this.getCompanyByBattalion();
    this.cdref.detectChanges()

  }

  noImg(e:any){
    e.target.src="assets/img/id.png"
  }

  getHistoryList(){
    // this.spinner.show();
  this._trg.getHistoryActive(this.battalionsDetails.id).subscribe(
    res =>{
      console.log("Battalion History",res);
      if(res.status == "OK"){
        this.historyList = res.object;
        this.Myhistory = this.historyList.description;
        this.Myimage = this.historyList.image;
        this.battalionName = res.object.battalionType.name;
        // console.log(this.Myhistory+"juned done");
        this.cdref.detectChanges();
      }
      this.spinner.hide()
    },
    err =>{
      this.service.openSnackbar('Error Occured.')
      this.spinner.hide();
    }
    )
}

getOrganizationMembers(){
this.admin.getTRGBattalionList(this.battalionsDetails.id,1).subscribe(
  res=>{
    console.log('Organization chart');
    
    console.log(res);
    let data = res.object
    data.find(
      el=>{
        if(el.battalionPost.id==1){
          this.aq = el
        } else if(el.battalionPost.id==2){
          this.bnCdr = el;  
        } else if(el.battalionPost.id==3){
          this.coyCmdrs.push(el)
        }

      }
    )

  }
)
}
// tittle ="dj"
getCompanyByBattalion(){
  this._trg.getCompanies(this.battalionsDetails.id).subscribe(
    res => {
      console.log("Get Companies: ",res);
      
      if (res.status == 'OK') {
        this.companyList = res.object;
        this.MyName = this.companyList[0].name;
        this.MyName1 = this.companyList[1].name;
        this.MyName2 = this.companyList[2].name;
        // this.MyName3 = this.companyList[3].name;
       
         this.abc = this.MyName;
         this.abc1 = this.MyName1;
         this.abc2= this.MyName2;
        //  this.abc3 = this.MyName3;
        console.log(this.abc,"companyList.>>>>>>>>");
        console.log(this.abc1,"companyList.>>>>>>>>");
        

        this.cdref.detectChanges();
        this.spinner.hide();
      } else {
        this.spinner.hide()
      }
    },
    err => {
      this.spinner.hide();
    }
  )
}

getGallantryList(){
  // this.spinner.show();
this._trg.getGallantryList(this.battalionsDetails.id,1).subscribe(
  res =>{
    console.log('GALLANTRY AWARDIES: ',res);
    if(res.status == "1"){
      this.awardeesList = res.List;
      this.cdref.detectChanges();
    }
    this.spinner.hide()
  },
  err =>{
    this.service.openSnackbar('Error Occured.')
    this.spinner.hide();
  }
  )
}

getPerformanceList(){
  // this.spinner.show();
this._trg.getPerformanceList(this.battalionsDetails.id,1).subscribe(
  res =>{
    console.log("PERFORMANCE OF HIGHLIGHT: ",res);
    
    if(res.status == "OK"){
      this.performanceList = res.object;
      this.cdref.detectChanges();
    }
    this.spinner.hide()
  },
  err =>{
    this.service.openSnackbar('Error Occured.')
    this.spinner.hide();
  }
  )
}

getActivities(){
  this._trg.getGcActivities(this.battalionsDetails.id,2).subscribe(
    res =>{
      console.log(res);
      if(res.status == 'OK'){
        this.activities = res.object
        this.cdref.detectChanges();
      }
      this.spinner.hide()
    },
    err =>{
      console.log(JSON.stringify(err));
      this.spinner.hide();
      
    }
  )
}
edit(ele:any) {
  console.log(ele,"dj");
  
  this.router.navigate(['main/trg-battalion/dashboard/view-card'],{queryParams:{id:ele}})  
}


}
