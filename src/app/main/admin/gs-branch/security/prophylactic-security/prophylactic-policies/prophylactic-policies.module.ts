
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProphylacticPoliciesComponent } from './prophylactic-policies.component';
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
        component: ProphylacticPoliciesComponent
    },
    {
        path:'add-prophylactic-policies',
        loadChildren:()=>import('../prophylactic-policies/add-prophylactic-policies/add-prophylactic-policies.module').then(m=>m.AddProphylacticPoliciesModule)
    },
    {
        path:'view-prophylactic-policies',
        loadChildren:()=>import('../prophylactic-policies/add-prophylactic-policies/add-prophylactic-policies.module').then(m=>m.AddProphylacticPoliciesModule)
    }
];

@NgModule({
    declarations: [
        ProphylacticPoliciesComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  ProphylacticModule {
}
