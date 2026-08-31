
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PcabCoaComponent } from './pcab-coa.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddPcabComponent } from './add-pcab/add-pcab.component';

const routes = [
    {
        path: '',
        component: PcabCoaComponent
    },
    {
        path:'add-pcab-coa',
        loadChildren:()=>import('../pcab-coa/add-pcab/add-pcab.module').then(m=>m.AddPCABModule)
    },
    {
        path:'view-pcab-coa',
        loadChildren:()=>import('../pcab-coa/add-pcab/add-pcab.module').then(m=>m.AddPCABModule)
    }
];

@NgModule({
    declarations: [
        PcabCoaComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PcabCoaModule {
}
