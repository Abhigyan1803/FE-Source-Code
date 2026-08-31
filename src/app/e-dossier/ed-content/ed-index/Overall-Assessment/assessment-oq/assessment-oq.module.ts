import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatCardModule } from '@angular/material/card';
import { AssessmentOqComponent } from './assessment-oq.component';

const routes = [
    {
        path: '',
        component:AssessmentOqComponent  
    },
    // { path: 'club', loadChildren: () => import('./').then(m => m.) }
    

];

@NgModule({
    declarations: [
        AssessmentOqComponent ,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule,
        CKEditorModule,
        MatCardModule
        
    ]
})

export class AssessmentOQModule {
}
