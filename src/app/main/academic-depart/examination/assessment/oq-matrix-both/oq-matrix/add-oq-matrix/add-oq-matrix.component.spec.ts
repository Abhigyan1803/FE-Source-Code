import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOQMatrixComponent } from './add-oq-matrix.component';

describe('AddOQMatrixComponent', () => {
  let component: AddOQMatrixComponent;
  let fixture: ComponentFixture<AddOQMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOQMatrixComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOQMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
