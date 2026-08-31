import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExamParamComponent } from './add-exam-param.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MaterialModule} from 'app/material/material.module';
import { AddParameterComponent } from './add-parameter/add-parameter.component';

const routes = [
    {
        path: '',
        component: AddExamParamComponent
    },
    {
        path:'add-param',
        loadChildren:()=>import('../add-exam-param/add-parameter/add-parameter.module').then(m=>m.AddParameterModule)
    },
];

@NgModule({
    declarations: [
        AddExamParamComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
        
    ]
})

export class AddExamParamModule {
}
