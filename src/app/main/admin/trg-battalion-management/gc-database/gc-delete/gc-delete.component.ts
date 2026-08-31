import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {  MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'ms-gc-delete',
  templateUrl: './gc-delete.component.html',
  styleUrls: ['./gc-delete.component.scss']
})
export class GcDeleteComponent implements OnInit {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor( @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<GcDeleteComponent>) { 
    if(data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
        }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  
  ngOnInit(): void {
  }

}
