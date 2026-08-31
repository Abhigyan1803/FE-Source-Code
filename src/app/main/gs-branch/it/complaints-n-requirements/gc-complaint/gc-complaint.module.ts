import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcComplaintComponent } from './gc-complaint/gc-complaint.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes=[
  {path:'', component:GcComplaintComponent}
]

@NgModule({
  declarations: [
    GcComplaintComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class GcComplaintModule { }
