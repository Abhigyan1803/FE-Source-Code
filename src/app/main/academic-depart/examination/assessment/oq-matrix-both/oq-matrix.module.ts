import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OQ_ROUTES } from './oq-matrix.routes';
import { OqFinalComponent } from './oq-final/oq-final.component';



@NgModule({
  declarations: [
  
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(OQ_ROUTES),

  ]
})

export class OQModule { }
