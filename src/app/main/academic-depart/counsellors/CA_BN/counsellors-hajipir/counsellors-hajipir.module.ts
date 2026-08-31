
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounsellorsHajipirComponent } from './counsellors-hajipir.component';
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
        component: CounsellorsHajipirComponent
    },
    {
        path:'add-hajipir',
        loadChildren:()=>import('./add-couns-hajipir/add-couns-hajipir.module').then(m=>m.AddConusHajipirModule)
    },
    {
        path:'view-hajipir',
        loadChildren:()=>import('./add-couns-hajipir/add-couns-hajipir.module').then(m=>m.AddConusHajipirModule)
       
    },
];

@NgModule({
    declarations: [
        CounsellorsHajipirComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CounsellorsHajipirModule {
}
