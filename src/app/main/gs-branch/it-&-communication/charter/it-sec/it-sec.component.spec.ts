import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSecComponent } from './it-sec.component';

describe('ItSecComponent', () => {
  let component: ItSecComponent;
  let fixture: ComponentFixture<ItSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
