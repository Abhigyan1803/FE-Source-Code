import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const OQ_DRILL_ROUTES: Routes = [
     { path: 'Mid-Term', loadChildren: () => import('./mid-term/mid-term.module').then(m => m.MidModule) },
     { path: 'Final-Term', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalModule) },
     // { path: 'reception', loadChildren: () => import('./reception-gc/reception-gc.module').then(m => m.ReceptionGcModule) },

     // { path: 'drill-competition/schedule', loadChildren: () => import('./shedule/shedule.module').then(m => m.SheduleModule) },

     // { path: 'drill-competition/drill-Subject', loadChildren: () => import('../drill-competition/drill-comp.module').then(m => m.DrillCompModule) },
     // { path: 'drill-competition/drill-marks', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillMarksModule) },

     // { path: 'drill-competition/khalihath', loadChildren: () => import('./khalihath/khalihath.module').then(m => m.KhalihathModule) }

];