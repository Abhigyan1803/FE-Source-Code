import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-nominal',
  templateUrl: './add-nominal.component.html',
  styleUrls: ['./add-nominal.component.scss']
})
export class AddNominalComponent implements OnInit {
  addNominalForm: FormGroup;
  title: string;
  id: number;
  unSelectedFile: any;
  docUrl: any;
  @ViewChild('inputFile', { static: true }) docFile;
  isDoc: boolean = true;
  isError: boolean;
  nameLength = 0;
  descLength = 0;

  constructor(
    private dialog: MatDialog,
    private _trgTeam: TrgTeamService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private activeRoute: ActivatedRoute) {
    this.addNominalForm = this.fb.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      file: [],
      status: ['1', Validators.required],
      id: [],
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log("id", this.id);
    if (this.id > 0) {
      this.title = "View Nominal Role"
      this.getNominal();
    } else {
      this.title = "Add Nominal Role"
    }

  }

  getNominal() {
    this.spinner.show();
    this._trgTeam.getByIdNominal(this.id).subscribe(res => {
      console.log("by id", res);
      this.spinner.hide();
      if (res.status == '1') {
        this.addNominalForm.patchValue(res.Object);
        this.docUrl = res.Object.document;
        this.nameLength = res.Object.name.length;
        this.descLength = res.Object.description.length;
      }
      else {
        this._trgBattalion.openSnackbar(res.msg)
      }
    }, (err) => {
      this.spinner.hide();
    })
  }
  openDoc(l) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: l
      }
    });
  }
  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this._trgBattalion.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addNominalForm.patchValue({
        file: file
      });
      this.isDoc = true;
    }
  }

  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  get f() {
    return this.addNominalForm.controls;
  }

  submit() {
    if (this.addNominalForm.valid) {
      if (this.addNominalForm.value.file == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;

        this.spinner.show();
        this._trgTeam.addNominal(this.addNominalForm.value).subscribe(res => {
          console.log("result", res);
          this.apiRes(res);
        },
          err => {
            this.spinner.hide()
            this._trgBattalion.openSnackbar("Some Error Occured.")
          }
        )
      }
    }
    else {
      this.isError = true;
    }
  }

  updateNominal() {
    if (this.addNominalForm.valid) {
      this.spinner.show();
      this._trgTeam.updateNominal(this.addNominalForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.")
        }
      )
    }
  }


  apiRes(res) {
    if (res.status == '1') {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.msg)
      this.goBack()
    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.msg)
    }
  }

  goBack(){
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['/main/admin/trg-team/adventure-cell/nominal']); 
      } else {
        this.router.navigate(['/main/trg-team/adventure-cell/nominal']); 
      }
  }
}
