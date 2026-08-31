import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LettersComponent } from './letters.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: LettersComponent
    },
    {
        path:'add-letter',
        loadChildren:()=>import('./add-letter/add-letter.module').then(m=>m.AddLetterModule)
    },
    {
        path:'view-letter',
        loadChildren:()=>import('./add-letter/add-letter.module').then(m=>m.AddLetterModule)
    }
];

@NgModule({
    declarations: [
        LettersComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class LettersModule {
}
