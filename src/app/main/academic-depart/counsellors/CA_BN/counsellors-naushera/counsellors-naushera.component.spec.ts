import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsNausheraComponent } from './counsellors-naushera.component';

describe('CounsellorsNausheraComponent', () => {
  let component: CounsellorsNausheraComponent;
  let fixture: ComponentFixture<CounsellorsNausheraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsNausheraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsNausheraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
