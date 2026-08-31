
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PocComponent } from './poc.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddPocComponent } from './add-poc/add-poc.component';

const routes = [
    {
        path: '',
        component: PocComponent
    },
    {
        path:'add-poc',
        loadChildren:()=>import('../poc/add-poc/add-poc.module').then(m=>m.AddPocModule)
    },
    {
        path:'view-poc',
        loadChildren:()=>import('../poc/add-poc/add-poc.module').then(m=>m.AddPocModule)
    }
];

@NgModule({
    declarations: [
        PocComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PocModule {
}
