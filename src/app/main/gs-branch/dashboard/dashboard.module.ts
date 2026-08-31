import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: DashboardComponent
    }
];

@NgModule({
    
    declarations: [
        DashboardComponent
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule
    ]
})

export class DashboardModule {
}
