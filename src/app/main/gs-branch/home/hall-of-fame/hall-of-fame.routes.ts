import { Routes, RouterModule } from '@angular/router';


export const HALL_OF_FAME_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    { path: 'gallantry-awardees', loadChildren: () => import('./gallantry-awards/gallantry-awards.module').then(m => m.GallantryAwardsModule) },
    // { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
    // { path: 'special-occasions', loadChildren: () => import('./special-occasions/special-occasions.module').then(m => m.SpecialOccasionsModule) },

    // { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)  },
    // { path: 'programes', loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule)},
    // { path: 'central-library-management', loadChildren: () => import('./central-library-management/central-library-management.module').then(m => m.CentralLibraryManagementModule)},
    // { path: 'greybook', loadChildren: () => import('./greybook/greybook.module').then(m => m.GreybookModule)},
    // { path: 'cyber-policy', loadChildren: () => import('./cyber-policy/cyber-policy.module').then(m => m.CentralLibraryModule)},
    // { path: 'book-list', loadChildren: () => import('./recommened-book/recommened-book.module').then(m => m.RecommenedBookModule)},
    // { path: 'hall-of-fame', loadChildren: () => import('./hall-of-fame/hall-of-fame.module').then(m => m.HallOfFameModule) },

];
