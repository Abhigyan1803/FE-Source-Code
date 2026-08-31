import { Routes, RouterModule } from '@angular/router';

export const EXAMINATION_ROUTES: Routes = [
    // Guard for Modules
    { path: 'pcht', loadChildren: () => import('./pcht/pcht.module').then(m => m.PchtModule) },
    { path: 'goi', loadChildren: () => import('./goi/goi.module').then(m => m.GoiModule) },
    { path: 'Distribution-of-Marks/:type', loadChildren: () => import('./distribution-marks/distribution-marks.module').then(m => m.DistributionMarksModule) },
    { path: 'Exam-schedule/:type', loadChildren: () => import('./exam-schedule/exam-schedule.module').then(m => m.ExamScheduleModule) },
    // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },
    { path: 'Assessment/:term', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
];