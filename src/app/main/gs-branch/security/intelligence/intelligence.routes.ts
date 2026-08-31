import { Routes, RouterModule } from '@angular/router';

export const INTELLIGENCE_ROUTES: Routes = [
    // Guard for Modules
    { path: 'intelligence-policies', loadChildren: () => import('./intelligence-policies/intelligence-policies.module').then(m => m.IntelligencePoliciesModule) },
    { path: 'intelligence-reports', loadChildren: () => import('./intelligence-reports/intelligence-reports.module').then(m => m.IntelligenceReportsModule)},
   
    
];