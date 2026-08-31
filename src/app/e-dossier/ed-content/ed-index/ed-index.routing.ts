import { Routes, RouterModule } from '@angular/router';

export const ED_INDEX_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    // { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    // { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
 { path: 'ED-Campmarks', loadChildren: () => import('./ed-campmark/ed-campmark.module').then(m => m.EDCampMarksModule) },
 { path: 'OverallAssessment', loadChildren: () => import('./Overall-Assessment/overall.module').then(m => m.OVERALLModule) },
   
 { path: 'ED-Cadetdetails', loadChildren: () => import('./ed-cadetdetails/ed-cadetdetails.module').then(m => m.EDCadetdetailsModule) },
 { path: 'Otherdetails', loadChildren: () => import('./Otherdetails/Otherdetails.module').then(m => m.OtherdetailsModule) },
 { path: 'Obsnsheet', loadChildren: () => import('./Obsn-sheet/Obsn-sheet.module').then(m => m.ObsnsheetModule) },
 
//  { path: 'Counselling', loadChildren: () => import('./Counselling/Counselling.module').then(m => m.CounsellingModule) },
 { path: 'Interviews', loadChildren: () => import('./interviews/interviews.module').then(m => m.InterviewsModule) },
 { path: 'ed-Counselling', loadChildren: () => import('./ed-counselling/ed-counselling.module').then(m => m.EdCounsellingModule) },
 
];
