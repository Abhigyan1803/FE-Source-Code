
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const AdventureCellRoutes: Routes = [

     {  path: 'general-instruction',  loadChildren: () => import('./general-instructions/general-instructions.module').then(m => m.GeneralInstructionsModule) },
     {  path: 'letters',  loadChildren: () => import('./letters/letters.module').then(m => m.LettersModule) },

     { path: 'sops', loadChildren: () => import('./sops/sops/sops.module').then(m => m.SopsModule) },
     { path: 'add/sops', loadChildren: () => import('./sops/add-sops/add-sops.module').then(m => m.AddSopsModule) },
     { path: 'view/sops/:id', loadChildren: () => import('./sops/add-sops/add-sops.module').then(m => m.AddSopsModule) },
 
     { path: 'transport', loadChildren: () => import('./transport/transport/transport.module').then(m => m.TransportModule) },
     { path: 'add/transport', loadChildren: () => import('./transport/add-transport/add-transport.module').then(m => m.AddTransportModule) },
     { path: 'view/transport/:id', loadChildren: () => import('./transport/add-transport/add-transport.module').then(m => m.AddTransportModule) },
 
     { path: 'nominal', loadChildren: () => import('./nominal/nominal/nominal.module').then(m => m.NominalModule) },
     { path: 'add/nominal', loadChildren: () => import('./nominal/add-nominal/add-nominal.module').then(m => m.AddNominalModule) },
     { path: 'view/nominal/:id', loadChildren: () => import('./nominal/add-nominal/add-nominal.module').then(m => m.AddNominalModule) },

 
     { path: 'chart', loadChildren: () => import('./chart/chart/chart.module').then(m => m.ChartModule) },
     { path: 'add/chart', loadChildren: () => import('./chart/add-chart/add-chart.module').then(m=>m.AddChartModule)},
     { path: 'view/chart/:id', loadChildren: () => import('./chart/add-chart/add-chart.module').then(m => m.AddChartModule) },

      
     { path: 'report', loadChildren: () => import('./report/report/report.module').then(m => m.ReportModule) },
     { path: 'add/report', loadChildren: () => import('./report/add-report/add-report.module').then(m => m.AddReportModule) },
     { path: 'view/report/:id', loadChildren: () => import('./report/add-report/add-report.module').then(m => m.AddReportModule) },

     { path: 'clubs', loadChildren: () => import('../../academic-depart/clubs/clubs.module').then(m => m.ClubsModule) },



];

