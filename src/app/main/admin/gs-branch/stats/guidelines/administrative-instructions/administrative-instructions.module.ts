
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrativeInstructionsComponent } from './administrative-instructions.component';
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
        component: AdministrativeInstructionsComponent
    },
    {
        path:'add-administrative',
        loadChildren:()=>import('../administrative-instructions/add-administrative/add-administrative.module').then(m=>m.AddAdministrativeModule)
    },
    {
        path:'view-administrative',
        loadChildren:()=>import('../administrative-instructions/add-administrative/add-administrative.module').then(m=>m.AddAdministrativeModule)
    }
];

@NgModule({
    declarations: [AdministrativeInstructionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AdministrativeInstructionsModule {
}
