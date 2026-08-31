import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GcMsgBoardComponent } from './gc-msg-board.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: GcMsgBoardComponent
    },
    { path: 'view-gcMsg', loadChildren: () => import('./add-gc-msg/add-gc-msg.module').then(m => m.AddGcMsgModule) },
    { path: 'add-gcMsg', loadChildren: () => import('./add-gc-msg/add-gc-msg.module').then(m => m.AddGcMsgModule) },
    
];

@NgModule({
    declarations: [
        GcMsgBoardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class GcMsgBoardModule {
}
