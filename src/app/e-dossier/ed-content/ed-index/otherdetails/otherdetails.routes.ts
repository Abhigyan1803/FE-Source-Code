import { Routes, RouterModule } from '@angular/router';

export const OTHERDETAILS_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    // { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    // { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
 { path: 'club', loadChildren: () => import('./club/club.module').then(m => m.ClubModule) },
 { path: 'hike', loadChildren: () => import('./hike/hike.module').then(m => m.HikeModule) },
 { path: 'lve', loadChildren: () => import('./lve/lve.module').then(m => m.LveModule) },
  
];
