import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramsComponent } from './programs.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: ProgramsComponent
    },

    { path: 'add-program', loadChildren: () => import('./add-program/add-program.module').then(m => m.AddProgramModule) },
    { path: 'view-program', loadChildren: () => import('./add-program/add-program.module').then(m => m.AddProgramModule) },

];

@NgModule({
    declarations: [
        ProgramsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ProgramsModule {
}
