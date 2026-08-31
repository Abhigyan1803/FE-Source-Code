import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsZojilaComponent } from './counsellors-zojila.component';

describe('CounsellorsZojilaComponent', () => {
  let component: CounsellorsZojilaComponent;
  let fixture: ComponentFixture<CounsellorsZojilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsZojilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsZojilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
