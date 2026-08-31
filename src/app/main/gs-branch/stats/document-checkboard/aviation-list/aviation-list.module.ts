
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AviationListComponent } from './aviation-list.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddAviationComponent } from './add-aviation/add-aviation.component';

const routes = [
    {
        path: '',
        component: AviationListComponent
    },
    {
        path:'add-aviation',
        loadChildren:()=>import('../aviation-list/add-aviation/add-aviation.module').then(m=>m.AddAviationModule)
    },
    {
        path:'view-aviation',
        loadChildren:()=>import('../aviation-list/add-aviation/add-aviation.module').then(m=>m.AddAviationModule)
    }
];

@NgModule({
    declarations: [
        AviationListComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AviationListModule {
}
