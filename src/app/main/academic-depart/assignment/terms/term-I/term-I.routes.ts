import { Routes, RouterModule } from '@angular/router';

export const TERM_I_ROUTES: Routes = [
    // Guard for Modules
    { path: 'paper1', loadChildren: () => import('../papers/paper1/paper1.module').then(m => m.Paper1Module) },
    { path: 'paper2', loadChildren: () => import('../papers/paper2/paper2.module').then(m => m.Paper2Module) },
    { path: 'paper3', loadChildren: () => import('../papers/paper3/paper3.module').then(m => m.Paper3Module) },
    { path: 'paper4', loadChildren: () => import('../papers/paper4/paper4.module').then(m => m.Paper4Module) },
    { path: 'paper5', loadChildren: () => import('../papers/paper5/paper5.module').then(m => m.Paper5Module) },
    { path: 'paper6', loadChildren: () => import('../papers/paper6/paper6.module').then(m => m.Paper6Module) },
];
