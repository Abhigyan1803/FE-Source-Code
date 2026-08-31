import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorsChushulComponent } from './add-counsellors-chushul.component';

describe('AddCounsellorsChushulComponent', () => {
  let component: AddCounsellorsChushulComponent;
  let fixture: ComponentFixture<AddCounsellorsChushulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCounsellorsChushulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorsChushulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
