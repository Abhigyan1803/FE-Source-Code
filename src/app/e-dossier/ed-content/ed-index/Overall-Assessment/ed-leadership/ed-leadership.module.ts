import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdLeadershipComponent } from './ed-leadership.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatCardModule } from '@angular/material/card';

const routes = [
    {
        path: '',
        component:EdLeadershipComponent  
    },
    // { path: 'club', loadChildren: () => import('./').then(m => m.) }
    

];

@NgModule({
    declarations: [
        EdLeadershipComponent ,
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

export class EdLeadershipModule {
}
