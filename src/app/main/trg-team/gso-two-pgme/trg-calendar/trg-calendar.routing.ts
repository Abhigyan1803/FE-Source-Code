
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const TRGCalendarRoutes: Routes = [ 
    // {  path: 'daily-programs', loadChildren: () => import('./daily-programs/daily-programs.module').then(m => m.DailyProgramsModule) },
    {  path: 'weekly-programs', loadChildren: () => import('./weekly-programs/weekly-programs.module').then(m => m.WeeklyProgramsModule) },
    {  path: 'forecast', loadChildren: () => import('./forecast-of-trg-events/forecast-of-trg-events.module').then(m => m.ForecastOfTrgEventsModule) },
];

