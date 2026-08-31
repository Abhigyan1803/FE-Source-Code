import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ACHIEVEMENTS_ROUTES } from './achievements.routes';
import { BookPrizeComponent } from './book-prize/book-prize.component';
import { AchievementAwardComponent } from './achievement-award/achievement-award.component';


@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(ACHIEVEMENTS_ROUTES),
        
    ]
})

export class AchievementsModule { }
