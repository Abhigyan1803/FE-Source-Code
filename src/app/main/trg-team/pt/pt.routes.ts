
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const PT_Routes: Routes = [
    {  path: 'IPET', loadChildren: () => import('./ipet/ipet.module').then(m => m.IpetModule) },
    {  path: 'PPT', loadChildren: () => import('./ppt/ppt.module').then(m => m.PptModule) },
    {  path: 'SWM', loadChildren: () => import('./swm/swm.module').then(m => m.SwmModule) },
    {  path: 'BPET', loadChildren: () => import('./bpet/bpet.module').then(m => m.BpetModule) },
    {  path: 'CTOT', loadChildren: () => import('./ctot/ctot.module').then(m => m.CtotModule) },
    {  path: 'SOT', loadChildren: () => import('./sot/sot.module').then(m => m.SotModule) },
    {  path: 'ROT', loadChildren: () => import('./rot/rot.module').then(m => m.RotModule) },
];
