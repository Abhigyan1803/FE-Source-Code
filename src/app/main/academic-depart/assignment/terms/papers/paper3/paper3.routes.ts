import { Routes, RouterModule } from '@angular/router';

export const PAPER3_ROUTES: Routes = [
    // Guard for Modules
    { path: 'science-and-warfare', loadChildren: () => import('./science-warfare/science-warfare.module').then(m => m.ScienceWarfareModule) },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];