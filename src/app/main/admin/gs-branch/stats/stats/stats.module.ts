import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STATS_ROUTES } from './stats.routes';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(STATS_ROUTES),
    ]
})

export class StatsModule { }