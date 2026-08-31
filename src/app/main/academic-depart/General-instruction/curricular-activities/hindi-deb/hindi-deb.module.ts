import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HindiDebComponent } from './hindi-deb.component';
import { MaterialModule } from 'app/material/material.module';
import { AddHindiDebComponent } from './add-hindi-deb/add-hindi-deb.component';

const routes = [
    {
        path: '',
        component: HindiDebComponent
    },
    {
        path:'add-hindideb',
        loadChildren:()=>import('./add-hindi-deb/add-hindi-deb.module').then(m=>m.AddHindiModule)
    },
    {
        path:'view-hindideb',
        loadChildren:()=>import('./add-hindi-deb/add-hindi-deb.module').then(m=>m.AddHindiModule)
    }
];

@NgModule({
    declarations: [
        HindiDebComponent,
                
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class HindiDebModule {
}
