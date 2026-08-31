import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Links } from 'app/links.module';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface Member {
  rank?: string,
  name?: string,
  post?: string,
  image?: string,
}


@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
IP = Links.IP;
  adventureCell: Member = {};
  apto: Member = {};
  awto: Member = {};
  brigTrg: Member = {};
  colgsTrg: Member = {};
  eqtn: Member = {};
  fc: Member = {};
  fe: Member = {};
  gso1trg: Member = {};
  gso2trg: Member = {};
  gso2assmt: Member = {};
  gso2pgme: Member = {};
  methodsec: Member = {};
  pto: Member = {};
  sig: Member = {};
  tac: Member = {};
  wto: Member = {};
  _2xdemocoy: Member = {};
  _2xloafghan: Member = {};

  constructor(private service: TrgTeamService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getOrganizationChartData();
  }


  getOrganizationChartData() {
    this.spinner.show();
    this.service.getOrganizationChartData().subscribe(
      res => {
        console.log(res);
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
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      err => {
        this.spinner.hide();
      }

    )
  }

  noImg(e: any) {
    e.target.src = "assets/img/id.png"
  }

}
