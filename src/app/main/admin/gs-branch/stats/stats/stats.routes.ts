import { Routes, RouterModule } from '@angular/router';

export const STATS_ROUTES: Routes = [
    // Guard for Modules
    { path: 'intake', loadChildren: () => import('./intake/intake.module').then(m => m.IntakeModule) },
    { path: 'poc', loadChildren: () => import('./poc/poc.module').then(m => m.PocModule) },
    // { path: 'assessment-schedule', loadChildren: () => import('./assessment-schedule/assessment-schedule.module').then(m => m.AssessmentScheduleModule) },
];