import { Routes, RouterModule } from '@angular/router';

export const COUNSELLORS_ROUTES: Routes = [
    // Guard for Modules
     { path: 'cabn', loadChildren: () => import('./ca_bn/ca_bn.module').then(m => m.CabnModule) },
     { path: 'thbn', loadChildren: () => import('./th_bn/th_bn.module').then(m => m.ThbnModule) },
     { path: 'mabn', loadChildren: () => import('./ma_bn/ma_bn.module').then(m => m.MabnModule) },
     { path: 'bhbn', loadChildren: () => import('./bh_bn/bh_bn.module').then(m => m.BhbnModule) },
    
];