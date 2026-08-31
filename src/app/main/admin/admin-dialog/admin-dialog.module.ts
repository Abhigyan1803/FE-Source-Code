import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminDialogComponent } from './admin-dialog.component';
import { MaterialModule } from 'app/material/material.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes: Routes = [
    {
        path: '',
        component: AdminDialogComponent,
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

    declarations: [ AdminDialogComponent ],
    entryComponents: [AdminDialogComponent],
    exports: [AdminDialogComponent]
})

export class AdminDialogModule {
}