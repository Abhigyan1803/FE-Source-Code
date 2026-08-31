import { Routes, RouterModule } from '@angular/router';

export const PAPER5_ROUTES: Routes = [
    // Guard for Modules
    { path: 'ecs', loadChildren: () => import('./ecs/ecs.module').then(m => m.ECSModule) },
   
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];