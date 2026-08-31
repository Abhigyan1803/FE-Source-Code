import { Routes, RouterModule } from '@angular/router';

export const INTERVIEWS_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    // { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    // { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
 { path: 'interview-sheet', loadChildren: () => import('./interview-sheet/interview-sheet.module').then(m => m.InterviewSheetModule) },
 { path: 'initial-interview', loadChildren: () => import('./initial-interview/initial-interview.module').then(m => m.InitialInterviewModule) },
 { path: 'begining-interview', loadChildren: () => import('./begining-interview/begining-interview.module').then(m => m.BeginingInterviewModule) },
 { path: 'mid-interview', loadChildren: () => import('./mid-interview/mid-interview.module').then(m => m.MidInterviewModule) },
 { path: 'special-interview', loadChildren: () => import('./special-interview/special-interview.module').then(m => m.SpecialInterviewModule) },
 { path: 'instructions-interviews', loadChildren: () => import('./instructions-interviews/instructions-interviews.module').then(m => m.InstructionsInterviewsModule)},
 
];
