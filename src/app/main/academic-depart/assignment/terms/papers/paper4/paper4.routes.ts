import { Routes, RouterModule } from '@angular/router';

export const PAPER4_ROUTES: Routes = [
    // Guard for Modules
    { path: 'swt', loadChildren: () => import('./swt/swt.module').then(m => m.SWTModule) },
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];