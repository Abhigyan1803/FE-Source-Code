import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrls: ['./add-chart.component.scss']
})
export class AddChartComponent implements OnInit {
  addChartForm: FormGroup;
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
    this.addChartForm = this.fb.group({
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
      this.title = "View Chart"
      this.getChart();
    } else {
      this.title = "Add Chart"
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

  getChart() {
    this.spinner.show();
    this._trgTeam.getByIdChart(this.id).subscribe(res => {
      console.log("by id", res);
      this.spinner.hide();
      if (res.status == '1') {
        this.addChartForm.patchValue({
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
    return this.addChartForm.controls;
  }

  openDoc(url) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: url
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
      this.addChartForm.patchValue({
        doc: file
      });
      this.isDoc = true;
    }
    console.log("selected Doc", this.addChartForm.value);
  }

  submit() {
    if (this.addChartForm.valid) {
      if (this.addChartForm.value.doc == null) {
        this.isDoc = false;
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgTeam.addChart(this.addChartForm.value).subscribe(res => {
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

  updateChart() {
    console.log("valid",this.addChartForm.valid);
    
    if (this.addChartForm.valid) {
      this.spinner.show();
      this._trgTeam.updateChart(this.addChartForm.value).subscribe(
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
    if(this.router.url.includes('main/admin/trg-team'))
    {
    this.router.navigate(['/main/admin/trg-team/adventure-cell/chart']); 
    } else{
    this.router.navigate(['/main/trg-team/adventure-cell/chart']); 
    }
  }
}
