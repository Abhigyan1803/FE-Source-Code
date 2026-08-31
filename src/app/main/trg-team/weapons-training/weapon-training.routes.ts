
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Routings } from 'app/Shared/constant';

export const WT_Routes: Routes = [
    { path: 'add-exam-param', loadChildren: () => import('../../trg-team/add-exam-param/add-exam-param.module').then(m => m.AddExamParamModule) },  

    { path: 'training/:type', loadChildren: () => import('./weapons-training/weapons-training.module').then(m => m.WeaponsTrainingModule) },  

  //.. { path: Routings.trainingResultPath, loadChildren: () => import('./weapons-training/result/result.module').then(m => m.ResultModule) },  
  //.. { path: Routings.finalResultPath, loadChildren: () => import('./weapons-training/final-result/final-result.module').then(m => m.FinalResultModule) },  

    { path:Routings.weaponsListPath, loadChildren: () => import('app/main/trg-team/weapons/weapons.module').then(m => m.WeaponsModule)  },
    { path:Routings.addWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },
    { path:Routings.editWeaponsPath, loadChildren: () => import('app/main/trg-team/weapons/add-weapons/add-weapons.module').then(m => m.AddWeaponsModule)  },  

];
