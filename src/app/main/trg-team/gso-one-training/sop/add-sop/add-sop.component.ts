import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-sop',
  templateUrl: './add-sop.component.html',
  styleUrls: ['./add-sop.component.scss']
})
export class AddSopComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild('inputFile', { static: true }) docFile;
  unSelectedFile;
  addSopForm: FormGroup;
  pTitle;
 
  //for update doc
  id;
  docUrl;
  isDoc: boolean = true;
  isError: boolean;
  titleLength = 0;
  descLength = 0;

  constructor(private fb: FormBuilder, private service: TrgTeamService, private snackbar: MatSnackBar, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private cdref: ChangeDetectorRef) {

    this.addSopForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['1', Validators.required],
      doc: []
    })

    if (this.router.url.includes('view-sop')) {
      this.spinner.show()
      this.pTitle = "View SOP"
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.service.getSopDetails(this.id).subscribe(
        res => {
          if (res.status == '1') {
            console.log(res);
            this.addSopForm.patchValue({
              title: res.List.title,
              description: res.List.description,
              status: res.List.status
            })
            this.docUrl = res.List.document;
            this.titleLength = res.List.title.length;
            this.descLength = res.List.description.length;
          }
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
        }
      )
    }
    else {
      this.pTitle = "Add SOP"
    }
  }

  ngOnInit(): void {
    this.unSelectedFile = this.docFile.nativeElement.files
  }

  goBack(){
    this.router.navigate(['/main/trg-team/gso-1-training/sop']); 
  }


  get f() {
    return this.addSopForm.controls;
  }
  /** ========= CHARACTERS COUNT ========= */
 
  charCount(e: any, t) {
    if (t == 'title')
      this.titleLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }


  onSelectDoc(e) {
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addSopForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }

  }

  addDocument() {
    console.log("Document", this.addSopForm.value.doc);
 
    if (this.addSopForm.valid) {
      if (this.addSopForm.value.doc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
     
      this.spinner.show();
      this.service.addSopDocument(this.addSopForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.spinner.hide()
            this.cdref.detectChanges();
            this.openSnackbar(res.msg)
            this.router.navigate(['/main/trg-team/gso-1-training/sop']);
          } else {
            this.spinner.hide();
            this.openSnackbar(res.msg);
          }

        },
        err => {
          this.spinner.hide()
          console.log(JSON.stringify(err));
          this.openSnackbar("Some Error Occured.")
        })
    }
    }
    else {
      this.isError = true;
    }
  }

  updateDocument() {
    if (this.addSopForm.valid) {
      this.spinner.show();
      this.service.updateSOPDoc(this.id, this.addSopForm.value).subscribe(
        res => {
          if (res.status == '1') {
            this.spinner.hide()
            this.openSnackbar(res.msg)
            this.cdref.detectChanges();
            this.router.navigate(['/main/trg-team/gso-1-training/sop'])
          } else {
            this.spinner.hide()
            this.openSnackbar(res.msg)
          }
        },
        err => {
          this.spinner.hide()
          this.openSnackbar("Some Error Occured.")
        }
      )
    }
    else {
      this.isError = true;
    }

  }



  openDoc() {
    // console.log(doc);  
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: this.docUrl
      }
    });
  }

  openSnackbar(msg) {
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

}
