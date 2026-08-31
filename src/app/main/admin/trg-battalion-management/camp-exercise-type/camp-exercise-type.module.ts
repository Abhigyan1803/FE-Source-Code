
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

import { CampExerciseTypeComponent } from './camp-exercise-type.component';

const routes = [
    {
        path: '',
        component: CampExerciseTypeComponent
    },
    {
        path:'add-exercise-type',
        loadChildren:()=>import('../camp-exercise-type/add-camp-exercise/add-camp-exercise.module').then(m=>m.AddCampExerciseComponentModule)
    },
    {
        path:'view-exercise-type',
        loadChildren:()=>import('../camp-exercise-type/add-camp-exercise/add-camp-exercise.module').then(m=>m.AddCampExerciseComponentModule)
    }
];

@NgModule({
    declarations: [
        CampExerciseTypeComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CampExerciseTypeModule {
}
