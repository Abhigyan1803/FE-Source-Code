import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ebook } from './ebook.component';
// import { AddEbookComponent } from './add-ebook/add-ebook.component';
import { MaterialModule } from 'app/material/material.module';
import { EbookDeleteComponent } from './ebook-delete/ebook-delete.component';

const routes:Routes= [
    {
        path: '',
        component: ebook
    },
    { path: 'add-ebook', loadChildren: () => import('./add-ebook/add-ebook.module').then(m => m.AddEbookModule) },
    { path: 'view-ebook', loadChildren: () => import('./add-ebook/add-ebook.module').then(m => m.AddEbookModule) },

];

@NgModule({
    declarations: [
      ebook,
      EbookDeleteComponent,
   
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class Ebook {
}
