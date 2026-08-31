import { Routes, RouterModule } from '@angular/router';

export const STATS_ROUTES: Routes = [
    // Guard for Modules
    { path: 'academy-parade-state', loadChildren: () => import('./academy-parade-state/academy-parade-state.module').then(m => m.AcademyParadeStateModule) },
    { path: 'assessment', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
    { path: 'policy-guidelines', loadChildren: () => import('./guidelines/guidelines.module').then(m => m.GuidelinesModule) },
    { path: 'current-cases', loadChildren: () => import('./current-cases/current-cases.module').then(m => m.CurrentCasesModule) },
    { path: 'guidelines', loadChildren: () => import('./guidelines/guidelines.module').then(m => m.GuidelinesModule) },
    { path: 'document-checkboard', loadChildren: () => import('./document-checkboard/document-checkboard.module').then(m => m.DocumentCheckboardModule) },
    { path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule) },
];