
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StandingTrgDirectivesComponent } from './standing-trg-directives.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddStandingComponent } from './add-standing/add-standing.component';

const routes = [
    {
        path: '',
        component: StandingTrgDirectivesComponent
    },
    {
        path:'add-standing',
        loadChildren:()=>import('./add-standing/add-standing.module').then(m=>m.AddStandingModule)
    },
    {
        path:'view-standing',
        loadChildren:()=>import('./add-standing/add-standing.module').then(m=>m.AddStandingModule)
    }
];

@NgModule({
    declarations: [
        StandingTrgDirectivesComponent,
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class StandingTrgDirectivesModule {
}
