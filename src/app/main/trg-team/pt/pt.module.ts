import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PtComponent } from './pt.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {PT_Routes} from './pt.routes';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(PT_Routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule
    ]
})

export class PtModule {
}
