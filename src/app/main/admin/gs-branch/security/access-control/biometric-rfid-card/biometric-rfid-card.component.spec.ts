import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricRfidCardComponent } from './biometric-rfid-card.component';

describe('BiometricRfidCardComponent', () => {
  let component: BiometricRfidCardComponent;
  let fixture: ComponentFixture<BiometricRfidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricRfidCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricRfidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
