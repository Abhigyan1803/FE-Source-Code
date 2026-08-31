import { Routes, RouterModule } from '@angular/router';

export const CURRICULAR_ROUTES: Routes = [
    // Guard for Modules
    { path: 'cyber', loadChildren: () => import('./cyber/cyber.module').then(m => m.CyberModule) },
    { path: 'english', loadChildren: () => import('./english-deb/english-deb.module').then(m => m.EnglishDebModule) },
    { path: 'hindi', loadChildren: () => import('./hindi-deb/hindi-deb.module').then(m => m.HindiDebModule) },
    { path: 'ppt', loadChildren: () => import('./ppt/ppt.module').then(m => m.PptModule) },
    { path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) },

    // { path: 'sops', loadChildren: () => import('./sops/sops.module').then(m => m.SopsModule) },
   
    // { path: 'term-I', loadChildren: () => import('./terms/term-I/term-I.module').then(m => m.Term_I_Module) },
    // { path: 'term-II', loadChildren: () => import('./terms/term-II/term-II.module').then(m => m.Term_II_Module) },
    // { path: 'term-II-tech', loadChildren: () => import('./terms/term-II-tech/term-II-tech.module').then(m => m.Term_II_Tech_Module) },
    // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },

    
];