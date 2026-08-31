
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const GSOTwoAssessmentRoutes: Routes = [
    {  path: 'service-subjects', loadChildren: () => import('./service-subjects/service-subjects.module').then(m => m.ServiceSubjectModule) },
   
];

