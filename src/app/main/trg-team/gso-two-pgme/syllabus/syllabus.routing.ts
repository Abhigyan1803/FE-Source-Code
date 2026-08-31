
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const SyllabusRoutes: Routes = [ 
    {  path: 'terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule) },
    {  path: 'soldierly', loadChildren: () => import('./soldierly/soldierly.module').then(m => m.SoldierlyModule) },
    {  path: 'scholarly', loadChildren: () => import('./scholarly/scholarly.module').then(m => m.ScholarlyModule) },
    {  path: 'leaderly', loadChildren: () => import('./leaderly/leaderly.module').then(m => m.LeaderlyModule) },
    {  path: 'gentlemanly', loadChildren: () => import('./gentlemanly/gentlemanly.module').then(m => m.GentlemanlyModule) },
    { path: 'BMT-1', loadChildren: () => import('./syllabus-bmt1/study-bmt1.module').then(m => m.SyllabusBMT1Module) },
    { path: 'BMT-2/:type', loadChildren: () => import('./bmt2/Bmt2.module').then(m => m.BMT2Module) },
    
];

