
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounsellorsImphalComponent } from './counsellors-imphal.component';
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
        component: CounsellorsImphalComponent
    },
    {
        path:'add-imphal',
        loadChildren:()=>import('./add-conus-imphal/add-conus-imphal.module').then(m=>m.AddConusImphalModule)
    },
    {
        path:'view-imphal',
        loadChildren:()=>import('./add-conus-imphal/add-conus-imphal.module').then(m=>m.AddConusImphalModule)
        
       
    },
];

@NgModule({
    declarations: [
        CounsellorsImphalComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CounsellorsImphalModule {
}
