import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudyBmt1Component } from './add-study-bmt1.component';

describe('AddStudyBmt1Component', () => {
  let component: AddStudyBmt1Component;
  let fixture: ComponentFixture<AddStudyBmt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudyBmt1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudyBmt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
