
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const ServiceSubjectsRoutes: Routes = [
    {  path: 'datesheet', loadChildren: () => import('./datesheet/datesheet.module').then(m => m.DatesheetModule) },
    
    { path: 'BMT-1', loadChildren: () => import('./BMT-1/Bmt1.module').then(m => m.BMT1Module) },
    { path: 'BMT-2', loadChildren: () => import('./BMT-2/Bmt2.module').then(m => m.BMT2Module) },
    
    ];

