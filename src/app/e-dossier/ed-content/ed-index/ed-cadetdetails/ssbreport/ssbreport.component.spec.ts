import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsbreportComponent } from './ssbreport.component';

describe('SsbreportComponent', () => {
  let component: SsbreportComponent;
  let fixture: ComponentFixture<SsbreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsbreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsbreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
