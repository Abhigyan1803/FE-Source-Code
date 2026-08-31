import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentOqComponent } from './assessment-oq.component';

describe('AssessmentOqComponent', () => {
  let component: AssessmentOqComponent;
  let fixture: ComponentFixture<AssessmentOqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentOqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentOqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
