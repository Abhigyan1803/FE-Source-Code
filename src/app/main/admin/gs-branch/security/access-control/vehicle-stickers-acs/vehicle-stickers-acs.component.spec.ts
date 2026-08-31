import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStickersAcsComponent } from './vehicle-stickers-acs.component';

describe('VehicleStickersAcsComponent', () => {
  let component: VehicleStickersAcsComponent;
  let fixture: ComponentFixture<VehicleStickersAcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleStickersAcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleStickersAcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
