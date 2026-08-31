import { Routes, RouterModule } from '@angular/router';

export const ASSESSMENT_ROUTES: Routes = [
  
    { path: 'matrix', loadChildren: () => import('./matrix/matrix.module').then(m => m.MatrixModule) },
    { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  
];