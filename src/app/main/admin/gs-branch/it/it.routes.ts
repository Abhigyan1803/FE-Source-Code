import { Routes, RouterModule } from '@angular/router';

export const IT_ROUTES: Routes = [
    // Guard for Modules
    { path: 'complaints', loadChildren: () => import('./complaints/complaints.module').then(m => m.ComplaintsModule) },
    // { path: 'complaints-requirements', loadChildren: () => import('./complaints-n-requirements/cnr.module').then(m => m.CNRModule) },

];