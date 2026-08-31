import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'app/links.module';
import { AdminService } from 'app/service/admin/admin.service';
import { EDossierService } from 'app/service/e-dossier/edossier-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-ed-menu',
  templateUrl: './ed-menu.component.html',
  styleUrls: ['./ed-menu.component.scss']
})
export class EdMenuComponent implements OnInit {
  Menu: any[] = [];
  Subtopic: any[] = [];
  termid: string;

  IP = Links.IP

  LeadershipMatrix = "Leadership Matrix";
  AssessmentMatrix = "Assessment Matrix";
  Autobio = "AUTOBIOGRAPHY";
  Ssbreport = "SSB Report & NDA/ ACC Report";
  Personal = "Personal Details";
  drill="drill"
  constructor(private EDossierService: EDossierService, private adminservice: AdminService, private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    // document.getElementById("result").nodeValue = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("result")).value = localStorage.getItem("e");
    (<HTMLInputElement>document.getElementById("name")).value = localStorage.getItem("i");
    (<HTMLInputElement>document.getElementById("cp")).value = localStorage.getItem("companyName");
    (<HTMLInputElement>document.getElementById("bn")).value = localStorage.getItem("battalionName");
    // (<HTMLInputElement>document.getElementById("tid")).value = localStorage.getItem("termId");
    (<HTMLInputElement>document.getElementById("tname")).value = localStorage.getItem("termName");

    (<HTMLInputElement>document.getElementById("rk")).value = localStorage.getItem("rank");

  }
  ngAfterViewInit() {
    // this.getAssignments()
    this.getDossierMenu()
  }

  Heading
  IconUrl
  getDossierMenu() {
    this.spinner.show();
    this.EDossierService.getEDossierMenu(1).subscribe(res => {
      console.log(res);
      if (res.status == "OK") {
        this.Menu = res.object;
        // this.Heading = res.object[0].menuName;
        // this.Subtopic = res.object[0].subMenuList;
        // this.IconUrl = res.object[0].iconUrl;

        console.log(this.Menu, "Menu")
        console.log(this.Heading, "Heading")
        console.log(this.Subtopic, "Subtopic")
        console.log(this.IconUrl, "IconUrl")

        this.spinner.hide();
        this.cdref.detectChanges();
      }
      else {
        this.spinner.hide()
        this.adminservice.openSnackbar(res.message)
      }
    },
      err => {
        this.spinner.hide()
        this.adminservice.openSnackbar("Some Error Occured.");
      }

    )
  }

  mainHead: string;
  listHead: string
  OnclickSubmenuLink(e: any, e1: any) {
    console.log(e);

    console.log(e.time, "menu")
    this.mainHead = e.time;
    // this.listHead= this.listHead.replace(' ','');
    // this.mainHead= this.mainHead.replace(' ','');
    console.log(this.mainHead, "mainHead");

    if (this.LeadershipMatrix == this.mainHead) {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/LeadershipMatrix']);
    }
    if (this.mainHead == 'PT') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/PT']);
    }
    if (this.mainHead == 'Assessment GC') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/assessment-gc']);
    }
    if (this.AssessmentMatrix == this.mainHead) {
      console.log(this.AssessmentMatrix,);
      this.router.navigate(['/e-dossior/ed-content/Ed-index/ED-Campmarks/assessment-matrix']);
    }
    if (this.LeadershipMatrix == this.mainHead) {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/LeadershipMatrix']);
    }
    if (this.Autobio == this.mainHead) {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/ED-Cadetdetails/autobiography'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.Ssbreport == this.mainHead) {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/ED-Cadetdetails/ssbreport'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.Personal == this.mainHead) {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/ED-Cadetdetails/persnol'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    // if (this.mainHead == "Drill") {
    //   this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/drill']);
    // }
    if (this.mainHead == 'WT') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/WT'], { queryParams: { serviceId:localStorage.getItem("e")} });
    }
    if (this.mainHead == 'EQTN') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/eqtn'], { queryParams: { serviceId:localStorage.getItem("e"),termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Drill') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/drill'], { queryParams: { serviceId:localStorage.getItem("e"),termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Academic') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/intellectual'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Club') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Otherdetails/club'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Hike') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Otherdetails/hike'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'LVE') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Otherdetails/lve'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'OBSN Sheet') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Obsnsheet/obsn'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Counselling All Terms') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/ed-Counselling'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Interview Sheet') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/interview-sheet'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Initial Interview') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/initial-interview'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Begining Term Interview') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/begining-interview'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Mid Term Interview') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/mid-interview'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Special Interview') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/special-interview'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Service Subjects') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/service-subjects'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Instructions for Interviews and Counselling') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/Interviews/instructions-interviews'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }

    if (this.mainHead == 'Sports') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/sports'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
    if (this.mainHead == 'Assessment OQ Matrix') {
      this.router.navigate(['/e-dossior/ed-content/Ed-index/OverallAssessment/assessment-oq'],{queryParams: {Id:localStorage.getItem("e"), termId:localStorage.getItem("j")} });
    }
  }



  
}
