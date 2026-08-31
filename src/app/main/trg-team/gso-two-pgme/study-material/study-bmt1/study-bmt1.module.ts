
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudyBMT1Component } from './study-bmt1.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddStudyBmt1Component } from './add-study-bmt1/add-study-bmt1.component';


const routes = [
    {
        path: '',
        component: StudyBMT1Component
    },
    {
        path:'add-study-material',
        loadChildren:()=>import('./add-study-bmt1/add-study-bmt1.module').then(m=>m.AddStudyBmt1Module)
    },
    {
        path:'view-study-material',
        loadChildren:()=>import('./add-study-bmt1/add-study-bmt1.module').then(m=>m.AddStudyBmt1Module)
    }
];

@NgModule({
    declarations: [
        StudyBMT1Component,
        
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class StudyBMT1Module {
}
