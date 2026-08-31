import { Routes, RouterModule } from '@angular/router';

export const BH_BN_ROUTES: Routes = [
    // Guard for Modules
  { path: 'counsellors-cassino', loadChildren: () => import('./counsellors-cassino/counsellors-cassino.module').then(m => m.CounsellorsCasinoModule) },
  { path: 'counsellors-keren', loadChildren: () => import('./counsellors-keren/counsellors-keren.module').then(m => m.CounsellorsKerenModule) },
  { path: 'counsellors-singarh', loadChildren: () => import('./counsellors-singarh/counsellors-singarh.module').then(m => m.CounsellorsSingarhModule) },
  { path: 'counsellors-basantar', loadChildren: () => import('./counsellors-basantar/counsellors-basantar.module').then(m => m.CounsellorsBasantarModule) },
    
];