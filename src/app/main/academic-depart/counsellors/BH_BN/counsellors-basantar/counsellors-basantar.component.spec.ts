import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsBasantarComponent } from './counsellors-basantar.component';

describe('CounsellorsBasantarComponent', () => {
  let component: CounsellorsBasantarComponent;
  let fixture: ComponentFixture<CounsellorsBasantarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsBasantarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsBasantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
