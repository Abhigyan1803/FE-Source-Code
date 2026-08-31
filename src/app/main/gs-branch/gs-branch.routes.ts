import { Routes, RouterModule } from '@angular/router';

export const GS_BRANCH: Routes = [
    // Guard for Modules
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'coord', loadChildren: () => import('./coord/coord.module').then(m => m.CoordModule) },
    { path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule) },
    { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
    { path: 'it', loadChildren: () => import('../admin/gs-branch/it/it.module').then(m => m.ITModule) },
    { path: 'itcommunication', loadChildren: () => import('./it-&-communication/it-&-communication.module').then(m => m.ITCommunicationModule) },
    { path: 'i-card', loadChildren: () => import('./i-card/i-card.module').then(m => m.IcardModule) },
    { path: 'ima-blog', loadChildren: () => import('../admin/home/ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },  
    { path: 'home', loadChildren: () => import('../admin/home/home.module').then(m => m.HomeModule) },  

    
];