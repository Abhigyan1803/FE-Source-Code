import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  addReportForm: FormGroup;
  title: string;
  id: number;
  unSelectedFile: any;
  docUrl: any;
  adventureCellTypes: any[];
  seasonTerms: any[];
  currentYear = new Date().getFullYear();
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
    this.addReportForm = this.fb.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      seasonTerm: ['', Validators.required],
      doc: [],
      year: [this.currentYear, [Validators.required, Validators.maxLength(4), Validators.min(this.currentYear)]],
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
      this.title = "View Report"
      this.getReport();
    } else {
      this.title = "Add Report"
    }
    this.getAdventureCell();
    this.getSeasonTerm();
  }

  getAdventureCell() {
    this._trgTeam.getAllAdventureCellType().subscribe(
      res => {
        // console.log(res); 
        if (res.status = '1') {
          this.adventureCellTypes = res.List
        }
      }
    )
  }

  getSeasonTerm() {
    this._trgTeam.getAllSeasonTerm().subscribe(
      res => {
        // console.log(res);
        if (res.status == '1') {
          this.seasonTerms = res.List;
        }
      }
    )

  }

  getReport() {
    this.spinner.show();
    this._trgTeam.getByIdReport(this.id).subscribe(res => {
      console.log("by id", res);
      this.spinner.hide();
      if (res.status == '1') {
        this.addReportForm.patchValue({
          name: res.List.name,
          seasonTerm: res.List.seasonTerm.id,
          year: res.List.year,
          description: res.List.description,
          status: res.List.status,
          id: this.id
        })
        this.nameLength = res.List.name.length;
        this.descLength = res.List.description.length;
        this.docUrl = res.List.document;
      }
      else {
        this._trgBattalion.openSnackbar(res.msg)
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  /** ========= CHARACTERS COUNT ========= */

  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  get f() {
    return this.addReportForm.controls;
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
      this.addReportForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
    console.log("selected Doc", this.addReportForm.value);
  }

  submit() {  
    if (this.addReportForm.valid) {
      console.log("Doc", this.isDoc);
      if (this.addReportForm.value.doc == null) {
        this.isDoc = false;
        console.log("Doc", this.isDoc);
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgTeam.addReport(this.addReportForm.value).subscribe(res => {
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

  updateReport() {
    if (this.addReportForm.valid) {
      this.spinner.show();
      this._trgTeam.updateReport(this.addReportForm.value).subscribe(
        res => {
          this.apiRes(res);
        },
        err => {
          this.spinner.hide()
          this._trgBattalion.openSnackbar("Some Error Occured.")
        }
      )
    }
    else {
      this.isError = true;
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
      this.router.navigate(['main/admin/trg-team/adventure-cell/report']); 
        } else {
          this.router.navigate(['main/trg-team/adventure-cell/report']); 
        }
  }
}
