import { Routes, RouterModule } from '@angular/router';

export const SECURITY_ROUTES: Routes = [
    // Guard for Modules
    { path: 'territorial', loadChildren: () => import('./territorial-army/territorial.module').then(m => m.TerritorialArmyModule) },
    { path: 'rp', loadChildren: () => import('./rp-sec/rp-sec.module').then(m => m.RpSecModule) },
    { path: 'demo', loadChildren: () => import('./demo-coy/demo-coy.module').then(m => m.DemoCoyModule) },
    { path: 'dsc', loadChildren: () => import('./dsc/dsc.module').then(m => m.DscModule) },
    { path: 'policies', loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule) },
    { path: 'access-control', loadChildren: () => import('./access-control/access-control.module').then(m => m.AccessControlModule) },
    { path: 'info-security', loadChildren: () => import('./info-security/info-security.module').then(m => m.InfoSecurityModule) },
    { path: 'prophylactic', loadChildren: () => import('./prophylactic-security/prophylactic.module').then(m => m.ProphylacticModule) },
    { path: 'intelligence', loadChildren: () => import('./intelligence/intelligence.module').then(m => m.IntelligenceModule) },
    { path: 'apparatus', loadChildren: () => import('./security-apparatus/apparatus.module').then(m => m.ApparatusModule) },
    
];