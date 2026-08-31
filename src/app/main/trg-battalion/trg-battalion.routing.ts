import { Routes } from '@angular/router';

export const TrgBattalionRoutes: Routes = [
    {  path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    {  path: 'bro', loadChildren: () => import('./bro/bro/bro.module').then(m => m.BroModule) },
    {  path: 'bdo', loadChildren: () => import('./bdo/bdo/bdo.module').then(m => m.BdoModule) },
    {  path: 'assignment-of-duties', loadChildren: () => import('./assignment-of-duties/assignment-of-duties/assignment-of-duties.module').then(m => m.AssignmentOfDutiesModule) },
    {  path: 'gc-database', loadChildren: () => import('../admin/trg-battalion-management/gc-database/gc-database.module').then(m => m.GCDatabaseModule) },
    {  path: 'location-state', loadChildren: () => import('./location-state/location-state.module').then(m => m.LocationStateModule) },
    {  path: 'parade-state', loadChildren: () => import('./parade-state/parade-state.module').then(m => m.ParadeStateModule) },
    {  path: 'complaint', loadChildren: () => import('./complaint-requirement/complaint-requirement.module').then(m => m.ComplaintRequirementModule) },  
    {  path: 'camp-marks/:term', loadChildren: () => import('./camp-marks/camp-marks.module').then(m => m.CampMarksModule) },  
    {  path: 'oq-marks/:term', loadChildren: () => import('./oq-marks/oq-marks.module').then(m => m.OQModule) },  
    // {  path: 'runback', loadChildren: () => import('./runback/runback.module').then(m => m.RunbackModule) },  
    // {  path: 'route-march', loadChildren: () => import('./route-march/route-march.module').then(m => m.RouteMarchModule) },  
    {  path: 'mr-prac/:type', loadChildren: () => import('./mr-prac/mr-prac.module').then(m => m.MrPrachModule) },  
   
    { path: 'i-card', loadChildren: () => import('./i-card/i-card.module').then(m => m.IcardModule) },
    {  path: 'route-march/:type', loadChildren: () => import('./route-march/route-march.module').then(m => m.RouteMarchModule) },  
    { path: 'ima-blog', loadChildren: () => import('../admin/home/ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },  
    
    { path: 'runback/:type', loadChildren: () => import('./runback/runback.module').then(m => m.RunbackModule) },
];