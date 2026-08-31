import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/Shared/dialog/dialog.component';
@Component({
  selector: 'ms-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
		document.getElementById('foot-id').style.position='relative';

  }

  openDoc(e){

    this.dialog.open(DialogComponent,
      {
        width: '1300px', height: '650px',
        data: {
          type: 'document',title:"Document", url: 'assets/img/org.pdf'
        }
      }
      )
    }

}
