import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralInstructionsComponent } from './general-instructions.component';
import { AddInstructionComponent } from './add-instruction/add-instruction.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: GeneralInstructionsComponent
    },
    {
        path:'add-instruction', component:AddInstructionComponent
    },
    {
        path:'view-instruction', component:AddInstructionComponent
    }
];

@NgModule({
    declarations: [
        GeneralInstructionsComponent,
        AddInstructionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class GeneralInstructionsModule {
}
