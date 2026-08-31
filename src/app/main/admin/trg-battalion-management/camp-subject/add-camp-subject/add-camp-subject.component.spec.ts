import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampSubjectComponent } from './add-camp-subject.component';

describe('AddCampSubjectComponent', () => {
  let component: AddCampSubjectComponent;
  let fixture: ComponentFixture<AddCampSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
