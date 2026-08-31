import { Routes, RouterModule } from '@angular/router';

export const ASSESSMENT_ROUTES: Routes = [
    // Guard for Modules
    { path: 'leadership-development-matrix', loadChildren: () => import('./leadership-development-matrix/leadership-development-matrix.module').then(m => m.LDMatrixModule) },
    { path: 'oq-matrix', loadChildren: () => import('./oq-matrix-both/oq-matrix.module').then(m => m.OQModule) },
    { path: 'Credit-for-Excellence', loadChildren: () => import('./credit-exellence/credit-exellence.module').then(m => m.CreditExellenceModule) },
    { path: 'intellectual', loadChildren: () => import('./intellectual/intellectual.module').then(m => m.INTELLECModule) },
    
    
];