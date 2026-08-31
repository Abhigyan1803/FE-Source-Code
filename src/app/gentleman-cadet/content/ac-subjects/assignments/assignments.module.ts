import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsComponent } from './assignments.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';
import { CKEditorModule } from 'ckeditor4-angular';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
    {
        path: ':paper/:subject',
        component: AssignmentsComponent
    },
    {
        path: '',
        redirectTo:'Paper 1/Military History',
        pathMatch:'full'
    }
];

@NgModule({
    declarations: [
        AssignmentsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule, CKEditorModule
        
    ]
})

export class AssignmentsModule {
}
