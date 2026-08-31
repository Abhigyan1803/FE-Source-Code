import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonTermsComponent } from './season-terms.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: SeasonTermsComponent
    },
    {
        path: 'add-season-term', loadChildren: () => import('./add-season-terms/add-season-terms.module').then(m => m.AddSeasonTermsModule),
    },
    {
        path: 'view-season-term', loadChildren: () => import('./add-season-terms/add-season-terms.module').then(m => m.AddSeasonTermsModule)
    }
];

@NgModule({
    declarations: [
        SeasonTermsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
        ]
})

export class SeasonTermsModule {
}
