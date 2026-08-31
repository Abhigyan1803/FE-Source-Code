import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLDMatrixComponent } from './add-leadership-development-matrix.component';

describe('AddLDMatrixComponent', () => {
  let component: AddLDMatrixComponent;
  let fixture: ComponentFixture<AddLDMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLDMatrixComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLDMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
