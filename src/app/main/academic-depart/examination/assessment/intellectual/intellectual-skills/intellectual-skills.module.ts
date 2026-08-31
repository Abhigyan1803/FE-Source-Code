
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntellectualSkillsComponent } from './intellectual-skills.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: IntellectualSkillsComponent
    },
    {
        path:'add-intellectual',
        loadChildren:()=>import('./add-intellectual-skills/add-intellectual-skills.module').then(m=>m.AddIntellectualSkillsModule)
    },
    {
        path:'view-intellectual',
        loadChildren:()=>import('./add-intellectual-skills/add-intellectual-skills.module').then(m=>m.AddIntellectualSkillsModule)

    }
];

@NgModule({
    declarations: [
        IntellectualSkillsComponent,
      
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class IntellectualSkillsModule {
}
