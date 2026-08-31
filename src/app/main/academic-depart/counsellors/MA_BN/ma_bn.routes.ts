import { Routes, RouterModule } from '@angular/router';

export const MA_BN_ROUTES: Routes = [
    // Guard for Modules
  { path: 'counsellors-zojila', loadChildren: () => import('./counsellors-zojila/counsellors-zojila.module').then(m => m.CounsellorsZojilaModule) },
  { path: 'counsellors-imphal', loadChildren: () => import('./counsellors-imphal/counsellors-imphal.module').then(m => m.CounsellorsImphalModule) },
  { path: 'counsellors-jessore', loadChildren: () => import('./counsellors-jessore/counsellors-jessore.module').then(m => m.CounsellorsJessoreModule) },
  { path: 'counsellors-sangro', loadChildren: () => import('./counsellors-sangro/counsellors-sangro.module').then(m => m.CounsellorsSangroModule) },
    
];