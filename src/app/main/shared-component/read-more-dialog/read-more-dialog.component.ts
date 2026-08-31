import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  type?: string;
  title?: string;
  details?: any;
  message?: any;
  url?: any;
  id?: any;
  remark?: any;
  object?: any;
  lenghths?: any;
}
@Component({
  selector: 'ms-read-more-dialog',
  templateUrl: './read-more-dialog.component.html',
  styleUrls: ['./read-more-dialog.component.scss']
})
export class ReadMoreDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}