import { Routes, RouterModule } from '@angular/router';

export const DOCUMENT_CHECKBOARD_ROUTES: Routes = [
    // Guard for Modules
    { path: 'aviation-list', loadChildren: () => import('./aviation-list/aviation-list.module').then(m => m.AviationListModule) },
    { path: '61-cav-list', loadChildren: () => import('./cav-list/cav-list.module').then(m => m.CavListModule) },
    { path: 'para-list', loadChildren: () => import('./para-list/para-list.module').then(m => m.ParaListModule)},
    { path: 'pc-list', loadChildren: () => import('./pc-list/pc-list.module').then(m => m.PcListModule) },
    { path: 'pending-confirmation', loadChildren: () => import('./pending-confirmation/pending-confirmation.module').then(m => m.PendingConfirmationModule)},
    { path: 'pending-cvr-cases', loadChildren: () => import('./pending-cvr-cases/pending-cvr-cases.module').then(m => m.PendingCvrCasesModule) },
    { path: 'pending-education-docs', loadChildren: () => import('./pending-education-docs/pending-education-docs.module').then(m => m.PendingEducationDocsModule) },

];