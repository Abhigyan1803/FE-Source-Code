import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusKerenComponent } from './add-conus-keren.component';

describe('AddConusKerenComponent', () => {
  let component: AddConusKerenComponent;
  let fixture: ComponentFixture<AddConusKerenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusKerenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusKerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
