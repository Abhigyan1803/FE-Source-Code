import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OqeqtnComponent } from './oqeqtn/oqeqtn.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: OqeqtnComponent
    },
   
];

@NgModule({
  declarations: [
    OqeqtnComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule
  ]
})
export class OqeqtnModule { }
