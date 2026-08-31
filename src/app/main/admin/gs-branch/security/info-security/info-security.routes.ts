import { Routes, RouterModule } from '@angular/router';

export const INFO_SECURITY_ROUTES: Routes = [
    // Guard for Modules
    { path: 'policies', loadChildren: () => import('./policies-advisories/policies-advisories.module').then(m => m.PoliciesAdvisoriesModule) },
    { path: 'return', loadChildren: () => import('./report-return/report-return.module').then(m => m.ReportReturnModule)},
   
    
];