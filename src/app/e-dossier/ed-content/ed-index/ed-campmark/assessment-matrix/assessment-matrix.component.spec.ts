import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentMatrixComponent } from './assessment-matrix.component';

describe('AssessmentMatrixComponent', () => {
  let component: AssessmentMatrixComponent;
  let fixture: ComponentFixture<AssessmentMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
