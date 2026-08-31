import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const ADJUTANT_GENERAL_INSTRUCTION_ROUTES: Routes = [
     { path: 'pop', loadChildren: () => import('./pop/pop.module').then(m => m.PopModule) },
     { path: 'sop', loadChildren: () => import('./sop/sop.module').then(m => m.SopModule) },
     { path: 'reception', loadChildren: () => import('./reception-gc/reception-gc.module').then(m => m.ReceptionGcModule) },
     { path: 'drill-competition/schedule', loadChildren: () => import('./shedule/shedule.module').then(m => m.SheduleModule) },
     { path: 'drill-competition/drill-Subject', loadChildren: () => import('../drill-competition/drill-comp.module').then(m => m.DrillCompModule) },
     { path: 'drill-competition/drill-marks', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillMarksModule) },
     { path: 'drill-comp/:term', loadChildren: () => import('./drill-competition/drill-competition.module').then(m => m.DrillCompetitionModule) }
     
];