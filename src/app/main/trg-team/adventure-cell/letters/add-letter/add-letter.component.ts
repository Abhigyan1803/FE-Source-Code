import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-add-letter',
  templateUrl: './add-letter.component.html',
  styleUrls: ['./add-letter.component.scss']
})
export class AddLetterComponent implements OnInit {

  addLetterForm: FormGroup;
  adventureCellTypes: any[] = [];

  @ViewChild('inputFile', { static: true }) docFile;

  id;
  pTitle: string = '';
  docUrl: string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDoc: boolean = true;
  unSelectedFile;
  nameLength = 0;
  descLength = 0;
  isError: boolean;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog,
    private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute, private service: TrgTeamService) {
    this.addLetterForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      acType: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })


  }

  ngOnInit(): void {
    this.unSelectedFile = this.docFile.nativeElement.files
    this.service.getAllAdventureCellType().subscribe(
      res => {
        // console.log(res); 
        if (res.status = '1') {
          this.adventureCellTypes = res.List
        }
      }
    )


    if (this.router.url.includes('view-letter')) {
      this.pTitle = "View Letter"
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.service.getLetterById(this.id).subscribe(
        res => {
          console.log("Letter",res.status);
          if (res.status == '1') {
            this.addLetterForm.patchValue({
              name: res.List.name,
              description: res.List.description,
              acType: res.List.acType.id,
              status: res.List.status,
            })
            this.docUrl = res.List.document;
            this.nameLength = res.List.name.length;
            this.descLength = res.List.description.length;
          }
        }
      )
    } else {
      this.pTitle = "Add Letter"
    }
  }

  get f() {
    return this.addLetterForm.controls;
  }

  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }

  onSelectDoc(e: any) {
    this.docUrl = '';
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addLetterForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
  }

  openDoc(doc) {
   this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: doc
      }
    });
  }


  addLetter() {
    if (this.addLetterForm.valid) {
      if (this.addLetterForm.value.doc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this.service.addLetter(this.addLetterForm.value).subscribe(
          res => {

            this.apiRes(res)
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

  updateLetter() {
    console.log(this.addLetterForm.value)
    this.spinner.show();
    this.service.updateLetter(this.id, this.addLetterForm.value).subscribe(
      res => {
      this.apiRes(res)
      },
      err => {
        this.spinner.hide();
        this.openSnackbar('Some Error Occured.')
      }
    )

  }

  apiRes(res){

    console.log(res);
    if (res.status == '1') {
      this.spinner.hide();
      this.openSnackbar(res.msg)
      this.cdref.detectChanges();
      this.goBack()
    }
    else {
      this.spinner.hide();
      this.openSnackbar(res.msg)
    }
  }



  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  goBack(){
    if(this.router.url.includes('/main/admin/trg-team/')){
      this.router.navigate(['/main/admin/trg-team/adventure-cell/letters']); 

    } else {
      this.router.navigate(['/main/trg-team/adventure-cell/letters']); 

    }
  }

}
