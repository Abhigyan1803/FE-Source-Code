import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-awardee',
  templateUrl: './add-awardee.component.html',
  styleUrls: ['./add-awardee.component.scss']
})
export class AddAwardeeComponent implements OnInit {

  awards: any[] = ["Param Vir Chakra", "Ashoka Chakra", "SYSM", "Mahavir Chakra", "Kirti Chakra", "UYSM", "Vir Chakra", "Shaurya Chakra"];

  @ViewChild('file', { static: true }) imgFile;
  battalions:any[]=[];

  unSelectedFile;
  isError: boolean = false;
  previewImg: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addHallOfFameForm: FormGroup = new FormGroup({});
  pageName: string = "Add Gallantry Awardee"
  id;

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService,
     private route: ActivatedRoute, private sharedService:SharedService,
    private cdref: ChangeDetectorRef, private service: AdminService, private snackbar: MatSnackBar, ) {
    this.addHallOfFameForm = this.fb.group({

      officerRank: ['', Validators.required],
      officerName: ['', Validators.required],
      officerRegiment: ['', Validators.required],
      officerBattalion: ['', Validators.required],
      awardMedal: ['', Validators.required],
      yearAwarded: ['', Validators.required],
      recognition: [''],
      description: ['', Validators.required],

      isForeign: ['0', Validators.required],
      country: ['India', Validators.required],

      status: ['1', Validators.required],
      image: ['']

    })

    this.getBattalions();

  }


  ngOnInit(): void {

    if (this.router.url.includes('hall-of-fame/gallantry-awardees/view-gallantry-awardee')) {
      this.pageName = 'View Gallantry Awardee';
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.service.getGallantryHallOfFameById(this.id).subscribe(
        res => {
          this.spinner.show()
          console.log(res);
          if (res.status == 'OK') {
            const data = res.object
            this.addHallOfFameForm.patchValue({
              officerRank: data.officerRank,
              officerName: data.officerName,
              officerRegiment: data.officerRegiment,
              officerBattalion: data.officerBattalion,
              awardMedal: data.awardMedal,
              yearAwarded: data.yearAwarded,
              recognition: data.recognition,
              description: data.description,

              isForeign: data.isForeign,
              country: data.country,

              status: data.status,
            })

            this.descLength = data.description.length;

            this.previewImg = data.officerImage
            this.spinner.hide();
          }
          else {
            this.sharedService.openSnackbar(res.msg)
            this.spinner.hide();
          }
        },
        err=>{
          this.sharedService.openSnackbar("Some Error Occured")
        }
      )


    }
    
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


  onlyNum(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  goBack() {
    this.router.navigate(['/main/admin/home/hall-of-fame/gallantry-awardees'])
  }


  /** ========= CHARACTERS COUNT ========= */
  titleLength = 0;
  descLength = 0;
  charCount(e: any) {
    if (e.target.value.length === 3000){
      return false;
    }
    this.descLength = e.target.value.length
  }



  onSelectImage(e: any) {
    // this.addHallOfFameForm.patchValue({
    //   image: e.target.files[0]
    // })


    let file = e.target.files[0]
    //change file from 50mb to 200 mb
    // if (file.size > 52428800) {
    if (file.size > 202428800) {
      this.imgFile.nativeElement.files = this.unSelectedFile;
      this.sharedService.openSnackbar('Document Should Be Maximum 200 MB in Size')
    } else {
      this.addHallOfFameForm.patchValue({
        image: file
      });

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.previewImg = event.target.result;
      }
    }

    //  var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = (event:any)=>{
    //   this.previewImg = event.target.result;
    // }
  }

  public get f() {
    return this.addHallOfFameForm.controls;
  }

  addHallOfFame() {
    if (this.addHallOfFameForm.invalid) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();

      this.service.addGallantryHallOfFame(this.addHallOfFameForm.value).subscribe(
        res => {
          console.log(res);
          this.apiRes(res);
        },
        err => {
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
          this.spinner.hide()

        }
      )
    }
  }

  apiRes(res){

    if (res.status == "OK") {
      this.sharedService.openSnackbar(res.message)
      this.cdref.detectChanges();
      this.goBack()
      this.spinner.hide();
    }
    else {
      this.sharedService.openSnackbar(res.message)
      this.spinner.hide()
    }
  }

  updateHallOfFame() {

    if (this.addHallOfFameForm.invalid) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();

      this.service.updateGallantryHallOfFame(this.id,this.addHallOfFameForm.value).subscribe(
        res => {
          console.log(res);
          this.apiRes(res);
        },
        err => {
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
          this.spinner.hide()

        }
      )
    }
  }


}
