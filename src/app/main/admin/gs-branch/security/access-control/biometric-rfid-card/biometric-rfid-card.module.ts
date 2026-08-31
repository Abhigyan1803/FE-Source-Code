
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BiometricRfidCardComponent } from './biometric-rfid-card.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: BiometricRfidCardComponent
    },
    {
        path:'add-biometric',
        loadChildren:()=>import('../biometric-rfid-card/add-biometric-rfid/add-biometric-rfid.module').then(m=>m.AddBiometricRfidModule)
    },
    {
        path:'view-biometric',
        loadChildren:()=>import('../biometric-rfid-card/add-biometric-rfid/add-biometric-rfid.module').then(m=>m.AddBiometricRfidModule)
    }
];

@NgModule({
    declarations: [
        BiometricRfidCardComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  BiometricRfidCardModule {
}
