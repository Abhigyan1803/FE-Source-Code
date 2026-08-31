import { Routes, RouterModule } from '@angular/router';

export const CHARTER_ROUTES: Routes = [
    // Guard for Modules
     { path: 'communication-sec', loadChildren: () => import('./communication-sec/communication-sec.module').then(m => m.CommunicationSecModule) },
     { path: 'it-sec', loadChildren: () => import('./it-sec/it-sec.module').then(m => m.ItSecModule) },

   
    
];