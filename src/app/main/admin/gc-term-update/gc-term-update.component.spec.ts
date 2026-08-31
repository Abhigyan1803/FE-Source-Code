import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcTermUpdateComponent } from './gc-term-update.component';

describe('GcTermUpdateComponent', () => {
  let component: GcTermUpdateComponent;
  let fixture: ComponentFixture<GcTermUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcTermUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GcTermUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
