
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelegationComponent } from './relegation.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddRelegationComponent } from './add-relegation/add-relegation.component';

const routes = [
    {
        path: '',
        component: RelegationComponent
    },
    {
        path:'add-relegation',
        loadChildren:()=>import('../relegation/add-relegation/add-relegation.module').then(m=>m.AddRelegationModule)
    },
    {
        path:'view-relegation',
        loadChildren:()=>import('../relegation/add-relegation/add-relegation.module').then(m=>m.AddRelegationModule)
    }

   
];

@NgModule({
    declarations: [
        RelegationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class RelegationModule {
}
