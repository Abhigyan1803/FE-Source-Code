import { Routes, RouterModule } from '@angular/router';


export const DRILL_COMP_ROUTES: Routes = [
    { path: ':type', loadChildren: () => import('./shedule/shedule.module').then(m => m.SheduleModule) },

    // { path: 'result', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
];