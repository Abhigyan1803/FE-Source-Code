import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalTermComponent } from './final-term.component';

describe('FinalTermComponent', () => {
  let component: FinalTermComponent;
  let fixture: ComponentFixture<FinalTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
