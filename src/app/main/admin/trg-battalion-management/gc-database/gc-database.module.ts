import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GcDatabaseComponent } from './gc-database.component';
import { GcDeleteComponent } from './gc-delete/gc-delete.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'app/material/material.module';
const routes = [
    {path: '',component: GcDatabaseComponent},
    {path: '',component: GcDeleteComponent},
    {  path: 'add-cadet', loadChildren: () => import('./add-cadet/add-cadet.module').then(m => m.AddCadetModule) },
    {  path: 'view-cadet', loadChildren: () => import('./add-cadet/add-cadet.module').then(m => m.AddCadetModule) },

];

@NgModule({
    declarations: [
        GcDatabaseComponent,
        GcDeleteComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule,
        
        ]
})

export class GCDatabaseModule {
}
