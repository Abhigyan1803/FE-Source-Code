import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DELAY_DASHBOARD } from './delay-dashboard.route';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from 'app/material/material.module';

@NgModule({
  declarations: [

  
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DELAY_DASHBOARD),
    MaterialModule

  ]
})
export class DelayDashboardModule { }

/**
 * module id: 1 for trg team
 * module id: 2 for trg battalion
 * module id: 4 for academic department
 * module id: 12 for adjutant branch
 */