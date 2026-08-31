import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrgTeamService } from 'app/service/trg-team/trg-team.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';

@Component({
  selector: 'ms-add-exam-schedule',
  templateUrl: './add-exam-schedule.component.html',
  styleUrls: ['./add-exam-schedule.component.scss']
})
export class AddExamScheduleComponent implements OnInit {

  addExamScheduleForm: FormGroup;
  title: string = 'Add Exam Schedule';
  id: string = '';
  unSelectedFile: any;
  docUrl: any;
  @ViewChild('inputFile', { static: true }) docFile;
  isDoc;
  isError;
  nameLength = 0;
  descLength = 0;
  term: string;
  type: string = "BMT-2";
  subType: string;
  termId: number;
  subTypes: string[] = ['General Instruction', 'Resp of Eval','Resp of Invigilation', 'Confirmation of Marks', 'Retest'];

  constructor(
    private dialog: MatDialog,
    private service: TrgTeamService, public sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute,) {

    this.activeRoute.params.subscribe(
      (params) => {
        this.term = params.term;
        this.subType = params.subType;

        if (this.term == 'I Term') {
          this.termId = 1;
        } else if (this.term == 'II Term') {
          this.termId = 2;
        } else if (this.term == 'III Term') {
          this.termId = 3;
        } else if (this.term == 'II Tech') {
          this.termId = 7;
        } else {
          this.router.navigate(['/main/trg-team/dashboard'])
          this.sharedService.openErrorSnackbarWithSeconds('Error!', 3)
        }

        if (!this.subTypes.includes(this.subType)) {
          this.router.navigate(['/main/trg-team/dashboard'])
          this.sharedService.openErrorSnackbarWithSeconds('Error!', 3)
        }

        this.addExamScheduleForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          status: ['1', Validators.required],
          type: [this.type],
          subType: [this.subType],
          termId: [this.termId],
          doc: []
        })

      }
    )

  }

  ngOnInit(): void {
    if (this.router.url.includes('view-exam-schedule')) {
      this.spinner.show()
      this.title = 'View Exam Schedule'
      this.id = this.activeRoute.snapshot.queryParamMap.get('id');

      this.service.viewExamScheduleById(this.id).subscribe(
        res => {
          console.log(res);

          if (res.status == '1') {
            if(res.List){
                this.addExamScheduleForm.patchValue({
              name: res.List.name,
              description: res.List.description,
              status: res.List.status,
              type: res.List.type,
              subType: res.List.subType,
              termId: res.List.termId
            })
            this.descLength = res.List.description.length;
            this.nameLength = res.List.name.length
            this.docUrl = res.List.document
            this.isDoc = true;
            this.spinner.hide()
            }
          
          } else {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
          }
        }
      )
    }
  }

  openDoc(l) {
    this.dialog.open(DialogComponent, {
      width: '1300px', height: '650px',
      data: {
        type: 'document', title: "Document", url: l
      }
    });
  }

  onSelectDoc(e) {
    var file = e.target.files[0]
    if (file.size > 52428800) {
      this.docFile.nativeElement.files = this.unSelectedFile;
      this.sharedService.openSnackbar('Document Should Be Maximum 50 MB in Size')
    } else {
      this.docUrl = ''
      this.addExamScheduleForm.patchValue({
        doc: file
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
    return this.addExamScheduleForm.controls;
  }

  submit() {

    if (this.addExamScheduleForm.invalid || !this.isDoc) {
      this.isError = true;
      this.sharedService.openSnackbar("Please Fill All Required Fields")
    } else {
      this.spinner.show();
      this.service.addExamSchedue(this.addExamScheduleForm.value).subscribe(
        res => {
          // console.log(res);
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
    if (this.addExamScheduleForm.valid) {
      this.spinner.show();
      this.service.updateExamSchedule(this.id,this.addExamScheduleForm.value).subscribe(
        res => {
          // console.log(res);
          if (res.status == '1') {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
            this.goBack()
          } else {
            this.spinner.hide()
            this.sharedService.openSnackbar(res.message)
          }
        },
        err => {
          this.spinner.hide()
          this.sharedService.openSnackbar("Some Error Occured.")
        }
      )
    }
  }


  apiRes(res) {
    if (res.status == 'Success Messgae') {
      this.spinner.hide()
      this.sharedService.openSnackbar(res.msg)
      this.goBack()
    } else {
      this.spinner.hide()
      this.sharedService.openSnackbar(res.msg)
    }
  }

  goBack() {
    this.router.navigate([`/main/trg-team/gso-2-assessment/${this.term}/service-subjects/${this.type}/${this.subType}`]);
  }

}
