import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConusBasantarComponent } from './add-conus-basantar.component';

describe('AddConusBasantarComponent', () => {
  let component: AddConusBasantarComponent;
  let fixture: ComponentFixture<AddConusBasantarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConusBasantarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConusBasantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
