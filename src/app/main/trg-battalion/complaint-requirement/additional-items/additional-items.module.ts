import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalComponent } from './additional/additional.component';
import { MaterialModule } from 'app/material/material.module';
import { RouterModule } from '@angular/router';


const routes = [
  {
      path: '',
      component: AdditionalComponent
  },
]

@NgModule({
  declarations: [
    AdditionalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AdditionalItemsModule { }
