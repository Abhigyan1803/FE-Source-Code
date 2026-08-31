import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from '../result/result.component';
import { MaterialModule } from '../../../../material/material.module';

import {MatTabsModule} from '@angular/material/tabs';

const routes = [
    {
        path: '',
        component: ResultComponent
    }
];

@NgModule({
    declarations: [
        ResultComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ResultModule {
}
