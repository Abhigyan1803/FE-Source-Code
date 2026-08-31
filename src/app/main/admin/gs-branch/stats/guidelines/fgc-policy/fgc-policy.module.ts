
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FgcPolicyComponent } from './fgc-policy.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddFcgComponent } from './add-fcg/add-fcg.component';

const routes = [
    {
        path: '',
        component: FgcPolicyComponent
    },
    {
        path:'add-Fgc',
        loadChildren:()=>import('../fgc-policy/add-fcg/add-fcg.module').then(m=>m.AddFcgModule)
    },
    {
        path:'view-Fgc',
        loadChildren:()=>import('../fgc-policy/add-fcg/add-fcg.module').then(m=>m.AddFcgModule)
    }
];

@NgModule({
    declarations: [
        FgcPolicyComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class FgcPolicyModule {
}
