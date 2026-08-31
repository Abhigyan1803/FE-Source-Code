import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-add-instruction',
  templateUrl: './add-instruction.component.html',
  styleUrls: ['./add-instruction.component.scss']
})
export class AddInstructionComponent implements OnInit {

  @ViewChild('inputFile', { static: true }) docFile;

  pTitle;
  isError: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  unSelectedFile;
  adventureCellTypes: any[] = [];
  seasonTerms: any[] = [];
  currentYear = new Date().getFullYear();
  addInstructionForm: FormGroup;
  isDoc: boolean = true;
  //for update instruction
  id;
  docUrl;
  nameLength = 0;
  descLength = 0;
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private cdref: ChangeDetectorRef, private dialog: MatDialog,
    private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute, private service: TrgTeamService) {
    this.addInstructionForm = this.fb.group({
      docName: ['', Validators.required],
      acType: ['', Validators.required],
      term: ['', Validators.required],
      year: [this.currentYear, Validators.required],
      description: ['', Validators.required],
      document: [],
      status: ['1', Validators.required]
    })

    if (this.router.url.includes('view-instruction')) {
      this.pTitle = "View Instruction"
      this.id = this.route.snapshot.queryParamMap.get('id')
      this.service.getInstructionById(this.id).subscribe(
        res => {
          this.spinner.show();
          // console.log(res);
          if (res.status == '1') {
            this.addInstructionForm.patchValue({
              docName: res.List.docName,
              acType: res.List.acType.id,
              term: res.List.seasonTerm.id,
              year: res.List.year,
              description: res.List.description,
              status: res.List.status
            })
            this.docUrl = res.List.document;
            this.nameLength =res.List.docName.length;
            this.descLength = res.List.description.length;
            this.spinner.hide()
          }
        })
    }
    else {
      this.pTitle = "Add Instruction"
    }
  }


  ngOnInit(): void {
    this.service.getAllAdventureCellType().subscribe(
      res => {
        console.log(res);
        if (res.status = '1') {
          this.adventureCellTypes = res.List
        }
      })

    this.service.getAllSeasonTerm().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.seasonTerms = res.List;
        }
      }
    )

    this.unSelectedFile = this.docFile.nativeElement.files

  }

  /** ========= CHARACTERS COUNT ========= */
 
  charCount(e: any, t) {
    if (t == 'docName')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  get f() {
    return this.addInstructionForm.controls;
  }

  openDoc(doc){    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',height:'600px',
      data: {
        type:'document',url:doc
      }
    });
  }

  onSelectDoc(e: any) {
    let file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.addInstructionForm.patchValue({
        document: file
      });
      this.isDoc = true;
    }
  }


  addInstruction() {

    if (this.addInstructionForm.valid) {
      if (this.addInstructionForm.value.document == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this.service.addGenralInstruction(this.addInstructionForm.value).subscribe(
          res => {
            // console.log(res);
           this.apiRes(res);

          },
          err => {
            this.spinner.hide();
            this.openSnackbar('Some Error Occured.')
          });
      }
    } else {
      this.isError = true;
    }
  }

  updateInstruction() {
    if (this.addInstructionForm.valid) {
      this.spinner.show();
      this.service.updateGenralInstruction(this.id, this.addInstructionForm.value).subscribe(
        res => {
          // console.log(res);
          this.apiRes(res);

        },
        err => {
          this.spinner.hide();
          this.openSnackbar('Some Error Occured.');
        })
    } else {
      this.isError = true;
    }

  }

  apiRes(res){
    if (res.status == '1') {
      this.spinner.hide();
      this.openSnackbar(res.msg)
      this.cdref.detectChanges();
      this.goBack();
    }
    else {
      this.spinner.hide();
      this.openSnackbar(res.msg)
    }
  }


  goBack(){
    if(this.router.url.includes('main/admin/trg-team'))
    {
    this.router.navigate(['/main/admin/trg-team/adventure-cell/general-instruction']); 
    } else{
      this.router.navigate(['/main/trg-team/adventure-cell/general-instruction']); 
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
