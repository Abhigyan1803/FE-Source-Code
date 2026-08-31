import { Routes, RouterModule } from '@angular/router';

export const PAPER6_ROUTES: Routes = [

    // Guard for Modules
    { path: 'it', loadChildren: () => import('./it/it.module').then(m => m.ITModule) },
   
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];