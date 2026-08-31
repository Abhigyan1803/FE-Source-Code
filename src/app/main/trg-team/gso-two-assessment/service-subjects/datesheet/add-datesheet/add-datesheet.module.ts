import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddDatesheetComponent } from './add-datesheet.component';

const routes = [
    {
        path: '',
        component: AddDatesheetComponent
    }
];

@NgModule({
    declarations: [
        AddDatesheetComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MatCardModule,MatButtonModule,MatPaginatorModule, MatIconModule, MatSlideToggleModule
     ]
})

export class AddDatesheetModule {
}
