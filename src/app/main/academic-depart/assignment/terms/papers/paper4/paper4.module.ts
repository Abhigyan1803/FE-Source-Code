import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAPER4_ROUTES } from './paper4.routes';
import { SwtComponent } from './swt/swt.component';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PAPER4_ROUTES),
        
    ]
})

export class Paper4Module { }
