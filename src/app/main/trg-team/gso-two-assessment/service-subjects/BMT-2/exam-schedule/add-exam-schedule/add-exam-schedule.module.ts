import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddExamScheduleComponent  } from './add-exam-schedule.component';
import {MaterialModule} from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: AddExamScheduleComponent
    }
];

@NgModule({
    declarations: [
        AddExamScheduleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class AddExamScheduleModule {
}

