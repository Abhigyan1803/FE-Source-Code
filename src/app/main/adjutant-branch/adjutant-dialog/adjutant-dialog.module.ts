import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdjutantDialogComponent } from './adjutant-dialog.component';

import { MaterialModule } from '../../../material/material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes = [
    {
        path: '',
        component: AdjutantDialogComponent
    }
];

@NgModule({
    declarations: [
        AdjutantDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
         MaterialModule, NgxDocViewerModule
    ],
    entryComponents:[AdjutantDialogComponent],
    exports:[AdjutantDialogComponent]
})

export class AdjutantDialogModule {
}
