
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bmt2Component } from './bmt2.component';
import {MaterialModule} from 'app/material/material.module';
import { AddBmt2Component } from './add-bmt2/add-bmt2.component';

const routes = [
  {
      path: '',
      component: Bmt2Component
  },
  {
      path:'add-bmt2',
      loadChildren:()=>import('./add-bmt2/add-bmt2.module').then(m=>m.AddBmt2Module)
  },
  {
      path:'view-bmt2',
      loadChildren:()=>import('./add-bmt2/add-bmt2.module').then(m=>m.AddBmt2Module)
  }
];

@NgModule({
  declarations: [
    Bmt2Component,
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule
   

  ]
})

export class BMT2Module { }
