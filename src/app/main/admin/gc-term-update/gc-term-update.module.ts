import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GcTermUpdateComponent } from './gc-term-update.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MaterialModule} from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';

const routes = [
    {
        path: '',
        component: GcTermUpdateComponent
    },
    
];

@NgModule({
    declarations: [
        GcTermUpdateComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        NgbModule,
        MatTableModule,
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule
        
    ]
})

export class GcTermUpdateModule {
}
