import { Routes, RouterModule } from '@angular/router';

export const CA_BN_ROUTES: Routes = [
    // Guard for Modules
 { path: 'counsellors-kohima', loadChildren: () => import('./counsellors-kohima/counsellors-kohima.module').then(m => m.CounsellorsKohimaModule) },
 { path: 'counsellors-naushera', loadChildren: () => import('./counsellors-naushera/counsellors-naushera.module').then(m => m.CounsellorsNausheraModule) },
 { path: 'counsellors-poonach', loadChildren: () => import('./counsellors-poonach/counsellors-poonach.module').then(m => m.CounsellorsPoonachModule) },
 { path: 'counsellors-hajipir', loadChildren: () => import('./counsellors-hajipir/counsellors-hajipir.module').then(m => m.CounsellorsHajipirModule) },
    
];