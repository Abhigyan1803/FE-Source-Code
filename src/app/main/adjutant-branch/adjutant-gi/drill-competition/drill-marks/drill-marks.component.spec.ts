import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillMarksComponent } from './drill-marks.component';

describe('DrillMarksComponent', () => {
  let component: DrillMarksComponent;
  let fixture: ComponentFixture<DrillMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
