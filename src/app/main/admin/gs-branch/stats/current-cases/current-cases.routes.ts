import { Routes, RouterModule } from '@angular/router';

export const CURRENT_CASES_ROUTES: Routes = [
    // Guard for Modules
    { path: 'court-cases', loadChildren: () => import('./court-cases/court-cases.module').then(m => m.CourtCasesModule) },
    { path: 'relegation', loadChildren: () => import('./relegation/relegation.module').then(m => m.RelegationModule) },
    { path: 'resignation', loadChildren: () => import('./resignation/resignation.module').then(m => m.ResignationModule) },
    { path: 'withdrawal', loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule) },

];