import { Routes, RouterModule } from '@angular/router';

export const PAPER2_ROUTES: Routes = [
    // Guard for Modules
    { path: 'bs', loadChildren: () => import('./bs/bs.module').then(m => m.BSModule) },
    { path: 'cair', loadChildren: () => import('./cair/cair.module').then(m => m.CairModule) },
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];