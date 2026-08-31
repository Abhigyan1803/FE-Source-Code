import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-datesheet',
  templateUrl: './add-datesheet.component.html',
  styleUrls: ['./add-datesheet.component.scss']
})
export class AddDatesheetComponent implements OnInit {
  @ViewChild('inputFile', { static: true }) docFile;

  pTitle;
  docUrl;
  id;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  unSelectedFile;
  addDatesheetForm: FormGroup;
  isDoc: boolean = true;
  isError: boolean;
  descLength:number = 0;
  nameLength:number = 0;
  type;
  term: string;
  termId: number;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog,
    private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute, private service: TrgTeamService) {

    this.route.params.subscribe(
      (params) => {

        console.log("ROUTE PARAMETERS", params);

        this.term = params.term

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
        
        this.addDatesheetForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          status: ['1', Validators.required],
          termId: [this.termId],
          doc: []
        })


      })





  }

  ngOnInit(): void {
    this.unSelectedFile = this.docFile.nativeElement.files

    if (this.router.url.includes('view-datesheet')) {
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.pTitle = "View Datesheet"
      this.service.viewDatesheetById(this.id).subscribe(
        res => {
          // console.log(res);
          if (res.status == '1') {
            this.addDatesheetForm.patchValue({
              name: res.List.name,
              description: res.List.description,
              status: res.List.status,
            })
            this.docUrl = res.List.document;
            this.descLength = res.List.description.length;
          }

        }
      )
    }
    else {
      this.pTitle = "Add Datesheet";
    }

  }

  get f() {
    return this.addDatesheetForm.controls;
  }

  /** ========= CHARACTERS COUNT ========= */
  goBack() {
    this.router.navigate(['/main/trg-team/gso-2-assessment/' + this.term + '/service-subjects/datesheet']);
  }
  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  

  onSelectDoc(e: any) {
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addDatesheetForm.patchValue({
        doc: file
      });
      this.isDoc = true;

    }
  }
  openDoc(d) {
    console.log("Abc", d);

    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', url: d
      }
    });
  }
  addDatesheet() {
    if (this.addDatesheetForm.valid) {
      console.log("odc", this.addDatesheetForm.value.doc);

      if (this.addDatesheetForm.value.doc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this.service.addDatesheet(this.addDatesheetForm.value).subscribe(
          res => {
            if (res.status == 'Success Messgae') {
              this.spinner.hide();
              this.openSnackbar(res.msg)
              this.cdref.detectChanges();
              this.goBack()
            }
            else {
              this.spinner.hide();
              this.openSnackbar(res.msg)
            }
          },
          err => {
            this.spinner.hide();
            this.openSnackbar('Some Error Occured.')
          })

      }
    }
    else {
      this.isError = true;
    }
  }

  updateDatesheet() {
    if (this.addDatesheetForm.valid) {
      this.spinner.show();
      this.service.updateDatesheet(this.id, this.addDatesheetForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == '1') {
            this.spinner.hide();
            this.openSnackbar(res.message)
            this.cdref.detectChanges();
            this.goBack()
          }
          else {
            this.spinner.hide();
            this.openSnackbar(res.message)
          }

        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Some Error Occured.')
        }
      )
    }
    else {
      this.isError = true;
    }
  }



  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }





}
