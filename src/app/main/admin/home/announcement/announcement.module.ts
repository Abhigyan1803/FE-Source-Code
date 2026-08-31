
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementComponent } from './announcement.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';

const routes = [
    {
        path: '',
        component: AnnouncementComponent
    },
    {
        path:'add-announcement',
        loadChildren:()=>import('../announcement/add-announcement/add-announcement.module').then(m=>m.AddAnnouncementModule)
    },
    {
        path:'view-announcement',
        loadChildren:()=>import('../announcement/add-announcement/add-announcement.module').then(m=>m.AddAnnouncementModule)
    }
];

@NgModule({
    declarations: [
        AnnouncementComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AnnouncementModule {
}
