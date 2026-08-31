import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsKerenComponent } from './counsellors-keren.component';

describe('CounsellorsKerenComponent', () => {
  let component: CounsellorsKerenComponent;
  let fixture: ComponentFixture<CounsellorsKerenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsKerenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsKerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
