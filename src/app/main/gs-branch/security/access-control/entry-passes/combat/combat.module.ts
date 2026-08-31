
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CombatComponent } from './combat.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddCombatComponent } from './add-combat/add-combat.component';

const routes = [
    {
        path: '',
        component: CombatComponent
    },
    {
        path:'add-combat',
        loadChildren:()=>import('../combat/add-combat/add-combat.module').then(m=>m.AddCombatModule)
    },
    {
        path:'view-combat',
        loadChildren:()=>import('../combat/add-combat/add-combat.module').then(m=>m.AddCombatModule)
    }
];

@NgModule({
    declarations: [
        CombatComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CombatModule {
}
