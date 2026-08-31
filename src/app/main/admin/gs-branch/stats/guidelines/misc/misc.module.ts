
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from '../../../../../../material/material.module';
import { MiscComponent } from './misc.component';

const routes = [
    {
        path: '',
        component: MiscComponent
    },
    {
        path:'add-misc',
        loadChildren:()=>import('../misc/add-misc/add-misc.module').then(m=>m.AddMiscModule)
    },
    {
        path:'view-misc',
        loadChildren:()=>import('../misc/add-misc/add-misc.module').then(m=>m.AddMiscModule)
    }
];

@NgModule({
    declarations: [
        MiscComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class MiscModule {
}
