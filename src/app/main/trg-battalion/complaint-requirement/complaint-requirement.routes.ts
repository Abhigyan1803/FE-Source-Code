import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const complaintrequirementRoutes : Routes = [
    {  path: 'mes', loadChildren: () => import('./mes/mes.module').then(m => m.MesModule) },
    {  path: 'personal-kit-items', loadChildren: () => import('./personalkit/personalkit.module').then(m => m.PersonalkitModule) },
    {path:'additional-items', loadChildren:()=>import('./additional-items/additional-items.module').then(m=>m.AdditionalItemsModule)}
];