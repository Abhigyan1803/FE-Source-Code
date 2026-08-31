import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'app/service/admin/admin.service';
import { AdjutantService } from 'app/service/adjutant/adjutant.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-add-study-bmt1',
  templateUrl: './add-study-bmt1.component.html',
  styleUrls: ['./add-study-bmt1.component.scss']
})
export class AddStudyBmt1Component implements OnInit {

  addStudyMaterialForm: FormGroup;
  title: string = "Add Study Material";
  id: string = '';
  unSelectedFile: any;
  docUrl: any;
  @ViewChild('inputFile', { static: true }) docFile;
  isError;
  isDoc;
  nameLength = 0;
  descLength = 0;
  terms: any[] = [];
  type: string;
  term: string;
  termId: number;

  constructor(
    private dialog: MatDialog,
    private _trgTeam: TrgTeamService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private cdref: ChangeDetectorRef, public sharedService: SharedService,
    private route: ActivatedRoute) {


    this.route.params.subscribe(
      (params) => {
        this.type = params.type;
        this.term = params.term
        console.log(params);

        if (params.term == "I Term") {
          this.termId = 1
          console.log(this.term);

        } else if (params.term == "II Term") {
          this.termId = 2
          console.log(this.term);

        } else if (params.term == "II Tech") {
          this.termId = 7
          console.log(this.term);

        } else if (params.term == "III Term") {
          this.termId = 3
          console.log(this.term);

        }



        this.addStudyMaterialForm = this.fb.group({
          name: ['', Validators.required],
          status: ['1', Validators.required],
          description: ['', Validators.required],
          studyMaterialType: [this.type],
          doc: [],
          termId: [this.termId],
        })

      }
    )




  }

  ngOnInit(): void {
    // this.getTerms()
   if (this.router.url.includes('view-study-material')) {
      this.spinner.show()
      this.title = 'View Study Material'
      this.id = this.route.snapshot.queryParamMap.get('id');
      // this.id = this.activeRoute.snapshot.queryParamMap.get('id');
      // console.log(this.id, "id id id");

      this._trgTeam.getStudyMaterialById(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == 'OK') {
            this.addStudyMaterialForm.patchValue({
              name: res.object.name,
              description: res.object.description,
              status: res.object.status,
              studyMaterialType: res.object.studyMaterialType,
              termId: res.object.termId,

            })
            this.docUrl = res.object.doc
            this.isDoc = true;
            this.spinner.hide()
          } else {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
          }
        }
      )
    }
  }
  // getTerms() {
  //   this.service.getAllTerms().subscribe(
  //     res => {
  //       // console.log(res);
  //       if (res.status == '1') {
  //         this.terms = res.List;
  //         this.cdref.detectChanges();
  //       }

  //     }
  //   )
  // }
  openDoc(l) {
    console.log("++++++++", l);

    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: l
      }
    });
  }

  onSelectDoc(e) {
    var file = e.target.files[0]
    //50 mb doc change from 50 to 200 
    // if (file.size > 52428800) {
      if (file.size > 202428800) { 
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.sharedService.openSnackbar('Document Should Be Maximum 200 MB in Size')
    } else {
      this.docUrl = ''
      this.addStudyMaterialForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
  }


  charCount(e: any) {
    // if (t == 'name')
    //   this.nameLength = e.target.value.length
    // if (t == 'description')
    this.descLength = e.target.value.length
  }
  get f() {
    return this.addStudyMaterialForm.controls;
  }

  submit() {
    if (this.addStudyMaterialForm.invalid || !this.isDoc) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this._trgTeam.addStudyMaterial(this.addStudyMaterialForm.value).subscribe(
        res => {
          console.log(res);
          this.apiRes(res)
        },
        err => {
          this.spinner.hide();
          this.sharedService.openSnackbar('Error Occured.')
          console.log(JSON.stringify(err));
        }
      )
    }
  }

  update() {
    if (this.addStudyMaterialForm.valid) {
      this.spinner.show();
      this._trgTeam.updateStudyMaterial(this.id, this.addStudyMaterialForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this.sharedService.openSnackbar("Some Error Occured.")
        }
      )
    }
  }


  apiRes(res) {
    if (res.status == 'OK') {
      this.spinner.hide()
      this.sharedService.openSnackbar(res.message)
      this.goBack();
    } else {
      this.spinner.hide()
      this.sharedService.openSnackbar(res.message)
    }
  }

  goBack() {
    this.router.navigate(['/main/trg-team/gso-2-pgme/' + this.term + '/study-material/material/' + this.type]);
  }
}
