import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADJUTANT_ROUTES } from './adjutant.routes';
import { AdminDialogModule } from '../admin-dialog/admin-dialog.module';



@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ADJUTANT_ROUTES),
        AdminDialogModule      
    ]
})

export class AdjutantModule { }
