import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqtnComponent } from './eqtn.component';

describe('EqtnComponent', () => {
  let component: EqtnComponent;
  let fixture: ComponentFixture<EqtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
