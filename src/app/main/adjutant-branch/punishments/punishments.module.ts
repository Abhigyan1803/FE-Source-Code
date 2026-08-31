import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PunishmentsComponent } from './punishments.component';
import { MaterialModule } from 'app/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPunishmentComponent } from './edit-punishment/edit-punishment.component';

const routes = [
  {
      path: '',
      component: PunishmentsComponent,
  },
  { path: 'view-gc-punishments', loadChildren: () => import('./view-gc-punishments/view-gc-punishments.module').then(m => m.ViewGcPunishmentsModule) },
];

@NgModule({
  declarations: [
    PunishmentsComponent,
    EditPunishmentComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents:[
    EditPunishmentComponent
  ]
})
export class PunishmentsModule { }
