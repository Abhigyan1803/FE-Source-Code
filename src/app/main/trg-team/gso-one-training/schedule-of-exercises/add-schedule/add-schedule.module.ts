import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddScheduleComponent } from './add-schedule.component';

const routes = [
    {
        path: '',
        component: AddScheduleComponent
    },
    // {  path: 'add-schedule', loadChildren: () => import('./add-schedule/').then(m => m.AddSOPModule) },
    // {  path: 'view-sop', loadChildren: () => import('./add-sop/add-sop.module').then(m => m.AddSOPModule) }
];

@NgModule({
    declarations: [
        AddScheduleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule, MatSlideToggleModule,MatIconModule
         ]
})

export class AddScheduleModule {
}
