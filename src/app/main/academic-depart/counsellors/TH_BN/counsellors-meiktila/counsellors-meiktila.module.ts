
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounsellorsMeiktilaComponent } from './counsellors-meiktila.component';
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
        component: CounsellorsMeiktilaComponent
    },
    {
        path:'add-meiktila',
        loadChildren:()=>import('./add-couns-meiktila/add-counus-meiktila.module').then(m=>m.AddConusMeiktilaModule)
    },
    {
        path:'view-meiktila',
        loadChildren:()=>import('./add-couns-meiktila/add-counus-meiktila.module').then(m=>m.AddConusMeiktilaModule)
    },
];

@NgModule({
    declarations: [
        CounsellorsMeiktilaComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CounsellorsMeiktilaModule {
}
