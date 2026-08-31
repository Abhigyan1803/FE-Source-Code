import { Routes, RouterModule } from '@angular/router';

export const PAPER1_ROUTES: Routes = [
    // Guard for Modules
    { path: 'battle-history', loadChildren: () => import('./battle-history/battle-history.module').then(m => m.BattleHistoryModule) },
    { path: 'military-geography', loadChildren: () => import('./military-geography/military-geography.module').then(m => m.MilitaryGeographyModule) },

    { path: '', redirectTo:'dashboard' , pathMatch:'full'},
    { path: '**', redirectTo: 'dashboard'},

];