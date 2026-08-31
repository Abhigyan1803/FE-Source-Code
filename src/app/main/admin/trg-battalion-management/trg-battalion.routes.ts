import { Routes, RouterModule } from '@angular/router';
// import { ActivityComponent } from './activity/activity.component';
// import { AcademyComponent } from './academy/academy.component';
// import { EventsComponent } from './events/events.component';
// import { MessagesComponent } from './messages/messages.component';
// import { ProgramsComponent } from './programs/programs.component';


export const TRG_BATTALION_ROUTES: Routes = [
    // Guard for Modules
    { path: 'members', loadChildren: () => import('./members/members.module').then(m => m.MembersModule) },
    { path: 'gc-database', loadChildren: () => import('./gc-database/gc-database.module').then(m => m.GCDatabaseModule) },
    { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
    { path: 'gallantry', loadChildren: () => import('./gallantry/gallantry.module').then(m => m.GallantryModule) },
    { path: 'performance', loadChildren: () => import('./performance/performance.module').then(m => m.PerformanceModule) },
    { path: 'bdo', loadChildren: () => import('../../trg-battalion/bdo/bdo/bdo.module').then(m => m.BdoModule) },
    { path: 'bro', loadChildren: () => import('../../trg-battalion/bro/bro/bro.module').then(m => m.BroModule)},
    { path: 'assignment-of-duties', loadChildren: () => import('../../trg-battalion/assignment-of-duties/assignment-of-duties/assignment-of-duties.module').then(m => m.AssignmentOfDutiesModule)},
    { path: 'gc-activities', loadChildren: () => import('./gc-activities/gc-activites.module').then(m => m.GcActivitiesModule)},
    { path: 'location-state', loadChildren: () => import('../../trg-battalion/location-state/location-state.module').then(m => m.LocationStateModule)},
    { path: 'parade-state', loadChildren: () => import('../../trg-battalion/parade-state/parade-state.module').then(m => m.ParadeStateModule)},
    { path: 'oq-subject', loadChildren: () => import('./oq-marks/oq-marks.module').then(m => m.OQMarksModule)},
    { path: 'exercise-type', loadChildren: () => import('./camp-exercise-type/camp-exercise-type.module').then(m => m.CampExerciseTypeModule)},
    { path: 'camp-subject', loadChildren: () => import('./camp-subject/camp-subject.module').then(m => m.CampSubjectModule)},
   
    
    // { path: 'exercise-type', loadChildren: () => import('./exercise-type/exercise-type.module').then(m => m.ExerciseTypeModule)},
    // { path: 'exercise-type', loadChildren: () => import('../trg-battalion-management/exercise-type/exercise-type.module').then(m => m.EXERCISE_TYPEModule) },

    
   ];


