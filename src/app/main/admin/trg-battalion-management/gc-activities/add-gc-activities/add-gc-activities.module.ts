import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

      import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { AddGcActivitiesComponent } from './add-gc-activities.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';

const routes = [
    {
        path: '',
        component: AddGcActivitiesComponent
    }
];

@NgModule({
    declarations: [
        AddGcActivitiesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        
        MatCardModule, MatButtonModule, MatIconModule
    ]
})

export class AddHistoryModule {
}
