
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
import { CampSubjectComponent} from './camp-subject.component';

const routes = [
    {
        path: '',
        component: CampSubjectComponent
    },
    {
        path:'add-camp-subject',
        loadChildren:()=>import('../camp-subject/add-camp-subject/add-camp-subject.module').then(m=>m.AddCampSubjectModule)
    },
    {
        path:'view-camp-subject',
        loadChildren:()=>import('../camp-subject/add-camp-subject/add-camp-subject.module').then(m=>m.AddCampSubjectModule)
    }
];

@NgModule({
    declarations: [
        CampSubjectComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CampSubjectModule {
}
