import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const GSOOneTrgRoutes: Routes = [
    {  path: 'sop', loadChildren: () => import('./sop/sop.module').then(m => m.SOPModule) },
    {  path: 'schedule-of-exercises', loadChildren: () => import('./schedule-of-exercises/schedule-of-exercises.module').then(m => m.ScheduleOfExercisesModule) },
    {  path: 'schedule-of-central-lec', loadChildren: () => import('./schedule-of-central-lec/schedule-of-central-lec.module').then(m => m.ScheduleOfCentralLecModule) },
    
    
];