import { Routes, RouterModule } from '@angular/router';
import { ImaBlogComponent } from 'app/pages/ima-blog/ima-blog.component';
import { ReadBlogComponent } from 'app/pages/read-blog/read-blog.component';

import { AcSubjectsComponent } from './ac-subjects/ac-subjects.component'
import { AchievementsComponent } from './ac-subjects/achievements/achievements.component';
import { AllSubjectsComponent } from './ac-subjects/all-subjects/all-subjects.component';
import { AssignmentsComponent } from './ac-subjects/assignments/assignments.component';
import { DistributionOfMarksComponent } from './ac-subjects/distribution-of-marks/distribution-of-marks.component';


export const GC_ROUTES: Routes = [
    // Guard for Modules
    
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'Interviews/:type', loadChildren: () => import('./interview-gc/interviewgc.module').then(m => m.InterviewGcModule) },
    { path: 'entitlements/:type', loadChildren: () => import('./entitlements/entitlements.module').then(m => m.EntitlementsModule) },
    { path: 'club/:type', loadChildren: () => import('./club/club.module').then(m => m.ClubModule) },
    { path: 'exam-shedule', loadChildren: () => import('./exam-shedule/exam-shedule.module').then(m => m.ExamsheduleModule) },
    { path: 'academic-exam-shedule', loadChildren: () => import('./academic-exam-schedule/academic-exam-shedule.module').then(m => m.AcademicExamsheduleModule) },

    { path: 'ima-blog', component: ImaBlogComponent },
    { path: 'read-blog', component: ReadBlogComponent },
    { path: 'syllabus', loadChildren: () => import('./syllabus/syllabus.module').then(m => m.SyllabusModule) },
    { path: 'subjects', loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule) },
    {
        path: 'ac-subjects', component: AcSubjectsComponent,
        children: [
            { path: 'subjects', loadChildren: () => import('./ac-subjects/all-subjects/all-subjects.module').then(m => m.AllSubjectsModule) },
            { path: 'assignments', loadChildren: () => import('./ac-subjects/assignments/assignments.module').then(m => m.AssignmentsModule) },
            { path: 'distribution-of-marks', loadChildren: () => import('./ac-subjects/distribution-of-marks/distribution-of-marks.module').then(m => m.DistributionOfMarksModule) },
            { path: 'achievements', loadChildren: () => import('./ac-subjects/achievements/achievements.module').then(m => m.AchievementsModule) },
            { path: '', redirectTo: 'subjects', pathMatch: 'full' }
        ]

    },
    // { path: 'academic/:term/:paper',loadChildren: () => import('./academic-subject/academic-subject.module').then(m => m.AcademicSubjectModule) },
    { path: 'academic-syllabus', loadChildren: () => import('./academic-syllabus/academic-syllabus.module').then(m => m.AcademicSyllabusModule) },
    { path: 'punishments', loadChildren: () => import('./punishments/punishments.module').then(m => m.PunishmentsModule) },
    { path: 'adjutant-orders', loadChildren: () => import('./adjutant-orders/adjutant-orders.module').then(m => m.AdjutantOrdersModule) },
];
