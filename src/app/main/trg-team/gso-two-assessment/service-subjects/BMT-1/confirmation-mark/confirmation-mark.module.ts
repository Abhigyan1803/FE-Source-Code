
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationMarkComponent } from './confirmation-mark.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddMarkComponent } from './add-mark/add-mark.component';

const routes = [
    {
        path: '',
        component: ConfirmationMarkComponent
    },
    {
        path:'add-mark',
        loadChildren:()=>import('./add-mark/add-mark.module').then(m=>m.AddMarkModule)
    },
    {
        path:'view-mark',
        loadChildren:()=>import('../confirmation-mark/add-mark/add-mark.module').then(m=>m.AddMarkModule)
    }
];

@NgModule({
    declarations: [
        ConfirmationMarkComponent,
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ConfirmationMarkModule {
}
