import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatesheetComponent } from './datesheet.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DatesheetComponent
    },
    {
        path: 'add-datesheet',
        loadChildren:()=>import('./add-datesheet/add-datesheet.module').then(m=>m.AddDatesheetModule)
    },
    {
        path: 'view-datesheet',
        loadChildren:()=>import('./add-datesheet/add-datesheet.module').then(m=>m.AddDatesheetModule)
    }
];

@NgModule({
    declarations: [
        DatesheetComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule
     ]
})

export class DatesheetModule {
}
