
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const GSO2Routes: Routes = [ 
    { path: ':term/syllabus', loadChildren: () => import('./syllabus/syllabus.module').then(m => m.SyllabusModule) },
    { path: 'trg-calendar', loadChildren: () => import('./trg-calendar/trg-calendar.module').then(m => m.TRGCalendarModule) },
    { path: 'season-terms', loadChildren: () => import('./season-terms/season-terms.module').then(m => m.SeasonTermsModule) },
    { path: ':term/study-material', loadChildren: () => import('./study-material/study-material.module').then(m => m.StudyModule) },
    

    // {  path: 'schedule-of-exercises', loadChildren: () => import('./schedule-of-exercises/schedule-of-exercises.module').then(m => m.ScheduleOfExercisesModule) },
];

