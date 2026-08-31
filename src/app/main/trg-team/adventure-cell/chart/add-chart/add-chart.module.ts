import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddChartComponent } from './add-chart.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes = [
    {
        path: '',
        component: AddChartComponent
    }
];

@NgModule({
    declarations: [
        AddChartComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatPaginatorModule

    ]
})

export class  AddChartModule {
}
