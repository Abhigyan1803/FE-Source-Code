import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnglishDebComponent } from './english-deb.component';
import { MaterialModule } from 'app/material/material.module';
import { AddEnglishDebComponent } from './add-english-deb/add-english-deb.component';

const routes = [
    {
        path: '',
        component: EnglishDebComponent
    },
    {
        path:'add-english',
        loadChildren:()=>import('./add-english-deb/add-english.module').then(m=>m.AddEnglishModule)
    },
    {
        path:'view-english',
        loadChildren:()=>import('./add-english-deb/add-english.module').then(m=>m.AddEnglishModule)
    }
];

@NgModule({
    declarations: [
        EnglishDebComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class EnglishDebModule {
}
