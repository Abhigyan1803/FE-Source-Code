import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const complaintrequirementRoutes : Routes = [
    {  path: 'it', loadChildren: () => import('./it/it.module').then(m => m.ItModule) },
  
];