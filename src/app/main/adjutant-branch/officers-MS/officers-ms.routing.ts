
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const officersMSRoutes: Routes = [

     {  path: 'adjutant orders',  loadChildren: () => import('./adjutant orders/adjutant-order.module').then(m => m.AdjutantOrderModule) },
     //{  path: 'drill Marks',  loadChildren: () => import('./letters/letters.module').then(m => m.LettersModule) },

    // {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
];

