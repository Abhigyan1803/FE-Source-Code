import { Routes, RouterModule } from '@angular/router';

export const TH_BN_ROUTES: Routes = [
    // Guard for Modules
 { path: 'counsellors-meiktila', loadChildren: () => import('./counsellors-meiktila/counsellors-meiktila.module').then(m => m.CounsellorsMeiktilaModule) },
 { path: 'counsellors-alamein', loadChildren: () => import('./counsellors-alamein/counsellors-alamein.module').then(m => m.CounsellorsAlameinModule) },
 { path: 'counsellors-dograi', loadChildren: () => import('./counsellors-dograi/counsellors-dograi.module').then(m => m.CounsellorsDograiModule) },
 { path: 'counsellors-chushul', loadChildren: () => import('./counsellors-chushul/counsellors-chushul.module').then(m => m.CounsellorsChushulModule) },

   
    
];