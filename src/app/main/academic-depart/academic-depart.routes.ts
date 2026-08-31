import { Routes, RouterModule } from '@angular/router';

export const ACADEMIC_DEPARTMENT_ROUTES: Routes = [
    // Guard for Modules
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },

    // { path: 'subjects', loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule) },
    //change subject 
    // { path: 'subjects/:term/:paper/:subject', loadChildren: () => import('./academic-subjects/academic-subjects.module').then(m => m.AcademicSubjectsModule) },
    { path: 'subjects/:paper/:subject/:term', loadChildren: () => import('./academic-subjects/academic-subjects.module').then(m => m.AcademicSubjectsModule) },
    { path: 'assignments/:term/:paper/:assignment', loadChildren: () => import('./academic-assignments/academic-assignments.module').then(m => m.AcademicAssignmentsModule) },

    // { path: 'intellectual/:term/final-term', loadChildren: () => import('./intellectual-skills/intellectual-skills.module').then(m => m.IntellectualSkillsModule) },
    // { path: 'intellectual/:term/mid-term', loadChildren: () => import('./mid-intellectual/mid-intellectual.module').then(m => m.MidIntellectualModule) },
    // { path: 'intellectual', loadChildren: () => import('./intellectual/intellectual.module').then(m => m.INTELLECModule) },

   
    
    
    // { path: 'assignments', loadChildren: () => import('./assignment/assignments.module').then(m => m.AssignmentsModule) },
    { path: 'it', loadChildren: () => import('./complaint-requirement/complaint-requirement.module').then(m => m.ComplaintRequirementModule) },
    { path: 'i-card', loadChildren: () => import('./i-card/i-card.module').then(m => m.IcardModule) },
    { path: 'counsellors', loadChildren: () => import('./counsellors/counsellors.module').then(m => m.CounsellorsModule) },
    // { path: 'sports/:term/:type', loadChildren: () => import('./sports/sports.module').then(m => m.SportsModule) },
    { path: 'examination', loadChildren: () => import('./examination/examination.module').then(m => m.ExamniationModule) },
    { path: 'achievements', loadChildren: () => import('./achievements/achievements.module').then(m => m.AchievementsModule) },
    { path: 'clubs', loadChildren: () => import('./clubs/clubs.module').then(m => m.ClubsModule) },
    { path: 'general', loadChildren: () => import('./General-Instruction/general.module').then(m => m.GeneralModule) },
    { path: 'syllabus/:term/:paper/:subject', loadChildren: () => import('./academic-syllabus/academic-syllabus.module').then(m => m.AcademicSyllabusModule) },

    { path: 'ima-blog', loadChildren: () => import('../admin/home/ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },  

    // { path: 'security', loadChildren: () => import('./gso2security/gso2security.module').then(m => m.Gso2SecurityModule) },
    // { path: 'IT', loadChildren: () => import('./it/it.module').then(m => m.ITModule) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },

];