import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsAlameinComponent } from './counsellors-alamein.component';

describe('CounsellorsAlameinComponent', () => {
  let component: CounsellorsAlameinComponent;
  let fixture: ComponentFixture<CounsellorsAlameinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsAlameinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsAlameinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
