import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsImphalComponent } from './counsellors-imphal.component';

describe('CounsellorsImphalComponent', () => {
  let component: CounsellorsImphalComponent;
  let fixture: ComponentFixture<CounsellorsImphalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsImphalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsImphalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
