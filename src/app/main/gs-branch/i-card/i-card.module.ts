
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICardComponent } from './i-card.component';
import {MaterialModule} from 'app/material/material.module';
import { AddCardComponent } from './add-card/add-card.component';

const routes = [
    {
        path: '',
        component: ICardComponent
    },
    {
        path:'add-card',
        loadChildren:()=>import('../i-card/add-card/add-card.module').then(m=>m.AddCardModule)
    },
    {
        path:'view-card',
        loadChildren:()=>import('../i-card/add-card/add-card.module').then(m=>m.AddCardModule)
    }
];

@NgModule({
    declarations: [
        ICardComponent,
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class IcardModule {
}
