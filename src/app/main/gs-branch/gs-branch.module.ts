import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GS_BRANCH } from './gs-branch.routes';
import { ICardComponent } from './i-card/i-card.component';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(GS_BRANCH),
        
    ]
})

export class GS_BranchModule { }
