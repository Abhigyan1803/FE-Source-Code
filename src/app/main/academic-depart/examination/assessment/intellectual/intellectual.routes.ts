import { Routes, RouterModule } from '@angular/router';

export const INTELLEC_ROUTES: Routes = [
    // Guard for Modules
    { path: 'Final-Term', loadChildren: () => import('./intellectual-skills/intellectual-skills.module').then(m => m.IntellectualSkillsModule) },
    { path: 'Mid-Term', loadChildren: () => import('./mid-intellectual/mid-intellectual.module').then(m => m.MidIntellectualModule) },
    
    // { path: 'final-term/:term/:subjectType/:assesmentTermType', loadChildren: () => import('./final-term/final-term.module').then(m => m.FinalTermModule) },
    
];