
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoliciesAdvisoriesComponent } from './policies-advisories.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: PoliciesAdvisoriesComponent
    },
    {
        path:'add-policies',
        loadChildren:()=>import('../policies-advisories/add-policies/add-policies.module').then(m=>m.AddPoliciesModule)
    },
    {
        path:'view-policies',
        loadChildren:()=>import('../policies-advisories/add-policies/add-policies.module').then(m=>m.AddPoliciesModule)
    }
];

@NgModule({
    declarations: [
        PoliciesAdvisoriesComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  PoliciesAdvisoriesModule {
}
