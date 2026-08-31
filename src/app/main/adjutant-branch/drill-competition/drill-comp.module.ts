import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { drillCompetitionComponent } from '../drill-competition/drill-comp.component';



const routes = [
    {
        path: '',
        component: drillCompetitionComponent,

    },
    { path: 'add-drill', loadChildren: () => import('./add-drill/add-drill.module').then(m => m.AddDrillModule) },
    { path: 'view-drill', loadChildren: () => import('./add-drill/add-drill.module').then(m => m.AddDrillModule) },

];

@NgModule({
    declarations: [
        drillCompetitionComponent,
      
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

         MaterialModule
       
        
    ]
})

export class DrillCompModule {
}
