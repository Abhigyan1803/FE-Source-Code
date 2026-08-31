import { Routes, RouterModule } from '@angular/router';

export const PROPHYLACTIC_SECURITY_ROUTES: Routes = [
    // Guard for Modules
    { path: 'prophylactic-reports', loadChildren: () => import('./prophylactic-reports/prophylactic-reports.module').then(m => m.ProphylacticModule) },
    { path: 'prophylactic-policies', loadChildren: () => import('./prophylactic-policies/prophylactic-policies.module').then(m => m.ProphylacticModule)},
   
    
];