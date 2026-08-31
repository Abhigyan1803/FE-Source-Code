import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRG_TEAM_ROUTES } from './trg-team.routes';
import { MembersComponent } from './members/members.component';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TRG_TEAM_ROUTES),
        //  DialogModule
    ]
})

export class TrgTeamModule { }
