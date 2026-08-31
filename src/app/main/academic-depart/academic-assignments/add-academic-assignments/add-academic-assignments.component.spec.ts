import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicAssignmentsComponent } from './add-academic-assignments.component';

describe('AddAcademicAssignmentsComponent', () => {
  let component: AddAcademicAssignmentsComponent;
  let fixture: ComponentFixture<AddAcademicAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
