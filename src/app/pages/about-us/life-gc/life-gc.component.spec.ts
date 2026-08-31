import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeGCComponent } from './life-gc.component';

describe('LifeGCComponent', () => {
  let component: LifeGCComponent;
  let fixture: ComponentFixture<LifeGCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeGCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeGCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
