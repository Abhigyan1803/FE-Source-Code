
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParaListComponent } from './para-list.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddParaComponent } from './add-para/add-para.component';

const routes = [
    {
        path: '',
        component: ParaListComponent
    },
    {
        path:'add-ParaList',
        loadChildren:()=>import('../para-list/add-para/add-para.module').then(m=>m.AddParaModule)
    },
    {
        path:'view-ParaList',
        loadChildren:()=>import('../para-list/add-para/add-para.module').then(m=>m.AddParaModule)
    }
];

@NgModule({
    declarations: [
        ParaListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ParaListModule {
}
