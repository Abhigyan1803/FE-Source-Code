import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsHajipirComponent } from './counsellors-hajipir.component';

describe('CounsellorsHajipirComponent', () => {
  let component: CounsellorsHajipirComponent;
  let fixture: ComponentFixture<CounsellorsHajipirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsHajipirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsHajipirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
