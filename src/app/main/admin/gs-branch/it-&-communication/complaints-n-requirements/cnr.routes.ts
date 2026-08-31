import { Routes, RouterModule } from '@angular/router';

export const CNR_ROUTES: Routes = [
    // Guard for Modules
    { path: 'it', loadChildren: () => import('./it-complaints/it-complaints.module').then(m => m.ItComplaintsModule) },
    { path: 'communication', loadChildren: () => import('./communication-complaints/communication-complaints.module').then(m => m.CommunicationComplaintsModule) },
];