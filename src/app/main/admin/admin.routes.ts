import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Routings } from 'app/Shared/constant';




export const ADMIN_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'trg-team', loadChildren: () => import('./trg-team-management/trg-team.module').then(m => m.TrgTeamModule) },
    { path: 'trg-battalion', loadChildren: () => import('./trg-battalion-management/trg-battalion.module').then(m => m.TrgBattalionModule) },
    { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) },
    { path: 'Adjutant-Branch-Management', loadChildren: () => import('./adjutant-branch-management/adjutant.module').then(m => m.AdjutantModule) },
    { path: 'it', loadChildren: () => import('./complaint-requirement/complaint-requirement.module').then(m => m.ComplaintRequirementModule) },
    { path: 'record', loadChildren: () => import('./service-record/service-record.module').then(m => m.ServiceRecordModule) },
    { path: 'GS-Branch', loadChildren: () => import('./gs-branch/gs-branch.module').then(m => m.GS_BranchModule) },
    { path: 'user-access', loadChildren: () => import('./user-access/user-access.module').then(m => m.UserAccessModule) },
    { path: 'gc-term', loadChildren: () => import('./gc-term-update/gc-term-update.module').then(m => m.GcTermUpdateModule) },

    
];


