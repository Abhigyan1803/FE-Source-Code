import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import {ParedComponent} from './pared.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes = [
    {
        path: '',
        component: ParedComponent
    },
    
];

@NgModule({
    declarations: [
        ParedComponent    
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        MatTableModule,
        MatPaginatorModule
       ]
})

export class ParedModule {
}