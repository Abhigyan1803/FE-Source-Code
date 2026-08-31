
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasualStaffComponent } from './casual-staff.component';
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
        component: CasualStaffComponent
    },
    {
        path:'add-casual',
        loadChildren:()=>import('../casual-staff/add-casual-staff/add-casual-staff.module').then(m=>m.AddCasualStaffModule)
    },
    {
        path:'view-casual',
        loadChildren:()=>import('../casual-staff/add-casual-staff/add-casual-staff.module').then(m=>m.AddCasualStaffModule)
    }
];

@NgModule({
    declarations: [
        CasualStaffComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CasualStaffModule {
}
