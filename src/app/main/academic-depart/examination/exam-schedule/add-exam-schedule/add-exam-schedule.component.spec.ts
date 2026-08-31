import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamScheduleComponent } from './add-exam-schedule.component';

describe('AddExamScheduleComponent', () => {
  let component: AddExamScheduleComponent;
  let fixture: ComponentFixture<AddExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
