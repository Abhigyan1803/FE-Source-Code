import { Routes, RouterModule } from '@angular/router';

export const OBSN_SHEET_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    // { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    // { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
 { path: 'obsn', loadChildren: () => import('./obsn/obsn.module').then(m => m.ObsnModule) },
 
];
