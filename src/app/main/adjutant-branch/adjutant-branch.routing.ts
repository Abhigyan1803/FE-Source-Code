import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const ADJUTANT_ROUTES: Routes = [
    // {  path: '', loadChildren: () => import('./ARO/aro.module').then(m => m.AroModule) },
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
    { path: 'aro', loadChildren: () => import('./ARO/aro.module').then(m => m.AroModule) },
    { path: 'bro', loadChildren: () => import('./bro/bro.module').then(m => m.BroModule) },

    { path: 'adjutant-orders', loadChildren: () => import('./officers-MS/adjutant orders/adjutant-order.module').then(m => m.AdjutantOrderModule) },
    { path: 'general-instruction', loadChildren: () => import('./adjutant-gi/adjutant-gi.module').then(m => m.AdjutantGeneralInstructionModule) },
    { path: 'drill/:term', loadChildren: () => import('./drill-marks/drill-marks.module').then(m => m.DrillModule) },
    { path: 'drill-comp', loadChildren: () => import('./drill-comp/drill-comp.module').then(m => m.DrillCompModule) },

    { path: 'drill-marks', loadChildren: () => import('./drill-competition/drill-comp.module').then(m => m.DrillCompModule) },
    { path: 'drill-precis', loadChildren: () => import('./drill-precis/drill-precis.module').then(m => m.DrillPrecisModule) },
    // { path: 'officers-ms', loadChildren: () => import('./officers-MS/officers-ms.module').then(m => m.OfficersMSModule) },
    { path: 'it', loadChildren: () => import('./complaint-requirement/complaint-requirement.module').then(m => m.ComplaintRequirementModule) },
    { path: 'academy-parade', loadChildren: () => import('./academy-parade-state/academy-parade-state.module').then(m => m.AcademyParadeStateModule) },
    { path: 'officer-parade', loadChildren: () => import('./location-state/location-state.module').then(m => m.LocationStateModule) },
    { path: 'i-card', loadChildren: () => import('./i-card/i-card.module').then(m => m.IcardModule) },
    { path: 'punishments', loadChildren: () => import('./punishments/punishments.module').then(m => m.PunishmentsModule) },
    { path: 'social-list', loadChildren: () => import('../admin/home/special-occasions/special-occasions.module').then(m => m.SpecialOccasionsModule) },
    { path: 'record', loadChildren: () => import('../admin/service-record/service-record.module').then(m => m.ServiceRecordModule) },
    { path: 'ima-blog', loadChildren: () => import('../admin/home/ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },  
    { path: 'home', loadChildren: () => import('../admin/home/home.module').then(m => m.HomeModule) },  
    
    // { path: '**', redirectTo: 'dashboard' },

 
]; 

