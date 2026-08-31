import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AchievementAwardComponent } from './achievement-award.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: AchievementAwardComponent
    },
    {
        path:'add-award',
        loadChildren:()=>import('./add-award/add-award.module').then(m=>m.AddAwardModule)
    },
    {
        path:'view-award',
        loadChildren:()=>import('./add-award/add-award.module').then(m=>m.AddAwardModule)
    }
   
];

@NgModule({
    declarations: [
        AchievementAwardComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AchievementAwardModule {
}
