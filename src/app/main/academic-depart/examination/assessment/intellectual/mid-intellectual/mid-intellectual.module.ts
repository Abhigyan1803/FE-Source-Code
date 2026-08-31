
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MidIntellectualComponent } from './mid-intellectual.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: MidIntellectualComponent
    },
    {
        path:'add-mid-intellectual',
        loadChildren:()=>import('./add-mid-intellectual/add-mid-intellectual.module').then(m=>m.AddMidIntellectualModule)
    },
    {
        path:'view-mid-intellectual',
        loadChildren:()=>import('./add-mid-intellectual/add-mid-intellectual.module').then(m=>m.AddMidIntellectualModule)


    }
];

@NgModule({
    declarations: [
        MidIntellectualComponent,
      
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class MidIntellectualModule {
}
