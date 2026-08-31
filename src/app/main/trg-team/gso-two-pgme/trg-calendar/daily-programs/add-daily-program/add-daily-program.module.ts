import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDailyProgramComponent } from './add-daily-program.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes = [
    {
        path: '',
        component: AddDailyProgramComponent
    },
    
];

@NgModule({
    declarations: [
        AddDailyProgramComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
         MatCardModule,MatButtonModule, MatIconModule
     ]
})

export class AddDailyProgramModule {
}
