import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SportsComponent } from './sports.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: SportsComponent
    },
    {
        path:'add-sports',
        loadChildren:()=>import('../sports/add-sports/add-sports.module').then(m=>m.AddSportsModule)
    },
    {
        path:'view-drill-marks',
        loadChildren:()=>import('../sports/add-sports/add-sports.module').then(m=>m.AddSportsModule)
    }
];

@NgModule({
    declarations: [
        SportsComponent,
        
               
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class SportsModule {
}
