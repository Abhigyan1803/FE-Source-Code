import { Routes, RouterModule } from '@angular/router';

export const BMT2_ROUTES: Routes = [
    // Guard for Modules
    // { path: 'confirmation-mark', loadChildren: () => import('./confirmation-mark/confirmation-mark.module').then(m => m.ConfirmationMarkModule) },
    // { path: 'general-instruction', loadChildren: () => import('./general-instruction/general-instruction.module').then(m => m.GeneralInstructionModule) },
    // { path: 'resp-eval', loadChildren: () => import('./resp-eval/resp-eval.module').then(m => m.RespEvalModule) },
    // { path: 'retest', loadChildren: () => import('./retest/retest.module').then(m => m.RetestModule) },
    
    { path: 'bmt2assessment', loadChildren: () => import('./bmt2-assessment/bmt2-assessment.module').then(m => m.BMT2ASSESSMENTModule) },
    
    { path: ':subType', loadChildren: () => import('./exam-schedule/exam-schedule.module').then(m => m.ExamScheduleModule) },
    
    
];