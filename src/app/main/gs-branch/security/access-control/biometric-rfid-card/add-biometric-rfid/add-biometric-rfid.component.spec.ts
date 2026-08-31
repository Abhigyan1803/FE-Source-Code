import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBiometricRfidComponent } from './add-biometric-rfid.component';

describe('AddBiometricRfidComponent', () => {
  let component: AddBiometricRfidComponent;
  let fixture: ComponentFixture<AddBiometricRfidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBiometricRfidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBiometricRfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
