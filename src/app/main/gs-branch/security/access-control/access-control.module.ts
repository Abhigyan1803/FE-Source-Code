import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ACCESS_CONTROL_ROUTES } from './access-control.routes';
import { CombatComponent } from './entry-passes/combat/combat.component';
import { CivStaffComponent } from './entry-passes/civ-staff/civ-staff.component';
import { CasualStaffComponent } from './entry-passes/casual-staff/casual-staff.component';
import { AddCasualStaffComponent } from './entry-passes/casual-staff/add-casual-staff/add-casual-staff.component';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(ACCESS_CONTROL_ROUTES),
    ]
})

export class AccessControlModule { }