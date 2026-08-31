import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Links } from 'app/links.module';
import { HomePageService } from 'app/service/home/home-page.service';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-gallantry-awardees',
  templateUrl: './gallantry-awardees.component.html',
  styleUrls: ['./gallantry-awardees.component.scss']
})
export class GallantryAwardeesComponent implements OnInit {
  IP = Links.IP;
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 3, "autoplay": false, "autoplaySpeed": 3000, "arrows": true, 'dots': true,};

  awards: any[] = ["Param Vir Chakra", "Ashoka Chakra", "SYSM", "Mahavir Chakra", "Kirti Chakra", "UYSM", "Vir Chakra", "Shaurya Chakra"];

  active = 1;

  paramveerChakra:any[]=[];
  sysm:any[]=[];
  mahaveerChakra:[]=[];
  keertiChakra:[]=[];
  uysm:[]=[];
  shauryaChakra:[]=[];
  veerChakra:any[]=[];
  ashokChakra:[]=[];

  showAwards:string='';

  constructor(private service:HomePageService, private spinner:NgxSpinnerService,private sharedService:SharedService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    document.getElementById('foot-id').style.position = 'relative';
  }

  ngAfterViewInit(){
    this.getParamveerChakra()
    this.getGallantryAwardees("Ashoka Chakra")
  }

  getParamveerChakra(){
    this.service.hallOfFameGallantryAwardees('Param Vir Chakra').subscribe(
      res=>{
        console.log(res);
        this.paramveerChakra=res.object

        
      }
    )
  }

  getGallantryAwardees(award:string){
    this.service.hallOfFameGallantryAwardees(award).subscribe(
      res => {
        console.log(res);
        if(res.status == "OK"){
            if(res.object.length){
              if (award == 'SYSM') {
                this.showAwards = award
                this.sysm = res.object
              }
              else if (award == "Mahavir Chakra") {
                this.showAwards = award
                this.mahaveerChakra = res.object

              }
              else if (award == "Kirti Chakra") {
                this.showAwards = award
                this.keertiChakra = res.object

              }
              else if (award == "UYSM") {
                this.showAwards = award
                this.uysm = res.object

              }
              else if (award == "Shaurya Chakra") {
                this.showAwards = award
                this.shauryaChakra = res.object

              }
              else if (award == "Vir Chakra") {
                this.showAwards = award
                this.veerChakra = res.object

              }
              else if (award == "Ashoka Chakra") {
                this.showAwards = award
                this.ashokChakra = res.object

              }

            } else {
              // this.sharedService.openSnackbar("No Records Found")
            }
        } else {
          this.sharedService.openSnackbar(res.message)
        }

        
        
      },
      err=>{
        this.sharedService.openSnackbar("Some Error Occured")
      }
    )
  }

  noImg(e:any){
    e.target.src ="assets/img/hof_default.png"
  }

  readMore(c){
    console.log(c); 
    this.dialog.open(DialogComponent, {
      width: '700px', height: 'auto',
      data: {
        type: 'awardee', title: 'Gallantry Awardee', object:c
      }
    });
  }


}
