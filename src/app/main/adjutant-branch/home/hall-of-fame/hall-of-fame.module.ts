import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HALL_OF_FAME_ROUTES } from './hall-of-fame.routes';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HALL_OF_FAME_ROUTES),
        //  DialogModule
    ]
})

export class HallOfFameModule { }
