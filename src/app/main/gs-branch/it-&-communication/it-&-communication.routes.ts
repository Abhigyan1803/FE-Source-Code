import { Routes, RouterModule } from '@angular/router';

export const ITCOMM_ROUTES: Routes = [
    // Guard for Modules
    { path: 'charter', loadChildren: () => import('./charter/charter.module').then(m => m.CharterModule) },
    { path: 'itppp', loadChildren: () => import('./itppp/itppp.module').then(m => m.ItpppModule) },
    // { path: 'complaints-requirements', loadChildren: () => import('../it/it.module').then(m => m.ITModule) },
    { path: 'complaints-requirements', loadChildren: () => import('../it/complaints-n-requirements/cnr.module').then(m => m.CNRModule) },

];