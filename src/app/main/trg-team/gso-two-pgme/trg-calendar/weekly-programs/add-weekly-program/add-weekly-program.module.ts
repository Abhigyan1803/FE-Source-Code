import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { AddWeeklyProgramComponent } from './add-weekly-program.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
    {
        path: '',
        component: AddWeeklyProgramComponent
    }
];

@NgModule({
    declarations: [
        AddWeeklyProgramComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        FormsModule, ReactiveFormsModule,
        MaterialModule, NgbModule
     ]
})

export class AddWeeklyProgramModule {
}
