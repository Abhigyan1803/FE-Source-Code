import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicDeptService } from 'app/service/academic-dept/academic-dept.service';
import { SharedService } from 'app/service/shared.service';

@Component({
  selector: 'ms-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.scss']
})
export class DeleteSubjectComponent implements OnInit {
  
  addSubjectForm: FormGroup = new FormGroup({});
  topicData:any
  constructor(public dialog: MatDialog,private dialogRef: MatDialogRef<DeleteSubjectComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private service: AcademicDeptService,private fb: FormBuilder, public sharedService: SharedService) {
    console.log(this.data.topic);
    this.topicData=this.data.topic
   }

  ngOnInit(): void {
    this.addSubjectForm = this.fb.group({
       status:['2']
      // termId: [this.termId],
      // paper: [this.paper],
      // subjectName: [this.subject],
      // termTopic: this.fb.array([this.getATopic()]),
      // questionBank: this.fb.array([this.getAQuestionBank()]),
      // previousTermPaper: this.fb.array([this.getAPreviousTermPaper()]),
      
    })
  }
  delete(){
    this.service.updateSubjectById(this.topicData.academicTermId, this.addSubjectForm.value).subscribe(
      res => {
        this.apiRes(res)
      }
    )
  
  }

  cancel(){
    this.dialogRef.close()
  }
  apiRes(res) {
    if (res.status == "OK") {
      // this.spinner.hide();
      this.sharedService.openSnackbar(res.message)
      this.cancel()
    }
  }
 
}
