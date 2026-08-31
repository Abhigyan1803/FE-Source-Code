import { Routes, RouterModule } from '@angular/router';

export const APPARATUS_ROUTES: Routes = [
    // Guard for Modules
    { path: 'acs', loadChildren: () => import('./acs-fp/acs-fp.module').then(m => m.AcsFpModule) },
    { path: 'communication-infra', loadChildren: () => import('./communication-infra/communication-infra.module').then(m => m.CommunicationInfraModule)},
    { path: 'sre', loadChildren: () => import('./sre/sre.module').then(m => m.SreModule) },
    { path: 'other-security', loadChildren: () => import('./other-security/other-security.module').then(m => m.OtherSecurityModule) },

    
];