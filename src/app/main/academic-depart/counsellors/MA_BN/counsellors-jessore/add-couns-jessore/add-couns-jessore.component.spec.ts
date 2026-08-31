import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsJessoreComponent } from './add-couns-jessore.component';

describe('AddCounsJessoreComponent', () => {
  let component: AddCounsJessoreComponent;
  let fixture: ComponentFixture<AddCounsJessoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsJessoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsJessoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
