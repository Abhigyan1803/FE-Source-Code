import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeaponsComponent } from './weapons.component';
import { MaterialModule } from '../../../material/material.module';



const routes = [
    {
        path: '',
        component: WeaponsComponent
    }
];

@NgModule({
    declarations: [
        WeaponsComponent,
    ],
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class WeaponsModule {
}
