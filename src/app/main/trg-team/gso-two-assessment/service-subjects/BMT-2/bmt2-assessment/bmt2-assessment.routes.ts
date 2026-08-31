import { Routes, RouterModule } from '@angular/router';

export const BMT2_ASSESSMENT_ROUTES: Routes = [
    // Guard for Modules
    { path: 'bmt2final', loadChildren: () => import('./bmt2final/bmt2final.module').then(m => m.Bmt2finalModule) },
    // { path: 'mid-term', loadChildren: () => import('./mid-term/mid-term.module').then(m => m.MidTermModule) },
    
    
];