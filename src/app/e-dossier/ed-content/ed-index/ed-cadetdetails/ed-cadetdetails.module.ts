import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EDCADETDETAILS_ROUTES } from './ed-cadetdetails.routes';
import { AutobioComponent } from './autobio/autobio.component';



@NgModule({
  declarations: [


  
    
  
    
  
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(EDCADETDETAILS_ROUTES),

  ]
})

export class EDCadetdetailsModule { }
