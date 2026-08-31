import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { packEnclose } from 'd3';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ms-org-charts',
  templateUrl: './org-charts.component.html',
  styleUrls: ['./org-charts.component.scss']
})
export class OrgChartsComponent implements OnInit {

  org: string = '';
  name: string = '';

  battalions: any[] = [];
  bn:string = "1"

  companyList: any;
  MyName: any;
  MyName1: any;
  MyName2: any;
  MyName3: any;
  abc1: any;
  abc2: any;
  abc3: any;
  abc :any

  //for trg team
  adventureCell = {};
  apto = {};
  awto = {};
  brigTrg = {};
  colgsTrg = {};
  eqtn = {};
  fc = {};
  fe = {};
  gso1trg = {};
  gso2trg = {};
  gso2assmt = {};
  gso2pgme = {};
  methodsec = {};
  pto = {};
  sig = {};
  tac = {};
  wto = {};
  _2xdemocoy = {};
  _2xloafghan = {};

  //trg battalion


  bnCdr: any = {};
  aq: any = {};
  coyCmdrs: any[] = [];


  //gs branch
  bgs = {}
  colgs = {}
  oicit = {}
  securityOfficer = {}
  pro = {}
  gso1coord = {}
  gso1sd = {}
  gso1int = {}
  gso2stats = {}
  c1: any;
  c2: any;
  c3: any;
  c4: any;


  constructor(private route: ActivatedRoute, private cdref: ChangeDetectorRef,
     private service: HomePageService, private sharedService:SharedService,
    private spinner: NgxSpinnerService) {

    document.getElementById('foot-id').style.position = 'absolute';

    this.sharedService.getBattalionList()

    route.queryParams.subscribe(p => {
      console.log(p.org)
      this.getOrgCharts(p.org)
    }
    );
  }


  ngOnInit(): void { 
    document.getElementById('foot-id').style.position='relative';
    this.getCompanyByBattalion();
  }

  getCompanyByBattalion(){
    this.sharedService.getCompanies(1).subscribe(
      res => {
        if (res.status == 'OK') {
          this.companyList = res.object;
          this.MyName = this.companyList[0].name;
          this.MyName1 = this.companyList[1].name;
          this.MyName2 = this.companyList[2].name;
          this.MyName3 = this.companyList[3].name;
         
           this.abc = this.MyName;
           this.abc1 = this.MyName1;
           this.abc2= this.MyName2;
           this.abc3 = this.MyName3;
          console.log(this.companyList,"companyList.>>>>>>>>");
  
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

  
  getBattalions() {
    this.sharedService.getBattalionList().subscribe(
      res => {
        console.log(res);

        if (res.status == "OK") {
          this.battalions = res.object
        }

      }
    )
  }


  getOrgCharts(org) {
    this.org = org;
    if (org == 'ima') {
      this.name = 'IMA';

    } else
      if (org == 'trg-team') {
        this.name = 'TRG Team';
        this.getTRGTeamOrgChart();

      } else
        if (org == 'trg-battalion') {
          this.getBattalions();
          this.name = 'TRG Battalion';
          this.getTRGBattalionOrgChart(1)

          // this.cdref.detectChanges();

        } else
          if (org == 'gs-branch') {
            this.name = 'GS Branch';
            this.getGSBranchOrgchart()
            // this.cdref.detectChanges();

          }
  }


  getTRGTeamOrgChart() {

    // this.spinner.show();
    this.service.getOrganizationChartData().subscribe(
      res => {
        // console.log("/**===================*/");
        // console.log("TRG Team");
        // console.log(res);
        // console.log("/**===================*/");

        if (res.status == '1') {

          let obj = res.List;

          obj.find(
            el => {

              if (el.position.id == 1) {
                this.adventureCell = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 2) {
                this.apto = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 3) {
                this.awto = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 4) {
                this.brigTrg = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 5) {
                this.colgsTrg = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 6) {
                this.eqtn = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 7) {
                this.fc = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 8) {
                this.fe = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 9) {
                this.gso1trg = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 10) {
                this.gso2trg = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 11) {
                this.gso2assmt = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 12) {
                this.gso2pgme = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 13) {
                this.methodsec = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 14) {
                this.pto = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 15) {
                this.sig = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 16) {
                this.tac = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 17) {
                this.wto = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 18) {
                this._2xdemocoy = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

              if (el.position.id == 19) {
                this._2xloafghan = el;
                // console.log(this.brigTrg);
                this.cdref.detectChanges();
              }

            }
          )
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      err => {
        // this.spinner.hide();
      }

    )
  }

  getTRGBattalionOrgChart(id) {
console.log(id);
this.coyCmdrs=[]
    this.service.getTRGBattalionOrgMembers(id, 1).subscribe(
      res => {
        console.log("/*========TRG BATTALION========*/");
         console.log(res);
        console.log("/*===============================*/");
        
        if(res.status == "OK"){

          let data = res.object

// this.c4=data[3].battalionCompany.name

          if(data.length){
            
            this.c1=data[0].battalionCompany.name
            this.c2=data[1].battalionCompany.name
            this.c3=data[2].battalionCompany.name
            this.c4=data[2].battalionCompany.name

            

            data.find(
              el => {
                if (el.battalionPost.id == 1) {
                  this.aq = el
                } else if (el.battalionPost.id == 2) {
                  this.bnCdr = el;
                } else 
                if (el.battalionPost.id == 3) {
                  this.coyCmdrs.push(el)
                  
                }
              }
            )
          } else{
            this.sharedService.openSnackbar("No Data Available")
            this.aq = {};
            this.bnCdr = {};
            this.coyCmdrs = [];

            this.c1="-"
            this.c2="-"
            this.c3="-"
            this.c4="-"


          }
        }

      }
    )
  }

  getGSBranchOrgchart(){

    this.service.getAllGSBranchMembers(1).subscribe(
      res => {
        // console.log("/**==========GS Branch=========*/");
        // console.log(res);
        // console.log("/**============================*/");

        if (res.status == "OK") {

          let ob = res.object

          ob.find(
            el => {

              if (el.gsPosition.id == 1) {
                this.bgs = el;
              }
              if (el.gsPosition.id == 2) {
                this.colgs = el
              }
              if (el.gsPosition.id == 3) {
                this.gso1coord = el
              }
              if (el.gsPosition.id == 4) {
                this.gso1int = el
              }

              if (el.gsPosition.id == 5) {
                this.gso1sd = el
              }

              if (el.gsPosition.id == 6) {
                this.gso2stats = el
              }
              if (el.gsPosition.id == 7) {
                this.oicit = el
              }
              if (el.gsPosition.id == 8) {
                this.pro = el
              }
              if (el.gsPosition.id == 9) {
                this.securityOfficer = el
              }
            }
          )

        }

      }
    )
  }


  noImg(e: any) {
    e.target.src = "assets/img/id.png"
  }



}
