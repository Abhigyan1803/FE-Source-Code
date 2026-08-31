import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ms-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.scss']
})
export class AddTransportComponent implements OnInit {
  addTransportForm: FormGroup;
  title: string;
  id: number;
  unSelectedFile: any;
  docUrl: any;
  isDoc: boolean = true;
  nameLength = 0;
  descLength = 0;
  isError: boolean;
  @ViewChild('inputFile', { static: true }) docFile;
  constructor(
    public dialog: MatDialog,
    private _trgTeam: TrgTeamService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private _trgBattalion: TrgBattalionService,
    private activeRoute: ActivatedRoute) {
    this.addTransportForm = this.fb.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      file: [],
      status: ['1', Validators.required],
      id: [],
    })
  }

  ngOnInit(): void {
    this.unSelectedFile = this.docFile.nativeElement.files;
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log("id", this.id);
    if (this.id > 0) {
      this.title = "View Transport Demand"
      this.getTransport();
    } else {
      this.title = "Add Transport Demand"
    }

  }

  getTransport() {
    this.spinner.show();
    this._trgTeam.getByIdTransport(this.id).subscribe(res => {
      console.log("by id", res);
      this.spinner.hide();
      if (res.status == '1') {
        this.addTransportForm.patchValue(res.Object);
        this.nameLength = res.Object.name.length;
        this.descLength = res.Object.description.length;
        this.docUrl = res.Object.document
      }
      else {
        this._trgBattalion.openSnackbar(res.msg)
      }
    }, (err) => {
      this.spinner.hide();
    })
  }
  get f() {
    return this.addTransportForm.controls;
  }
  charCount(e: any, t) {
    if (t == 'name')
      this.nameLength = e.target.value.length
    if (t == 'description')
      this.descLength = e.target.value.length
  }
  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 5242880) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this._trgBattalion.openSnackbar('Document Should Be Maximum 5 MB in Size')
    } else {
      this.docUrl = ''
      this.addTransportForm.patchValue({
        file: file
      });
      this.isDoc=true;
    }
    console.log("selected Doc", this.addTransportForm.value);
  }

  openDoc(l) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px', height: '600px',
      data: {
        type: 'document', url: l
      }
    });
  }


  submit() {    
    if (this.addTransportForm.valid) {
      if (this.addTransportForm.value.file == null) {
        this.isDoc = false;      
      }
      else {
        this.isDoc = true;
        this.spinner.show();
        this._trgTeam.addTransport(this.addTransportForm.value).subscribe(res => {
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

  updateTransport() {
    if (this.addTransportForm.valid) {
      this.spinner.show();
      this._trgTeam.updateTransport(this.addTransportForm.value).subscribe(
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
      this.goBack();
    } else {
      this.spinner.hide()
      this._trgBattalion.openSnackbar(res.msg)
    }
  }
  goBack(){
    if(this.router.url.includes('/main/admin/trg-team/')){
    this.router.navigate(['/main/admin/trg-team/adventure-cell/transport']); 
          } else {
    this.router.navigate(['/main/trg-team/adventure-cell/transport']); 
          }
  }
}
