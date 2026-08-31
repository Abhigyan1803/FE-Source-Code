import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusImphalComponent } from './add-conus-imphal.component';

describe('AddConusImphalComponent', () => {
  let component: AddConusImphalComponent;
  let fixture: ComponentFixture<AddConusImphalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusImphalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusImphalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
