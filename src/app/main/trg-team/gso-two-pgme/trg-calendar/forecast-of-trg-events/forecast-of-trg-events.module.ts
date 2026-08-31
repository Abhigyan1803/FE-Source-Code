import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastOfTrgEventsComponent } from './forecast-of-trg-events.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: ForecastOfTrgEventsComponent
    },
    {
              path: 'add-forecast', loadChildren: () => import('./add-forecast/add-forecast.module').then(m => m.AddForecastModule) ,
    },
    {
              path: 'view-forecast', loadChildren: () => import('./add-forecast/add-forecast.module').then(m => m.AddForecastModule) ,
    }
    
    
];

@NgModule({
    declarations: [
        ForecastOfTrgEventsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule
     ]
})

export class ForecastOfTrgEventsModule {
}
