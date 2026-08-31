import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeaponsTrainingComponent } from '../weapons-training/weapons-training.component';
import { MaterialModule } from '../../../../material/material.module';

import {MatTabsModule} from '@angular/material/tabs';

const routes = [
    {
        path: '',
        component: WeaponsTrainingComponent
    }
];

@NgModule({
    declarations: [
        WeaponsTrainingComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class WeaponsTrainingModule {
}
