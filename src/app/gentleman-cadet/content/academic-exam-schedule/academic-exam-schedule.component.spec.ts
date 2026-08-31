import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicExamScheduleComponent } from './academic-exam-schedule.component';

describe('AcademicExamScheduleComponent', () => {
  let component: AcademicExamScheduleComponent;
  let fixture: ComponentFixture<AcademicExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicExamScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
