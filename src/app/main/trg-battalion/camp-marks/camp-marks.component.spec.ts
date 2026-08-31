import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampMarksComponent } from './camp-marks.component';

describe('CampMarksComponent', () => {
  let component: CampMarksComponent;
  let fixture: ComponentFixture<CampMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
