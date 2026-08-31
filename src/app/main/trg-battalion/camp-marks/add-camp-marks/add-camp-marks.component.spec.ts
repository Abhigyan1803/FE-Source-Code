import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampMarksComponent } from './add-camp-marks.component';

describe('AddCampMarksComponent', () => {
  let component: AddCampMarksComponent;
  let fixture: ComponentFixture<AddCampMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
