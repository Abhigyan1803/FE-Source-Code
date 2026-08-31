
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunicationComplaintsComponent } from './communication-complaints.component';

import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: CommunicationComplaintsComponent
    },

    {
        path:'view',
        loadChildren:()=>import('./view-communication-complaints/view-communication-complaints.module')
        .then(m=>m.ViewCommunicationComplaintsModule)
    }
];

@NgModule({
    declarations: [
        CommunicationComplaintsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  CommunicationComplaintsModule {
}
