import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcademyParadeStateComponent } from './academy-parade-state.component';
import { MaterialModule } from 'app/material/material.module';
import { AddAcademyParadeComponent } from './add-academy-parade/add-academy-parade.component';


const routes = [
    {
        path: '',
        component: AcademyParadeStateComponent
    },
    {
        path:'add-academy-parade',
        loadChildren:()=>import('../academy-parade-state/add-academy-parade/add-academy-parade.module').then(m=>m.AddAcademyParadeModule)
    },
    {
        path:'view-academy-parade',
        loadChildren:()=>import('../academy-parade-state/add-academy-parade/add-academy-parade.module').then(m=>m.AddAcademyParadeModule)
    }
];

@NgModule({
    declarations: [
        AcademyParadeStateComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AcademyParadeStateModule {
}
