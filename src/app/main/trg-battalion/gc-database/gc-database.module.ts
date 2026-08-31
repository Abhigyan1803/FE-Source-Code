import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GcDatabaseComponent } from './gc-database.component';

      import {MatCardModule} from '@angular/material/card';
      import {MatButtonModule} from '@angular/material/button';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: GcDatabaseComponent
    },
    {  path: 'view-cadet', loadChildren: () => import('./view-cadet/view-cadet.module').then(m => m.ViewCadetModule) },
];

@NgModule({
    declarations: [
        GcDatabaseComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
       MaterialModule
    ]
})

export class GCDatabaseModule {
}
