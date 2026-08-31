import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITCOMM_ROUTES } from './it-&-communication.routes';
import { AddItpppComponent } from './itppp/add-itppp/add-itppp.component';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(ITCOMM_ROUTES),
    ]
})

export class ITCommunicationModule { }