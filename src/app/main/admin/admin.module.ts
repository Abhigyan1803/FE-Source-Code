import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminDialogModule } from './admin-dialog/admin-dialog.module';
import { GcTermUpdateComponent } from './gc-term-update/gc-term-update.component';

@NgModule({
  declarations: [


  
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMIN_ROUTES),
    AdminDialogModule
  ]
})

export class AdminModule { }
