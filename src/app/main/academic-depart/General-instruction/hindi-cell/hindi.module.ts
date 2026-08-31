import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HindiCellComponent } from './hindi-cell.component';
import { MaterialModule } from 'app/material/material.module';
import { AddHindiComponent } from './add-hindi/add-hindi.component';



const routes = [
    {
        path: '',
        component: HindiCellComponent
    },
    {
        path:'add-hindi',
        loadChildren:()=>import('./add-hindi/add-hindi.module').then(m=>m.AddHindiModule)
    },
    {
        path:'view-hindi',
        loadChildren:()=>import('./add-hindi/add-hindi.module').then(m=>m.AddHindiModule)
    }
];

@NgModule({
    declarations: [
        HindiCellComponent,
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class HindiModule {
}
