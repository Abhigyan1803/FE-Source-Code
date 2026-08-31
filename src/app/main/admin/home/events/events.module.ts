import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './events.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: EventsComponent
    },
    { path: 'view-event', loadChildren: () => import('./add-event/add-event.module').then(m => m.AddEventModule) },
    { path: 'add-event', loadChildren: () => import('./add-event/add-event.module').then(m => m.AddEventModule) },
    
];

@NgModule({
    declarations: [
        EventsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule]
        
})

export class EventsModule {
}
