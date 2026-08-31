import { Routes, RouterModule } from '@angular/router';

export const BMT1_ASSESSMENT_ROUTES: Routes = [
    // Guard for Modules
    { path: 'final-term', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalTermModule) },
    { path: 'mid-term', loadChildren: () => import('./mid-term/mid-term.module').then(m => m.MidTermModule) },
    
    // { path: 'final-term/:term/:subjectType/:assesmentTermType', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalTermModule) },
    
];