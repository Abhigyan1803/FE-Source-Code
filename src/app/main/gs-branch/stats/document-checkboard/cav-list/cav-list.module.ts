
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CavListComponent } from './cav-list.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddCavlistComponent } from './add-cavlist/add-cavlist.component';

const routes = [
    {
        path: '',
        component: CavListComponent
    },
    {
        path:'add-CavList',
        loadChildren:()=>import('../cav-list/add-cavlist/add-cavlist.module').then(m=>m.AddCavlistModule)
    },
    {
        path:'view-CavList',
        loadChildren:()=>import('../cav-list/add-cavlist/add-cavlist.module').then(m=>m.AddCavlistModule)
    }
];

@NgModule({
    declarations: [
        CavListComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CavListModule {
}
