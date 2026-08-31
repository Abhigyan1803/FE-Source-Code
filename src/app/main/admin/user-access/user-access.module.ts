import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USER_ACCESS_ROUTES } from './user-access.routes';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';

@NgModule({
  declarations: [

  
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USER_ACCESS_ROUTES),
  ]
})

export class UserAccessModule { }
