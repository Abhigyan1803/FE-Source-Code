import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrillMarksComponent } from './add-drill-marks.component';

describe('AddDrillMarksComponent', () => {
  let component: AddDrillMarksComponent;
  let fixture: ComponentFixture<AddDrillMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrillMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrillMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
