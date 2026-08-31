import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const DELAY_DASHBOARD: Routes = [
    // Guard for Modules
    { path: '', redirectTo: 'training-team/I Term', pathMatch: 'full' },
    { path: 'training-team/:term', loadChildren: () => import('./training-team/training-team.module').then(m => m.TrainingTeamModule) },
    { path: 'training-battalion/:term', loadChildren: () => import('./training-battalion/training-battalion.module').then(m => m.TrainingBattalionModule) },
    { path: 'academic-department/:term', loadChildren: () => import('./academic-department/academic-department.module').then(m => m.AcademicDepartmentModule) },
    { path: 'adjutant-branch/:term', loadChildren: () => import('./adjutant-branch/adjutant-branch.module').then(m => m.AdjutantBranchModule) },
    { path: 'not-found', component:NotFoundComponent}

];