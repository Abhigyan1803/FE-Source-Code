import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const DRILL_COMPETITION_ROUTES: Routes = [
     { path: 'drill-marks', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillMarksModule) },
     { path: 'drill-oq', loadChildren: () => import('./oq-drill/oq-drill.module').then(m => m.OqdrillModule) },
     // { path: 'reception', loadChildren: () => import('./reception-gc/reception-gc.module').then(m => m.ReceptionGcModule) },

     // { path: 'drill-competition/schedule', loadChildren: () => import('./shedule/shedule.module').then(m => m.SheduleModule) },

     // { path: 'drill-competition/drill-Subject', loadChildren: () => import('../drill-competition/drill-comp.module').then(m => m.DrillCompModule) },
     // { path: 'drill-competition/drill-marks', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillMarksModule) },

     // { path: 'drill-competition/khalihath', loadChildren: () => import('./khalihath/khalihath.module').then(m => m.KhalihathModule) }

];