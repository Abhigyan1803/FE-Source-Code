import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginingInterviewComponent } from './begining-interview.component';

describe('BeginingInterviewComponent', () => {
  let component: BeginingInterviewComponent;
  let fixture: ComponentFixture<BeginingInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginingInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginingInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
