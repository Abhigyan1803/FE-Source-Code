
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Routings } from 'app/Shared/constant';


export const TrgRoutes: Routes = [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
    { path: 'gso-1-training', loadChildren: () => import('./gso-one-training/gso-one-trg.module').then(m => m.GSOOneModule) },   
    { path: 'gso-2-training', loadChildren: () => import('./gso-two-training/gso-two-training.module').then(m => m.GsoTwoTrainingModule) },  
    { path: 'adventure-cell', loadChildren: () => import('./adventure-cell/adventure-cell.module').then(m => m.AdventureCellModule) },
    { path: 'pt/:term', loadChildren: () => import('./pt/pt.module').then(m => m.PtModule) },
    { path: 'eqtn', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule) },
    { path: 'gso-2-pgme', loadChildren: () => import('./gso-two-pgme/gso2pgme.module').then(m => m.GSOTwoPGMEModule) },  
    { path: 'gso-2-assessment/:term', loadChildren: () => import('./gso-two-assessment/gso-two-assessment.module').then(m => m.GSOTwoAssessmentModule) },  
    { path: 'complaint', loadChildren: () => import('./complaint-requirement/complaint-requirement.module').then(m => m.ComplaintRequirementModule) },  
    { path: 'add-exam-param', loadChildren: () => import('./add-exam-param/add-exam-param.module').then(m => m.AddExamParamModule) },  
    { path: 'runback/:type', loadChildren: () => import('./runback/runback.module').then(m => m.RunbackModule) },  
    { path: 'route-march/:type', loadChildren: () => import('./route-march/route-march.module').then(m => m.RouteMarchModule) },  
    { path: 'mr-prac/:type', loadChildren: () => import('./mr-prac/mr-prac.module').then(m => m.MrpracModule) },  
    { path: 'i-card', loadChildren: () => import('./i-card/i-card.module').then(m => m.IcardModule) },
    { path: 'eqtnnew/:term', loadChildren: () => import('./eqtn/eqtn.module').then(m => m.EqtnModule) },
    { path: 'oqeqtnnew/:term/:type', loadChildren: () => import('./oqeqtn/oqeqtn.module').then(m => m.OqeqtnModule) },   
    { path: 'sports/:term/:type', loadChildren: () => import('../academic-depart/sports/sports.module').then(m => m.SportsModule) },
    
    { path: 'weapon', loadChildren: () => import('./weapons-training/weapon-training.module').then(m => m.WtModule) },  
    { path: 'ima-blog', loadChildren: () => import('../admin/home/ima-blogs/ima-blogs.module').then(m => m.IMABlogsModule) },  
    { path: 'reports/:term', loadChildren: () => import('../trg-team/reports/reports.module').then(m => m.ReportsModule) },  
    { path: 'home', loadChildren: () => import('../admin/home/home.module').then(m => m.HomeModule) },  

    //.. { path: Routings.weaponTrainingPath, loadChildren: () => import('./weapons-training/weapons-training/weapons-training.module').then(m => m.WeaponsTrainingModule) },  
    
    //.. { path: Routings.trainingResultPath, loadChildren: () => import('./weapons-training/result/result.module').then(m => m.ResultModule) },  
    //.. { path: Routings.finalResultPath, loadChildren: () => import('./weapons-training/final-result/final-result.module').then(m => m.FinalResultModule) },  

    

    // { path:Routings.weaponsListPath, loadChildren: () => import('app/main/trg-team/weapons/weapons.module').then(m => m.WeaponsModule)  },
    // { path:Routings.addWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },
    // { path:Routings.editWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },  

    { path:'**', redirectTo:'dashboard', pathMatch:'full' }
    
];
