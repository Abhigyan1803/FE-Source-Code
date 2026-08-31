import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  type?: string;
  title?:string;
  message?: any;
  assignmentData?:any;
}

@Component({
  selector: 'ms-gc-dialog',
  templateUrl: './gc-dialog.component.html',
  styleUrls: ['./gc-dialog.component.scss']
})
export class GcDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit(): void {
    // console.log(this.data);
  }


}
