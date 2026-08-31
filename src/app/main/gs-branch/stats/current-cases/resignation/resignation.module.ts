
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResignationComponent } from './resignation.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddResignationComponent } from './add-resignation/add-resignation.component';

const routes = [
    {
        path: '',
        component: ResignationComponent
    },
    {
        path:'add-resignation',
        loadChildren:()=>import('../resignation/add-resignation/add-resignation.module').then(m=>m.AddResignationModule)
    },
    {
        path:'view-resignation',
        loadChildren:()=>import('../resignation/add-resignation/add-resignation.module').then(m=>m.AddResignationModule)
    }
];

@NgModule({
    declarations: [
        ResignationComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ResignationModule {
}
