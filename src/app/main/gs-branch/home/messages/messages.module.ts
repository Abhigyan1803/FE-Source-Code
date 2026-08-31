import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages.component';
import { MaterialModule } from 'app/material/material.module';




const routes = [
    {
        path: '',
        component: MessagesComponent
    },
    { path: 'add-message', loadChildren: () => import('./add-message/add-message.module').then(m => m.AddMessagesModule)  },
    { path: 'view-message', loadChildren: () => import('./add-message/add-message.module').then(m => m.AddMessagesModule)  },
   
   
];

@NgModule({
    declarations: [
        MessagesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule  ]
})

export class MessagesModule {
}
