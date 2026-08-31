
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from '../../../../material/material.module';
import { OQMarksComponent } from './oq-marks.component';

const routes = [
    {
        path: '',
        component: OQMarksComponent
    },
    {
        path:'add-subject',
        loadChildren:()=>import('../oq-marks/add-subject/add-subject.module').then(m=>m.AddSubjectModule)
    },
    {
        path:'view-subject',
        loadChildren:()=>import('../oq-marks/add-subject/add-subject.module').then(m=>m.AddSubjectModule)
    }
];

@NgModule({
    declarations: [
        OQMarksComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class OQMarksModule {
}
