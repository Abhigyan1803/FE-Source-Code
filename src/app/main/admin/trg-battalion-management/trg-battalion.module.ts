import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRG_BATTALION_ROUTES } from './trg-battalion.routes';
import { MembersComponent } from './members/members.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { CampExerciseTypeComponent } from './camp-exercise-type/camp-exercise-type.component';
import { AddCampExerciseComponent } from './camp-exercise-type/add-camp-exercise/add-camp-exercise.component';
import { CampSubjectComponent } from './camp-subject/camp-subject.component';
import { AddCampSubjectComponent } from './camp-subject/add-camp-subject/add-camp-subject.component';



@NgModule({
    declarations: [
  
  
    
  
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TRG_BATTALION_ROUTES),
        //  DialogModule
    ]
})

export class TrgBattalionModule { }
