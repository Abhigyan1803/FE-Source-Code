
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawalComponent } from './withdrawal.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddWidthdrawalComponent } from './add-widthdrawal/add-widthdrawal.component';

const routes = [
    {
        path: '',
        component: WithdrawalComponent
    },
    {
        path:'add-withdrawal',
        loadChildren:()=>import('../withdrawal/add-widthdrawal/add-widthdrawal.module').then(m=>m.AddWidthdrawalModule)
    },
    {
        path:'view-withdrawal',
        loadChildren:()=>import('../withdrawal/add-widthdrawal/add-widthdrawal.module').then(m=>m.AddWidthdrawalModule)
    }

];

@NgModule({
    declarations: [
        WithdrawalComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class WithdrawalModule {
}
