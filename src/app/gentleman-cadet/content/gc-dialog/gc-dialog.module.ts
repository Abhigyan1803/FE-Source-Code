import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GcDialogComponent } from './gc-dialog.component';
import { MaterialModule } from 'app/material/material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes: Routes = [
    {
        path: '',
        component: GcDialogComponent,
    }
];

@NgModule({

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxDocViewerModule,
        MaterialModule
    ],
    providers: [
    ],

    declarations: [ GcDialogComponent ],
    entryComponents: [GcDialogComponent],
    exports: [GcDialogComponent]
})

export class GcDialogModule {
}