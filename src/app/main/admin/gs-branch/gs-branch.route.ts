import { Routes, RouterModule } from '@angular/router';

export const GS_BRANCH: Routes = [
    // Guard for Modules
    { path: 'members', loadChildren: () => import('./members/members.module').then(m => m.MembersModule) },

    { path: 'coord', loadChildren: () => import('./coord/coord.module').then(m => m.CoordModule) },
    { path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule) },
    { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
    { path: 'it', loadChildren: () => import('./it/it.module').then(m => m.ITModule) },
    { path: 'itcommunication', loadChildren: () => import('./it-&-communication/it-&-communication.module').then(m => m.ITCommunicationModule) },

]; 