import { Routes, RouterModule } from '@angular/router';

export const EDCADETDETAILS_ROUTES: Routes = [
    // Guard for Modules
    // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
   
    //  { path: 'campmarks', loadChildren: () => import('./campmarks/campmarks.module').then(m => m.CampmarksModule) },
    //  { path: 'assessment-matrix', loadChildren: () => import('./assessment-matrix/assessment-matrix.module').then(m => m.AssessmentMatrixModule) },
    // // { path: 'counsellors', loadChildren: () => import('./counsellors/counsellors.module').then(m => m.CounsellorsModule) },
    { path: 'autobiography', loadChildren: () => import('./autobio/autobio.module').then(m => m.AutobioModule) },
    { path: 'ssbreport', loadChildren: () => import('./ssbreport/ssbreport.module').then(m => m.SsbReportModule) },
    { path: 'persnol', loadChildren: () => import('./persnol/persnol.module').then(m => m.PersnolModule) },
    

];