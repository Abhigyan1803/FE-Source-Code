import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsInterviewsComponent } from './instructions-interviews.component';

describe('InstructionsInterviewsComponent', () => {
  let component: InstructionsInterviewsComponent;
  let fixture: ComponentFixture<InstructionsInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionsInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
