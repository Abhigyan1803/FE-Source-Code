import { Routes, RouterModule } from '@angular/router';


export const HOME_ROUTES: Routes = [
    // Guard for Modules
    // { path: '', loadChildren: () => import('./admin-dashboard/adminDash.module').then(m => m.adminDashBoardModule) },
    { path: 'activity', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
    { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
    // { path: 'special-occasions', loadChildren: () => import('./special-occasions/special-occasions.module').then(m => m.SpecialOccasionsModule) },
    { path: 'announcement', loadChildren: () => import('./announcement/announcement.module').then(m => m.AnnouncementModule)  },
    { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)  },
    { path: 'programes', loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule)},
    { path: 'central-library-management', loadChildren: () => import('./central-library-management/central-library-management.module').then(m => m.CentralLibraryManagementModule)},
    { path: 'ebook', loadChildren: () => import('./ebook/ebook.module').then(m => m.Ebook)},
    { path: 'greybook', loadChildren: () => import('./greybook/greybook.module').then(m => m.GreybookModule)},
    { path: 'cyber-policy', loadChildren: () => import('./cyber-policy/cyber-policy.module').then(m => m.CentralLibraryModule)},
    { path: 'book-list', loadChildren: () => import('./recommened-book/recommened-book.module').then(m => m.RecommenedBookModule)},
    { path: 'hall-of-fame', loadChildren: () => import('./hall-of-fame/hall-of-fame.module').then(m => m.HallOfFameModule) },
    { path: 'ima-blog', loadChildren: () => import('./ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },
    { path: 'gc-msg', loadChildren: () => import('./gc-msg-board/gc-msg-board.module').then(m => m.GcMsgBoardModule) },
    
    { path: 'section-hospital', loadChildren: () => import('./section-hospital/section-hospital.module').then(m => m.SectionHospitalModule) },
    
];
