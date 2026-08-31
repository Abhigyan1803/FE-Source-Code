import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PunishmentsComponent } from './punishments.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';


const routes = [
  {
      path: '',
      component:PunishmentsComponent 
  },
  // { path: 'club', loadChildren: () => import('./').then(m => m.) }
  

];

@NgModule({
  declarations: [
    PunishmentsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule
  ]
})
export class PunishmentsModule { }
