import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalkitComponent } from './personalkit/personalkit.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';


const routes = [
  {
      path: '',
      component: PersonalkitComponent
  },
]
@NgModule({
  declarations: [
    PersonalkitComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonalkitModule { }
