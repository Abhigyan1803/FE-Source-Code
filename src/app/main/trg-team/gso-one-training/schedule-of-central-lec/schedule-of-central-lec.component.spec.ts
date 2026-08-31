import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfCentralLecComponent } from './schedule-of-central-lec.component';

describe('ScheduleOfCentralLecComponent', () => {
  let component: ScheduleOfCentralLecComponent;
  let fixture: ComponentFixture<ScheduleOfCentralLecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleOfCentralLecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOfCentralLecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
