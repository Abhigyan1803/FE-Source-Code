import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz.component';
import { MaterialModule } from 'app/material/material.module';




const routes = [
    {
        path: '',
        component: QuizComponent
    },
    {
        path:'add-quiz',
        loadChildren:()=>import('./add-quiz/add-quiz.module').then(m=>m.AddQUIZModule)
    },
    {
        path:'view-quiz',
        loadChildren:()=>import('./add-quiz/add-quiz.module').then(m=>m.AddQUIZModule)
    }
];

@NgModule({
    declarations: [
        QuizComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class QuizModule {
}
