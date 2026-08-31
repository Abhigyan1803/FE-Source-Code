import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './members.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: MembersComponent
    },
    { path: 'add-member', loadChildren: () => import('./add-member/add-member.module').then(m => m.AddMemberModule) },
    { path: 'view-member', loadChildren: () => import('./add-member/add-member.module').then(m => m.AddMemberModule) },

];

@NgModule({
    declarations: [
        MembersComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule
        ]
})

export class MembersModule {}
