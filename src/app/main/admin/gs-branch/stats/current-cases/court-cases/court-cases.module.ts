
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourtCasesComponent } from './court-cases.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddCourtCasesComponent } from './add-court-cases/add-court-cases.component';

const routes = [
    {
        path: '',
        component: CourtCasesComponent
    },
    {
        path:'add-court-cases',
        loadChildren:()=>import('../court-cases/add-court-cases/add-court-cases.module').then(m=>m.AddCourtCasesModule)
    },
    {
        path:'view-court-cases',
        loadChildren:()=>import('../court-cases/add-court-cases/add-court-cases.module').then(m=>m.AddCourtCasesModule)
    }

];

@NgModule({
    declarations: [
        CourtCasesComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CourtCasesModule {
}
