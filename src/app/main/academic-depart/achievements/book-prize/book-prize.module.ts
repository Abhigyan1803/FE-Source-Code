import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookPrizeComponent } from './book-prize.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: BookPrizeComponent
    },
    {
        path:'add-book',
        loadChildren:()=>import('./add-book/add-book.module').then(m=>m.AddBookModule)
    },
    {
        path:'view-book',
        loadChildren:()=>import('./add-book/add-book.module').then(m=>m.AddBookModule)
    }
   
];

@NgModule({
    declarations: [
        BookPrizeComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class BookModule {
}
