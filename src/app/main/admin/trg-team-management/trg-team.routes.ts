import { Routes, RouterModule } from '@angular/router';
import { Routings } from 'app/Shared/constant';
// import { ActivityComponent } from './activity/activity.component';
// import { AcademyComponent } from './academy/academy.component';
// import { EventsComponent } from './events/events.component';
// import { MessagesComponent } from './messages/messages.component';
// import { ProgramsComponent } from './programs/programs.component';


export const TRG_TEAM_ROUTES: Routes = [
    // Guard for Modules
   
    { path: 'members', loadChildren: () => import('./members/members.module').then(m => m.MembersModule) },
    { path:Routings.weaponsListPath, loadChildren: () => import('app/main/trg-team/weapons/weapons.module').then(m => m.WeaponsModule)  },
    { path:Routings.addWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },
    { path:Routings.editWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },  
    // {  path: 'sop', loadChildren: () => import('../../trg-team/gso-one-training/sop/sop.module').then(m => m.SOPModule) },
    // {  path: 'schedule-of-exercises', loadChildren: () => import('../../trg-team/gso-one-training/schedule-of-exercises/schedule-of-exercises.module').then(m => m.ScheduleOfExercisesModule) },
    { path: 'gso-1-training', loadChildren: () => import('../../trg-team/gso-one-training/gso-one-trg.module').then(m => m.GSOOneModule) },   
    { path: 'gso-2-training', loadChildren: () => import('../../trg-team/gso-two-training/gso-two-training.module').then(m => m.GsoTwoTrainingModule) },  
    { path: 'adventure-cell', loadChildren: () => import('../../trg-team/adventure-cell/adventure-cell.module').then(m => m.AdventureCellModule) },
    { path: 'pt', loadChildren: () => import('../../trg-team/pt/pt.module').then(m => m.PtModule) },
    { path: 'eqtn', loadChildren: () => import('../../trg-team/dashboard/dashboard.module').then(m => m.DashBoardModule) },
    { path: 'gso-2-pgme', loadChildren: () => import('../../trg-team/gso-two-pgme/gso2pgme.module').then(m => m.GSOTwoPGMEModule) },  
    { path: 'gso-2-assessment', loadChildren: () => import('../../trg-team/gso-two-assessment/gso-two-assessment.module').then(m => m.GSOTwoAssessmentModule) },  
    { path: 'add-exam-param', loadChildren: () => import('../../trg-team/add-exam-param/add-exam-param.module').then(m => m.AddExamParamModule) },  

];


