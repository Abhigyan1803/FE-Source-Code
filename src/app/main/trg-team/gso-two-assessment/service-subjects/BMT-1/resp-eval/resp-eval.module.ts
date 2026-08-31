
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespEvalComponent } from './resp-eval.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddEvalComponent } from './add-eval/add-eval.component';

const routes = [
    {
        path: '',
        component: RespEvalComponent
    },
    {
        path:'add-eval',
        loadChildren:()=>import('./add-eval/add-eval.module').then(m=>m.AddEvalModule)
    },
    {
        path:'view-eval',
        loadChildren:()=>import('./add-eval/add-eval.module').then(m=>m.AddEvalModule)
    }
];

@NgModule({
    declarations: [
        RespEvalComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class RespEvalModule {
}
