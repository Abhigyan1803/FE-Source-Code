import { Routes, RouterModule } from '@angular/router';

export const OQ_ROUTES: Routes = [
    // Guard for Modules
    { path: 'FINAL TERM', loadChildren: () => import('./oq-final/oq-final.module').then(m => m.OqMarksFinalModule) },
    { path: 'MID TERM', loadChildren: () => import('./oq-mid/oq-mid.module').then(m => m.OqMarksMidModule) },
    
    // { path: 'final-term/:term/:subjectType/:assesmentTermType', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalTermModule) },
    
];