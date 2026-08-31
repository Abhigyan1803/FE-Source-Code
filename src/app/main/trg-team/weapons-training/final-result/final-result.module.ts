import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinalResultComponent } from '../final-result/final-result.component';
import { MaterialModule } from '../../../../material/material.module';

import {MatTabsModule} from '@angular/material/tabs';

const routes = [
    {
        path: '',
        component: FinalResultComponent
    }
];

@NgModule({
    declarations: [
        FinalResultComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class FinalResultModule {
}
