import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsChushulComponent } from './counsellors-chushul.component';

describe('CounsellorsChushulComponent', () => {
  let component: CounsellorsChushulComponent;
  let fixture: ComponentFixture<CounsellorsChushulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsChushulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsChushulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
