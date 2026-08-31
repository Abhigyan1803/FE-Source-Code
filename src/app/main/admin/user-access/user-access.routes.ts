import { Routes, RouterModule } from '@angular/router';


export const USER_ACCESS_ROUTES: Routes = [
    { path: 'manage-role', loadChildren: () => import('./manage-role/manage-role.module').then(m => m.ManageRoleModule) },
    { path: 'manage-staff', loadChildren: () => import('./manage-staff/manage-staff.module').then(m => m.ManageStaffModule) },
    { path: 'manage-admin', loadChildren: () => import('./manage-admin/manage-admin.module').then(m => m.ManageAdminModule) },

];
