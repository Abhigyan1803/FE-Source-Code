import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GUIDELINES_ROUTES } from './guidelines.routes';
import { MiscComponent } from './misc/misc.component';
import { AddMiscComponent } from './misc/add-misc/add-misc.component';


@NgModule({
    declarations: [ 
  
    
  
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(GUIDELINES_ROUTES),
    ]
})

export class GuidelinesModule { }