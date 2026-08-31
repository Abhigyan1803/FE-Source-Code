import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InitialInterviewComponent } from './initial-interview.component';

const routes = [
    {
        path: '',
        component:InitialInterviewComponent  
    },
];

@NgModule({
    declarations: [
        InitialInterviewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule,
        MatTableModule, // <-- Added Table Module
        MatPaginatorModule
        
    ]
})

export class InitialInterviewModule {
}
