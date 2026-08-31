import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddWeaponsComponent } from '../add-weapons/add-weapons.component';
import { MaterialModule } from '../../../../material/material.module';

const routes = [
    {
        path: '',
        component: AddWeaponsComponent
    }
];

@NgModule({
    declarations: [
        AddWeaponsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class AddWeaponsModule {
}
