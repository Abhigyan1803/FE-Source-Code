
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PcListComponent } from './pc-list.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddPclistComponent } from './add-pclist/add-pclist.component';

const routes = [
    {
        path: '',
        component: PcListComponent
    },
    {
        path:'add-pc',
        loadChildren:()=>import('../pc-list/add-pclist/add-pclist.module').then(m=>m.AddPclistModule)
    },
    {
        path:'view-pc',
        loadChildren:()=>import('../pc-list/add-pclist/add-pclist.module').then(m=>m.AddPclistModule)
    }
];

@NgModule({
    declarations: [
        PcListComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PcListModule {
}
