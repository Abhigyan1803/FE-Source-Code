import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributionMarksComponent } from './add-distribution-marks.component';

describe('AddDistributionMarksComponent', () => {
  let component: AddDistributionMarksComponent;
  let fixture: ComponentFixture<AddDistributionMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistributionMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistributionMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
