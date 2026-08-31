import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GcService } from 'app/service/gc/gc.service';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'app/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { GcDialogComponent } from '../../gc-dialog/gc-dialog.component';
import { AuthService } from 'app/service/auth-service/auth.service';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
import { TrgBattalionService } from 'app/service/trg-battalion/trg-battalion.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface CadetAnswer {
  acdAsnId?: number;
  question?: string;
  answer?: string;
  cadetName?: string;
  serviceId?: string;
  status?: number;
  file?: any;

}


@Component({
  selector: 'ms-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  cadetDetails;
  paper;
  term;
  termId;
  subject;
  serviceId;
  file
  cadetName: string;
  assignments: any[] = [];
  submissionDate:any;
  currentDate:any=new Date();

  cadetAnsArr: CadetAnswer[] = []

  addassignmentForm: FormGroup = new FormGroup({});

  constructor(private service: GcService, private fb: FormBuilder, private router: Router, private Trgservice: TrgBattalionService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private authService: AuthService,
    private cdref: ChangeDetectorRef, public sharedService: SharedService, private dialog: MatDialog) {
    this.cadetDetails = JSON.parse(localStorage.getItem("loginResponse")).object;
    this.cadetName = this.cadetDetails.name;
    this.serviceId = this.cadetDetails.serviceId;
    this.addassignmentForm = this.fb.group({
      file: [],
    })

    this.route.params.subscribe(
      params => {
        // console.log("PARAMETERS: ", params);
        this.paper = params.paper;
        this.term = params.term;
        this.subject = params.subject;

        // this.ngAfterViewInit()
        this.getAssignments()


      }
    )
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // this.getAssignments()
  }
  upload1(event: any): void {
    this.spinner.show();
    let fileName = event.target.files[0].name;
    var file = event.target.files[0];
    this.Trgservice.FileAboutUs(file).subscribe(
      res => {
        console.log(res.object.url);
        if (res.status == 'OK') {
          this.sharedService.openSnackbar(res.message)
          this.addassignmentForm.patchValue({
            file: res.object.url,
          })


          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.sharedService.openSnackbar(res.message)
        }
      },
      err => {
        this.spinner.hide();
        this.sharedService.openSnackbar('Error Occured.')
        console.log(JSON.stringify(err));
      }
    )
  }
  getAssignments() {
    this.spinner.show()
    this.assignments = [];
    this.cadetAnsArr = [];
    this.service.getAssignments(this.cadetDetails.serviceId, this.cadetDetails.term, this.paper, this.subject).subscribe(
      res => {

        console.log(res);

        if (res.status == "OK") {

          if (res.object) {
            this.assignments = res.object;
            console.log(this.addassignmentForm.value.file, "file");

            this.assignments.forEach(
              el => {
                this.cadetAnsArr.push({
                  acdAsnId: el.id,
                  question: el.question,
                  answer: '',
                  cadetName: this.cadetName,
                  serviceId: this.serviceId,
                  file: '',
                  status: 1,
                })
              }
            )
            console.log(this.assignments, "file");
            console.log(new Date(this.assignments[0].lastSubmissionDate));
            this.submissionDate=new Date(this.assignments[0].lastSubmissionDate) 

          }



          this.spinner.hide()
          this.cdref.detectChanges();

        }

      }
    )
  }
  public onChange(event: CKEditor4.EventInfo) {
    this.authService.resetTime()
    // console.log(event.editor.getData());
    // console.log(event.editor)
  }

  movementEvent(e, t) {
    // console.log(t)
    this.authService.resetTime()
  }
  openDoc(a) {
    console.log(a, ":");

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document', title: "ITSEC Document", url: a.file
        }
      }
    )
  }
  openDoc1(e) {
    console.log(e);
    
        this.dialog.open(DialogComponent,
          {
            width: '1300px', height: '650px',
            data: {
              type: 'document', title: "ITPPP Document", url: e.file
            }
          }
        )
      }
    
  submitAnswer(i) {
    // console.log(i);
    console.log(this.cadetAnsArr[i]);
    console.log(this.cadetAnsArr[i].file);

    this.cadetAnsArr[i].file = this.addassignmentForm.value.file
    console.log(this.cadetAnsArr[i]);

    if (!this.cadetAnsArr[i].answer) {
      this.sharedService.openSnackbar('Please Write Your Answer.')
    } else {
      const dialogRef = this.dialog.open(GcDialogComponent, {
        width: '1000px', height: '600px',
        data: {
          type: 'confirmation',
          title: 'Confirm',
          assignmentData: this.cadetAnsArr[i]
        }
      })

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.spinner.show();
          this.service.submitAssignmentAnswer(this.cadetAnsArr[i]).subscribe(res => {
            if (res.status == "OK") {
              this.spinner.hide();
              this.sharedService.openSnackbar('Your Answer has been submitted successfully.')
              this.getAssignments();
            }
          })
        }
      });
    }

  }









}
