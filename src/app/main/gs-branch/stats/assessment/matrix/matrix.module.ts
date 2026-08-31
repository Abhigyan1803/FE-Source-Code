import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrixComponent } from './matrix.component';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddMatrixComponent } from './add-matrix/add-matrix.component';

const routes = [
    {
        path: '',
        component: MatrixComponent
    },
    {
        path:'add-matrix',
        loadChildren:()=>import('../matrix/add-matrix/add-matrix.module').then(m=>m.AddMatrixModule)
    },
    {
        path:'view-matrix',
        loadChildren:()=>import('../matrix/add-matrix/add-matrix.module').then(m=>m.AddMatrixModule)
    }
];

@NgModule({
    declarations: [
        MatrixComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class MatrixModule {
}
