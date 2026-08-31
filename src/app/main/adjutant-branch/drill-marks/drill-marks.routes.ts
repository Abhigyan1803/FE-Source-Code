import { Routes, RouterModule } from '@angular/router';

export const DRILL_MARKS_ROUTES: Routes = [
    { path: 'drill-marks', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillMarksModule) },
    { path: 'drill-oq', loadChildren: () => import('./oq-drill/oq-drill.module').then(m => m.OqdrillModule) },
];
