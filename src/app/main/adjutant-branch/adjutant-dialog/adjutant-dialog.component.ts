import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface DialogData{
  type?: string;
  title?:string;
  details?:any;
  message?: any;
  url?:any
}

@Component({
  selector: 'ms-adjutant-dialog',
  templateUrl: './adjutant-dialog.component.html',
  styleUrls: ['./adjutant-dialog.component.scss']
})

export class AdjutantDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<AdjutantDialogComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
