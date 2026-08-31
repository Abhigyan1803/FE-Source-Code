import { Routes, RouterModule } from '@angular/router';

export const STUDY_ROUTES: Routes = [
    // Guard for Modules
    { path: 'BMT-1', loadChildren: () => import('./study-bmt1/study-bmt1.module').then(m => m.StudyBMT1Module) },
    { path: 'BMT-2/:type', loadChildren: () => import('./bmt2/Bmt2.module').then(m => m.BMT2Module) },
    { path: 'material/:type', loadChildren: () => import('./study-bmt1/study-bmt1.module').then(m => m.StudyBMT1Module) }
];