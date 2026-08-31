
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteMarchComponent } from './route-march.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: RouteMarchComponent
    },
     {
        path:'add-route-march',
        loadChildren:()=>import('./add-route-march/add-route-march.module').then(m=>m.AddRouteMarchModule)
    },
    {
        path:'view-route-march',
        loadChildren:()=>import('./add-route-march/add-route-march.module').then(m=>m.AddRouteMarchModule)
   
    }
  
];

@NgModule({
    declarations: [
        RouteMarchComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})
export class RouteMarchModule {
}
