
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespOfInvigilationComponent } from './resp-of-invigilation.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddRespOfInvigilationComponent } from './add-resp-of-invigilation/add-resp-of-invigilation.component';

const routes = [
    {
        path: '',
        component: RespOfInvigilationComponent
    },
    {
        path:'add-invigilation',
        loadChildren:()=>import('./add-resp-of-invigilation/add-resp-of-invigilation.module').then(m=>m.AddInvigilationModule)
    },
    {
        path:'view-invigilation',
        loadChildren:()=>import('./add-resp-of-invigilation/add-resp-of-invigilation.module').then(m=>m.AddInvigilationModule)
    }
];

@NgModule({
    declarations: [
        RespOfInvigilationComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class RespInvigilationModule {
}
