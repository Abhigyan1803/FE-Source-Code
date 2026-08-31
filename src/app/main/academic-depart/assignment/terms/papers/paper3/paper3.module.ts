import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAPER3_ROUTES } from './paper3.routes';
import { ScienceWarfareComponent } from './science-warfare/science-warfare.component';


@NgModule({
    declarations: [  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PAPER3_ROUTES),
        
    ]
})

export class Paper3Module { }
