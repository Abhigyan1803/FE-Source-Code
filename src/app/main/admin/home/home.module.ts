import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HOME_ROUTES } from './home.routes';
import { GcMsgBoardComponent } from './gc-msg-board/gc-msg-board.component';
import { AddGcMsgComponent } from './gc-msg-board/add-gc-msg/add-gc-msg.component';

@NgModule({
    declarations: [

  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HOME_ROUTES),
        //  DialogModule
    ]
})

export class HomeModule { }
