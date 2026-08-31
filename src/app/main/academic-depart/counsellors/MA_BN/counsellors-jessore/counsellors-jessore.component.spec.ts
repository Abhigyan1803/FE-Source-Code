import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsJessoreComponent } from './counsellors-jessore.component';

describe('CounsellorsJessoreComponent', () => {
  let component: CounsellorsJessoreComponent;
  let fixture: ComponentFixture<CounsellorsJessoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsJessoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsJessoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
