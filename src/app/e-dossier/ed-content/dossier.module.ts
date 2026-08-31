import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { Dossier_ROUTES } from './dossier.routes';

@NgModule({
    declarations: [
        
  
  ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(Dossier_ROUTES),
    ]
})

export class DossierModule { }
