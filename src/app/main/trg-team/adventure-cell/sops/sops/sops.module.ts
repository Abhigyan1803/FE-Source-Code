import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SopsComponent } from './sops.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: SopsComponent
    }
];

@NgModule({
    declarations: [
        SopsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule]
})

export class SopsModule {
}
