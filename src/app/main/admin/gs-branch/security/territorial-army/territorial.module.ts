import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { TerritorialArmyComponent } from './territorial-army.component';


const routes = [
    {
        path: '',
        component: TerritorialArmyComponent
    },
    {
        path:'add-territorial',
        loadChildren:()=>import('../territorial-army/add-territorial/add-territorial.module').then(m=>m.AddTerritorialParadeModule)
    },
    {
        path:'view-territorial',
        loadChildren:()=>import('../territorial-army/add-territorial/add-territorial.module').then(m=>m.AddTerritorialParadeModule)
    }
];

@NgModule({
    declarations: [
        TerritorialArmyComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class TerritorialArmyModule {
}
