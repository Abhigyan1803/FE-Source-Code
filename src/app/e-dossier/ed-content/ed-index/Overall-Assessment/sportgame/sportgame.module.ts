import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportgameComponent } from './sportgame/sportgame.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

// import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { MaterialModule } from 'app/material/material.module';

import { MatCardModule } from '@angular/material/card';

const routes = [
  {
      path: '',
      component:SportgameComponent  
  },
]

@NgModule({
  declarations: [
    SportgameComponent
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
export class SportgameModule { }
