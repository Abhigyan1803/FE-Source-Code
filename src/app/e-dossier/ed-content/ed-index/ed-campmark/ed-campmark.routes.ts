import { Routes, RouterModule } from '@angular/router';

export const EDCAMPMARKS_ROUTES: Routes = [
    // Guard for Modules
    // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
   
     { path: 'campmarks', loadChildren: () => import('./campmarks/campmarks.module').then(m => m.CampmarksModule) },
     { path: 'assessment-matrix', loadChildren: () => import('./assessment-matrix/assessment-matrix.module').then(m => m.AssessmentMatrixModule) },
    // { path: 'counsellors', loadChildren: () => import('./counsellors/counsellors.module').then(m => m.CounsellorsModule) },


];