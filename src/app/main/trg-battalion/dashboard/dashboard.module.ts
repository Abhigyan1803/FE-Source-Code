import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

      import {MatCardModule} from '@angular/material/card';
      import {MatButtonModule} from '@angular/material/button';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'app/material/material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';


const routes = [
    {
        path: '',
        component: DashboardComponent
    }
    ,
    {
        path:'add-card',
        loadChildren:()=>import('../dashboard/dashboard-edit/dashboard-edit.module').then(m=>m.DashboardEditModule)
    },
    {
        path:'view-card',
        loadChildren:()=>import('../dashboard/dashboard-edit/dashboard-edit.module').then(m=>m.DashboardEditModule)
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, SlickCarouselModule
    ]
})

export class DashboardModule {
}
