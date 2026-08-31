import { Routes, RouterModule } from '@angular/router';

export const ED_OVERALL_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    // { path: '',redirectTo:"Ed-dashboard",pathMatch:"full" },
    // { path: 'Ed-dashboard', loadChildren: () => import('./ed-dashboard/ed-dashboard.module').then(m => m.EdDashboardModule) },
 { path: 'LeadershipMatrix', loadChildren: () => import('./ed-leadership/ed-leadership.module').then(m => m.EdLeadershipModule) },
 { path: 'PT', loadChildren: () => import('./pt/ed-pt.module').then(m => m.EdPtModule) },
 { path: 'drill', loadChildren: () => import('./drill/drill.module').then(m => m.DrillModule) },  
 { path: 'WT', loadChildren: () => import('./wt/wt.module').then(m => m.WtModule) },
 { path: 'eqtn', loadChildren: () => import('./eqnt/eqnt.module').then(m => m.EqntModule) },
 {path: 'service-subjects', loadChildren: () => import('./service-subject/service-subject.module').then(m => m.ServiceSubjectModule)},
 {path: 'intellectual', loadChildren: () => import('./Interactual/Interactual.module').then(m => m.InteractualModule) },
 {path: 'sports', loadChildren: () => import('./Sportgame/Sportgame.module').then(m => m.SportgameModule) },
 {path: 'assessment-oq', loadChildren: () => import('./assessment-oq/assessment-oq.module').then(m => m.AssessmentOQModule) },
 {path: 'assessment-gc', loadChildren: () => import('./gc-assessment/gc-assessment.module').then(m => m.GcAssessmentModule) },
  
];
