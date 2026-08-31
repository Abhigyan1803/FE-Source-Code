import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleStickersComponent } from './add-vehicle-stickers.component';

describe('AddVehicleStickersComponent', () => {
  let component: AddVehicleStickersComponent;
  let fixture: ComponentFixture<AddVehicleStickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehicleStickersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleStickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
