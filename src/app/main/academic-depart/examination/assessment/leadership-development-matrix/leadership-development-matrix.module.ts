import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LDMatrixComponent } from './leadership-development-matrix.component';
import { MaterialModule } from '../../../../../material/material.module';

const routes = [
    {
        path: '',
        component: LDMatrixComponent
    },
    {
        path: 'add-leadership-development-matrix',
        loadChildren: () => import('../leadership-development-matrix/add-leadership-development-matrix/add-leadership-development-matrix.module').then(m => m.AddLDMatrixModule)
    },
    {
        path: 'view-leadership-development-matrix',
        loadChildren: () => import('../leadership-development-matrix/add-leadership-development-matrix/add-leadership-development-matrix.module').then(m => m.AddLDMatrixModule)
    }

];

@NgModule({
    declarations: [
        LDMatrixComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class LDMatrixModule {
}
