import { Routes, RouterModule } from '@angular/router';

export const GENERAL_ROUTES: Routes = [
    // Guard for Modules
    { path: 'exam', loadChildren: () => import('./exam-cell/exam-cell.module').then(m => m.ExamModule) },
    { path: 'hindi', loadChildren: () => import('./hindi-cell/hindi.module').then(m => m.HindiModule) },
    { path: 'curricular', loadChildren: () => import('./curricular-activities/curricular.module').then(m => m.CurricularModule) },

    
    // { path: 'sops', loadChildren: () => import('./sops/sops.module').then(m => m.SopsModule) },
   
    // { path: 'term-I', loadChildren: () => import('./terms/term-I/term-I.module').then(m => m.Term_I_Module) },
    // { path: 'term-II', loadChildren: () => import('./terms/term-II/term-II.module').then(m => m.Term_II_Module) },
    // { path: 'term-II-tech', loadChildren: () => import('./terms/term-II-tech/term-II-tech.module').then(m => m.Term_II_Tech_Module) },
    // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },

    
];