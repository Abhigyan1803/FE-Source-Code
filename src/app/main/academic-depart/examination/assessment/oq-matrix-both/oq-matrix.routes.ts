import { Routes, RouterModule } from '@angular/router';

export const OQ_ROUTES: Routes = [
    // Guard for Modules
    { path: 'Final-Term', loadChildren: () => import('./oq-final/oq-final.module').then(m => m.OQFinalModule) },
    { path: 'Mid-Term', loadChildren: () => import('./oq-matrix/oq-matrix.module').then(m => m.OQMatrixModule) },
    
    // { path: 'final-term/:term/:subjectType/:assesmentTermType', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalTermModule) },
    
];