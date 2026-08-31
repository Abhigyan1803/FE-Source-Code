
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralInstructionComponent } from './general-instruction.component';

// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: GeneralInstructionComponent
    },
    {
        path:'add-instruction',
        loadChildren:()=>import('./add-instruction/add-instruction.module').then(m=>m.AddInstructionModule)
    },
    {
        path:'view-instruction',
        loadChildren:()=>import('./add-instruction/add-instruction.module').then(m=>m.AddInstructionModule)
    }
];

@NgModule({
    declarations: [
        GeneralInstructionComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class GeneralInstructionModule {
}
