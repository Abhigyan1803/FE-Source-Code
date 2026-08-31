import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleOfCentralLecComponent } from './add-schedule-of-central-lec.component';

describe('AddScheduleOfCentralLecComponent', () => {
  let component: AddScheduleOfCentralLecComponent;
  let fixture: ComponentFixture<AddScheduleOfCentralLecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleOfCentralLecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleOfCentralLecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
