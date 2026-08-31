import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatrixComponent } from './add-matrix.component';

describe('AddMatrixComponent', () => {
  let component: AddMatrixComponent;
  let fixture: ComponentFixture<AddMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
