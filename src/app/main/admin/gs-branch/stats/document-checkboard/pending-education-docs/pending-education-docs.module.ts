
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingEducationDocsComponent } from './pending-education-docs.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddPendingEduComponent } from './add-pending-edu/add-pending-edu.component';

const routes = [
    {
        path: '',
        component: PendingEducationDocsComponent
    },
    {
        path:'add-pending-education',
        loadChildren:()=>import('../pending-education-docs/add-pending-edu/add-pending-edu.module').then(m=>m.AddPendingEduModule)
    },
    {
        path:'view-pending-education',
        loadChildren:()=>import('../pending-education-docs/add-pending-edu/add-pending-edu.module').then(m=>m.AddPendingEduModule)
    }
];

@NgModule({
    declarations: [
        PendingEducationDocsComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PendingEducationDocsModule {
}
