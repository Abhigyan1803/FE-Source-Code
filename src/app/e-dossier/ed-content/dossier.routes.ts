import { Routes, RouterModule } from '@angular/router';

export const Dossier_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
    { path: 'Ed-menu', loadChildren: () => import('./ed-menu/ed-menu.module').then(m => m.EdMenuModule) },
    { path: 'Ed-index', loadChildren: () => import('./ed-index/ed-index.module').then(m => m.EDINDEXModule) },
    
];
