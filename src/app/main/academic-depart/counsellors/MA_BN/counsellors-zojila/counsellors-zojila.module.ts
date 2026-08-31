
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounsellorsZojilaComponent } from './counsellors-zojila.component';
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
        component: CounsellorsZojilaComponent
    },
    {
        path:'add-zojila',
        loadChildren:()=>import('./add-couns-zojila/add-conus-zojila.module').then(m=>m.AddConusZojilaModule)
    },
    {
        path:'view-zojila',
        loadChildren:()=>import('./add-couns-zojila/add-conus-zojila.module').then(m=>m.AddConusZojilaModule)
       
    },
];

@NgModule({
    declarations: [
        CounsellorsZojilaComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CounsellorsZojilaModule {
}
