import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LDMatrixComponent } from './leadership-development-matrix.component';

describe('LDMatrixComponent', () => {
  let component: LDMatrixComponent;
  let fixture: ComponentFixture<LDMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LDMatrixComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LDMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
