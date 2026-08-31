import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CURRICULAR_ROUTES } from './curricular.routes';
import { HindiDebComponent } from './hindi-deb/hindi-deb.component';
import { EnglishDebComponent } from './english-deb/english-deb.component';
import { QuizComponent } from './quiz/quiz.component';
import { CyberComponent } from './cyber/cyber.component';
import { PptComponent } from './ppt/ppt.component';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CURRICULAR_ROUTES),

  ]
})

export class CurricularModule { }
