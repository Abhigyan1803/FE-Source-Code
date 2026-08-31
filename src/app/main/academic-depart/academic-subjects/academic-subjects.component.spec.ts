import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSubjectsComponent } from './academic-subjects.component';

describe('AcademicSubjectsComponent', () => {
  let component: AcademicSubjectsComponent;
  let fixture: ComponentFixture<AcademicSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
